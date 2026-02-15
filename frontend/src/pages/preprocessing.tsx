import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import Layout from '../components/Layout';
import WorkflowNavButtons from '../components/WorkflowNavButtons';

const CodeBlock = dynamic(() => import('../components/CodeBlock'), {
    ssr: false,
    loading: () => <div className="h-40 bg-slate-900 rounded-3xl animate-pulse my-6"></div>
});

const PreprocessingPage: React.FC = () => {
    const [mounted, setMounted] = useState(false);
    const [activeTab, setActiveTab] = useState('missing');

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-6">
                <div className="w-20 h-20 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <div className="font-black text-indigo-400 tracking-[0.3em] text-xs uppercase animate-pulse">Initializing Data Engineering Pipeline</div>
            </div>
        );
    }

    const navigation = [
        { id: 'missing', title: 'Missing Values', icon: '❓' },
        { id: 'scaling', title: 'Feature Scaling', icon: '⚖️' },
        { id: 'outliers', title: 'Outlier Handling', icon: '🚨' },
        { id: 'skewness', title: 'Skewness Correction', icon: '📉' },
        { id: 'summary', title: 'Master Matrix', icon: '📋' }
    ];

    return (
        <Layout>
            <main className="container mx-auto px-6 py-20 max-w-7xl">
                {/* Hero */}
                <div className="bg-slate-900 rounded-[4rem] p-16 md:p-20 mb-20 text-white relative overflow-hidden shadow-[0_64px_128px_-32px_rgba(2,6,23,0.3)]">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600 opacity-20 blur-[150px] rounded-full -mr-72 -mt-72 animate-pulse"></div>
                    <div className="relative z-10 max-w-3xl">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full text-[10px] font-black tracking-[0.2em] text-indigo-400 uppercase mb-8 border border-indigo-500/20">
                            Data Engineering Module
                        </span>
                        <h1 className="text-6xl md:text-8xl font-black mb-12 leading-[0.9] tracking-tighter">Numeric Decontamination & <br /><span className="text-indigo-400 italic">Structural Scaling.</span></h1>
                        <p className="text-xl text-slate-300 font-light leading-relaxed max-w-2xl">
                            Models are only as good as the mathematical quality of their inputs. Handle missingness, outliers, and variance imbalance with engineering precision.
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
                <div className="animate-fadeIn min-h-[600px]">
                    {activeTab === 'missing' && (
                        <div className="space-y-16">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                                <div className="space-y-10">
                                    <h3 className="text-5xl font-black text-slate-900 tracking-tighter leading-tight">
                                        Managing the <span className="text-indigo-600">Mathematical Void.</span>
                                    </h3>
                                    <p className="text-xl text-slate-500 leading-relaxed font-light">
                                        Data nulls (NaN) represent a break in the geometric manifold. We must either <strong>Drop</strong>, <strong>Impute</strong>, or <strong>Model</strong> the missingness to maintain structural integrity.
                                    </p>

                                    <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-12">
                                        <div className="group">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-6 group-hover:text-indigo-600 transition-colors">Phase 1: Statistical Imputation</h4>
                                            <p className="text-base text-slate-600 mb-8 leading-relaxed">Replacing nulls with the Mean, Median, or Mode of the feature. Simple, but reduces latent variance.</p>
                                            <CodeBlock language="python" code={`from sklearn.impute import SimpleImputer\nimputer = SimpleImputer(strategy='mean')\nX_clean = imputer.fit_transform(X_miss)`} />
                                        </div>
                                        <div className="h-px bg-slate-50"></div>
                                        <div className="group">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-6 group-hover:text-emerald-600 transition-colors">Phase 2: KNN Imputation</h4>
                                            <p className="text-base text-slate-600 mb-8 leading-relaxed">Using local neighbor density to estimate missing values. Highly accurate for clustered manifolds.</p>
                                            <CodeBlock language="python" code={`from sklearn.impute import KNNImputer\nimputer = KNNImputer(n_neighbors=5, weights='distance')\nX_clean = imputer.fit_transform(X_miss)`} />
                                        </div>
                                    </div>
                                </div>
                                <div className="sticky top-32 space-y-12">
                                    <div className="bg-slate-900 rounded-[4rem] p-16 text-white shadow-[0_64px_128px_-32px_rgba(2,6,23,0.4)] relative overflow-hidden group border border-white/5">
                                        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-[80px] -mr-24 -mt-24 group-hover:bg-indigo-500/20 transition-all duration-1000"></div>
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500 mb-10">Stochastic Visualization</h4>
                                        <div className="space-y-6 font-mono text-xs">
                                            <div className="p-8 bg-white/5 rounded-3xl border border-white/10 group-hover:border-indigo-500/30 transition-all">
                                                <p className="text-slate-500 mb-4 uppercase tracking-widest text-[9px] font-black">// Raw Signal (Dirty)</p>
                                                <div className="space-y-1 opacity-70">
                                                    <p>[25.0, 60000]</p>
                                                    <p className="text-rose-400 font-bold">[NULL, 45000] &lt;-- Gap Observed</p>
                                                    <p>[30.0, NULL] &lt;-- Gap Observed</p>
                                                </div>
                                            </div>
                                            <div className="p-8 bg-indigo-500/10 rounded-3xl border border-indigo-500/30 group-hover:bg-indigo-500/20 transition-all">
                                                <p className="text-indigo-400 mb-4 uppercase tracking-widest text-[9px] font-black">// Resolved Signal (Imputed)</p>
                                                <div className="space-y-1">
                                                    <p>[25.0, 60000]</p>
                                                    <p className="text-emerald-400 font-bold">[27.5, 45000]</p>
                                                    <p className="text-emerald-400 font-bold">[30.0, 52500]</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pt-12">
                                            <h5 className="text-[10px] font-black uppercase text-slate-500 mb-6 tracking-widest">Architect's Directive</h5>
                                            <p className="text-base text-slate-400 font-light italic leading-relaxed">"Never use future data to impute past signals. Split your train/test sensors first to prevent <strong>Temporal Data Leakage</strong>."</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'scaling' && (
                        <div className="space-y-20">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                                <div className="space-y-12">
                                    <h3 className="text-5xl font-black text-slate-900 tracking-tighter leading-tight">
                                        Democratic <span className="text-indigo-600">Feature Influence.</span>
                                    </h3>
                                    <p className="text-xl text-slate-500 leading-relaxed font-light">
                                        Distance-based models are sensitive to magnitude. We must bring all features to a common scale to ensure uniform influence on the objective function.
                                    </p>

                                    <div className="space-y-12">
                                        <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm group hover:border-indigo-600 transition-all duration-500">
                                            <h4 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Standardization (Gaussian Scale)</h4>
                                            <div className="py-12 bg-slate-50 rounded-[2.5rem] mb-10 shadow-inner flex items-center justify-center">
                                                <BlockMath math={`z = \\frac{x - \\mu}{\\sigma}`} />
                                            </div>
                                            <div className="flex gap-4 items-start bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
                                                <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 shrink-0"></div>
                                                <p className="text-sm text-indigo-900 font-medium leading-relaxed italic">Creates a distribution with $\mu=0$ and $\sigma=1$. Essential for Linear Discriminant Analysis and Principal Component Analysis.</p>
                                            </div>
                                        </div>
                                        <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm group hover:border-emerald-600 transition-all duration-500">
                                            <h4 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Normalization (Bounded Scale)</h4>
                                            <div className="py-12 bg-slate-50 rounded-[2.5rem] mb-10 shadow-inner flex items-center justify-center">
                                                <BlockMath math={`x_{norm} = \\frac{x - x_{min}}{x_{max} - x_{min}}`} />
                                            </div>
                                            <div className="flex gap-4 items-start bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
                                                <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 shrink-0"></div>
                                                <p className="text-sm text-emerald-900 font-medium leading-relaxed italic">Squeezes all data into a fixed [0, 1] range. Critical for Neural Network activation functions like Sigmoid and Softmax.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-12">
                                    <div className="bg-slate-900 rounded-[4rem] p-16 text-white shadow-2xl relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                                        <h4 className="text-[10px] font-black uppercase text-indigo-400 mb-10 tracking-[0.3em]">Robust Scaler Geometry</h4>
                                        <p className="text-lg text-slate-300 mb-12 leading-relaxed font-light">
                                            When datasets contain massive outliers, the mean $\mu$ and standard deviation $\sigma$ become biased. Traditional Z-Score fails to protect the model.
                                        </p>
                                        <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 mb-12 shadow-2xl">
                                            <span className="text-[10px] font-black text-emerald-400 block mb-6 uppercase tracking-widest">Interquartile Range Solution</span>
                                            <div className="py-8">
                                                <BlockMath math={`x_{robust} = \\frac{x - Q_2}{Q_3 - Q_1}`} />
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-500 leading-relaxed italic font-light">
                                            By using the Median ($Q_2$) and IQR, we create a scaler that ignores extreme anomalies and focuses on the heart of the manifold.
                                        </p>
                                    </div>
                                    <CodeBlock language="python" code={`from sklearn.preprocessing import RobustScaler\n\n# Protecting against outlier noise\nscaler = RobustScaler()\nX_resilient = scaler.fit_transform(X_raw)`} />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'outliers' && (
                        <div className="space-y-20">
                            <div className="max-w-4xl mx-auto text-center mb-20">
                                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-8 block">Anomaly Detection Layer</span>
                                <h3 className="text-6xl font-black text-slate-900 tracking-tighter mb-10 leading-tight">Outlier Filtering <br /><span className="text-indigo-600">Geometry.</span></h3>
                                <p className="text-slate-500 text-xl font-light leading-relaxed max-w-2xl mx-auto">
                                    Detect anomalies that pull decision boundaries away from the true signal manifold.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="bg-white p-16 rounded-[4rem] border border-slate-100 shadow-sm relative group overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-3.5 bg-rose-500"></div>
                                    <h4 className="text-3xl font-black mb-8 tracking-tight">3-Sigma Variance Probe</h4>
                                    <p className="text-lg text-slate-500 mb-12 leading-relaxed font-light">Identifying points lying more than 3 standard deviations from the mean. These represent the 0.3% most extreme probability events.</p>
                                    <div className="bg-slate-50 p-10 rounded-[2.5rem] mb-10 shadow-inner flex items-center justify-center">
                                        <InlineMath math={"|z| > 3 \\implies \\text{Outlier Flag}"} />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 bg-slate-50 p-4 rounded-2xl w-max">
                                            <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
                                            GAUSSIAN TARGETED
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white p-16 rounded-[4rem] border border-slate-100 shadow-sm relative group overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-3.5 bg-indigo-600"></div>
                                    <h4 className="text-3xl font-black mb-8 tracking-tight">IQR Fence Method</h4>
                                    <p className="text-lg text-slate-500 mb-12 leading-relaxed font-light">Calculating logical bounds: [Q1 - 1.5*IQR, Q3 + 1.5*IQR]. Highly robust to existing dataset contamination.</p>
                                    <div className="bg-slate-50 p-10 rounded-[2.5rem] mb-10 shadow-inner flex items-center justify-center">
                                        <InlineMath math={"x < Q_1 - 1.5 \\cdot \\text{IQR}"} />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 bg-slate-50 p-4 rounded-2xl w-max">
                                            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>
                                            DISTRIBUTION AGNOSTIC
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'skewness' && (
                        <div className="space-y-20">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                                <div className="space-y-12">
                                    <h3 className="text-5xl font-black text-slate-900 tracking-tighter leading-tight">
                                        Distribution <br /><span className="text-indigo-600">Warping Logic.</span>
                                    </h3>
                                    <p className="text-xl text-slate-500 leading-relaxed font-light">
                                        If your distribution has an infinite tail, the model's coefficients become unstable. We use power transforms to restore symmetry.
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm group hover:-translate-y-2 transition-transform duration-500">
                                            <h4 className="text-xl font-black mb-6 tracking-tight">Log Mapping</h4>
                                            <div className="py-6 flex justify-center">
                                                <BlockMath math={"y = \\ln(1 + x)"} />
                                            </div>
                                            <p className="text-[10px] font-black text-slate-300 mt-6 tracking-widest uppercase">Target: Right Skew</p>
                                        </div>
                                        <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm group hover:-translate-y-2 transition-transform duration-500">
                                            <h4 className="text-xl font-black mb-6 tracking-tight">Box-Cox Power</h4>
                                            <div className="py-6 flex justify-center">
                                                <BlockMath math={"y = \\frac{x^\\lambda - 1}{\\lambda}"} />
                                            </div>
                                            <p className="text-[10px] font-black text-slate-300 mt-6 tracking-widest uppercase">Target: Normality</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-900 rounded-[4rem] p-16 text-white relative overflow-hidden shadow-2xl">
                                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-500/10 to-transparent"></div>
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-10">Homoscedasticity Guard</h4>
                                    <p className="text-2xl leading-relaxed font-light mb-12 italic tracking-tight opacity-90">
                                        "Linear models assume constant variance. Power transforms restore mathematical validity to your regression slopes across the entire range."
                                    </p>
                                    <div className="p-8 bg-white/5 rounded-3xl border border-white/10 group">
                                        <p className="text-[10px] font-black text-emerald-400 mb-4 tracking-widest uppercase flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                                            Structural Tip
                                        </p>
                                        <p className="text-sm leading-relaxed text-indigo-100 opacity-70">Apply log transforms only to positive signals. Use Log1p to handle zero-intercept observations without error.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'summary' && (
                        <div className="space-y-20 animate-fadeIn">
                            <div className="bg-white rounded-[4rem] shadow-2xl border border-slate-100 overflow-hidden">
                                <div className="bg-slate-950 p-16 text-white flex flex-col md:flex-row justify-between items-center gap-10">
                                    <div>
                                        <h2 className="text-4xl font-black mb-2 tracking-tighter">Preprocessing Master Matrix</h2>
                                        <p className="text-indigo-400 font-medium uppercase text-[10px] tracking-[0.3em] opacity-60">The Data Engineering Decision Logic</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest">Active System: Verified</div>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                                                <th className="px-16 py-8">Operational Challenge</th>
                                                <th className="px-16 py-8">Mathematical Tool</th>
                                                <th className="px-16 py-8">Winning Outcome</th>
                                                <th className="px-16 py-8">Risk Profile</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50 font-medium text-slate-600">
                                            {[
                                                { challenge: 'Missing Variance', tool: 'KNN Imputer', outcome: 'Correlated Imputation', risk: 'High Latency' },
                                                { challenge: 'Magnitude Bias', tool: 'StandardScaler', outcome: 'Uniform Manifold', risk: 'Outlier Sensitive' },
                                                { challenge: 'Infinite Tails', tool: 'Power Transform', outcome: 'Gaussian Restoration', risk: 'Interpretability' },
                                                { challenge: 'Noisy Channels', tool: 'RobustScaler', outcome: 'Anomaly Resilience', risk: 'Low Variance Loss' }
                                            ].map((row, i) => (
                                                <tr key={i} className="hover:bg-indigo-50/20 transition-all group">
                                                    <td className="px-16 py-10 font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase text-[11px] tracking-widest">{row.challenge}</td>
                                                    <td className="px-16 py-10 font-mono text-xs text-indigo-500">{row.tool}</td>
                                                    <td className="px-16 py-10 text-sm">{row.outcome}</td>
                                                    <td className="px-16 py-10 text-[10px] font-black text-rose-500 uppercase tracking-widest">{row.risk}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="mt-20 bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-900 rounded-[5rem] p-24 text-white text-center shadow-2xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 pointer-events-none"></div>
                                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-[120px] group-hover:scale-125 transition-transform duration-1000"></div>
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-200 mb-12 block relative z-10">Module Graduation</span>
                                <h3 className="text-6xl md:text-8xl font-black mb-16 tracking-tighter relative z-10 leading-[0.9]">Lean out the <br /><span className="text-white italic">Signal.</span></h3>
                                <Link href="/feature-selection" className="relative z-10 bg-white text-indigo-600 px-20 py-8 rounded-[2.5rem] font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] inline-flex items-center gap-4 group">
                                    Activate Selection Engine
                                    <span className="text-xl transition-transform group-hover:translate-x-3">→</span>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn { animation: fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {/* ML Workflow Navigation */}
            <div className="container mx-auto px-6 pb-20">
                <WorkflowNavButtons currentStep="preprocessing" />
            </div>
        </Layout>
    );
};

export default PreprocessingPage;
