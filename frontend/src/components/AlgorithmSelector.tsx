/**
 * AlgorithmSelector Component
 * Displays a sidebar with all available algorithms organized by category
 * Allows users to select an algorithm to learn
 */

import React, { useState } from 'react';
import Link from 'next/link';

interface Algorithm {
    id: string;
    name: string;
    category: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    estimatedTime: string;
}

interface AlgorithmSelectorProps {
    algorithms: Algorithm[];
    selectedId?: string;
}

const ALGORITHMS: Algorithm[] = [
    // Supervised Learning - Regression
    { id: 'linear_regression', name: 'Linear Regression', category: 'Regression', difficulty: 'Beginner', estimatedTime: '45 min' },
    { id: 'polynomial_regression', name: 'Polynomial Regression', category: 'Regression', difficulty: 'Intermediate', estimatedTime: '50 min' },

    // Supervised Learning - Classification
    { id: 'logistic_regression', name: 'Logistic Regression', category: 'Classification', difficulty: 'Beginner', estimatedTime: '50 min' },
    { id: 'knn', name: 'k-Nearest Neighbors', category: 'Classification', difficulty: 'Beginner', estimatedTime: '40 min' },
    { id: 'naive_bayes', name: 'Naïve Bayes', category: 'Classification', difficulty: 'Intermediate', estimatedTime: '45 min' },
    { id: 'decision_tree', name: 'Decision Tree', category: 'Classification', difficulty: 'Intermediate', estimatedTime: '55 min' },
    { id: 'random_forest', name: 'Random Forest', category: 'Classification', difficulty: 'Advanced', estimatedTime: '60 min' },
    { id: 'svm', name: 'Support Vector Machine', category: 'Classification', difficulty: 'Advanced', estimatedTime: '65 min' },

    // Unsupervised Learning - Clustering
    { id: 'kmeans', name: 'k-Means Clustering', category: 'Clustering', difficulty: 'Intermediate', estimatedTime: '50 min' },
    { id: 'hierarchical', name: 'Hierarchical Clustering', category: 'Clustering', difficulty: 'Intermediate', estimatedTime: '55 min' },

    // Unsupervised Learning - Dimensionality Reduction
    { id: 'pca', name: 'Principal Component Analysis', category: 'Dimensionality Reduction', difficulty: 'Advanced', estimatedTime: '60 min' },
];

const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
        case 'Beginner':
            return 'bg-green-100 text-green-800';
        case 'Intermediate':
            return 'bg-yellow-100 text-yellow-800';
        case 'Advanced':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const groupAlgorithmsByCategory = (algorithms: Algorithm[]): Record<string, Algorithm[]> => {
    return algorithms.reduce((acc, algo) => {
        if (!acc[algo.category]) {
            acc[algo.category] = [];
        }
        acc[algo.category].push(algo);
        return acc;
    }, {} as Record<string, Algorithm[]>);
};

export const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({ selectedId }) => {
    const [expandedCategory, setExpandedCategory] = useState<string | null>('Regression');
    const grouped = groupAlgorithmsByCategory(ALGORITHMS);

    return (
        <aside className=\"w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6 h-screen overflow-y-auto shadow-lg\">
    {/* Header */ }
    <div className=\"mb-8\">
        < h1 className =\"text-2xl font-bold mb-2\">ML Algorithms</h1>
            < p className =\"text-sm text-slate-300\">Learn, Visualize, Implement & Interpret</p>
      </div >

    {/* Search Bar (Future Enhancement) */ }
    < div className =\"mb-6\">
        < input
type =\"text\"
placeholder =\"Search algorithms...\"
className =\"w-full px-3 py-2 rounded bg-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500\"
    />
      </div >

    {/* Algorithm Categories */ }
    < nav className =\"space-y-2\">
{
    Object.entries(grouped).map(([category, algorithms]) => (
        <div key={category}>
            {/* Category Header */}
            <button
                onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
                className=\"w-full text-left px-3 py-2 rounded hover:bg-slate-700 transition-colors font-semibold text-sm flex items-center justify-between\"
            >
            <span>{category}</span>
            <span className=\"text-xs bg-slate-600 px-2 py-1 rounded\">{algorithms.length}</span>
            </button >

        {/* Algorithm List */ }
            { expandedCategory === category && (
            <div className=\"ml-2 space-y-1 mt-1\">
                {
            algorithms.map((algo) => (
                <Link
                    key={algo.id}
                    href={`/algorithm/${algo.id}`}
                    className={`block px-3 py-2 rounded text-sm transition-colors ${\ n selectedId === algo.id\n ? 'bg-blue-600 text-white'\n                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'\n                    }`}
                  >
                    <div className=\"flex items-center justify-between\">
                      <span>{algo.name}</span>
                      <span className={`text - xs px - 2 py - 0.5 rounded ${ getDifficultyColor(algo.difficulty)
} `}>\n                        {algo.difficulty[0]}\n                      </span>\n                    </div>\n                    <div className=\"text-xs text-slate-400 mt-1\">{algo.estimatedTime}</div>\n                  </Link>\n                ))}\n              </div>\n            )}\n          </div>\n        ))}\n      </nav>\n\n      {/* Footer */}\n      <div className=\"mt-12 pt-6 border-t border-slate-700 text-xs text-slate-400\">\n        <p>💡 Tip: Start with Beginner algorithms to build foundational understanding.</p>\n      </div>\n    </aside>\n  );\n};

export default AlgorithmSelector;
