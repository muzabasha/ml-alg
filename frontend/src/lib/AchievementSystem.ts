/**
 * Achievement System - Manages badges, milestones, and rewards
 * 
 * This class handles achievement tracking, badge awarding, certificate
 * generation, and learning statistics for the motivation system.
 */

import {
    Achievement,
    AchievementRecord,
    Certificate,
    CertificateType,
    LearningStats,
    MasteryStatus,
    DifficultyLevel
} from '../types/learning-path';
import {
    ACHIEVEMENTS,
    getAllAchievements,
    getAchievementById
} from '../config/achievements';
import {
    ALGORITHMS,
    getAlgorithmsByDifficulty
} from '../config/algorithms';
import { ProgressTracker } from './ProgressTracker';

/**
 * AchievementSystem class for managing achievements and rewards
 */
export class AchievementSystem {
    private progressTracker: ProgressTracker;
    private earnedAchievements: Map<string, AchievementRecord>;
    private certificates: Certificate[];

    constructor(progressTracker: ProgressTracker) {
        this.progressTracker = progressTracker;
        this.earnedAchievements = new Map();
        this.certificates = [];
        this.loadFromProgress();
    }

    /**
     * Load achievements from progress tracker
     */
    private loadFromProgress(): void {
        const progress = this.progressTracker.getAllProgress();

        Object.entries(progress.achievements).forEach(([id, record]) => {
            this.earnedAchievements.set(id, record);
        });

        this.certificates = progress.certificates || [];
    }

    /**
     * Get earned achievements
     */
    getEarnedAchievements(): Achievement[] {
        const earned: Achievement[] = [];

        this.earnedAchievements.forEach((record, id) => {
            const achievement = getAchievementById(id);
            if (achievement) {
                earned.push({
                    ...achievement,
                    earnedDate: record.earnedDate
                });
            }
        });

        return earned.sort((a, b) => {
            const dateA = a.earnedDate?.getTime() || 0;
            const dateB = b.earnedDate?.getTime() || 0;
            return dateB - dateA; // Most recent first
        });
    }

    /**
     * Get locked achievements
     */
    getLockedAchievements(): Achievement[] {
        const allAchievements = getAllAchievements();
        return allAchievements.filter(achievement =>
            !this.earnedAchievements.has(achievement.id)
        );
    }

    /**
     * Get achievement progress (0-100)
     */
    getAchievementProgress(achievementId: string): number {
        const achievement = getAchievementById(achievementId);
        if (!achievement) return 0;

        // If already earned, return 100
        if (this.earnedAchievements.has(achievementId)) {
            return 100;
        }

        // Calculate progress based on achievement type
        switch (achievementId) {
            case 'first_steps':
                return this.getFirstStepsProgress();
            case 'beginner_master':
                return this.getBeginnerMasterProgress();
            case 'intermediate_expert':
                return this.getIntermediateExpertProgress();
            case 'advanced_guru':
                return this.getAdvancedGuruProgress();
            case 'ml_master':
                return this.getMLMasterProgress();
            case 'week_streak':
                return this.getWeekStreakProgress();
            case 'month_streak':
                return this.getMonthStreakProgress();
            case 'challenge_champion':
                return this.getChallengeChampionProgress();
            case 'perfect_score':
                return this.getPerfectScoreProgress();
            default:
                return 0;
        }
    }

    /**
     * Check for new achievements
     * Property 28: Level Completion Badge Award
     * Property 30: Achievement Notification on Earn
     */
    checkForNewAchievements(): Achievement[] {
        const newAchievements: Achievement[] = [];

        // Check each achievement
        getAllAchievements().forEach(achievement => {
            if (this.earnedAchievements.has(achievement.id)) {
                return; // Already earned
            }

            if (this.checkAchievementCondition(achievement.id)) {
                this.awardAchievement(achievement.id);
                newAchievements.push(achievement);
            }
        });

        return newAchievements;
    }

