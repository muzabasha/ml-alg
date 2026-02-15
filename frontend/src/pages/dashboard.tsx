/**
 * Dashboard Page Component
 * 
 * Displays personalized learning dashboard with:
 * - Overall progress circular indicator
 * - "Continue Learning" card with next recommendation
 * - Learning statistics (algorithms completed, streak, time)
 * - Recent activity feed
 * 
 * Requirements: 9.1, 9.3, 9.4, 9.6
 */

import React, { useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { CircularProgress } from '../components/CircularProgress';
import { ProgressBar } from '../components/ProgressBar';
import { MiniProgressIndicator } from '../components/MiniProgressIndicator';
import { useLearningPath } from '../contexts/LearningPathContext';
import { DifficultyLevel, MasteryStatus, ActivityType } from '../types/learning-path';

/**
 * Format time in minutes to human-readable string
 */
const formatTime = (minutes: number): string => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

/**
 * Format date to relative time
 */
const formatRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
};

/**
 * Get activity icon based on type
 */
const getActivityIcon = (type: ActivityType): string => {
    switch (type) {
        case ActivityType.AlgorithmComplete:
            return '✅';
        case ActivityType.StepComplete:
            return '📝';
        case ActivityType.ChallengeComplete:
            return '🏆';
        case ActivityType.AchievementEarned:
            return '🌟';
        default:
            return '📌';
    }
};

/**
 * Dashboard Page Component
 */
