/**
 * Learning Path Context - React Context for learning path state management
 * 
 * This context provides access to all learning path functionality throughout
 * the application, including progress tracking, recommendations, achievements,
 * and assessments.
 */

import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import {
    StudentProgress,
    Algorithm,
    Recommendation,
    Achievement,
    LearningStats,
    Challenge,
    ChallengeResponse,
    AssessmentResult,
    OverallProgress,
    MasteryStatus,
    WorkflowStep,
    DifficultyLevel,
    Certificate,
    CertificateType,
    SYNC_DEBOUNCE_MS
} from '../types/learning-path';
import { ProgressTracker } from '../lib/ProgressTracker';
import { LearningPathManager } from '../lib/LearningPathManager';
import { RecommendationEngine } from '../lib/RecommendationEngine';
import { AchievementSystem } from '../lib/AchievementSystem';
import { SkillAssessmentManager } from '../lib/SkillAssessmentManager';

/**
 * Notification callback type for unlock events
 */
export type UnlockNotificationCallback = (algorithmIds: string[]) => void;

/**
 * Learning Path Context value interface
 */
interface LearningPathContextValue {
    // State
    isInitialized: boolean;
    studentId: string;

    // Progress tracking
    markStepComplete: (algorithmId: string, step: WorkflowStep) => void;
    getAlgorithmStatus: (algorithmId: string) => MasteryStatus;
    getAlgorithmProgress: (algorithmId: string) => number;
    getOverallProgress: () => OverallProgress;
    getCurrentStreak: () => number;

    // Algorithm access
    isAlgorithmUnlocked: (algorithmId: string) => boolean;
    canNavigateToAlgorithm: (algorithmId: string) => { allowed: boolean; reason?: string; missingPrerequisites?: string[] };
    getAlgorithmsByDifficulty: (level: DifficultyLevel) => Algorithm[];
    getAllAlgorithmsWithStatus: () => Array<Algorithm & { locked: boolean; status: MasteryStatus }>;

    // Recommendations
    getNextRecommendation: () => Recommendation;
    getSuggestedAlgorithms: (count?: number) => Algorithm[];
    getPersonalizedTips: () => string[];

    // Achievements
    getEarnedAchievements: () => Achievement[];
    getLockedAchievements: () => Achievement[];
    getTotalPoints: () => number;
    getLearningStats: () => LearningStats;
    checkForNewAchievements: () => Achievement[];

    // Challenges
    getChallengeForAlgorithm: (algorithmId: string) => Challenge | null;
    submitChallengeResponse: (challengeId: string, response: ChallengeResponse) => AssessmentResult;
    getChallengeHistory: (algorithmId: string) => any[];
    getPerformanceScore: (algorithmId: string) => number;

    // Certificates
    generateCertificate: (type: CertificateType, studentName?: string) => Certificate;
    getCertificates: () => Certificate[];
    isEligibleForCertificate: (type: CertificateType) => boolean;

    // Onboarding
    isOnboardingComplete: () => boolean;
    markOnboardingComplete: () => void;

    // Sync
    syncProgress: () => Promise<void>;
    refreshData: () => void;
}

/**
 * Create context with undefined default
 */
const LearningPathContext = createContext<LearningPathContextValue | undefined>(undefined);

/**
 * Learning Path Provider Props
 */
interface LearningPathProviderProps {
    children: ReactNode;
    studentId?: string;
    onProgressSync?: (progress: StudentProgress) => Promise<void>;
    onUnlockNotification?: UnlockNotificationCallback;
    onAchievementNotification?: (achievements: Achievement[]) => void;
}

/**
 * Learning Path Provider Component
 */