    /**
     * Award an achievement
     */
    awardAchievement(achievementId: string): void {
        if (this.earnedAchievements.has(achievementId)) {
            return; // Already earned
        }

        const achievement = getAchievementById(achievementId);
        if (!achievement) return;

        const record: AchievementRecord = {
            earnedDate: new Date(),
            points: achievement.points
        };

        this.earnedAchievements.set(achievementId, record);

        // Update progress tracker
        const progress = this.progressTracker.getAllProgress();
        progress.achievements[achievementId] = record;
    }

    /**
     * Get total achievement points
     * Property 29: Achievement Points Accumulation
     */
    getTotalPoints(): number {
        let total = 0;
        this.earnedAchievements.forEach(record => {
            total += record.points;
        });
        return total;
    }

    /**
     * Get current streak
     */
    getCurrentStreak(): number {
        return this.progressTracker.getCurrentStreak();
    }

    /**
     * Get learning statistics
     */
    getLearningStats(): LearningStats {
        const progress = this.progressTracker.getAllProgress();
        const overallProgress = this.progressTracker.getOverallProgress();

        // Count completed algorithms
        const completedAlgorithms = Array.from(overallProgress.algorithmProgress.values())
            .filter(p => p.status === MasteryStatus.Completed || p.status === MasteryStatus.Mastered);

        // Count completed challenges
        const completedChallenges = completedAlgorithms.filter(p => p.challengeCompleted).length;

        // Calculate average completion time
        let totalTime = 0;
        let algorithmCount = 0;
        completedAlgorithms.forEach(algoProgress => {
            if (algoProgress.timeSpent > 0) {
                totalTime += algoProgress.timeSpent;
                algorithmCount++;
            }
        });
        const averageCompletionTime = algorithmCount > 0 ? totalTime / algorithmCount : 0;

        // Calculate longest streak
        const longestStreak = this.calculateLongestStreak();

        return {
            totalAlgorithmsCompleted: completedAlgorithms.length,
            totalStepsCompleted: overallProgress.completedSteps,
            totalChallengesCompleted: completedChallenges,
            currentStreak: this.getCurrentStreak(),
            longestStreak,
            totalTimeSpent: progress.totalTimeSpent,
            averageCompletionTime: Math.round(averageCompletionTime)
        };
    }

    /**
     * Generate certificate
     * Property 53: Certificate Generation on Level Completion
     */
    generateCertificate(type: CertificateType, studentName: string = 'Student'): Certificate {
        const certificateNumber = this.generateCertificateNumber();
        const certificate: Certificate = {
            id: `cert_${Date.now()}`,
            type,
            studentName,
            issueDate: new Date(),
            certificateNumber,
            downloadUrl: `/api/certificates/${certificateNumber}/download`,
            shareUrl: `/certificates/${certificateNumber}`
        };

        this.certificates.push(certificate);

        // Update progress tracker
        const progress = this.progressTracker.getAllProgress();
        progress.certificates.push(certificate);

        return certificate;
    }

    /**
     * Get all certificates
     */
    getCertificates(): Certificate[] {
        return [...this.certificates].sort((a, b) =>
            b.issueDate.getTime() - a.issueDate.getTime()
        );
    }

    /**
     * Check if eligible for certificate
     */
    isEligibleForCertificate(type: CertificateType): boolean {
        switch (type) {
            case CertificateType.BeginnerComplete:
                return this.isBeginnerLevelComplete();
            case CertificateType.IntermediateComplete:
                return this.isIntermediateLevelComplete();
            case CertificateType.AdvancedComplete:
                return this.isAdvancedLevelComplete();
            case CertificateType.MasterComplete:
                return this.isAllLevelsComplete();
            default:
                return false;
        }
    }

    /**
     * Private helper methods
     */

    private checkAchievementCondition(achievementId: string): boolean {
        switch (achievementId) {
            case 'first_steps':
                return this.checkFirstSteps();
            case 'beginner_master':
                return this.checkBeginnerMaster();
            case 'intermediate_expert':
                return this.checkIntermediateExpert();
            case 'advanced_guru':
                return this.checkAdvancedGuru();
            case 'ml_master':
                return this.checkMLMaster();
            case 'week_streak':
                return this.checkWeekStreak();
            case 'month_streak':
                return this.checkMonthStreak();
            case 'challenge_champion':
                return this.checkChallengeChampion();
            case 'perfect_score':
                return this.checkPerfectScore();
            case 'speed_learner':
                return this.checkSpeedLearner();
            case 'theory_master':
                return this.checkTheoryMaster();
            case 'data_scientist':
                return this.checkDataScientist();
            case 'early_bird':
                return this.checkEarlyBird();
            case 'night_owl':
                return this.checkNightOwl();
            case 'comeback_kid':
                return this.checkComebackKid();
            default:
                return false;
        }
    }

