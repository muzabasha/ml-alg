import React, { useEffect, useRef } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ScatterController
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ScatterController
);

interface DataPoint {
    x: number;
    y: number;
    label?: string;
}

interface VisualizationProps {
    data: any;
    algorithmType: string;
}

const DataVisualization: React.FC<VisualizationProps> = ({ data, algorithmType }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<ChartJS | null>(null);

    useEffect(() => {
        if (!canvasRef.current || !data) return;

        // Destroy existing chart
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        // Parse data based on structure
        const chartData = parseDataForVisualization(data, algorithmType);

        if (!chartData) return;

        // Create new chart
        chartRef.current = new ChartJS(ctx, chartData);

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [data, algorithmType]);

    return (
        <div className="my-6 p-6 bg-white rounded-xl shadow-lg border-2 border-green-200">
            <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">📊</span>
                <h4 className="text-xl font-bold text-green-700">Data Visualization</h4>
            </div>
            <div className="relative" style={{ height: '400px' }}>
                <canvas ref={canvasRef}></canvas>
            </div>
        </div>
    );
};

function parseDataForVisualization(data: any, algorithmType: string): any {
    // Handle different data structures
    if (data.input && data.input.table && Array.isArray(data.input.table)) {
        return createScatterPlotWithLine(data.input.table, data.output);
    }

    if (data.table && Array.isArray(data.table)) {
        return createScatterPlotWithLine(data.table, null);
    }

    return null;
}

function createScatterPlotWithLine(tableData: any[], outputData: any): any {
    // Extract x and y values from table
    const keys = Object.keys(tableData[0]);
    const xKey = keys[0]; // First column as X
    const yKey = keys[1]; // Second column as Y

    const dataPoints = tableData.map(row => ({
        x: row[xKey],
        y: row[yKey]
    }));

    // Prepare datasets
    const datasets: any[] = [
        {
            label: 'Actual Data',
            data: dataPoints,
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 2,
            pointRadius: 8,
            pointHoverRadius: 10,
            type: 'scatter'
        }
    ];

    // Add prediction line if output data exists
    if (outputData && outputData.predictions) {
        const predictionPoints = outputData.predictions.map((pred: any) => ({
            x: pred[xKey] || pred['Square Feet'],
            y: pred['Predicted Price'] || pred.predicted
        }));

        datasets.push({
            label: 'Predictions',
            data: predictionPoints,
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
            borderColor: 'rgba(239, 68, 68, 1)',
            borderWidth: 3,
            pointRadius: 6,
            pointHoverRadius: 8,
            type: 'scatter',
            pointStyle: 'triangle'
        });

        // Add fitted line
        const sortedPoints = [...predictionPoints].sort((a, b) => a.x - b.x);
        datasets.push({
            label: 'Fitted Line',
            data: sortedPoints,
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderColor: 'rgba(239, 68, 68, 0.8)',
            borderWidth: 2,
            fill: false,
            type: 'line',
            pointRadius: 0,
            tension: 0.1
        });
    }

    return {
        type: 'scatter',
        data: { datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top' as const,
                    labels: {
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                        padding: 15,
                        usePointStyle: true
                    }
                },
                title: {
                    display: true,
                    text: `${xKey} vs ${yKey}`,
                    font: {
                        size: 18,
                        weight: 'bold'
                    },
                    padding: 20,
                    color: '#1f2937'
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 13
                    },
                    callbacks: {
                        label: function (context: any) {
                            const label = context.dataset.label || '';
                            const x = context.parsed.x;
                            const y = context.parsed.y;
                            return `${label}: (${x.toLocaleString()}, ${y.toLocaleString()})`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: xKey,
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                        color: '#4b5563'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: {
                            size: 12
                        }
                    }
                },
                y: {
                    type: 'linear',
                    title: {
                        display: true,
                        text: yKey,
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                        color: '#4b5563'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: {
                            size: 12
                        },
                        callback: function (value: any) {
                            return value.toLocaleString();
                        }
                    }
                }
            },
            interaction: {
                mode: 'nearest' as const,
                intersect: false
            }
        }
    };
}

export default DataVisualization;
