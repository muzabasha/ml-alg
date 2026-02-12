import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamic imports for Chart.js
const Bar = dynamic(() => import('react-chartjs-2').then(mod => mod.Bar), { ssr: false });
const Scatter = dynamic(() => import('react-chartjs-2').then(mod => mod.Scatter), { ssr: false });

// Type definitions
interface Statistics {
    mean: number;
    std: number;
    min: number;
    max: number;
}

interface Dataset {
    name: string;
    description: string;
    source: string;
    task: string;
    samples: number;
    features: number;
    classes: number;
    featureNames: string[];
    targetNames: string[];
    statistics: Record<string, Statistics>;
    correlations: [string, string, number][];
    useCases: string[];
}

const DatasetsPage: React.FC = () => {
    const [selectedDataset, setSelectedDataset] = useState('iris');
    const [view, setView] = useState('overview');
    const [selectedFeature, setSelectedFeature] = useState('sepal_length');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Dataset information
    const datasets: Record<string, Dataset> = {
        iris: {
            name: 'Iris Flower Dataset',
            description: 'Classic dataset containing 150 samples of iris flowers from 3 species (Setosa, Versicolor, Virginica). Each sample has 4 features: sepal length, sepal width, petal length, and petal width.',
            source: 'sklearn.datasets.load_iris()',
            task: 'Multi-class Classification',
            samples: 150,
            features: 4,
            classes: 3,
            featureNames: ['sepal_length', 'sepal_width', 'petal_length', 'petal_width'],
            targetNames: ['Setosa', 'Versicolor', 'Virginica'],
            statistics: {
                sepal_length: { mean: 5.84, std: 0.83, min: 4.3, max: 7.9 },
                sepal_width: { mean: 3.05, std: 0.43, min: 2.0, max: 4.4 },
                petal_length: { mean: 3.76, std: 1.76, min: 1.0, max: 6.9 },
                petal_width: { mean: 1.20, std: 0.76, min: 0.1, max: 2.5 }
            },
            correlations: [
                ['sepal_length', 'petal_length', 0.87] as [string, string, number],
                ['sepal_length', 'petal_width', 0.82] as [string, string, number],
                ['petal_length', 'petal_width', 0.96] as [string, string, number]
            ],
            useCases: [
                'Classification algorithm comparison',
                'Feature selection techniques',
                'Dimensionality reduction (PCA)',
                'Clustering analysis'
            ]
        },
        wine: {
            name: 'Wine Quality Dataset',
            description: 'Contains chemical analysis results of 178 wine samples from 3 different cultivars. Features include alcohol content, acidity, phenols, and other chemical properties.',
            source: 'sklearn.datasets.load_wine()',
            task: 'Multi-class Classification',
            samples: 178,
            features: 13,
            classes: 3,
            featureNames: ['alcohol', 'malic_acid', 'ash', 'alcalinity', 'magnesium', 'phenols', 'flavanoids', 'nonflavanoid_phenols', 'proanthocyanins', 'color_intensity', 'hue', 'od280_od315', 'proline'],
            targetNames: ['Class 0', 'Class 1', 'Class 2'],
            statistics: {
                alcohol: { mean: 13.0, std: 0.81, min: 11.0, max: 14.8 },
                malic_acid: { mean: 2.34, std: 1.12, min: 0.74, max: 5.80 },
                phenols: { mean: 2.29, std: 0.63, min: 0.98, max: 3.88 },
                flavanoids: { mean: 2.03, std: 1.00, min: 0.34, max: 5.08 }
            },
            correlations: [
                ['alcohol', 'phenols', 0.29] as [string, string, number],
                ['flavanoids', 'phenols', 0.86] as [string, string, number],
                ['alcohol', 'proline', 0.64] as [string, string, number]
            ],
            useCases: [
                'Quality prediction models',
                'Feature importance analysis',
                'Multi-class classification',
                'Ensemble methods comparison'
            ]
        }
    };

    const currentDataset = datasets[selectedDataset as keyof typeof datasets];

    if (!mounted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Header */}
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-blue-600">ML Learning Platform</h1>
                        <nav className="space-x-6">
                            <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
                            <Link href="/datasets" className="text-blue-600 font-semibold">Datasets</Link>
                            <Link href="/instructor" className="text-gray-700 hover:text-blue-600">Instructor</Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="mb-6">
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">Dataset Explorer</h2>
                    <p className="text-gray-600">Explore real-world datasets with EDA and visualizations</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Left Sidebar */}
                    <div className="space-y-4">
                        {/* Dataset Selection */}
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h3 className="font-bold text-gray-900 mb-3">📁 Select Dataset</h3>
                            <div className="space-y-2">
                                {Object.entries(datasets).map(([key, dataset]) => (
                                    <button
                                        key={key}
                                        onClick={() => setSelectedDataset(key)}
                                        className={`w-full px-4 py-3 rounded-lg text-left transition ${selectedDataset === key
                                            ? 'bg-blue-600 text-white font-semibold'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        <div className="font-semibold">{dataset.name}</div>
                                        <div className="text-xs mt-1 opacity-80">
                                            {dataset.samples} samples, {dataset.features} features
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* View Selection */}
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h3 className="font-bold text-gray-900 mb-3">📊 View</h3>
                            <div className="space-y-2">
                                {['overview', 'statistics', 'correlations', 'usage'].map(v => (
                                    <button
                                        key={v}
                                        onClick={() => setView(v)}
                                        className={`w-full px-3 py-2 rounded-lg text-sm transition capitalize ${view === v
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {v}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Overview */}
                        {view === 'overview' && (
                            <>
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{currentDataset.name}</h3>
                                    <p className="text-gray-700 mb-4">{currentDataset.description}</p>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <div className="text-sm text-blue-600 font-semibold">Samples</div>
                                            <div className="text-2xl font-bold text-blue-900">{currentDataset.samples}</div>
                                        </div>
                                        <div className="bg-green-50 p-4 rounded-lg">
                                            <div className="text-sm text-green-600 font-semibold">Features</div>
                                            <div className="text-2xl font-bold text-green-900">{currentDataset.features}</div>
                                        </div>
                                        <div className="bg-purple-50 p-4 rounded-lg">
                                            <div className="text-sm text-purple-600 font-semibold">Classes</div>
                                            <div className="text-2xl font-bold text-purple-900">{currentDataset.classes}</div>
                                        </div>
                                        <div className="bg-orange-50 p-4 rounded-lg">
                                            <div className="text-sm text-orange-600 font-semibold">Task</div>
                                            <div className="text-sm font-bold text-orange-900 mt-2">{currentDataset.task}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h4 className="font-bold text-gray-900 mb-3">📋 Features</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {currentDataset.featureNames.map(feature => (
                                            <div key={feature} className="bg-gray-100 px-3 py-2 rounded text-sm">
                                                {feature.replace(/_/g, ' ')}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h4 className="font-bold text-gray-900 mb-3">🎯 Target Classes</h4>
                                    <div className="flex gap-2 flex-wrap">
                                        {currentDataset.targetNames.map((target, idx) => (
                                            <div key={idx} className="bg-blue-100 px-4 py-2 rounded-lg font-semibold text-blue-900">
                                                {target}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h4 className="font-bold text-gray-900 mb-3">💻 How to Load</h4>
                                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                                        <code>{`from sklearn.datasets import load_${selectedDataset}

# Load dataset
data = load_${selectedDataset}()
X = data.data  # Features
y = data.target  # Labels

print(f"Shape: {X.shape}")
print(f"Features: {data.feature_names}")
print(f"Classes: {data.target_names}")`}</code>
                                    </pre>
                                </div>
                            </>
                        )}

                        {/* Statistics */}
                        {view === 'statistics' && (
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">📈 Descriptive Statistics</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="p-3 border border-gray-300 text-left">Feature</th>
                                                <th className="p-3 border border-gray-300">Mean</th>
                                                <th className="p-3 border border-gray-300">Std Dev</th>
                                                <th className="p-3 border border-gray-300">Min</th>
                                                <th className="p-3 border border-gray-300">Max</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.entries(currentDataset.statistics).map(([feature, stats]: [string, any]) => (
                                                <tr key={feature} className="hover:bg-gray-50">
                                                    <td className="p-3 border border-gray-300 font-semibold">{feature.replace(/_/g, ' ')}</td>
                                                    <td className="p-3 border border-gray-300 text-center">{stats.mean.toFixed(2)}</td>
                                                    <td className="p-3 border border-gray-300 text-center">{stats.std.toFixed(2)}</td>
                                                    <td className="p-3 border border-gray-300 text-center">{stats.min.toFixed(2)}</td>
                                                    <td className="p-3 border border-gray-300 text-center">{stats.max.toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="mt-6">
                                    <h4 className="font-bold text-gray-900 mb-3">💡 Key Insights</h4>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                                        <li>Mean values show the central tendency of each feature</li>
                                        <li>Standard deviation indicates feature variability</li>
                                        <li>Min/Max values help identify the feature ranges</li>
                                        <li>Use these statistics for feature scaling and normalization</li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* Correlations */}
                        {view === 'correlations' && (
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">🔗 Feature Correlations</h3>
                                <div className="space-y-4">
                                    {currentDataset.correlations.map(([feat1, feat2, corr], idx) => {
                                        const strength = Math.abs(corr);
                                        const type = corr > 0 ? 'Positive' : 'Negative';
                                        const color = corr > 0 ? 'blue' : 'red';
                                        const bgColor = corr > 0 ? 'bg-blue-50' : 'bg-red-50';

                                        return (
                                            <div key={idx} className={`${bgColor} p-4 rounded-lg border-2 border-${color}-200`}>
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <div className="font-bold text-gray-900">
                                                            {feat1.replace(/_/g, ' ')} ↔ {feat2.replace(/_/g, ' ')}
                                                        </div>
                                                        <div className={`text-sm text-${color}-700 mt-1`}>
                                                            {type} Correlation: {corr.toFixed(3)}
                                                        </div>
                                                    </div>
                                                    <div className={`text-3xl font-bold text-${color}-600`}>
                                                        {strength >= 0.8 ? '💪' : strength >= 0.5 ? '👍' : '👌'}
                                                    </div>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className={`bg-${color}-600 h-2 rounded-full`}
                                                            style={{ width: `${strength * 100}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-6 bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                                    <h4 className="font-bold text-yellow-900 mb-2">📚 Understanding Correlations</h4>
                                    <ul className="list-disc list-inside space-y-1 text-sm text-yellow-800">
                                        <li>+1.0 = Perfect positive correlation (features move together)</li>
                                        <li>-1.0 = Perfect negative correlation (features move opposite)</li>
                                        <li>0.0 = No correlation (features are independent)</li>
                                        <li>|r| &gt; 0.7 = Strong correlation</li>
                                        <li>|r| 0.3-0.7 = Moderate correlation</li>
                                        <li>|r| &lt; 0.3 = Weak correlation</li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* Usage */}
                        {view === 'usage' && (
                            <>
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">🎯 Common Use Cases</h3>
                                    <div className="space-y-3">
                                        {currentDataset.useCases.map((useCase, idx) => (
                                            <div key={idx} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                                                <span className="text-2xl">{idx + 1}.</span>
                                                <div className="flex-1">
                                                    <div className="font-semibold text-gray-900">{useCase}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h4 className="font-bold text-gray-900 mb-3">💻 Complete Example</h4>
                                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                                        <code>{`from sklearn.datasets import load_${selectedDataset}
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# Load dataset
data = load_${selectedDataset}()
X, y = data.data, data.target

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train_scaled, y_train)

# Evaluate
y_pred = model.predict(X_test_scaled)
accuracy = accuracy_score(y_test, y_pred)

print(f"Accuracy: {accuracy:.3f}")
print("\\nClassification Report:")
print(classification_report(y_test, y_pred, 
                          target_names=data.target_names))`}</code>
                                    </pre>
                                </div>

                                <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                                    <h4 className="font-bold text-blue-900 mb-2">💡 Tips for Using This Dataset</h4>
                                    <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
                                        <li>Always split data before any preprocessing</li>
                                        <li>Scale features for distance-based algorithms (KNN, SVM)</li>
                                        <li>Try different train/test split ratios (70/30, 80/20)</li>
                                        <li>Use cross-validation for robust evaluation</li>
                                        <li>Compare multiple algorithms to find the best fit</li>
                                        <li>Visualize feature distributions and relationships</li>
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8 mt-16">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-400">ML Learning Platform - Dataset Explorer</p>
                    <p className="text-gray-500 mt-2">Explore real-world datasets for machine learning</p>
                </div>
            </footer>
        </div>
    );
};

export default DatasetsPage;
