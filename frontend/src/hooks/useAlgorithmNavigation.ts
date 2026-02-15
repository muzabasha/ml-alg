/**
 * Algorithm Navigation Hook
 * 
 * Custom hook for handling algorithm navigation with prerequisite checking
 * and lock status management.
 */

import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useLearningPath } from '../contexts/LearningPathContext';

/**
 * Hook for algorithm navigation with guards
 */
export const useAlgorithmNavigation = () => {
    const router = useRouter();
    const {
        canNavigateToAlgorithm,
        isAlgorithmUnlocked,
        getAlgorithmStatus
    } = useLearningPath();

    /**
     * Navigate to algorithm with prerequisite checking
     */
    const navigateToAlgorithm = useCallback((algorithmId: string) => {
        const navigationResult = canNavigateToAlgorithm(algorithmId);

        if (navigationResult.allowed) {
            router.push(`/algorithm/${algorithmId}`);
            return true;
        } else {
            // Show lock modal or notification
            console.warn('Navigation blocked:', navigationResult.reason);
            return false;
        }
    }, [canNavigateToAlgorithm, router]);

    /**
     * Check if can navigate to algorithm
     */
    const checkNavigation = useCallback((algorithmId: string) => {
        return canNavigateToAlgorithm(algorithmId);
    }, [canNavigateToAlgorithm]);

    /**
     * Get algorithm lock status
     */
    const getAlgorithmLockStatus = useCallback((algorithmId: string) => {
        const unlocked = isAlgorithmUnlocked(algorithmId);
        const status = getAlgorithmStatus(algorithmId);
        const navigationResult = canNavigateToAlgorithm(algorithmId);

        return {
            unlocked,
            status,
            canNavigate: navigationResult.allowed,
            reason: navigationResult.reason,
            missingPrerequisites: navigationResult.missingPrerequisites
        };
    }, [isAlgorithmUnlocked, getAlgorithmStatus, canNavigateToAlgorithm]);

    return {
        navigateToAlgorithm,
        checkNavigation,
        getAlgorithmLockStatus
    };
};
