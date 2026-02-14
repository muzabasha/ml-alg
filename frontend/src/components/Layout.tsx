import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/datasets', label: 'Data Lab' },
        { href: '/preprocessing', label: 'Eng' },
        { href: '/feature-selection', label: 'Select' },
        { href: '/eda', label: 'EDA' },
        { href: '/instructor', label: 'Architect' },
    ];

    const isActive = (path: string) => router.pathname === path;

    return (
        <div className="min-h-screen bg-[#fcfcfd] flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
            {/* Header */}
            <header className={`sticky top-0 z-[100] transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-2xl border-b border-slate-100/50 py-3' : 'bg-transparent py-6'}`}>
                <div className="container mx-auto px-8">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="flex items-center gap-4 group">
                            <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center text-white font-black shadow-2xl shadow-indigo-100 italic transition-all duration-500 group-hover:bg-indigo-600 group-hover:rotate-[15deg]">Σ</div>
                            <div className="flex flex-col">
                                <span className="text-base font-black text-slate-900 leading-tight tracking-tighter">Mathematical ML</span>
                                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] leading-none opacity-60">Architect's Lab</span>
                            </div>
                        </Link>

                        <nav className="hidden xl:flex items-center gap-2 bg-white/50 backdrop-blur-md p-1.5 rounded-[1.5rem] border border-slate-100/50 shadow-inner">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${isActive(link.href)
                                        ? 'bg-slate-950 text-white shadow-xl shadow-indigo-900/10'
                                        : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        <div className="flex items-center gap-6">
                            <Link
                                href="/algorithm/transformer"
                                className="hidden lg:flex items-center gap-3 bg-indigo-600 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition active:scale-95 shadow-2xl shadow-indigo-100"
                            >
                                <span className="text-xl">🤖</span>
                                Attention Lab
                            </Link>

                            <button className="xl:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5 rounded-2xl bg-white border border-slate-100 shadow-sm active:scale-90 transition-all">
                                <div className="w-5 h-0.5 bg-slate-900 rounded-full"></div>
                                <div className="w-5 h-0.5 bg-indigo-600 rounded-full"></div>
                                <div className="w-3 h-0.5 bg-slate-900 rounded-full self-start ml-3.5"></div>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Premium Footer */}
            <footer className="bg-slate-950 pt-32 pb-16 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-indigo-600/5 blur-[150px] rounded-full"></div>

                <div className="container mx-auto px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32">
                        <div className="lg:col-span-5 space-y-12">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black italic shadow-2xl shadow-indigo-900/40 text-2xl">Σ</div>
                                <h4 className="text-3xl font-black tracking-tighter">Mathematical <br />ML Modeller</h4>
                            </div>
                            <p className="text-slate-400 font-light leading-relaxed max-w-md text-xl italic opacity-80">
                                "Models are not functions; they are mathematical masterpieces derived from the first principles of statistical geometry."
                            </p>
                            <div className="flex gap-4">
                                {['LinkedIn', 'Twitter', 'GitHub', 'Scholar'].map(social => (
                                    <button key={social} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all duration-500 shadow-2xl">
                                        {social[0]}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-3">
                            <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500 mb-10">Navigation Matrix</h5>
                            <ul className="grid grid-cols-1 gap-6">
                                {navLinks.map(link => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="text-slate-400 hover:text-white transition-all duration-300 font-black text-[11px] uppercase tracking-widest flex items-center gap-3 group">
                                            <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3.5rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
                            <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500 mb-10">Principal Lab Lead</h5>
                            <div className="space-y-8">
                                <div className="flex items-center gap-6">
                                    <div className="w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-indigo-500 to-purple-800 border-2 border-white/10 overflow-hidden shadow-2xl">
                                        <img src="/DP_profile.png" alt="Dr Basha" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" />
                                    </div>
                                    <div>
                                        <p className="text-xl font-black tracking-tight">Dr. Syed Muzamil Basha</p>
                                        <p className="text-[10px] text-indigo-400 uppercase font-black tracking-[0.2em] mt-1">Chief AI Architect</p>
                                    </div>
                                </div>
                                <Link href="/instructor" className="inline-flex px-8 py-4 bg-indigo-600 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-indigo-600 transition-all shadow-xl active:scale-95">
                                    Full Professional Biography
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="pt-16 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-12">
                        <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.4em]">
                            © 2026 Advanced AI Modelling Certification • Rukmini Knowledge Park
                        </p>
                        <div className="flex flex-wrap justify-center gap-10">
                            {[
                                { l: 'Signal Stability', v: '99.9%' },
                                { l: 'Math Entropy', v: '0.002' },
                                { l: 'UX Latency', v: '< 12ms' }
                            ].map(stat => (
                                <div key={stat.l} className="flex flex-col gap-2 italic">
                                    <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest">{stat.l}</span>
                                    <span className="text-xs font-black text-indigo-500 tracking-tighter">{stat.v}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
