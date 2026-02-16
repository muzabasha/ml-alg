import React, { useEffect, useRef, useState } from 'react';
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
import { baseChartOptions, scatterChartOptions, chartColors } from '../config/chartConfig';
import { ChartLoadingPlaceholder, ChartErrorPlaceholder } from './ChartPlaceholders';

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

interface VisualizationProps {
    data: any;
    algorithmType: string;
}

const DataVisualization: React.FC<VisualizationProps> = ({ data, algorithmType }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<ChartJS | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!canvasRef.current || !data) {
            setError('No signal data available for rendering');
            setIsLoading(false);
            return;
        }

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) {
            setError('Canvas core initialization failed');
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            const chartData = parseDataForVisualization(data, algorithmType);

            if (!chartData) {
                setError('Signal decomposition failed');
                setIsLoading(false);
                return;
            }

            chartRef.current = new ChartJS(ctx, chartData);
            setError(null);
            setIsLoading(false);
        } catch (err) {
            console.error('Chart creation error:', err);
            setError('Rendering engine overflow');
            setIsLoading(false);
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [data, algorithmType]);

    if (isLoading) {
        return (
            <div className="my-12 p-12 bg-white rounded-[4rem] border border-slate-100 shadow-[0_64px_128px_-32px_rgba(2,6,23,0.05)] relative overflow-hidden">
                <div className="relative min-h-[300px] md:min-h-[400px] lg:min-h-[500px]">
                    <ChartLoadingPlaceholder />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="my-12 p-12 bg-white rounded-[4rem] border border-slate-100 shadow-[0_64px_128px_-32px_rgba(2,6,23,0.05)] relative overflow-hidden">
                <div className="relative min-h-[300px] md:min-h-[400px] lg:min-h-[500px]">
                    <ChartErrorPlaceholder message={error} />
                </div>
            </div>
        );
    }

    return (
        <div className="my-12 p-12 bg-white rounded-[4rem] border border-slate-100 shadow-[0_64px_128px_-32px_rgba(2,6,23,0.05)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[4rem] group-hover:bg-indigo-100 transition-colors"></div>
            <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-slate-950 rounded-2xl shadow-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform italic text-white">Σ</div>
                <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-[0.4em]">Tensor Visualization</h4>
                    <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest mt-1">High-Precision Signal Map</p>
                </div>
            </div>
            <div className="relative min-h-[300px] md:min-h-[400px] lg:min-h-[500px]">
                <canvas ref={canvasRef}></canvas>
            </div>
        </div>
    );
};

function parseDataForVisualization(data: any, algorithmType: string): any {
    try {
        if (data && data.input && data.input.table && Array.isArray(data.input.table)) {
            return createScatterPlotWithLine(data.input.table, data.output);
        }
        if (data && data.table && Array.isArray(data.table)) {
            return createScatterPlotWithLine(data.table, null);
        }
        return null;
    } catch (error) {
        return null;
    }
}

function createScatterPlotWithLine(tableData: any[], outputData: any): any {
    try {
        const keys = Object.keys(tableData[0] || {});
        if (keys.length < 2) return null;
        const xKey = keys[0];
        const yKey = keys[1];

        const dataPoints = tableData.map(row => ({
            x: Number(row[xKey]) || 0,
            y: Number(row[yKey]) || 0
        }));

        const datasets: any[] = [{
            label: 'Actual Tensors',
            data: dataPoints,
            backgroundColor: chartColors.primary.main,
            borderColor: chartColors.primary.border,
            borderWidth: 2,
            pointRadius: 8,
            pointHoverRadius: 12,
            pointStyle: 'circle',
            type: 'scatter'
        }];

        if (outputData && outputData.predictions && Array.isArray(outputData.predictions)) {
            const predKeys = Object.keys(outputData.predictions[0] || {});
            const predXKey = predKeys.find(k => k.toLowerCase().includes('square') || k.toLowerCase().includes('hours')) || predKeys[0];
            const predYKey = predKeys.find(k => k.toLowerCase().includes('predicted')) || predKeys[1];

            if (predXKey && predYKey) {
                const predictionPoints = outputData.predictions.map((pred: any) => ({
                    x: Number(pred[predXKey]) || 0,
                    y: Number(pred[predYKey]) || 0
                })).filter((p: any) => !isNaN(p.x) && !isNaN(p.y));

                if (predictionPoints.length > 0) {
                    datasets.push({
                        label: 'Model Predictions',
                        data: predictionPoints,
                        backgroundColor: chartColors.quaternary.light,
                        borderColor: chartColors.quaternary.border,
                        borderWidth: 3,
                        pointRadius: 6,
                        pointHoverRadius: 10,
                        type: 'scatter',
                        pointStyle: 'triangle'
                    });

                    const sortedPoints = [...predictionPoints].sort((a, b) => a.x - b.x);
                    datasets.push({
                        label: 'Fitted Signal',
                        data: sortedPoints,
                        borderColor: chartColors.quaternary.main,
                        borderWidth: 4,
                        fill: false,
                        type: 'line',
                        pointRadius: 0,
                        tension: 0.4
                    });
                }
            }
        }

        return {
            type: 'scatter',
            data: { datasets },
            options: {
                ...scatterChartOptions,
                plugins: {
                    ...scatterChartOptions.plugins,
                    title: {
                        display: true,
                        text: `${xKey} vs ${yKey} Projection`,
                        font: { family: 'Outfit', size: 20, weight: '900' },
                        color: '#0f172a',
                        padding: { top: 10, bottom: 30 }
                    }
                },
                scales: {
                    x: {
                        ...scatterChartOptions.scales?.x,
                        title: {
                            display: true,
                            text: xKey,
                            font: { weight: '900', family: 'Outfit', size: 12 },
                            color: '#64748b',
                            padding: { top: 10 }
                        }
                    },
                    y: {
                        ...scatterChartOptions.scales?.y,
                        title: {
                            display: true,
                            text: yKey,
                            font: { weight: '900', family: 'Outfit', size: 12 },
                            color: '#64748b',
                            padding: { bottom: 10 }
                        }
                    }
                }
            }
        };
    } catch (error) { return null; }
}

export default DataVisualization;
