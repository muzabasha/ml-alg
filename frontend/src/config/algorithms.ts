/**
 * Algorithm configuration with prerequisite relationships
 * 
 * This file defines all 11 ML algorithms, their metadata, prerequisites,
 * and workflow step details for the learning path system.
 */

import {
    Algorithm,
    DifficultyLevel,
    WorkflowStep,
    StepMetadata
} from '../types/learning-path';

/**
 * Prerequisite relationships between algorithms
 * Key: algorithm ID, Value: array of prerequisite algorithm IDs
 */
export const ALGORITHM_PREREQUISITES: Record<string, string[]> = {
    // Beginner algorithms - no prerequisites
    'linear_regression': [],
    'logistic_regression': [],
    'knn': [],
    'kmeans': [],
    'naive_bayes': [],

    // Intermediate algorithms - require all Beginner completed
    'decision_tree': ['linear_regression', 'logistic_regression', 'knn', 'kmeans', 'naive_bayes'],
    'svm': ['linear_regression', 'logistic_regression', 'knn', 'kmeans', 'naive_bayes'],

    // Advanced algorithms - require all Intermediate completed
    'ann': ['decision_tree', 'svm'],
    'cnn': ['decision_tree', 'svm'],
    'rnn': ['decision_tree', 'svm'],
    'transformer': ['decision_tree', 'svm'],
};

/**
 * Common workflow step metadata
 */
const WORKFLOW_STEP_METADATA: Record<WorkflowStep, StepMetadata> = {
    [WorkflowStep.Introduction]: {
        title: 'Introduction',
        description: 'Learn the algorithm overview and use cases',
        estimatedTime: 15
    },
    [WorkflowStep.Mathematics]: {
        title: 'Mathematics',
        description: 'Understand the mathematical foundations',
        estimatedTime: 30
    },
    [WorkflowStep.Intuition]: {
        title: 'Intuition',
        description: 'Build intuitive understanding with examples',
        estimatedTime: 20
    },
    [WorkflowStep.Implementation]: {
        title: 'Implementation',
        description: 'See the algorithm implemented in code',
        estimatedTime: 25
    },
    [WorkflowStep.Visualization]: {
        title: 'Visualization',
        description: 'Visualize the algorithm in action',
        estimatedTime: 20
    },
    [WorkflowStep.Practice]: {
        title: 'Practice',
        description: 'Test your understanding with challenges',
        estimatedTime: 15
    }
};

/**
 * Complete algorithm configuration
 */
