import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

const InstructorPage: React.FC = () => {
    return (
        <Layout>
            <main className="container mx-auto px-6 py-24 max-w-7xl">
                {/* Profile Hero Card */}
                <div className="bg-white rounded-[5rem] shadow-[0_80px_160px_-40px_rgba(2,6,23,0.1)] overflow-hidden border border-slate-100 mb-24 animate-fadeIn">
                    <div className="bg-slate-950 p-16 md:p-24 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600 opacity-20 blur-[150px] rounded-full -mr-96 -mt-96 animate-pulse"></div>
                        <div className="relative z-10 flex flex-col xl:flex-row gap-20 items-center">
                            <div className="w-80 h-80 rounded-[4rem] overflow-hidden border-8 border-indigo-500/20 shadow-2xl shrink-0 group">
                                <img
                                    src="/DP_profile.png"
                                    alt="Dr. Syed Muzamil Basha"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110"
                                />
                            </div>
                            <div className="text-center xl:text-left space-y-8">
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-full text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-900/40">
                                    <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                                    Lead Architect & Professor
                                </span>
                                <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-[0.9]">Dr. Syed <br /><span className="text-indigo-400 italic">Muzamil Basha.</span></h1>
                                <p className="text-slate-400 text-2xl font-light max-w-2xl mx-auto xl:mx-0">REVA University • School of Computer Science & Engineering</p>
                                <div className="flex flex-wrap justify-center xl:justify-start gap-4">
                                    <span className="px-6 py-3 bg-white/5 backdrop-blur-3xl rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10 shadow-2xl">ACM Professional Member</span>
                                    <span className="px-6 py-3 bg-white/5 backdrop-blur-3xl rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10 shadow-2xl">ISTE Lifetime Member</span>
                                    <span className="px-6 py-3 bg-indigo-500/10 rounded-2xl text-[10px] font-black text-indigo-400 border border-indigo-500/20 uppercase tracking-widest">VIDWAN Score: 9.5/10</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-16 lg:p-32">
                        {/* Summary Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 mb-32 items-center">
                            <div className="lg:col-span-8 space-y-12">
                                <div className="space-y-6">
                                    <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.5em] mb-4">The Visionary</h3>
                                    <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-tight">Engineering the <br /><span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">Hidden Calculus.</span></h2>
                                </div>
                                <div className="space-y-8 text-xl text-slate-500 leading-relaxed font-light italic">
                                    <p>
                                        Dr. Syed Muzamil Basha is a leading authority in Agentic AI and Mathematical Modelling. With a Ph.D. from VIT University (IoE) and extensive postdoctoral experience, he has dedicated 15 years to bridge the gap between abstract equations and production-ready intelligence.
                                    </p>
                                    <p>
                                        Recognized as the <strong className="text-indigo-600 font-black">3rd Best Scientist at REVA University</strong> (AD Scientific Index 2024), Dr. Basha's teaching methodology focuses on "Equation Anatomy"—engineering the underlying foundations rather than just calling libraries.
                                    </p>
                                </div>
                            </div>
                            <div className="lg:col-span-4 space-y-8">
                                <div className="bg-slate-50 p-12 rounded-[4rem] border border-slate-100 relative group">
                                    <div className="absolute top-0 right-0 p-8">
                                        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-xl">📊</div>
                                    </div>
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-12">Publication Impact</h4>
                                    <div className="space-y-10">
                                        <div className="flex justify-between items-end border-b border-slate-200 pb-6 group/item cursor-default">
                                            <span className="text-xs font-black text-slate-500 uppercase tracking-widest group-hover/item:text-indigo-600 transition-colors">Scopus Papers</span>
                                            <span className="text-5xl font-black text-slate-950 tracking-tighter">65+</span>
                                        </div>
                                        <div className="flex justify-between items-end border-b border-slate-200 pb-6 group/item cursor-default">
                                            <span className="text-xs font-black text-slate-500 uppercase tracking-widest group-hover/item:text-emerald-600 transition-colors">Textbooks</span>
                                            <span className="text-5xl font-black text-slate-950 tracking-tighter">25+</span>
                                        </div>
                                        <div className="flex justify-between items-end border-b border-slate-200 pb-6 group/item cursor-default">
                                            <span className="text-xs font-black text-slate-500 uppercase tracking-widest group-hover/item:text-purple-600 transition-colors">Q1 Journals</span>
                                            <span className="text-5xl font-black text-slate-950 tracking-tighter">07</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Domain Mastery */}
                        <section className="mb-32">
                            <div className="text-center mb-16">
                                <span className="text-[10px] font-black uppercase text-indigo-400 tracking-[0.5em] mb-4 block">Architectural Domains</span>
                                <h3 className="text-4xl font-black text-slate-900 tracking-tight">Core Expertise Spectrum</h3>
                            </div>
                            <div className="flex flex-wrap justify-center gap-4">
                                {[
                                    'Agentic AI Systems', 'Quantum-Ready NLP', 'Hyper-dimensional Big Data',
                                    'Distributed Blockchain', 'Edge Intelligence (IoT)',
                                    'Deep Temporal Manifolds', 'Recursive Federated Learning',
                                    'Bio-Informatics Tensors', 'Adversarial Cybersecurity'
                                ].map(skill => (
                                    <span key={skill} className="px-10 py-5 bg-white border border-slate-100 rounded-[2rem] text-[10px] font-black text-slate-600 uppercase tracking-widest hover:border-indigo-600 hover:text-indigo-600 hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-default shadow-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {/* Distinguished Recognition */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
                            <div className="bg-amber-50 group hover:bg-amber-100/50 p-16 rounded-[4rem] border border-amber-100 transition-all duration-700 relative overflow-hidden">
                                <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/50 rounded-full blur-[60px] group-hover:scale-150 transition-transform"></div>
                                <div className="text-5xl mb-10 transform group-hover:rotate-12 transition-transform">🏆</div>
                                <h4 className="text-3xl font-black text-amber-950 mb-6 tracking-tight">International Outstanding Teacher 2025</h4>
                                <p className="text-sm text-amber-800 font-medium leading-relaxed italic opacity-80">Conferred by Green ThinkerZ & NGO Darpan (NITI Aayog) for visionary pedagogical innovation in engineering.</p>
                            </div>
                            <div className="bg-indigo-50 group hover:bg-indigo-100/50 p-16 rounded-[4rem] border border-indigo-100 transition-all duration-700 relative overflow-hidden">
                                <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/50 rounded-full blur-[60px] group-hover:scale-150 transition-transform"></div>
                                <div className="text-5xl mb-10 transform group-hover:rotate-12 transition-transform">🎖️</div>
                                <h4 className="text-3xl font-black text-indigo-950 mb-6 tracking-tight">Best Professor: CS Bengaluru North</h4>
                                <p className="text-sm text-indigo-800 font-medium leading-relaxed italic opacity-80">Karnataka Educational Awards recognition for transformative contributions to the academic landscape.</p>
                            </div>
                        </div>

                        {/* Digital Gateways */}
                        <div className="bg-slate-900 rounded-[5rem] p-16 md:p-24 text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/50 to-transparent"></div>
                            <h3 className="text-4xl font-black mb-16 text-center tracking-tighter">Research <span className="text-indigo-500">Gateways.</span></h3>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                                {[
                                    { name: 'Google Scholar', url: 'https://scholar.google.co.in/citations?user=weNQmW0AAAAJ&hl=en' },
                                    { name: 'Scopus Repository', url: 'https://www.scopus.com/authid/detail.uri?authorId=57195586589' },
                                    { name: 'ORCID ID', url: 'http://orcid.org/0000-0002-1169-3151' },
                                    { name: 'ResearchGate', url: 'https://www.researchgate.net/profile/Muzamil_Basha' }
                                ].map(link => (
                                    <a
                                        key={link.name}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={link.url}
                                        className="bg-white/5 hover:bg-white text-white hover:text-slate-950 p-6 rounded-[1.5rem] text-center text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 border border-white/10 hover:border-white shadow-2xl active:scale-95"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </div>
                            <div className="mt-24 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 relative z-10">
                                <div className="text-center md:text-left space-y-2">
                                    <p className="text-[10px] font-black uppercase text-indigo-500 tracking-[0.3em] mb-4">Direct Communication</p>
                                    <p className="text-2xl font-black tracking-tight hover:text-indigo-400 transition-colors">muzamilbasha.s@reva.edu.in</p>
                                </div>
                                <div className="text-center md:text-right space-y-2">
                                    <p className="text-[10px] font-black uppercase text-indigo-500 tracking-[0.3em] mb-4">Academic Residence</p>
                                    <p className="text-base font-light text-slate-400 italic">Rukmini Knowledge Park, Yelahanka, Bengaluru, India</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn { animation: fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            `}</style>
        </Layout>
    );
};

export default InstructorPage;
