/**
 * MiniProgressIndicator Component
 * 
 * A compact progress indicator for list items showing visual state icons
 * (lock, checkmark, star) and color coding (gray, blue, green, gold).
 * 
 * Requirements: 11.2, 11.4, 11.5
 */

import React from 'react';

export interface MiniProgressIndicatorProps {
    /** Visual state of the algorithm */
    state: 'locked' | 'unlocked' | 'in-progress' | 'completed' | 'mastered';
    /** Progress percentage (0-100) */
    percentage?: number;
    /** Custom className for additional styling */
    className?: string;
    /** Accessible label for screen readers */
    ariaLabel?: string;
}

/**
 * Get icon and colors based on state
 */
const getStateConfig = (state: MiniProgressIndicatorProps['state']) => {
    switch (state) {
        case 'locked':
            return {
                icon: (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                ),
                bgColor: 'bg-slate-200',
                iconColor: 'text-slate-500',
                ringColor: 'ring-slate-300'
            };
        case 'unlocked':
            return {
                icon: (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                ),
                bgColor: 'bg-slate-100',
                iconColor: 'text-slate-600',
                ringColor: 'ring-slate-300'
            };
        case 'in-progress':
            return {
                icon: (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                ),
                bgColor: 'bg-blue-100',
                iconColor: 'text-blue-600',
                ringColor: 'ring-blue-300'
            };
        case 'completed':
            return {
                icon: (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                ),
                bgColor: 'bg-green-100',
                iconColor: 'text-green-600',
                ringColor: 'ring-green-300'
            };
        case 'mastered':
            return {
                icon: (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ),
                bgColor: 'bg-amber-100',
                iconColor: 'text-amber-600',
                ringColor: 'ring-amber-300'
            };
    }
};

/**
 * MiniProgressIndicator displays a compact visual indicator showing
 * algorithm state with appropriate icon and color coding.
 */
export const MiniProgressIndicator: React.FC<MiniProgressIndicatorProps> = ({
    state,
    percentage = 0,
    className = '',
    ariaLabel
}) => {
    const config = getStateConfig(state);
    const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

    // Determine display text based on state
    const getStateText = () => {
        switch (state) {
            case 'locked':
                return 'Locked';
            case 'unlocked':
                return 'Start';
            case 'in-progress':
                return `${clampedPercentage}%`;
            case 'completed':
                return 'Done';
            case 'mastered':
                return 'Mastered';
        }
    };

    return (
        <div
            className={`inline-flex items-center gap-1.5 ${className}`}
            role="status"
            aria-label={ariaLabel || `${state} - ${getStateText()}`}
        >
            {/* Icon badge */}
            <div
                className={`
                    flex items-center justify-center
                    w-5 h-5 rounded-full
                    ${config.bgColor} ${config.iconColor}
                    ring-1 ${config.ringColor}
                    transition-all duration-200
                `}
            >
                {config.icon}
            </div>

            {/* Progress text (optional, for in-progress state) */}
            {state === 'in-progress' && percentage !== undefined && (
                <span className={`text-xs font-medium ${config.iconColor}`}>
                    {clampedPercentage}%
                </span>
            )}
        </div>
    );
};

export default MiniProgressIndicator;
