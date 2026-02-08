import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface VisualizationProps {
    type: 'scatter' | 'line' | 'heatmap' | 'histogram' | 'box';
    data: any[];
    layout?: any;
    title?: string;
    xLabel?: string;
    yLabel?: string;
    height?: number;
}

export const Visualization: React.FC<VisualizationProps> = ({
    type,
    data,
    layout = {},
    title,
    xLabel = 'X',
    yLabel = 'Y',
    height = 400,
}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div style={{ height }} className="w-full bg-slate-100 rounded-xl animate-pulse" />;

    const defaultLayout = {
        title: {
            text: title || '',
            font: { family: 'inherit', size: 18, color: '#1e293b' },
        },
        xaxis: {
            title: xLabel,
            gridcolor: '#f1f5f9',
            linecolor: '#cbd5e1',
        },
        yaxis: {
            title: yLabel,
            gridcolor: '#f1f5f9',
            linecolor: '#cbd5e1',
        },
        hovermode: 'closest',
        height,
        autosize: true,
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        margin: { l: 60, r: 40, t: 60, b: 60 },
        font: { family: 'inherit', color: '#64748b' },
        ...layout,
    };

    return (
        <div className="w-full bg-white rounded-2xl border border-slate-200 p-6 shadow-sm overflow-hidden">
            <Plot
                data={data}
                layout={defaultLayout}
                useResizeHandler={true}
                style={{ width: '100%', height: '100%' }}
                config={{
                    responsive: true,
                    displayModeBar: false,
                    displaylogo: false,
                }}
            />
        </div>
    );
};

interface ScatterPlotProps {
    points: Array<{ x: number; y: number; label?: string }>;
    line?: { x: number[]; y: number[] };
    title?: string;
    xLabel?: string;
    yLabel?: string;
}

export const ScatterPlot: React.FC<ScatterPlotProps> = ({
    points,
    line,
    title = 'Scatter Plot',
    xLabel = 'X',
    yLabel = 'Y',
}) => {
    const traces: any[] = [
        {
            x: points.map(p => p.x),
            y: points.map(p => p.y),
            mode: 'markers',
            type: 'scatter',
            name: 'Data Points',
            marker: {
                size: 10,
                color: '#3b82f6',
                opacity: 0.6,
                line: { color: '#1d4ed8', width: 1 },
            },
        },
    ];

    if (line) {
        traces.push({
            x: line.x,
            y: line.y,
            mode: 'lines',
            type: 'scatter',
            name: 'Fitted Line',
            line: {
                color: '#f97316',
                width: 3,
                shape: 'spline',
            },
        });
    }

    return (
        <Visualization
            type="scatter"
            data={traces}
            title={title}
            xLabel={xLabel}
            yLabel={yLabel}
        />
    );
};

interface ConfusionMatrixProps {
    matrix: number[][];
    labels: string[];
    title?: string;
}

export const ConfusionMatrix: React.FC<ConfusionMatrixProps> = ({
    matrix,
    labels,
    title = 'Confusion Matrix',
}) => {
    const trace = {
        z: matrix,
        x: labels,
        y: labels,
        type: 'heatmap',
        colorscale: [
            [0, '#f8fafc'],
            [1, '#3b82f6'],
        ],
        showscale: true,
        xgap: 4,
        ygap: 4,
    };

    return (
        <Visualization
            type="heatmap"
            data={[trace]}
            title={title}
            xLabel="Predicted"
            yLabel="Actual"
            layout={{
                xaxis: { title: 'Predicted', side: 'bottom' },
                yaxis: { title: 'Actual', autorange: 'reversed' },
            }}
        />
    );
};

export default Visualization;
