import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import Layout from '../../components/Layout';
import { renderTextWithMath } from '../../utils/mathRenderer';
import WorkflowNavButtons from '../../components/WorkflowNavButtons';
import MLWorkflowNav from '../../components/MLWorkflowNav';

// Dynamic imports for Interactive Components
const NeuralNetworkPlayground = dynamic(() => import('../../components/NeuralNetworkPlayground'), { ssr: false });
const MLPlayground = dynamic(() => import('../../components/MLPlayground'), { ssr: false });
const TransformerPlayground = dynamic(() => import('../../components/TransformerPlayground'), { ssr: false });
const CodeBlock = dynamic(() => import('../../components/CodeBlock'), { ssr: false });

const InnovationContent: Record<string, { challenge: string; caseStudy: string; thoughtExperiment: string }> = {
    linear_regression: {
        challenge: "Derive the Partial Derivative of the MSE loss with respect to weight $w_j$. If we add a cost term $\\Omega(w) = |w|$, how does the gradient update change?",
        caseStudy: "Predicting Crop Yield with Heteroscedastic Noise.",
        thoughtExperiment: "What happens to the OLS solution if the features are perfectly correlated (Multi-collinearity)?"
    },
    logistic_regression: {
        challenge: "Explain why we use Binary Cross-Entropy instead of MSE for classification. Derive the gradient of the Sigmoid function.",
        caseStudy: "Loan Default Risk with Imbalanced Probability Thresholds.",
        thoughtExperiment: "Can a single neuron solve the XOR problem? If not, why geometrically?"
    },
    svm: {
        challenge: "Formulate the Dual Lagrangian for the SVM optimization. Why do we want to maximize the margin distance $2/||w||$?",
        caseStudy: "Face Detection in High-Dimensional Pixel Tensors.",
        thoughtExperiment: "If the data is non-linearly separable, can you design a Kernel function that maps 2D points to a 3D parabolic surface?"
    },
    knn: {
        challenge: "Design a weighted distance function $d(x,y) = \\sqrt{\\sum w_i (x_i - y_i)^2}$. How would you optimize $w_i$ for feature importance?",
        caseStudy: "Rare Disease Diagnosis using Patient Similarity Networks.",
        thoughtExperiment: "Does KNN suffer from the 'Curse of Dimensionality'? How does volume grow as $d \\to \\infty$?"
    },
    kmeans: {
        challenge: "Prove that K-Means is a coordinate descent algorithm. Why is it not guaranteed to find the global optimum?",
        caseStudy: "Customer Segmentation using Purchase Tensors.",
        thoughtExperiment: "What happens if you use Manhattan distance instead of Euclidean in the assignment step?"
    },
    decision_tree: {
        challenge: "Calculate the Information Gain for a split. If we use Gini Impurity $1 - \\sum p_i^2$, how does it differ from Entropy mathematically?",
        caseStudy: "Churn Prediction with High-Cardinality Categorical Features.",
        thoughtExperiment: "Can a Decision Tree represent a diagonal boundary $y = x$? How many levels would it need?"
    },
    naive_bayes: {
        challenge: "Derive the Maximum Likelihood Estimate (MLE) for the Gaussian Mean $\\mu$. Why do we use log-probabilities in implementation?",
        caseStudy: "Spam Detection with Laplace Smoothing for Rare Tokens.",
        thoughtExperiment: "If the 'Independence Assumption' is violated, does the model overestimate or underestimate the certainty of predictions?"
    },
    ann: {
        challenge: "Perform a manual Backpropagation step for a 3-layer network. Apply the chain rule to find $\\partial L / \\partial w^{(1)}$.",
        caseStudy: "Signal Reconstruction from Noisy Time-Series.",
        thoughtExperiment: "Why do Deep Networks prefer ReLU over Sigmoid for hidden layers? (Vanishing Gradient Proof)."
    },
    cnn: {
        challenge: "Calculate the output dimension for a convolution with kernel size $k$, stride $s$, and padding $p$.",
        caseStudy: "Satellite Imagery Classification with Translation Invariance.",
        thoughtExperiment: "Does a 1x1 convolution perform spatial learning or channel-wise feature mixing?"
    },
    rnn: {
        challenge: "Explain the BPTT (Backpropagation Through Time) gradient explosion mathematically.",
        caseStudy: "Stock Price Forecasting with Long-Term Memory Gating.",
        thoughtExperiment: "Why does LSTM have a 'Constant Error Carousel'? How does it avoid $0^T$ multiplications?"
    },
    transformer: {
        challenge: "Derive the Scaled Dot-Product Attention. Why do we divide by $\\sqrt{d_k}$?",
        caseStudy: "Large Language Models: The Math of Predictable Sequences.",
        thoughtExperiment: "Is self-attention $O(n^2)$? Can you design a linear-time attention mechanism?"
    }
};

