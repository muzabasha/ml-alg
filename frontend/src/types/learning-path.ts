/**
 * Core type definitions for the Student Learning Path system
 * 
 * This file contains all TypeScript interfaces, types, and enums used throughout
 * the learning path feature for type safety and consistency.
 */

// ============================================================================
// Enums
// ============================================================================

/**
 * Difficulty levels for ML algorithms
 */
export enum DifficultyLevel {
    Beginner = 'Beginner',
    Intermediate = 'Intermediate',
    Advanced = 'Advanced'
}

/**
 * Student's mastery status for an algorithm
 */
export enum MasteryStatus {
    NotStarted = 'not_started',
    InProgress = 'in_progress',
    Completed = 'completed',
    Mastered = 'mastered'
}

/**
 * The 6-step ML workflow stages
 */
export enum WorkflowStep {
    Introduction = 'introduction',
    Mathematics = 'mathematics',
    Intuition = 'intuition',
    Implementation = 'implementation',
    Visualization = 'visualization',
    Practice = 'practice'
}

/**
 * Types of recommendations the system can make
 */
export enum RecommendationType {
    Algorithm = 'algorithm',
    Challenge = 'challenge',
    Review = 'review'
}

/**
 * Priority levels for recommendations
 */
export enum RecommendationPriority {
    High = 'high',
    Medium = 'medium',
    Low = 'low'
}

/**
 * Achievement categories
 */
export enum AchievementCategory {
    Milestone = 'milestone',
    Streak = 'streak',
    Mastery = 'mastery',
    Challenge = 'challenge'
}

/**
 * Certificate types
 */
export enum CertificateType {
    BeginnerComplete = 'beginner_complete',
    IntermediateComplete = 'intermediate_complete',
    AdvancedComplete = 'advanced_complete',
    MasterComplete = 'master_complete'
}

/**
 * Challenge types
 */
export enum ChallengeType {
    MultipleChoice = 'multiple_choice',
    Code = 'code',
    ParameterTuning = 'parameter_tuning'
}

/**
 * Challenge difficulty
 */
export enum ChallengeDifficulty {
    Easy = 'easy',
    Medium = 'medium',
    Hard = 'hard'
}

/**
 * Activity types for tracking
 */
export enum ActivityType {
    AlgorithmComplete = 'algorithm_complete',
    StepComplete = 'step_complete',
    ChallengeComplete = 'challenge_complete',
    AchievementEarned = 'achievement_earned'
}

// ============================================================================
// Core Interfaces
// ============================================================================

/**
 * Algorithm configuration and metadata
 */
export interface Algorithm {
    id: string;
    name: string;
    difficulty: DifficultyLevel;
    category: string;
    mathFocus: string;
    prerequisites: string[];
    estimatedTime: number; // minutes
    steps: Record<WorkflowStep, StepMetadata>;
}

/**
 * Metadata for each workflow step
 */
export interface StepMetadata {
    title: string;
    description: string;
    estimatedTime: number; // minutes
}

/**
 * Navigation result for algorithm access
 */
export interface NavigationResult {
    allowed: boolean;
    reason?: string;
    missingPrerequisites?: string[];
}

/**
 * Step completion progress for an algorithm
 */
export interface StepProgress {
    [WorkflowStep.Theory]: boolean;
    [WorkflowStep.Dataset]: boolean;
    [WorkflowStep.EDA]: boolean;
    [WorkflowStep.Preprocessing]: boolean;
    [WorkflowStep.FeatureEngineering]: boolean;
    [WorkflowStep.TrainEvaluate]: boolean;
}

/**
 * Progress data for a single algorithm
 */
export interface AlgorithmProgress {
    algorithmId: string;
    status: MasteryStatus;
    completedSteps: WorkflowStep[];
    completionPercentage: number;
    lastAccessedDate: Date;
    timeSpent: number; // minutes
    challengeAttempts: ChallengeAttempt[];
    challengeCompleted: boolean;
}

/**
 * Overall progress across all algorithms
 */
export interface OverallProgress {
    totalSteps: number;
    completedSteps: number;
    percentage: number;
    algorithmProgress: Map<string, AlgorithmProgress>;
}

/**
 * Complete student progress data
 */
export interface StudentProgress {
    studentId: string;
    onboardingComplete: boolean;
    lastAccessDate: Date;
    totalTimeSpent: number; // minutes
    algorithmProgress: Record<string, AlgorithmProgress>;
    achievements: Record<string, AchievementRecord>;
    dailyActivity: Record<string, DailyActivity>; // YYYY-MM-DD format
    certificates: Certificate[];
}

/**
 * Daily activity tracking
 */
export interface DailyActivity {
    stepsCompleted: number;
    timeSpent: number; // minutes
    algorithmsAccessed: string[];
}

/**
 * Achievement record
 */
export interface AchievementRecord {
    earnedDate: Date;
    points: number;
}

/**
 * Dependency graph structure
 */
