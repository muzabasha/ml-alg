/**
 * AchievementDisplay Component
 * 
 * Displays achievements with:
 * - Earned badges with icons and titles
 * - Locked badges with unlock requirements
 * - Achievement points total
 * - Achievement modal with details
 * 
 * Requirements: 8.4, 8.5
 */

import React, { useState } from 'react';
import { Achievement } from '../types/learning-path';

export interface AchievementDisplayProps {
    /** Earned achievements */
    earnedAchievements: Achievement[];
    /** Locked achievements */
    lockedAchievements: Achievement[];
    /** Total achievement points */
    totalPoints: number;
    /** Custom className for additional styling */
    className?: string;
}

/**
 * Achievement detail modal
 */
const AchievementModal: React.FC<{
    achievement: Achievement;
    isOpen: boolean;
    onClose: () => void;
}> = ({ achievement, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Icon */}
                <div className="flex justify-center mb-4">
                    <div className={`
                        w-24 h-24 rounded-full flex items-center justify-center text-4xl
                        ${achievement.earned ? 'bg-gradient-to-br from-amber-400 to-amber-600' : 'bg-slate-200'}
                    `}>
                        {achievement.icon}
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-black text-slate-900 text-center mb-2">
                    {achievement.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-center mb-4">
                    {achievement.description}
                </p>

                {/* Points */}
                <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-3xl font-black text-indigo-600">
                        {achievement.points}
                    </span>
                    <span className="text-sm text-slate-600 font-medium">points</span>
                </div>

                {/* Unlock requirement */}
                {!achievement.earned && achievement.unlockRequirement && (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-4">
                        <p className="text-sm text-slate-600 text-center">
                            <span className="font-bold">Unlock requirement:</span><br />
                            {achievement.unlockRequirement}
                        </p>
                    </div>
                )}

                {/* Earned date */}
                {achievement.earned && achievement.earnedDate && (
                    <p className="text-xs text-slate-500 text-center mb-4">
                        Earned on {new Date(achievement.earnedDate).toLocaleDateString()}
                    </p>
                )}

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="w-full bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

/**
 * AchievementDisplay shows earned and locked achievements
 * with an interactive modal for details.
 */
export const AchievementDisplay: React.FC<AchievementDisplayProps> = ({
    earnedAchievements,
    lockedAchievements,
    totalPoints,
    className = ''
}) => {
    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

    const allAchievements = [...earnedAchievements, ...lockedAchievements].sort((a, b) => {
        // Sort earned first, then by points
        if (a.earned && !b.earned) return -1;
        if (!a.earned && b.earned) return 1;
        return b.points - a.points;
    });

    return (
        <div className={className}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-black text-slate-900">
                        Achievements
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                        {earnedAchievements.length} of {allAchievements.length} unlocked
                    </p>
                </div>
                <div className="text-right">
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-indigo-600">
                            {totalPoints}
                        </span>
                        <span className="text-sm text-slate-600 font-medium">pts</span>
                    </div>
                    <p className="text-xs text-slate-500">Total Points</p>
                </div>
            </div>

            {/* Achievement Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {allAchievements.map((achievement) => (
                    <button
                        key={achievement.id}
                        onClick={() => setSelectedAchievement(achievement)}
                        className={`
                            p-4 rounded-2xl border-2 transition-all text-center
                            ${achievement.earned
                                ? 'border-amber-300 bg-gradient-to-br from-amber-50 to-amber-100 hover:shadow-lg hover:-translate-y-1'
                                : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                            }
                        `}
                    >
                        {/* Icon */}
                        <div className={`
                            w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl mb-2
                            ${achievement.earned
                                ? 'bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg'
                                : 'bg-slate-200'
                            }
                        `}>
                            {achievement.earned ? achievement.icon : '🔒'}
                        </div>

                        {/* Title */}
                        <h3 className={`
                            text-xs font-bold mb-1 line-clamp-2
                            ${achievement.earned ? 'text-slate-900' : 'text-slate-500'}
                        `}>
                            {achievement.earned ? achievement.title : '???'}
                        </h3>

                        {/* Points */}
                        <p className={`
                            text-xs font-bold
                            ${achievement.earned ? 'text-amber-600' : 'text-slate-400'}
                        `}>
                            {achievement.points} pts
                        </p>
                    </button>
                ))}
            </div>

            {/* Empty state */}
            {allAchievements.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">🏆</div>
                    <p className="text-slate-600 font-medium">
                        No achievements yet
                    </p>
                    <p className="text-sm text-slate-500 mt-2">
                        Complete algorithms to earn achievements
                    </p>
                </div>
            )}

            {/* Achievement Modal */}
            {selectedAchievement && (
                <AchievementModal
                    achievement={selectedAchievement}
                    isOpen={!!selectedAchievement}
                    onClose={() => setSelectedAchievement(null)}
                />
            )}
        </div>
    );
};

export default AchievementDisplay;
