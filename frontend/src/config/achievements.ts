/**
 * Achievement definitions and configuration
 * 
 * This file defines all achievements, badges, and their unlock conditions
 * for the learning path motivation system.
 */

import { Achievement, AchievementCategory } from '../types/learning-path';

/**
 * All available achievements in the system
 */
export const ACHIEVEMENTS: Record<string, Achievement> = {
    'first_steps': {
        id: 'first_steps',
        title: 'First Steps',
        description: 'Complete your first algorithm',
        icon: '🎯',
        points: 10,
        category: AchievementCategory.Milestone,
        unlockCondition: 'Complete 1 algorithm'
    },
    'beginner_master': {
        id: 'beginner_master',
        title: 'Beginner Master',
        description: 'Complete all Beginner algorithms',
        icon: '🌟',
        points: 50,
        category: AchievementCategory.Mastery,
        unlockCondition: 'Complete all 5 Beginner algorithms'
    },
    'intermediate_expert': {
        id: 'intermediate_expert',
        title: 'Intermediate Expert',
        description: 'Complete all Intermediate algorithms',
        icon: '⚡',
        points: 100,
        category: AchievementCategory.Mastery,
        unlockCondition: 'Complete all 2 Intermediate algorithms'
    },
    'advanced_guru': {
        id: 'advanced_guru',
        title: 'Advanced Guru',
        description: 'Complete all Advanced algorithms',
        icon: '🚀',
        points: 200,
        category: AchievementCategory.Mastery,
        unlockCondition: 'Complete all 4 Advanced algorithms'
    },
    'ml_master': {
        id: 'ml_master',
        title: 'ML Master',
        description: 'Complete all 11 algorithms',
        icon: '👑',
        points: 500,
        category: AchievementCategory.Mastery,
        unlockCondition: 'Complete all 11 algorithms'
    },
    'week_streak': {
        id: 'week_streak',
        title: 'Week Warrior',
        description: 'Learn for 7 consecutive days',
        icon: '🔥',
        points: 30,
        category: AchievementCategory.Streak,
        unlockCondition: 'Maintain 7-day streak'
    },
    'month_streak': {
        id: 'month_streak',
        title: 'Month Marathon',
        description: 'Learn for 30 consecutive days',
        icon: '💪',
        points: 150,
        category: AchievementCategory.Streak,
        unlockCondition: 'Maintain 30-day streak'
    },
    'challenge_champion': {
        id: 'challenge_champion',
        title: 'Challenge Champion',
        description: 'Complete 10 practice challenges',
        icon: '🏆',
        points: 75,
        category: AchievementCategory.Challenge,
        unlockCondition: 'Complete 10 challenges'
    },
    'perfect_score': {
        id: 'perfect_score',
        title: 'Perfect Score',
        description: 'Complete 5 challenges without using hints',
        icon: '💯',
        points: 100,
        category: AchievementCategory.Challenge,
        unlockCondition: 'Complete 5 challenges with no hints'
    },
    'speed_learner': {
        id: 'speed_learner',
        title: 'Speed Learner',
        description: 'Complete an algorithm in under 2 hours',
        icon: '⚡',
        points: 50,
        category: AchievementCategory.Milestone,
        unlockCondition: 'Complete algorithm in < 120 minutes'
    },
    'theory_master': {
        id: 'theory_master',
        title: 'Theory Master',
        description: 'Complete theory sections for all algorithms',
        icon: '📚',
        points: 80,
        category: AchievementCategory.Milestone,
        unlockCondition: 'Complete all theory steps'
    },
    'data_scientist': {
        id: 'data_scientist',
        title: 'Data Scientist',
        description: 'Complete EDA for 5 different algorithms',
        icon: '🔬',
        points: 60,
        category: AchievementCategory.Milestone,
        unlockCondition: 'Complete 5 EDA steps'
    },
    'early_bird': {
        id: 'early_bird',
        title: 'Early Bird',
        description: 'Start learning before 8 AM',
        icon: '🌅',
        points: 20,
        category: AchievementCategory.Milestone,
        unlockCondition: 'Access platform before 8 AM'
    },
    'night_owl': {
        id: 'night_owl',
        title: 'Night Owl',
        description: 'Learn after 10 PM',
        icon: '🦉',
        points: 20,
        category: AchievementCategory.Milestone,
        unlockCondition: 'Access platform after 10 PM'
    },
    'comeback_kid': {
        id: 'comeback_kid',
        title: 'Comeback Kid',
        description: 'Return to learning after a 7-day break',
        icon: '🎪',
        points: 25,
        category: AchievementCategory.Milestone,
        unlockCondition: 'Return after 7+ day absence'
    }
};

/**
 * Get all achievements as array
 */
export function getAllAchievements(): Achievement[] {
    return Object.values(ACHIEVEMENTS);
}

/**
 * Get achievement by ID
 */
export function getAchievementById(id: string): Achievement | undefined {
    return ACHIEVEMENTS[id];
}

/**
 * Get achievements by category
 */
export function getAchievementsByCategory(category: AchievementCategory): Achievement[] {
    return Object.values(ACHIEVEMENTS).filter(a => a.category === category);
}

/**
 * Get total possible achievement points
 */
export function getTotalPossiblePoints(): number {
    return Object.values(ACHIEVEMENTS).reduce((sum, achievement) => sum + achievement.points, 0);
}

/**
 * Calculate achievement completion percentage
 */
export function calculateAchievementCompletion(earnedAchievementIds: string[]): number {
    const totalAchievements = Object.keys(ACHIEVEMENTS).length;
    const earnedCount = earnedAchievementIds.length;
    return Math.round((earnedCount / totalAchievements) * 100);
}
