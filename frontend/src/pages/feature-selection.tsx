import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import 'katex/dist/katex.min.css';

// Dynamic import for react-katex to avoid SSR issues
const BlockMath = dynamic(
    () => import('react-katex').then((mod) => mod.BlockMath),
    { ssr: false }
);

const InlineMath = dynamic(
    () => import('react-katex').then((mod) => mod.InlineMath),
    { ssr: false }
);

import Layout from '../components/Layout';
import WorkflowNavButtons from '../components/WorkflowNavButtons';

const CodeBlock = dynamic(() => import('../components/CodeBlock'), {
    ssr: false,
    loading: () => <div className="h-40 bg-slate-900 rounded-3xl animate-pulse my-6"></div>
});

const FeatureSelectionPage: React.FC = () => {
    const [mounted, setMounted] = useState(false);
    const [activeTab, setActiveTab] = useState('filter');
    const [playgroundData, setPlaygroundData] = useState({
        noiseLevel: 50,
        featureCount: 10,
        method: 'none'
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-6">
                <div className="w-20 h-20 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <div className="font-black text-indigo-400 tracking-[0.3em] text-xs uppercase animate-pulse">Initializing Signal Optimization Core</div>
            </div>
        );
    }

    const navigation = [
        { id: 'filter', title: 'Filter Method', icon: '🔍' },
        { id: 'wrapper', title: 'Wrapper Method', icon: '🎁' },
        { id: 'embedded', title: 'Embedded Method', icon: '💎' },
        { id: 'playground', title: 'Selection Lab', icon: '🎮' },
        { id: 'comparison', title: 'Global Matrix', icon: '📋' }
    ];

    const calculateMetrics = () => {
        const { noiseLevel, method, featureCount } = playgroundData;
        let accuracy = 85 - (noiseLevel / 5) - (featureCount / 2);
        let complexity = featureCount * 10;

        if (method === 'filter') accuracy += 5;
        if (method === 'wrapper') accuracy += 12;
        if (method === 'embedded') accuracy += 8;

        return {
            accuracy: Math.min(98, Math.max(40, accuracy)).toFixed(1),
            complexity: Math.min(100, complexity),
            speed: method === 'filter' ? 'Very Fast' : method === 'wrapper' ? 'Very Slow' : 'Balanced'
        };
    };

    const metrics = calculateMetrics();

    return (
        <Layout>
            <main className="container mx-auto px-6 py-20 max-w-7xl">
                {/* Hero */}
                <div className="bg-slate-900 rounded-[4rem] p-16 md:p-20 mb-20 text-white relative overflow-hidden shadow-[0_64px_128px_-32px_rgba(2,6,23,0.3)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 opacity-30"></div>
                    <div className="relative z-10 max-w-3xl">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full text-[10px] font-black tracking-[0.2em] text-indigo-400 uppercase mb-8 border border-indigo-500/20">
                            Optimization Module
                        </span>
                        <h1 className="text-6xl md:text-8xl font-black mb-12 leading-[0.9] tracking-tighter text-white">Pruning the <br /><span className="text-indigo-400 italic">Multivariate Noise.</span></h1>
                        <p className="text-xl text-slate-300 font-light leading-relaxed max-w-2xl">
                            Feature Selection is the process of lean-optimizing your tensors. Identify the highest-variance signals and discard the stochastic noise for maximum generalization.
                        </p>
                    </div>
                </div>

                {/* Sub-Nav */}
                <div className="flex flex-wrap gap-3 mb-16 bg-white p-3 rounded-[2.5rem] border border-slate-100 shadow-sm w-max max-w-full overflow-x-auto no-scrollbar">
                    {navigation.map(nav => (
                        <button
                            key={nav.id}
                            onClick={() => setActiveTab(nav.id)}
                            className={`flex items-center gap-3 px-8 py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest transition-all duration-500 whitespace-nowrap ${activeTab === nav.id
                                ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-100 scale-[1.02]'
                                : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                        >
                            <span>{nav.icon}</span>
                            {nav.title}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="min-h-[600px] space-y-24">
                    {activeTab === 'filter' && (
                        <div className="animate-fadeIn space-y-20">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                                <div className="space-y-12">
                                    <h3 className="text-5xl font-black text-slate-900 tracking-tighter leading-tight">
                                        The <span className="text-indigo-600">Pearson Signal</span> Probe.
                                    </h3>
                                    <p className="text-xl text-slate-500 leading-relaxed font-light">
                                        Filter methods use raw statistical properties to score features. Pearson Correlation measures the <strong>linear association</strong> between a feature and the target vector.
                                    </p>

                                    <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm relative group overflow-hidden">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 group-hover:bg-indigo-100 transition-colors"></div>
                                        <h4 className="text-[10px] font-black uppercase text-indigo-400 mb-8 tracking-[0.3em]">Mathematical Foundation</h4>
                                        <div className="bg-slate-50 p-10 rounded-[2.5rem] mb-10 shadow-inner flex items-center justify-center">
                                            <BlockMath math={`r = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum (x_i - \\bar{x})^2 \\cdot \\sum (y_i - \\bar{y})^2}}`} />
                                        </div>
                                        <div className="space-y-6">
                                            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Logic Breakdown</h5>
                                            <div className="grid grid-cols-1 gap-4 text-sm font-medium text-slate-600">
                                                <div className="flex gap-4 items-center">
                                                    <span className="w-8 h-8 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 text-[10px] font-black italic">r</span>
                                                    <span>Coefficient range [-1, 1]. Positive indicates direct scaling.</span>
                                                </div>
                                                <div className="flex gap-4 items-center">
                                                    <span className="w-8 h-8 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 text-[10px] font-black italic">x̄</span>
                                                    <span>Geometric center of the feature distribution.</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-12 pt-10 border-t border-slate-50">
                                            <p className="text-sm text-indigo-900 leading-relaxed italic font-light">
                                                "Pearson assumes <strong>strict linearity</strong>. If your signal is parabolic ($y=x^2$), $r$ will decay to 0. Consider Rank Correlation for non-linear manifolds."
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-12">
                                    <div className="bg-slate-900 rounded-[4rem] p-16 shadow-2xl relative overflow-hidden group border border-white/5">
                                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/10 to-transparent"></div>
                                        <h4 className="text-[10px] font-black uppercase text-indigo-500 mb-10 tracking-[0.3em]">Implementation Syntax</h4>
                                        <CodeBlock language="python" code={`# Rapid Correlation Filtering\ncorr_matrix = df.corr().abs()\n# Selection of High-Variance Signals\ntarget_cor = corr_matrix["target"]\nselected_features = target_cor[target_cor > 0.5]\nprint(f"Retained Signals: {selected_features.index.tolist()}")`} />

                                        <div className="mt-12 p-8 bg-white/5 rounded-3xl border border-white/10 group-hover:border-indigo-500/30 transition-all">
                                            <h5 className="text-[10px] font-black text-emerald-400 mb-6 tracking-widest uppercase">Signal Demonstration</h5>
                                            <div className="grid grid-cols-2 gap-8 text-[10px] font-mono">
                                                <div>
                                                    <p className="text-slate-500 mb-3 uppercase tracking-tighter">// INPUT TENSOR</p>
                                                    <div className="text-indigo-200">[Age, Salary, ID, Entropy]</div>
                                                </div>
                                                <div>
                                                    <p className="text-slate-500 mb-3 uppercase tracking-tighter">// OPTIMIZED OUTPUT</p>
                                                    <div className="text-emerald-400 font-bold">[Age, Salary]</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'wrapper' && (
                        <div className="animate-fadeIn space-y-20">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                                <div className="space-y-12">
                                    <h3 className="text-5xl font-black text-slate-900 tracking-tighter leading-tight">
                                        Recursive <br /><span className="text-indigo-600">Sub-manifold</span> Search.
                                    </h3>
                                    <p className="text-xl text-slate-500 leading-relaxed font-light">
                                        Wrapper methods use a "learning machine" to evaluate feature subsets based on <strong>actual predictive performance</strong>.
                                    </p>

                                    <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm relative group overflow-hidden">
                                        <h4 className="text-[10px] font-black uppercase text-purple-500 mb-8 tracking-[0.3em]">RFE Logic Loop</h4>
                                        <div className="bg-slate-50 p-10 rounded-[2.5rem] mb-10 shadow-inner">
                                            <div className="space-y-6 text-sm font-medium text-slate-600 italic">
                                                <div className="flex gap-4">
                                                    <span className="text-purple-600 font-black">01</span>
                                                    <span>Initialize model with total manifold $S$.</span>
                                                </div>
                                                <div className="flex gap-4">
                                                    <span className="text-purple-600 font-black">02</span>
                                                    <span>Rank features based on coefficient magnitude.</span>
                                                </div>
                                                <div className="flex gap-4">
                                                    <span className="text-purple-600 font-black">03</span>
                                                    <span>Prune feature with lowest ranking: $S = S - {"{i}"}$.</span>
                                                </div>
                                                <div className="flex gap-4">
                                                    <span className="text-purple-600 font-black">04</span>
                                                    <span>Iterate until optimal feature count is reached.</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-8 bg-slate-950 text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden group/tip">
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl group-hover/tip:scale-150 transition-transform"></div>
                                            <h5 className="text-[10px] font-black text-indigo-400 mb-4 uppercase tracking-widest">Architect's Warning</h5>
                                            <p className="text-xs leading-relaxed opacity-80 italic">"RFE is highly effective but computationally expensive. It assumes that greedy elimination leads to the global optimum. For $N \gt 10,000$, use Batch Pruning to maintain latency bounds."</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-12">
                                    <div className="bg-slate-900 rounded-[4rem] p-16 shadow-2xl relative overflow-hidden group border border-white/5">
                                        <h4 className="text-[10px] font-black uppercase text-purple-400 mb-10 tracking-[0.3em]">Scikit-Learn Implementation</h4>
                                        <CodeBlock language="python" code={`from sklearn.feature_selection import RFE\nfrom sklearn.linear_model import LogisticRegression\n\n# 1. Target Estimator\nmodel = LogisticRegression()\n# 2. Select prime dimension (k=3)\nrfe = RFE(estimator=model, n_features_to_select=3)\nrfe.fit(X, y)\n\n# 3. View support & ranking\nprint(f"Selected: {rfe.support_}")\nprint(f"Ranks: {rfe.ranking_}")`} />

                                        <div className="mt-12 p-10 bg-indigo-600 text-white rounded-[3rem] shadow-2xl relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                                            <h5 className="text-[10px] font-black text-indigo-200 mb-6 uppercase tracking-widest">Complexity Analysis</h5>
                                            <div className="text-3xl font-black mb-4 tracking-tighter">O(n!) <span className="text-xl text-indigo-300 font-light italic">Growth</span></div>
                                            <p className="text-xs leading-relaxed opacity-80">This method becomes mathematically prohibitive for high-dimensional feature spaces. Reserve for high-precision, low-volume signals.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'embedded' && (
                        <div className="animate-fadeIn space-y-20">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                                <div className="space-y-12">
                                    <h3 className="text-5xl font-black text-slate-900 tracking-tighter leading-tight">
                                        The <span className="text-indigo-600">Sparsity Diamond</span> (L1).
                                    </h3>
                                    <p className="text-xl text-slate-500 leading-relaxed font-light">
                                        Embedded methods weave selection into the optimization objective. LASSO performs selection by shrinking non-vital weights to absolute zero.
                                    </p>

                                    <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm relative group overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 group-hover:bg-teal-100 transition-colors"></div>
                                        <h4 className="text-[10px] font-black uppercase text-teal-500 mb-10 tracking-[0.3em]">The LASSO Equivalence</h4>
                                        <div className="bg-slate-50 p-12 rounded-[3rem] shadow-inner mb-12 flex items-center justify-center">
                                            <BlockMath math={`Min \\left[ SSE + \\lambda \\sum_{j=1}^{p} |\\beta_j| \\right]`} />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="p-8 bg-teal-50 rounded-[2rem] border border-teal-100">
                                                <span className="block font-black text-teal-700 text-[10px] uppercase mb-4 tracking-widest">Signal Loss (SSE)</span>
                                                <p className="text-xs text-slate-600 italic">Ensures the model accurately maps inputs to target manifold.</p>
                                            </div>
                                            <div className="p-8 bg-rose-50 rounded-[2rem] border border-rose-100">
                                                <span className="block font-black text-rose-700 text-[10px] uppercase mb-4 tracking-widest">L1 Penalty</span>
                                                <p className="text-xs text-slate-600 italic">Taxes complexity. Only signals with high predictive utility survive the shrink.</p>
                                            </div>
                                        </div>
                                        <div className="mt-12 p-8 bg-slate-900 text-white rounded-[2.5rem] relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/20 rounded-full blur-2xl"></div>
                                            <h5 className="text-[10px] font-black text-teal-400 mb-4 uppercase tracking-widest">Modeller's Note</h5>
                                            <p className="text-xs leading-relaxed opacity-80 italic">"L1 selection happens because its geometry is diamond-shaped. During optimization, the solution hits the axes (where weights are 0) more frequently than the circular L2 geometry."</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-12">
                                    <div className="bg-slate-900 rounded-[4rem] p-16 shadow-2xl relative overflow-hidden group border border-white/5">
                                        <h4 className="text-[10px] font-black uppercase text-teal-400 mb-10 tracking-[0.3em]">Embedded Selection Code</h4>
                                        <CodeBlock language="python" code={`from sklearn.linear_model import LogisticRegression\nfrom sklearn.feature_selection import SelectFromModel\n\n# 1. Hyper-parameterize for Sparsity (C=1/λ)\nmodel = LogisticRegression(penalty='l1', solver='liblinear')\nselector = SelectFromModel(model)\nselector.fit(X, y)\n\n# 2. Extract Survivors\nselected_features = X.columns[selector.get_support()]\nprint(f"Selected Count: {len(selected_features)}")`} />

                                        <div className="mt-12 p-12 bg-white rounded-[3rem] shadow-2xl relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 group-hover:bg-teal-100 transition-all"></div>
                                            <h5 className="text-[10px] font-black text-teal-500 mb-8 uppercase tracking-widest text-center">Weight Sparsity Profile</h5>
                                            <div className="flex items-end gap-2 h-40">
                                                {[...Array(12)].map((_, i) => (
                                                    <div key={i} className={`flex-1 transition-all duration-700 rounded-t-xl ${i % 3 === 0 ? 'bg-teal-500 shadow-xl' : 'bg-slate-100 opacity-30 shadow-none'}`}
                                                        style={{ height: i % 3 === 0 ? `${70 + Math.random() * 30}%` : '4px' }}></div>
                                                ))}
                                            </div>
                                            <p className="text-[9px] font-black text-slate-300 uppercase mt-8 text-center italic tracking-widest">Non-selected features forced to zero magnitude</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'playground' && (
                        <div className="animate-fadeIn space-y-16">
                            <div className="text-center max-w-3xl mx-auto mb-16">
                                <h2 className="text-6xl font-black text-slate-900 tracking-tighter mb-8 leading-tight">Signal <span className="text-indigo-600">Calibration Lab.</span></h2>
                                <p className="text-xl text-slate-500 font-light italic">Observe how selection strategies protect models against stochastic noise inflation.</p>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                                {/* Controls */}
                                <div className="lg:col-span-12 xl:col-span-4 bg-white p-12 rounded-[4rem] shadow-xl border border-slate-100 space-y-12">
                                    <h3 className="font-black text-slate-900 text-xs uppercase tracking-[0.3em] border-b border-slate-50 pb-8">Environmental Variables</h3>

                                    <div>
                                        <label className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">
                                            <span>Dataset Entropy</span>
                                            <span className="text-indigo-600">{playgroundData.noiseLevel}%</span>
                                        </label>
                                        <input
                                            type="range"
                                            className="w-full h-2 bg-slate-100 rounded-lg accent-indigo-600 cursor-pointer"
                                            value={playgroundData.noiseLevel}
                                            onChange={e => setPlaygroundData({ ...playgroundData, noiseLevel: parseInt(e.target.value) })}
                                        />
                                        <p className="text-[10px] text-slate-400 mt-4 leading-relaxed font-medium">Higher entropy indicates more irrelevant signals injected into the tensor.</p>
                                    </div>

                                    <div>
                                        <label className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">
                                            <span>Dimension Count (M)</span>
                                            <span className="text-indigo-600">{playgroundData.featureCount}</span>
                                        </label>
                                        <input
                                            type="range"
                                            min="2"
                                            max="100"
                                            className="w-full h-2 bg-slate-100 rounded-lg accent-purple-600 cursor-pointer"
                                            value={playgroundData.featureCount}
                                            onChange={e => setPlaygroundData({ ...playgroundData, featureCount: parseInt(e.target.value) })}
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Selection Architecture</p>
                                        {['none', 'filter', 'wrapper', 'embedded'].map(m => (
                                            <button
                                                key={m}
                                                onClick={() => setPlaygroundData({ ...playgroundData, method: m })}
                                                className={`w-full py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-95 shadow-lg ${playgroundData.method === m
                                                    ? 'bg-slate-950 text-white shadow-indigo-950/20'
                                                    : 'bg-slate-50 text-slate-400 hover:bg-white hover:shadow-xl hover:text-slate-900'
                                                    }`}
                                            >
                                                {m === 'none' ? 'Bypass' : `${m} Strategy`}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Results Visualization */}
                                <div className="lg:col-span-12 xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="bg-white p-12 rounded-[4rem] shadow-xl border border-slate-100 flex flex-col items-center justify-center text-center group">
                                        <h4 className="text-slate-300 font-black uppercase text-[10px] tracking-[0.4em] mb-12">Predicted Generalization</h4>
                                        <div className="relative w-56 h-56 flex items-center justify-center">
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle cx="112" cy="112" r="100" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-slate-50" />
                                                <circle cx="112" cy="112" r="100" stroke="currentColor" strokeWidth="16" fill="transparent" strokeDasharray={628} strokeDashoffset={628 - (628 * parseFloat(metrics.accuracy)) / 100} className="text-indigo-600 transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) shadow-2xl" />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-6xl font-black text-slate-950 tracking-tighter">{metrics.accuracy}%</span>
                                                <span className="text-[10px] text-slate-300 font-black uppercase tracking-[0.3em] mt-2">Accuracy Prob.</span>
                                            </div>
                                        </div>
                                        <p className="mt-12 text-sm text-slate-500 italic max-w-xs leading-relaxed font-light">
                                            {playgroundData.method === 'none' && playgroundData.noiseLevel > 60
                                                ? "⚠️ Your model is overfitting! Learning stochastic noise as structural signal."
                                                : "✅ Optimal signal-to-noise ratio maintained."}
                                        </p>
                                    </div>

                                    <div className="space-y-12">
                                        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
                                            <h4 className="text-slate-300 font-black uppercase text-[10px] tracking-widest mb-8">Computational Entropy</h4>
                                            <div className="space-y-4">
                                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                                                    <span className="text-slate-400">Memory Load</span>
                                                    <span className="text-indigo-600">{metrics.complexity}%</span>
                                                </div>
                                                <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden shadow-inner">
                                                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1)" style={{ width: `${metrics.complexity}%` }}></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-slate-950 p-12 rounded-[4rem] shadow-[0_64px_128px_-32px_rgba(2,6,23,0.5)] text-white relative overflow-hidden group">
                                            <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                                            <h4 className="text-indigo-500 font-black uppercase text-[10px] tracking-[0.4em] mb-8">Lab Perspective</h4>
                                            <p className="text-2xl font-light leading-tight tracking-tight opacity-90 italic">
                                                {playgroundData.method === 'wrapper'
                                                    ? "Wrapper strategies provide maximum precision but risk 'Dimension Explosion'. Best for curated feature sets."
                                                    : playgroundData.method === 'filter'
                                                        ? "Fast and robust. Use as the initial structural probe for massive data streams."
                                                        : "Thinner models are numerically superior. Fewer dimensions always lead to better generalization if signals are strong."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'comparison' && (
                        <div className="animate-fadeIn space-y-24">
                            <div className="bg-white rounded-[4rem] shadow-2xl border border-slate-100 overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-bl-[4rem] transition-colors"></div>
                                <div className="bg-slate-950 p-16 text-white relative z-10">
                                    <h2 className="text-5xl font-black mb-4 tracking-tighter">Strategic Selection Matrix</h2>
                                    <p className="text-indigo-400 font-black uppercase text-[10px] tracking-[0.4em] opacity-60">The Architectural Decision Framework</p>
                                </div>
                                <div className="overflow-x-auto relative z-10">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                                                <th className="px-16 py-10">Strategy Tier</th>
                                                <th className="px-16 py-10">Optimal Manifold</th>
                                                <th className="px-16 py-10">Core Advantage</th>
                                                <th className="px-16 py-10">Operational Risk</th>
                                                <th className="px-16 py-10">Primary Algorithms</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50 font-medium text-slate-600">
                                            {[
                                                { group: 'Filter Probes', data: 'High-Dimensional (M > 1k)', adv: 'Rapid Pruning', risk: 'Interaction Bypass', algorithms: 'All (General-purpose)' },
                                                { group: 'Wrapper Search', data: 'Low-Volume (M < 50)', adv: 'Max Precision', risk: 'Dimension Explosion', algorithms: 'KNN, Decision Forests' },
                                                { group: 'Embedded Shrink', data: 'Noisy Regressions', adv: 'In-built Sparsity', risk: 'Model Coupling', algorithms: 'LASSO, ElasticNet' }
                                            ].map((row, i) => (
                                                <tr key={i} className="hover:bg-indigo-50/20 transition-all group">
                                                    <td className="px-16 py-12">
                                                        <span className="block font-black text-slate-950 border-l-4 border-indigo-600 pl-6 uppercase text-[11px] tracking-widest">{row.group}</span>
                                                    </td>
                                                    <td className="px-16 py-12 text-sm italic opacity-70">{row.data}</td>
                                                    <td className="px-16 py-12"><span className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100">Verified Capability</span></td>
                                                    <td className="px-16 py-12 text-[10px] font-black text-rose-500 uppercase tracking-widest">{row.risk}</td>
                                                    <td className="px-16 py-12 text-sm font-black text-indigo-700 uppercase tracking-tighter">{row.algorithms}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* CTA Stage: Complete Curriculum */}
                            <div className="mt-24 bg-gradient-to-br from-indigo-900 to-indigo-950 rounded-[5rem] p-24 text-white text-center shadow-[0_80px_160px_-40px_rgba(2,6,23,0.5)] relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 pointer-events-none"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-400 mb-12 block relative z-10">Curriculum Graduation</span>
                                <h3 className="text-6xl md:text-8xl font-black mb-20 tracking-tighter relative z-10 leading-[0.9]">Architectural <br /><span className="text-white italic">Mastery.</span></h3>
                                <div className="flex flex-wrap justify-center gap-8 relative z-10">
                                    <Link href="/" className="bg-white text-indigo-900 px-24 py-8 rounded-[2.5rem] font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95 shadow-2xl flex items-center justify-center gap-4 group/btn">
                                        Back to Command Center
                                        <span className="text-2xl transition-transform group-hover/btn:translate-x-3">→</span>
                                    </Link>
                                    <Link href="/instructor" className="bg-white/5 border border-white/10 text-white px-20 py-8 rounded-[2.5rem] font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95 flex items-center justify-center gap-4 group/btn">
                                        Meet the Lead Architect
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(60px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn { animation: fadeIn 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {/* ML Workflow Navigation */}
            <div className="container mx-auto px-6 pb-20">
                <WorkflowNavButtons currentStep="feature-selection" />
            </div>
        </Layout>
    );
};

export default FeatureSelectionPage;
