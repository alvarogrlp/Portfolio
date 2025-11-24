import { useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export const Spotlight = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        }
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <motion.div
            className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
            style={{
                background: useTransform(
                    [mouseX, mouseY],
                    ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(124, 58, 237, 0.15), transparent 40%)`
                )
            }}
        />
    );
};