import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Zap } from 'lucide-react';
import emailjs from '@emailjs/browser';

export const ContactModal = ({ onClose, t }) => {
    const form = useRef();
    const [status, setStatus] = useState('idle'); // idle, sending, success, error

    const sendEmail = (e) => {
        e.preventDefault();
        setStatus('sending');

        // Usamos sendForm con los credenciales configurados
        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID, 
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID, 
            form.current,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
            .then(() => {
                setStatus('success');
                setTimeout(onClose, 3000);
            }, (error) => {
                setStatus('error');
                console.error("EmailJS Error:", error);
                alert("Error: " + JSON.stringify(error)); // Mostrar error al usuario para depurar
            });
    };

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
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-lg bg-[#0f172a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col"
            >
                {/* Header */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Mail className="text-violet-400" size={24} />
                        {t.contact.text}
                    </h3>
                    <button 
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                    >
                        <ArrowRight size={20} className="rotate-45" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    {status === 'success' ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Zap size={32} />
                            </div>
                            <h4 className="text-xl font-bold text-white mb-2">¡Mensaje Enviado!</h4>
                            <p className="text-slate-400">Gracias por contactar. Te responderé lo antes posible.</p>
                        </div>
                    ) : (
                        <form ref={form} onSubmit={sendEmail} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Nombre</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-violet-500 transition-colors"
                                    placeholder="Tu nombre"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-violet-500 transition-colors"
                                    placeholder="tu@email.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Mensaje</label>
                                <textarea 
                                    name="title" 
                                    required
                                    rows="4"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-violet-500 transition-colors resize-none"
                                    placeholder="¿En qué puedo ayudarte?"
                                ></textarea>
                            </div>
                            
                            {status === 'error' && (
                                <p className="text-red-400 text-sm text-center">Hubo un error al enviar el mensaje. Por favor intenta de nuevo.</p>
                            )}

                            <button 
                                type="submit" 
                                disabled={status === 'sending'}
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {status === 'sending' ? 'Enviando...' : 'Enviar Mensaje'}
                                {status !== 'sending' && <ArrowRight size={18} />}
                            </button>
                        </form>
                    )}
                </div>
            </motion.div>
        </div>
    );
};