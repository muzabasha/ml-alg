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

    useEffect(() => {
        if (!canvasRef.current || !data) {
            setError('No signal data available for rendering');
            return;
        }

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) {
            setError('Canvas core initialization failed');
            return;
        }

        try {
            const chartData = parseDataForVisualization(data, algorithmType);

            if (!chartData) {
                setError('Signal decomposition failed');
                return;
            }

            // Apply premium styling to chart config
            chartData.options = {
                ...chartData.options,
                font: { family: 'Outfit' },
                plugins: {
                    ...chartData.options.plugins,
                    legend: {
                        ...chartData.options.plugins.legend,
                        labels: {
                            font: { family: 'Outfit', weight: '900', size: 10 },
                            usePointStyle: true,
                            padding: 20
                        }
                    }
                }
            };

            chartRef.current = new ChartJS(ctx, chartData);
            setError(null);
        } catch (err) {
            console.error('Chart creation error:', err);
            setError('Rendering engine overflow');
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [data, algorithmType]);

    if (error) {
        return (
            <div className="my-12 p-12 bg-rose-50 rounded-[3rem] border border-rose-100 flex flex-col items-center justify-center text-center group">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-3xl mb-6 group-hover:rotate-12 transition-transform">⚠️</div>
                <h4 className="text-xs font-black text-rose-900 uppercase tracking-[0.4em] mb-4">Signal Lost</h4>
                <p className="text-sm text-rose-700 italic opacity-70">{error}</p>
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
            backgroundColor: 'rgba(79, 70, 229, 0.8)',
            borderColor: 'rgba(79, 70, 229, 1)',
            borderWidth: 2,
            pointRadius: 8,
            pointHoverRadius: 12,
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
                        backgroundColor: 'rgba(124, 58, 237, 0.4)',
                        borderColor: 'rgba(124, 58, 237, 1)',
                        borderWidth: 3,
                        pointRadius: 6,
                        type: 'scatter',
                        pointStyle: 'triangle'
                    });

                    const sortedPoints = [...predictionPoints].sort((a, b) => a.x - b.x);
                    datasets.push({
                        label: 'Fitted Signal',
                        data: sortedPoints,
                        borderColor: 'rgba(124, 58, 237, 0.8)',
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
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: true, position: 'top' },
                    title: {
                        display: true,
                        text: `${xKey} vs ${yKey} Projection`,
                        font: { family: 'Outfit', size: 24, weight: '900' },
                        color: '#0f172a',
                        padding: 30
                    },
                    tooltip: {
                        backgroundColor: '#0f172a',
                        padding: 16,
                        titleFont: { family: 'Outfit', weight: '900' },
                        bodyFont: { family: 'Outfit' },
                        cornerRadius: 16
                    }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(0,0,0,0.03)' },
                        title: { display: true, text: xKey, font: { weight: '900', family: 'Outfit' }, color: '#64748b' }
                    },
                    y: {
                        grid: { color: 'rgba(0,0,0,0.03)' },
                        title: { display: true, text: yKey, font: { weight: '900', family: 'Outfit' }, color: '#64748b' }
                    }
                }
            }
        };
    } catch (error) { return null; }
}

export default DataVisualization;
