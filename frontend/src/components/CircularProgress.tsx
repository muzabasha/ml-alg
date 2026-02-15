/**
 * CircularProgress Component
 * 
 * A circular progress indicator with percentage display and animated progress arc.
 * Used on the dashboard to show overall learning progress.
 * 
 * Requirements: 9.1, 11.3
 */

import React from 'react';

export interface CircularProgressProps {
    /** Progress percentage (0-100) */
    percentage: number;
    /** Size of the circle in pixels */
    size?: number;
    /** Stroke width in pixels */
    strokeWidth?: number;
    /** Show percentage text in center */
    showLabel?: boolean;
    /** Custom label text (overrides percentage) */
    label?: string;
    /** Color variant */
    variant?: 'primary' | 'success' | 'warning' | 'info';
    /** Custom className for additional styling */
    className?: string;
    /** Accessible label for screen readers */
    ariaLabel?: string;
}

/**
 * Get color classes based on variant
 */
const getVariantColors = (variant: CircularProgressProps['variant']) => {
    switch (variant) {
        case 'success':
            return {
                stroke: 'stroke-green-600',
                text: 'text-green-700',
                bg: 'stroke-green-100'
            };
        case 'warning':
            return {
                stroke: 'stroke-amber-500',
                text: 'text-amber-700',
                bg: 'stroke-amber-100'
            };
        case 'info':
            return {
                stroke: 'stroke-blue-600',
                text: 'text-blue-700',
                bg: 'stroke-blue-100'
            };
        case 'primary':
        default:
            return {
                stroke: 'stroke-indigo-600',
                text: 'text-indigo-700',
                bg: 'stroke-slate-200'
            };
    }
};

/**
 * CircularProgress displays an animated circular progress indicator
 * with percentage text in the center.
 */
export const CircularProgress: React.FC<CircularProgressProps> = ({
    percentage,
    size = 120,
    strokeWidth = 8,
    showLabel = true,
    label,
    variant = 'primary',
    className = '',
    ariaLabel
}) => {
    // Clamp percentage between 0 and 100
    const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

    const colors = getVariantColors(variant);

    // Calculate circle properties
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (clampedPercentage / 100) * circumference;

    // Center position
    const center = size / 2;

    // Font size based on circle size
    const fontSize = size / 4;
    const subFontSize = size / 8;

    return (
        <div
            className={`inline-flex items-center justify-center ${className}`}
            role="progressbar"
            aria-valuenow={clampedPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={ariaLabel || `Progress: ${clampedPercentage}%`}
        >
            <svg
                width={size}
                height={size}
                className="transform -rotate-90"
            >
                {/* Background circle */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    className={colors.bg}
                    strokeWidth={strokeWidth}
                    fill="none"
                />

                {/* Progress circle */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    className={`${colors.stroke} transition-all duration-1000 ease-out`}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{
                        transition: 'stroke-dashoffset 1s ease-out'
                    }}
                />

                {/* Center text */}
                {showLabel && (
                    <g className="transform rotate-90" style={{ transformOrigin: `${center}px ${center}px` }}>
                        <text
                            x={center}
                            y={center}
                            textAnchor="middle"
                            dominantBaseline="central"
                            className={`font-bold ${colors.text}`}
                            style={{ fontSize: `${fontSize}px` }}
                        >
                            {label || `${clampedPercentage.toFixed(0)}%`}
                        </text>
                        {!label && (
                            <text
                                x={center}
                                y={center + fontSize / 2 + subFontSize}
                                textAnchor="middle"
                                dominantBaseline="central"
                                className="text-slate-500 font-medium"
                                style={{ fontSize: `${subFontSize}px` }}
                            >
                                Complete
                            </text>
                        )}
                    </g>
                )}
            </svg>
        </div>
    );
};

export default CircularProgress;
