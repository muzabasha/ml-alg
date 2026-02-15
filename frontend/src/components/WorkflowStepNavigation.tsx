/**
 * WorkflowStepNavigation Component
 * 
 * Displays 6-step progress indicator for ML workflow with:
 * - Step progress visualization
 * - Current active step highlighting
 * - Completion checkmarks for completed steps
 * - Step navigation (next, previous)
 * 
 * Requirements: 6.1, 6.2, 6.3, 6.4, 6.5
 */

import React from 'react';
import { WorkflowStep } from '../types/learning-path';

export interface WorkflowStepNavigationProps {
    /** Current active step */
    currentStep: WorkflowStep;
    /** Completed steps */
    completedSteps: WorkflowStep[];
    /** Callback when step is clicked */
    onStepClick?: (step: WorkflowStep) => void;
    /** Whether navigation is disabled */
    disabled?: boolean;
    /** Custom className for additional styling */
    className?: string;
}

/**
 * Workflow step configuration
 */
const WORKFLOW_STEPS: Array<{ step: WorkflowStep; label: string; icon: string }> = [
    { step: WorkflowStep.Introduction, label: 'Introduction', icon: '📚' },
    { step: WorkflowStep.Mathematics, label: 'Mathematics', icon: '🔢' },
    { step: WorkflowStep.Intuition, label: 'Intuition', icon: '💡' },
    { step: WorkflowStep.Implementation, label: 'Implementation', icon: '💻' },
    { step: WorkflowStep.Visualization, label: 'Visualization', icon: '📊' },
    { step: WorkflowStep.Practice, label: 'Practice', icon: '🎯' }
];

/**
 * Get step state
 */
const getStepState = (
    step: WorkflowStep,
    currentStep: WorkflowStep,
    completedSteps: WorkflowStep[]
): 'completed' | 'active' | 'upcoming' => {
    if (completedSteps.includes(step)) return 'completed';
    if (step === currentStep) return 'active';
    return 'upcoming';
};

/**
 * Get step index
 */
const getStepIndex = (step: WorkflowStep): number => {
    return WORKFLOW_STEPS.findIndex(s => s.step === step);
};

/**
 * WorkflowStepNavigation displays an interactive step indicator
 * for the 6-step ML workflow.
 */
export const WorkflowStepNavigation: React.FC<WorkflowStepNavigationProps> = ({
    currentStep,
    completedSteps,
    onStepClick,
    disabled = false,
    className = ''
}) => {
    const currentIndex = getStepIndex(currentStep);

    return (
        <div className={`w-full ${className}`}>
            {/* Desktop View - Horizontal */}
            <div className="hidden md:block">
                <div className="flex items-center justify-between">
                    {WORKFLOW_STEPS.map((stepConfig, index) => {
                        const state = getStepState(stepConfig.step, currentStep, completedSteps);
                        const isClickable = !disabled && onStepClick && (state === 'completed' || state === 'active');
                        const isLast = index === WORKFLOW_STEPS.length - 1;

                        return (
                            <React.Fragment key={stepConfig.step}>
                                {/* Step */}
                                <div className="flex flex-col items-center flex-shrink-0">
                                    <button
                                        onClick={() => isClickable && onStepClick(stepConfig.step)}
                                        disabled={!isClickable}
                                        className={`
                                            relative w-12 h-12 rounded-full flex items-center justify-center
                                            font-bold text-lg transition-all duration-300
                                            ${state === 'completed' ? 'bg-green-600 text-white shadow-lg scale-100' : ''}
                                            ${state === 'active' ? 'bg-indigo-600 text-white shadow-xl scale-110 ring-4 ring-indigo-200' : ''}
                                            ${state === 'upcoming' ? 'bg-slate-200 text-slate-500' : ''}
                                            ${isClickable ? 'cursor-pointer hover:scale-105' : 'cursor-default'}
                                            ${disabled ? 'opacity-50' : ''}
                                        `}
                                        aria-label={`${stepConfig.label} - ${state}`}
                                        aria-current={state === 'active' ? 'step' : undefined}
                                    >
                                        {state === 'completed' ? (
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <span>{stepConfig.icon}</span>
                                        )}
                                    </button>
                                    <span className={`
                                        mt-2 text-xs font-bold text-center whitespace-nowrap
                                        ${state === 'active' ? 'text-indigo-600' : ''}
                                        ${state === 'completed' ? 'text-green-600' : ''}
                                        ${state === 'upcoming' ? 'text-slate-500' : ''}
                                    `}>
                                        {stepConfig.label}
                                    </span>
                                </div>

                                {/* Connector Line */}
                                {!isLast && (
                                    <div className="flex-1 h-1 mx-2 rounded-full relative">
                                        <div className="absolute inset-0 bg-slate-200 rounded-full"></div>
                                        <div
                                            className={`
                                                absolute inset-0 rounded-full transition-all duration-500
                                                ${index < currentIndex ? 'bg-green-600 w-full' : ''}
                                                ${index === currentIndex ? 'bg-indigo-600 w-1/2' : ''}
                                                ${index > currentIndex ? 'bg-slate-200 w-0' : ''}
                                            `}
                                        ></div>
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            {/* Mobile View - Vertical Compact */}
            <div className="md:hidden">
                <div className="bg-white rounded-2xl p-4 shadow-md border border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold text-slate-600">Progress</span>
                        <span className="text-sm font-bold text-indigo-600">
                            {completedSteps.length}/{WORKFLOW_STEPS.length} Steps
                        </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden mb-4">
                        <div
                            className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                            style={{ width: `${(completedSteps.length / WORKFLOW_STEPS.length) * 100}%` }}
                        ></div>
                    </div>

                    {/* Current Step */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-indigo-50 border-2 border-indigo-200">
                        <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg flex-shrink-0">
                            {WORKFLOW_STEPS[currentIndex].icon}
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider">Current Step</p>
                            <p className="font-bold text-slate-900">{WORKFLOW_STEPS[currentIndex].label}</p>
                        </div>
                    </div>

                    {/* All Steps List */}
                    <div className="mt-4 space-y-2">
                        {WORKFLOW_STEPS.map((stepConfig) => {
                            const state = getStepState(stepConfig.step, currentStep, completedSteps);
                            const isClickable = !disabled && onStepClick && (state === 'completed' || state === 'active');

                            return (
                                <button
                                    key={stepConfig.step}
                                    onClick={() => isClickable && onStepClick(stepConfig.step)}
                                    disabled={!isClickable}
                                    className={`
                                        w-full flex items-center gap-3 p-2 rounded-lg transition-all
                                        ${state === 'active' ? 'bg-indigo-50' : ''}
                                        ${isClickable ? 'hover:bg-slate-50 cursor-pointer' : 'cursor-default'}
                                    `}
                                >
                                    <div className={`
                                        w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0
                                        ${state === 'completed' ? 'bg-green-600 text-white' : ''}
                                        ${state === 'active' ? 'bg-indigo-600 text-white' : ''}
                                        ${state === 'upcoming' ? 'bg-slate-200 text-slate-500' : ''}
                                    `}>
                                        {state === 'completed' ? (
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            stepConfig.icon
                                        )}
                                    </div>
                                    <span className={`
                                        text-sm font-medium
                                        ${state === 'active' ? 'text-indigo-600 font-bold' : ''}
                                        ${state === 'completed' ? 'text-green-600' : ''}
                                        ${state === 'upcoming' ? 'text-slate-500' : ''}
                                    `}>
                                        {stepConfig.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkflowStepNavigation;
