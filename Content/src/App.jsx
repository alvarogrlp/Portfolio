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

const App = () => {
    const [lang, setLang] = useState('es');
    const [activeTab, setActiveTab] = useState('home');
    const [selectedTechId, setSelectedTechId] = useState(null);
    const [isContactOpen, setIsContactOpen] = useState(false);
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
                <section id="about" className="py-20">
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
                <section id="services" className="py-20">
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
                <section id="stack" className="py-20">
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
                <section id="projects" className="py-20">
                    <div className="flex items-center gap-4 mb-12">
                        <h2 className="text-3xl font-bold">{t.projects.title}</h2>
                        <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 h-[600px] md:h-[500px]">
                        {PROJECTS.map(project => (
                            <ProjectCard key={project.id} project={project} copy={t.projects} />
                        ))}
                    </div>
                </section>

                {/* FOOTER CTA */}
                <section className="py-20 text-center border-t border-white/5">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-600">
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
            </AnimatePresence>
        </div>
    );
};

export default App;