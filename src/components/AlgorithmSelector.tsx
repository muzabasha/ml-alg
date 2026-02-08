import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, ChevronRight, BookOpen, Brain, LineChart, Cpu, Calculator } from 'lucide-react';

interface Algorithm {
    id: string;
    name: string;
    category: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    estimatedTime: string;
}

interface AlgorithmSelectorProps {
    selectedId?: string | string[];
}

const ALGORITHMS: Algorithm[] = [
    { id: 'linear_regression', name: 'Linear Regression', category: 'Regression', difficulty: 'Beginner', estimatedTime: '45 min' },
    { id: 'logistic_regression', name: 'Logistic Regression', category: 'Classification', difficulty: 'Beginner', estimatedTime: '50 min' },
    { id: 'knn', name: 'k-Nearest Neighbors', category: 'Classification', difficulty: 'Beginner', estimatedTime: '40 min' },
    { id: 'naive_bayes', name: 'Naïve Bayes', category: 'Classification', difficulty: 'Intermediate', estimatedTime: '45 min' },
    { id: 'decision_tree', name: 'Decision Tree', category: 'Classification', difficulty: 'Intermediate', estimatedTime: '55 min' },
    { id: 'random_forest', name: 'Random Forest', category: 'Classification', difficulty: 'Advanced', estimatedTime: '60 min' },
    { id: 'svm', name: 'Support Vector Machine', category: 'Classification', difficulty: 'Advanced', estimatedTime: '65 min' },
    { id: 'kmeans', name: 'k-Means Clustering', category: 'Clustering', difficulty: 'Intermediate', estimatedTime: '50 min' },
    { id: 'hierarchical', name: 'Hierarchical Clustering', category: 'Clustering', difficulty: 'Intermediate', estimatedTime: '55 min' },
    { id: 'pca', name: 'Principal Component Analysis', category: 'Dimensionality Reduction', difficulty: 'Advanced', estimatedTime: '60 min' },
];

const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
        case 'Beginner': return 'bg-green-100 text-green-800';
        case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
        case 'Advanced': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const groupAlgorithmsByCategory = (algorithms: Algorithm[]) => {
    return algorithms.reduce((acc, algo) => {
        if (!acc[algo.category]) acc[algo.category] = [];
        acc[algo.category].push(algo);
        return acc;
    }, {} as Record<string, Algorithm[]>);
};

export const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({ selectedId }) => {
    const [expandedCategory, setExpandedCategory] = useState<string | null>('Regression');
    const [searchTerm, setSearchTerm] = useState('');
    const grouped = groupAlgorithmsByCategory(
        ALGORITHMS.filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <aside className="w-64 bg-slate-900 text-white h-screen overflow-y-auto flex flex-col border-r border-slate-800">
            <div className="p-6 border-b border-slate-800">
                <Link href="/" className="flex items-center space-x-2 group">
                    <Brain className="h-8 w-8 text-blue-500 group-hover:scale-110 transition-transform" />
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        ML Platform
                    </h1>
                </Link>
            </div>

            <div className="p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-slate-800 border-none rounded-lg text-sm text-slate-200 focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                </div>
            </div>

            <nav className="flex-1 px-2 space-y-1 pb-4">
                {Object.entries(grouped).map(([category, algos]) => (
                    <div key={category} className="space-y-1">
                        <button
                            onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
                            className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors group"
                        >
                            <div className="flex items-center">
                                {expandedCategory === category ? (
                                    <ChevronDown className="h-4 w-4 mr-2" />
                                ) : (
                                    <ChevronRight className="h-4 w-4 mr-2" />
                                )}
                                <span>{category}</span>
                            </div>
                            <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full group-hover:bg-slate-700 transition-colors">
                                {algos.length}
                            </span>
                        </button>

                        {expandedCategory === category && (
                            <div className="ml-4 space-y-1">
                                {algos.map((algo) => (
                                    <Link
                                        key={algo.id}
                                        href={`/algorithm/${algo.id}`}
                                        className={`flex flex-col px-3 py-2 rounded-lg text-sm transition-all ${selectedId === algo.id
                                                ? 'bg-blue-600 text-white ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-900 shadow-lg'
                                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">{algo.name}</span>
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${getDifficultyColor(algo.difficulty)}`}>
                                                {algo.difficulty[0]}
                                            </span>
                                        </div>
                                        <span className="text-[11px] opacity-60 mt-0.5">{algo.estimatedTime}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <Link
                    href="/instructor"
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-800 transition-colors group"
                >
                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs">
                        SMB
                    </div>
                    <div className="flex-1">
                        <p className="text-xs font-semibold text-white group-hover:text-blue-400 transition-colors">Dr. Syed Muzamil Basha</p>
                        <p className="text-[10px] text-slate-500">Instructor</p>
                    </div>
                </Link>
            </div>
        </aside>
    );
};

export default AlgorithmSelector;
