/**
 * JSON Schema definitions for Student Learning Path data validation
 * 
 * These schemas validate data structures for progress tracking, achievements,
 * and other learning path data to ensure data integrity.
 */

import {
    MasteryStatus,
    WorkflowStep,
    DifficultyLevel,
    ChallengeType,
    ChallengeDifficulty,
    AchievementCategory,
    CertificateType,
    ActivityType,
    RecommendationType,
    RecommendationPriority
} from '../types/learning-path';

/**
 * Schema for validating WorkflowStep values
 */
export const workflowStepSchema = {
    type: 'string',
    enum: Object.values(WorkflowStep)
};

/**
 * Schema for validating MasteryStatus values
 */
export const masteryStatusSchema = {
    type: 'string',
    enum: Object.values(MasteryStatus)
};

/**
 * Schema for validating DifficultyLevel values
 */
export const difficultyLevelSchema = {
    type: 'string',
    enum: Object.values(DifficultyLevel)
};

/**
 * Schema for validating ChallengeAttempt
 */
export const challengeAttemptSchema = {
    type: 'object',
    required: ['challengeId', 'algorithmId', 'timestamp', 'correct', 'timeSpent', 'hintsUsed'],
    properties: {
        challengeId: { type: 'string' },
        algorithmId: { type: 'string' },
        timestamp: { type: 'string', format: 'date-time' },
        correct: { type: 'boolean' },
        timeSpent: { type: 'number', minimum: 0 },
        hintsUsed: { type: 'number', minimum: 0 }
    }
};

/**
 * Schema for validating AlgorithmProgress
 */
export const algorithmProgressSchema = {
    type: 'object',
    required: [
        'algorithmId',
        'status',
        'completedSteps',
        'completionPercentage',
        'lastAccessedDate',
        'timeSpent',
        'challengeAttempts',
        'challengeCompleted'
    ],
    properties: {
        algorithmId: { type: 'string' },
        status: masteryStatusSchema,
        completedSteps: {
            type: 'array',
            items: workflowStepSchema
        },
        completionPercentage: {
            type: 'number',
            minimum: 0,
            maximum: 100
        },
        lastAccessedDate: { type: 'string', format: 'date-time' },
        timeSpent: { type: 'number', minimum: 0 },
        challengeAttempts: {
            type: 'array',
            items: challengeAttemptSchema
        },
        challengeCompleted: { type: 'boolean' }
    }
};

/**
 * Schema for validating AchievementRecord
 */
export const achievementRecordSchema = {
    type: 'object',
    required: ['earnedDate', 'points'],
    properties: {
        earnedDate: { type: 'string', format: 'date-time' },
        points: { type: 'number', minimum: 0 }
    }
};

/**
 * Schema for validating DailyActivity
 */
export const dailyActivitySchema = {
    type: 'object',
    required: ['stepsCompleted', 'timeSpent', 'algorithmsAccessed'],
    properties: {
        stepsCompleted: { type: 'number', minimum: 0 },
        timeSpent: { type: 'number', minimum: 0 },
        algorithmsAccessed: {
            type: 'array',
            items: { type: 'string' }
        }
    }
};

/**
 * Schema for validating Certificate
 */
export const certificateSchema = {
    type: 'object',
    required: ['id', 'type', 'studentName', 'issueDate', 'certificateNumber', 'downloadUrl', 'shareUrl'],
    properties: {
        id: { type: 'string' },
        type: {
            type: 'string',
            enum: Object.values(CertificateType)
        },
        studentName: { type: 'string', minLength: 1 },
        issueDate: { type: 'string', format: 'date-time' },
        certificateNumber: { type: 'string' },
        downloadUrl: { type: 'string', format: 'uri' },
        shareUrl: { type: 'string', format: 'uri' }
    }
};

/**
 * Schema for validating StudentProgress
 */
export const studentProgressSchema = {
    type: 'object',
    required: [
        'studentId',
        'onboardingComplete',
        'lastAccessDate',
        'totalTimeSpent',
        'algorithmProgress',
        'achievements',
        'dailyActivity',
        'certificates'
    ],
    properties: {
        studentId: { type: 'string', minLength: 1 },
        onboardingComplete: { type: 'boolean' },
        lastAccessDate: { type: 'string', format: 'date-time' },
        totalTimeSpent: { type: 'number', minimum: 0 },
        algorithmProgress: {
            type: 'object',
            additionalProperties: algorithmProgressSchema
        },
        achievements: {
            type: 'object',
            additionalProperties: achievementRecordSchema
        },
        dailyActivity: {
            type: 'object',
            additionalProperties: dailyActivitySchema
        },
        certificates: {
            type: 'array',
            items: certificateSchema
        }
    }
};

/**
 * Schema for validating Challenge
 */
