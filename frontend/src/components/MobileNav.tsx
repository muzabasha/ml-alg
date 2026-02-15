import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const navLinks = [
        { href: '/', label: 'Home', icon: '🏠', desc: 'Algorithm Gallery' },
        { href: '/datasets', label: 'Data Lab', icon: '📊', desc: 'Dataset Explorer' },
        { href: '/eda', label: 'EDA', icon: '🔍', desc: 'Exploratory Analysis' },
        { href: '/preprocessing', label: 'Preprocessing', icon: '⚙️', desc: 'Data Engineering' },
        { href: '/feature-selection', label: 'Feature Selection', icon: '🎯', desc: 'Signal Optimization' },
        { href: '/instructor', label: 'Instructor', icon: '👨‍🏫', desc: 'Meet the Architect' },
    ];

    const isActive = (path: string) => router.pathname === path;

    if (!mounted) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[150] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Drawer */}
            <nav
                className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-[160] shadow-2xl transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                aria-label="Mobile navigation"
            >
                <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black italic shadow-xl">
                                Σ
                            </div>
                            <div>
                                <h2 className="text-lg font-black text-slate-900 tracking-tight">ML Lab</h2>
                                <p className="text-[9px] font-black text-indigo-600 uppercase tracking-wider">Navigation</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-12 h-12 rounded-2xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-all active:scale-90"
                            aria-label="Close navigation"
                        >
                            <span className="text-2xl text-slate-900">✕</span>
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-3">
                        {navLinks.map((link, index) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={onClose}
                                className={`block p-6 rounded-[2rem] transition-all duration-300 group ${isActive(link.href)
                                        ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-200'
                                        : 'bg-slate-50 hover:bg-white hover:shadow-xl text-slate-900'
                                    }`}
                                style={{
                                    animationDelay: `${index * 50}ms`,
                                    animation: isOpen ? 'slideInRight 0.5s ease-out forwards' : 'none'
                                }}
                            >
                                <div className="flex items-center gap-4 mb-2">
                                    <span className="text-2xl">{link.icon}</span>
                                    <span className="text-lg font-black tracking-tight">{link.label}</span>
                                </div>
                                <p className={`text-xs font-medium ml-10 ${isActive(link.href) ? 'text-indigo-100' : 'text-slate-500'
                                    }`}>
                                    {link.desc}
                                </p>
                            </Link>
                        ))}
                    </div>

                    {/* Footer CTA */}
                    <div className="p-8 border-t border-slate-100 bg-slate-50">
                        <Link
                            href="/algorithm/transformer"
                            onClick={onClose}
                            className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-5 rounded-2xl text-center font-black text-sm uppercase tracking-widest hover:shadow-2xl transition-all active:scale-95 shadow-xl"
                        >
                            <span className="block mb-1">🤖 Attention Lab</span>
                            <span className="text-[9px] text-indigo-100 font-medium normal-case tracking-normal">Transformer Playground</span>
                        </Link>
                    </div>
                </div>
            </nav>

            <style jsx>{`
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `}</style>
        </>
    );
};

export default MobileNav;
