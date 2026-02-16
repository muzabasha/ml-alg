/**
 * Recommendation Engine - Suggests next learning steps
 * 
 * This class provides personalized recommendations based on student progress,
 * performance, and learning patterns. It implements adaptive difficulty
 * and intelligent next-step suggestions.
 */

import {
    Recommendation,
    RecommendationType,
    RecommendationPriority,
    Algorithm,
    MasteryStatus,
    DifficultyLevel,
    ChallengeAttempt
} from '../types/learning-path';
import {
    ALGORITHMS,
    getAlgorithmById,
    getAlgorithmsByDifficulty
} from '../config/algorithms';
import { ProgressTracker } from './ProgressTracker';
import { PrerequisiteEngine } from './PrerequisiteEngine';

/**
 * Performance thresholds for adaptive recommendations
 */
const PERFORMANCE_THRESHOLDS = {
    HIGH_PERFORMANCE_TIME: 0.7, // Complete in < 70% of estimated time
    LOW_PERFORMANCE_TIME: 1.5,  // Complete in > 150% of estimated time
    HIGH_ACCURACY_RATE: 0.9,    // 90% challenge success rate
    LOW_ACCURACY_RATE: 0.5      // 50% challenge success rate
};

/**
 * RecommendationEngine class for generating learning recommendations
 */
export class RecommendationEngine {
    private progressTracker: ProgressTracker;
    private prerequisiteEngine: PrerequisiteEngine;

    constructor(progressTracker: ProgressTracker, prerequisiteEngine: PrerequisiteEngine) {
        this.progressTracker = progressTracker;
        this.prerequisiteEngine = prerequisiteEngine;
    }

    /**
     * Get next recommendation for the student
     * Property 16: Recommendation Validity
     * Property 17: Recommendation Prioritization
     * Property 18: Post-Completion Recommendation
     */
    getNextRecommendation(): Recommendation {
        // Priority 1: Continue in-progress algorithm
        const inProgressRec = this.getInProgressRecommendation();
        if (inProgressRec) return inProgressRec;

        // Priority 2: Complete remaining algorithms in current difficulty level
        const currentLevelRec = this.getCurrentLevelRecommendation();
        if (currentLevelRec) return currentLevelRec;

        // Priority 3: Attempt practice challenge for completed algorithms
        const challengeRec = this.getChallengeRecommendation();
        if (challengeRec) return challengeRec;

        // Priority 4: Unlock next difficulty level
        const nextLevelRec = this.getNextLevelRecommendation();
        if (nextLevelRec) return nextLevelRec;

        // Priority 5: Review algorithms with low performance
        const reviewRec = this.getReviewRecommendation();
        if (reviewRec) return reviewRec;

        // Default: Start with first beginner algorithm
        return this.getDefaultRecommendation();
    }

    /**
     * Get recommendation reason
     * Property 19: Recommendation Reasoning Completeness
     */
    getRecommendationReason(algorithmId: string): string {
        const algorithm = getAlgorithmById(algorithmId);
        if (!algorithm) return 'Continue your learning journey';

        const status = this.progressTracker.getAlgorithmStatus(algorithmId);

        switch (status) {
            case MasteryStatus.InProgress:
                return `Continue where you left off with ${algorithm.name}`;
            case MasteryStatus.NotStarted:
                if (this.prerequisiteEngine.arePrerequisitesMet(algorithmId)) {
                    return `Start learning ${algorithm.name} - all prerequisites completed`;
                }
                return `Complete prerequisites to unlock ${algorithm.name}`;
            case MasteryStatus.Completed:
                return `Master ${algorithm.name} by completing the practice challenge`;
            case MasteryStatus.Mastered:
                return `Review ${algorithm.name} to reinforce your knowledge`;
            default:
                return `Learn ${algorithm.name}`;
        }
    }

    /**
     * Get suggested algorithms
     */
    getSuggestedAlgorithms(count: number = 3): Algorithm[] {
        const suggestions: Algorithm[] = [];
        const unlocked = this.prerequisiteEngine.getUnlockedAlgorithms();

        // Filter to not started or in progress
        const available = unlocked.filter(id => {
            const status = this.progressTracker.getAlgorithmStatus(id);
            return status === MasteryStatus.NotStarted || status === MasteryStatus.InProgress;
        });

        // Sort by difficulty and add to suggestions
        const sorted = available
            .map(id => getAlgorithmById(id))
            .filter((algo): algo is Algorithm => algo !== undefined)
            .sort((a, b) => {
                const difficultyOrder = {
                    [DifficultyLevel.Beginner]: 1,
                    [DifficultyLevel.Intermediate]: 2,
                    [DifficultyLevel.Advanced]: 3
                };
                return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
            });

        return sorted.slice(0, count);
    }

