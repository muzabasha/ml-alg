/**
 * Progress Tracker - Core logic for tracking student progress
 * 
 * This class manages all progress tracking functionality including:
 * - Step-level completion tracking
 * - Algorithm-level progress calculation
 * - Overall progress aggregation
 * - Progress persistence to localStorage and backend
 */

import {
    WorkflowStep,
    MasteryStatus,
    StepProgress,
    AlgorithmProgress,
    OverallProgress,
    StudentProgress,
    SerializableStudentProgress,
    SerializableAlgorithmProgress,
    ChallengeAttempt,
    TOTAL_WORKFLOW_STEPS,
    TOTAL_ALGORITHMS,
    PROGRESS_STORAGE_KEY
} from '../types/learning-path';
import { ALGORITHMS } from '../config/algorithms';
import { ProgressPersistence } from './ProgressPersistence';

/**
 * ProgressTracker class for managing student learning progress
 */
export class ProgressTracker {
    private progress: StudentProgress;
    private persistence: ProgressPersistence;

    constructor(studentId: string, syncCallback?: (progress: StudentProgress) => Promise<void>) {
        this.persistence = new ProgressPersistence(syncCallback, {
            storageKey: PROGRESS_STORAGE_KEY
        });
        this.progress = this.initializeProgress(studentId);
    }

    /**
     * Initialize empty progress structure
     */
    private initializeProgress(studentId: string): StudentProgress {
        return {
            studentId,
            onboardingComplete: false,
            lastAccessDate: new Date(),
            totalTimeSpent: 0,
            algorithmProgress: {},
            achievements: {},
            dailyActivity: {},
            certificates: []
        };
    }

    /**
     * Mark a workflow step as complete for an algorithm
     * Property 9: Step Completion Recording
     */
    markStepComplete(algorithmId: string, step: WorkflowStep): void {
        // Initialize algorithm progress if not exists
        if (!this.progress.algorithmProgress[algorithmId]) {
            this.progress.algorithmProgress[algorithmId] = {
                algorithmId,
                status: MasteryStatus.NotStarted,
                completedSteps: [],
                completionPercentage: 0,
                lastAccessedDate: new Date(),
                timeSpent: 0,
                challengeAttempts: [],
                challengeCompleted: false
            };
        }

        const algoProgress = this.progress.algorithmProgress[algorithmId];

        // Add step if not already completed
        if (!algoProgress.completedSteps.includes(step)) {
            algoProgress.completedSteps.push(step);
        }

        // Update status
        if (algoProgress.status === MasteryStatus.NotStarted) {
            algoProgress.status = MasteryStatus.InProgress;
        }

        // Update completion percentage
        algoProgress.completionPercentage = this.calculateAlgorithmCompletionPercentage(algorithmId);

        // Check if all steps completed (Property 13)
        if (algoProgress.completedSteps.length === TOTAL_WORKFLOW_STEPS) {
            algoProgress.status = MasteryStatus.Completed;
        }

        // Update last accessed date
        algoProgress.lastAccessedDate = new Date();
        this.progress.lastAccessDate = new Date();

        // Update daily activity
        this.updateDailyActivity(algorithmId);

        // Persist changes
        this.persistProgress();
    }

    /**
     * Check if a step is complete
     */
    isStepComplete(algorithmId: string, step: WorkflowStep): boolean {
        const algoProgress = this.progress.algorithmProgress[algorithmId];
        if (!algoProgress) return false;
        return algoProgress.completedSteps.includes(step);
    }

    /**
     * Get step progress for an algorithm
     */
    getStepProgress(algorithmId: string): StepProgress {
        const algoProgress = this.progress.algorithmProgress[algorithmId];
        const completedSteps = algoProgress?.completedSteps || [];

        return {
            [WorkflowStep.Introduction]: completedSteps.includes(WorkflowStep.Introduction),
            [WorkflowStep.Mathematics]: completedSteps.includes(WorkflowStep.Mathematics),
            [WorkflowStep.Intuition]: completedSteps.includes(WorkflowStep.Intuition),
            [WorkflowStep.Implementation]: completedSteps.includes(WorkflowStep.Implementation),
            [WorkflowStep.Visualization]: completedSteps.includes(WorkflowStep.Visualization),
            [WorkflowStep.Practice]: completedSteps.includes(WorkflowStep.Practice)
        };
    }

    /**
     * Get algorithm status
     */
    getAlgorithmStatus(algorithmId: string): MasteryStatus {
        const algoProgress = this.progress.algorithmProgress[algorithmId];
        return algoProgress?.status || MasteryStatus.NotStarted;
    }

    /**
     * Calculate algorithm completion percentage
     * Property 10: Algorithm Completion Percentage Calculation
     */
    getAlgorithmCompletionPercentage(algorithmId: string): number {
        return this.calculateAlgorithmCompletionPercentage(algorithmId);
    }

    private calculateAlgorithmCompletionPercentage(algorithmId: string): number {
        const algoProgress = this.progress.algorithmProgress[algorithmId];
        if (!algoProgress) return 0;

        const completedCount = algoProgress.completedSteps.length;
        const percentage = (completedCount / TOTAL_WORKFLOW_STEPS) * 100;
        return Math.round(percentage * 100) / 100; // Round to 2 decimal places
    }