    private checkFirstSteps(): boolean {
        return this.progressTracker.getTotalCompletedAlgorithms() >= 1;
    }

    private checkBeginnerMaster(): boolean {
        return this.isBeginnerLevelComplete();
    }

    private checkIntermediateExpert(): boolean {
        return this.isIntermediateLevelComplete();
    }

    private checkAdvancedGuru(): boolean {
        return this.isAdvancedLevelComplete();
    }

    private checkMLMaster(): boolean {
        return this.isAllLevelsComplete();
    }

    private checkWeekStreak(): boolean {
        return this.getCurrentStreak() >= 7;
    }

    private checkMonthStreak(): boolean {
        return this.getCurrentStreak() >= 30;
    }

    private checkChallengeChampion(): boolean {
        const stats = this.getLearningStats();
        return stats.totalChallengesCompleted >= 10;
    }

    private checkPerfectScore(): boolean {
        const progress = this.progressTracker.getAllProgress();
        let perfectCount = 0;

        Object.values(progress.algorithmProgress).forEach(algoProgress => {
            if (algoProgress.challengeAttempts.length > 0) {
                const firstAttempt = algoProgress.challengeAttempts[0];
                if (firstAttempt.correct && firstAttempt.hintsUsed === 0) {
                    perfectCount++;
                }
            }
        });

        return perfectCount >= 5;
    }

    private checkSpeedLearner(): boolean {
        const progress = this.progressTracker.getAllProgress();

        for (const algoProgress of Object.values(progress.algorithmProgress)) {
            if (algoProgress.status === MasteryStatus.Completed ||
                algoProgress.status === MasteryStatus.Mastered) {
                if (algoProgress.timeSpent < 120) { // Less than 2 hours
                    return true;
                }
            }
        }

        return false;
    }

    private checkTheoryMaster(): boolean {
        const allAlgorithms = Object.keys(ALGORITHMS);
        return allAlgorithms.every(algorithmId => {
            return this.progressTracker.isStepComplete(algorithmId, 'theory' as any);
        });
    }

    private checkDataScientist(): boolean {
        const allAlgorithms = Object.keys(ALGORITHMS);
        let edaCount = 0;

        allAlgorithms.forEach(algorithmId => {
            if (this.progressTracker.isStepComplete(algorithmId, 'eda' as any)) {
                edaCount++;
            }
        });

        return edaCount >= 5;
    }

    private checkEarlyBird(): boolean {
        const now = new Date();
        return now.getHours() < 8;
    }

    private checkNightOwl(): boolean {
        const now = new Date();
        return now.getHours() >= 22;
    }

    private checkComebackKid(): boolean {
        const progress = this.progressTracker.getAllProgress();
        const lastAccess = progress.lastAccessDate;
        const daysSinceLastAccess = Math.floor(
            (Date.now() - lastAccess.getTime()) / (1000 * 60 * 60 * 24)
        );
        return daysSinceLastAccess >= 7;
    }

    private isBeginnerLevelComplete(): boolean {
        const beginnerAlgorithms = getAlgorithmsByDifficulty(DifficultyLevel.Beginner);
        return beginnerAlgorithms.every(algo => {
            const status = this.progressTracker.getAlgorithmStatus(algo.id);
            return status === MasteryStatus.Completed || status === MasteryStatus.Mastered;
        });
    }

    private isIntermediateLevelComplete(): boolean {
        const intermediateAlgorithms = getAlgorithmsByDifficulty(DifficultyLevel.Intermediate);
        return intermediateAlgorithms.every(algo => {
            const status = this.progressTracker.getAlgorithmStatus(algo.id);
            return status === MasteryStatus.Completed || status === MasteryStatus.Mastered;
        });
    }