export interface DependencyGraph {
    nodes: Algorithm[];
    edges: PrerequisiteEdge[];
}

/**
 * Prerequisite relationship edge
 */
export interface PrerequisiteEdge {
    from: string; // prerequisite algorithm ID
    to: string;   // dependent algorithm ID
}

/**
 * Learning recommendation
 */
export interface Recommendation {
    type: RecommendationType;
    algorithmId?: string;
    challengeId?: string;
    reason: string;
    priority: RecommendationPriority;
}

/**
 * Achievement definition
 */
export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    points: number;
    category: AchievementCategory;
    unlockCondition: string;
    unlockRequirement?: string;
    earned?: boolean;
    earnedDate?: Date;
}

/**
 * Learning statistics
 */
export interface LearningStats {
    totalAlgorithmsCompleted: number;
    totalStepsCompleted: number;
    totalChallengesCompleted: number;
    currentStreak: number;
    longestStreak: number;
    totalTimeSpent: number; // minutes
    averageCompletionTime: number; // minutes per algorithm
}

/**
 * Certificate data
 */
export interface Certificate {
    id: string;
    type: CertificateType;
    studentName: string;
    issueDate: Date;
    certificateNumber: string;
    downloadUrl: string;
    shareUrl: string;
}

/**
 * Practice challenge
 */
export interface Challenge {
    id: string;
    algorithmId: string;
    type: ChallengeType;
    question: string;
    options: string[];
    correctAnswer: string;
    hint?: string;
    explanation?: string;
    difficulty: ChallengeDifficulty;
}

/**
 * Challenge response submission
 */
export interface ChallengeResponse {
    challengeId: string;
    selectedAnswer: string;
    timeSpent: number; // seconds
}

/**
 * Challenge assessment result
 */
export interface AssessmentResult {
    correct: boolean;
    score: number;
    feedback: string;
    hints?: string[];
    explanation: string;
}

/**
 * Challenge attempt record
 */
export interface ChallengeAttempt {
    challengeId: string;
    algorithmId: string;
    timestamp: Date;
    correct: boolean;
    timeSpent: number; // seconds
    hintsUsed: number;
}

/**
 * Onboarding tutorial step
 */
export interface OnboardingStep {
    id: string;
    title: string;
    description: string;
    targetElement?: string; // CSS selector
    position: 'top' | 'bottom' | 'left' | 'right';
    action?: 'click' | 'scroll' | 'none';
}

/**
 * Activity item for recent activity feed
 */
export interface ActivityItem {
    type: ActivityType;
    timestamp: Date;
    description: string;
    algorithmId?: string;
    achievementId?: string;
}

/**
 * Dashboard data aggregation
 */
export interface DashboardData {
    overallProgress: OverallProgress;
    nextRecommendation: Recommendation;
    recentActivity: ActivityItem[];
    earnedAchievements: Achievement[];
    learningStats: LearningStats;
    algorithmsByDifficulty: {
        beginner: AlgorithmProgress[];
        intermediate: AlgorithmProgress[];
        advanced: AlgorithmProgress[];
    };
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Serializable version of StudentProgress for storage
 */
export interface SerializableStudentProgress extends Omit<StudentProgress, 'lastAccessDate' | 'algorithmProgress' | 'achievements' | 'dailyActivity'> {
    lastAccessDate: string;
    algorithmProgress: Record<string, SerializableAlgorithmProgress>;
    achievements: Record<string, SerializableAchievementRecord>;
    dailyActivity: Record<string, DailyActivity>;
}

/**
 * Serializable version of AlgorithmProgress
 */
export interface SerializableAlgorithmProgress extends Omit<AlgorithmProgress, 'lastAccessedDate' | 'challengeAttempts'> {
    lastAccessedDate: string;
    challengeAttempts: SerializableChallengeAttempt[];
}

/**
 * Serializable version of AchievementRecord
 */
export interface SerializableAchievementRecord extends Omit<AchievementRecord, 'earnedDate'> {
    earnedDate: string;
}

/**
 * Serializable version of ChallengeAttempt
 */
export interface SerializableChallengeAttempt extends Omit<ChallengeAttempt, 'timestamp'> {
    timestamp: string;
}

// ============================================================================
// Constants
// ============================================================================

/**
 * Total number of workflow steps
 */
export const TOTAL_WORKFLOW_STEPS = 6;

/**
 * Total number of algorithms
 */
export const TOTAL_ALGORITHMS = 11;

/**
 * Minimum challenge completion percentage required to unlock next difficulty level
 */
export const MIN_CHALLENGE_COMPLETION_PERCENTAGE = 0.8; // 80%

/**
 * Debounce time for backend sync (milliseconds)
 */
export const SYNC_DEBOUNCE_MS = 500;

/**
 * LocalStorage key for progress data
 */
export const PROGRESS_STORAGE_KEY = 'ml_learning_path_progress';

/**
 * LocalStorage key for onboarding status
 */
export const ONBOARDING_STORAGE_KEY = 'ml_learning_path_onboarding';
