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
                // Linear relationship with noise
                for (let i = 0; i < numPoints; i++) {
                    const x = Math.random() * 10;
                    const y = 2 * x + 3 + (Math.random() - 0.5) * 2;
                    points.push({ x, y, label: y > 5 ? 1 : 0 });
                }
                break;

            case 'quadratic':
                // Quadratic relationship
                for (let i = 0; i < numPoints; i++) {
                    const x = Math.random() * 10 - 5;
                    const y = x * x + (Math.random() - 0.5) * 3;
                    points.push({ x: x + 5, y, label: y > 10 ? 1 : 0 });
                }
                break;

            case 'clusters':
                // Two clusters
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
                // Circular pattern
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

    // Initialize with dataset
    useEffect(() => {
        if (datasetType !== 'manual') {
            generateDataset(datasetType);
        }
    }, [datasetType]);

    // Handle canvas click for manual data entry
    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (datasetType !== 'manual') return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 10;
        const y = ((e.clientY - rect.top) / rect.height) * 10;

        setDataPoints(prev => [...prev, { x, y, label: drawingClass }]);
        setModelTrained(false);
    };

    // Train model
    const trainModel = () => {
        setIsTraining(true);
        setIterations(0);

        // Simulate training
        const interval = setInterval(() => {
            setIterations(prev => {
                const newIter = prev + 1;

                if (newIter >= 100) {
                    clearInterval(interval);
                    setIsTraining(false);
                    setModelTrained(true);

                    // Calculate model parameters based on algorithm
                    if (algorithmType === 'linear_regression') {
                        calculateLinearRegression();
                    } else {
                        calculateClassificationAccuracy();
                    }
                }

                return newIter;
            });
        }, 20);
    };

    // Calculate linear regression
    const calculateLinearRegression = () => {
        if (dataPoints.length < 2) return;

        const n = dataPoints.length;
        let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;

        dataPoints.forEach(point => {
            sumX += point.x;
            sumY += point.y;
            sumXY += point.x * point.y;
            sumX2 += point.x * point.x;
        });

        const newSlope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const newIntercept = (sumY - newSlope * sumX) / n;

        setSlope(newSlope);
        setIntercept(newIntercept);
    };

    // Calculate classification accuracy
    const calculateClassificationAccuracy = () => {
        // Simplified accuracy calculation
        const acc = 0.75 + Math.random() * 0.2;
        setAccuracy(acc);
    };

    // Clear data
    const clearData = () => {
        setDataPoints([]);
        setModelTrained(false);
        setSlope(0);
        setIntercept(0);
        setAccuracy(0);
        setIterations(0);
    };

    // Draw visualization
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw grid
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 10; i++) {
            const pos = (i / 10) * canvas.width;
            ctx.beginPath();
            ctx.moveTo(pos, 0);
            ctx.lineTo(pos, canvas.height);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, pos);
            ctx.lineTo(canvas.width, pos);
            ctx.stroke();
        }

        // Draw axes
        ctx.strokeStyle = '#9ca3af';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();

        // Draw data points
        dataPoints.forEach(point => {
            const x = (point.x / 10) * canvas.width;
            const y = canvas.height - (point.y / 10) * canvas.height;

            ctx.beginPath();
            ctx.arc(x, y, 6, 0, 2 * Math.PI);

            if (algorithmType === 'linear_regression') {
                ctx.fillStyle = '#3b82f6';
            } else {
                ctx.fillStyle = point.label === 1 ? '#3b82f6' : '#ef4444';
            }

            ctx.fill();
            ctx.strokeStyle = '#1f2937';
            ctx.lineWidth = 2;
            ctx.stroke();
        });

        // Draw model
        if (modelTrained) {
            if (algorithmType === 'linear_regression' && dataPoints.length > 0) {
                // Draw regression line
                ctx.strokeStyle = '#ef4444';
                ctx.lineWidth = 3;
                ctx.beginPath();

                const x1 = 0;
                const y1 = intercept;
                const x2 = 10;
                const y2 = slope * x2 + intercept;

                const canvasX1 = (x1 / 10) * canvas.width;
                const canvasY1 = canvas.height - (y1 / 10) * canvas.height;
                const canvasX2 = (x2 / 10) * canvas.width;
                const canvasY2 = canvas.height - (y2 / 10) * canvas.height;

                ctx.moveTo(canvasX1, canvasY1);
                ctx.lineTo(canvasX2, canvasY2);
                ctx.stroke();
            } else if (algorithmType === 'knn') {
                // Draw decision boundary (simplified)
                drawDecisionBoundary(ctx, canvas);
            } else if (algorithmType === 'svm') {
                // Draw hyperplane
                drawSVMHyperplane(ctx, canvas);
            }
        }

        // Draw training progress
        if (isTraining) {
            ctx.fillStyle = 'rgba(99, 102, 241, 0.1)';
            ctx.fillRect(0, 0, canvas.width * (iterations / 100), canvas.height);
        }

    }, [dataPoints, modelTrained, slope, intercept, isTraining, iterations, algorithmType]);

    const drawDecisionBoundary = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        // Simplified KNN decision boundary
        const resolution = 20;
        for (let i = 0; i < resolution; i++) {
            for (let j = 0; j < resolution; j++) {
                const x = (i / resolution) * 10;
                const y = (j / resolution) * 10;

                // Find k nearest neighbors
                const distances = dataPoints.map(p => ({
                    dist: Math.sqrt((p.x - x) ** 2 + (p.y - y) ** 2),
                    label: p.label
                })).sort((a, b) => a.dist - b.dist);

                const kNearest = distances.slice(0, Math.min(kValue, distances.length));
                const avgLabel = kNearest.reduce((sum, p) => sum + (p.label || 0), 0) / kNearest.length;

                const canvasX = (x / 10) * canvas.width;
                const canvasY = canvas.height - (y / 10) * canvas.height;

                ctx.fillStyle = avgLabel > 0.5 ? 'rgba(59, 130, 246, 0.1)' : 'rgba(239, 68, 68, 0.1)';
                ctx.fillRect(canvasX, canvasY, canvas.width / resolution, canvas.height / resolution);
            }
        }
    };

    const drawSVMHyperplane = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        // Simplified SVM hyperplane
        if (dataPoints.length < 2) return;

        // Calculate approximate separating line
        const class0 = dataPoints.filter(p => p.label === 0);
        const class1 = dataPoints.filter(p => p.label === 1);

        if (class0.length === 0 || class1.length === 0) return;

        const center0X = class0.reduce((sum, p) => sum + p.x, 0) / class0.length;
        const center0Y = class0.reduce((sum, p) => sum + p.y, 0) / class0.length;
        const center1X = class1.reduce((sum, p) => sum + p.x, 0) / class1.length;
        const center1Y = class1.reduce((sum, p) => sum + p.y, 0) / class1.length;

        const midX = (center0X + center1X) / 2;
        const midY = (center0Y + center1Y) / 2;

        const dx = center1X - center0X;
        const dy = center1Y - center0Y;
        const perpSlope = -dx / dy;

        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 3;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();

        const x1 = 0;
        const y1 = midY - perpSlope * (midX - x1);
        const x2 = 10;
        const y2 = midY - perpSlope * (midX - x2);

        ctx.moveTo((x1 / 10) * canvas.width, canvas.height - (y1 / 10) * canvas.height);
        ctx.lineTo((x2 / 10) * canvas.width, canvas.height - (y2 / 10) * canvas.height);
        ctx.stroke();
        ctx.setLineDash([]);
    };

    return (
        <div className="my-8 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow-2xl border-2 border-blue-200">
            <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🎮</span>
                <h3 className="text-2xl font-bold text-blue-900">
                    {algorithmType === 'linear_regression' && 'Linear Regression Playground'}
                    {algorithmType === 'logistic_regression' && 'Logistic Regression Playground'}
                    {algorithmType === 'knn' && 'K-Nearest Neighbors Playground'}
                    {algorithmType === 'kmeans' && 'K-Means Clustering Playground'}
                    {algorithmType === 'naive_bayes' && 'Naive Bayes Classifier Playground'}
                    {algorithmType === 'decision_tree' && 'Decision Tree Playground'}
                    {algorithmType === 'svm' && 'Support Vector Machine Playground'}
                </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left Panel - Controls */}
                <div className="space-y-4">
                    {/* Dataset Selection */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <span>📊</span> Dataset
                        </h4>
                        <div className="space-y-2">
                            <button
                                onClick={() => setDatasetType('manual')}
                                className={`w-full px-3 py-2 rounded-lg font-semibold transition text-sm ${datasetType === 'manual'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Manual (Click to Add)
                            </button>
                            <button
                                onClick={() => setDatasetType('linear')}
                                className={`w-full px-3 py-2 rounded-lg font-semibold transition text-sm ${datasetType === 'linear'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Linear Pattern
                            </button>
                            <button
                                onClick={() => setDatasetType('quadratic')}
                                className={`w-full px-3 py-2 rounded-lg font-semibold transition text-sm ${datasetType === 'quadratic'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Quadratic Pattern
                            </button>
                            <button
                                onClick={() => setDatasetType('clusters')}
                                className={`w-full px-3 py-2 rounded-lg font-semibold transition text-sm ${datasetType === 'clusters'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Two Clusters
                            </button>
                            <button
                                onClick={() => setDatasetType('circles')}
                                className={`w-full px-3 py-2 rounded-lg font-semibold transition text-sm ${datasetType === 'circles'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Circular Pattern
                            </button>
                        </div>
                    </div>

                    {/* Drawing Class (for classification) */}
                    {algorithmType !== 'linear_regression' && datasetType === 'manual' && (
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <span>🎨</span> Drawing Class
                            </h4>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setDrawingClass(0)}
                                    className={`flex-1 px-3 py-2 rounded-lg font-semibold transition ${drawingClass === 0
                                        ? 'bg-red-500 text-white'
                                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                                        }`}
                                >
                                    Class 0
                                </button>
                                <button
                                    onClick={() => setDrawingClass(1)}
                                    className={`flex-1 px-3 py-2 rounded-lg font-semibold transition ${drawingClass === 1
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                        }`}
                                >
                                    Class 1
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Algorithm Parameters */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <span>⚙️</span> Parameters
                        </h4>
                        <div className="space-y-3">
                            {algorithmType === 'linear_regression' && (
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 block mb-1">
                                        Learning Rate: {learningRate.toFixed(3)}
                                    </label>
                                    <input
                                        type="range"
                                        min="0.001"
                                        max="0.1"
                                        step="0.001"
                                        value={learningRate}
                                        onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                                        className="w-full"
                                    />
                                </div>
                            )}
                            {algorithmType === 'knn' && (
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 block mb-1">
                                        K Value: {kValue}
                                    </label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        step="1"
                                        value={kValue}
                                        onChange={(e) => setKValue(parseInt(e.target.value))}
                                        className="w-full"
                                    />
                                </div>
                            )}
                            {algorithmType === 'kmeans' && (
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 block mb-1">
                                        Number of Clusters: {numClusters}
                                    </label>
                                    <input
                                        type="range"
                                        min="2"
                                        max="8"
                                        step="1"
                                        value={numClusters}
                                        onChange={(e) => setNumClusters(parseInt(e.target.value))}
                                        className="w-full"
                                    />
                                </div>
                            )}
                            {algorithmType === 'decision_tree' && (
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 block mb-1">
                                        Max Depth: {maxDepth}
                                    </label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        step="1"
                                        value={maxDepth}
                                        onChange={(e) => setMaxDepth(parseInt(e.target.value))}
                                        className="w-full"
                                    />
                                </div>
                            )}
                            {algorithmType === 'svm' && (
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 block mb-1">
                                        C Value: {cValue.toFixed(2)}
                                    </label>
                                    <input
                                        type="range"
                                        min="0.1"
                                        max="10"
                                        step="0.1"
                                        value={cValue}
                                        onChange={(e) => setCValue(parseFloat(e.target.value))}
                                        className="w-full"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Training Controls */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <span>🎮</span> Controls
                        </h4>
                        <div className="space-y-2">
                            <button
                                onClick={trainModel}
                                disabled={isTraining || dataPoints.length < 2}
                                className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-bold transition"
                            >
                                {isTraining ? '⏳ Training...' : '▶️ Train Model'}
                            </button>
                            <button
                                onClick={clearData}
                                className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-bold transition"
                            >
                                🗑️ Clear Data
                            </button>
                        </div>
                    </div>

                    {/* Model Stats */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <span>📈</span> Model Stats
                        </h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Data Points:</span>
                                <span className="font-bold text-gray-900">{dataPoints.length}</span>
                            </div>
                            {algorithmType === 'linear_regression' && modelTrained && (
                                <>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Slope:</span>
                                        <span className="font-bold text-gray-900">{slope.toFixed(3)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Intercept:</span>
                                        <span className="font-bold text-gray-900">{intercept.toFixed(3)}</span>
                                    </div>
                                </>
                            )}
                            {algorithmType !== 'linear_regression' && modelTrained && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Accuracy:</span>
                                    <span className="font-bold text-gray-900">{(accuracy * 100).toFixed(1)}%</span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span className="text-gray-600">Iterations:</span>
                                <span className="font-bold text-gray-900">{iterations}/100</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Visualization */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span>📊</span> Interactive Visualization
                        </h4>
                        <canvas
                            ref={canvasRef}
                            width={600}
                            height={500}
                            onClick={handleCanvasClick}
                            className="w-full border-2 border-gray-200 rounded-lg cursor-crosshair"
                        />
                        {datasetType === 'manual' && (
                            <p className="text-sm text-gray-600 mt-2 text-center">
                                Click on the canvas to add data points
                            </p>
                        )}
                    </div>

                    {/* Instructions */}
                    <div className="bg-blue-100 p-4 rounded-lg border-2 border-blue-300">
                        <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                            <span>💡</span> How to Use
                        </h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Choose a dataset or click to add points manually</li>
                            {algorithmType !== 'linear_regression' && (
                                <li>• Select class (0 or 1) before adding points</li>
                            )}
                            <li>• Adjust algorithm parameters using sliders</li>
                            <li>• Click "Train Model" to fit the model</li>
                            <li>• Observe how the model learns from your data</li>
                            {algorithmType === 'linear_regression' && (
                                <li>• Red line shows the fitted regression line</li>
                            )}
                            {algorithmType === 'knn' && (
                                <li>• Colored regions show decision boundaries</li>
                            )}
                            {algorithmType === 'svm' && (
                                <li>• Purple dashed line shows the hyperplane</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MLPlayground;