    /**
     * Check if algorithm should be reviewed
     */
    shouldReviewAlgorithm(algorithmId: string): boolean {
        const algoProgress = this.progressTracker.getAlgorithmProgress(algorithmId);
        if (!algoProgress) return false;

        // Check if completed but not mastered
        if (algoProgress.status === MasteryStatus.Completed && !algoProgress.challengeCompleted) {
            return true;
        }

        // Check if has low challenge performance
        if (algoProgress.challengeAttempts.length > 0) {
            const successRate = this.calculateChallengeSuccessRate(algoProgress.challengeAttempts);
            if (successRate < PERFORMANCE_THRESHOLDS.LOW_ACCURACY_RATE) {
                return true;
            }
        }

        return false;
    }

    /**
     * Get recommended difficulty level
     */
    getRecommendedDifficulty(): DifficultyLevel {
        // Check completion of each level
        const beginnerComplete = this.isDifficultyLevelComplete(DifficultyLevel.Beginner);
        const intermediateComplete = this.isDifficultyLevelComplete(DifficultyLevel.Intermediate);

        if (!beginnerComplete) {
            return DifficultyLevel.Beginner;
        }

        if (!intermediateComplete) {
            return DifficultyLevel.Intermediate;
        }

        return DifficultyLevel.Advanced;
    }

    /**
     * Check if should suggest advanced content
     * Property 42: High Performance Advanced Suggestions
     */
    shouldSuggestAdvancedContent(): boolean {
        const overallProgress = this.progressTracker.getOverallProgress();

        // Need at least 3 completed algorithms to assess performance
        const completedAlgorithms = Array.from(overallProgress.algorithmProgress.values())
            .filter(p => p.status === MasteryStatus.Completed || p.status === MasteryStatus.Mastered);

        if (completedAlgorithms.length < 3) {
            return false;
        }

        // Calculate average performance metrics
        let totalTimeRatio = 0;
        let totalSuccessRate = 0;
        let count = 0;

        completedAlgorithms.forEach(algoProgress => {
            const algorithm = getAlgorithmById(algoProgress.algorithmId);
            if (!algorithm) return;

            // Time performance
            const timeRatio = algoProgress.timeSpent / algorithm.estimatedTime;
            totalTimeRatio += timeRatio;

            // Challenge performance
            if (algoProgress.challengeAttempts.length > 0) {
                const successRate = this.calculateChallengeSuccessRate(algoProgress.challengeAttempts);
                totalSuccessRate += successRate;
            }

            count++;
        });

        const avgTimeRatio = totalTimeRatio / count;
        const avgSuccessRate = totalSuccessRate / count;

        // High performance: fast completion + high accuracy
        return avgTimeRatio < PERFORMANCE_THRESHOLDS.HIGH_PERFORMANCE_TIME &&
            avgSuccessRate > PERFORMANCE_THRESHOLDS.HIGH_ACCURACY_RATE;
    }

    /**
     * Private helper methods
     */

    private getInProgressRecommendation(): Recommendation | null {
        const inProgress = Object.values(this.progressTracker.getAllProgress().algorithmProgress)
            .filter(p => p.status === MasteryStatus.InProgress)
            .sort((a, b) => b.lastAccessedDate.getTime() - a.lastAccessedDate.getTime());

        if (inProgress.length === 0) return null;

        const mostRecent = inProgress[0];
        const algorithm = getAlgorithmById(mostRecent.algorithmId);
        if (!algorithm) return null;

        return {
            type: RecommendationType.Algorithm,
            algorithmId: mostRecent.algorithmId,
            reason: `Continue where you left off with ${algorithm.name}`,
            priority: RecommendationPriority.High
        };
    }

