import { Code, ExternalLink, ArrowRight } from 'lucide-react';
import { TiltCard } from './TiltCard';

export const ProjectCard = ({ project, copy }) => {
    const projectCopy = copy.items[project.id];

    return (
    <TiltCard className="w-full h-full">
        <div className="group relative h-full bg-slate-900/40 border border-white/10 rounded-3xl p-8 backdrop-blur-md overflow-hidden hover:border-white/30 transition-all duration-500">
            {/* Background Gradient Blob */}
            <div className={`absolute -top-20 -right-20 w-60 h-60 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 ${project.color}`}></div>
            
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                        <Code size={24} className="text-white" />
                    </div>
                    <a href={project.link} target="_blank" className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white">
                        <ExternalLink size={20} />
                    </a>
                </div>
                
                <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
                    {projectCopy?.title}
                </h3>
                <p className="text-slate-400 mb-6 leading-relaxed">
                    {projectCopy?.desc}
                </p>
                
                <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium border border-white/10 bg-white/5 text-slate-300">
                                {tag}
                            </span>
                        ))}
                    </div>
                    
                    <a href={project.link} target="_blank" className="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:gap-3 transition-all">
                        {copy.view} <ArrowRight size={16} />
                    </a>
                </div>
            </div>
        </div>
    </TiltCard>
    );
};