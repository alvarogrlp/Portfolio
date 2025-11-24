import React, { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import './ArcadeModal.css';

// --- CONSTANTES ---
const COLOR_BLUE = '#00ffff';
const COLOR_PINK = '#ff00ff';
const COLOR_GREEN = '#00ff00';

// --- CLASES DE JUEGO (Lógica pura) ---
class GameBase {
    constructor(canvas, callbacks, t) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.callbacks = callbacks; // { onScore, onGameOver }
        this.width = canvas.width;
        this.height = canvas.height;
        this.t = t;
    }
    update() {}
    draw() {}
    cleanup() {}
}

class SnakeGame extends GameBase {
    constructor(canvas, callbacks, t) {
        super(canvas, callbacks, t);
        this.grid = 20;
        this.snake = [{x: 10, y: 10}, {x: 9, y: 10}, {x: 8, y: 10}]; // Start horizontal
        this.dir = {x: 1, y: 0}; // Start moving right
        this.nextDir = {x: 1, y: 0};
        this.inputQueue = []; // Buffer for rapid inputs
        this.food = this.spawnFood();
        this.speed = 5; // Slower start
        this.frameCount = 0;
        this.score = 0;

        this.handleInput = this.handleInput.bind(this);
        document.addEventListener('keydown', this.handleInput);
    }

    spawnFood() {
        let food;
        while (true) {
            food = {
                x: Math.floor(Math.random() * (this.width / this.grid)),
                y: Math.floor(Math.random() * (this.height / this.grid))
            };
            // Ensure food doesn't spawn on snake
            const onSnake = this.snake.some(s => s.x === food.x && s.y === food.y);
            if (!onSnake) break;
        }
        return food;
    }

    handleInput(e) {
        const key = e.key;
        // Prevent default scrolling for arrow keys
        if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) e.preventDefault();
        
        // Add to queue if not full (max 2 moves ahead)
        if (this.inputQueue.length < 2) {
            if (key === 'ArrowUp') this.inputQueue.push({x: 0, y: -1});
            if (key === 'ArrowDown') this.inputQueue.push({x: 0, y: 1});
            if (key === 'ArrowLeft') this.inputQueue.push({x: -1, y: 0});
            if (key === 'ArrowRight') this.inputQueue.push({x: 1, y: 0});
        }
    }

    action(type) {
        if (this.inputQueue.length < 2) {
            if (type === 'left') this.inputQueue.push({x: -1, y: 0});
            if (type === 'right') this.inputQueue.push({x: 1, y: 0});
            if (type === 'up') this.inputQueue.push({x: 0, y: -1});
            if (type === 'down') this.inputQueue.push({x: 0, y: 1});
        }
    }

    update() {
        this.frameCount++;
        if (this.frameCount < 60 / this.speed) return; // Normalize speed
        this.frameCount = 0;

        // Process input queue
        if (this.inputQueue.length > 0) {
            const next = this.inputQueue.shift();
            // Prevent 180 degree turns
            if (next.x !== -this.dir.x && next.y !== -this.dir.y) {
                this.dir = next;
            } else if (this.inputQueue.length > 0) {
                // Try next input if first was invalid
                const next2 = this.inputQueue.shift();
                if (next2.x !== -this.dir.x && next2.y !== -this.dir.y) {
                    this.dir = next2;
                }
            }
        }

        const head = {x: this.snake[0].x + this.dir.x, y: this.snake[0].y + this.dir.y};

        // Wall collision
        if (head.x < 0 || head.x >= this.width/this.grid || head.y < 0 || head.y >= this.height/this.grid) {
            this.callbacks.onGameOver(this.score);
            return;
        }
        // Self collision
        if (this.snake.some(s => s.x === head.x && s.y === head.y)) {
            this.callbacks.onGameOver(this.score);
            return;
        }

        this.snake.unshift(head);

        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.callbacks.onScore(this.score);
            this.food = this.spawnFood();
            // Slight speed increase
            if (this.speed < 25) this.speed += 0.2;
        } else {
            this.snake.pop();
        }
    }

    draw() {
        // Draw Grid (subtle)
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        this.ctx.lineWidth = 1;
        /*
        for(let x=0; x<=this.width; x+=this.grid) {
            this.ctx.beginPath(); this.ctx.moveTo(x,0); this.ctx.lineTo(x,this.height); this.ctx.stroke();
        }
        for(let y=0; y<=this.height; y+=this.grid) {
            this.ctx.beginPath(); this.ctx.moveTo(0,y); this.ctx.lineTo(this.width,y); this.ctx.stroke();
        }
        */

        // Draw Food
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = COLOR_PINK;
        this.ctx.fillStyle = COLOR_PINK;
        this.ctx.beginPath();
        this.ctx.arc(
            this.food.x * this.grid + this.grid/2, 
            this.food.y * this.grid + this.grid/2, 
            this.grid/2 - 2, 0, Math.PI*2
        );
        this.ctx.fill();
        
        // Draw Snake
        this.ctx.shadowColor = COLOR_BLUE;
        this.ctx.fillStyle = COLOR_BLUE;
        this.snake.forEach((part, index) => {
            this.ctx.shadowBlur = index === 0 ? 20 : 10;
            // Head is slightly larger
            const padding = index === 0 ? 1 : 2;
            this.ctx.fillRect(
                part.x * this.grid + padding, 
                part.y * this.grid + padding, 
                this.grid - padding*2, 
                this.grid - padding*2
            );
            
            // Eyes for head
            if (index === 0) {
                this.ctx.fillStyle = 'black';
                const eyeSize = 2;
                // Simple logic to place eyes based on direction could go here
            }
            this.ctx.fillStyle = COLOR_BLUE; // Reset
        });
        this.ctx.shadowBlur = 0;
    }

    cleanup() {
        document.removeEventListener('keydown', this.handleInput);
    }
}