    /**
     * Get overall progress across all algorithms
     * Property 11: Overall Progress Calculation
     */
    getOverallProgress(): OverallProgress {
        const totalSteps = TOTAL_ALGORITHMS * TOTAL_WORKFLOW_STEPS;
        let completedSteps = 0;

        const algorithmProgressMap = new Map<string, AlgorithmProgress>();

        Object.keys(ALGORITHMS).forEach(algorithmId => {
            const algoProgress = this.progress.algorithmProgress[algorithmId];
            if (algoProgress) {
                completedSteps += algoProgress.completedSteps.length;
                algorithmProgressMap.set(algorithmId, algoProgress);
            }
        });

        const percentage = (completedSteps / totalSteps) * 100;

        return {
            totalSteps,
            completedSteps,
            percentage: Math.round(percentage * 100) / 100,
            algorithmProgress: algorithmProgressMap
        };
    }

    /**
     * Get total completed algorithms
     */
    getTotalCompletedAlgorithms(): number {
        return Object.values(this.progress.algorithmProgress).filter(
            p => p.status === MasteryStatus.Completed || p.status === MasteryStatus.Mastered
        ).length;
    }

    /**
     * Mark algorithm as mastered (after challenge completion)
     */
    markAlgorithmMastered(algorithmId: string): void {
        const algoProgress = this.progress.algorithmProgress[algorithmId];
        if (algoProgress && algoProgress.status === MasteryStatus.Completed) {
            algoProgress.status = MasteryStatus.Mastered;
            algoProgress.challengeCompleted = true;
            this.persistProgress();
        }
    }

    /**
     * Add challenge attempt
     */
    addChallengeAttempt(algorithmId: string, attempt: ChallengeAttempt): void {
        const algoProgress = this.progress.algorithmProgress[algorithmId];
        if (algoProgress) {
            algoProgress.challengeAttempts.push(attempt);
            this.persistProgress();
        }
    }

    /**
     * Update time spent on algorithm
     */
    updateTimeSpent(algorithmId: string, minutes: number): void {
        const algoProgress = this.progress.algorithmProgress[algorithmId];
        if (algoProgress) {
            algoProgress.timeSpent += minutes;
            this.progress.totalTimeSpent += minutes;
            this.persistProgress();
        }
    }

    /**
     * Update daily activity
     */
    private updateDailyActivity(algorithmId: string): void {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

        if (!this.progress.dailyActivity[today]) {
            this.progress.dailyActivity[today] = {
                stepsCompleted: 0,
                timeSpent: 0,
                algorithmsAccessed: []
            };
        }

        const activity = this.progress.dailyActivity[today];
        activity.stepsCompleted += 1;

        if (!activity.algorithmsAccessed.includes(algorithmId)) {
            activity.algorithmsAccessed.push(algorithmId);
        }
    }

    /**
     * Get current streak
     */
    getCurrentStreak(): number {
        const dates = Object.keys(this.progress.dailyActivity).sort().reverse();
        if (dates.length === 0) return 0;

        let streak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 0; i < dates.length; i++) {
            const date = new Date(dates[i]);
            date.setHours(0, 0, 0, 0);

            const expectedDate = new Date(today);
            expectedDate.setDate(today.getDate() - i);
            expectedDate.setHours(0, 0, 0, 0);

            if (date.getTime() === expectedDate.getTime()) {
                streak++;
            } else {
                break;
            }
        }

        return streak;
    }

    /**
     * Get algorithm progress by ID
     */
    getAlgorithmProgress(algorithmId: string): AlgorithmProgress | undefined {
        return this.progress.algorithmProgress[algorithmId];
    }

    /**
     * Get all progress data
     */
    getAllProgress(): StudentProgress {
        return this.progress;
    }

    /**
     * Load progress from data
     */
    loadProgress(data: StudentProgress): void {
        this.progress = data;
    }

    /**
     * Persist progress to localStorage and backend
     * Property 12: Progress Persistence Round-Trip
     * Property 45: Automatic Progress Save on Step Completion
     * 
     * Uses optimistic updates with debounced backend sync (500ms)
     * Implements rollback on failure
     */
    private persistProgress(): void {
        this.persistence.saveProgress(this.progress).catch(error => {
            console.error('Failed to persist progress:', error);
        });
    }

    /**
     * Sync progress to backend immediately
     * Bypasses debounce timer
     */
    async syncProgress(): Promise<void> {
        const result = await this.persistence.forceSyncNow();
        if (!result.success) {
            throw result.error || new Error('Sync failed');
        }
    }

    /**
     * Load progress from localStorage
     */
    static loadFromLocalStorage(studentId: string): ProgressTracker | null {
        try {
            const persistence = new ProgressPersistence(undefined, {
                storageKey: PROGRESS_STORAGE_KEY
            });
            const progress = persistence.loadFromLocalStorage();

            if (!progress) return null;

            const tracker = new ProgressTracker(studentId);
            tracker.loadProgress(progress);
            return tracker;
        } catch (error) {
            console.error('Failed to load progress from localStorage:', error);
            return null;
        }
    }

    /**
     * Clear all progress (for testing or reset)
     */
    clearProgress(): void {
        this.progress = this.initializeProgress(this.progress.studentId);
        this.persistence.cleanup();
        localStorage.removeItem(PROGRESS_STORAGE_KEY);
    }

    /**
     * Check if there are pending syncs
     */
    hasPendingSync(): boolean {
        return this.persistence.hasPendingSync();
    }

    /**
     * Cleanup resources
     */
    cleanup(): void {
        this.persistence.cleanup();
    }
}
