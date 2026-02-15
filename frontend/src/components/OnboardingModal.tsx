/**
 * OnboardingModal Component
 * 
 * Interactive onboarding tutorial with:
 * - Modal overlay with tutorial steps
 * - Step navigation (next, previous, skip)
 * - Element highlighting with spotlight effect
 * - Tooltip positioning logic
 * 
 * Requirements: 2.1, 2.2, 2.3, 2.4
 */

import React, { useState, useEffect } from 'react';

export interface OnboardingStep {
    /** Unique step identifier */
    id: string;
    /** Step title */
    title: string;
    /** Step description */
    description: string;
    /** Target element selector (optional) */
    targetSelector?: string;
    /** Tooltip position relative to target */
    position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
    /** Icon or emoji for the step */
    icon?: string;
}

export interface OnboardingModalProps {
    /** Whether onboarding is active */
    isOpen: boolean;
    /** Onboarding steps */
    steps: OnboardingStep[];
    /** Callback when onboarding is completed */
    onComplete: () => void;
    /** Callback when onboarding is skipped */
    onSkip: () => void;
    /** Custom className for additional styling */
    className?: string;
}

/**
 * OnboardingModal displays an interactive tutorial overlay
 * with step-by-step guidance.
 */
export const OnboardingModal: React.FC<OnboardingModalProps> = ({
    isOpen,
    steps,
    onComplete,
    onSkip,
    className = ''
}) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [highlightedElement, setHighlightedElement] = useState<HTMLElement | null>(null);

    const currentStep = steps[currentStepIndex];
    const isFirstStep = currentStepIndex === 0;
    const isLastStep = currentStepIndex === steps.length - 1;

    // Highlight target element
    useEffect(() => {
        if (!isOpen || !currentStep?.targetSelector) {
            setHighlightedElement(null);
            return;
        }

        const element = document.querySelector(currentStep.targetSelector) as HTMLElement;
        if (element) {
            setHighlightedElement(element);
            // Scroll element into view
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return () => {
            setHighlightedElement(null);
        };
    }, [isOpen, currentStep]);

    // Handle next step
    const handleNext = () => {
        if (isLastStep) {
            onComplete();
        } else {
            setCurrentStepIndex(prev => prev + 1);
        }
    };

    // Handle previous step
    const handlePrevious = () => {
        if (!isFirstStep) {
            setCurrentStepIndex(prev => prev - 1);
        }
    };

    // Handle skip
    const handleSkip = () => {
        onSkip();
    };

    // Get tooltip position styles
    const getTooltipPosition = (): React.CSSProperties => {
        if (!highlightedElement || !currentStep?.position || currentStep.position === 'center') {
            return {
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            };
        }

        const rect = highlightedElement.getBoundingClientRect();
        const tooltipOffset = 20;

        switch (currentStep.position) {
            case 'top':
                return {
                    position: 'fixed',
                    bottom: `${window.innerHeight - rect.top + tooltipOffset}px`,
                    left: `${rect.left + rect.width / 2}px`,
                    transform: 'translateX(-50%)'
                };
            case 'bottom':
                return {
                    position: 'fixed',
                    top: `${rect.bottom + tooltipOffset}px`,
                    left: `${rect.left + rect.width / 2}px`,
                    transform: 'translateX(-50%)'
                };
            case 'left':
                return {
                    position: 'fixed',
                    top: `${rect.top + rect.height / 2}px`,
                    right: `${window.innerWidth - rect.left + tooltipOffset}px`,
                    transform: 'translateY(-50%)'
                };
            case 'right':
                return {
                    position: 'fixed',
                    top: `${rect.top + rect.height / 2}px`,
                    left: `${rect.right + tooltipOffset}px`,
                    transform: 'translateY(-50%)'
                };
            default:
                return {
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                };
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop with spotlight effect */}
            <div
                className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
                style={{
                    background: highlightedElement
                        ? `radial-gradient(circle at ${highlightedElement.getBoundingClientRect().left + highlightedElement.getBoundingClientRect().width / 2}px ${highlightedElement.getBoundingClientRect().top + highlightedElement.getBoundingClientRect().height / 2}px, transparent 0px, rgba(0, 0, 0, 0.7) 150px)`
                        : 'rgba(0, 0, 0, 0.7)'
                }}
                onClick={handleSkip}
            />

            {/* Highlighted element outline */}
            {highlightedElement && (
                <div
                    className="fixed z-50 pointer-events-none"
                    style={{
                        top: `${highlightedElement.getBoundingClientRect().top - 4}px`,
                        left: `${highlightedElement.getBoundingClientRect().left - 4}px`,
                        width: `${highlightedElement.getBoundingClientRect().width + 8}px`,
                        height: `${highlightedElement.getBoundingClientRect().height + 8}px`,
                        border: '3px solid #6366f1',
                        borderRadius: '12px',
                        boxShadow: '0 0 0 4px rgba(99, 102, 241, 0.2)',
                        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                    }}
                />
            )}

            {/* Tooltip */}
            <div
                className={`fixed z-50 max-w-md ${className}`}
                style={getTooltipPosition()}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="bg-white rounded-3xl shadow-2xl p-6 border-2 border-indigo-200">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            {currentStep.icon && (
                                <span className="text-3xl">{currentStep.icon}</span>
                            )}
                            <div>
                                <h3 className="text-xl font-black text-slate-900">
                                    {currentStep.title}
                                </h3>
                                <p className="text-xs text-slate-500 font-medium">
                                    Step {currentStepIndex + 1} of {steps.length}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleSkip}
                            className="text-slate-400 hover:text-slate-600 transition-colors"
                            aria-label="Skip tutorial"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 mb-6 leading-relaxed">
                        {currentStep.description}
                    </p>

                    {/* Progress dots */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                        {steps.map((_, index) => (
                            <div
                                key={index}
                                className={`
                                    h-2 rounded-full transition-all duration-300
                                    ${index === currentStepIndex ? 'w-8 bg-indigo-600' : 'w-2 bg-slate-300'}
                                `}
                            />
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between gap-3">
                        <button
                            onClick={handleSkip}
                            className="text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors"
                        >
                            Skip Tutorial
                        </button>

                        <div className="flex gap-2">
                            {!isFirstStep && (
                                <button
                                    onClick={handlePrevious}
                                    className="px-4 py-2 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-100 transition-all"
                                >
                                    Previous
                                </button>
                            )}
                            <button
                                onClick={handleNext}
                                className="px-6 py-2 rounded-xl font-black text-sm bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
                            >
                                {isLastStep ? 'Get Started' : 'Next'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pulse animation */}
            <style jsx>{`
                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.5;
                    }
                }
            `}</style>
        </>
    );
};

export default OnboardingModal;
