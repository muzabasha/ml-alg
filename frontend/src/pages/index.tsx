import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import MLWorkflowNav from '../components/MLWorkflowNav';

const HomePage: React.FC = () => {
    const algorithms = [
        { id: 'linear_regression', name: 'Linear Regression', category: 'Regression', difficulty: 'Beginner', mathFocus: 'Optimization & Gradients' },
        { id: 'logistic_regression', name: 'Logistic Regression', category: 'Classification', difficulty: 'Beginner', mathFocus: 'Log-Odds & MLE' },
        { id: 'knn', name: 'k-Nearest Neighbors', category: 'Classification', difficulty: 'Beginner', mathFocus: 'Distance Metrics' },
        { id: 'kmeans', name: 'K-Means Clustering', category: 'Clustering', difficulty: 'Beginner', mathFocus: 'Centroid Minimization' },
        { id: 'naive_bayes', name: 'Naive Bayes Classifier', category: 'Classification', difficulty: 'Beginner', mathFocus: 'Conditional Probability' },
        { id: 'decision_tree', name: 'Decision Tree', category: 'Classification', difficulty: 'Intermediate', mathFocus: 'Information Entropy' },
        { id: 'svm', name: 'Support Vector Machine', category: 'Classification', difficulty: 'Advanced', mathFocus: 'Lagrange Multipliers' },
        { id: 'ann', name: 'Artificial Neural Network', category: 'Deep Learning', difficulty: 'Intermediate', mathFocus: 'Backpropagation Calculus' },
        { id: 'cnn', name: 'Convolutional Neural Network', category: 'Computer Vision', difficulty: 'Advanced', mathFocus: 'Kernel Tensors' },
        { id: 'rnn', name: 'Recurrent Neural Network', category: 'Sequential Data', difficulty: 'Advanced', mathFocus: 'Recurrence Relations' },
        { id: 'transformer', name: 'Transformer Network', category: 'Attention-Based', difficulty: 'Advanced', mathFocus: 'Attention Scaled Dot-Product' },
    ];

    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-32 pb-44 animate-fadeIn">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1600px] h-[800px] bg-gradient-to-b from-indigo-100/50 via-purple-50/20 to-transparent rounded-full blur-[140px] -z-10 animate-pulse"></div>

                <div className="container mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-3 mb-12 text-[10px] font-black tracking-[0.3em] text-indigo-600 uppercase bg-white rounded-full border border-slate-100 shadow-2xl shadow-indigo-100/50 backdrop-blur-xl">
                        <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-ping"></span>
                        Architect's Laboratory • 2026 Edition
                    </div>

                    <h1 className="text-7xl md:text-9xl font-black text-slate-900 mb-12 leading-[0.85] tracking-tighter">
                        Models Are <span className="italic">Equations.</span> <br />
                        <span className="text-gradient-indigo">Design the Masterpiece.</span>
                    </h1>

                    <p className="text-2xl md:text-3xl text-slate-500 mb-20 max-w-4xl mx-auto font-light leading-relaxed italic">
                        Deconstruct complex tensors. Master the hidden derivations, optimize custom loss functions, and engineer the mathematical backbone of intelligence.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-8">
                        <Link href="/datasets" className="btn-premium px-16 py-8 text-xs group">
                            Enter the Data Lab
                            <span className="text-2xl ml-4 transition-transform group-hover:translate-x-3">→</span>
                        </Link>
                        <Link href="/algorithm/transformer" className="bg-white text-slate-950 px-16 py-8 rounded-2xl font-black text-xs uppercase tracking-widest border border-slate-100 hover:border-indigo-600 hover:shadow-2xl transition-all active:scale-95 shadow-xl flex items-center justify-center gap-4">
                            <span className="text-2xl text-indigo-600">🤖</span>
                            Attention Projection
                        </Link>
                    </div>
                </div>
            </section>

            {/* ML Workflow Pipeline Section */}
            <section className="container mx-auto px-6 py-32">
                <div className="text-center mb-20">
                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.5em] mb-4 block">Learning Path</span>
                    <h2 className="text-5xl md:text-6xl font-black text-slate-950 tracking-tighter leading-tight mb-6">
                        Your <span className="text-indigo-600 italic">Step-by-Step</span> Journey
                    </h2>
                    <p className="text-slate-500 text-xl font-light italic max-w-3xl mx-auto">
                        Follow the complete machine learning workflow from theory to deployment
                    </p>
                </div>

                <MLWorkflowNav currentStep="algorithm" algorithmId="linear_regression" variant="full" />
            </section>

            {/* Algorithm Registry */}
            <section id="algorithms" className="container mx-auto px-6 pb-56">
                <div className="flex flex-col xl:flex-row justify-between items-end mb-24 gap-12">
                    <div className="max-w-3xl">
                        <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.5em] mb-4 block">The Neural Grid</span>
                        <h2 className="text-5xl md:text-6xl font-black text-slate-950 tracking-tighter leading-tight mb-4">Architectural <span className="text-indigo-600 italic">Archetypes.</span></h2>
                        <p className="text-slate-500 text-xl font-light italic">Select a system archetype to begin your first-principles mathematical decomposition.</p>
                    </div>
                    <div className="flex bg-slate-50 p-2 rounded-[2rem] gap-2 border border-slate-100 shadow-inner">
                        {['All Engines', 'Regression', 'Classification', 'Deep Learning'].map((cat, i) => (
                            <button key={cat} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-slate-950 text-white shadow-2xl' : 'text-slate-400 hover:text-slate-950'}`}>
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {algorithms.map((algo) => (
                        <Link
                            key={algo.id}
                            href={`/algorithm/${algo.id}`}
                            className="group bg-white rounded-[3.5rem] p-12 border border-slate-100 hover:border-indigo-600 hover:shadow-[0_80px_160px_-40px_rgba(79,70,229,0.15)] transition-all duration-700 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[4rem] group-hover:bg-indigo-600 transition-all duration-700 opacity-20 group-hover:opacity-100"></div>

                            <div className="flex justify-between items-start mb-10">
                                <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-3xl italic font-black transition-all duration-700 ${algo.difficulty === 'Beginner' ? 'bg-emerald-50 text-emerald-600 group-hover:rotate-12' :
                                    algo.difficulty === 'Intermediate' ? 'bg-indigo-50 text-indigo-600 group-hover:rotate-12' :
                                        'bg-rose-50 text-rose-600 group-hover:rotate-12'
                                    } group-hover:bg-white group-hover:shadow-2xl`}>
                                    {algo.name[0]}
                                </div>
                                <span className={`text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full border transition-colors ${algo.difficulty === 'Beginner' ? 'text-emerald-500 border-emerald-100 bg-emerald-50/30' :
                                    algo.difficulty === 'Intermediate' ? 'text-indigo-500 border-indigo-100 bg-indigo-50/30' :
                                        'text-rose-500 border-rose-100 bg-rose-50/30'
                                    }`}>
                                    {algo.difficulty}
                                </span>
                            </div>

                            <h4 className="text-2xl font-black text-slate-950 mb-3 group-hover:text-indigo-600 transition-colors leading-[1.1] tracking-tighter">{algo.name}</h4>
                            <p className="text-[10px] text-slate-400 mb-10 font-bold tracking-[0.2em] uppercase">{algo.category}</p>

                            <div className="pt-10 border-t border-slate-50 space-y-4">
                                <span className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.4em] block">Core Derivation</span>
                                <p className="text-sm text-slate-600 font-medium leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity">{algo.mathFocus}</p>
                            </div>

                            <div className="mt-10 flex items-center gap-3 text-[10px] font-black uppercase text-indigo-600 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                                <span className="w-8 h-px bg-indigo-600"></span>
                                Deconstruct Module
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Deep Theory Section */}
            <section className="bg-slate-50 py-56 relative overflow-hidden border-y border-slate-200">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-50 to-transparent"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                        <div className="space-y-16">
                            <div>
                                <span className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.5em] block mb-8">Structural Sovereignty</span>
                                <h3 className="text-6xl md:text-7xl font-black mb-12 leading-[0.9] tracking-tighter text-slate-900">
                                    Master the <br /><span className="text-indigo-600 italic">Numerical DNA.</span>
                                </h3>
                            </div>

                            <div className="space-y-16">
                                {[
                                    { title: "Mathematical Sovereignty", desc: "Don't depend on black-box libraries. Build your own optimizers from the first axioms of calculus.", icon: "⚖️" },
                                    { title: "Explainable Intelligence", desc: "Derive every partial derivative so you can explain EXACTLY why a manifold converges.", icon: "🧠" },
                                    { title: "Tensor Topology", desc: "Understand high-dimensional geometry and how loss manifolds evolve over time.", icon: "🌌" }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-10 group">
                                        <div className="text-5xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">{item.icon}</div>
                                        <div className="space-y-3">
                                            <h4 className="text-2xl font-black tracking-tight text-slate-900">{item.title}</h4>
                                            <p className="text-slate-600 font-light text-lg italic leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-20 bg-indigo-100 blur-[150px] rounded-full"></div>
                            <div className="bg-white border border-slate-200 rounded-[4rem] p-16 md:p-24 relative z-10 shadow-2xl overflow-hidden group">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50 rounded-full -mr-24 -mt-24 blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                                <h4 className="text-[10px] font-black mb-12 uppercase tracking-[0.5em] text-indigo-600">Modeller's Protocol</h4>
                                <div className="space-y-8">
                                    {[
                                        "Derive MLE for Sigmoid Projection",
                                        "Implement Radial Basis Kernels",
                                        "Visualize Multi-head Attention",
                                        "Fine-tune Lagrangians for SVM",
                                        "Execute Manual Backpropagation"
                                    ].map((check, i) => (
                                        <div key={i} className="flex items-center gap-6 group/item">
                                            <div className="w-6 h-6 rounded-full border border-indigo-200 flex items-center justify-center text-[10px] text-indigo-600 bg-indigo-50 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-all shadow-sm">✓</div>
                                            <span className="text-lg font-medium text-slate-700 group-hover/item:text-slate-900 transition-colors italic">{check}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-20 p-12 bg-indigo-600 rounded-[3rem] text-center shadow-2xl shadow-indigo-200 transition-all duration-700 hover:scale-[1.05] relative overflow-hidden group/card">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-indigo-100 relative z-10">Lab Mastery Index</p>
                                    <div className="text-6xl font-black tracking-tighter relative z-10 text-white">98.4%</div>
                                    <p className="text-[10px] font-black mt-4 text-indigo-100 uppercase tracking-widest relative z-10 italic">Superior Proficiency Rating</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Lab Exit */}
            <section className="container mx-auto px-6 py-56">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[5rem] p-24 md:p-44 text-center text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none"></div>
                    <div className="absolute -top-44 -left-44 w-[600px] h-[600px] bg-white/10 rounded-full blur-[150px] transition-all duration-1000 group-hover:scale-150"></div>

                    <div className="relative z-10">
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-100 mb-12 block">Architectural Graduation</span>
                        <h2 className="text-5xl md:text-8xl font-black mb-16 leading-[0.85] tracking-tighter">
                            Ready to Code the <br /><span className="text-white italic underline decoration-white/30 underline-offset-[20px]">Future of Logic?</span>
                        </h2>
                        <div className="flex flex-col sm:flex-row justify-center gap-8 mt-24">
                            <Link href="/datasets" className="bg-white text-indigo-600 px-20 py-8 rounded-[2.5rem] font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95 shadow-2xl group/btn">
                                Enter Research Hub
                                <span className="inline-block ml-4 transition-transform group-hover/btn:translate-x-3 text-2xl">→</span>
                            </Link>
                            <Link href="/instructor" className="bg-white/10 border border-white/20 text-white px-20 py-8 rounded-[2.5rem] font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all active:scale-95 backdrop-blur-sm">
                                Meet the Architect
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default HomePage;
