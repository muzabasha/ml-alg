/**
 * Prerequisite Engine - Validates algorithm prerequisites and dependencies
 * 
 * This class manages prerequisite validation, dependency graphs, and
 * unlock notifications for the learning path system.
 */

import {
    Algorithm,
    DependencyGraph,
    PrerequisiteEdge,
    MasteryStatus
} from '../types/learning-path';
import {
    ALGORITHMS,
    ALGORITHM_PREREQUISITES,
    getAlgorithmById
} from '../config/algorithms';
import { ProgressTracker } from './ProgressTracker';

/**
 * PrerequisiteEngine class for managing algorithm dependencies
 */
export class PrerequisiteEngine {
    private progressTracker: ProgressTracker;

    constructor(progressTracker: ProgressTracker) {
        this.progressTracker = progressTracker;
    }

    /**
     * Get prerequisites for an algorithm
     */
    getPrerequisites(algorithmId: string): string[] {
        return ALGORITHM_PREREQUISITES[algorithmId] || [];
    }

    /**
     * Check if all prerequisites are met for an algorithm
     * Property 2: Prerequisite Validation on Access
     * Property 14: Automatic Algorithm Unlocking
     */
    arePrerequisitesMet(algorithmId: string): boolean {
        const prerequisites = this.getPrerequisites(algorithmId);

        // No prerequisites means always unlocked
        if (prerequisites.length === 0) {
            return true;
        }

        // Check if all prerequisites are completed or mastered
        return prerequisites.every(prereqId => {
            const status = this.progressTracker.getAlgorithmStatus(prereqId);
            return status === MasteryStatus.Completed || status === MasteryStatus.Mastered;
        });
    }

    /**
     * Get missing prerequisites for an algorithm
     * Property 3: Locked Algorithm Navigation Prevention
     */
    getMissingPrerequisites(algorithmId: string): Algorithm[] {
        const prerequisites = this.getPrerequisites(algorithmId);
        const missing: Algorithm[] = [];

        prerequisites.forEach(prereqId => {
            const status = this.progressTracker.getAlgorithmStatus(prereqId);
            if (status !== MasteryStatus.Completed && status !== MasteryStatus.Mastered) {
                const algorithm = getAlgorithmById(prereqId);
                if (algorithm) {
                    missing.push(algorithm);
                }
            }
        });

        return missing;
    }

    /**
     * Get dependency graph for visualization
     */
    getDependencyGraph(): DependencyGraph {
        const nodes: Algorithm[] = Object.values(ALGORITHMS);
        const edges: PrerequisiteEdge[] = [];

        Object.entries(ALGORITHM_PREREQUISITES).forEach(([algorithmId, prerequisites]) => {
            prerequisites.forEach(prereqId => {
                edges.push({
                    from: prereqId,
                    to: algorithmId
                });
            });
        });

        return { nodes, edges };
    }

    /**
     * Get all currently unlocked algorithms
     */
    getUnlockedAlgorithms(): string[] {
        const unlocked: string[] = [];

        Object.keys(ALGORITHMS).forEach(algorithmId => {
            if (this.arePrerequisitesMet(algorithmId)) {
                unlocked.push(algorithmId);
            }
        });

        return unlocked;
    }

    /**
     * Check for newly unlocked algorithms after completing an algorithm
     * Property 4: Difficulty Level Unlocking
     */
    checkForNewUnlocks(completedAlgorithmId: string): string[] {
        const newlyUnlocked: string[] = [];

        // Check all algorithms to see if this completion unlocked any
        Object.keys(ALGORITHMS).forEach(algorithmId => {
            const prerequisites = this.getPrerequisites(algorithmId);

            // Skip if no prerequisites or doesn't depend on completed algorithm
            if (prerequisites.length === 0 || !prerequisites.includes(completedAlgorithmId)) {
                return;
            }

            // Check if this algorithm is now unlocked
            const status = this.progressTracker.getAlgorithmStatus(algorithmId);
            if (status === MasteryStatus.NotStarted && this.arePrerequisitesMet(algorithmId)) {
                newlyUnlocked.push(algorithmId);
            }
        });

        return newlyUnlocked;
    }