const SectionRenderer = ({ sectionKey, content, algorithmId }: { sectionKey: string; content: any; algorithmId: string }) => {
    const renderContent = (data: any): JSX.Element => {
        if (typeof data === 'string') {
            if (data.includes('import ') || data.includes('def ')) {
                return <CodeBlock code={data} language="python" />;
            }

            const lines = data.split('\n');
            return (
                <div className="space-y-6">
                    {lines.map((line, idx) => {
                        if (line.startsWith('**')) return <h4 key={idx} className="text-2xl font-black text-slate-900 mt-12 mb-6 tracking-tight">{line.replace(/\*\*/g, '')}</h4>;
                        if (line.startsWith('•')) return (
                            <div key={idx} className="flex gap-4 items-start bg-slate-50 p-4 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-colors">
                                <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 group-hover:scale-125 transition-transform"></span>
                                <span className="text-slate-600 font-medium leading-relaxed">{line.substring(1).trim()}</span>
                            </div>
                        );
                        return <p key={idx} className="text-lg text-slate-500 leading-relaxed font-light">{line}</p>;
                    })}
                </div>
            );
        }

        if (Array.isArray(data)) {
            return (
                <div className="space-y-10">
                    {data.map((item, idx) => (
                        <div key={idx} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
                            {renderContent(item)}
                        </div>
                    ))}
                </div>
            );
        }

        if (typeof data === 'object' && data !== null) {
            return (
                <div className="space-y-12">
                    {Object.entries(data).map(([key, value]: [string, any]) => {
                        if (key === 'title') return null;

                        const formattedKey = key.replace(/_/g, ' ').toUpperCase();

                        if (key === 'equations' && Array.isArray(value)) {
                            return (
                                <div key={key} className="space-y-8">
                                    <h5 className="text-[10px] font-black tracking-[0.2em] text-indigo-400 mb-6">{formattedKey}</h5>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {value.map((eq, i) => (
                                            <div key={i} className="bg-slate-50 border border-slate-100 p-8 rounded-[2.5rem] group hover:border-indigo-300 hover:bg-white hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500">
                                                <h6 className="font-black text-slate-900 mb-6 flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 text-xs italic">f</div>
                                                    {eq.name}
                                                </h6>
                                                <div className="py-10 bg-white/50 backdrop-blur-sm rounded-3xl mb-8 border border-white flex items-center justify-center">
                                                    {eq.latex ? <BlockMath math={eq.latex} /> : <div className="text-center font-mono text-indigo-600 font-bold">{eq.formula}</div>}
                                                </div>
                                                <div className="p-5 bg-indigo-600 text-white rounded-[1.5rem] shadow-xl shadow-indigo-100">
                                                    <p className="text-xs font-medium leading-relaxed italic"><span className="font-black uppercase tracking-widest mr-2 text-indigo-200">Engineer's Lab Note:</span> {eq.explanation}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        }

                        if (key === 'code') return (
                            <div key={key}>
                                <h5 className="text-[10px] font-black tracking-[0.2em] text-slate-400 mb-6 uppercase">Source Implementation</h5>
                                <CodeBlock code={value} language="python" />
                            </div>
                        );

                        return (
                            <div key={key}>
                                <h5 className="text-[10px] font-black tracking-[0.2em] text-slate-400 mb-6">{formattedKey}</h5>
                                <div className="p-2">{renderContent(value)}</div>
                            </div>
                        );
                    })}
                </div>
            );
        }
        return <p>{String(data)}</p>;
    };

    return <div className="animate-fadeIn">{renderContent(content)}</div>;
};

const AlgorithmPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [mounted, setMounted] = useState(false);
    const [algorithmData, setAlgorithmData] = useState<any>(null);
    const [activeSection, setActiveSection] = useState('introduction');
    const [showPlayground, setShowPlayground] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        if (mounted && id) {
            fetch(`/data/${id}.json`)
                .then(res => res.json())
                .then(data => { setAlgorithmData(data); setLoading(false); })
                .catch(() => setLoading(false));
        }
    }, [mounted, id]);

    if (!mounted || loading || !algorithmData) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-6">
                <div className="w-20 h-20 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <div className="font-black text-indigo-400 tracking-[0.3em] text-xs uppercase animate-pulse">Initializing Lab Environment</div>
            </div>
        );
    }

    const sections = algorithmData.sections || {};
    const sectionKeys = Object.keys(sections);
    const innovation = InnovationContent[id as string] || InnovationContent.linear_regression;

    return (
        <Layout>
            <main className="container mx-auto px-6 py-20 max-w-7xl">
                {/* Hero Header */}
                <div className="bg-slate-900 rounded-[4rem] p-16 md:p-20 mb-20 text-white relative overflow-hidden shadow-[0_64px_128px_-32px_rgba(2,6,23,0.3)]">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600 opacity-20 blur-[150px] rounded-full -mr-72 -mt-72 animate-pulse"></div>
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full text-[10px] font-black tracking-[0.2em] text-indigo-400 uppercase mb-8 border border-indigo-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                                Architecture: {algorithmData.category}
                            </span>
                            <h2 className="text-6xl md:text-7xl font-black mb-10 leading-[0.9] tracking-tighter">{algorithmData.name}</h2>
                            <div className="flex flex-wrap gap-6">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Complexity</span>
                                    <span className="text-lg font-bold text-indigo-300">{algorithmData.difficulty}</span>
                                </div>
                                <div className="w-px h-12 bg-slate-700 hidden sm:block"></div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Est. Mastery Time</span>
                                    <span className="text-lg font-bold text-emerald-400">{algorithmData.estimatedTime}</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 shadow-2xl">
                            <h3 className="text-[10px] font-black uppercase text-indigo-400 mb-8 tracking-[0.3em]">Theoretical Objectives</h3>
                            <ul className="space-y-6">
                                {[
                                    { id: "01", text: "Deconstruct the mathematical objective function." },
                                    { id: "02", text: "Implement core optimization logic from scratch." },
                                    { id: "03", text: "Engineer constraints for real-world noise." }
                                ].map(obj => (
                                    <li key={obj.id} className="flex gap-5 items-start group">
                                        <span className="text-xs font-black text-indigo-500 bg-indigo-500/10 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-indigo-500 group-hover:text-white transition-all">{obj.id}</span>
                                        <p className="text-base font-light text-slate-300 leading-tight">{obj.text}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-3 space-y-12">
                        <section className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-10">Learning Path</h4>
                            <div className="space-y-4">
                                {sectionKeys.map((key, i) => (
                                    <button
                                        key={key}
                                        onClick={() => setActiveSection(key)}
                                        className={`w-full text-left p-6 rounded-[1.5rem] transition-all duration-500 group ${activeSection === key
                                            ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-200 -translate-y-1'
                                            : 'bg-slate-50 text-slate-400 hover:bg-white hover:shadow-lg hover:text-slate-900'}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className={`text-[10px] font-black italic ${activeSection === key ? 'text-indigo-200' : 'text-slate-300 group-hover:text-indigo-600'}`}>0{i + 1}</span>
                                            <span className="text-[10px] font-black uppercase tracking-widest">{key.replace(/_/g, ' ')}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </section>

                        <section className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/10 to-transparent"></div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500 mb-8">Innovation Challenge</h4>
                            <div className="space-y-8 relative z-10">
                                <div>
                                    <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest block mb-4">THE PROBLEM</span>
                                    <p className="text-sm text-slate-400 leading-relaxed font-light italic">{renderTextWithMath(innovation.challenge)}</p>
                                </div>
                                <div className="h-px bg-slate-800"></div>
                                <div>
                                    <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest block mb-4">ENGINEERING CASE</span>
                                    <p className="text-sm text-slate-400 leading-relaxed font-light">{renderTextWithMath(innovation.caseStudy)}</p>
                                </div>
                                <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition">Solve in Scratchpad →</button>
                            </div>
                        </section>
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-9">
                        {/* Action Bar */}
                        <div className="mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                            <h3 className="text-4xl font-black text-slate-900 capitalize tracking-tighter">
                                {activeSection.replace(/_/g, ' ')}
                            </h3>
                            <button
                                onClick={() => setShowPlayground(!showPlayground)}
                                className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95 ${showPlayground
                                    ? 'bg-rose-600 text-white hover:bg-rose-700'
                                    : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-201'
                                    }`}
                            >
                                {showPlayground ? 'Close Laboratory' : 'Open Innovation Lab 🔬'}
                            </button>
                        </div>

                        {/* Playground Container */}
                        {showPlayground && (
                            <div className="mb-20 animate-slideDown overflow-hidden rounded-[4rem] shadow-2xl border border-slate-100">
                                {(id === 'ann' || id === 'cnn' || id === 'rnn') && <NeuralNetworkPlayground />}
                                {id === 'transformer' && <TransformerPlayground />}
                                {['linear_regression', 'logistic_regression', 'knn', 'kmeans', 'naive_bayes', 'decision_tree', 'svm'].includes(id as string) && (
                                    <MLPlayground algorithmType={id as any} />
                                )}
                            </div>
                        )}

                        {/* Main Section Content */}
                        <div className="bg-transparent">
                            <SectionRenderer
                                sectionKey={activeSection}
                                content={sections[activeSection]}
                                algorithmId={id as string}
                            />
                        </div>

                        {/* Pagination */}
                        <div className="mt-20 flex justify-between items-center bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
                            <button
                                onClick={() => {
                                    const idx = sectionKeys.indexOf(activeSection);
                                    if (idx > 0) setActiveSection(sectionKeys[idx - 1]);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                disabled={sectionKeys.indexOf(activeSection) === 0}
                                className="px-10 py-5 bg-slate-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 disabled:opacity-30 hover:bg-slate-100 transition active:scale-95 flex items-center gap-3"
                            >
                                <span>←</span> Back
                            </button>
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Module Progress</span>
                                <div className="flex gap-1">
                                    {sectionKeys.map((k, i) => (
                                        <div key={k} className={`h-1 rounded-full transition-all duration-500 ${i <= sectionKeys.indexOf(activeSection) ? 'w-6 bg-indigo-600' : 'w-2 bg-slate-100'}`}></div>
                                    ))}
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    const idx = sectionKeys.indexOf(activeSection);
                                    if (idx < sectionKeys.length - 1) setActiveSection(sectionKeys[idx + 1]);
                                    window.scrollTo({ top: 400, behavior: 'smooth' });
                                }}
                                disabled={sectionKeys.indexOf(activeSection) === sectionKeys.length - 1}
                                className="px-10 py-5 bg-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white disabled:opacity-30 hover:bg-indigo-701 transition active:scale-95 shadow-2xl shadow-indigo-200 flex items-center gap-3"
                            >
                                Continue <span>→</span>
                            </button>
                        </div>

                        {/* ML Workflow Navigation */}
                        <div className="mt-20">
                            <WorkflowNavButtons
                                currentStep="algorithm"
                                algorithmId={id as string}
                            />
                        </div>

                        {/* Complete Workflow Overview */}
                        <div className="mt-20">
                            <MLWorkflowNav
                                currentStep="algorithm"
                                algorithmId={id as string}
                                variant="compact"
                            />
                        </div>
                    </div>
                </div>
            </main>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideDown {
                    from { opacity: 0; height: 0; transform: translateY(-40px); }
                    to { opacity: 1; height: auto; transform: translateY(0); }
                }
                .animate-fadeIn { animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-slideDown { animation: slideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            `}</style>
        </Layout>
    );
};

export default AlgorithmPage;
