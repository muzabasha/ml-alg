import React from 'react';
import Link from 'next/link';

const HomePage: React.FC = () => {
    const algorithms = [
        { id: 'linear_regression', name: 'Linear Regression', category: 'Regression', difficulty: 'Beginner' },
        { id: 'logistic_regression', name: 'Logistic Regression', category: 'Classification', difficulty: 'Beginner' },
        { id: 'knn', name: 'k-Nearest Neighbors', category: 'Classification', difficulty: 'Beginner' },
        { id: 'kmeans', name: 'K-Means Clustering', category: 'Clustering', difficulty: 'Beginner' },
        { id: 'naive_bayes', name: 'Naive Bayes Classifier', category: 'Classification', difficulty: 'Beginner' },
        { id: 'decision_tree', name: 'Decision Tree', category: 'Classification', difficulty: 'Intermediate' },
        { id: 'svm', name: 'Support Vector Machine', category: 'Classification', difficulty: 'Advanced' },
        { id: 'ann', name: 'Artificial Neural Network', category: 'Deep Learning', difficulty: 'Intermediate' },
        { id: 'cnn', name: 'Convolutional Neural Network', category: 'Computer Vision', difficulty: 'Advanced' },
        { id: 'rnn', name: 'Recurrent Neural Network', category: 'Sequential Data', difficulty: 'Advanced' },
        { id: 'transformer', name: 'Transformer Network', category: 'Attention-Based', difficulty: 'Advanced' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-blue-600">
                            ML Learning Platform
                        </h1>
                        <nav className="space-x-6">
                            <Link href="/" className="text-gray-700 hover:text-blue-600">
                                Home
                            </Link>
                            <Link href="/datasets" className="text-gray-700 hover:text-blue-600">
                                Datasets
                            </Link>
                            <Link href="/eda" className="text-gray-700 hover:text-blue-600">
                                EDA
                            </Link>
                            <Link href="/instructor" className="text-gray-700 hover:text-blue-600">
                                Instructor
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-5xl font-bold text-gray-900 mb-4">
                    Learn Machine Learning & Deep Learning
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                    Master 11 essential algorithms from classical ML to modern Deep Learning.
                    Complete with mathematical formulations, Python implementations, and practical examples.
                </p>
                <div className="flex justify-center gap-4">
                    <Link
                        href="/algorithm/linear_regression"
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Start Learning
                    </Link>
                    <Link
                        href="/instructor"
                        className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition"
                    >
                        About Instructor
                    </Link>
                </div>
            </section>

            {/* Algorithms Grid */}
            <section className="container mx-auto px-4 py-16">
                <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    Available Algorithms
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {algorithms.map((algo) => (
                        <Link
                            key={algo.id}
                            href={`/algorithm/${algo.id}`}
                            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="text-xl font-bold text-gray-900">{algo.name}</h4>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${algo.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                                    algo.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                    {algo.difficulty}
                                </span>
                            </div>
                            <p className="text-gray-600 mb-4">{algo.category}</p>
                            <div className="flex items-center text-blue-600 font-semibold">
                                Learn More →
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section className="container mx-auto px-4 py-16">
                <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                    What You'll Learn
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                        <div className="text-4xl mb-4">📚</div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                            Conceptual Understanding
                        </h4>
                        <p className="text-gray-600">
                            Plain-language explanations with real-world analogies for every algorithm
                        </p>
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                        <div className="text-4xl mb-4">🔬</div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                            Mathematical Foundations
                        </h4>
                        <p className="text-gray-600">
                            LaTeX formulations with intuitive interpretations and key terms
                        </p>
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                        <div className="text-4xl mb-4">💻</div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                            Practical Implementation
                        </h4>
                        <p className="text-gray-600">
                            From-scratch code and industry-standard library implementations
                        </p>
                    </div>
                </div>
            </section>

            {/* Dataset Explorer Section */}
            <section className="container mx-auto px-4 py-16 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl shadow-lg my-8">
                <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                        📊 Explore Real-World Datasets
                    </h3>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Learn data exploration and analysis with classic ML datasets. Understand data characteristics, correlations, and how to prepare data for training.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">🌸 Iris Dataset</h4>
                        <p className="text-gray-600 mb-4">150 samples, 4 features, 3 classes</p>
                        <ul className="text-sm text-gray-700 space-y-1 mb-4">
                            <li>• Classic classification dataset</li>
                            <li>• Flower measurements</li>
                            <li>• Perfect for beginners</li>
                        </ul>
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">🍷 Wine Dataset</h4>
                        <p className="text-gray-600 mb-4">178 samples, 13 features, 3 classes</p>
                        <ul className="text-sm text-gray-700 space-y-1 mb-4">
                            <li>• Chemical analysis data</li>
                            <li>• Quality prediction</li>
                            <li>• Feature-rich dataset</li>
                        </ul>
                    </div>
                </div>
                <div className="text-center mt-8">
                    <Link
                        href="/datasets"
                        className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition shadow-lg"
                    >
                        Explore Datasets →
                    </Link>
                </div>
            </section>

            {/* Features */}
            <section className="container mx-auto px-4 py-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                    What You'll Learn
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                        <div className="text-4xl mb-4">📚</div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                            Conceptual Understanding
                        </h4>
                        <p className="text-gray-600">
                            Plain-language explanations with real-world analogies for every algorithm
                        </p>
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                        <div className="text-4xl mb-4">🔬</div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                            Mathematical Foundations
                        </h4>
                        <p className="text-gray-600">
                            LaTeX formulations with intuitive interpretations and key terms
                        </p>
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                        <div className="text-4xl mb-4">💻</div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                            Practical Implementation
                        </h4>
                        <p className="text-gray-600">
                            From-scratch code and industry-standard library implementations
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8 mt-16">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-400">
                        ML Learning Platform - Interactive Machine Learning Education
                    </p>
                    <p className="text-gray-500 mt-2">
                        Built for engineering students by Dr. Syed Muzamil Basha
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