class PongGame extends GameBase {
    constructor(canvas, callbacks, t) {
        super(canvas, callbacks, t);
        this.paddleW = 15;
        this.paddleH = 80; // Smaller paddle for more challenge
        this.playerY = this.height/2 - this.paddleH/2;
        this.aiY = this.height/2 - this.paddleH/2;
        this.ball = {x: this.width/2, y: this.height/2, dx: 0, dy: 0, size: 8, speed: 3};
        this.score = 0;
        this.gameState = 'serve'; // serve | playing
        this.aiSpeed = 2.5; 

        this.handleMouseMove = (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const scaleY = this.canvas.height / rect.height;
            this.playerY = (e.clientY - rect.top) * scaleY - this.paddleH/2;
            // Clamp
            this.playerY = Math.max(0, Math.min(this.height - this.paddleH, this.playerY));
        };
        this.handleTouchMove = (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const scaleY = this.canvas.height / rect.height;
            if(e.touches[0]) {
                this.playerY = (e.touches[0].clientY - rect.top) * scaleY - this.paddleH/2;
                this.playerY = Math.max(0, Math.min(this.height - this.paddleH, this.playerY));
            }
        };
        this.handleInput = (e) => {
            if(e.code === 'Space' && this.gameState === 'serve') {
                this.launchBall();
            }
        };

        this.canvas.addEventListener('mousemove', this.handleMouseMove);
        this.canvas.addEventListener('touchmove', this.handleTouchMove, {passive: false});
        document.addEventListener('keydown', this.handleInput);
    }

    launchBall() {
        this.gameState = 'playing';
        this.ball.speed = 3;
        this.ball.dx = (Math.random() > 0.5 ? 1 : -1) * this.ball.speed;
        this.ball.dy = (Math.random() * 2 - 1) * this.ball.speed;
    }

    action(type) {
        if(type === 'action' && this.gameState === 'serve') {
            this.launchBall();
        }
    }

    resetBall(toPlayer) {
        this.ball.x = this.width / 2;
        this.ball.y = this.height / 2;
        this.ball.dx = 0;
        this.ball.dy = 0;
        this.gameState = 'serve';
    }

    update() {
        // AI Logic
        const centerPaddle = this.aiY + this.paddleH/2;
        let targetY = this.ball.y;

        // Prediction with error
        if (this.ball.dx > 0) {
             targetY = this.ball.y + (Math.random() * 30 - 15);
        } else {
            targetY = this.height / 2;
        }

        if (centerPaddle < targetY - 10) this.aiY += this.aiSpeed;
        else if (centerPaddle > targetY + 10) this.aiY -= this.aiSpeed;
        this.aiY = Math.max(0, Math.min(this.height - this.paddleH, this.aiY));

        if (this.gameState === 'serve') return;

        this.ball.x += this.ball.dx;
        this.ball.y += this.ball.dy;

        // Wall bounce
        if (this.ball.y <= 0 || this.ball.y + this.ball.size >= this.height) {
            this.ball.dy *= -1;
            // Prevent getting stuck in wall
            this.ball.y = this.ball.y <= 0 ? 1 : this.height - this.ball.size - 1;
        }

        // Paddle Collision Logic (Improved)
        const checkPaddle = (paddleX, paddleY, isPlayer) => {
            if (
                this.ball.y + this.ball.size >= paddleY &&
                this.ball.y <= paddleY + this.paddleH &&
                (isPlayer ? this.ball.x <= paddleX + this.paddleW : this.ball.x + this.ball.size >= paddleX)
            ) {
                // Calculate hit position relative to center (-1 to 1)
                const center = paddleY + this.paddleH/2;
                const hitPos = (this.ball.y + this.ball.size/2 - center) / (this.paddleH/2);
                
                // Increase speed
                this.ball.speed = Math.min(this.ball.speed * 1.02, 12);
                
                // New velocity based on angle
                const angle = hitPos * (Math.PI/4); // Max 45 degrees
                const direction = isPlayer ? 1 : -1;
                
                this.ball.dx = direction * this.ball.speed * Math.cos(angle);
                this.ball.dy = this.ball.speed * Math.sin(angle);
                
                // Push ball out of paddle to prevent sticking
                this.ball.x = isPlayer ? paddleX + this.paddleW + 1 : paddleX - this.ball.size - 1;
            }
        };

        // Check Player
        if (this.ball.x < this.width/2) checkPaddle(0, this.playerY, true);
        // Check AI
        else checkPaddle(this.width - this.paddleW, this.aiY, false);

        // Scoring
        if (this.ball.x < 0) {
            this.callbacks.onGameOver(this.score);
        }
        if (this.ball.x > this.width) {
            this.score += 1;
            this.callbacks.onScore(this.score);
            this.resetBall(true);
        }
    }

