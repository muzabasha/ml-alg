// Centralized Chart.js configuration for consistent styling across the application

import { ChartOptions } from 'chart.js';

// Premium color palette
export const chartColors = {
    primary: {
        main: 'rgba(99, 102, 241, 0.8)',
        light: 'rgba(99, 102, 241, 0.4)',
        lighter: 'rgba(99, 102, 241, 0.1)',
        border: 'rgb(99, 102, 241)',
    },
    secondary: {
        main: 'rgba(16, 185, 129, 0.8)',
        light: 'rgba(16, 185, 129, 0.4)',
        lighter: 'rgba(16, 185, 129, 0.1)',
        border: 'rgb(16, 185, 129)',
    },
    tertiary: {
        main: 'rgba(245, 158, 11, 0.8)',
        light: 'rgba(245, 158, 11, 0.4)',
        lighter: 'rgba(245, 158, 11, 0.1)',
        border: 'rgb(245, 158, 11)',
    },
    quaternary: {
        main: 'rgba(139, 92, 246, 0.8)',
        light: 'rgba(139, 92, 246, 0.4)',
        lighter: 'rgba(139, 92, 246, 0.1)',
        border: 'rgb(139, 92, 246)',
    },
    danger: {
        main: 'rgba(239, 68, 68, 0.8)',
        light: 'rgba(239, 68, 68, 0.4)',
        lighter: 'rgba(239, 68, 68, 0.1)',
        border: 'rgb(239, 68, 68)',
    },
    success: {
        main: 'rgba(34, 197, 94, 0.8)',
        light: 'rgba(34, 197, 94, 0.4)',
        lighter: 'rgba(34, 197, 94, 0.1)',
        border: 'rgb(34, 197, 94)',
    },
    slate: {
        main: 'rgba(100, 116, 139, 0.8)',
        light: 'rgba(100, 116, 139, 0.4)',
        lighter: 'rgba(100, 116, 139, 0.1)',
        border: 'rgb(100, 116, 139)',
    }
};

// Base chart options with premium styling
export const baseChartOptions: ChartOptions<any> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    plugins: {
        legend: {
            display: true,
            position: 'top',
            labels: {
                font: {
                    family: 'Outfit, sans-serif',
                    size: 11,
                    weight: '700',
                },
                color: '#0f172a',
                usePointStyle: true,
                pointStyle: 'circle',
                padding: 20,
                boxWidth: 8,
                boxHeight: 8,
            },
        },
        tooltip: {
            enabled: true,
            backgroundColor: '#0f172a',
            titleColor: '#ffffff',
            bodyColor: '#e2e8f0',
            borderColor: '#4f46e5',
            borderWidth: 1,
            padding: 16,
            cornerRadius: 12,
            titleFont: {
                family: 'Outfit, sans-serif',
                size: 13,
                weight: '900',
            },
            bodyFont: {
                family: 'Outfit, sans-serif',
                size: 12,
                weight: '500',
            },
            displayColors: true,
            boxWidth: 12,
            boxHeight: 12,
            boxPadding: 6,
        },
    },
    scales: {
        x: {
            grid: {
                display: true,
                color: 'rgba(0, 0, 0, 0.03)',
                lineWidth: 1,
            },
            ticks: {
                font: {
                    family: 'Outfit, sans-serif',
                    size: 10,
                    weight: '600',
                },
                color: '#64748b',
                padding: 8,
            },
            border: {
                display: true,
                color: 'rgba(0, 0, 0, 0.05)',
            },
        },
        y: {
            grid: {
                display: true,
                color: 'rgba(0, 0, 0, 0.03)',
                lineWidth: 1,
            },
            ticks: {
                font: {
                    family: 'Outfit, sans-serif',
                    size: 10,
                    weight: '600',
                },
                color: '#64748b',
                padding: 8,
            },
            border: {
                display: true,
                color: 'rgba(0, 0, 0, 0.05)',
            },
        },
    },
    animation: {
        duration: 800,
        easing: 'easeInOutQuart',
    },
};

// Scatter plot specific options
export const scatterChartOptions: ChartOptions<'scatter'> = {
    ...baseChartOptions,
    plugins: {
        ...baseChartOptions.plugins,
        legend: {
            ...baseChartOptions.plugins?.legend,
            display: true,
        },
    },
    elements: {
        point: {
            radius: 6,
            hoverRadius: 10,
            borderWidth: 2,
            hoverBorderWidth: 3,
        },
    },
};

// Line chart specific options
export const lineChartOptions: ChartOptions<'line'> = {
    ...baseChartOptions,
    elements: {
        line: {
            tension: 0.4,
            borderWidth: 3,
        },
        point: {
            radius: 4,
            hoverRadius: 8,
            borderWidth: 2,
            hoverBorderWidth: 3,
        },
    },
};

// Bar chart specific options
export const barChartOptions: ChartOptions<'bar'> = {
    ...baseChartOptions,
    elements: {
        bar: {
            borderRadius: 8,
            borderWidth: 0,
        },
    },
};

// Doughnut chart specific options
export const doughnutChartOptions: ChartOptions<'doughnut'> = {
    ...baseChartOptions,
    cutout: '65%',
    plugins: {
        ...baseChartOptions.plugins,
        legend: {
            ...baseChartOptions.plugins?.legend,
            position: 'bottom',
            labels: {
                ...baseChartOptions.plugins?.legend?.labels,
                padding: 16,
            },
        },
    },
};

// Helper function to merge custom options with base options
export function mergeChartOptions<T extends keyof ChartOptions>(
    baseOptions: ChartOptions<any>,
    customOptions: Partial<ChartOptions<any>> = {}
): ChartOptions<any> {
    return {
        ...baseOptions,
        ...customOptions,
        plugins: {
            ...baseOptions.plugins,
            ...customOptions.plugins,
        },
        scales: {
            ...baseOptions.scales,
            ...customOptions.scales,
        },
    };
}

// Loading component for charts
export const ChartLoadingPlaceholder = () => (
    <div className= "w-full h-full flex items-center justify-center bg-slate-50 rounded-2xl border border-slate-100" >
    <div className="text-center space-y-4" >
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" > </div>
            < p className = "text-xs font-black text-indigo-600 uppercase tracking-widest animate-pulse" >
                Rendering Visualization
                    </p>
                    </div>
                    </div>
);

// Error component for charts
export const ChartErrorPlaceholder = ({ message }: { message?: string }) => (
    <div className= "w-full h-full flex items-center justify-center bg-rose-50 rounded-2xl border border-rose-100" >
    <div className="text-center space-y-4 p-8" >
        <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-3xl mx-auto" >
                ⚠️
</div>
    < div >
    <h4 className="text-xs font-black text-rose-900 uppercase tracking-widest mb-2" >
        Visualization Error
            </h4>
            < p className = "text-sm text-rose-700 italic opacity-70" >
                { message || 'Unable to render chart'}
</p>
    </div>
    </div>
    </div>
);
