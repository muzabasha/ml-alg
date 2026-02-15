/**
 * Step Navigation Hook
 * 
 * Custom hook for managing workflow step navigation within algorithms.
 */

import { useState, useCallback, useEffect } from 'react';
import { WorkflowStep } from '../types/learning-path';
import { useLearningPath } from '../contexts/LearningPathContext';

/**
 * Workflow step order
 */
const STEP_ORDER: WorkflowStep[] = [
    WorkflowStep.Theory,
    WorkflowStep.Dataset,
    WorkflowStep.EDA,
    WorkflowStep.Preprocessing,
    WorkflowStep.FeatureEngineering,
    WorkflowStep.TrainEvaluate
];

/**
 * Hook for step navigation within an algorithm
 */
export const useStepNavigation = (algorithmId: string) => {
    const { markStepComplete, getAlgorithmStatus, getAlgorithmProgress } = useLearningPath();
    const [currentStep, setCurrentStep] = useState<WorkflowStep>(WorkflowStep.Theory);
    const [completedSteps, setCompletedSteps] = useState<Set<WorkflowStep>>(new Set());

    /**
     * Get current step index
     */
    const getCurrentStepIndex = useCallback(() => {
        return STEP_ORDER.indexOf(currentStep);
    }, [currentStep]);

    /**
     * Check if step is completed
     */
    const isStepCompleted = useCallback((step: WorkflowStep) => {
        return completedSteps.has(step);
    }, [completedSteps]);

    /**
     * Mark current step as complete and advance
     */
    const completeCurrentStep = useCallback(() => {
        markStepComplete(algorithmId, currentStep);
        setCompletedSteps(prev => new Set(prev).add(currentStep));

        // Auto-advance to next step
        const currentIndex = getCurrentStepIndex();
        if (currentIndex < STEP_ORDER.length - 1) {
            setCurrentStep(STEP_ORDER[currentIndex + 1]);
        }
    }, [algorithmId, currentStep, markStepComplete, getCurrentStepIndex]);

    /**
     * Navigate to next step
     */
    const goToNextStep = useCallback(() => {
        const currentIndex = getCurrentStepIndex();
        if (currentIndex < STEP_ORDER.length - 1) {
            setCurrentStep(STEP_ORDER[currentIndex + 1]);
        }
    }, [getCurrentStepIndex]);

    /**
     * Navigate to previous step
     */
    const goToPreviousStep = useCallback(() => {
        const currentIndex = getCurrentStepIndex();
        if (currentIndex > 0) {
            setCurrentStep(STEP_ORDER[currentIndex - 1]);
        }
    }, [getCurrentStepIndex]);

    /**
     * Navigate to specific step
     */
    const goToStep = useCallback((step: WorkflowStep) => {
        setCurrentStep(step);
    }, []);

    /**
     * Check if can go to next step
     */
    const canGoNext = useCallback(() => {
        return getCurrentStepIndex() < STEP_ORDER.length - 1;
    }, [getCurrentStepIndex]);

    /**
     * Check if can go to previous step
     */
    const canGoPrevious = useCallback(() => {
        return getCurrentStepIndex() > 0;
    }, [getCurrentStepIndex]);

    /**
     * Get step progress (1-6)
     */
    const getStepNumber = useCallback(() => {
        return getCurrentStepIndex() + 1;
    }, [getCurrentStepIndex]);

    /**
     * Get total steps
     */
    const getTotalSteps = useCallback(() => {
        return STEP_ORDER.length;
    }, []);

    /**
     * Get step progress percentage
     */
    const getStepProgressPercentage = useCallback(() => {
        return Math.round((completedSteps.size / STEP_ORDER.length) * 100);
    }, [completedSteps]);

    /**
     * Check if all steps completed
     */
    const isAllStepsCompleted = useCallback(() => {
        return completedSteps.size === STEP_ORDER.length;
    }, [completedSteps]);

    return {
        currentStep,
        currentStepIndex: getCurrentStepIndex(),
        stepNumber: getStepNumber(),
        totalSteps: getTotalSteps(),
        completedSteps: Array.from(completedSteps),

        // Navigation
        goToNextStep,
        goToPreviousStep,
        goToStep,
        completeCurrentStep,

        // Status checks
        canGoNext: canGoNext(),
        canGoPrevious: canGoPrevious(),
        isStepCompleted,
        isAllStepsCompleted: isAllStepsCompleted(),

        // Progress
        progressPercentage: getStepProgressPercentage()
    };
};