    draw() {
        // Net
        this.ctx.setLineDash([10, 15]);
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath(); this.ctx.moveTo(this.width/2, 0); this.ctx.lineTo(this.width/2, this.height); this.ctx.stroke();
        this.ctx.setLineDash([]);

        // Player
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = COLOR_BLUE; this.ctx.fillStyle = COLOR_BLUE;
        this.ctx.fillRect(0, this.playerY, this.paddleW, this.paddleH);

        // AI
        this.ctx.shadowColor = COLOR_PINK; this.ctx.fillStyle = COLOR_PINK;
        this.ctx.fillRect(this.width - this.paddleW, this.aiY, this.paddleW, this.paddleH);

        // Ball
        this.ctx.shadowColor = 'white'; this.ctx.fillStyle = 'white';
        this.ctx.beginPath(); this.ctx.arc(this.ball.x, this.ball.y, this.ball.size, 0, Math.PI*2); this.ctx.fill();
        
        if (this.gameState === 'serve') {
            this.ctx.fillStyle = 'white';
            this.ctx.font = '20px Orbitron';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(this.t.arcade.press_start, this.width/2, this.height/2 - 50);
        }
        
        this.ctx.shadowBlur = 0;
    }

    cleanup() {
        this.canvas.removeEventListener('mousemove', this.handleMouseMove);
        this.canvas.removeEventListener('touchmove', this.handleTouchMove);
        document.removeEventListener('keydown', this.handleInput);
    }
}

class BreakerGame extends GameBase {
    constructor(canvas, callbacks, t) {
        super(canvas, callbacks, t);
        this.paddle = { w: 100, h: 15, x: this.width/2 - 50, color: COLOR_BLUE };
        this.ball = { x: this.width/2, y: this.height - 40, dx: 0, dy: 0, size: 6, speed: 3 };
        this.bricks = [];
        this.score = 0;
        this.gameState = 'serve';
        this.createBricks();

        this.handleMouseMove = (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.canvas.width / rect.width;
            this.paddle.x = (e.clientX - rect.left) * scaleX - this.paddle.w/2;
            this.paddle.x = Math.max(0, Math.min(this.width - this.paddle.w, this.paddle.x));
        };
        this.handleTouchMove = (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.canvas.width / rect.width;
            if(e.touches[0]) {
                this.paddle.x = (e.touches[0].clientX - rect.left) * scaleX - this.paddle.w/2;
                this.paddle.x = Math.max(0, Math.min(this.width - this.paddle.w, this.paddle.x));
            }
        };
        this.handleInput = (e) => {
            if(e.code === 'Space' && this.gameState === 'serve') this.launchBall();
        };

        this.canvas.addEventListener('mousemove', this.handleMouseMove);
        this.canvas.addEventListener('touchmove', this.handleTouchMove, {passive: false});
        document.addEventListener('keydown', this.handleInput);
    }

    launchBall() {
        this.gameState = 'playing';
        this.ball.dx = (Math.random() * 2 - 1) * this.ball.speed;
        this.ball.dy = -this.ball.speed;
    }

    createBricks() {
        const rows = 6; const cols = 8; const padding = 8; const offsetTop = 60; const offsetLeft = 35;
        const width = (this.width - (offsetLeft*2) - (padding * (cols-1))) / cols;
        const height = 20;

        const colors = [COLOR_PINK, COLOR_BLUE, COLOR_GREEN];

        for(let c=0; c<cols; c++) {
            for(let r=0; r<rows; r++) {
                this.bricks.push({ 
                    x: (c*(width+padding)) + offsetLeft, 
                    y: (r*(height+padding)) + offsetTop,
                    w: width, h: height, active: true,
                    color: colors[r % colors.length]
                });
            }
        }
    }

    action(type) {
        if(type === 'left') this.paddle.x = Math.max(0, this.paddle.x - 40);
        if(type === 'right') this.paddle.x = Math.min(this.width - this.paddle.w, this.paddle.x + 40);
        if(type === 'action' && this.gameState === 'serve') this.launchBall();
    }

