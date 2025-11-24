import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Smartphone, Database, Layers, 
    Github, Mail, ArrowRight, Languages, Sparkles, Cpu, Zap
} from 'lucide-react';

import { TRANSLATIONS, TECH_STACK, PROJECTS } from './data/data';
import { Spotlight } from './components/ui/Spotlight';
import { TiltCard } from './components/ui/TiltCard';
import { ServiceCard } from './components/ui/ServiceCard';
import { TechBadge } from './components/ui/TechBadge';
import { ProjectCard } from './components/ui/ProjectCard';
import { ProjectModal } from './components/ProjectModal';
import { ContactModal } from './components/ContactModal';
import { ArcadeModal } from './components/ArcadeModal';

const App = () => {
    const [lang, setLang] = useState('es');
    const [activeTab, setActiveTab] = useState('home');
    const [selectedTechId, setSelectedTechId] = useState(null);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isArcadeOpen, setIsArcadeOpen] = useState(false);
    const t = TRANSLATIONS[lang];

    const toggleLang = () => setLang(l => l === 'es' ? 'en' : 'es');

    return (
        <div className="min-h-screen relative selection:bg-violet-500 selection:text-white">
            <Spotlight />
            
            {/* Background Elements */}
            <div className="fixed inset-0 bg-grid z-0 opacity-20 pointer-events-none"></div>
            <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#030014]/80 to-[#030014] z-0 pointer-events-none"></div>

            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-6 md:px-12 backdrop-blur-sm border-b border-white/5 bg-[#030014]/50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
                        <span className="font-bold text-white">AG</span>
                    </div>
                    <span className="font-bold text-lg hidden md:block tracking-tight">Álvaro García</span>
                </div>

                <div className="flex items-center gap-2 p-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                    <button 
                        onClick={() => setActiveTab('home')}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === 'home' ? 'bg-white/10 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                    >
                        {t.nav.home}
                    </button>
                    <button 
                        onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
                        className="px-4 py-1.5 rounded-full text-sm font-medium text-slate-400 hover:text-white transition-all hidden md:block"
                    >
                        {t.nav.about}
                    </button>
                    <button 
                        onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                        className="px-4 py-1.5 rounded-full text-sm font-medium text-slate-400 hover:text-white transition-all hidden md:block"
                    >
                        {t.nav.services}
                    </button>
                    <button 
                        onClick={() => document.getElementById('stack').scrollIntoView({ behavior: 'smooth' })}
                        className="px-4 py-1.5 rounded-full text-sm font-medium text-slate-400 hover:text-white transition-all hidden md:block"
                    >
                        {t.nav.stack}
                    </button>
                    <button 
                        onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                        className="px-4 py-1.5 rounded-full text-sm font-medium text-slate-400 hover:text-white transition-all"
                    >
                        {t.nav.projects}
                    </button>
                    <button 
                        onClick={() => document.getElementById('arcade-section').scrollIntoView({ behavior: 'smooth' })}
                        className="px-4 py-1.5 rounded-full text-sm font-medium text-slate-400 hover:text-white transition-all"
                    >
                        {t.nav.arcade}
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <button onClick={toggleLang} className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                        <Languages size={14} /> {lang.toUpperCase()}
                    </button>
                    <button onClick={() => setIsContactOpen(true)} className="hidden md:flex p-2 rounded-full bg-white text-black hover:scale-110 transition-transform">
                        <Mail size={16} />
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="relative z-10 container mx-auto px-6 pt-32 pb-20">
                
                {/* HERO SECTION */}
                <section className="min-h-[80vh] flex flex-col justify-center relative">
                    {/* Decorative Elements */}
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none"></div>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl relative z-10"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-bold mb-6 tracking-wider">
                            <Sparkles size={12} /> {t.hero.role}
                        </div>
                        
                        <h1 className="text-5xl md:text-8xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-500">
                            {t.hero.greeting} <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-cyan-400">
                                {t.hero.sub}
                            </span>
                        </h1>
                        
                        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
                            {t.hero.desc}
                        </p>
                        
                        <div className="flex flex-wrap gap-4">
                            <button 
                                onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform flex items-center gap-2"
                            >
                                {t.hero.cta} <ArrowRight size={18} />
                            </button>
                            <div className="flex gap-4 items-center px-6">
                                <a href="https://github.com/alvarogrlp" target="_blank" className="text-slate-400 hover:text-white transition-colors"><Github size={24} /></a>
                                <button onClick={() => setIsContactOpen(true)} className="text-slate-400 hover:text-white transition-colors"><Mail size={24} /></button>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* ABOUT SECTION */}
                <section id="about" className="py-20 scroll-mt-28">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-3xl font-bold">{t.about.title}</h2>
                            <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
                        </div>
                        <div className="space-y-6 text-slate-400 leading-relaxed text-lg">
                            <p>{t.about.desc1}</p>
                            <p>{t.about.desc2}</p>
                        </div>
                    </div>
                </section>

                {/* SERVICES SECTION */}
                <section id="services" className="py-20 scroll-mt-28">
                    <div className="flex items-center gap-4 mb-12">
                        <h2 className="text-3xl font-bold">{t.services.title}</h2>
                        <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                        <ServiceCard 
                            title={t.services.s1_title} 
                            desc={t.services.s1_desc} 
                            icon={Smartphone} 
                            delay={0}
                        />
                        <ServiceCard 
                            title={t.services.s2_title} 
                            desc={t.services.s2_desc} 
                            icon={Database} 
                            delay={0.1}
                        />
                        <ServiceCard 
                            title={t.services.s3_title} 
                            desc={t.services.s3_desc} 
                            icon={Layers} 
                            delay={0.2}
                        />
                    </div>
                </section>

                {/* STACK SECTION */}
                <section id="stack" className="py-20 scroll-mt-28">
                    <div className="flex items-center gap-4 mb-12">
                        <h2 className="text-3xl font-bold">{t.stack.title}</h2>
                        <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <TiltCard className="w-full">
                            <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-cyan-400">
                                    <Cpu size={20} /> {t.stack.core}
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {TECH_STACK.core.map(tech => (
                                        <TechBadge 
                                            key={tech.id}
                                            icon={tech.icon}
                                            name={tech.name}
                                            color={tech.color}
                                            layoutId={tech.id}
                                            onClick={() => setSelectedTechId(tech.id)}
                                            hidden={selectedTechId === tech.id}
                                        />
                                    ))}
                                </div>
                            </div>
                        </TiltCard>

                        <TiltCard className="w-full">
                            <div className="p-8 rounded-3xl border border-dashed border-white/10 bg-white/5 backdrop-blur-md">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-violet-400">
                                    <Zap size={20} /> {t.stack.learning}
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {TECH_STACK.learning.map(tech => (
                                        <TechBadge 
                                            key={tech.id}
                                            icon={tech.icon}
                                            name={tech.name}
                                            color={tech.color}
                                        />
                                    ))}
                                </div>
                            </div>
                        </TiltCard>
                    </div>
                </section>

                {/* PROJECTS SECTION */}
                <section id="projects" className="py-20 scroll-mt-28">
                    <div className="flex items-center gap-4 mb-12">
                        <h2 className="text-3xl font-bold">{t.projects.title}</h2>
                        <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 md:h-[500px]">
                        {PROJECTS.map(project => (
                            <ProjectCard key={project.id} project={project} copy={t.projects} />
                        ))}
                    </div>
                </section>

                {/* RETRO ARCADE SECTION */}
                <section id="arcade-section" className="py-20 relative overflow-hidden scroll-mt-96">
                    <div className="flex items-center gap-4 mb-12">
                        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
                            {t.retro_machine.title}
                        </h2>
                        <div className="h-px flex-1 bg-gradient-to-r from-pink-500/50 to-transparent"></div>
                    </div>

                    <div className="flex justify-center items-center perspective-1000">
                        <motion.div 
                            whileHover={{ 
                                scale: 1.05,
                                rotateX: 5,
                                y: -10,
                                filter: "brightness(1.2) contrast(1.1)"
                            }}
                            animate={{
                                y: [0, -5, 0],
                            }}
                            transition={{
                                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                                default: { duration: 0.3 }
                            }}
                            className="relative group cursor-pointer"
                            onClick={() => setIsArcadeOpen(true)}
                        >
                            {/* Cabinet Body */}
                            <div className="w-[300px] md:w-[400px] h-[500px] bg-slate-900 rounded-t-[40px] border-4 border-pink-500/30 relative shadow-[0_0_50px_rgba(236,72,153,0.2)] overflow-hidden group-hover:shadow-[0_0_100px_rgba(236,72,153,0.6)] group-hover:border-pink-400 transition-all duration-300">
                                
                                {/* Marquee */}
                                <div className="h-24 bg-gradient-to-b from-pink-900/50 to-purple-900/50 border-b-4 border-pink-500/30 flex items-center justify-center relative overflow-hidden group-hover:from-pink-800/80 group-hover:to-purple-800/80 transition-colors">
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
                                    <h3 className="text-3xl font-black text-white tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] italic transform -skew-x-12 group-hover:animate-pulse">
                                        ARCADE
                                    </h3>
                                </div>

                                {/* Screen Area */}
                                <div className="p-6 h-[280px] bg-black relative">
                                    <div className="w-full h-full border-4 border-slate-700 rounded-lg bg-[#0a0a0a] relative overflow-hidden flex flex-col items-center justify-center gap-4 shadow-[inset_0_0_20px_rgba(0,0,0,1)] group-hover:border-slate-500 transition-colors">
                                        {/* Screen Glow */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-pink-500/10 pointer-events-none group-hover:to-pink-500/30 transition-all"></div>
                                        <div className="scanlines-static opacity-30 group-hover:opacity-50"></div>
                                        
                                        <div className="text-center animate-pulse">
                                            <p className="text-pink-500 font-mono text-xl font-bold tracking-widest mb-2 group-hover:text-pink-400 group-hover:scale-110 transition-all">
                                                {t.retro_machine.insert_coin}
                                            </p>
                                            <p className="text-xs text-slate-500 font-mono group-hover:text-slate-300">
                                                [ CLICK TO START ]
                                            </p>
                                        </div>

                                        {/* Pixel Art Ghost (CSS) */}
                                        <div className="flex gap-1 mt-4 group-hover:scale-125 transition-transform">
                                            <div className="w-2 h-2 bg-red-500 animate-bounce" style={{animationDelay: '0s'}}></div>
                                            <div className="w-2 h-2 bg-pink-500 animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                            <div className="w-2 h-2 bg-cyan-500 animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                            <div className="w-2 h-2 bg-orange-500 animate-bounce" style={{animationDelay: '0.3s'}}></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Control Panel */}
                                <div className="absolute bottom-0 w-full h-[140px] bg-gradient-to-b from-slate-800 to-slate-900 border-t-4 border-pink-500/30 transform origin-bottom skew-x-0 group-hover:border-pink-400 transition-colors">
                                    <div className="flex justify-around items-center h-full px-8">
                                        {/* Joystick */}
                                        <div className="w-16 h-16 bg-slate-700 rounded-full border-4 border-slate-600 relative flex items-center justify-center shadow-lg group-hover:translate-y-1 transition-transform">
                                            <div className="w-6 h-6 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)] group-hover:shadow-[0_0_20px_rgba(239,68,68,1)]"></div>
                                        </div>
                                        
                                        {/* Buttons */}
                                        <div className="flex gap-4 transform rotate-12">
                                            <div className="w-10 h-10 rounded-full bg-green-500 border-b-4 border-green-700 shadow-lg group-hover:translate-y-1 transition-all duration-100"></div>
                                            <div className="w-10 h-10 rounded-full bg-blue-500 border-b-4 border-blue-700 shadow-lg group-hover:translate-y-1 transition-all duration-100 delay-75"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Side Glow */}
                            <div className="absolute -inset-4 bg-pink-500/20 blur-2xl -z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </motion.div>
                    </div>
                </section>

                {/* FOOTER CTA */}
                <section className="py-20 text-center border-t border-white/5">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-600 pb-2 px-1">
                        {t.contact.text}
                    </h2>
                    <button 
                        onClick={() => setIsContactOpen(true)}
                        className="inline-block px-10 py-5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-lg hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] transition-shadow"
                    >
                        {t.contact.btn}
                    </button>
                </section>

            </main>

            <AnimatePresence>
                {selectedTechId && (
                    <ProjectModal 
                        techId={selectedTechId} 
                        onClose={() => setSelectedTechId(null)} 
                        t={t}
                    />
                )}
                {isContactOpen && (
                    <ContactModal 
                        onClose={() => setIsContactOpen(false)} 
                        t={t}
                    />
                )}
                {isArcadeOpen && (
                    <ArcadeModal onClose={() => setIsArcadeOpen(false)} t={t} />
                )}
            </AnimatePresence>
        </div>
    );
};

export default App;