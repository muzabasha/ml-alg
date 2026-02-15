/**
 * ProgressBar Component
 * 
 * A reusable progress bar component with percentage display, color coding,
 * and smooth animations. Used throughout the learning path system to show
 * algorithm completion progress.
 * 
 * Requirements: 11.1, 11.5
 */

import React from 'react';

export interface ProgressBarProps {
    /** Progress percentage (0-100) */
    percentage: number;
    /** Visual state of the progress */
    state?: 'locked' | 'in-progress' | 'completed' | 'mastered';
    /** Show percentage label */
    showLabel?: boolean;
    /** Size variant */
    size?: 'sm' | 'md' | 'lg';
    /** Custom className for additional styling */
    className?: string;
    /** Accessible label for screen readers */
    ariaLabel?: string;
}

/**
 * Get color classes based on state
 */
const getStateColors = (state: ProgressBarProps['state']) => {
    switch (state) {
        case 'locked':
            return {
                bg: 'bg-slate-200',
                fill: 'bg-slate-400',
                text: 'text-slate-600'
            };
        case 'in-progress':
            return {
                bg: 'bg-blue-100',
                fill: 'bg-blue-600',
                text: 'text-blue-700'
            };
        case 'completed':
            return {
                bg: 'bg-green-100',
                fill: 'bg-green-600',
                text: 'text-green-700'
            };
        case 'mastered':
            return {
                bg: 'bg-amber-100',
                fill: 'bg-amber-500',
                text: 'text-amber-700'
            };
        default:
            return {
                bg: 'bg-slate-100',
                fill: 'bg-indigo-600',
                text: 'text-indigo-700'
            };
    }
};

/**
 * Get height class based on size
 */
const getSizeHeight = (size: ProgressBarProps['size']) => {
    switch (size) {
        case 'sm':
            return 'h-1.5';
        case 'lg':
            return 'h-3';
        case 'md':
        default:
            return 'h-2';
    }
};

/**
 * ProgressBar component displays a horizontal progress bar with optional
 * percentage label and color coding based on state.
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
    percentage,
    state,
    showLabel = true,
    size = 'md',
    className = '',
    ariaLabel
}) => {
    // Clamp percentage between 0 and 100
    const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

    const colors = getStateColors(state);
    const heightClass = getSizeHeight(size);

    return (
        <div className={`w-full ${className}`}>
            {/* Label and percentage */}
            {showLabel && (
                <div className="flex justify-between items-center mb-1.5">
                    <span className={`text-sm font-medium ${colors.text}`}>
                        {ariaLabel || 'Progress'}
                    </span>
                    <span className={`text-sm font-bold ${colors.text}`}>
                        {clampedPercentage.toFixed(0)}%
                    </span>
                </div>
            )}

            {/* Progress bar */}
            <div
                className={`w-full ${colors.bg} rounded-full ${heightClass} overflow-hidden`}
                role="progressbar"
                aria-valuenow={clampedPercentage}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={ariaLabel || 'Progress'}
            >
                <div
                    className={`${colors.fill} ${heightClass} rounded-full transition-all duration-500 ease-out`}
                    style={{ width: `${clampedPercentage}%` }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
