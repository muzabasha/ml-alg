import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const CodeBlock = dynamic(() => import('../components/CodeBlock'), {
    ssr: false,
    loading: () => <div className="h-40 bg-gray-900 rounded-xl animate-pulse my-6"></div>
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
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
            </div>
        );
    }

    const navigation = [
        { id: 'filter', title: 'Filter Method', icon: '🔍' },
        { id: 'wrapper', title: 'Wrapper Method', icon: '🎁' },
        { id: 'embedded', title: 'Embedded Method', icon: '💎' },
        { id: 'playground', title: 'Playground', icon: '🎮' },
        { id: 'comparison', title: 'Master Comparison', icon: '📋' }
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
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">FS</div>
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Feature Selection</h1>
                    </div>
                    <nav className="hidden md:flex space-x-6 text-sm font-medium">
                        <Link href="/" className="text-gray-600 hover:text-indigo-600">Home</Link>
                        <Link href="/datasets" className="text-gray-600 hover:text-indigo-600">Datasets</Link>
                        <Link href="/preprocessing" className="text-gray-600 hover:text-indigo-600">Preprocessing</Link>
                        <Link href="/feature-selection" className="text-indigo-600 border-b-2 border-indigo-600 pb-1">Feature Selection</Link>
                        <Link href="/eda" className="text-gray-600 hover:text-indigo-600">EDA</Link>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Hero */}
                <div className="bg-indigo-900 rounded-3xl p-8 md:p-12 mb-12 text-white relative overflow-hidden shadow-2xl">
                    <div className="relative z-10 max-w-3xl">
                        <span className="bg-indigo-500/30 text-indigo-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">Module 05: Data Engineering</span>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">Mastering Feature Selection: <br /><span className="text-indigo-400 font-medium italic text-3xl md:text-4xl">Reduce Noise, Enhance Signal.</span></h1>
                        <p className="text-lg text-indigo-100/80 mb-8 font-light">
                            Feature Selection is the process of automatically or manually selecting those features which contribute most to your prediction variable or output. Learn how to thin your data for maximum efficiency.
                        </p>
                    </div>
                    <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl invisible md:visible"></div>
                </div>

                {/* Sub-Nav */}
                <div className="flex flex-wrap gap-2 mb-12 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                    {navigation.map(nav => (
                        <button
                            key={nav.id}
                            onClick={() => setActiveTab(nav.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${activeTab === nav.id
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                                : 'text-gray-500 hover:bg-gray-50'
                                }`}
                        >
                            <span>{nav.icon}</span>
                            {nav.title}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="space-y-16">
                    {activeTab === 'filter' && (
                        <div className="animate-fadeIn">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                                <div>
                                    <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                        <span className="p-2 bg-indigo-100 rounded-lg text-indigo-600">🔍</span> Filter Method: Pearson Correlation
                                    </h2>
                                    <p className="text-gray-600 leading-relaxed mb-6">
                                        Filter methods use statistical properties to score and rank features. Pearson Correlation measures the <strong>linear association</strong> between a feature and the target.
                                    </p>

                                    <div className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-sm mb-8">
                                        <h3 className="text-lg font-bold text-indigo-900 mb-4">Mathematical Model</h3>
                                        <div className="bg-slate-50 p-6 rounded-xl overflow-x-auto">
                                            <BlockMath math={`r = \\frac{\\sum_{i=1}^{n} (x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum_{i=1}^{n} (x_i - \\bar{x})^2 \\cdot \\sum_{i=1}^{n} (y_i - \\bar{y})^2}}`} />
                                        </div>
                                        <div className="mt-6 space-y-3">
                                            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Term Interpretation</h4>
                                            <ul className="grid grid-cols-1 gap-2 text-sm">
                                                <li className="flex items-center gap-4"><code className="bg-indigo-50 px-2 py-1 rounded text-indigo-700 font-bold min-w-[3rem] text-center">r</code> <span className="text-gray-600">Correlation Coefficient (-1 to +1)</span></li>
                                                <li className="flex items-center gap-4"><code className="bg-indigo-50 px-2 py-1 rounded text-indigo-700 font-bold min-w-[3rem] text-center">x_i</code> <span className="text-gray-600">Individual predictor value</span></li>
                                                <li className="flex items-center gap-4"><code className="bg-indigo-100 px-2 py-1 rounded text-indigo-700 font-bold min-w-[3rem] text-center">{"\\bar{x}"}</code> <span className="text-gray-600">Mean of the predictor feature</span></li>
                                                <li className="flex items-center gap-4"><code className="bg-indigo-50 px-2 py-1 rounded text-indigo-700 font-bold min-w-[3rem] text-center">{"y_i - \\bar{y}"}</code> <span className="text-gray-600">Centralization: Measures how much the target deviates from its average.</span></li>
                                            </ul>
                                        </div>
                                        <div className="mt-6 pt-4 border-t border-indigo-100">
                                            <h4 className="text-xs font-bold text-indigo-800 uppercase mb-2">🔭 Engineer's Perspective</h4>
                                            <p className="text-xs text-indigo-900 leading-relaxed italic">
                                                "Pearson assumes <strong>linearity</strong>. If you multiply the numerator, you are measuring how much X and Y 'move together'. If you have a parabolic relationship ($y = x^2$), $r$ will be 0 even though there is a perfect relationship. As a modeller, you might improve this by moving to <strong>Spearman Correlation</strong> which uses ranks instead of raw values."
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold text-slate-900">Implementation (Python)</h3>
                                    <CodeBlock language="python" code={`import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# 1. Compute correlation matrix
cor = df.corr()

# 2. Select correlation with target
cor_target = abs(cor["Target"])

# 3. Select highly correlated features (> 0.5)
relevant_features = cor_target[cor_target > 0.5]
print(relevant_features.index)`} />

                                    <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                                        <h4 className="font-bold text-emerald-900 mb-2">Sample I/O Illustration</h4>
                                        <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                                            <div>
                                                <p className="text-emerald-700 mb-1">INPUT (Features):</p>
                                                <div className="bg-slate-900 text-white p-3 rounded-lg">
                                                    Age, Salary, Id, EyeColor
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-emerald-700 mb-1">OUTPUT (Selected):</p>
                                                <div className="bg-emerald-600 text-white p-3 rounded-lg">
                                                    Age, Salary
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-xs text-emerald-800 mt-4 leading-relaxed">
                                            <strong>Nature of Data:</strong> Best for numerical continuous data where linear relationships are suspected.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'wrapper' && (
                        <div className="animate-fadeIn">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                                <div>
                                    <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                        <span className="p-2 bg-purple-100 rounded-lg text-purple-600">🎁</span> Wrapper Method: Recursive Feature Elimination (RFE)
                                    </h2>
                                    <p className="text-gray-600 leading-relaxed mb-6">
                                        Wrapper methods use a "learning machine" (algorithm) as a black box to evaluate feature subsets based on <strong>predictive accuracy</strong>.
                                    </p>

                                    <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm mb-8">
                                        <h3 className="text-lg font-bold text-purple-900 mb-4">Mathematical Logic (RFE)</h3>
                                        <div className="bg-slate-50 p-6 rounded-xl">
                                            <p className="text-sm font-medium mb-4">Cost Function Minimization:</p>
                                            <BlockMath math={`J(w) = \\frac{1}{m} \\sum_{i=1}^{m} Cost(h_w(x^{(i)}), y^{(i)})`} />
                                            <p className="text-center font-bold my-4">Step-by-Step Pruning:</p>
                                            <div className="space-y-2 text-xs text-purple-800">
                                                <p>1. Train model with all features <InlineMath math="S" /></p>
                                                <p>2. Calculate ranking criterion for each feature <InlineMath math="i \in S" /></p>
                                                <p>3. Remove feature with smallest ranking criterion: <InlineMath math="S = S - \{i\}" /></p>
                                                <p>4. Repeat until desired number of features remains.</p>
                                            </div>
                                            <div className="mt-4 p-3 bg-purple-900 text-white rounded-lg">
                                                <h5 className="text-[10px] font-bold uppercase text-purple-300">🏗️ Modelling Insight</h5>
                                                <p className="text-[10px] leading-tight">
                                                    RFE is "Greedy". It assumes that removing the worst feature <em>right now</em> is the best path.
                                                    <strong>Innovation:</strong> Could you modify this to remove 10% of features at each step to speed up complexity while maintaining selection quality?
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold text-slate-900">Implementation (Python)</h3>
                                    <CodeBlock language="python" code={`from sklearn.feature_selection import RFE
from sklearn.linear_model import LogisticRegression

# 1. Initialize the Estimator
model = LogisticRegression()

# 2. Select top 3 features
rfe = RFE(estimator=model, n_features_to_select=3)
rfe = rfe.fit(X, y)

# 3. View support (True/False)
print(rfe.support_)
# 4. View Ranking
print(rfe.ranking_)`} />

                                    <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                                        <h4 className="font-bold text-indigo-900 mb-2">Computational Complexity</h4>
                                        <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
                                            <div className="absolute top-0 left-0 h-full bg-red-500 w-[90%] animate-pulse"></div>
                                        </div>
                                        <p className="text-xs text-indigo-800 font-semibold mb-2">O(n! / (k!(n-k)!)) - Exponential Growth!</p>
                                        <p className="text-xs text-indigo-700 leading-relaxed">
                                            <strong>When to use:</strong> Best for high-accuracy requirements on datasets with small number of features (&lt; 20).
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'embedded' && (
                        <div className="animate-fadeIn">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                                <div>
                                    <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                        <span className="p-2 bg-teal-100 rounded-lg text-teal-600">💎</span> Embedded Method: L1 Regularization (LASSO)
                                    </h2>
                                    <p className="text-gray-600 leading-relaxed mb-6">
                                        Embedded methods learn which features best contribute to the accuracy of the model <strong>while the model is being created</strong>. LASSO is the gold standard for this.
                                    </p>

                                    <div className="bg-white p-6 rounded-2xl border border-teal-100 shadow-sm mb-8">
                                        <h3 className="text-lg font-bold text-teal-900 mb-4">The LASSO Equation</h3>
                                        <div className="bg-slate-50 p-6 rounded-xl overflow-x-auto">
                                            <BlockMath math={`Min \\left[ \\sum_{i=1}^{n} (y_i - \\sum_{j=1}^{p} x_{ij} \\beta_j)^2 + \\lambda \\sum_{j=1}^{p} |\\beta_j| \\right]`} />
                                        </div>
                                        <div className="mt-6 space-y-4">
                                            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest text-center">Term Anatomy</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="border border-teal-100 p-3 rounded-lg">
                                                    <span className="block font-bold text-teal-700 text-xs">SSE Term</span>
                                                    <span className="text-xs text-gray-600">Minimizing this ensures the model 'remembers' the training data correctly.</span>
                                                </div>
                                                <div className="border border-orange-100 p-3 rounded-lg bg-orange-50 bg-opacity-30">
                                                    <span className="block font-bold text-orange-700 text-xs">L1 Penalty $\lambda ||\beta||_1$</span>
                                                    <span className="text-xs text-gray-600">The "Modeller's Budget": It taxes the number of features. Only those that 'pay off' in accuracy survive.</span>
                                                </div>
                                            </div>
                                            <div className="bg-teal-900 text-white p-4 rounded-xl mt-4">
                                                <h5 className="text-xs font-bold text-teal-300 uppercase mb-2">💡 Why L1 leads to Selection?</h5>
                                                <p className="text-[11px] leading-relaxed">
                                                    In L2 (Ridge), weights become small but rarely zero. In L1, the "diamond-shaped" constraint hit the axes first during optimization. This <strong>mathematical geometry</strong> is why LASSO is a feature selection technique.
                                                </p>
                                                <p className="text-[10px] mt-2 text-teal-200 italic">
                                                    <strong>Challenge:</strong> Can you design a "Group Lasso" equation that selects or rejects groups of related features together (e.g., all pixels of one eye)?
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold text-slate-900">Implementation (Python)</h3>
                                    <CodeBlock language="python" code={`from sklearn.linear_model import LassoSelectKBest
from sklearn.feature_selection import SelectFromModel
from sklearn.linear_model import LogisticRegression

# 1. Use Lasso to select features
sel_ = SelectFromModel(LogisticRegression(penalty='l1', solver='liblinear'))
sel_.fit(X, y)

# 2. Extract selected features
selected_feat = X.columns[(sel_.get_support())]
print('Selected:', len(selected_feat))`} />

                                    <div className="bg-teal-50 p-6 rounded-2xl border border-teal-100">
                                        <h4 className="font-bold text-teal-900 mb-2">Sparsity Visualization</h4>
                                        <div className="flex items-end gap-1 h-32 mb-4">
                                            {[...Array(10)].map((_, i) => (
                                                <div key={i} className={`flex-1 ${i < 3 ? 'bg-teal-500' : 'bg-gray-300'} rounded-t-lg transition-all`}
                                                    style={{ height: i < 3 ? `${Math.random() * 80 + 20}%` : '5px' }}></div>
                                            ))}
                                        </div>
                                        <p className="text-[10px] text-teal-800 text-center font-bold">L1 Regularization forces non-important features to ZERO height.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'playground' && (
                        <div className="animate-fadeIn">
                            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">🎮 Feature Engineering Playground</h2>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Controls */}
                                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-8">
                                    <h3 className="font-bold text-gray-900 text-lg border-b pb-4">Adjust Data Nature</h3>

                                    <div>
                                        <label className="flex justify-between text-sm font-bold text-gray-700 mb-4">
                                            <span>Dataset Noise</span>
                                            <span className="text-indigo-600">{playgroundData.noiseLevel}%</span>
                                        </label>
                                        <input
                                            type="range"
                                            className="w-full h-2 bg-gray-200 rounded-lg accent-indigo-600"
                                            value={playgroundData.noiseLevel}
                                            onChange={e => setPlaygroundData({ ...playgroundData, noiseLevel: parseInt(e.target.value) })}
                                        />
                                        <p className="text-[10px] text-gray-400 mt-2">High noise = Irrelevant "junk" columns in your data.</p>
                                    </div>

                                    <div>
                                        <label className="flex justify-between text-sm font-bold text-gray-700 mb-4">
                                            <span>Feature Count</span>
                                            <span className="text-indigo-600">{playgroundData.featureCount}</span>
                                        </label>
                                        <input
                                            type="range"
                                            min="2"
                                            max="50"
                                            className="w-full h-2 bg-gray-200 rounded-lg accent-purple-600"
                                            value={playgroundData.featureCount}
                                            onChange={e => setPlaygroundData({ ...playgroundData, featureCount: parseInt(e.target.value) })}
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <p className="text-sm font-bold text-gray-700">Select Strategy</p>
                                        {['none', 'filter', 'wrapper', 'embedded'].map(m => (
                                            <button
                                                key={m}
                                                onClick={() => setPlaygroundData({ ...playgroundData, method: m })}
                                                className={`w-full py-3 rounded-xl text-sm font-bold capitalize transition-all ${playgroundData.method === m
                                                    ? 'bg-indigo-600 text-white shadow-lg'
                                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                                    }`}
                                            >
                                                {m === 'none' ? 'No Selection (All Features)' : `${m} Method`}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Results Visualization */}
                                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center justify-center text-center">
                                        <h4 className="text-gray-500 font-bold uppercase text-xs tracking-widest mb-6">Predicted Model Accuracy</h4>
                                        <div className="relative w-40 h-40 flex items-center justify-center">
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-100" />
                                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={440} strokeDashoffset={440 - (440 * parseFloat(metrics.accuracy)) / 100} className="text-indigo-600 transition-all duration-1000 ease-out" />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-4xl font-extrabold text-slate-800">{metrics.accuracy}%</span>
                                                <span className="text-[10px] text-gray-400 font-bold uppercase">Accuracy</span>
                                            </div>
                                        </div>
                                        <p className="mt-8 text-sm text-gray-500 italic">
                                            {playgroundData.method === 'none' && playgroundData.noiseLevel > 60
                                                ? "⚠️ Your model is struggling with noise! It's learning patterns from junk data."
                                                : "✅ Good feature balance and strategy selection."}
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
                                            <h4 className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-4">Training Complexity</h4>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-xs font-bold">
                                                    <span>Compute Load</span>
                                                    <span>{metrics.complexity}%</span>
                                                </div>
                                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className="bg-purple-600 h-full transition-all duration-500" style={{ width: `${metrics.complexity}%` }}></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-indigo-900 p-8 rounded-3xl shadow-2xl text-white">
                                            <h4 className="text-indigo-300 font-bold uppercase text-[10px] tracking-widest mb-4">Real-time Insight</h4>
                                            <p className="text-lg font-medium leading-tight">
                                                {playgroundData.method === 'wrapper'
                                                    ? "Wrapper methods provide the highest accuracy by trying all combinations, but look at the complexity! It's unsuitable for massive data."
                                                    : playgroundData.method === 'filter'
                                                        ? "Filter methods are lightning fast. They are your first line of defense against noise in big data."
                                                        : "A thinner model is often a better model. Fewer features lead to better generalization."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'comparison' && (
                        <div className="animate-fadeIn">
                            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                                <div className="bg-indigo-600 p-8 text-white">
                                    <h2 className="text-3xl font-bold mb-2">Technique Selection Matrix</h2>
                                    <p className="text-indigo-100 opacity-80">Use this to identify the best strategy for your specific machine learning project.</p>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-slate-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-widest">
                                                <th className="px-8 py-6">Technique Group</th>
                                                <th className="px-8 py-6">Best Data Type</th>
                                                <th className="px-8 py-6">Advantage</th>
                                                <th className="px-8 py-6">Disadvantage</th>
                                                <th className="px-8 py-6">Winning Algorithm</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            <tr className="hover:bg-indigo-50/30 transition-colors">
                                                <td className="px-8 py-6">
                                                    <span className="block font-bold text-slate-900 border-l-4 border-indigo-500 pl-4">Filter Methods</span>
                                                    <span className="text-[10px] text-gray-400 pl-4">Statistical Ranking</span>
                                                </td>
                                                <td className="px-8 py-6 text-sm text-gray-600">High-dimensional (1000+ features)</td>
                                                <td className="px-8 py-6"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-[10px] font-bold">Fastest</span></td>
                                                <td className="px-8 py-6 text-sm text-gray-600">Ignores interactions</td>
                                                <td className="px-8 py-6 text-sm font-bold text-indigo-700">Any (Indiscriminate)</td>
                                            </tr>
                                            <tr className="hover:bg-indigo-50/30 transition-colors">
                                                <td className="px-8 py-6">
                                                    <span className="block font-bold text-slate-900 border-l-4 border-purple-500 pl-4">Wrapper Methods</span>
                                                    <span className="text-[10px] text-gray-400 pl-4">Searching/Heuristics</span>
                                                </td>
                                                <td className="px-8 py-6 text-sm text-gray-600">Small data with strong interactions</td>
                                                <td className="px-8 py-6"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-[10px] font-bold">Most Accurate</span></td>
                                                <td className="px-8 py-6 text-sm text-gray-600">Computationally heavy</td>
                                                <td className="px-8 py-6 text-sm font-bold text-purple-700">KNN, Decision Trees</td>
                                            </tr>
                                            <tr className="hover:bg-indigo-50/30 transition-colors">
                                                <td className="px-8 py-6">
                                                    <span className="block font-bold text-slate-900 border-l-4 border-teal-500 pl-4">Embedded Methods</span>
                                                    <span className="text-[10px] text-gray-400 pl-4">In-built Selection</span>
                                                </td>
                                                <td className="px-8 py-6 text-sm text-gray-600">Data with complex overfitting potential</td>
                                                <td className="px-8 py-6"><span className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-[10px] font-bold">Best Trade-off</span></td>
                                                <td className="px-8 py-6 text-sm text-gray-600">Model-specific</td>
                                                <td className="px-8 py-6 text-sm font-bold text-teal-700">Lasso, Random Forest</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Modelling Innovation Lab */}
                            <div className="bg-slate-900 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden mb-16 mt-20">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 opacity-20 blur-3xl -mr-32 -mt-32 rounded-full"></div>
                                <div className="relative z-10">
                                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                        <span className="p-2 bg-indigo-500 rounded-xl text-white">🧪</span> Mathematical Modelling Innovation Lab
                                    </h2>
                                    <p className="text-indigo-200 text-lg mb-10 max-w-3xl">
                                        Traditional equations are just the starting point. High-performance ML Engineers modify equations to suit specific data challenges.
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                                            <h3 className="text-xl font-bold text-indigo-400 mb-4">Case Study: Noise-Robust Correlation</h3>
                                            <p className="text-sm text-slate-300 mb-4">
                                                Standard Pearson Correlation is highly sensitive to outliers. A single extreme value can flip $r$ from 0.9 to 0.1.
                                            </p>
                                            <div className="space-y-4">
                                                <div className="p-3 bg-slate-900 rounded-lg border border-indigo-500/30">
                                                    <span className="text-xs text-indigo-300 font-bold block mb-1">Traditional Approach</span>
                                                    <InlineMath math={"r = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\dots}}"} />
                                                </div>
                                                <div className="p-3 bg-indigo-900/40 rounded-lg border border-indigo-500">
                                                    <span className="text-xs text-indigo-300 font-bold block mb-1">Your Innovation Task</span>
                                                    <p className="text-xs leading-relaxed text-indigo-100">
                                                        Design a modified equation that uses a <strong>Weighting Function</strong> $w_i$ where $w_i$ is small for points far from the median.
                                                    </p>
                                                    <div className="mt-3 p-2 bg-slate-900 rounded font-mono text-[10px] text-teal-400">
                                                        <span className="text-white mr-1">Propose:</span> <InlineMath math={"r_{robust} = \\frac{\\sum w_i(x_i - \\hat{x})(y_i - \\hat{y})}{\\dots}"} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                                            <h3 className="text-xl font-bold text-teal-400 mb-4">Case Study: Complexity-Aware Selection</h3>
                                            <p className="text-sm text-slate-300 mb-4">
                                                LASSO ($L1$) treats all features equally. But in production, some features are "expensive" to collect (e.g., medical lab tests vs patient age).
                                            </p>
                                            <div className="space-y-4">
                                                <div className="p-3 bg-slate-900 rounded-lg border border-teal-500/30">
                                                    <span className="text-xs text-teal-300 font-bold block mb-1">Standard LASSO</span>
                                                    <InlineMath math={"\\lambda \\sum |\\beta_j|"} />
                                                </div>
                                                <div className="p-3 bg-teal-900/40 rounded-lg border border-teal-400">
                                                    <span className="text-xs text-teal-300 font-bold block mb-1">Your Innovation Task</span>
                                                    <p className="text-xs leading-relaxed text-teal-100">
                                                        Integrate a <strong>Cost Vector</strong> $C_j$ into the penalty term to discourage expensive features more than cheap ones.
                                                    </p>
                                                    <div className="mt-3 p-2 bg-slate-900 rounded font-mono text-[10px] text-teal-400">
                                                        <span className="text-white mr-1">Design:</span> <InlineMath math={"\\text{Penalty} = \\lambda \\sum C_j |\\beta_j|"} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-10 p-6 bg-gradient-to-r from-indigo-900 to-slate-900 rounded-2xl border border-indigo-500/50">
                                        <h4 className="text-lg font-bold text-white mb-2">How to justify your models?</h4>
                                        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-indigo-200">
                                            <li className="flex items-center gap-2">
                                                <span className="text-lg">⚖️</span>
                                                Bias-Variance Tradeoff Analysis
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="text-lg">📉</span>
                                                Sensitivity to Outliers
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="text-lg">🏎️</span>
                                                Computational Complexity (O-notation)
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Sticky Pro-Tip */}
            <div className="fixed bottom-8 right-8 z-40 max-w-xs animate-slideUp">
                <div className="bg-indigo-600 text-white p-6 rounded-2xl shadow-2xl relative">
                    <button className="absolute -top-2 -right-2 bg-slate-900 rounded-full w-6 h-6 flex items-center justify-center text-xs">×</button>
                    <h5 className="font-bold flex items-center gap-2 mb-2">💡 Pro-Tip</h5>
                    <p className="text-xs text-indigo-100 leading-relaxed">
                        "More data is not always better. One highly correlated feature is worth more than a thousand noisy ones."
                    </p>
                </div>
            </div>

            <footer className="bg-slate-900 text-white py-12 mt-20">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-slate-500 text-sm">ML Engineering Certification Program</p>
                    <p className="mt-4 text-slate-400 text-xs">Developed for Advanced Experiential Learning in Machine Learning 2026</p>
                </div>
            </footer>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(50px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.8s ease-out forwards;
                }
                .animate-slideUp {
                    animation: slideUp 0.8s ease-out 1s backwards;
                }
            `}</style>
        </div>
    );
};

export default FeatureSelectionPage;