    update() {
        if (this.gameState === 'serve') {
            this.ball.x = this.paddle.x + this.paddle.w/2;
            this.ball.y = this.height - 30;
            return;
        }

        this.ball.x += this.ball.dx;
        this.ball.y += this.ball.dy;

        // Walls
        if(this.ball.x < 0 || this.ball.x > this.width) this.ball.dx *= -1;
        if(this.ball.y < 0) this.ball.dy *= -1;
        
        // Game Over
        if(this.ball.y > this.height) this.callbacks.onGameOver(this.score);

        // Paddle Collision
        if(this.ball.dy > 0 && 
           this.ball.x > this.paddle.x && 
           this.ball.x < this.paddle.x + this.paddle.w && 
           this.ball.y + this.ball.size > this.height - 25 && 
           this.ball.y < this.height - 10) {
            
            this.ball.dy = -Math.abs(this.ball.dy);
            
            // Angle control
            const hitPoint = this.ball.x - (this.paddle.x + this.paddle.w/2);
            this.ball.dx = hitPoint * 0.15; // Influence X velocity
            
            // Speed up slightly
            this.ball.speed = Math.min(this.ball.speed * 1.01, 7);
        }

        // Brick Collision
        for (const b of this.bricks) {
            if(!b.active) continue;
            if(this.ball.x > b.x && this.ball.x < b.x + b.w && 
               this.ball.y > b.y && this.ball.y < b.y + b.h) {
                this.ball.dy *= -1;
                b.active = false;
                this.score += 20;
                this.callbacks.onScore(this.score);
                break; // Only hit one brick per frame
            }
        }

        if(this.bricks.every(b => !b.active)) {
            this.createBricks();
            this.ball.speed += 1;
            this.ball.dy = -this.ball.speed;
            this.gameState = 'serve'; // Reset to serve for next level
        }
    }

    draw() {
        this.ctx.shadowBlur = 20; this.ctx.shadowColor = this.paddle.color; this.ctx.fillStyle = this.paddle.color;
        this.ctx.fillRect(this.paddle.x, this.height - 25, this.paddle.w, this.paddle.h);

        this.ctx.shadowColor = 'white'; this.ctx.fillStyle = 'white';
        this.ctx.beginPath(); this.ctx.arc(this.ball.x, this.ball.y, this.ball.size, 0, Math.PI*2); this.ctx.fill();

        for (const b of this.bricks) {
            if(b.active) {
                this.ctx.shadowColor = b.color; this.ctx.fillStyle = b.color;
                this.ctx.fillRect(b.x, b.y, b.w, b.h);
            }
        }
        
        if (this.gameState === 'serve') {
            this.ctx.fillStyle = 'white';
            this.ctx.font = '20px Orbitron';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(this.t.arcade.press_start, this.width/2, this.height/2);
        }

        this.ctx.shadowBlur = 0;
    }

    cleanup() {
        this.canvas.removeEventListener('mousemove', this.handleMouseMove);
        this.canvas.removeEventListener('touchmove', this.handleTouchMove);
        document.removeEventListener('keydown', this.handleInput);
    }
}

class InvadersGame extends GameBase {
    constructor(canvas, callbacks, t) {
        super(canvas, callbacks, t);
        this.player = { x: this.width/2, y: this.height - 40, w: 30, h: 20 };
        this.bullets = [];
        this.enemyBullets = [];
        this.enemies = [];
        this.enemyDir = 1;
        this.enemySpeed = 0.5;
        this.frameCount = 0;
        this.score = 0;
        this.lastShot = 0;
        this.keys = {};
        
        this.handleKeyDown = (e) => this.keys[e.key] = true;
        this.handleKeyUp = (e) => this.keys[e.key] = false;
        
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
        this.spawnEnemies();
    }

    spawnEnemies() {
        this.enemies = [];
        for(let r=0; r<4; r++) {
            for(let c=0; c<8; c++) {
                this.enemies.push({
                    x: 50 + c * 60,
                    y: 50 + r * 40,
                    w: 30, h: 20,
                    active: true,
                    type: r // 0-3, used for color
                });
            }
        }
    }

    shoot() {
        const now = Date.now();
        if (now - this.lastShot > 300) { // Fire rate limit
            this.bullets.push({ x: this.player.x + this.player.w/2, y: this.player.y, speed: 7 });
            this.lastShot = now;
        }
    }

    action(type) {
        if(type === 'left') this.keys['ArrowLeft'] = true;
        if(type === 'right') this.keys['ArrowRight'] = true;
        if(type === 'action') this.shoot();
        
        // Reset keys after a short delay for touch controls simulation
        setTimeout(() => {
            if(type === 'left') this.keys['ArrowLeft'] = false;
            if(type === 'right') this.keys['ArrowRight'] = false;
        }, 100);
    }