export const LearningPathProvider: React.FC<LearningPathProviderProps> = ({
    children,
    studentId = 'default_student',
    onProgressSync,
    onUnlockNotification,
    onAchievementNotification
}) => {
    const [isInitialized, setIsInitialized] = useState(false);
    const [progressTracker, setProgressTracker] = useState<ProgressTracker | null>(null);
    const [learningPathManager, setLearningPathManager] = useState<LearningPathManager | null>(null);
    const [recommendationEngine, setRecommendationEngine] = useState<RecommendationEngine | null>(null);
    const [achievementSystem, setAchievementSystem] = useState<AchievementSystem | null>(null);
    const [assessmentManager, setAssessmentManager] = useState<SkillAssessmentManager | null>(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    /**
     * Initialize all managers
     */
    useEffect(() => {
        const initializeManagers = async () => {
            try {
                // Create debounced sync callback
                let syncTimeout: NodeJS.Timeout;
                const debouncedSync = async (progress: StudentProgress) => {
                    clearTimeout(syncTimeout);
                    syncTimeout = setTimeout(async () => {
                        if (onProgressSync) {
                            try {
                                await onProgressSync(progress);
                            } catch (error) {
                                console.error('Failed to sync progress:', error);
                            }
                        }
                    }, SYNC_DEBOUNCE_MS);
                };

                // Try to load from localStorage first
                let tracker = ProgressTracker.loadFromLocalStorage(studentId);

                if (!tracker) {
                    // Create new tracker if none exists
                    tracker = new ProgressTracker(studentId, debouncedSync);
                } else {
                    // Set sync callback for loaded tracker
                    tracker = new ProgressTracker(studentId, debouncedSync);
                    const existingProgress = ProgressTracker.loadFromLocalStorage(studentId);
                    if (existingProgress) {
                        tracker.loadProgress(existingProgress.getAllProgress());
                    }
                }

                // Initialize all managers
                const pathManager = new LearningPathManager(tracker);
                const prerequisiteEngine = pathManager.getPrerequisiteEngine();
                const recEngine = new RecommendationEngine(tracker, prerequisiteEngine);
                const achSystem = new AchievementSystem(tracker);
                const assessManager = new SkillAssessmentManager(tracker);

                // Set state
                setProgressTracker(tracker);
                setLearningPathManager(pathManager);
                setRecommendationEngine(recEngine);
                setAchievementSystem(achSystem);
                setAssessmentManager(assessManager);
                setIsInitialized(true);

                console.log('Learning Path system initialized successfully');
            } catch (error) {
                console.error('Failed to initialize Learning Path system:', error);
            }
        };

        initializeManagers();
    }, [studentId, onProgressSync]);

    /**
     * Refresh data trigger
     */
    const refreshData = useCallback(() => {
        setRefreshTrigger(prev => prev + 1);
    }, []);

    /**
     * Progress tracking methods
     */
    const markStepComplete = useCallback((algorithmId: string, step: WorkflowStep) => {
        if (!progressTracker) return;

        progressTracker.markStepComplete(algorithmId, step);

        // Check for new achievements
        if (achievementSystem) {
            const newAchievements = achievementSystem.checkForNewAchievements();
            if (newAchievements.length > 0) {
                console.log('New achievements earned:', newAchievements);
                // Trigger achievement notification callback
                if (onAchievementNotification) {
                    onAchievementNotification(newAchievements);
                }
            }
        }

        // Check for newly unlocked algorithms
        if (learningPathManager) {
            const status = progressTracker.getAlgorithmStatus(algorithmId);
            if (status === MasteryStatus.Completed) {
                const newUnlocks = learningPathManager.handleAlgorithmCompletion(algorithmId);
                if (newUnlocks.length > 0) {
                    console.log('New algorithms unlocked:', newUnlocks);
                    // Trigger unlock notification callback
                    if (onUnlockNotification) {
                        onUnlockNotification(newUnlocks);
                    }
                }
            }
        }

        refreshData();
    }, [progressTracker, achievementSystem, learningPathManager, refreshData, onUnlockNotification, onAchievementNotification]);

    const getAlgorithmStatus = useCallback((algorithmId: string): MasteryStatus => {
        if (!progressTracker) return MasteryStatus.NotStarted;
        return progressTracker.getAlgorithmStatus(algorithmId);
    }, [progressTracker, refreshTrigger]);

    const getAlgorithmProgress = useCallback((algorithmId: string): number => {
        if (!progressTracker) return 0;
        return progressTracker.getAlgorithmCompletionPercentage(algorithmId);
    }, [progressTracker, refreshTrigger]);

    const getOverallProgress = useCallback((): OverallProgress => {
        if (!progressTracker) {
            return {
                totalSteps: 66,
                completedSteps: 0,
                percentage: 0,
                algorithmProgress: new Map()
            };
        }
        return progressTracker.getOverallProgress();
    }, [progressTracker, refreshTrigger]);

    const getCurrentStreak = useCallback((): number => {
        if (!progressTracker) return 0;
        return progressTracker.getCurrentStreak();
    }, [progressTracker, refreshTrigger]);

    /**
     * Algorithm access methods
     */
    const isAlgorithmUnlocked = useCallback((algorithmId: string): boolean => {
        if (!learningPathManager) return false;
        return learningPathManager.isAlgorithmUnlocked(algorithmId);
    }, [learningPathManager, refreshTrigger]);

    const canNavigateToAlgorithm = useCallback((algorithmId: string) => {
        if (!learningPathManager) {
            return { allowed: false, reason: 'System not initialized' };
        }
        return learningPathManager.canNavigateToAlgorithm(algorithmId);
    }, [learningPathManager, refreshTrigger]);

    const getAlgorithmsByDifficulty = useCallback((level: DifficultyLevel): Algorithm[] => {
        if (!learningPathManager) return [];
        return learningPathManager.getAlgorithmsByDifficulty(level);
    }, [learningPathManager]);

    const getAllAlgorithmsWithStatus = useCallback(() => {
        if (!learningPathManager) return [];
        return learningPathManager.getAllAlgorithmsWithStatus();
    }, [learningPathManager, refreshTrigger]);

    /**
     * Recommendation methods
     */
    const getNextRecommendation = useCallback((): Recommendation => {
        if (!recommendationEngine) {
            return {
                type: 'algorithm' as any,
                algorithmId: 'linear_regression',
                reason: 'Start your ML journey',
                priority: 'high' as any
            };
        }
        return recommendationEngine.getNextRecommendation();
    }, [recommendationEngine, refreshTrigger]);

    const getSuggestedAlgorithms = useCallback((count: number = 3): Algorithm[] => {
        if (!recommendationEngine) return [];
        return recommendationEngine.getSuggestedAlgorithms(count);
    }, [recommendationEngine, refreshTrigger]);

    const getPersonalizedTips = useCallback((): string[] => {
        if (!recommendationEngine) return [];
        return recommendationEngine.getPersonalizedTips();
    }, [recommendationEngine, refreshTrigger]);

    /**
     * Achievement methods
     */
    const getEarnedAchievements = useCallback((): Achievement[] => {
        if (!achievementSystem) return [];
        return achievementSystem.getEarnedAchievements();
    }, [achievementSystem, refreshTrigger]);

    const getLockedAchievements = useCallback((): Achievement[] => {
        if (!achievementSystem) return [];
        return achievementSystem.getLockedAchievements();
    }, [achievementSystem, refreshTrigger]);

    const getTotalPoints = useCallback((): number => {
        if (!achievementSystem) return 0;
        return achievementSystem.getTotalPoints();
    }, [achievementSystem, refreshTrigger]);

    const getLearningStats = useCallback((): LearningStats => {
        if (!achievementSystem) {
            return {
                totalAlgorithmsCompleted: 0,
                totalStepsCompleted: 0,
                totalChallengesCompleted: 0,
                currentStreak: 0,
                longestStreak: 0,
                totalTimeSpent: 0,
                averageCompletionTime: 0
            };
        }
        return achievementSystem.getLearningStats();
    }, [achievementSystem, refreshTrigger]);

    const checkForNewAchievements = useCallback((): Achievement[] => {
        if (!achievementSystem) return [];
        return achievementSystem.checkForNewAchievements();
    }, [achievementSystem, refreshTrigger]);

    /**
     * Challenge methods
     */
    const getChallengeForAlgorithm = useCallback((algorithmId: string): Challenge | null => {
        if (!assessmentManager) return null;
        return assessmentManager.getChallengeForAlgorithm(algorithmId);
    }, [assessmentManager]);

    const submitChallengeResponse = useCallback((
        challengeId: string,
        response: ChallengeResponse
    ): AssessmentResult => {
        if (!assessmentManager) {
            return {
                correct: false,
                score: 0,
                feedback: 'Assessment system not initialized',
                explanation: ''
            };
        }

        const result = assessmentManager.submitChallengeResponse(challengeId, response);

        // Check for new achievements after challenge completion
        if (result.correct && achievementSystem) {
            const newAchievements = achievementSystem.checkForNewAchievements();
            if (newAchievements.length > 0) {
                console.log('New achievements earned:', newAchievements);
            }
        }

        refreshData();
        return result;
    }, [assessmentManager, achievementSystem, refreshData]);

    const getChallengeHistory = useCallback((algorithmId: string) => {
        if (!assessmentManager) return [];
        return assessmentManager.getChallengeHistory(algorithmId);
    }, [assessmentManager, refreshTrigger]);

    const getPerformanceScore = useCallback((algorithmId: string): number => {
        if (!assessmentManager) return 0;
        return assessmentManager.getPerformanceScore(algorithmId);
    }, [assessmentManager, refreshTrigger]);

    /**
     * Certificate methods
     */
    const generateCertificate = useCallback((
        type: CertificateType,
        studentName: string = 'Student'
    ): Certificate => {
        if (!achievementSystem) {
            throw new Error('Achievement system not initialized');
        }
        const certificate = achievementSystem.generateCertificate(type, studentName);
        refreshData();
        return certificate;
    }, [achievementSystem, refreshData]);

    const getCertificates = useCallback((): Certificate[] => {
        if (!achievementSystem) return [];
        return achievementSystem.getCertificates();
    }, [achievementSystem, refreshTrigger]);

    const isEligibleForCertificate = useCallback((type: CertificateType): boolean => {
        if (!achievementSystem) return false;
        return achievementSystem.isEligibleForCertificate(type);
    }, [achievementSystem, refreshTrigger]);

    /**
     * Onboarding methods
     */
    const isOnboardingComplete = useCallback((): boolean => {
        if (!progressTracker) return false;
        return progressTracker.getAllProgress().onboardingComplete;
    }, [progressTracker, refreshTrigger]);

    const markOnboardingComplete = useCallback(() => {
        if (!progressTracker) return;
        const progress = progressTracker.getAllProgress();
        progress.onboardingComplete = true;
        refreshData();
    }, [progressTracker, refreshData]);

    /**
     * Sync methods
     */
    const syncProgress = useCallback(async () => {
        if (!progressTracker) return;
        await progressTracker.syncProgress();
    }, [progressTracker]);

    /**
     * Context value
     */
    const value: LearningPathContextValue = {
        isInitialized,
        studentId,

        // Progress tracking
        markStepComplete,
        getAlgorithmStatus,
        getAlgorithmProgress,
        getOverallProgress,
        getCurrentStreak,

        // Algorithm access
        isAlgorithmUnlocked,
        canNavigateToAlgorithm,
        getAlgorithmsByDifficulty,
        getAllAlgorithmsWithStatus,

        // Recommendations
        getNextRecommendation,
        getSuggestedAlgorithms,
        getPersonalizedTips,

        // Achievements
        getEarnedAchievements,
        getLockedAchievements,
        getTotalPoints,
        getLearningStats,
        checkForNewAchievements,

        // Challenges
        getChallengeForAlgorithm,
        submitChallengeResponse,
        getChallengeHistory,
        getPerformanceScore,

        // Certificates
        generateCertificate,
        getCertificates,
        isEligibleForCertificate,

        // Onboarding
        isOnboardingComplete,
        markOnboardingComplete,

        // Sync
        syncProgress,
        refreshData
    };

    return (
        <LearningPathContext.Provider value={value}>
            {children}
        </LearningPathContext.Provider>
    );
};

/**
 * Hook to use Learning Path context
 */
export const useLearningPath = (): LearningPathContextValue => {
    const context = useContext(LearningPathContext);

    if (context === undefined) {
        throw new Error('useLearningPath must be used within a LearningPathProvider');
    }

    return context;
};

/**
 * Hook to use progress tracking
 */
export const useProgress = () => {
    const {
        markStepComplete,
        getAlgorithmStatus,
        getAlgorithmProgress,
        getOverallProgress,
        getCurrentStreak
    } = useLearningPath();

    return {
        markStepComplete,
        getAlgorithmStatus,
        getAlgorithmProgress,
        getOverallProgress,
        getCurrentStreak
    };
};

/**
 * Hook to use recommendations
 */
export const useRecommendations = () => {
    const {
        getNextRecommendation,
        getSuggestedAlgorithms,
        getPersonalizedTips
    } = useLearningPath();

    return {
        getNextRecommendation,
        getSuggestedAlgorithms,
        getPersonalizedTips
    };
};

/**
 * Hook to use achievements
 */
export const useAchievements = () => {
    const {
        getEarnedAchievements,
        getLockedAchievements,
        getTotalPoints,
        getLearningStats,
        checkForNewAchievements
    } = useLearningPath();

    return {
        getEarnedAchievements,
        getLockedAchievements,
        getTotalPoints,
        getLearningStats,
        checkForNewAchievements
    };
};

/**
 * Hook to use challenges
 */
export const useChallenges = () => {
    const {
        getChallengeForAlgorithm,
        submitChallengeResponse,
        getChallengeHistory,
        getPerformanceScore
    } = useLearningPath();

    return {
        getChallengeForAlgorithm,
        submitChallengeResponse,
        getChallengeHistory,
        getPerformanceScore
    };
};
