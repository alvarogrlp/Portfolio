import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Code } from 'lucide-react';
import { TECH_STACK, PROJECTS } from '../data/data';

export const ProjectModal = ({ techId, onClose, t }) => {
    const tech = TECH_STACK.core.find(t => t.id === techId);
    const relatedProjects = PROJECTS.filter(p => p.tech.includes(techId));
    const Icon = tech?.icon || Code;

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
                layoutId={techId}
                className="relative w-full max-w-2xl bg-[#0f172a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[80vh]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                {/* Header */}
                <div className={`p-6 ${tech?.color} bg-opacity-10 border-b border-white/5 flex items-center justify-between shrink-0`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${tech?.color} bg-opacity-20`}>
                            <Icon size={24} className={tech?.color.replace("bg-", "text-")} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">{tech?.name}</h3>
                            <p className="text-sm text-slate-400">{t.projects.windowTitle}</p>
                        </div>
                    </div>
                    <button 
                        onClick={(e) => { e.stopPropagation(); onClose(); }}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                    >
                        <ArrowRight size={20} className="rotate-45" /> {/* Close Icon (X) */}
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    {relatedProjects.length > 0 ? (
                        <div className="grid gap-4">
                            {relatedProjects.map(project => {
                                const copy = t.projects.items[project.id];
                                return (
                                    <a 
                                        key={project.id}
                                        href={project.link}
                                        target="_blank"
                                        className="group block p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-lg text-white group-hover:text-violet-300 transition-colors">
                                                {copy?.title}
                                            </h4>
                                            <ExternalLink size={16} className="text-slate-500 group-hover:text-white transition-colors" />
                                        </div>
                                        <p className="text-sm text-slate-400 mb-3">{copy?.desc}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="px-2 py-0.5 rounded-md text-xs font-medium bg-black/20 text-slate-300 border border-white/5">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-slate-500">
                            <p>{t.projects.empty}</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};