    update() {
        this.frameCount++;
        
        // Player Movement
        if (this.keys['ArrowLeft']) this.player.x = Math.max(10, this.player.x - 3);
        if (this.keys['ArrowRight']) this.player.x = Math.min(this.width - 40, this.player.x + 3);
        if (this.keys[' ']) this.shoot();

        // Enemy Movement
        const activeEnemies = this.enemies.filter(e => e.active);
        const speedMultiplier = 1 + (32 - activeEnemies.length) * 0.1; // Speed up as they die
        
        if(this.frameCount % Math.max(5, Math.floor(30 / speedMultiplier)) === 0) {
            let moveDown = false;
            for (const e of activeEnemies) {
                e.x += this.enemySpeed * this.enemyDir * 5; // Move in steps
                if(e.x > this.width - 40 || e.x < 10) moveDown = true;
            }

            if(moveDown) {
                this.enemyDir *= -1;
                for (const e of activeEnemies) e.y += 20;
            }
        }

        // Enemy Shooting
        if (Math.random() < 0.02 * (1 + (this.score / 1000))) { // Chance increases with score
            const shooter = activeEnemies[Math.floor(Math.random() * activeEnemies.length)];
            if (shooter) {
                this.enemyBullets.push({ x: shooter.x + shooter.w/2, y: shooter.y + shooter.h, speed: 4 });
            }
        }

        // Player Bullets
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            const b = this.bullets[i];
            b.y -= b.speed;
            if(b.y < 0) {
                this.bullets.splice(i, 1);
                continue;
            }
            
            for (const e of activeEnemies) {
                if(b.x > e.x && b.x < e.x + e.w && b.y > e.y && b.y < e.y + e.h) {
                    e.active = false;
                    this.bullets.splice(i, 1);
                    this.score += 50;
                    this.callbacks.onScore(this.score);
                    break;
                }
            }
        }

        // Enemy Bullets
        for (let i = this.enemyBullets.length - 1; i >= 0; i--) {
            const b = this.enemyBullets[i];
            b.y += b.speed;
            if (b.y > this.height) {
                this.enemyBullets.splice(i, 1);
                continue;
            }
            // Hit Player
            if (b.x > this.player.x && b.x < this.player.x + this.player.w &&
                b.y > this.player.y && b.y < this.player.y + this.player.h) {
                this.callbacks.onGameOver(this.score);
            }
        }

        // Game Over conditions
        for (const e of activeEnemies) {
            if(e.y > this.player.y) this.callbacks.onGameOver(this.score);
        }

        if(activeEnemies.length === 0) {
            this.spawnEnemies();
            this.enemySpeed += 0.2;
        }
    }

    draw() {
        // Player
        this.ctx.shadowColor = COLOR_BLUE; this.ctx.shadowBlur = 15; this.ctx.fillStyle = COLOR_BLUE;
        // Simple ship shape
        this.ctx.beginPath();
        this.ctx.moveTo(this.player.x + this.player.w/2, this.player.y);
        this.ctx.lineTo(this.player.x + this.player.w, this.player.y + this.player.h);
        this.ctx.lineTo(this.player.x, this.player.y + this.player.h);
        this.ctx.fill();
        
        // Enemies
        for (const e of this.enemies) {
            if(e.active) {
                this.ctx.shadowColor = e.type % 2 === 0 ? COLOR_GREEN : COLOR_PINK;
                this.ctx.fillStyle = e.type % 2 === 0 ? COLOR_GREEN : COLOR_PINK;
                this.ctx.fillRect(e.x, e.y, e.w, e.h);
                // Eyes
                this.ctx.fillStyle = 'black';
                this.ctx.fillRect(e.x + 5, e.y + 5, 5, 5);
                this.ctx.fillRect(e.x + e.w - 10, e.y + 5, 5, 5);
            }
        }

        // Bullets
        this.ctx.fillStyle = 'white';
        this.ctx.shadowBlur = 5;
        for (const b of this.bullets) {
            this.ctx.fillRect(b.x - 1, b.y, 3, 10);
        }
        
        this.ctx.fillStyle = 'red';
        this.ctx.shadowColor = 'red';
        for (const b of this.enemyBullets) {
            this.ctx.fillRect(b.x - 2, b.y, 4, 8);
        }

        this.ctx.shadowBlur = 0;
    }

    cleanup() {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);
    }
}

