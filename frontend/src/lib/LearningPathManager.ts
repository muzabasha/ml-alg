/**
 * Learning Path Manager - Orchestrates overall learning path logic
 * 
 * This class coordinates between ProgressTracker and PrerequisiteEngine
 * to manage algorithm access control and navigation.
 */

import {
    Algorithm,
    DifficultyLevel,
    NavigationResult,
    MasteryStatus
} from '../types/learning-path';
import {
    ALGORITHMS,
    getAlgorithmsByDifficulty,
    getAlgorithmById
} from '../config/algorithms';
import { ProgressTracker } from './ProgressTracker';
import { PrerequisiteEngine } from './PrerequisiteEngine';

/**
 * LearningPathManager class for managing learning path navigation
 */
export class LearningPathManager {
    private progressTracker: ProgressTracker;
    private prerequisiteEngine: PrerequisiteEngine;

    constructor(progressTracker: ProgressTracker) {
        this.progressTracker = progressTracker;
        this.prerequisiteEngine = new PrerequisiteEngine(progressTracker);
    }

    /**
     * Check if an algorithm is unlocked
     */
    isAlgorithmUnlocked(algorithmId: string): boolean {
        return this.prerequisiteEngine.arePrerequisitesMet(algorithmId);
    }

    /**
     * Get locked reason for an algorithm
     */
    getLockedReason(algorithmId: string): string {
        return this.prerequisiteEngine.getLockedReason(algorithmId);
    }

    /**
     * Unlock an algorithm (by completing prerequisites)
     * Note: Algorithms are unlocked automatically when prerequisites are met
     */
    unlockAlgorithm(algorithmId: string): void {
        // This is handled automatically by prerequisite completion
        // This method exists for interface compatibility
        console.log(`Algorithm ${algorithmId} unlock requested`);
    }

    /**
     * Get current difficulty level based on progress
     */
    getCurrentDifficultyLevel(): DifficultyLevel {
        // Check if Advanced is unlocked
        if (this.prerequisiteEngine.isDifficultyLevelUnlocked('Advanced')) {
            return DifficultyLevel.Advanced;
        }

        // Check if Intermediate is unlocked
        if (this.prerequisiteEngine.isDifficultyLevelUnlocked('Intermediate')) {
            return DifficultyLevel.Intermediate;
        }

        // Default to Beginner
        return DifficultyLevel.Beginner;
    }

    /**
     * Check if a difficulty level is unlocked
     */
    isDifficultyLevelUnlocked(level: DifficultyLevel): boolean {
        return this.prerequisiteEngine.isDifficultyLevelUnlocked(level);
    }

    /**
     * Check if navigation to an algorithm is allowed
     * Property 5: Completed Algorithm Accessibility
     */
    canNavigateToAlgorithm(algorithmId: string): NavigationResult {
        // Check if algorithm exists
        const algorithm = getAlgorithmById(algorithmId);
        if (!algorithm) {
            return {
                allowed: false,
                reason: 'Algorithm not found'
            };
        }

        // Check if algorithm is completed (always allow revisit)
        const status = this.progressTracker.getAlgorithmStatus(algorithmId);
        if (status === MasteryStatus.Completed || status === MasteryStatus.Mastered) {
            return {
                allowed: true
            };
        }

        // Check prerequisites
        if (!this.prerequisiteEngine.arePrerequisitesMet(algorithmId)) {
            const missing = this.prerequisiteEngine.getMissingPrerequisites(algorithmId);
            return {
                allowed: false,
                reason: this.prerequisiteEngine.getLockedReason(algorithmId),
                missingPrerequisites: missing.map(a => a.id)
            };
        }

        // Algorithm is unlocked
        return {
            allowed: true
        };
    }

    /**
     * Get algorithms by difficulty level
     */
    getAlgorithmsByDifficulty(level: DifficultyLevel): Algorithm[] {
        return getAlgorithmsByDifficulty(level);
    }

    /**
     * Get all algorithms with their lock status
     */
    getAllAlgorithmsWithStatus(): Array<Algorithm & { locked: boolean; status: MasteryStatus }> {
        return Object.values(ALGORITHMS).map(algorithm => ({
            ...algorithm,
            locked: !this.isAlgorithmUnlocked(algorithm.id),
            status: this.progressTracker.getAlgorithmStatus(algorithm.id)
        }));
    }

