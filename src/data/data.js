import { 
    Layers, Smartphone, Database, Code, 
    Globe
} from 'lucide-react';

export const DATA = {
    links: {
        marvel: "https://github.com/alvarogrlp/simuladorDeMarvel",
        calc: "https://github.com/alvarogrlp/calculadora",
        ahorcado: "https://github.com/alvarogrlp/AhorcadoPHP"
    }
};

export const PROJECTS = [
    {
        id: "marvel",
        color: "bg-orange-500",
        link: DATA.links.marvel,
        tags: ["Java", "JavaFX", "POO"],
        tech: ["java"]
    },
    {
        id: "calc",
        color: "bg-cyan-500",
        link: DATA.links.calc,
        tags: ["Expo", "React Native", "Mobile"],
        tech: ["react-native", "expo"]
    },
    {
        id: "ahorcado",
        color: "bg-violet-500",
        link: DATA.links.ahorcado,
        tags: ["PHP", "CSS", "Web"],
        tech: ["php", "mysql"]
    }
];

export const TECH_STACK = {
    core: [
        { id: "java", name: "Java", icon: Code, color: "bg-orange-500" },
        { id: "react-native", name: "React Native", icon: Smartphone, color: "bg-cyan-500" },
        { id: "expo", name: "Expo", icon: Layers, color: "bg-white" },
        { id: "php", name: "PHP", icon: Code, color: "bg-indigo-500" },
        { id: "mysql", name: "MySQL", icon: Database, color: "bg-blue-600" }
    ],
    learning: [
        { id: "spring", name: "Spring", icon: Layers, color: "bg-green-500" },
        { id: "python", name: "Python", icon: Code, color: "bg-yellow-500" },
        { id: "angular", name: "Angular", icon: Globe, color: "bg-red-500" }
    ]
};