class TetrisGame extends GameBase {
    constructor(canvas, callbacks, t) {
        super(canvas, callbacks, t);
        this.cols = 10;
        this.rows = 20;
        this.blockSize = Math.floor(this.height / this.rows);
        this.board = new Array(this.rows).fill().map(() => new Array(this.cols).fill(0));
        this.score = 0;
        
        this.shapes = [
            [[1,1,1,1]], // I
            [[1,1],[1,1]], // O
            [[0,1,0],[1,1,1]], // T
            [[1,0,0],[1,1,1]], // L
            [[0,0,1],[1,1,1]], // J
            [[0,1,1],[1,1,0]], // S
            [[1,1,0],[0,1,1]]  // Z
        ];
        this.colors = [
            '#00ffff', '#ffff00', '#ff00ff', '#ff7f00', '#0000ff', '#00ff00', '#ff0000'
        ];
        
        this.bag = [];
        this.currPiece = null;
        this.currColor = null;
        this.currX = 0;
        this.currY = 0;
        this.spawnPiece();

        this.dropCounter = 0;
        this.dropInterval = 60; // Faster base speed

        this.handleInput = (e) => {
            if(e.key === 'ArrowLeft') this.move(-1);
            if(e.key === 'ArrowRight') this.move(1);
            if(e.key === 'ArrowDown') this.drop();
            if(e.key === 'ArrowUp') this.rotate();
            if(e.key === ' ') this.hardDrop();
        };
        document.addEventListener('keydown', this.handleInput);
    }

    fillBag() {
        const newBag = [0, 1, 2, 3, 4, 5, 6];
        // Shuffle
        for (let i = newBag.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newBag[i], newBag[j]] = [newBag[j], newBag[i]];
        }
        this.bag.push(...newBag);
    }

    spawnPiece() {
        if (this.bag.length === 0) this.fillBag();
        const id = this.bag.shift();
        
        this.currPiece = this.shapes[id];
        this.currColor = this.colors[id];
        
        this.currX = Math.floor(this.cols / 2) - Math.floor(this.currPiece[0].length / 2);
        this.currY = 0;
        
        if(this.collide(this.currX, this.currY, this.currPiece)) {
            this.callbacks.onGameOver(this.score);
        }
    }

    collide(x, y, piece) {
        for(let r=0; r<piece.length; r++) {
            for(let c=0; c<piece[r].length; c++) {
                if(piece[r][c] && (
                    this.board[y+r] === undefined || 
                    this.board[y+r][x+c] === undefined || 
                    this.board[y+r][x+c])) return true;
            }
        }
        return false;
    }

    move(dir) {
        if(!this.collide(this.currX + dir, this.currY, this.currPiece)) {
            this.currX += dir;
        }
    }

    rotate() {
        const rotated = this.currPiece[0].map((_, i) => this.currPiece.map(row => row[i])).reverse();
        
        // Basic Wall Kick (Try center, then left, then right)
        if(!this.collide(this.currX, this.currY, rotated)) {
            this.currPiece = rotated;
        } else if (!this.collide(this.currX - 1, this.currY, rotated)) {
            this.currX -= 1;
            this.currPiece = rotated;
        } else if (!this.collide(this.currX + 1, this.currY, rotated)) {
            this.currX += 1;
            this.currPiece = rotated;
        }
    }

    drop() {
        if(!this.collide(this.currX, this.currY + 1, this.currPiece)) {
            this.currY++;
        } else {
            this.freeze();
            this.clearLines();
            this.spawnPiece();
        }
    }

    hardDrop() {
        while(!this.collide(this.currX, this.currY + 1, this.currPiece)) {
            this.currY++;
        }
        this.freeze();
        this.clearLines();
        this.spawnPiece();
    }

    freeze() {
        this.currPiece.forEach((row, r) => {
            row.forEach((val, c) => {
                if(val) this.board[this.currY + r][this.currX + c] = this.currColor;
            });
        });
    }

    clearLines() {
        let linesCleared = 0;
        for(let r=this.rows-1; r>=0; r--) {
            if(this.board[r].every(val => val !== 0)) {
                this.board.splice(r, 1);
                this.board.unshift(new Array(this.cols).fill(0));
                linesCleared++;
                r++; 
            }
        }
        if (linesCleared > 0) {
            // Scoring: 100, 300, 500, 800
            const points = [0, 100, 300, 500, 800];
            this.score += points[linesCleared];
            this.callbacks.onScore(this.score);
            // Speed up
            this.dropInterval = Math.max(10, 60 - Math.floor(this.score / 500) * 2);
        }
    }

    getGhostY() {
        let ghostY = this.currY;
        while(!this.collide(this.currX, ghostY + 1, this.currPiece)) {
            ghostY++;
        }
        return ghostY;
    }

    action(type) {
        if(type === 'left') this.move(-1);
        if(type === 'right') this.move(1);
        if(type === 'action') this.rotate();
        if(type === 'down') this.drop();
    }

    update() {
        this.dropCounter++;
        if(this.dropCounter > this.dropInterval) {
            this.drop();
            this.dropCounter = 0;
        }
    }

    draw() {
        const boardW = this.cols * this.blockSize;
        const boardX = (this.width - boardW) / 2;

        // Background
        this.ctx.fillStyle = 'rgba(0,0,0,0.3)';
        this.ctx.fillRect(boardX, 0, boardW, this.height);

        // Grid lines
        this.ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        this.ctx.lineWidth = 1;
        for(let i=0; i<=this.cols; i++) {
            this.ctx.beginPath(); 
            this.ctx.moveTo(boardX + i*this.blockSize, 0); 
            this.ctx.lineTo(boardX + i*this.blockSize, this.height); 
            this.ctx.stroke();
        }

        // Draw Board
        this.board.forEach((row, r) => {
            row.forEach((val, c) => {
                if(val) {
                    this.ctx.shadowBlur = 0;
                    this.ctx.fillStyle = val;
                    this.ctx.fillRect(boardX + c*this.blockSize, r*this.blockSize, this.blockSize-1, this.blockSize-1);
                    // Bevel effect
                    this.ctx.fillStyle = 'rgba(255,255,255,0.3)';
                    this.ctx.fillRect(boardX + c*this.blockSize, r*this.blockSize, this.blockSize-1, 4);
                }
            });
        });

        // Ghost Piece
        const ghostY = this.getGhostY();
        this.currPiece.forEach((row, r) => {
            row.forEach((val, c) => {
                if(val) {
                    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
                    this.ctx.strokeRect(boardX + (this.currX + c)*this.blockSize, (ghostY + r)*this.blockSize, this.blockSize-1, this.blockSize-1);
                }
            });
        });

        // Current Piece
        this.currPiece.forEach((row, r) => {
            row.forEach((val, c) => {
                if(val) {
                    this.ctx.shadowBlur = 10;
                    this.ctx.shadowColor = this.currColor;
                    this.ctx.fillStyle = this.currColor;
                    this.ctx.fillRect(boardX + (this.currX + c)*this.blockSize, (this.currY + r)*this.blockSize, this.blockSize-1, this.blockSize-1);
                    // Bevel
                    this.ctx.fillStyle = 'rgba(255,255,255,0.5)';
                    this.ctx.fillRect(boardX + (this.currX + c)*this.blockSize, (this.currY + r)*this.blockSize, this.blockSize-1, 4);
                }
            });
        });
        this.ctx.shadowBlur = 0;
    }

    cleanup() {
        document.removeEventListener('keydown', this.handleInput);
    }
}

