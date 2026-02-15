/**
 * Algorithm Card Component
 * 
 * Displays an algorithm card with lock status, progress, and navigation.
 * Demonstrates integration with Learning Path context.
 */

import React from 'react';
import Link from 'next/link';
import { Algorithm, MasteryStatus } from '../types/learning-path';
import { useLearningPath } from '../contexts/LearningPathContext';
import { useAlgorithmNavigation } from '../hooks/useAlgorithmNavigation';

interface AlgorithmCardProps {
    algorithm: Algorithm;
}

/**
 * Algorithm card with lock status and progress
 */
export const AlgorithmCard: React.FC<AlgorithmCardProps> = ({ algorithm }) => {
    const {
        getAlgorithmStatus,
        getAlgorithmProgress,
        isAlgorithmUnlocked
    } = useLearningPath();

    const { getAlgorithmLockStatus } = useAlgorithmNavigation();

    const status = getAlgorithmStatus(algorithm.id);
    const progress = getAlgorithmProgress(algorithm.id);
    const lockStatus = getAlgorithmLockStatus(algorithm.id);

    // Determine card styling based on status
    const getStatusColor = () => {
        if (!lockStatus.unlocked) return 'border-slate-200 bg-slate-50 opacity-60';

        switch (status) {
            case MasteryStatus.Mastered:
                return 'border-emerald-200 bg-emerald-50';
            case MasteryStatus.Completed:
                return 'border-indigo-200 bg-indigo-50';
            case MasteryStatus.InProgress:
                return 'border-blue-200 bg-blue-50';
            default:
                return 'border-slate-200 bg-white hover:border-indigo-300';
        }
    };

    const getStatusBadge = () => {
        if (!lockStatus.unlocked) {
            return (
                <span className="text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full border border-slate-300 bg-slate-100 text-slate-500">
                    🔒 Locked
                </span>
            );
        }

        switch (status) {
            case MasteryStatus.Mastered:
                return (
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full border border-emerald-300 bg-emerald-100 text-emerald-700">
                        ⭐ Mastered
                    </span>
                );
            case MasteryStatus.Completed:
                return (
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full border border-indigo-300 bg-indigo-100 text-indigo-700">
                        ✓ Completed
                    </span>
                );
            case MasteryStatus.InProgress:
                return (
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full border border-blue-300 bg-blue-100 text-blue-700">
                        → In Progress
                    </span>
                );
            default:
                return (
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-600">
                        {algorithm.difficulty}
                    </span>
                );
        }
    };

    const CardContent = () => (
        <div className={`group relative p-8 rounded-[2.5rem] border-2 transition-all duration-300 ${getStatusColor()} ${!lockStatus.unlocked ? 'cursor-not-allowed' : 'cursor-pointer hover:shadow-lg'}`}>
            {/* Lock Overlay */}
            {!lockStatus.unlocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/5 rounded-[2.5rem] backdrop-blur-[1px]">
                    <div className="text-center p-4">
                        <div className="text-4xl mb-2">🔒</div>
                        <p className="text-xs font-bold text-slate-600">
                            {lockStatus.reason}
                        </p>
                    </div>
                </div>
            )}

            {/* Status Badge */}
            <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-black ${!lockStatus.unlocked ? 'bg-slate-200 text-slate-400' :
                        status === MasteryStatus.Mastered ? 'bg-emerald-100 text-emerald-600' :
                            status === MasteryStatus.Completed ? 'bg-indigo-100 text-indigo-600' :
                                status === MasteryStatus.InProgress ? 'bg-blue-100 text-blue-600' :
                                    'bg-slate-100 text-slate-600'
                    }`}>
                    {algorithm.name[0]}
                </div>
                {getStatusBadge()}
            </div>

            {/* Algorithm Info */}
            <h4 className="text-xl font-black text-slate-900 mb-2 leading-tight">
                {algorithm.name}
            </h4>
            <p className="text-[10px] text-slate-500 mb-4 font-bold tracking-wider uppercase">
                {algorithm.category}
            </p>

            {/* Progress Bar */}
            {lockStatus.unlocked && progress > 0 && (
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                            Progress
                        </span>
                        <span className="text-[9px] font-black text-indigo-600">
                            {progress}%
                        </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                        <div
                            className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            )}

            {/* Math Focus */}
            <div className="pt-4 border-t border-slate-200">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block mb-2">
                    Core Concept
                </span>
                <p className="text-sm text-slate-600 font-medium italic">
                    {algorithm.mathFocus}
                </p>
            </div>

            {/* Hover Effect */}
            {lockStatus.unlocked && (
                <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="w-6 h-px bg-indigo-600"></span>
                    {status === MasteryStatus.NotStarted ? 'Start Learning' : 'Continue'}
                </div>
            )}
        </div>
    );

    // Wrap in Link only if unlocked
    if (lockStatus.unlocked) {
        return (
            <Link href={`/algorithm/${algorithm.id}`} className="block">
                <CardContent />
            </Link>
        );
    }

    return <CardContent />;
};

export default AlgorithmCard;
