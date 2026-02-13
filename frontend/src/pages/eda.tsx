import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamic import for Chart.js to avoid SSR issues
const Chart = dynamic(() => import('react-chartjs-2').then(mod => mod.Chart), {
    ssr: false,
    loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
});

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    RadialLinearScale
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    RadialLinearScale
);

const EDAPage: React.FC = () => {
    const [activeDataset, setActiveDataset] = useState<'iris' | 'wine'>('iris');
    const [mounted, setMounted] = useState(false);

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


    // Iris Dataset Visualizations
    const irisData = {
        histogram: {
            labels: ['4.0-4.5', '4.5-5.0', '5.0-5.5', '5.5-6.0', '6.0-6.5', '6.5-7.0', '7.0-7.5', '7.5-8.0'],
            datasets: [{
                label: 'Sepal Length Distribution',
                data: [4, 29, 37, 31, 25, 15, 7, 2],
                backgroundColor: 'rgba(59, 130, 246, 0.6)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 2
            }]
        },
        scatter: {
            datasets: [
                {
                    label: 'Setosa',
                    data: [
                        { x: 5.1, y: 3.5 }, { x: 4.9, y: 3.0 }, { x: 4.7, y: 3.2 },
                        { x: 5.0, y: 3.6 }, { x: 5.4, y: 3.9 }
                    ],
                    backgroundColor: 'rgba(239, 68, 68, 0.6)',
                    pointRadius: 6
                },
                {
                    label: 'Versicolor',
                    data: [
                        { x: 7.0, y: 3.2 }, { x: 6.4, y: 3.2 }, { x: 6.9, y: 3.1 },
                        { x: 6.3, y: 2.3 }, { x: 6.7, y: 3.0 }
                    ],
                    backgroundColor: 'rgba(34, 197, 94, 0.6)',
                    pointRadius: 6
                },
                {
                    label: 'Virginica',
                    data: [
                        { x: 6.3, y: 3.3 }, { x: 7.1, y: 3.0 }, { x: 6.5, y: 3.0 },
                        { x: 7.6, y: 3.0 }, { x: 7.2, y: 3.6 }
                    ],
                    backgroundColor: 'rgba(168, 85, 247, 0.6)',
                    pointRadius: 6
                }
            ]
        },
        boxPlot: {
            labels: ['Setosa', 'Versicolor', 'Virginica'],
            datasets: [{
                label: 'Petal Length (cm)',
                data: [1.5, 4.3, 5.5],
                backgroundColor: ['rgba(239, 68, 68, 0.6)', 'rgba(34, 197, 94, 0.6)', 'rgba(168, 85, 247, 0.6)'],
                borderColor: ['rgba(239, 68, 68, 1)', 'rgba(34, 197, 94, 1)', 'rgba(168, 85, 247, 1)'],
                borderWidth: 2
            }]
        }
    };

    // Wine Dataset Visualizations
    const wineData = {
        histogram: {
            labels: ['11-12', '12-13', '13-14', '14-15'],
            datasets: [{
                label: 'Alcohol Content Distribution',
                data: [59, 71, 38, 10],
                backgroundColor: 'rgba(168, 85, 247, 0.6)',
                borderColor: 'rgba(168, 85, 247, 1)',
                borderWidth: 2
            }]
        },
        scatter: {
            datasets: [
                {
                    label: 'Class 1',
                    data: [
                        { x: 14.2, y: 1.7 }, { x: 13.2, y: 1.8 }, { x: 13.3, y: 2.4 },
                        { x: 14.4, y: 1.9 }, { x: 13.2, y: 2.6 }
                    ],
                    backgroundColor: 'rgba(239, 68, 68, 0.6)',
                    pointRadius: 6
                },
                {
                    label: 'Class 2',
                    data: [
                        { x: 12.4, y: 2.6 }, { x: 12.1, y: 2.1 }, { x: 12.0, y: 1.6 },
                        { x: 12.8, y: 1.8 }, { x: 11.8, y: 2.2 }
                    ],
                    backgroundColor: 'rgba(34, 197, 94, 0.6)',
                    pointRadius: 6
                },
                {
                    label: 'Class 3',
                    data: [
                        { x: 13.2, y: 3.2 }, { x: 13.7, y: 3.3 }, { x: 12.9, y: 2.8 },
                        { x: 13.5, y: 3.5 }, { x: 13.1, y: 3.0 }
                    ],
                    backgroundColor: 'rgba(168, 85, 247, 0.6)',
                    pointRadius: 6
                }
            ]
        },
        barChart: {
            labels: ['Class 1', 'Class 2', 'Class 3'],
            datasets: [{
                label: 'Average Alcohol Content (%)',
                data: [13.7, 12.3, 13.2],
                backgroundColor: ['rgba(239, 68, 68, 0.6)', 'rgba(34, 197, 94, 0.6)', 'rgba(168, 85, 247, 0.6)'],
                borderColor: ['rgba(239, 68, 68, 1)', 'rgba(34, 197, 94, 1)', 'rgba(168, 85, 247, 1)'],
                borderWidth: 2
            }]
        }
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    font: { size: 12, weight: 'bold' as const },
                    padding: 15
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                titleFont: { size: 14, weight: 'bold' as const },
                bodyFont: { size: 13 }
            }
        },
        scales: {
            x: {
                grid: { color: 'rgba(0, 0, 0, 0.05)' },
                ticks: { font: { size: 11 } }
            },
            y: {
                grid: { color: 'rgba(0, 0, 0, 0.05)' },
                ticks: { font: { size: 11 } }
            }
        }
    };

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
                            <Link href="/eda" className="text-blue-600 font-semibold">EDA</Link>
                            <Link href="/instructor" className="text-gray-700 hover:text-blue-600 transition">Instructor</Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Page Title */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-2xl p-8 mb-8 text-white">
                    <h1 className="text-4xl font-bold mb-3">📊 Exploratory Data Analysis</h1>
                    <p className="text-lg text-purple-100">
                        Understand your data through visualizations and statistical insights
                    </p>
                </div>

                {/* Dataset Selector */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Dataset</h2>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setActiveDataset('iris')}
                            className={`flex-1 px-6 py-4 rounded-lg font-semibold transition-all duration-200 ${activeDataset === 'iris'
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            🌸 Iris Dataset
                        </button>
                        <button
                            onClick={() => setActiveDataset('wine')}
                            className={`flex-1 px-6 py-4 rounded-lg font-semibold transition-all duration-200 ${activeDataset === 'wine'
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            🍷 Wine Dataset
                        </button>
                    </div>
                </div>

                {/* Iris Dataset Content */}
                {activeDataset === 'iris' && (
                    <div className="space-y-8">
                        {/* Dataset Overview */}
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                <span>🌸</span> Iris Dataset Overview
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                                    <div className="text-4xl font-bold text-blue-600 mb-2">150</div>
                                    <div className="text-gray-700 font-semibold">Total Samples</div>
                                </div>
                                <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
                                    <div className="text-4xl font-bold text-green-600 mb-2">4</div>
                                    <div className="text-gray-700 font-semibold">Features</div>
                                </div>
                                <div className="bg-purple-50 rounded-lg p-6 border-2 border-purple-200">
                                    <div className="text-4xl font-bold text-purple-600 mb-2">3</div>
                                    <div className="text-gray-700 font-semibold">Classes</div>
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-500">
                                <h3 className="font-bold text-lg text-gray-900 mb-3">📝 What is this dataset?</h3>
                                <p className="text-gray-700 leading-relaxed mb-3">
                                    The Iris dataset contains measurements of 150 iris flowers from 3 different species:
                                    Setosa, Versicolor, and Virginica. Each flower has 4 measurements: sepal length,
                                    sepal width, petal length, and petal width (all in centimeters).
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    <span className="font-semibold">Why it matters:</span> This is one of the most famous
                                    datasets in machine learning! It's perfect for learning classification algorithms because
                                    the classes are well-separated and easy to visualize.
                                </p>
                            </div>
                        </div>

                        {/* Histogram */}
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span>📊</span> Distribution Analysis
                            </h3>
                            <div className="h-80 mb-6">
                                <Chart
                                    type="bar"
                                    data={irisData.histogram}
                                    options={{
                                        ...chartOptions,
                                        plugins: {
                                            ...chartOptions.plugins,
                                            title: {
                                                display: true,
                                                text: 'Sepal Length Distribution',
                                                font: { size: 16, weight: 'bold' as const }
                                            }
                                        }
                                    }}
                                />
                            </div>
                            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
                                <h4 className="font-bold text-lg text-blue-900 mb-3">💡 What does this tell us?</h4>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 font-bold">•</span>
                                        <span>Most iris flowers have sepal lengths between 5.0-6.5 cm (bell-shaped distribution)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 font-bold">•</span>
                                        <span>Very few flowers have extremely small (&lt;4.5 cm) or large (&gt;7.5 cm) sepals</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 font-bold">•</span>
                                        <span>This normal distribution is common in nature and makes the data suitable for many ML algorithms</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Scatter Plot */}
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span>🎯</span> Class Separation Analysis
                            </h3>
                            <div className="h-80 mb-6">
                                <Chart
                                    type="scatter"
                                    data={irisData.scatter}
                                    options={{
                                        ...chartOptions,
                                        plugins: {
                                            ...chartOptions.plugins,
                                            title: {
                                                display: true,
                                                text: 'Sepal Length vs Sepal Width by Species',
                                                font: { size: 16, weight: 'bold' as const }
                                            }
                                        },
                                        scales: {
                                            x: {
                                                ...chartOptions.scales.x,
                                                title: { display: true, text: 'Sepal Length (cm)', font: { size: 13, weight: 'bold' as const } }
                                            },
                                            y: {
                                                ...chartOptions.scales.y,
                                                title: { display: true, text: 'Sepal Width (cm)', font: { size: 13, weight: 'bold' as const } }
                                            }
                                        }
                                    }}
                                />
                            </div>
                            <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
                                <h4 className="font-bold text-lg text-green-900 mb-3">💡 What does this tell us?</h4>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-600 font-bold">🔴</span>
                                        <span><span className="font-semibold">Setosa (Red):</span> Clearly separated from others - has shorter sepals but wider width</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600 font-bold">🟢</span>
                                        <span><span className="font-semibold">Versicolor (Green):</span> Medium-sized sepals, some overlap with Virginica</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-600 font-bold">🟣</span>
                                        <span><span className="font-semibold">Virginica (Purple):</span> Longest sepals, slightly overlaps with Versicolor</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 font-bold">✓</span>
                                        <span className="font-semibold">Key Insight: The three species form distinct clusters, making classification easier!</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Bar Chart */}
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span>📏</span> Feature Comparison
                            </h3>
                            <div className="h-80 mb-6">
                                <Chart
                                    type="bar"
                                    data={irisData.boxPlot}
                                    options={{
                                        ...chartOptions,
                                        plugins: {
                                            ...chartOptions.plugins,
                                            title: {
                                                display: true,
                                                text: 'Average Petal Length by Species',
                                                font: { size: 16, weight: 'bold' as const }
                                            }
                                        },
                                        scales: {
                                            ...chartOptions.scales,
                                            y: {
                                                ...chartOptions.scales.y,
                                                title: { display: true, text: 'Petal Length (cm)', font: { size: 13, weight: 'bold' as const } }
                                            }
                                        }
                                    }}
                                />
                            </div>
                            <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-500">
                                <h4 className="font-bold text-lg text-purple-900 mb-3">💡 What does this tell us?</h4>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-600 font-bold">•</span>
                                        <span>Setosa has the shortest petals (~1.5 cm) - almost 3x smaller than Virginica!</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-600 font-bold">•</span>
                                        <span>Virginica has the longest petals (~5.5 cm) - this is a strong distinguishing feature</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-600 font-bold">•</span>
                                        <span>Petal length is one of the BEST features for classification - clear separation between species</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 font-bold">✓</span>
                                        <span className="font-semibold">ML Tip: Features with large differences between classes lead to better model accuracy!</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {/* Wine Dataset Content */}
                {activeDataset === 'wine' && (
                    <div className="space-y-8">
                        {/* Dataset Overview */}
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                <span>🍷</span> Wine Dataset Overview
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                <div className="bg-purple-50 rounded-lg p-6 border-2 border-purple-200">
                                    <div className="text-4xl font-bold text-purple-600 mb-2">178</div>
                                    <div className="text-gray-700 font-semibold">Total Samples</div>
                                </div>
                                <div className="bg-pink-50 rounded-lg p-6 border-2 border-pink-200">
                                    <div className="text-4xl font-bold text-pink-600 mb-2">13</div>
                                    <div className="text-gray-700 font-semibold">Features</div>
                                </div>
                                <div className="bg-red-50 rounded-lg p-6 border-2 border-red-200">
                                    <div className="text-4xl font-bold text-red-600 mb-2">3</div>
                                    <div className="text-gray-700 font-semibold">Wine Types</div>
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-purple-500">
                                <h3 className="font-bold text-lg text-gray-900 mb-3">📝 What is this dataset?</h3>
                                <p className="text-gray-700 leading-relaxed mb-3">
                                    The Wine dataset contains chemical analysis results of 178 wines from the same region
                                    in Italy but from 3 different cultivars (grape varieties). Features include alcohol
                                    content, acidity, color intensity, and other chemical properties.
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    <span className="font-semibold">Why it matters:</span> This dataset is excellent for
                                    learning multi-class classification with real-world chemical data. It shows how ML can
                                    identify wine types based on their chemical composition!
                                </p>
                            </div>
                        </div>

                        {/* Histogram */}
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span>📊</span> Distribution Analysis
                            </h3>
                            <div className="h-80 mb-6">
                                <Chart
                                    type="bar"
                                    data={wineData.histogram}
                                    options={{
                                        ...chartOptions,
                                        plugins: {
                                            ...chartOptions.plugins,
                                            title: {
                                                display: true,
                                                text: 'Alcohol Content Distribution',
                                                font: { size: 16, weight: 'bold' as const }
                                            }
                                        }
                                    }}
                                />
                            </div>
                            <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-500">
                                <h4 className="font-bold text-lg text-purple-900 mb-3">💡 What does this tell us?</h4>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-600 font-bold">•</span>
                                        <span>Most wines have alcohol content between 12-13% (peak of distribution)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-600 font-bold">•</span>
                                        <span>The distribution is fairly balanced across the 11-14% range</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-600 font-bold">•</span>
                                        <span>Very few wines have alcohol content above 14% - these might be special varieties</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 font-bold">✓</span>
                                        <span className="font-semibold">This spread suggests alcohol content is a useful feature for classification</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Scatter Plot */}
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span>🎯</span> Class Separation Analysis
                            </h3>
                            <div className="h-80 mb-6">
                                <Chart
                                    type="scatter"
                                    data={wineData.scatter}
                                    options={{
                                        ...chartOptions,
                                        plugins: {
                                            ...chartOptions.plugins,
                                            title: {
                                                display: true,
                                                text: 'Alcohol vs Malic Acid by Wine Class',
                                                font: { size: 16, weight: 'bold' as const }
                                            }
                                        },
                                        scales: {
                                            x: {
                                                ...chartOptions.scales.x,
                                                title: { display: true, text: 'Alcohol (%)', font: { size: 13, weight: 'bold' as const } }
                                            },
                                            y: {
                                                ...chartOptions.scales.y,
                                                title: { display: true, text: 'Malic Acid (g/L)', font: { size: 13, weight: 'bold' as const } }
                                            }
                                        }
                                    }}
                                />
                            </div>
                            <div className="bg-pink-50 rounded-lg p-6 border-l-4 border-pink-500">
                                <h4 className="font-bold text-lg text-pink-900 mb-3">💡 What does this tell us?</h4>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-600 font-bold">🔴</span>
                                        <span><span className="font-semibold">Class 1 (Red):</span> Higher alcohol content (13-14%), lower malic acid</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600 font-bold">🟢</span>
                                        <span><span className="font-semibold">Class 2 (Green):</span> Lower alcohol (11-12%), moderate malic acid</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-600 font-bold">🟣</span>
                                        <span><span className="font-semibold">Class 3 (Purple):</span> Moderate alcohol (12-13%), higher malic acid (2.8-3.5)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 font-bold">✓</span>
                                        <span className="font-semibold">Key Insight: Classes show good separation - ML models can distinguish wine types!</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Bar Chart */}
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span>📏</span> Feature Comparison
                            </h3>
                            <div className="h-80 mb-6">
                                <Chart
                                    type="bar"
                                    data={wineData.barChart}
                                    options={{
                                        ...chartOptions,
                                        plugins: {
                                            ...chartOptions.plugins,
                                            title: {
                                                display: true,
                                                text: 'Average Alcohol Content by Wine Class',
                                                font: { size: 16, weight: 'bold' as const }
                                            }
                                        },
                                        scales: {
                                            ...chartOptions.scales,
                                            y: {
                                                ...chartOptions.scales.y,
                                                title: { display: true, text: 'Alcohol (%)', font: { size: 13, weight: 'bold' as const } }
                                            }
                                        }
                                    }}
                                />
                            </div>
                            <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-500">
                                <h4 className="font-bold text-lg text-red-900 mb-3">💡 What does this tell us?</h4>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-600 font-bold">•</span>
                                        <span>Class 1 wines have the highest average alcohol content (13.7%) - premium quality!</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-600 font-bold">•</span>
                                        <span>Class 2 wines have the lowest alcohol (12.3%) - lighter, more refreshing</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-600 font-bold">•</span>
                                        <span>Class 3 wines are in the middle (13.2%) - balanced characteristics</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 font-bold">✓</span>
                                        <span className="font-semibold">ML Tip: Clear differences in alcohol content make it a strong predictor for wine classification!</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {/* Key Takeaways Section */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-lg p-8 border-2 border-green-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span>🎓</span> Key Takeaways from EDA
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg p-6 shadow">
                            <h3 className="font-bold text-lg text-green-700 mb-3">✓ Why EDA Matters</h3>
                            <ul className="space-y-2 text-gray-700 text-sm">
                                <li>• Understand data distribution and patterns</li>
                                <li>• Identify which features are most useful</li>
                                <li>• Detect outliers and data quality issues</li>
                                <li>• Choose appropriate ML algorithms</li>
                            </ul>
                        </div>
                        <div className="bg-white rounded-lg p-6 shadow">
                            <h3 className="font-bold text-lg text-blue-700 mb-3">📚 What We Learned</h3>
                            <ul className="space-y-2 text-gray-700 text-sm">
                                <li>• Both datasets have well-separated classes</li>
                                <li>• Features show clear patterns for classification</li>
                                <li>• Normal distributions make data ML-ready</li>
                                <li>• Visual analysis reveals hidden insights</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Next Steps */}
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">🚀 Ready to Build Models?</h2>
                    <p className="text-gray-700 mb-6">
                        Now that you understand the data, try building classification models using these datasets!
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link href="/datasets" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg">
                            View Full Datasets
                        </Link>
                        <Link href="/" className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition shadow-lg">
                            Explore Algorithms
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EDAPage;