const DashboardPage: React.FC = () => {
    const {
        isInitialized,
        getOverallProgress,
        getNextRecommendation,
        getLearningStats,
        getEarnedAchievements,
        getAllAlgorithmsWithStatus,
        getCurrentStreak
    } = useLearningPath();

    // Get dashboard data
    const overallProgress = useMemo(() => getOverallProgress(), [getOverallProgress]);
    const recommendation = useMemo(() => getNextRecommendation(), [getNextRecommendation]);
    const stats = useMemo(() => getLearningStats(), [getLearningStats]);
    const achievements = useMemo(() => getEarnedAchievements(), [getEarnedAchievements]);
    const allAlgorithms = useMemo(() => getAllAlgorithmsWithStatus(), [getAllAlgorithmsWithStatus]);
    const streak = useMemo(() => getCurrentStreak(), [getCurrentStreak]);

    // Group algorithms by difficulty
    const algorithmsByDifficulty = useMemo(() => {
        const grouped = {
            [DifficultyLevel.Beginner]: [] as typeof allAlgorithms,
            [DifficultyLevel.Intermediate]: [] as typeof allAlgorithms,
            [DifficultyLevel.Advanced]: [] as typeof allAlgorithms
        };

        allAlgorithms.forEach(algo => {
            grouped[algo.difficulty].push(algo);
        });

        return grouped;
    }, [allAlgorithms]);

    // Generate recent activity from algorithm progress
    const recentActivity = useMemo(() => {
        const activities: Array<{ type: ActivityType; timestamp: Date; description: string; algorithmId?: string }> = [];

        // Add completed algorithms
        overallProgress.algorithmProgress.forEach((progress, algorithmId) => {
            if (progress.status === MasteryStatus.Completed || progress.status === MasteryStatus.Mastered) {
                const algo = allAlgorithms.find(a => a.id === algorithmId);
                if (algo) {
                    activities.push({
                        type: ActivityType.AlgorithmComplete,
                        timestamp: progress.lastAccessedDate,
                        description: `Completed ${algo.name}`,
                        algorithmId
                    });
                }
            }
        });

        // Add achievements
        achievements.forEach(achievement => {
            if (achievement.earnedDate) {
                activities.push({
                    type: ActivityType.AchievementEarned,
                    timestamp: achievement.earnedDate,
                    description: `Earned "${achievement.title}" badge`
                });
            }
        });

        // Sort by timestamp (most recent first) and take top 5
        return activities
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
            .slice(0, 5);
    }, [overallProgress, achievements, allAlgorithms]);

    // Get recommendation link
    const getRecommendationLink = (): string => {
        if (recommendation.algorithmId) {
            return `/algorithm/${recommendation.algorithmId}`;
        }
        return '/';
    };

    // Get algorithm state for MiniProgressIndicator
    const getAlgorithmState = (status: MasteryStatus, locked: boolean): 'locked' | 'unlocked' | 'in-progress' | 'completed' | 'mastered' => {
        if (locked) return 'locked';
        if (status === MasteryStatus.Mastered) return 'mastered';
        if (status === MasteryStatus.Completed) return 'completed';
        if (status === MasteryStatus.InProgress) return 'in-progress';
        return 'unlocked';
    };

    if (!isInitialized) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                        <p className="text-slate-600">Loading your dashboard...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <Head>
                <title>My Learning Dashboard | Mathematical ML</title>
                <meta name="description" content="Track your ML learning progress, view recommendations, and celebrate achievements" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 py-12">
                <div className="container mx-auto px-8 max-w-7xl">
                    {/* Header Section */}
                    <div className="mb-12">
                        <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">
                            Welcome Back! 👋
                        </h1>
                        <p className="text-slate-600 text-lg">
                            Continue your ML mastery journey
                        </p>
                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        {/* Overall Progress Card */}
                        <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200">
                            <h2 className="text-sm font-black uppercase tracking-wider text-slate-600 mb-6">
                                Overall Progress
                            </h2>
                            <div className="flex justify-center mb-4">
                                <CircularProgress
                                    percentage={overallProgress.percentage}
                                    size={160}
                                    strokeWidth={12}
                                    variant="primary"
                                />
                            </div>
                            <div className="text-center">
                                <p className="text-slate-600 text-sm">
                                    {overallProgress.completedSteps} of {overallProgress.totalSteps} steps completed
                                </p>
                            </div>
                        </div>

                        {/* Continue Learning Card */}
                        <div className="lg:col-span-2 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                            <div className="relative z-10">
                                <h2 className="text-sm font-black uppercase tracking-wider mb-4 opacity-90">
                                    Continue Learning
                                </h2>
                                <h3 className="text-2xl font-black mb-2">
                                    {recommendation.algorithmId
                                        ? allAlgorithms.find(a => a.id === recommendation.algorithmId)?.name || 'Next Algorithm'
                                        : 'Start Your Journey'}
                                </h3>
                                <p className="text-indigo-100 mb-6">
                                    {recommendation.reason}
                                </p>
                                <Link
                                    href={getRecommendationLink()}
                                    className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-indigo-50 transition-all shadow-lg active:scale-95"
                                >
                                    Continue
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-slate-600 text-sm font-medium">Algorithms</span>
                                <span className="text-2xl">🎯</span>
                            </div>
                            <p className="text-3xl font-black text-slate-900">
                                {stats.totalAlgorithmsCompleted}/{allAlgorithms.length}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">Completed</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-slate-600 text-sm font-medium">Challenges</span>
                                <span className="text-2xl">🏆</span>
                            </div>
                            <p className="text-3xl font-black text-slate-900">
                                {stats.totalChallengesCompleted}/{allAlgorithms.length}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">Mastered</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-slate-600 text-sm font-medium">Streak</span>
                                <span className="text-2xl">🔥</span>
                            </div>
                            <p className="text-3xl font-black text-slate-900">
                                {streak} {streak === 1 ? 'day' : 'days'}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">Keep it up!</p>
                        </div>
                    </div>

                    {/* Algorithms by Difficulty */}
                    <div className="space-y-8 mb-8">
                        {/* Beginner Algorithms */}
                        <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-black text-slate-900">
                                    Beginner Algorithms
                                </h2>
                                <span className="text-sm font-bold text-slate-600">
                                    {algorithmsByDifficulty[DifficultyLevel.Beginner].filter(a => a.status === MasteryStatus.Completed || a.status === MasteryStatus.Mastered).length}/{algorithmsByDifficulty[DifficultyLevel.Beginner].length} Complete
                                </span>
                            </div>
                            <div className="space-y-4">
                                {algorithmsByDifficulty[DifficultyLevel.Beginner].map(algo => {
                                    const progress = overallProgress.algorithmProgress.get(algo.id);
                                    const percentage = progress?.completionPercentage || 0;

                                    return (
                                        <Link
                                            key={algo.id}
                                            href={algo.locked ? '#' : `/algorithm/${algo.id}`}
                                            className={`block p-4 rounded-2xl border-2 transition-all ${algo.locked
                                                    ? 'border-slate-200 bg-slate-50 cursor-not-allowed'
                                                    : 'border-slate-200 hover:border-indigo-300 hover:shadow-md'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 flex-1">
                                                    <MiniProgressIndicator
                                                        state={getAlgorithmState(algo.status, algo.locked)}
                                                        percentage={percentage}
                                                    />
                                                    <div className="flex-1">
                                                        <h3 className="font-bold text-slate-900">{algo.name}</h3>
                                                        <p className="text-xs text-slate-500">{algo.category}</p>
                                                    </div>
                                                </div>
                                                <div className="w-32">
                                                    <ProgressBar
                                                        percentage={percentage}
                                                        state={algo.locked ? 'locked' : algo.status === MasteryStatus.Mastered ? 'mastered' : algo.status === MasteryStatus.Completed ? 'completed' : algo.status === MasteryStatus.InProgress ? 'in-progress' : undefined}
                                                        showLabel={false}
                                                        size="sm"
                                                    />
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Intermediate Algorithms */}
                        <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-black text-slate-900">
                                    Intermediate Algorithms
                                </h2>
                                <span className="text-sm font-bold text-slate-600">
                                    {algorithmsByDifficulty[DifficultyLevel.Intermediate].filter(a => a.status === MasteryStatus.Completed || a.status === MasteryStatus.Mastered).length}/{algorithmsByDifficulty[DifficultyLevel.Intermediate].length} Complete
                                </span>
                            </div>
                            <div className="space-y-4">
                                {algorithmsByDifficulty[DifficultyLevel.Intermediate].map(algo => {
                                    const progress = overallProgress.algorithmProgress.get(algo.id);
                                    const percentage = progress?.completionPercentage || 0;

                                    return (
                                        <Link
                                            key={algo.id}
                                            href={algo.locked ? '#' : `/algorithm/${algo.id}`}
                                            className={`block p-4 rounded-2xl border-2 transition-all ${algo.locked
                                                    ? 'border-slate-200 bg-slate-50 cursor-not-allowed'
                                                    : 'border-slate-200 hover:border-indigo-300 hover:shadow-md'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 flex-1">
                                                    <MiniProgressIndicator
                                                        state={getAlgorithmState(algo.status, algo.locked)}
                                                        percentage={percentage}
                                                    />
                                                    <div className="flex-1">
                                                        <h3 className="font-bold text-slate-900">{algo.name}</h3>
                                                        <p className="text-xs text-slate-500">{algo.category}</p>
                                                    </div>
                                                </div>
                                                <div className="w-32">
                                                    <ProgressBar
                                                        percentage={percentage}
                                                        state={algo.locked ? 'locked' : algo.status === MasteryStatus.Mastered ? 'mastered' : algo.status === MasteryStatus.Completed ? 'completed' : algo.status === MasteryStatus.InProgress ? 'in-progress' : undefined}
                                                        showLabel={false}
                                                        size="sm"
                                                    />
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Advanced Algorithms */}
                        <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-black text-slate-900">
                                    Advanced Algorithms
                                </h2>
                                <span className="text-sm font-bold text-slate-600">
                                    {algorithmsByDifficulty[DifficultyLevel.Advanced].filter(a => a.status === MasteryStatus.Completed || a.status === MasteryStatus.Mastered).length}/{algorithmsByDifficulty[DifficultyLevel.Advanced].length} Complete
                                </span>
                            </div>
                            <div className="space-y-4">
                                {algorithmsByDifficulty[DifficultyLevel.Advanced].map(algo => {
                                    const progress = overallProgress.algorithmProgress.get(algo.id);
                                    const percentage = progress?.completionPercentage || 0;

                                    return (
                                        <Link
                                            key={algo.id}
                                            href={algo.locked ? '#' : `/algorithm/${algo.id}`}
                                            className={`block p-4 rounded-2xl border-2 transition-all ${algo.locked
                                                    ? 'border-slate-200 bg-slate-50 cursor-not-allowed'
                                                    : 'border-slate-200 hover:border-indigo-300 hover:shadow-md'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 flex-1">
                                                    <MiniProgressIndicator
                                                        state={getAlgorithmState(algo.status, algo.locked)}
                                                        percentage={percentage}
                                                    />
                                                    <div className="flex-1">
                                                        <h3 className="font-bold text-slate-900">{algo.name}</h3>
                                                        <p className="text-xs text-slate-500">{algo.category}</p>
                                                    </div>
                                                </div>
                                                <div className="w-32">
                                                    <ProgressBar
                                                        percentage={percentage}
                                                        state={algo.locked ? 'locked' : algo.status === MasteryStatus.Mastered ? 'mastered' : algo.status === MasteryStatus.Completed ? 'completed' : algo.status === MasteryStatus.InProgress ? 'in-progress' : undefined}
                                                        showLabel={false}
                                                        size="sm"
                                                    />
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    {recentActivity.length > 0 && (
                        <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200">
                            <h2 className="text-lg font-black text-slate-900 mb-6">
                                Recent Activity
                            </h2>
                            <div className="space-y-4">
                                {recentActivity.map((activity, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100"
                                    >
                                        <span className="text-2xl">{getActivityIcon(activity.type)}</span>
                                        <div className="flex-1">
                                            <p className="font-medium text-slate-900">{activity.description}</p>
                                            <p className="text-xs text-slate-500">{formatRelativeTime(activity.timestamp)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default DashboardPage;
