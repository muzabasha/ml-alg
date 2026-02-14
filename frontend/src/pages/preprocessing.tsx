import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const CodeBlock = dynamic(() => import('../components/CodeBlock'), {
    ssr: false,
    loading: () => <div className="h-40 bg-gray-900 rounded-xl animate-pulse my-6"></div>
});

const PreprocessingPage: React.FC = () => {
    const [mounted, setMounted] = useState(false);
    const [activeTab, setActiveTab] = useState('missing');

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
            </div>
        );
    }

    const navigation = [
        { id: 'missing', title: 'Missing Values', icon: '❓' },
        { id: 'scaling', title: 'Feature Scaling', icon: '⚖️' },
        { id: 'outliers', title: 'Outlier Handling', icon: '🚨' },
        { id: 'skewness', title: 'Skewness Correction', icon: '📉' },
        { id: 'summary', title: 'Comparison Table', icon: '📋' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Header */}
            <header className="bg-white shadow-md sticky top-0 z-50">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-blue-600">ML Learning Platform</h1>
                        <nav className="space-x-6">
                            <Link href="/" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
                            <Link href="/datasets" className="text-gray-700 hover:text-blue-600 transition">Datasets</Link>
                            <Link href="/preprocessing" className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">Data Preprocessing</Link>
                            <Link href="/feature-selection" className="text-gray-700 hover:text-blue-600 transition">Feature Selection</Link>
                            <Link href="/eda" className="text-gray-700 hover:text-blue-600 transition">EDA</Link>
                            <Link href="/instructor" className="text-gray-700 hover:text-blue-600 transition">Instructor</Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl shadow-2xl p-8 mb-8 text-white">
                    <h1 className="text-4xl font-bold mb-3">🛠️ Data Preprocessing</h1>
                    <p className="text-lg text-teal-100">
                        Preparing numeric data for high-performance Machine Learning models.
                    </p>
                </div>

                {/* Sub-navigation */}
                <div className="flex flex-wrap gap-4 mb-8">
                    {navigation.map(nav => (
                        <button
                            key={nav.id}
                            onClick={() => setActiveTab(nav.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${activeTab === nav.id
                                ? 'bg-teal-600 text-white shadow-lg transform scale-105'
                                : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                                }`}
                        >
                            <span>{nav.icon}</span>
                            {nav.title}
                        </button>
                    ))}
                </div>

                {/* Content Sections */}
                <div className="space-y-12">
                    {activeTab === 'missing' && (
                        <section className="bg-white rounded-xl shadow-xl p-8 animate-fadeIn">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <span>❓</span> Handling Missing Values
                            </h2>

                            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
                                <h3 className="text-xl font-bold text-red-800 mb-2">The Problem: Data with Holes</h3>
                                <p className="text-red-700">
                                    Imagine a dataset where some values are missing (NaN). Most machine learning algorithms cannot handle missing values and will throw an error or perform poorly.
                                </p>
                            </div>

                            {/* Live Demo Visualization Placeholder */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div className="bg-gray-900 rounded-lg p-6 text-white font-mono text-sm">
                                    <h4 className="text-gray-400 mb-4 font-sans uppercase tracking-widest text-xs">Unprocessed Data (Problem)</h4>
                                    <div className="space-y-1">
                                        <p className="text-teal-400">ID | Age | Salary</p>
                                        <p>1  | 25  | 50000</p>
                                        <p className="bg-red-900 bg-opacity-30">2  | <span className="text-red-500 font-bold">NaN</span> | 60000</p>
                                        <p>3  | 30  | <span className="text-red-500 font-bold">NaN</span></p>
                                        <p>4  | 35  | 65000</p>
                                    </div>
                                </div>
                                <div className="bg-gray-900 rounded-lg p-6 text-white font-mono text-sm">
                                    <h4 className="text-gray-400 mb-4 font-sans uppercase tracking-widest text-xs">Processed Data (Solution)</h4>
                                    <div className="space-y-1">
                                        <p className="text-teal-400">ID | Age | Salary</p>
                                        <p>1  | 25  | 50000</p>
                                        <p className="bg-green-900 bg-opacity-30">2  | <span className="text-green-500 font-bold">30.0</span>| 60000</p>
                                        <p className="bg-green-900 bg-opacity-30">3  | 30  | <span className="text-green-500 font-bold">58333</span></p>
                                        <p>4  | 35  | 65000</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Solution 1: Mean/Median/Mode Imputation</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                                            <h4 className="font-bold text-green-800">Advantages</h4>
                                            <ul className="text-sm text-green-700 list-disc list-inside mt-2">
                                                <li>Easy to implement</li>
                                                <li>Fast for large datasets</li>
                                                <li>Doesn't change the mean of the feature</li>
                                            </ul>
                                        </div>
                                        <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                                            <h4 className="font-bold text-red-800">Disadvantages</h4>
                                            <ul className="text-sm text-red-700 list-disc list-inside mt-2">
                                                <li>Reduces variance</li>
                                                <li>Ignores correlations between features</li>
                                                <li>Can introduce bias</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <CodeBlock
                                        language="python"
                                        code={`import pandas as pd
from sklearn.impute import SimpleImputer

# Create Imputer (Strategy: Mean)
imputer = SimpleImputer(strategy='mean')
data['Salary'] = imputer.fit_transform(data[['Salary']])`}
                                    />
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Solution 2: K-Nearest Neighbors (KNN) Imputation</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                                            <h4 className="font-bold text-green-800">Advantages</h4>
                                            <ul className="text-sm text-green-700 list-disc list-inside mt-2">
                                                <li>Uses relationships between features</li>
                                                <li>More accurate than static imputation</li>
                                            </ul>
                                        </div>
                                        <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                                            <h4 className="font-bold text-red-800">Disadvantages</h4>
                                            <ul className="text-sm text-red-700 list-disc list-inside mt-2">
                                                <li>Computationally expensive</li>
                                                <li>Sensitive to outliers and noise</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <CodeBlock
                                        language="python"
                                        code={`from sklearn.impute import KNNImputer

# Create KNN Imputer
imputer = KNNImputer(n_neighbors=2)
data_imputed = imputer.fit_transform(data)`}
                                    />
                                </div>
                            </div>
                        </section>
                    )}

                    {activeTab === 'scaling' && (
                        <section className="bg-white rounded-xl shadow-xl p-8 animate-fadeIn">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <span>⚖️</span> Feature Scaling
                            </h2>

                            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8">
                                <h3 className="text-xl font-bold text-yellow-800 mb-2">The Problem: Different Scales</h3>
                                <p className="text-yellow-700">
                                    Algorithms based on distance (like KNN, SVM, K-Means) are biased towards features with larger values. For example, Age (20-80) vs Salary (20,000-1,000,000). The model will "think" Salary is more important just because the numbers are bigger.
                                </p>
                            </div>

                            <div className="space-y-12">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Solution 1: Normalization (Min-Max Scaling)</h3>
                                    <p className="text-gray-700 mb-4">Scales everything to a range between 0 and 1.</p>

                                    <div className="bg-slate-50 p-6 rounded-xl mb-6 flex justify-center">
                                        <div className="text-center">
                                            <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest font-bold">Min-Max Formula</p>
                                            <BlockMath math={`x_{norm} = \\frac{x - x_{min}}{x_{max} - x_{min}}`} />
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 p-6 rounded-xl mb-8 border border-blue-100">
                                        <h4 className="text-sm font-bold text-blue-800 uppercase tracking-widest mb-4">Mathematical Interpretation</h4>
                                        <ul className="space-y-3 text-sm">
                                            <li className="flex items-center gap-3">
                                                <code className="bg-blue-100 px-2 py-0.5 rounded font-bold text-blue-700">x - x_min</code>
                                                <span className="text-gray-600">The <strong>Translation</strong>: It shifts the entire distribution so that the minimum value starts exactly at zero.</span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <code className="bg-blue-100 px-2 py-0.5 rounded font-bold text-blue-700">x_max - x_min</code>
                                                <span className="text-gray-600">The <strong>Scaling Factor</strong>: It represents the total range. Dividing by this "squeezes" the data into a unit range.</span>
                                            </li>
                                        </ul>
                                        <div className="mt-6 pt-4 border-t border-blue-200">
                                            <p className="text-xs text-blue-800 italic">
                                                <strong>🛠️ Modeling Challenge:</strong> How would you modify this equation to scale data between [-1, 1] instead of [0, 1]? Hint: You need to introduce a multiplier and a bias.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                                            <h4 className="font-bold text-green-800">Advantages</h4>
                                            <ul className="text-sm text-green-700 list-disc list-inside mt-2">
                                                <li>Preserves zero entries in sparse data</li>
                                                <li>Fixed range [0, 1]</li>
                                            </ul>
                                        </div>
                                        <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                                            <h4 className="font-bold text-red-800">Disadvantages</h4>
                                            <ul className="text-sm text-red-700 list-disc list-inside mt-2">
                                                <li>Highly sensitive to outliers (one outlier squeezes all other data)</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <CodeBlock
                                        language="python"
                                        code={`from sklearn.preprocessing import MinMaxScaler

scaler = MinMaxScaler()
data_scaled = scaler.fit_transform(data)`}
                                    />
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Solution 2: Standardization (Z-Score Scaling)</h3>
                                    <p className="text-gray-700 mb-4">Rescales data to have a mean of 0 and standard deviation of 1.</p>

                                    <div className="bg-slate-50 p-6 rounded-xl mb-6 flex justify-center">
                                        <div className="text-center">
                                            <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest font-bold">Z-Score Formula</p>
                                            <BlockMath math={`z = \\frac{x - \\mu}{\\sigma}`} />
                                        </div>
                                    </div>

                                    <div className="bg-purple-50 p-6 rounded-xl mb-8 border border-purple-100">
                                        <h4 className="text-sm font-bold text-purple-800 uppercase tracking-widest mb-4">Mathematical Interpretation</h4>
                                        <ul className="space-y-3 text-sm">
                                            <li className="flex items-center gap-3">
                                                <code className="bg-purple-100 px-2 py-0.5 rounded font-bold text-purple-700">x - \mu</code>
                                                <span className="text-gray-600">The <strong>Deviation</strong>: Measures how far each point is from the average. Positive means above average; negative means below.</span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <code className="bg-purple-100 px-2 py-0.5 rounded font-bold text-purple-700">\sigma</code>
                                                <span className="text-gray-600">The <strong>Unit of Spread</strong>: We divide by standard deviation to express the distance in "number of sigmas".</span>
                                            </li>
                                        </ul>
                                        <div className="mt-6 pt-4 border-t border-purple-200">
                                            <p className="text-xs text-purple-800 italic">
                                                <strong>🛠️ Modeling Challenge:</strong> If your data has massive outliers, $\mu$ and $\sigma$ will be skewed. Can you design a "Robust Scaler" using Medians and Interquartile Range (IQR)?
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                                            <h4 className="font-bold text-green-800">Advantages</h4>
                                            <ul className="text-sm text-green-700 list-disc list-inside mt-2">
                                                <li>Less affected by outliers</li>
                                                <li>Useful for algorithms assuming Gaussian distribution</li>
                                            </ul>
                                        </div>
                                        <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                                            <h4 className="font-bold text-red-800">Disadvantages</h4>
                                            <ul className="text-sm text-red-700 list-disc list-inside mt-2">
                                                <li>Does not produce a fixed range</li>
                                                <li>Harder to interpret than 0-1 range</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <CodeBlock
                                        language="python"
                                        code={`from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
data_scaled = scaler.fit_transform(data)`}
                                    />
                                </div>
                            </div>
                        </section>
                    )}

                    {activeTab === 'outliers' && (
                        <section className="bg-white rounded-xl shadow-xl p-8 animate-fadeIn">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <span>🚨</span> Handling Outliers
                            </h2>

                            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-8">
                                <h3 className="text-xl font-bold text-purple-800 mb-2">The Problem: Extreme Values</h3>
                                <p className="text-purple-700">
                                    Outliers are data points that differ significantly from other observations. They can skew your model's perception and lead to poor generalization (Overfitting).
                                </p>
                            </div>

                            <div className="space-y-12">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Solution 1: Z-Score Filtering</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                                            <h4 className="font-bold text-green-800">Advantages</h4>
                                            <ul className="text-sm text-green-700 list-disc list-inside mt-2">
                                                <li>Statistically sound for normal data</li>
                                                <li>Clear threshold (usually +/- 3 std dev)</li>
                                            </ul>
                                        </div>
                                        <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                                            <h4 className="font-bold text-red-800">Disadvantages</h4>
                                            <ul className="text-sm text-red-700 list-disc list-inside mt-2">
                                                <li>Only works well for Gaussian-like distributions</li>
                                                <li>Deletes data points entirely</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <CodeBlock
                                        language="python"
                                        code={`# Remove points outside 3 standard deviations
upper = data['Age'].mean() + 3 * data['Age'].std()
lower = data['Age'].mean() - 3 * data['Age'].std()
filtered_data = data[(data['Age'] < upper) & (data['Age'] > lower)]`}
                                    />
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Solution 2: Winsorization (Capping)</h3>
                                    <p className="text-gray-700 mb-4">Instead of deleting, we cap the values at a certain percentile (e.g., 5th and 95th).</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                                            <h4 className="font-bold text-green-800">Advantages</h4>
                                            <ul className="text-sm text-green-700 list-disc list-inside mt-2">
                                                <li>Keeps the data size constant</li>
                                                <li>Minimizes the influence of extreme values</li>
                                            </ul>
                                        </div>
                                        <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                                            <h4 className="font-bold text-red-800">Disadvantages</h4>
                                            <ul className="text-sm text-red-700 list-disc list-inside mt-2">
                                                <li>Arbitrary thresholds</li>
                                                <li>Masks real phenomena if outliers are valid data</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <CodeBlock
                                        language="python"
                                        code={`import numpy as np

# Cap at 95th percentile
p95 = np.percentile(data['Salary'], 95)
data['Salary'] = np.where(data['Salary'] > p95, p95, data['Salary'])`}
                                    />
                                </div>
                            </div>
                        </section>
                    )}

                    {activeTab === 'skewness' && (
                        <section className="bg-white rounded-xl shadow-xl p-8 animate-fadeIn">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <span>📉</span> Skewness Correction
                            </h2>

                            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
                                <h3 className="text-xl font-bold text-blue-800 mb-2">The Problem: Non-Normal Distribution</h3>
                                <p className="text-blue-700">
                                    Many ML models (like Linear Regression) assume that features are normally distributed. If your data is skewed (long tail), these models can fail to capture patterns correctly.
                                </p>
                            </div>

                            <div className="space-y-12">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Solution 1: Log Transformation</h3>

                                    <div className="bg-slate-50 p-6 rounded-xl mb-6 flex justify-center">
                                        <div className="text-center">
                                            <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest font-bold">Log Correction Formula</p>
                                            <BlockMath math={`y = \\ln(1 + x)`} />
                                        </div>
                                    </div>

                                    <div className="bg-emerald-50 p-6 rounded-xl mb-8 border border-emerald-100">
                                        <h4 className="text-sm font-bold text-emerald-800 uppercase tracking-widest mb-4">Mathematical Interpretation</h4>
                                        <ul className="space-y-3 text-sm">
                                            <li className="flex items-center gap-3">
                                                <code className="bg-emerald-100 px-2 py-0.5 rounded font-bold text-emerald-700">\ln(1 + x)</code>
                                                <span className="text-gray-600">The <strong>Compression</strong>: Logarithms compress large values much more than small ones. Adding 1 ensures we don't calculate $\ln(0)$ which is undefined.</span>
                                            </li>
                                        </ul>
                                        <div className="mt-6 pt-4 border-t border-emerald-200">
                                            <p className="text-xs text-emerald-800 italic">
                                                <strong>🛠️ Modeling Challenge:</strong> Log transform is a specific case of the Power Transform. Can you design a more flexible equation like $x^\lambda$ where you can tune $\lambda$ to find the perfect distribution? (This is the basis of Box-Cox).
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                                            <h4 className="font-bold text-green-800">Advantages</h4>
                                            <ul className="text-sm text-green-700 list-disc list-inside mt-2">
                                                <li>Highly effective for right-skewed data</li>
                                                <li>Easy to compute and reverse</li>
                                            </ul>
                                        </div>
                                        <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                                            <h4 className="font-bold text-red-800">Disadvantages</h4>
                                            <ul className="text-sm text-red-700 list-disc list-inside mt-2">
                                                <li>Cannot be used with zero or negative values</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <CodeBlock
                                        language="python"
                                        code={`import numpy as np

# Apply log transform
data['Log_Salary'] = np.log1p(data['Salary']) # log(1+x) handles small values`}
                                    />
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Solution 2: Box-Cox / Yeo-Johnson Transform</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                                            <h4 className="font-bold text-green-800">Advantages</h4>
                                            <ul className="text-sm text-green-700 list-disc list-inside mt-2">
                                                <li>Automatically finds the best transformation parameter</li>
                                                <li>Yeo-Johnson handles negative values</li>
                                            </ul>
                                        </div>
                                        <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                                            <h4 className="font-bold text-red-800">Disadvantages</h4>
                                            <ul className="text-sm text-red-700 list-disc list-inside mt-2">
                                                <li>Computationally more complex</li>
                                                <li>Harder to interpret physical meaning of values</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <CodeBlock
                                        language="python"
                                        code={`from sklearn.preprocessing import PowerTransformer

# Automatically normalize data
pt = PowerTransformer(method='yeo-johnson')
data_transformed = pt.fit_transform(data)`}
                                    />
                                </div>
                            </div>
                        </section>
                    )}

                    {activeTab === 'summary' && (
                        <section className="bg-white rounded-xl shadow-xl p-8 animate-fadeIn">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <span>📋</span> Comparison & Best Practices
                            </h2>

                            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-teal-600 text-white uppercase text-xs font-bold">
                                        <tr>
                                            <th className="px-6 py-4">Technique</th>
                                            <th className="px-6 py-4">Effective Problem</th>
                                            <th className="px-6 py-4">Effective Algorithm</th>
                                            <th className="px-6 py-4">Key Advice</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-bold text-gray-900">Standardization</td>
                                            <td className="px-6 py-4">Features with unknown ranges</td>
                                            <td className="px-6 py-4">SVM, Logistic Regression, Linear Regression</td>
                                            <td className="px-6 py-4">Default choice for most ML scenarios.</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50 bg-gray-50 bg-opacity-30">
                                            <td className="px-6 py-4 font-bold text-gray-900">Normalization</td>
                                            <td className="px-6 py-4">Features with fixed bounds</td>
                                            <td className="px-6 py-4">Neural Networks, KNN</td>
                                            <td className="px-6 py-4">Use when you know the bound and there are NO outliers.</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-bold text-gray-900">Median Imputation</td>
                                            <td className="px-6 py-4">Missing values in skewed data</td>
                                            <td className="px-6 py-4">Any</td>
                                            <td className="px-6 py-4">Better than mean if outliers exist.</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50 bg-gray-50 bg-opacity-30">
                                            <td className="px-6 py-4 font-bold text-gray-900">Winsorization</td>
                                            <td className="px-6 py-4">Presence of heavy outliers</td>
                                            <td className="px-6 py-4">Linear models</td>
                                            <td className="px-6 py-4">Choose if you cannot afford to delete rows.</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-bold text-gray-900">Log Transform</td>
                                            <td className="px-6 py-4">Strong right-skewness</td>
                                            <td className="px-6 py-4">Linear Regression</td>
                                            <td className="px-6 py-4">Great for money/population-related data.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-12 bg-teal-50 rounded-xl p-8 border-2 border-teal-200">
                                <h3 className="text-2xl font-bold text-teal-900 mb-4">📢 Pro Tip for Students</h3>
                                <p className="text-teal-800 leading-relaxed">
                                    "Garbage In, Garbage Out." No matter how advanced your algorithm is, if your numeric data is messy, the model will produce poor results. Always verify your data's scale and missingness BEFORE you start training.
                                </p>
                            </div>
                        </section>
                    )}
                    {/* Modelling Innovation Lab */}
                    <div className="bg-slate-900 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden mb-16 mt-20">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-600 opacity-20 blur-3xl -mr-32 -mt-32 rounded-full"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <span className="p-2 bg-teal-500 rounded-xl text-white">🔬</span> Data Modelling Innovation Lab
                            </h2>
                            <p className="text-teal-200 text-lg mb-10 max-w-3xl">
                                Being a Data Scientist means knowing when to break standard equations. How would you handle real-world messy data?
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                                    <h3 className="text-xl font-bold text-teal-400 mb-4">Case Study: The Outlier Crisis</h3>
                                    <p className="text-sm text-slate-300 mb-4">
                                        Your dataset has 1,000 users with income $50k, but one user is a billionaire ($1B). Min-Max Scaling will put 999 users at 0.00005 and one user at 1.0.
                                    </p>
                                    <div className="space-y-4">
                                        <div className="p-3 bg-slate-900 rounded-lg border border-teal-500/30">
                                            <span className="text-xs text-teal-300 font-bold block mb-1">Traditional Min-Max</span>
                                            <InlineMath math={"x_{norm} = \\frac{x - min}{max - min}"} />
                                        </div>
                                        <div className="p-3 bg-teal-900/40 rounded-lg border border-teal-500">
                                            <span className="text-xs text-teal-300 font-bold block mb-1">Your Innovation Task</span>
                                            <p className="text-xs leading-relaxed text-teal-100">
                                                Design a <strong>"Clipped Scaler"</strong> that replaces $max$ and $min$ with fixed percentiles (e.g., 5th and 95th) to protect the distribution.
                                            </p>
                                            <div className="mt-3 p-2 bg-slate-900 rounded font-mono text-[10px] text-teal-400">
                                                Design: <InlineMath math={"x_{clipped} = \\frac{x - P_{05}}{P_{95} - P_{05}}"} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                                    <h3 className="text-xl font-bold text-blue-400 mb-4">Case Study: Categorical Distance</h3>
                                    <p className="text-sm text-slate-300 mb-4">
                                        Label Encoding (1, 2, 3) suggests that Color 3 is "further" from Color 1 than Color 2. This is mathematically false for independent categories.
                                    </p>
                                    <div className="space-y-4">
                                        <div className="p-3 bg-slate-900 rounded-lg border border-blue-500/30">
                                            <span className="text-xs text-blue-300 font-bold block mb-1">Traditional Encoding</span>
                                            <span className="text-xs">Red=1, Blue=2, Green=3</span>
                                        </div>
                                        <div className="p-3 bg-blue-900/40 rounded-lg border border-blue-500">
                                            <span className="text-xs text-blue-300 font-bold block mb-1">Your Innovation Task</span>
                                            <p className="text-xs leading-relaxed text-blue-100">
                                                Design a <strong>"One-Hot Tensor"</strong> where each category gets its own dimension, making the distance between any two colors exactly $\sqrt{2}$.
                                            </p>
                                            <div className="mt-3 p-2 bg-slate-900 rounded font-mono text-[10px] text-blue-400">
                                                Propose: <InlineMath math={"\\text{dist}(A, B) = 1 \\text{ if } A \\neq B"} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8 mt-16">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-400">ML Learning Platform - Data Preprocessing Module</p>
                    <p className="text-gray-500 mt-2">Built for engineering students to master data quality.</p>
                </div>
            </footer>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default PreprocessingPage;