    private getCurrentLevelRecommendation(): Recommendation | null {
        const currentLevel = this.getRecommendedDifficulty();
        const algorithms = getAlgorithmsByDifficulty(currentLevel);

        // Find first not started algorithm in current level
        for (const algorithm of algorithms) {
            const status = this.progressTracker.getAlgorithmStatus(algorithm.id);
            if (status === MasteryStatus.NotStarted &&
                this.prerequisiteEngine.arePrerequisitesMet(algorithm.id)) {
                return {
                    type: RecommendationType.Algorithm,
                    algorithmId: algorithm.id,
                    reason: `Continue mastering ${currentLevel} level with ${algorithm.name}`,
                    priority: RecommendationPriority.High
                };
            }
        }

        return null;
    }

    private getChallengeRecommendation(): Recommendation | null {
        const completed = Object.values(this.progressTracker.getAllProgress().algorithmProgress)
            .filter(p => p.status === MasteryStatus.Completed && !p.challengeCompleted);

        if (completed.length === 0) return null;

        const algorithm = getAlgorithmById(completed[0].algorithmId);
        if (!algorithm) return null;

        return {
            type: RecommendationType.Challenge,
            algorithmId: completed[0].algorithmId,
            challengeId: `${completed[0].algorithmId}_challenge`,
            reason: `Master ${algorithm.name} by completing the practice challenge`,
            priority: RecommendationPriority.Medium
        };
    }

    private getNextLevelRecommendation(): Recommendation | null {
        const currentLevel = this.getRecommendedDifficulty();

        // Check if current level is complete
        if (!this.isDifficultyLevelComplete(currentLevel)) {
            return null;
        }

        // Get next level
        let nextLevel: DifficultyLevel | null = null;
        if (currentLevel === DifficultyLevel.Beginner) {
            nextLevel = DifficultyLevel.Intermediate;
        } else if (currentLevel === DifficultyLevel.Intermediate) {
            nextLevel = DifficultyLevel.Advanced;
        }

        if (!nextLevel) return null;

        // Get first algorithm in next level
        const algorithms = getAlgorithmsByDifficulty(nextLevel);
        if (algorithms.length === 0) return null;

        return {
            type: RecommendationType.Algorithm,
            algorithmId: algorithms[0].id,
            reason: `Advance to ${nextLevel} level with ${algorithms[0].name}`,
            priority: RecommendationPriority.High
        };
    }

    private getReviewRecommendation(): Recommendation | null {
        // Property 43: Low Performance Review Suggestions
        const allProgress = Object.values(this.progressTracker.getAllProgress().algorithmProgress);

        // Find algorithms with low performance
        for (const algoProgress of allProgress) {
            if (this.shouldReviewAlgorithm(algoProgress.algorithmId)) {
                const algorithm = getAlgorithmById(algoProgress.algorithmId);
                if (!algorithm) continue;

                return {
                    type: RecommendationType.Review,
                    algorithmId: algoProgress.algorithmId,
                    reason: `Review ${algorithm.name} to strengthen your understanding`,
                    priority: RecommendationPriority.Low
                };
            }
        }

        return null;
    }

    private getDefaultRecommendation(): Recommendation {
        // Default to first beginner algorithm
        const beginnerAlgorithms = getAlgorithmsByDifficulty(DifficultyLevel.Beginner);
        const firstAlgorithm = beginnerAlgorithms[0];

        return {
            type: RecommendationType.Algorithm,
            algorithmId: firstAlgorithm.id,
            reason: `Start your ML journey with ${firstAlgorithm.name}`,
            priority: RecommendationPriority.High
        };
    }

    private isDifficultyLevelComplete(level: DifficultyLevel): boolean {
        const algorithms = getAlgorithmsByDifficulty(level);

        return algorithms.every(algo => {
            const status = this.progressTracker.getAlgorithmStatus(algo.id);
            return status === MasteryStatus.Completed || status === MasteryStatus.Mastered;
        });
    }

    private calculateChallengeSuccessRate(attempts: ChallengeAttempt[]): number {
        if (attempts.length === 0) return 0;

        const successful = attempts.filter(a => a.correct).length;
        return successful / attempts.length;
    }

