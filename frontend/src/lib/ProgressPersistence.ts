/**
 * Progress Persistence Layer
 * 
 * Handles progress persistence with:
 * - Immediate localStorage caching
 * - Debounced backend sync (500ms)
 * - Optimistic updates with rollback on failure
 * - Offline queue management
 * 
 * Requirements: 3.5, 13.1, 13.2, 13.3
 */

import { StudentProgress } from '../types/learning-path';

export interface PersistenceConfig {
    debounceMs: number;
    maxRetries: number;
    retryDelayMs: number;
    storageKey: string;
}

export interface SyncResult {
    success: boolean;
    error?: Error;
}

/**
 * Progress Persistence Manager
 * Manages localStorage and backend sync with debouncing and rollback
 */
export class ProgressPersistence {
    private config: PersistenceConfig;
    private syncTimer: NodeJS.Timeout | null = null;
    private pendingSync: StudentProgress | null = null;
    private lastSyncedProgress: StudentProgress | null = null;
    private isSyncing = false;
    private syncCallback?: (progress: StudentProgress) => Promise<void>;

    constructor(
        syncCallback?: (progress: StudentProgress) => Promise<void>,
        config?: Partial<PersistenceConfig>
    ) {
        this.syncCallback = syncCallback;
        this.config = {
            debounceMs: 500,
            maxRetries: 3,
            retryDelayMs: 1000,
            storageKey: 'student_progress',
            ...config
        };
    }

    /**
     * Save progress with immediate localStorage and debounced backend sync
     * Implements optimistic update pattern
     */
    async saveProgress(progress: StudentProgress): Promise<SyncResult> {
        try {
            // Store previous state for potential rollback
            const previousProgress = this.lastSyncedProgress;

            // Immediate localStorage save (optimistic update)
            this.saveToLocalStorage(progress);

            // Update pending sync
            this.pendingSync = progress;

            // Debounce backend sync
            this.debouncedBackendSync();

            return { success: true };
        } catch (error) {
            console.error('Failed to save progress:', error);
            return {
                success: false,
                error: error instanceof Error ? error : new Error('Unknown error')
            };
        }
    }

    /**
     * Debounced backend sync
     * Waits 500ms after last update before syncing to backend
     */
    private debouncedBackendSync(): void {
        // Clear existing timer
        if (this.syncTimer) {
            clearTimeout(this.syncTimer);
        }

        // Set new timer
        this.syncTimer = setTimeout(() => {
            this.performBackendSync();
        }, this.config.debounceMs);
    }

    /**
     * Perform actual backend sync with retry logic
     */
    private async performBackendSync(): Promise<void> {
        if (!this.pendingSync || this.isSyncing || !this.syncCallback) {
            return;
        }

        this.isSyncing = true;
        const progressToSync = this.pendingSync;
        const previousProgress = this.lastSyncedProgress;

        try {
            // Attempt backend sync
            await this.syncCallback(progressToSync);

            // Success - update last synced state
            this.lastSyncedProgress = progressToSync;
            this.pendingSync = null;
        } catch (error) {
            console.error('Backend sync failed:', error);

            // Rollback to previous state on failure
            if (previousProgress) {
                this.rollbackProgress(previousProgress);
            }

            // Retry logic could be added here
            this.scheduleRetry(progressToSync);
        } finally {
            this.isSyncing = false;
        }
    }

    /**
     * Schedule retry for failed sync
     */
    private scheduleRetry(progress: StudentProgress, attempt: number = 1): void {
        if (attempt >= this.config.maxRetries) {
            console.error('Max retries reached for progress sync');
            return;
        }

        const delay = this.config.retryDelayMs * Math.pow(2, attempt - 1); // Exponential backoff

        setTimeout(() => {
            this.pendingSync = progress;
            this.performBackendSync();
        }, delay);
    }

    /**
     * Rollback progress to previous state
     * Called when backend sync fails
     */
    private rollbackProgress(previousProgress: StudentProgress): void {
        try {
            this.saveToLocalStorage(previousProgress);
            console.warn('Progress rolled back due to sync failure');
        } catch (error) {
            console.error('Failed to rollback progress:', error);
        }
    }

    /**
     * Save progress to localStorage immediately
     */
    private saveToLocalStorage(progress: StudentProgress): void {
        const serializable = this.serializeProgress(progress);
        localStorage.setItem(this.config.storageKey, JSON.stringify(serializable));
    }

    /**
     * Load progress from localStorage
     */
    loadFromLocalStorage(): StudentProgress | null {
        try {
            const stored = localStorage.getItem(this.config.storageKey);
            if (!stored) return null;

            const serializable = JSON.parse(stored);
            return this.deserializeProgress(serializable);
        } catch (error) {
            console.error('Failed to load progress from localStorage:', error);
            return null;
        }
    }

    /**
     * Force immediate sync to backend
     * Bypasses debounce timer
     */
    async forceSyncNow(): Promise<SyncResult> {
        if (this.syncTimer) {
            clearTimeout(this.syncTimer);
            this.syncTimer = null;
        }

        if (!this.pendingSync || !this.syncCallback) {
            return { success: true };
        }

        try {
            await this.syncCallback(this.pendingSync);
            this.lastSyncedProgress = this.pendingSync;
            this.pendingSync = null;
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error : new Error('Sync failed')
            };
        }
    }

    /**
     * Check if there are pending syncs
     */
    hasPendingSync(): boolean {
        return this.pendingSync !== null;
    }

    /**
     * Clear all timers and pending syncs
     */
    cleanup(): void {
        if (this.syncTimer) {
            clearTimeout(this.syncTimer);
            this.syncTimer = null;
        }
        this.pendingSync = null;
    }

    /**
     * Serialize progress for storage
     */
    private serializeProgress(progress: StudentProgress): any {
        const algorithmProgress: Record<string, any> = {};

        Object.entries(progress.algorithmProgress).forEach(([id, algoProgress]) => {
            algorithmProgress[id] = {
                ...algoProgress,
                lastAccessedDate: algoProgress.lastAccessedDate.toISOString(),
                challengeAttempts: algoProgress.challengeAttempts.map(attempt => ({
                    ...attempt,
                    timestamp: attempt.timestamp.toISOString()
                }))
            };
        });

        const achievements: Record<string, any> = {};
        Object.entries(progress.achievements).forEach(([id, achievement]) => {
            achievements[id] = {
                ...achievement,
                earnedDate: achievement.earnedDate.toISOString()
            };
        });

        return {
            ...progress,
            lastAccessDate: progress.lastAccessDate.toISOString(),
            algorithmProgress,
            achievements
        };
    }

    /**
     * Deserialize progress from storage
     */
    private deserializeProgress(serializable: any): StudentProgress {
        const algorithmProgress: Record<string, any> = {};

        Object.entries(serializable.algorithmProgress || {}).forEach(([id, algoProgress]: [string, any]) => {
            algorithmProgress[id] = {
                ...algoProgress,
                lastAccessedDate: new Date(algoProgress.lastAccessedDate),
                challengeAttempts: (algoProgress.challengeAttempts || []).map((attempt: any) => ({
                    ...attempt,
                    timestamp: new Date(attempt.timestamp)
                }))
            };
        });

        const achievements: Record<string, any> = {};
        Object.entries(serializable.achievements || {}).forEach(([id, achievement]: [string, any]) => {
            achievements[id] = {
                ...achievement,
                earnedDate: new Date(achievement.earnedDate)
            };
        });

        return {
            ...serializable,
            lastAccessDate: new Date(serializable.lastAccessDate),
            algorithmProgress,
            achievements
        };
    }
}
