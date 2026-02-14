import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import Layout from '../components/Layout';

const CodeBlock = dynamic(() => import('../components/CodeBlock'), {
    ssr: false,
    loading: () => <div className="h-40 bg-slate-900 rounded-[2rem] animate-pulse my-6"></div>
});

// Type definitions
interface Dataset {
    id: string;
    name: string;
    library: 'Scikit-Learn' | 'Seaborn' | 'Statsmodels' | 'Deep Learning';
    description: string;
    source: string;
    task: 'Classification' | 'Regression' | 'Clustering' | 'Time Series' | 'Image' | 'Text';
    samples: number | string;
    features: number | string;
    classes?: number | string;
    featureNames?: string[];
    targetNames?: string[];
    useCases: string[];
}

const DatasetsPage: React.FC = () => {
    const [selectedDataset, setSelectedDataset] = useState('iris');
    const [filter, setFilter] = useState<'All' | 'Scikit-Learn' | 'Seaborn' | 'Statsmodels' | 'Deep Learning'>('All');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const datasets: Dataset[] = [
        {
            id: 'iris',
            name: 'Iris Flower',
            library: 'Scikit-Learn',
            description: 'The Golden Standard for Linear Classifiers. Measuring sepal and petal dimensions across 3 species.',
            source: 'sklearn.datasets.load_iris()',
            task: 'Classification',
            samples: 150,
            features: 4,
            classes: 3,
            featureNames: ['sepal_length', 'sepal_width', 'petal_length', 'petal_width'],
            targetNames: ['Setosa', 'Versicolor', 'Virginica'],
            useCases: ['Euclidean Distance Modelling', 'LDA', 'Probability Density Estimation']
        },
        {
            id: 'wine',
            name: 'Wine Chemistry',
            library: 'Scikit-Learn',
            description: 'A Multi-variate Chemical Tensor. 13 chemical features from three different Italian cultivars.',
            source: 'sklearn.datasets.load_wine()',
            task: 'Classification',
            samples: 178,
            features: 13,
            classes: 3,
            useCases: ['Regularization', 'Clustering', 'Dimensionality Reduction']
        },
        {
            id: 'california_housing',
            name: 'California Housing',
            library: 'Scikit-Learn',
            description: 'Large-scale regression data based on 1990 California census. Predict median house values.',
            source: 'sklearn.datasets.fetch_california_housing()',
            task: 'Regression',
            samples: 20640,
            features: 8,
            useCases: ['Gradient Descent Optimization', 'Feature Interaction Modelling']
        },
        {
            id: 'breast_cancer',
            name: 'Breast Cancer',
            library: 'Scikit-Learn',
            description: 'Binary classification of tumor masses based on digitized images of fine needle aspirates (FNA).',
            source: 'sklearn.datasets.load_breast_cancer()',
            task: 'Classification',
            samples: 569,
            features: 30,
            classes: 2,
            useCases: ['Risk Factor Modelling', 'Support Vector Machines']
        },
        {
            id: 'diabetes',
            name: 'Diabetes Progression',
            library: 'Scikit-Learn',
            description: 'Ten baseline variables, age, sex, BMI, BP and six blood serum measurements.',
            source: 'sklearn.datasets.load_diabetes()',
            task: 'Regression',
            samples: 442,
            features: 10,
            useCases: ['Lasso/Ridge Regularization', 'Predictive Analysis']
        },
        {
            id: 'titanic',
            name: 'Titanic Survival',
            library: 'Seaborn',
            description: 'Classify survival status based on age, gender, cabin, and fare class.',
            source: 'sns.load_dataset("titanic")',
            task: 'Classification',
            samples: 891,
            features: 15,
            classes: 2,
            useCases: ['Categorical Encoding', 'Mixed Data Modelling']
        },
        {
            id: 'tips',
            name: 'Restaurant Tips',
            library: 'Seaborn',
            description: 'Predict tip amounts based on bill amount, day, time, and smoker status.',
            source: 'sns.load_dataset("tips")',
            task: 'Regression',
            samples: 244,
            features: 7,
            useCases: ['Bivariate Regression', 'Correlation Analysis']
        },
        {
            id: 'penguins',
            name: 'Palmer Penguins',
            library: 'Seaborn',
            description: 'Modern alternative to Iris. Palmer Archipelago (Antarctica) penguin measurements.',
            source: 'sns.load_dataset("penguins")',
            task: 'Classification',
            samples: 344,
            features: 7,
            classes: 3,
            useCases: ['Cluster Analysis', 'Biometric Classification']
        },
        {
            id: 'diamonds',
            name: 'Diamond Pricing',
            library: 'Seaborn',
            description: 'Predict diamond prices using carat, cut, color, and geometric dimensions.',
            source: 'sns.load_dataset("diamonds")',
            task: 'Regression',
            samples: 53940,
            features: 10,
            useCases: ['Non-Linear Price Modelling', 'High Range Variance']
        },
        {
            id: 'macrodata',
            name: 'US Macroeconomic',
            library: 'Statsmodels',
            description: 'Quarterly US macroeconomic metrics from 1959Q1 to 2009Q3 (Unemployment, GDP).',
            source: 'sm.datasets.macrodata.load_pandas()',
            task: 'Time Series',
            samples: 203,
            features: 14,
            useCases: ['Econometric Forecasting', 'Vector Autoregression']
        },
        {
            id: 'mnist',
            name: 'MNIST Digits',
            library: 'Deep Learning',
            description: 'Large database of handwritten digits used for training various image processing systems.',
            source: 'keras.datasets.mnist',
            task: 'Image',
            samples: 60000,
            features: '28x28 Tensors',
            classes: 10,
            useCases: ['CNN Architecture Tests', 'Kernel Optimization']
        }
    ];

    const filteredDatasets = filter === 'All' ? datasets : datasets.filter(d => d.library === filter);
    const currentDataset = datasets.find(d => d.id === selectedDataset) || datasets[0];

    if (!mounted) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-6">
                <div className="w-20 h-20 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <div className="font-black text-indigo-400 tracking-[0.3em] text-xs uppercase animate-pulse">Scanning Global Assets</div>
            </div>
        );
    }

    return (
        <Layout>
            <main className="container mx-auto px-6 py-20 max-w-7xl">
                {/* Hero Section */}
                <div className="bg-slate-900 rounded-[4rem] p-16 md:p-20 mb-20 text-white relative overflow-hidden shadow-[0_64px_128px_-32px_rgba(2,6,23,0.3)]">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-indigo-600/20 blur-[180px] rounded-full -z-10"></div>
                    <div className="relative z-10 max-w-3xl">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full text-[10px] font-black tracking-[0.2em] text-indigo-400 uppercase mb-10 border border-indigo-500/20">
                            The Data Foundation
                        </span>
                        <h1 className="text-6xl md:text-8xl font-black mb-12 leading-[0.9] tracking-tighter">Mastering the <span className="text-indigo-400 italic">Multivariate Tensors.</span></h1>
                        <p className="text-xl text-slate-300 font-light leading-relaxed max-w-2xl">
                            Data is a sampled observation of a mathematical function. Explore the standard tensors provided by Python's core libraries to begin your architectural discovery.
                        </p>
                    </div>
                </div>

                {/* Library Filters */}
                <div className="flex flex-wrap gap-3 mb-16 bg-white p-3 rounded-[2.5rem] border border-slate-100 shadow-sm w-max max-w-full">
                    {['All', 'Scikit-Learn', 'Seaborn', 'Statsmodels', 'Deep Learning'].map(lib => (
                        <button
                            key={lib}
                            onClick={() => setFilter(lib as any)}
                            className={`px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${filter === lib
                                ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-100 scale-[1.02]'
                                : 'bg-transparent text-slate-400 hover:text-slate-900'}`}
                        >
                            {lib}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Sidebar: Dataset List */}
                    <div className="lg:col-span-4 space-y-4 max-h-[900px] overflow-y-auto pr-4 custom-scrollbar">
                        {filteredDatasets.map((dataset) => (
                            <button
                                key={dataset.id}
                                onClick={() => setSelectedDataset(dataset.id)}
                                className={`w-full p-8 rounded-[2.5rem] text-left transition-all duration-500 group border-2 ${selectedDataset === dataset.id
                                    ? 'bg-white border-indigo-600 shadow-2xl shadow-indigo-100 -translate-y-1'
                                    : 'bg-white border-slate-50 hover:border-indigo-200 text-slate-500'}`}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${dataset.task === 'Classification' ? 'bg-emerald-50 text-emerald-600' :
                                        dataset.task === 'Regression' ? 'bg-amber-50 text-amber-600' :
                                            'bg-purple-50 text-purple-600'
                                        }`}>
                                        {dataset.task}
                                    </span>
                                    <span className="text-[8px] font-black text-slate-300 uppercase opacity-50">{dataset.library}</span>
                                </div>
                                <h3 className={`text-xl font-black leading-tight transition-colors mb-2 ${selectedDataset === dataset.id ? 'text-indigo-600' : 'text-slate-900'}`}>
                                    {dataset.name}
                                </h3>
                                <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest text-slate-300">
                                    <span>N={dataset.samples}</span>
                                    <span className="w-1 h-1 bg-slate-200 rounded-full mt-1.5 font-black uppercase tracking-widest text-indigo-400"></span>
                                    <span>M={dataset.features} Features</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-[4rem] p-12 md:p-16 border border-slate-100 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50/50 rounded-bl-[4rem] group-hover:bg-indigo-100/50 transition-colors"></div>

                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8 relative z-10">
                                <div>
                                    <h2 className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">{currentDataset.name}</h2>
                                    <p className="text-indigo-500 font-black uppercase text-[10px] tracking-[0.3em]">{currentDataset.library} • {currentDataset.task}</p>
                                </div>
                                <div className="p-6 bg-slate-950 rounded-[2rem] font-mono text-xs text-indigo-400 border border-white/5 shadow-2xl flex items-center gap-3">
                                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                                    {currentDataset.source}
                                </div>
                            </div>

                            <p className="text-2xl text-slate-500 leading-relaxed font-light mb-16 max-w-2xl italic tracking-tight">
                                "{currentDataset.description}"
                            </p>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                                {[
                                    { label: 'Space Dimension', value: currentDataset.samples, sub: 'Observations', color: 'indigo' },
                                    { label: 'Feature Tensors', value: currentDataset.features, sub: 'Degrees of Freedom', color: 'emerald' },
                                    { label: 'Class Labels', value: currentDataset.classes || 'N/A', sub: 'Unique Manifolds', color: 'purple' },
                                    { label: 'Ideal Algorithm', value: currentDataset.task === 'Classification' ? 'SVM' : 'LASSO', sub: 'Highest Prob.', color: 'rose' }
                                ].map((stat, i) => (
                                    <div key={i} className={`bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:border-${stat.color}-300 transition-all duration-300 group`}>
                                        <span className={`text-[9px] font-black uppercase text-slate-400 mb-4 block tracking-widest`}>{stat.label}</span>
                                        <div className={`text-4xl font-black text-slate-900 mb-1 group-hover:text-${stat.color}-600 transition-colors`}>{stat.value}</div>
                                        <span className={`text-[9px] font-black uppercase tracking-tighter text-slate-300`}>{stat.sub}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <section>
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 border-b border-slate-50 pb-4">Architectural Use Cases</h4>
                                    <div className="space-y-6">
                                        {currentDataset.useCases.map((use, i) => (
                                            <div key={i} className="flex gap-6 items-center group">
                                                <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-[10px] font-black text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">0{i + 1}</div>
                                                <span className="text-sm font-bold text-slate-700 tracking-tight">{use}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                                <section className="space-y-8">
                                    <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-8 border-b border-indigo-50 pb-4">Stochastic Simulation</h4>
                                    <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white shadow-2xl border border-white/5 group hover:border-indigo-500/30 transition-all">
                                        <p className="text-xs font-light text-slate-400 leading-relaxed mb-8">
                                            Test the boundaries of your models by simulating similar variance-sensitive signals.
                                        </p>
                                        <CodeBlock language="python" code={`# Gen Signal\nimport numpy as np\nn = ${currentDataset.samples === 'N/A' ? 1000 : currentDataset.samples}\nx = np.random.randn(n, ${currentDataset.features === 'Sequence Tensors' || currentDataset.features === '28x28 Tensors' ? 10 : currentDataset.features})\ny = 1.4 * x[:,0] + 0.9 * x[:,1] + np.random.normal(0, 0.1, n)`} />
                                    </div>
                                </section>
                            </div>
                        </div>

                        {/* CTA Lab Navigation */}
                        <div className="mt-20 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-[4rem] p-16 text-white relative overflow-hidden shadow-2xl group">
                            <div className="absolute top-0 right-0 w-full h-full bg-[url('/noise.png')] opacity-20"></div>
                            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full -ml-48 -mb-48 blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
                            <div className="relative z-10 text-center">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-200 mb-8 block">Next Structural Phase</span>
                                <h3 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter leading-tight">Master Exploratory <br />Mathematical Analysis</h3>
                                <Link
                                    href="/eda"
                                    className="bg-white text-indigo-600 px-16 py-6 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition active:scale-95 shadow-2xl flex items-center justify-center gap-3 w-max mx-auto group"
                                >
                                    Activate EDA Lab
                                    <span className="text-xl transition-transform group-hover:translate-x-2">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
                .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #cbd5e1 transparent; }
            `}</style>
        </Layout>
    );
};

export default DatasetsPage;