    /**
     * Get performance score for an algorithm (0-100)
     */
    getPerformanceScore(algorithmId: string): number {
        const algoProgress = this.progressTracker.getAlgorithmProgress(algorithmId);
        if (!algoProgress) return 0;

        const algorithm = getAlgorithmById(algorithmId);
        if (!algorithm) return 0;

        let score = 0;

        // Completion score (40 points)
        if (algoProgress.status === MasteryStatus.Completed) {
            score += 40;
        } else if (algoProgress.status === MasteryStatus.Mastered) {
            score += 40;
        } else if (algoProgress.status === MasteryStatus.InProgress) {
            score += 20;
        }

        // Time efficiency score (30 points)
        if (algoProgress.timeSpent > 0) {
            const timeRatio = algoProgress.timeSpent / algorithm.estimatedTime;
            if (timeRatio < PERFORMANCE_THRESHOLDS.HIGH_PERFORMANCE_TIME) {
                score += 30;
            } else if (timeRatio < 1.0) {
                score += 20;
            } else if (timeRatio < PERFORMANCE_THRESHOLDS.LOW_PERFORMANCE_TIME) {
                score += 10;
            }
        }

        // Challenge accuracy score (30 points)
        if (algoProgress.challengeAttempts.length > 0) {
            const successRate = this.calculateChallengeSuccessRate(algoProgress.challengeAttempts);
            score += Math.round(successRate * 30);
        }

        return Math.min(100, score);
    }

    /**
     * Get adaptive difficulty suggestion based on performance
     */
    getAdaptiveDifficultySuggestion(): {
        suggestion: 'easier' | 'current' | 'harder';
        reason: string;
    } {
        if (this.shouldSuggestAdvancedContent()) {
            return {
                suggestion: 'harder',
                reason: 'Your performance is excellent! Consider exploring advanced topics.'
            };
        }

        const overallProgress = this.progressTracker.getOverallProgress();
        const completedAlgorithms = Array.from(overallProgress.algorithmProgress.values())
            .filter(p => p.status === MasteryStatus.Completed || p.status === MasteryStatus.Mastered);

        if (completedAlgorithms.length < 2) {
            return {
                suggestion: 'current',
                reason: 'Continue at your current pace to build a strong foundation.'
            };
        }

        // Check for struggling indicators
        let strugglingCount = 0;
        completedAlgorithms.forEach(algoProgress => {
            const algorithm = getAlgorithmById(algoProgress.algorithmId);
            if (!algorithm) return;

            const timeRatio = algoProgress.timeSpent / algorithm.estimatedTime;
            if (timeRatio > PERFORMANCE_THRESHOLDS.LOW_PERFORMANCE_TIME) {
                strugglingCount++;
            }

            if (algoProgress.challengeAttempts.length > 0) {
                const successRate = this.calculateChallengeSuccessRate(algoProgress.challengeAttempts);
                if (successRate < PERFORMANCE_THRESHOLDS.LOW_ACCURACY_RATE) {
                    strugglingCount++;
                }
            }
        });

        if (strugglingCount >= completedAlgorithms.length / 2) {
            return {
                suggestion: 'easier',
                reason: 'Consider reviewing prerequisite concepts to strengthen your foundation.'
            };
        }

        return {
            suggestion: 'current',
            reason: 'You\'re making steady progress. Keep up the good work!'
        };
    }

    /**
     * Get personalized learning tips based on performance
     */
    getPersonalizedTips(): string[] {
        const tips: string[] = [];
        const overallProgress = this.progressTracker.getOverallProgress();

        // Streak tip
        const streak = this.progressTracker.getCurrentStreak();
        if (streak === 0) {
            tips.push('Start a learning streak by practicing daily!');
        } else if (streak >= 7) {
            tips.push(`Amazing ${streak}-day streak! Keep the momentum going.`);
        }

        // Challenge tip
        const completedWithoutChallenge = Array.from(overallProgress.algorithmProgress.values())
            .filter(p => p.status === MasteryStatus.Completed && !p.challengeCompleted);

        if (completedWithoutChallenge.length > 0) {
            tips.push('Complete practice challenges to master your algorithms!');
        }

        // Performance tip
        if (this.shouldSuggestAdvancedContent()) {
            tips.push('Your performance is excellent! Consider exploring innovation challenges.');
        }

        // Progress tip
        if (overallProgress.percentage < 25) {
            tips.push('Focus on completing beginner algorithms to build a strong foundation.');
        } else if (overallProgress.percentage < 50) {
            tips.push('You\'re making great progress! Keep exploring new algorithms.');
        } else if (overallProgress.percentage < 75) {
            tips.push('You\'re over halfway there! Advanced algorithms await.');
        } else {
            tips.push('You\'re almost an ML master! Finish strong!');
        }

        return tips.slice(0, 3); // Return top 3 tips
    }
}
