import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import Layout from '../components/Layout';
import WorkflowNavButtons from '../components/WorkflowNavButtons';

// Dynamically import Chart.js components with SSR disabled
const Scatter = dynamic(() => import('react-chartjs-2').then(mod => mod.Scatter), {
    ssr: false,
    loading: () => <div className="animate-pulse bg-slate-900/5 h-64 rounded-3xl"></div>
});

const Line = dynamic(() => import('react-chartjs-2').then(mod => mod.Line), {
    ssr: false,
    loading: () => <div className="animate-pulse bg-slate-900/5 h-64 rounded-3xl"></div>
});

const Bar = dynamic(() => import('react-chartjs-2').then(mod => mod.Bar), {
    ssr: false,
    loading: () => <div className="animate-pulse bg-slate-900/5 h-64 rounded-3xl"></div>
});

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title as ChartTitle,
    Tooltip,
    Legend,
    ArcElement,
    RadialLinearScale,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ChartTitle,
    Tooltip,
    Legend,
    ArcElement,
    RadialLinearScale,
    Filler
);

const CodeBlock = dynamic(() => import('../components/CodeBlock'), {
    ssr: false,
    loading: () => <div className="h-40 bg-slate-900 rounded-[2rem] animate-pulse my-6"></div>
});

const EDAPage: React.FC = () => {
    const [activeAnalysis, setActiveAnalysis] = useState<'classification' | 'regression' | 'timeseries' | 'image'>('classification');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-6">
                <div className="w-20 h-20 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <div className="font-black text-indigo-400 tracking-[0.3em] text-xs uppercase animate-pulse">Initializing Visualization Core</div>
            </div>
        );
    }

    const dataMockups = {
        classification: {
            type: 'scatter' as const,
            data: {
                datasets: [
                    { label: 'Class A (Iris)', data: [{ x: 1, y: 2 }, { x: 1.5, y: 1.8 }, { x: 2, y: 2.2 }], backgroundColor: 'rgba(79, 70, 229, 0.7)' },
                    { label: 'Class B (Wine)', data: [{ x: 5, y: 5 }, { x: 5.5, y: 5.2 }, { x: 6, y: 4.8 }], backgroundColor: 'rgba(244, 63, 94, 0.7)' }
                ]
            }
        },
        regression: {
            type: 'line' as const,
            data: {
                labels: ['0', '1', '2', '3', '4', '5'],
                datasets: [{
                    label: 'Predicted (Housing)',
                    data: [1, 2.2, 3.1, 4.4, 5.0, 6.2],
                    borderColor: 'rgba(16, 185, 129, 1)',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: true
                }]
            }
        },
        timeseries: {
            type: 'bar' as const,
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Trend (Macrodata)',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: 'rgba(139, 92, 246, 0.6)',
                }]
            }
        }
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' as const, labels: { font: { size: 10, weight: 'bold' as const } } }
        },
        scales: {
            x: { grid: { display: false }, ticks: { font: { size: 9 } } },
            y: { grid: { color: 'rgba(0,0,0,0.02)' }, ticks: { font: { size: 9 } } }
        }
    };

    return (
        <Layout>
            <main className="container mx-auto px-6 py-20 max-w-7xl">
                {/* Hero */}
                <div className="bg-slate-900 rounded-[4rem] p-16 md:p-20 mb-20 text-white relative overflow-hidden shadow-[0_64px_128px_-32px_rgba(2,6,23,0.3)]">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 opacity-30"></div>
                    <div className="relative z-10 max-w-3xl">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full text-[10px] font-black tracking-[0.2em] text-indigo-400 uppercase mb-8 border border-indigo-500/20">
                            Exploratory Math Engine
                        </span>
                        <h1 className="text-6xl md:text-8xl font-black mb-12 leading-[0.9] tracking-tighter">Quantifying the <br /><span className="text-indigo-400 italic">Latent Geometry.</span></h1>
                        <p className="text-xl text-slate-300 font-light leading-relaxed max-w-2xl">
                            EDA is the process of using moments, entropy, and signal processing to "see" the mathematical structure before the model is ever initialized.
                        </p>
                    </div>
                </div>

                {/* Analysis Switcher */}
                <div className="flex flex-wrap gap-3 mb-16 bg-white p-3 rounded-[2.5rem] border border-slate-100 shadow-sm w-max max-w-full overflow-x-auto no-scrollbar">
                    {[
                        { id: 'classification', title: 'Classifier EDA', icon: '🎯' },
                        { id: 'regression', title: 'Regression EDA', icon: '📈' },
                        { id: 'timeseries', title: 'Time Series EDA', icon: '⏳' },
                        { id: 'image', title: 'Tensor EDA', icon: '🖼️' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveAnalysis(tab.id as any)}
                            className={`px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap flex items-center gap-3 ${activeAnalysis === tab.id
                                ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-100 scale-[1.02]'
                                : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}
                        >
                            <span>{tab.icon}</span>
                            {tab.title}
                        </button>
                    ))}
                </div>

                {/* Dynamic Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-24 animate-fadeIn">
                    <div className="lg:col-span-12 xl:col-span-7 space-y-12">
                        <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm min-h-[600px] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8">
                                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                            </div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-10">Real-time Spectral Observation</h3>
                            <div className="h-[450px]">
                                {activeAnalysis === 'classification' && (
                                    <Scatter
                                        data={dataMockups.classification.data}
                                        options={chartOptions}
                                    />
                                )}
                                {activeAnalysis === 'regression' && (
                                    <Line
                                        data={dataMockups.regression.data}
                                        options={chartOptions}
                                    />
                                )}
                                {activeAnalysis === 'timeseries' && (
                                    <Bar
                                        data={dataMockups.timeseries.data}
                                        options={chartOptions}
                                    />
                                )}
                                {activeAnalysis === 'image' && (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center h-full">
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                            <div key={i} className="aspect-square bg-slate-900 rounded-3xl flex flex-col items-center justify-center p-4 border border-white/5 hover:border-indigo-500 transition-all cursor-crosshair group/item shadow-2xl">
                                                <div className="text-[10px] font-mono text-indigo-400 mb-2 opacity-50">TENSOR_{i}</div>
                                                <div className="w-full h-px bg-white/5 mb-4 group-hover/item:bg-indigo-500/50"></div>
                                                <div className="text-[8px] font-mono text-slate-500">28x28x1</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-[4rem] p-16 shadow-[0_64px_128px_-32px_rgba(2,6,23,0.4)] relative overflow-hidden group border border-white/5">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                            <h4 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] mb-10 underline decoration-indigo-500/30 underline-offset-8">Implementation Source</h4>
                            <CodeBlock language="python" code={
                                activeAnalysis === 'classification' ? `import seaborn as sns\n# Multidimensional Correlation Probes\nsns.pairplot(df, hue='class', diag_kind='kde')\n# Target: Discovering Non-overlapping Density Hubs` :
                                    activeAnalysis === 'regression' ? `import matplotlib.pyplot as plt\n# Detecting Linear Deviations\nplt.scatter(df['x'], df['y'], alpha=0.5)\nsns.regplot(x='x', y='y', data=df, lowess=True)\n# Look for: S-curves vs Linear Bounds` :
                                        activeAnalysis === 'timeseries' ? `from statsmodels.tsa.seasonal import MSTL\n# Seasonal Multi-period Decomposition\nres = MSTL(df['value'], periods=(12, 144)).fit()\nres.plot()\n# Target: Identifying Stochastic Residuals` :
                                            `import tensorflow as tf\n# Visualizing First-Layer Kernels\nplt.imshow(tf.reshape(X[0], [28, 28]))\n# Goal: Confirming spatial relevance of pixel clusters`
                            } />
                        </div>
                    </div>

                    <div className="lg:col-span-12 xl:col-span-5 space-y-12">
                        <section className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm relative group overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/50 group-hover:bg-indigo-100/50 transition-colors"></div>
                            <h3 className="text-2xl font-black text-slate-900 mb-10 flex items-center gap-4">
                                <span className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-sm shadow-xl shadow-indigo-100">Ω</span>
                                Mathematical Logic
                            </h3>
                            <div className="py-12 bg-slate-50 rounded-[3rem] mb-10 flex items-center justify-center shadow-inner border border-slate-100">
                                {activeAnalysis === 'classification' && <BlockMath math={"H(X) = -\\sum p(x) \\log p(x)"} />}
                                {activeAnalysis === 'regression' && <BlockMath math={"Cov(X,Y) = \\frac{\\sum(x_i-\\bar{x})(y_i-\\bar{y})}{n-1}"} />}
                                {activeAnalysis === 'timeseries' && <BlockMath math={"\\rho_k = \\frac{E[(Y_t-\\mu)(Y_{t+k}-\\mu)]}{\\sigma^2}"} />}
                                {activeAnalysis === 'image' && <BlockMath math={"\\mathcal{F}\\{f\\}(\\omega) = \\int_{-\\infty}^{\\infty} f(t) e^{-i\\omega t} dt"} />}
                            </div>
                            <div className="space-y-6">
                                <h4 className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Theoretical Breakdown</h4>
                                <p className="text-base text-slate-500 leading-relaxed font-light italic">
                                    {activeAnalysis === 'classification' ? "Entropy measures the disorder of classification labels. High entropy indicates complex boundary intersection between classes." :
                                        activeAnalysis === 'regression' ? "Covariance identifies if features move in mathematical unison, essential for preventing regression inflation." :
                                            activeAnalysis === 'timeseries' ? "Autocorrelation measures the self-similarity of a signal over time offsets, revealing hidden periodic structures." :
                                                "The Fourier Transform decomposes pixel matrices into frequency components, showing edge density across the canvas."}
                                </p>
                            </div>
                        </section>

                        <div className="bg-indigo-600 p-12 rounded-[4rem] shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                            <h4 className="text-[10px] font-black text-indigo-200 uppercase tracking-[0.3em] mb-8">Modeller's Directive</h4>
                            <div className="space-y-8 relative z-10">
                                <div className="flex gap-6 items-start">
                                    <span className="text-3xl">📡</span>
                                    <p className="text-sm text-white font-medium leading-relaxed opacity-90 italic">Always verify <strong>Kurtosis</strong>. Extreme tails in feature distribution can break your Gradient Descent paths later.</p>
                                </div>
                                <div className="h-px bg-white/20"></div>
                                <div className="flex gap-6 items-start">
                                    <span className="text-3xl">🧬</span>
                                    <p className="text-sm text-white font-medium leading-relaxed opacity-90 italic">Identify <strong>Target Leakage</strong>. If a feature has almost 1.0 correlation with target, it likely contains time-shifted info.</p>
                                </div>
                                <button className="w-full py-5 bg-white text-indigo-600 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition active:scale-95 shadow-2xl">Download Analysis Checklist ↓</button>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="bg-slate-900 p-16 md:p-24 rounded-[5rem] text-white shadow-[0_80px_160px_-40px_rgba(2,6,23,0.5)] relative overflow-hidden">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div>
                            <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.5em] mb-12 block">Advanced Statistical Lab</span>
                            <h3 className="text-5xl md:text-7xl font-black mb-12 leading-[0.9] tracking-tighter">Hypothesis <br /><span className="text-indigo-400 italic">Validation.</span></h3>
                            <p className="text-slate-400 text-xl font-light leading-relaxed mb-16 max-w-xl">
                                Don't rely on intuition. Run an **ANOVA** between groups. If $p \lt 0.05$, the signal is statistically distinct for your chosen architecture.
                            </p>
                            <div className="flex flex-wrap gap-6">
                                <Link href="/preprocessing" className="bg-indigo-600 text-white px-12 py-6 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-500 transition-all shadow-2xl shadow-indigo-600/20 active:scale-95">Enter Stage 3: Preprocessing →</Link>
                                <Link href="/datasets" className="bg-white/5 border border-white/10 text-white px-12 py-6 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white/10 transition-all active:scale-95">Switch Data Source</Link>
                            </div>
                        </div>
                        <div className="bg-white/5 p-12 rounded-[4rem] border border-white/10 backdrop-blur-3xl shadow-2xl relative group">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                            <div className="mb-10">
                                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] block mb-4">Core Proof</span>
                                <span className="text-2xl font-black tracking-tight">Shapiro-Wilk $W$-Static</span>
                            </div>
                            <div className="py-12 bg-white/5 rounded-[3rem] shadow-inner mb-10 flex items-center justify-center">
                                <BlockMath math={"W = \\frac{(\\sum a_i x_{(i)})^2}{\\sum (x_i - \\bar{x})^2}"} />
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed font-light italic">
                                This formula determines if your tensor data follows a Normal distribution. Accurate modelling of non-Gaussian signals requires specific robust kernel selections.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            {/* ML Workflow Navigation */}
            <div className="container mx-auto px-6 pb-20">
                <WorkflowNavButtons currentStep="eda" />
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn { animation: fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </Layout>
    );
};

export default EDAPage;
