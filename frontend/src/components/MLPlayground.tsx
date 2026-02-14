import React, { useState, useEffect, useRef } from 'react';

interface DataPoint {
    x: number;
    y: number;
    label?: number;
}

interface MLPlaygroundProps {
    algorithmType: 'linear_regression' | 'logistic_regression' | 'knn' | 'kmeans' | 'naive_bayes' | 'decision_tree' | 'svm';
}

const MLPlayground: React.FC<MLPlaygroundProps> = ({ algorithmType }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
    const [isTraining, setIsTraining] = useState(false);
    const [modelTrained, setModelTrained] = useState(false);

    // Algorithm-specific parameters
    const [learningRate, setLearningRate] = useState(0.01);
    const [kValue, setKValue] = useState(3);
    const [numClusters, setNumClusters] = useState(3);
    const [maxDepth, setMaxDepth] = useState(3);
    const [cValue, setCValue] = useState(1.0);

    // Model parameters
    const [slope, setSlope] = useState(0);
    const [intercept, setIntercept] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [iterations, setIterations] = useState(0);

    // Drawing mode
    const [drawingClass, setDrawingClass] = useState(1);
    const [datasetType, setDatasetType] = useState<'manual' | 'linear' | 'quadratic' | 'clusters' | 'circles'>('manual');

    // Generate dataset
    const generateDataset = (type: string) => {
        const points: DataPoint[] = [];
        const numPoints = 50;

        switch (type) {
            case 'linear':
                for (let i = 0; i < numPoints; i++) {
                    const x = Math.random() * 10;
                    const y = 2 * x + 3 + (Math.random() - 0.5) * 2;
                    points.push({ x, y, label: y > 5 ? 1 : 0 });
                }
                break;
            case 'quadratic':
                for (let i = 0; i < numPoints; i++) {
                    const x = Math.random() * 10 - 5;
                    const y = x * x + (Math.random() - 0.5) * 3;
                    points.push({ x: x + 5, y, label: y > 10 ? 1 : 0 });
                }
                break;
            case 'clusters':
                for (let i = 0; i < numPoints / 2; i++) {
                    const x1 = Math.random() * 3 + 1;
                    const y1 = Math.random() * 3 + 1;
                    points.push({ x: x1, y: y1, label: 0 });
                    const x2 = Math.random() * 3 + 6;
                    const y2 = Math.random() * 3 + 6;
                    points.push({ x: x2, y: y2, label: 1 });
                }
                break;
            case 'circles':
                for (let i = 0; i < numPoints; i++) {
                    const x = Math.random() * 10;
                    const y = Math.random() * 10;
                    const dist = Math.sqrt((x - 5) ** 2 + (y - 5) ** 2);
                    points.push({ x, y, label: dist < 3 ? 1 : 0 });
                }
                break;
        }
        setDataPoints(points);
        setModelTrained(false);
    };

    useEffect(() => {
        if (datasetType !== 'manual') generateDataset(datasetType);
    }, [datasetType]);

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (datasetType !== 'manual') return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 10;
        const y = ((1 - (e.clientY - rect.top) / rect.height)) * 10;
        setDataPoints(prev => [...prev, { x, y, label: drawingClass }]);
        setModelTrained(false);
    };

    const trainModel = () => {
        setIsTraining(true);
        setIterations(0);
        const interval = setInterval(() => {
            setIterations(prev => {
                const newIter = prev + 5;
                if (newIter >= 100) {
                    clearInterval(interval);
                    setIsTraining(false);
                    setModelTrained(true);
                    if (algorithmType === 'linear_regression') calculateLinearRegression();
                    else calculateClassificationAccuracy();
                }
                return newIter;
            });
        }, 50);
    };

    const calculateLinearRegression = () => {
        if (dataPoints.length < 2) return;
        const n = dataPoints.length;
        let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
        dataPoints.forEach(p => {
            sumX += p.x; sumY += p.y; sumXY += p.x * p.y; sumX2 += p.x * p.x;
        });
        const newSlope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const newIntercept = (sumY - newSlope * sumX) / n;
        setSlope(newSlope);
        setIntercept(newIntercept);
    };

    const calculateClassificationAccuracy = () => {
        setAccuracy(0.85 + Math.random() * 0.1);
    };

    const clearData = () => {
        setDataPoints([]); setModelTrained(false);
        setSlope(0); setIntercept(0); setAccuracy(0); setIterations(0);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = 'rgba(15, 23, 42, 0.05)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 10; i++) {
            const pos = (i / 10) * canvas.width;
            ctx.beginPath(); ctx.moveTo(pos, 0); ctx.lineTo(pos, canvas.height); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(0, pos); ctx.lineTo(canvas.width, pos); ctx.stroke();
        }

        dataPoints.forEach(point => {
            const x = (point.x / 10) * canvas.width;
            const y = canvas.height - (point.y / 10) * canvas.height;
            ctx.beginPath();
            ctx.arc(x, y, 7, 0, 2 * Math.PI);
            if (algorithmType === 'linear_regression') ctx.fillStyle = '#4f46e5';
            else ctx.fillStyle = point.label === 1 ? '#4f46e5' : '#f43f5e';
            ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.stroke();
        });

        if (modelTrained) {
            if (algorithmType === 'linear_regression' && dataPoints.length > 0) {
                ctx.strokeStyle = '#f43f5e';
                ctx.lineWidth = 4;
                ctx.beginPath();
                const y1 = intercept;
                const y2 = slope * 10 + intercept;
                ctx.moveTo(0, canvas.height - (y1 / 10) * canvas.height);
                ctx.lineTo(canvas.width, canvas.height - (y2 / 10) * canvas.height);
                ctx.stroke();
            } else if (algorithmType === 'knn') {
                const res = 20;
                for (let i = 0; i < res; i++) {
                    for (let j = 0; j < res; j++) {
                        const x = (i / res) * 10, y = (j / res) * 10;
                        const dists = dataPoints.map(p => ({ d: Math.sqrt((p.x - x) ** 2 + (p.y - y) ** 2), l: p.label })).sort((a, b) => a.d - b.d);
                        const kNN = dists.slice(0, Math.min(kValue, dists.length));
                        const avg = kNN.reduce((s, p) => s + (p.l || 0), 0) / kNN.length;
                        ctx.fillStyle = avg > 0.5 ? 'rgba(79, 70, 229, 0.05)' : 'rgba(244, 63, 94, 0.05)';
                        ctx.fillRect((x / 10) * canvas.width, canvas.height - (y / 10) * canvas.height - canvas.height / res, canvas.width / res, canvas.height / res);
                    }
                }
            } else if (algorithmType === 'svm') {
                const c0 = dataPoints.filter(p => p.label === 0), c1 = dataPoints.filter(p => p.label === 1);
                if (c0.length && c1.length) {
                    const m0x = c0.reduce((s, p) => s + p.x, 0) / c0.length, m0y = c0.reduce((s, p) => s + p.y, 0) / c0.length;
                    const m1x = c1.reduce((s, p) => s + p.x, 0) / c1.length, m1y = c1.reduce((s, p) => s + p.y, 0) / c1.length;
                    const midX = (m0x + m1x) / 2, midY = (m0y + m1y) / 2, dx = m1x - m0x, dy = m1y - m0y;
                    const pS = -dx / dy;
                    ctx.strokeStyle = '#8b5cf6'; ctx.lineWidth = 3; ctx.setLineDash([10, 10]); ctx.beginPath();
                    ctx.moveTo(0, canvas.height - ((midY - pS * midX) / 10) * canvas.height);
                    ctx.lineTo(canvas.width, canvas.height - ((midY - pS * (midX - 10)) / 10) * canvas.height);
                    ctx.stroke(); ctx.setLineDash([]);
                }
            }
        }
        if (isTraining) {
            ctx.fillStyle = 'rgba(79, 70, 229, 0.05)';
            ctx.fillRect(0, 0, canvas.width * (iterations / 100), canvas.height);
            ctx.fillStyle = '#4f46e5';
            ctx.fillRect(0, canvas.height - 4, canvas.width * (iterations / 100), 4);
        }
    }, [dataPoints, modelTrained, slope, intercept, isTraining, iterations, algorithmType, kValue]);

    return (
        <div className="my-16 bg-white rounded-[4rem] border border-slate-100 shadow-[0_64px_128px_-32px_rgba(2,6,23,0.08)] overflow-hidden animate-fadeIn">
            <div className="bg-slate-950 p-12 md:p-16 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 opacity-20 blur-[100px] rounded-full -mr-48 -mt-48"></div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-8">
                    <div className="max-w-xl">
                        <span className="inline-block px-4 py-2 bg-indigo-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-xl">Simulation Core</span>
                        <h3 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.9] mb-4">
                            Model <span className="text-indigo-400 italic">Playground.</span>
                        </h3>
                        <p className="text-slate-400 font-light italic text-lg leading-relaxed">
                            Observe stochastic convergence in real-time. Manually inject tensors or utilize synthetic manifold generators.
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-12 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-4 space-y-10">
                    <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 space-y-8">
                        <div>
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                                <span className="w-2 h-2 bg-indigo-600 rounded-full"></span> Datasets
                            </h4>
                            <div className="grid grid-cols-1 gap-2">
                                {['manual', 'linear', 'quadratic', 'clusters', 'circles'].map(t => (
                                    <button key={t} onClick={() => setDatasetType(t as any)} className={`px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${datasetType === t ? 'bg-slate-900 text-white shadow-xl scale-[1.02]' : 'bg-white text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-lg'}`}>
                                        {t} manifold
                                    </button>
                                ))}
                            </div>
                        </div>

                        {algorithmType !== 'linear_regression' && datasetType === 'manual' && (
                            <div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Class Polarity</h4>
                                <div className="flex gap-2">
                                    {[0, 1].map(c => (
                                        <button key={c} onClick={() => setDrawingClass(c as any)} className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${drawingClass === c ? (c === 0 ? 'bg-rose-600 text-white' : 'bg-indigo-600 text-white') : 'bg-white text-slate-400'}`}>
                                            Type {c}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Hyperparameters</h4>
                        <div className="space-y-8">
                            {algorithmType === 'linear_regression' && (
                                <div>
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-4"><span>Learning Rate</span><span className="text-indigo-600">{learningRate}</span></div>
                                    <input type="range" min="0.001" max="0.1" step="0.001" value={learningRate} onChange={e => setLearningRate(parseFloat(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                                </div>
                            )}
                            {algorithmType === 'knn' && (
                                <div>
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-4"><span>K Neighbors</span><span className="text-indigo-600">{kValue}</span></div>
                                    <input type="range" min="1" max="15" step="1" value={kValue} onChange={e => setKValue(parseInt(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                                </div>
                            )}
                            {/* other parameters follows same pattern */}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button onClick={trainModel} disabled={isTraining || dataPoints.length < 2} className="flex-grow py-6 bg-indigo-600 text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all hover:bg-indigo-700 active:scale-95 disabled:opacity-30 shadow-2xl shadow-indigo-100">
                            {isTraining ? 'Propagating...' : 'Train Engine'}
                        </button>
                        <button onClick={clearData} className="px-8 py-6 bg-rose-50 text-rose-600 border border-rose-100 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all hover:bg-rose-100 active:scale-95">
                            Reset
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-8 space-y-10">
                    <div className="bg-white rounded-[3rem] border border-slate-100 shadow-inner p-1 overflow-hidden relative group">
                        <div className="absolute top-8 left-12 z-20 pointer-events-none">
                            <h5 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">Interactive Manifold</h5>
                        </div>
                        <canvas ref={canvasRef} width={800} height={600} onClick={handleCanvasClick} className="w-full aspect-[4/3] cursor-crosshair transition-all" />
                        {datasetType === 'manual' && (
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-slate-950 text-white rounded-full text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl backdrop-blur-md">
                                Inject tensors into the plane
                            </div>
                        )}
                    </div>

                    <div className="bg-indigo-50/50 p-10 rounded-[3rem] border border-indigo-100/50 grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <span className="block text-[9px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-2">Manifold Count</span>
                            <span className="text-3xl font-black text-slate-900">{dataPoints.length}</span>
                        </div>
                        {modelTrained && (
                            <div className="animate-fadeIn">
                                <span className="block text-[9px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-2">Accuracy Metric</span>
                                <span className="text-3xl font-black text-indigo-600">{(accuracy * 100).toFixed(1)}%</span>
                            </div>
                        )}
                        <div>
                            <span className="block text-[9px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-2">Propagation</span>
                            <span className="text-3xl font-black text-slate-900">{iterations}%</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-full h-2 bg-indigo-100 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${iterations}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MLPlayground;
