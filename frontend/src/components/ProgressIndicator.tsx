/**
 * Progress Indicator Component
 * 
 * Example component demonstrating how to use the Learning Path context
 * to display student progress.
 */

import React from 'react';
import { useLearningPath } from '../contexts/LearningPathContext';

/**
 * Simple progress indicator showing overall completion
 */
export const ProgressIndicator: React.FC = () => {
    const {
        getOverallProgress,
        getCurrentStreak,
        getTotalPoints,
        isInitialized
    } = useLearningPath();

    if (!isInitialized) {
        return (
            <div className="animate-pulse bg-slate-100 rounded-lg p-4">
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-slate-200 rounded w-1/2"></div>
            </div>
        );
    }

    const progress = getOverallProgress();
    const streak = getCurrentStreak();
    const points = getTotalPoints();

    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Your Progress</h3>

            {/* Overall Progress */}
            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-600">Overall Completion</span>
                    <span className="text-sm font-bold text-indigo-600">
                        {progress.percentage.toFixed(1)}%
                    </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progress.percentage}%` }}
                    ></div>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                    {progress.completedSteps} of {progress.totalSteps} steps completed
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-3">
                    <div className="text-2xl font-black text-slate-900">{streak}</div>
                    <div className="text-xs text-slate-600 uppercase tracking-wider">Day Streak</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                    <div className="text-2xl font-black text-indigo-600">{points}</div>
                    <div className="text-xs text-slate-600 uppercase tracking-wider">Points</div>
                </div>
            </div>
        </div>
    );
};

export default ProgressIndicator;
