/**
 * AlgorithmProgressGrid Component
 * 
 * Displays algorithms grouped by difficulty level with:
 * - Progress bars for each algorithm
 * - Visual state indicators (locked, in-progress, completed, mastered)
 * - Navigation to algorithm pages
 * 
 * Requirements: 9.2, 9.5, 11.1, 11.4
 */

import React from 'react';
import Link from 'next/link';
import { Algorithm, MasteryStatus, DifficultyLevel } from '../types/learning-path';
import { ProgressBar } from './ProgressBar';
import { MiniProgressIndicator } from './MiniProgressIndicator';

export interface AlgorithmProgressGridProps {
    /** Algorithms to display */
    algorithms: Array<Algorithm & { locked: boolean; status: MasteryStatus; progress: number }>;
    /** Difficulty level to display */
    difficultyLevel?: DifficultyLevel;
    /** Custom className for additional styling */
    className?: string;
}

/**
 * Get algorithm state for MiniProgressIndicator
 */
const getAlgorithmState = (
    status: MasteryStatus,
    locked: boolean
): 'locked' | 'unlocked' | 'in-progress' | 'completed' | 'mastered' => {
    if (locked) return 'locked';
    if (status === MasteryStatus.Mastered) return 'mastered';
    if (status === MasteryStatus.Completed) return 'completed';
    if (status === MasteryStatus.InProgress) return 'in-progress';
    return 'unlocked';
};

/**
 * Get progress bar state
 */
const getProgressBarState = (
    status: MasteryStatus,
    locked: boolean
): 'locked' | 'in-progress' | 'completed' | 'mastered' | undefined => {
    if (locked) return 'locked';
    if (status === MasteryStatus.Mastered) return 'mastered';
    if (status === MasteryStatus.Completed) return 'completed';
    if (status === MasteryStatus.InProgress) return 'in-progress';
    return undefined;
};

/**
 * AlgorithmProgressGrid displays a grid of algorithm cards
 * with progress indicators and state visualization.
 */
export const AlgorithmProgressGrid: React.FC<AlgorithmProgressGridProps> = ({
    algorithms,
    difficultyLevel,
    className = ''
}) => {
    // Filter by difficulty if specified
    const filteredAlgorithms = difficultyLevel
        ? algorithms.filter(algo => algo.difficulty === difficultyLevel)
        : algorithms;

    // Group by difficulty if no specific level provided
    const groupedAlgorithms = difficultyLevel
        ? { [difficultyLevel]: filteredAlgorithms }
        : filteredAlgorithms.reduce((acc, algo) => {
            if (!acc[algo.difficulty]) {
                acc[algo.difficulty] = [];
            }
            acc[algo.difficulty].push(algo);
            return acc;
        }, {} as Record<DifficultyLevel, typeof filteredAlgorithms>);

    const difficultyOrder = [DifficultyLevel.Beginner, DifficultyLevel.Intermediate, DifficultyLevel.Advanced];

    return (
        <div className={`space-y-8 ${className}`}>
            {difficultyOrder.map(level => {
                const levelAlgorithms = groupedAlgorithms[level];
                if (!levelAlgorithms || levelAlgorithms.length === 0) return null;

                const completedCount = levelAlgorithms.filter(
                    a => a.status === MasteryStatus.Completed || a.status === MasteryStatus.Mastered
                ).length;

                return (
                    <div key={level} className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-slate-200">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl md:text-2xl font-black text-slate-900">
                                    {level} Algorithms
                                </h2>
                                <p className="text-sm text-slate-600 mt-1">
                                    {completedCount} of {levelAlgorithms.length} completed
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl md:text-4xl font-black text-indigo-600">
                                    {Math.round((completedCount / levelAlgorithms.length) * 100)}%
                                </div>
                                <p className="text-xs text-slate-500">Complete</p>
                            </div>
                        </div>

                        {/* Algorithm Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {levelAlgorithms.map(algo => (
                                <Link
                                    key={algo.id}
                                    href={algo.locked ? '#' : `/algorithm/${algo.id}`}
                                    className={`
                                        block p-5 rounded-2xl border-2 transition-all
                                        ${algo.locked
                                            ? 'border-slate-200 bg-slate-50 cursor-not-allowed opacity-75'
                                            : 'border-slate-200 hover:border-indigo-300 hover:shadow-lg hover:-translate-y-1'
                                        }
                                    `}
                                    onClick={(e) => algo.locked && e.preventDefault()}
                                >
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-slate-900 mb-1 line-clamp-2">
                                                {algo.name}
                                            </h3>
                                            <p className="text-xs text-slate-500">
                                                {algo.category}
                                            </p>
                                        </div>
                                        <MiniProgressIndicator
                                            state={getAlgorithmState(algo.status, algo.locked)}
                                            percentage={algo.progress}
                                        />
                                    </div>

                                    {/* Progress Bar */}
                                    <ProgressBar
                                        percentage={algo.progress}
                                        state={getProgressBarState(algo.status, algo.locked)}
                                        showLabel={false}
                                        size="sm"
                                    />

                                    {/* Footer */}
                                    <div className="mt-3 flex items-center justify-between text-xs">
                                        <span className={`
                                            font-medium
                                            ${algo.locked ? 'text-slate-500' : 'text-slate-600'}
                                        `}>
                                            {algo.locked ? '🔒 Locked' : `${algo.progress}% Complete`}
                                        </span>
                                        {!algo.locked && (
                                            <span className="text-indigo-600 font-bold">
                                                View →
                                            </span>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default AlgorithmProgressGrid;