export const challengeSchema = {
    type: 'object',
    required: ['id', 'algorithmId', 'type', 'question', 'correctAnswer', 'hints', 'difficulty'],
    properties: {
        id: { type: 'string' },
        algorithmId: { type: 'string' },
        type: {
            type: 'string',
            enum: Object.values(ChallengeType)
        },
        question: { type: 'string', minLength: 1 },
        options: {
            type: 'array',
            items: { type: 'string' }
        },
        correctAnswer: { type: 'string', minLength: 1 },
        hints: {
            type: 'array',
            items: { type: 'string' }
        },
        difficulty: {
            type: 'string',
            enum: Object.values(ChallengeDifficulty)
        }
    }
};

/**
 * Schema for validating Achievement
 */
export const achievementSchema = {
    type: 'object',
    required: ['id', 'title', 'description', 'icon', 'points', 'category', 'unlockCondition'],
    properties: {
        id: { type: 'string' },
        title: { type: 'string', minLength: 1 },
        description: { type: 'string', minLength: 1 },
        icon: { type: 'string', minLength: 1 },
        points: { type: 'number', minimum: 0 },
        category: {
            type: 'string',
            enum: Object.values(AchievementCategory)
        },
        unlockCondition: { type: 'string', minLength: 1 },
        earnedDate: { type: 'string', format: 'date-time' }
    }
};

/**
 * Schema for validating Recommendation
 */
export const recommendationSchema = {
    type: 'object',
    required: ['type', 'reason', 'priority'],
    properties: {
        type: {
            type: 'string',
            enum: Object.values(RecommendationType)
        },
        algorithmId: { type: 'string' },
        challengeId: { type: 'string' },
        reason: { type: 'string', minLength: 1 },
        priority: {
            type: 'string',
            enum: Object.values(RecommendationPriority)
        }
    }
};

/**
 * Validation helper functions
 */

/**
 * Validate data against a schema
 * Returns true if valid, throws error with details if invalid
 */
export function validateData(data: any, schema: any): boolean {
    // Basic type validation
    if (schema.type && typeof data !== schema.type && schema.type !== 'object' && schema.type !== 'array') {
        throw new Error(`Expected type ${schema.type}, got ${typeof data}`);
    }

    // Enum validation
    if (schema.enum && !schema.enum.includes(data)) {
        throw new Error(`Value must be one of: ${schema.enum.join(', ')}`);
    }

    // Number constraints
    if (schema.type === 'number') {
        if (schema.minimum !== undefined && data < schema.minimum) {
            throw new Error(`Value must be >= ${schema.minimum}`);
        }
        if (schema.maximum !== undefined && data > schema.maximum) {
            throw new Error(`Value must be <= ${schema.maximum}`);
        }
    }

    // String constraints
    if (schema.type === 'string') {
        if (schema.minLength !== undefined && data.length < schema.minLength) {
            throw new Error(`String length must be >= ${schema.minLength}`);
        }
    }

    // Object validation
    if (schema.type === 'object' && typeof data === 'object' && data !== null) {
        // Check required properties
        if (schema.required) {
            for (const prop of schema.required) {
                if (!(prop in data)) {
                    throw new Error(`Missing required property: ${prop}`);
                }
            }
        }

        // Validate properties
        if (schema.properties) {
            for (const [key, value] of Object.entries(data)) {
                if (schema.properties[key]) {
                    try {
                        validateData(value, schema.properties[key]);
                    } catch (error) {
                        throw new Error(`Property '${key}': ${(error as Error).message}`);
                    }
                }
            }
        }

        // Validate additional properties
        if (schema.additionalProperties) {
            for (const [key, value] of Object.entries(data)) {
                if (!schema.properties || !schema.properties[key]) {
                    try {
                        validateData(value, schema.additionalProperties);
                    } catch (error) {
                        throw new Error(`Property '${key}': ${(error as Error).message}`);
                    }
                }
            }
        }
    }

    // Array validation
    if (schema.type === 'array' && Array.isArray(data)) {
        if (schema.items) {
            for (let i = 0; i < data.length; i++) {
                try {
                    validateData(data[i], schema.items);
                } catch (error) {
                    throw new Error(`Array item ${i}: ${(error as Error).message}`);
                }
            }
        }
    }

    return true;
}

/**
 * Validate StudentProgress data
 */
export function validateStudentProgress(data: any): boolean {
    return validateData(data, studentProgressSchema);
}

/**
 * Validate AlgorithmProgress data
 */
export function validateAlgorithmProgress(data: any): boolean {
    return validateData(data, algorithmProgressSchema);
}

/**
 * Validate Challenge data
 */
export function validateChallenge(data: any): boolean {
    return validateData(data, challengeSchema);
}

/**
 * Validate Achievement data
 */
export function validateAchievement(data: any): boolean {
    return validateData(data, achievementSchema);
}

/**
 * Validate Recommendation data
 */
export function validateRecommendation(data: any): boolean {
    return validateData(data, recommendationSchema);
}

/**
 * Validate Certificate data
 */
export function validateCertificate(data: any): boolean {
    return validateData(data, certificateSchema);
}