export const TRANSLATIONS = {
    es: {
        hero: {
            role: "DESARROLLADOR MULTIPLATAFORMA",
            greeting: "Hola, soy Álvaro.",
            sub: "Transformo ideas en herramientas reales.",
            desc: "Desarrollador de aplicaciones con fuerte orientación al aprendizaje práctico. Disfruto programar, diseñar interfaces funcionales y enfrentar desafíos tecnológicos.",
            cta: "VER MIS PROYECTOS"
        },
        nav: { home: "Inicio", about: "Sobre Mí", services: "Habilidades", stack: "Tecnologías", projects: "Proyectos", arcade: "Arcade" },
        about: {
            title: "Sobre Mí",
            desc1: "Soy desarrollador de aplicaciones con una fuerte orientación al aprendizaje práctico y la resolución de problemas. Me motiva comprender a fondo el funcionamiento de la tecnología y transformar ideas en herramientas reales.",
            desc2: "Disfruto programar, diseñar interfaces funcionales y enfrentar desafíos que me hagan crecer. Mi formación incluye un Grado Superior en DAM y conocimientos en Telecomunicaciones, lo que me da una visión amplia del desarrollo tecnológico."
        },
        services: {
            title: "Habilidades Técnicas",
            s1_title: "Desarrollo Móvil",
            s1_desc: "Especialista en React Native (Expo) y TypeScript. Creación de interfaces modernas, adaptativas y con animaciones suaves.",
            s2_title: "Backend & Desktop",
            s2_desc: "Experiencia en Java (JavaFX) y PHP. Manejo de bases de datos SQL Server y SQLite para soluciones robustas.",
            s3_title: "Aprendizaje Continuo",
            s3_desc: "Capacidad autodidacta y resolutiva. Interés en Inteligencia Artificial, Git/GitHub y mejora continua del código."
        },
        stack: {
            title: "Arsenal Tecnológico",
            core: "Núcleo Principal",
            learning: "Cargando Conocimiento..."
        },
        projects: {
            title: "Proyectos Destacados",
            windowTitle: "Proyectos relacionados",
            empty: "Aún no hay misiones documentadas para esta tecnología.",
            view: "Ver Código",
            items: {
                marvel: {
                    title: "Simulador Marvel",
                    desc: "Java + JavaFX. Combates estratégicos con habilidades activas/pasivas y estadísticas visuales."
                },
                calc: {
                    title: "Calculadora Pro",
                    desc: "React Native + TypeScript. Modo oscuro, diseño adaptativo y animaciones suaves."
                },
                ahorcado: {
                    title: "Ahorcado Web",
                    desc: "PHP. Juego web con lógica modular e interfaz visual sencilla."
                }
            }
        },
        contact: {
            text: "¿Hablamos?",
            btn: "Contactar Ahora"
        },
        retro_machine: {
            title: "ZONA RETRO",
            insert_coin: "INSERT COIN"
        },
        arcade: {
            title: "NEON ARCADE",
            exit: "SALIR",
            score: "PUNTOS",
            game_over: "JUEGO TERMINADO",
            final_score: "PUNTUACIÓN FINAL",
            retry: "REINTENTAR",
            press_start: "PULSA ESPACIO PARA SACAR",
            games: {
                snake: { title: "NEON SNAKE", desc: "Clásico relajado. Recolecta energía." },
                pong: { title: "CYBER PONG", desc: "Duelo suave contra la IA." },
                breaker: { title: "DATA BREAKER", desc: "Destruye los cortafuegos." },
                invaders: { title: "CYBER INVADERS", desc: "Defiende la base. Disparo auto." },
                tetris: { title: "NEON BLOCKS", desc: "Puzzle de encaje geométrico." }
            }
        }
    },
    en: {
        hero: {
            role: "CROSS-PLATFORM DEVELOPER",
            greeting: "Hi, I'm Álvaro.",
            sub: "Transforming ideas into real tools.",
            desc: "Application developer with a strong focus on practical learning. I enjoy programming, designing functional interfaces, and facing technological challenges.",
            cta: "VIEW PROJECTS"
        },
        nav: { home: "Home", about: "About", services: "Skills", stack: "Stack", projects: "Projects", arcade: "Arcade" },
        about: {
            title: "About Me",
            desc1: "I am an application developer with a strong focus on practical learning and problem-solving. I am motivated by deeply understanding how technology works and transforming ideas into real tools.",
            desc2: "I enjoy programming, designing functional interfaces, and facing challenges that help me grow. My background includes Cross-Platform Application Development and Telecommunications."
        },
        services: {
            title: "Technical Skills",
            s1_title: "Mobile Development",
            s1_desc: "Specialist in React Native (Expo) and TypeScript. Creating modern, adaptive interfaces with smooth animations.",
            s2_title: "Backend & Desktop",
            s2_desc: "Experience in Java (JavaFX) and PHP. Management of SQL Server and SQLite databases for robust solutions.",
            s3_title: "Continuous Learning",
            s3_desc: "Self-taught and decisive. Interest in Artificial Intelligence, Git/GitHub, and continuous code improvement."
        },
        stack: {
            title: "Tech Arsenal",
            core: "Core System",
            learning: "Loading Knowledge..."
        },
        projects: {
            title: "Featured Projects",
            windowTitle: "Related projects",
            empty: "No documented missions for this tech yet.",
            view: "View Code",
            items: {
                marvel: {
                    title: "Marvel Simulator",
                    desc: "Java + JavaFX. Strategic combat with active/passive skills and visual stats."
                },
                calc: {
                    title: "Calculator Pro",
                    desc: "React Native + TypeScript. Dark mode, adaptive design, and smooth animations."
                },
                ahorcado: {
                    title: "Hangman Web",
                    desc: "PHP. Web game with modular logic and simple visual interface."
                }
            }
        },
        contact: {
            text: "Let's talk?",
            btn: "Contact Now"
        },
        retro_machine: {
            title: "RETRO ZONE",
            insert_coin: "INSERT COIN"
        },
        arcade: {
            title: "NEON ARCADE",
            exit: "EXIT",
            score: "SCORE",
            game_over: "GAME OVER",
            final_score: "FINAL SCORE",
            retry: "RETRY",
            press_start: "PRESS SPACE TO SERVE",
            games: {
                snake: { title: "NEON SNAKE", desc: "Relaxed classic. Collect energy." },
                pong: { title: "CYBER PONG", desc: "Smooth duel against AI." },
                breaker: { title: "DATA BREAKER", desc: "Destroy the firewalls." },
                invaders: { title: "CYBER INVADERS", desc: "Defend the base. Auto shoot." },
                tetris: { title: "NEON BLOCKS", desc: "Geometric puzzle fitting." }
            }
        }
    }
};