    /**
     * Get algorithms grouped by difficulty with status
     */
    getAlgorithmsByDifficultyWithStatus() {
        const beginner = this.getAlgorithmsByDifficulty(DifficultyLevel.Beginner).map(algo => ({
            ...algo,
            locked: !this.isAlgorithmUnlocked(algo.id),
            status: this.progressTracker.getAlgorithmStatus(algo.id),
            completionPercentage: this.progressTracker.getAlgorithmCompletionPercentage(algo.id)
        }));

        const intermediate = this.getAlgorithmsByDifficulty(DifficultyLevel.Intermediate).map(algo => ({
            ...algo,
            locked: !this.isAlgorithmUnlocked(algo.id),
            status: this.progressTracker.getAlgorithmStatus(algo.id),
            completionPercentage: this.progressTracker.getAlgorithmCompletionPercentage(algo.id)
        }));

        const advanced = this.getAlgorithmsByDifficulty(DifficultyLevel.Advanced).map(algo => ({
            ...algo,
            locked: !this.isAlgorithmUnlocked(algo.id),
            status: this.progressTracker.getAlgorithmStatus(algo.id),
            completionPercentage: this.progressTracker.getAlgorithmCompletionPercentage(algo.id)
        }));

        return { beginner, intermediate, advanced };
    }

    /**
     * Get next unlocked algorithm (for recommendations)
     */
    getNextUnlockedAlgorithm(): Algorithm | null {
        const unlocked = this.prerequisiteEngine.getUnlockedAlgorithms();

        // Filter out completed/mastered algorithms
        const available = unlocked.filter(id => {
            const status = this.progressTracker.getAlgorithmStatus(id);
            return status === MasteryStatus.NotStarted || status === MasteryStatus.InProgress;
        });

        if (available.length === 0) return null;

        // Return first available algorithm
        return getAlgorithmById(available[0]) || null;
    }

    /**
     * Get in-progress algorithms
     */
    getInProgressAlgorithms(): Algorithm[] {
        const inProgress: Algorithm[] = [];

        Object.keys(ALGORITHMS).forEach(algorithmId => {
            const status = this.progressTracker.getAlgorithmStatus(algorithmId);
            if (status === MasteryStatus.InProgress) {
                const algorithm = getAlgorithmById(algorithmId);
                if (algorithm) {
                    inProgress.push(algorithm);
                }
            }
        });

        return inProgress;
    }

    /**
     * Get completed algorithms
     */
    getCompletedAlgorithms(): Algorithm[] {
        const completed: Algorithm[] = [];

        Object.keys(ALGORITHMS).forEach(algorithmId => {
            const status = this.progressTracker.getAlgorithmStatus(algorithmId);
            if (status === MasteryStatus.Completed || status === MasteryStatus.Mastered) {
                const algorithm = getAlgorithmById(algorithmId);
                if (algorithm) {
                    completed.push(algorithm);
                }
            }
        });

        return completed;
    }

    /**
     * Get prerequisite engine for advanced operations
     */
    getPrerequisiteEngine(): PrerequisiteEngine {
        return this.prerequisiteEngine;
    }

    /**
     * Get progress tracker for advanced operations
     */
    getProgressTracker(): ProgressTracker {
        return this.progressTracker;
    }

    /**
     * Handle algorithm completion and check for unlocks
     */
    handleAlgorithmCompletion(algorithmId: string): string[] {
        return this.prerequisiteEngine.checkForNewUnlocks(algorithmId);
    }

    /**
     * Get learning path summary
     */
    getLearningPathSummary() {
        const overallProgress = this.progressTracker.getOverallProgress();
        const currentLevel = this.getCurrentDifficultyLevel();
        const completedAlgorithms = this.getCompletedAlgorithms();
        const inProgressAlgorithms = this.getInProgressAlgorithms();
        const nextAlgorithm = this.getNextUnlockedAlgorithm();

        return {
            overallProgress,
            currentLevel,
            completedCount: completedAlgorithms.length,
            inProgressCount: inProgressAlgorithms.length,
            nextAlgorithm,
            beginnerUnlocked: this.isDifficultyLevelUnlocked(DifficultyLevel.Beginner),
            intermediateUnlocked: this.isDifficultyLevelUnlocked(DifficultyLevel.Intermediate),
            advancedUnlocked: this.isDifficultyLevelUnlocked(DifficultyLevel.Advanced)
        };
    }
}