    private isAdvancedLevelComplete(): boolean {
        const advancedAlgorithms = getAlgorithmsByDifficulty(DifficultyLevel.Advanced);
        return advancedAlgorithms.every(algo => {
            const status = this.progressTracker.getAlgorithmStatus(algo.id);
            return status === MasteryStatus.Completed || status === MasteryStatus.Mastered;
        });
    }

    private isAllLevelsComplete(): boolean {
        return this.isBeginnerLevelComplete() &&
            this.isIntermediateLevelComplete() &&
            this.isAdvancedLevelComplete();
    }

    private calculateLongestStreak(): number {
        const progress = this.progressTracker.getAllProgress();
        const dates = Object.keys(progress.dailyActivity).sort();

        if (dates.length === 0) return 0;

        let longestStreak = 1;
        let currentStreak = 1;

        for (let i = 1; i < dates.length; i++) {
            const prevDate = new Date(dates[i - 1]);
            const currDate = new Date(dates[i]);

            const dayDiff = Math.floor(
                (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
            );

            if (dayDiff === 1) {
                currentStreak++;
                longestStreak = Math.max(longestStreak, currentStreak);
            } else {
                currentStreak = 1;
            }
        }

        return longestStreak;
    }

    private generateCertificateNumber(): string {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 10000);
        return `ML-${timestamp}-${random}`;
    }

    // Progress calculation methods for each achievement

    private getFirstStepsProgress(): number {
        const completed = this.progressTracker.getTotalCompletedAlgorithms();
        return Math.min(100, completed * 100);
    }

    private getBeginnerMasterProgress(): number {
        const beginnerAlgorithms = getAlgorithmsByDifficulty(DifficultyLevel.Beginner);
        const completed = beginnerAlgorithms.filter(algo => {
            const status = this.progressTracker.getAlgorithmStatus(algo.id);
            return status === MasteryStatus.Completed || status === MasteryStatus.Mastered;
        }).length;
        return Math.round((completed / beginnerAlgorithms.length) * 100);
    }

    private getIntermediateExpertProgress(): number {
        const intermediateAlgorithms = getAlgorithmsByDifficulty(DifficultyLevel.Intermediate);
        const completed = intermediateAlgorithms.filter(algo => {
            const status = this.progressTracker.getAlgorithmStatus(algo.id);
            return status === MasteryStatus.Completed || status === MasteryStatus.Mastered;
        }).length;
        return Math.round((completed / intermediateAlgorithms.length) * 100);
    }

    private getAdvancedGuruProgress(): number {
        const advancedAlgorithms = getAlgorithmsByDifficulty(DifficultyLevel.Advanced);
        const completed = advancedAlgorithms.filter(algo => {
            const status = this.progressTracker.getAlgorithmStatus(algo.id);
            return status === MasteryStatus.Completed || status === MasteryStatus.Mastered;
        }).length;
        return Math.round((completed / advancedAlgorithms.length) * 100);
    }

    private getMLMasterProgress(): number {
        const totalCompleted = this.progressTracker.getTotalCompletedAlgorithms();
        return Math.round((totalCompleted / 11) * 100);
    }

    private getWeekStreakProgress(): number {
        const streak = this.getCurrentStreak();
        return Math.min(100, Math.round((streak / 7) * 100));
    }

    private getMonthStreakProgress(): number {
        const streak = this.getCurrentStreak();
        return Math.min(100, Math.round((streak / 30) * 100));
    }

    private getChallengeChampionProgress(): number {
        const stats = this.getLearningStats();
        return Math.min(100, Math.round((stats.totalChallengesCompleted / 10) * 100));
    }

    private getPerfectScoreProgress(): number {
        const progress = this.progressTracker.getAllProgress();
        let perfectCount = 0;

        Object.values(progress.algorithmProgress).forEach(algoProgress => {
            if (algoProgress.challengeAttempts.length > 0) {
                const firstAttempt = algoProgress.challengeAttempts[0];
                if (firstAttempt.correct && firstAttempt.hintsUsed === 0) {
                    perfectCount++;
                }
            }
        });

        return Math.min(100, Math.round((perfectCount / 5) * 100));
    }
}