    /**
     * Check if an algorithm is locked
     */
    isAlgorithmLocked(algorithmId: string): boolean {
        return !this.arePrerequisitesMet(algorithmId);
    }

    /**
     * Get locked reason for an algorithm
     */
    getLockedReason(algorithmId: string): string {
        if (!this.isAlgorithmLocked(algorithmId)) {
            return '';
        }

        const missing = this.getMissingPrerequisites(algorithmId);
        if (missing.length === 0) {
            return 'This algorithm is locked';
        }

        if (missing.length === 1) {
            return `Complete ${missing[0].name} to unlock this algorithm`;
        }

        return `Complete ${missing.length} prerequisite algorithms to unlock`;
    }

    /**
     * Get algorithms that depend on a given algorithm
     */
    getDependentAlgorithms(algorithmId: string): string[] {
        const dependents: string[] = [];

        Object.entries(ALGORITHM_PREREQUISITES).forEach(([algoId, prerequisites]) => {
            if (prerequisites.includes(algorithmId)) {
                dependents.push(algoId);
            }
        });

        return dependents;
    }

    /**
     * Check if a difficulty level is unlocked
     * Property 4: Difficulty Level Unlocking
     */
    isDifficultyLevelUnlocked(difficulty: 'Beginner' | 'Intermediate' | 'Advanced'): boolean {
        // Beginner is always unlocked
        if (difficulty === 'Beginner') {
            return true;
        }

        // Get all algorithms of the previous difficulty level
        const previousDifficulty = difficulty === 'Intermediate' ? 'Beginner' : 'Intermediate';
        const previousAlgorithms = Object.values(ALGORITHMS).filter(
            algo => algo.difficulty === previousDifficulty
        );

        // Check if all previous difficulty algorithms are completed
        return previousAlgorithms.every(algo => {
            const status = this.progressTracker.getAlgorithmStatus(algo.id);
            return status === MasteryStatus.Completed || status === MasteryStatus.Mastered;
        });
    }

    /**
     * Get completion percentage for a difficulty level
     */
    getDifficultyLevelCompletion(difficulty: 'Beginner' | 'Intermediate' | 'Advanced'): number {
        const algorithms = Object.values(ALGORITHMS).filter(
            algo => algo.difficulty === difficulty
        );

        if (algorithms.length === 0) return 0;

        const completed = algorithms.filter(algo => {
            const status = this.progressTracker.getAlgorithmStatus(algo.id);
            return status === MasteryStatus.Completed || status === MasteryStatus.Mastered;
        }).length;

        return Math.round((completed / algorithms.length) * 100);
    }

    /**
     * Get prerequisite chain for an algorithm (all transitive prerequisites)
     */
    getPrerequisiteChain(algorithmId: string): string[] {
        const chain = new Set<string>();
        const visited = new Set<string>();

        const traverse = (id: string) => {
            if (visited.has(id)) return;
            visited.add(id);

            const prerequisites = this.getPrerequisites(id);
            prerequisites.forEach(prereqId => {
                chain.add(prereqId);
                traverse(prereqId);
            });
        };

        traverse(algorithmId);
        return Array.from(chain);
    }

    /**
     * Validate prerequisite configuration (for testing)
     */
    validatePrerequisiteConfiguration(): { valid: boolean; errors: string[] } {
        const errors: string[] = [];

        // Check for circular dependencies
        Object.keys(ALGORITHMS).forEach(algorithmId => {
            const chain = this.getPrerequisiteChain(algorithmId);
            if (chain.includes(algorithmId)) {
                errors.push(`Circular dependency detected for ${algorithmId}`);
            }
        });

        // Check for invalid prerequisite IDs
        Object.entries(ALGORITHM_PREREQUISITES).forEach(([algorithmId, prerequisites]) => {
            prerequisites.forEach(prereqId => {
                if (!ALGORITHMS[prereqId]) {
                    errors.push(`Invalid prerequisite ${prereqId} for ${algorithmId}`);
                }
            });
        });

        return {
            valid: errors.length === 0,
            errors
        };
    }
}
