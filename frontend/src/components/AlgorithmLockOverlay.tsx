/**
 * AlgorithmLockOverlay Component
 * 
 * Overlay displayed on locked algorithms showing:
 * - Lock icon and messaging
 * - List of missing prerequisites with links
 * - Visual indication that algorithm is not accessible
 * 
 * Requirements: 1.3, 4.2
 */

import React from 'react';
import Link from 'next/link';
import { Algorithm } from '../types/learning-path';

export interface AlgorithmLockOverlayProps {
    /** Whether the algorithm is locked */
    isLocked: boolean;
    /** List of missing prerequisite algorithm IDs */
    missingPrerequisites?: string[];
    /** All algorithms (to look up names) */
    allAlgorithms?: Algorithm[];
    /** Custom className for additional styling */
    className?: string;
}

/**
 * AlgorithmLockOverlay displays a lock overlay on algorithm pages
 * when prerequisites are not met.
 */
export const AlgorithmLockOverlay: React.FC<AlgorithmLockOverlayProps> = ({
    isLocked,
    missingPrerequisites = [],
    allAlgorithms = [],
    className = ''
}) => {
    if (!isLocked) return null;

    // Get prerequisite algorithm details
    const prerequisiteAlgorithms = missingPrerequisites
        .map(id => allAlgorithms.find(algo => algo.id === id))
        .filter((algo): algo is Algorithm => algo !== undefined);

    return (
        <div
            className={`absolute inset-0 z-40 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm ${className}`}
            role="alert"
            aria-live="polite"
        >
            <div className="max-w-md mx-4 bg-white rounded-3xl shadow-2xl p-8 text-center">
                {/* Lock Icon */}
                <div className="mb-6 flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
                        <svg
                            className="w-10 h-10 text-slate-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-black text-slate-900 mb-3">
                    Algorithm Locked 🔒
                </h2>

                {/* Message */}
                <p className="text-slate-600 mb-6">
                    {prerequisiteAlgorithms.length > 0
                        ? 'Complete the following prerequisites to unlock this algorithm:'
                        : 'This algorithm is currently locked. Complete prerequisite algorithms to unlock it.'}
                </p>

                {/* Prerequisites List */}
                {prerequisiteAlgorithms.length > 0 && (
                    <div className="mb-6">
                        <div className="space-y-3">
                            {prerequisiteAlgorithms.map(algo => (
                                <Link
                                    key={algo.id}
                                    href={`/algorithm/${algo.id}`}
                                    className="block p-4 rounded-2xl border-2 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all text-left group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-100 transition-colors">
                                            <svg
                                                className="w-4 h-4 text-slate-600 group-hover:text-indigo-600"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                                {algo.name}
                                            </h3>
                                            <p className="text-xs text-slate-500">
                                                {algo.category}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Action Button */}
                <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                    Go to Dashboard
                </Link>

                {/* Helper Text */}
                <p className="text-xs text-slate-500 mt-4">
                    Complete prerequisites in order to unlock this content
                </p>
            </div>
        </div>
    );
};

export default AlgorithmLockOverlay;
