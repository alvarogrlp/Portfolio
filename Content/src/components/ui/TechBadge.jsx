import { motion } from 'framer-motion';

export const TechBadge = ({ icon: Icon, name, color, onClick, layoutId, hidden }) => {
    const interactive = typeof onClick === "function";

    if (hidden) {
        return (
            <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm opacity-0 pointer-events-none">
                <div className={`p-2 rounded-lg ${color} bg-opacity-20`}>
                    <Icon size={20} className={color.replace("bg-", "text-")} />
                </div>
                <span className="font-medium text-sm text-slate-200">{name}</span>
            </div>
        );
    }

    return (
        <motion.div 
            layoutId={layoutId}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={interactive ? { scale: 0.97 } : undefined}
            onClick={onClick}
            onKeyDown={interactive ? (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onClick();
                }
            } : undefined}
            role={interactive ? "button" : undefined}
            tabIndex={interactive ? 0 : undefined}
            className={`flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors ${interactive ? 'cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500' : 'cursor-default'}`}
        >
            <div className={`p-2 rounded-lg ${color} bg-opacity-20`}>
                <Icon size={20} className={color.replace("bg-", "text-")} />
            </div>
            <span className="font-medium text-sm text-slate-200">{name}</span>
        </motion.div>
    );
};