const GAMES = [
    { id: 'snake', titleKey: 'snake', color: 'blue' },
    { id: 'pong', titleKey: 'pong', color: 'pink' },
    { id: 'breaker', titleKey: 'breaker', color: 'blue' },
    { id: 'invaders', titleKey: 'invaders', color: 'green' },
    { id: 'tetris', titleKey: 'tetris', color: 'pink' }
];

// --- COMPONENTE PRINCIPAL ---
export const ArcadeModal = ({ onClose, t }) => {
    const canvasRef = useRef(null);
    const [gameType, setGameType] = useState(null); // null = menu
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    
    // Intro Animation States
    // Removed intro states as per user request

    const gameInstance = useRef(null);
    const requestRef = useRef(null);

    // Configuración de botones móviles
    const [mobileConfig, setMobileConfig] = useState({ showDown: false, actionLabel: '●' });

    // Handle Intro Animation - Removed

    const rotateCarousel = (direction) => {
        setSelectedIndex(prev => {
            if (direction === 'next') return (prev + 1) % GAMES.length;
            if (direction === 'prev') return (prev - 1 + GAMES.length) % GAMES.length;
            return prev;
        });
    };

    // Handle keyboard for menu
    useEffect(() => {
        if (gameType) return; // Only for menu

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') rotateCarousel('next');
            if (e.key === 'ArrowLeft') rotateCarousel('prev');
            if (e.key === 'Enter' || e.key === ' ') startGame(GAMES[selectedIndex].id);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameType, selectedIndex]);

    const startGame = (type) => {
        setGameType(type);
        setScore(0);
        setIsGameOver(false);
        
        // Configurar UI móvil
        if (type === 'snake') setMobileConfig({ showDown: true, actionLabel: '↑' });
        else if (type === 'invaders') setMobileConfig({ showDown: false, actionLabel: '🔥' });
        else if (type === 'tetris') setMobileConfig({ showDown: true, actionLabel: '↻' });
        else setMobileConfig({ showDown: false, actionLabel: '●' });
    };

    const backToMenu = () => {
        if (gameInstance.current) {
            gameInstance.current.cleanup();
            gameInstance.current = null;
        }
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        setGameType(null);
    };

    const handleGameOver = (finalScore) => {
        setIsGameOver(true);
        setScore(finalScore);
    };

    // Game Loop
    const loop = () => {
        if (!isGameOver && gameInstance.current) {
            const ctx = canvasRef.current.getContext('2d');
            // Limpiar completamente el canvas en cada frame para evitar rastros
            ctx.fillStyle = '#080818'; 
            ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            
            gameInstance.current.update();
            gameInstance.current.draw();
            requestRef.current = requestAnimationFrame(loop);
        }
    };

    // Inicializar juego cuando cambia gameType
    useEffect(() => {
        if (!gameType || !canvasRef.current) return;

        const canvas = canvasRef.current;
        // Responsive Canvas
        if(window.innerWidth < 800) {
            canvas.width = window.innerWidth - 20;
            canvas.height = window.innerHeight * 0.55;
        } else {
            canvas.width = 800;
            canvas.height = 600;
        }

        const callbacks = {
            onScore: (s) => setScore(s),
            onGameOver: handleGameOver
        };

        if (gameType === 'snake') gameInstance.current = new SnakeGame(canvas, callbacks, t);
        else if (gameType === 'pong') gameInstance.current = new PongGame(canvas, callbacks, t);
        else if (gameType === 'breaker') gameInstance.current = new BreakerGame(canvas, callbacks, t);
        else if (gameType === 'invaders') gameInstance.current = new InvadersGame(canvas, callbacks, t);
        else if (gameType === 'tetris') gameInstance.current = new TetrisGame(canvas, callbacks, t);

        loop();

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            if (gameInstance.current) gameInstance.current.cleanup();
        };
    }, [gameType, isGameOver]); // Reiniciar si cambia el tipo o game over state cambia (para retry)

    const handleMobileAction = (action) => {
        if (gameInstance.current && gameInstance.current.action) {
            gameInstance.current.action(action);
        }
    };

    return (
        <motion.div 
            className="arcade-overlay"
            initial={{ opacity: 0, scale: 0.01 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.01 }}
            transition={{ duration: 0.4, ease: "circOut" }}
        >
            <div className="arcade-content-wrapper" style={{width: '100%', height: '100%', position: 'relative'}}>
                <div className="scanlines"></div>
                <div className="bg-glow"></div>
                
                <button className="btn-close-arcade" onClick={onClose}>
                    <X size={32} />
                </button>

                <div className="app-container crt-power-on">
                    
                    {/* MENU */}
                        {!gameType && (
                            <div className="main-menu">
                                <h1 className="arcade-title">{t.arcade.title}</h1>
                                
                                <div className="carousel-scene">
                                    <div className="carousel" style={{ transform: `rotateY(${-selectedIndex * (360 / GAMES.length)}deg)` }}>
                                        {GAMES.map((game, index) => (
                                            <div 
                                                key={game.id}
                                                className={`carousel-item ${game.color} ${index === selectedIndex ? 'active' : ''}`}
                                                style={{
                                                    transform: `rotateY(${index * (360 / GAMES.length)}deg) translateZ(250px)`
                                                }}
                                                onClick={() => {
                                                    if (index === selectedIndex) startGame(game.id);
                                                    else setSelectedIndex(index);
                                                }}
                                            >
                                                <h2>{t.arcade.games[game.titleKey].title}</h2>
                                                <p>{t.arcade.games[game.titleKey].desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="carousel-controls">
                                    <button className="carousel-btn" onClick={() => rotateCarousel('prev')}>
                                        <ChevronLeft />
                                    </button>
                                    <button className="carousel-btn" style={{width: 'auto', padding: '0 20px', borderRadius: '25px'}} onClick={() => startGame(GAMES[selectedIndex].id)}>
                                        START
                                    </button>
                                    <button className="carousel-btn" onClick={() => rotateCarousel('next')}>
                                        <ChevronRight />
                                    </button>
                                </div>
                                
                                <p style={{marginTop: '20px', opacity: 0.5, fontSize: '0.8rem', fontFamily: 'Orbitron'}}>
                                    Use Arrow Keys to Navigate • Enter to Start
                                </p>
                            </div>
                        )}

                        {/* JUEGO */}
                        {gameType && (
                            <div className="game-interface">
                                <div className="hud-bar">
                                    <button className="btn-back" onClick={backToMenu}> &lt; {t.arcade.exit}</button>
                                    <div className="score-box">{t.arcade.score}: {score}</div>
                                </div>
                                
                                <div className="canvas-wrapper">
                                    <canvas ref={canvasRef}></canvas>
                                    
                                    {isGameOver && (
                                        <div className="game-over-screen">
                                            <h2 style={{color: 'var(--neon-pink)', fontSize: '2rem', margin: '0 0 20px 0'}}>{t.arcade.game_over}</h2>
                                            <p style={{color: 'white', marginBottom: '20px'}}>{t.arcade.final_score}: {score}</p>
                                            <button className="btn-back" onClick={() => startGame(gameType)}>{t.arcade.retry}</button>
                                        </div>
                                    )}
                                </div>

                                <div className="mobile-controls">
                                    <div className="touch-btn" onClick={() => handleMobileAction('left')}>←</div>
                                    <div className="touch-btn large" onClick={() => handleMobileAction(mobileConfig.actionLabel === '↑' ? 'up' : 'action')}>
                                        {mobileConfig.actionLabel}
                                    </div>
                                    <div className="touch-btn" onClick={() => handleMobileAction('right')}>→</div>
                                    {mobileConfig.showDown && (
                                        <div className="touch-btn" onClick={() => handleMobileAction('down')}>↓</div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
        </motion.div>
    );
};