export const ALGORITHMS: Record<string, Algorithm> = {
    'linear_regression': {
        id: 'linear_regression',
        name: 'Linear Regression',
        difficulty: DifficultyLevel.Beginner,
        category: 'Regression',
        mathFocus: 'Optimization & Gradients',
        prerequisites: ALGORITHM_PREREQUISITES['linear_regression'],
        estimatedTime: 140,
        steps: WORKFLOW_STEP_METADATA
    },
    'logistic_regression': {
        id: 'logistic_regression',
        name: 'Logistic Regression',
        difficulty: DifficultyLevel.Beginner,
        category: 'Classification',
        mathFocus: 'Log-Odds & MLE',
        prerequisites: ALGORITHM_PREREQUISITES['logistic_regression'],
        estimatedTime: 140,
        steps: WORKFLOW_STEP_METADATA
    },
    'knn': {
        id: 'knn',
        name: 'k-Nearest Neighbors',
        difficulty: DifficultyLevel.Beginner,
        category: 'Classification',
        mathFocus: 'Distance Metrics',
        prerequisites: ALGORITHM_PREREQUISITES['knn'],
        estimatedTime: 120,
        steps: WORKFLOW_STEP_METADATA
    },
    'kmeans': {
        id: 'kmeans',
        name: 'K-Means Clustering',
        difficulty: DifficultyLevel.Beginner,
        category: 'Clustering',
        mathFocus: 'Centroid Minimization',
        prerequisites: ALGORITHM_PREREQUISITES['kmeans'],
        estimatedTime: 120,
        steps: WORKFLOW_STEP_METADATA
    },
    'naive_bayes': {
        id: 'naive_bayes',
        name: 'Naive Bayes Classifier',
        difficulty: DifficultyLevel.Beginner,
        category: 'Classification',
        mathFocus: 'Conditional Probability',
        prerequisites: ALGORITHM_PREREQUISITES['naive_bayes'],
        estimatedTime: 130,
        steps: WORKFLOW_STEP_METADATA
    },
    'decision_tree': {
        id: 'decision_tree',
        name: 'Decision Tree',
        difficulty: DifficultyLevel.Intermediate,
        category: 'Classification',
        mathFocus: 'Information Entropy',
        prerequisites: ALGORITHM_PREREQUISITES['decision_tree'],
        estimatedTime: 150,
        steps: WORKFLOW_STEP_METADATA
    },
    'svm': {
        id: 'svm',
        name: 'Support Vector Machine',
        difficulty: DifficultyLevel.Advanced,
        category: 'Classification',
        mathFocus: 'Lagrange Multipliers',
        prerequisites: ALGORITHM_PREREQUISITES['svm'],
        estimatedTime: 180,
        steps: WORKFLOW_STEP_METADATA
    },
    'ann': {
        id: 'ann',
        name: 'Artificial Neural Network',
        difficulty: DifficultyLevel.Intermediate,
        category: 'Deep Learning',
        mathFocus: 'Backpropagation Calculus',
        prerequisites: ALGORITHM_PREREQUISITES['ann'],
        estimatedTime: 200,
        steps: WORKFLOW_STEP_METADATA
    },
    'cnn': {
        id: 'cnn',
        name: 'Convolutional Neural Network',
        difficulty: DifficultyLevel.Advanced,
        category: 'Computer Vision',
        mathFocus: 'Kernel Tensors',
        prerequisites: ALGORITHM_PREREQUISITES['cnn'],
        estimatedTime: 220,
        steps: WORKFLOW_STEP_METADATA
    },
    'rnn': {
        id: 'rnn',
        name: 'Recurrent Neural Network',
        difficulty: DifficultyLevel.Advanced,
        category: 'Sequential Data',
        mathFocus: 'Recurrence Relations',
        prerequisites: ALGORITHM_PREREQUISITES['rnn'],
        estimatedTime: 220,
        steps: WORKFLOW_STEP_METADATA
    },
    'transformer': {
        id: 'transformer',
        name: 'Transformer Network',
        difficulty: DifficultyLevel.Advanced,
        category: 'Attention-Based',
        mathFocus: 'Attention Scaled Dot-Product',
        prerequisites: ALGORITHM_PREREQUISITES['transformer'],
        estimatedTime: 240,
        steps: WORKFLOW_STEP_METADATA
    }
};

/**
 * Get algorithms by difficulty level
 */
export function getAlgorithmsByDifficulty(difficulty: DifficultyLevel): Algorithm[] {
    return Object.values(ALGORITHMS).filter(algo => algo.difficulty === difficulty);
}

/**
 * Get algorithm by ID
 */
export function getAlgorithmById(id: string): Algorithm | undefined {
    return ALGORITHMS[id];
}

/**
 * Get all algorithm IDs
 */
export function getAllAlgorithmIds(): string[] {
    return Object.keys(ALGORITHMS);
}

/**
 * Get beginner algorithm IDs
 */
export function getBeginnerAlgorithmIds(): string[] {
    return getAlgorithmsByDifficulty(DifficultyLevel.Beginner).map(a => a.id);
}

/**
 * Get intermediate algorithm IDs
 */
export function getIntermediateAlgorithmIds(): string[] {
    return getAlgorithmsByDifficulty(DifficultyLevel.Intermediate).map(a => a.id);
}

/**
 * Get advanced algorithm IDs
 */
export function getAdvancedAlgorithmIds(): string[] {
    return getAlgorithmsByDifficulty(DifficultyLevel.Advanced).map(a => a.id);
}

/**
 * Check if algorithm exists
 */
export function algorithmExists(id: string): boolean {
    return id in ALGORITHMS;
}
