import React, { useState, useEffect, useRef } from 'react';

interface Layer {
    neurons: number;
}

interface DataPoint {
    x: number;
    y: number;
    label: number; // 0 or 1
}

const NeuralNetworkPlayground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [canvasSize, setCanvasSize] = useState({ width: 600, height: 400 });
    const [layers, setLayers] = useState<Layer[]>([
        { neurons: 2 }, // Input layer
        { neurons: 4 }, // Hidden layer 1
        { neurons: 4 }, // Hidden layer 2
        { neurons: 1 }  // Output layer
    ]);
    const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
    const [isTraining, setIsTraining] = useState(false);
    const [epoch, setEpoch] = useState(0);
    const [loss, setLoss] = useState(0);
    const [learningRate, setLearningRate] = useState(0.03);
    const [activationFunction, setActivationFunction] = useState<'relu' | 'sigmoid' | 'tanh'>('relu');
    const [datasetType, setDatasetType] = useState<'circle' | 'xor' | 'spiral' | 'gaussian'>('circle');

    // Generate dataset based on type
    const generateDataset = (type: string) => {
        const points: DataPoint[] = [];
        const numPoints = 100;

        for (let i = 0; i < numPoints; i++) {
            const x = Math.random() * 6 - 3; // -3 to 3
            const y = Math.random() * 6 - 3;
            let label = 0;

            switch (type) {
                case 'circle':
                    // Points inside circle are class 1
                    label = (x * x + y * y < 2) ? 1 : 0;
                    break;
                case 'xor':
                    // XOR pattern
                    label = (x * y > 0) ? 1 : 0;
                    break;
                case 'spiral':
                    // Spiral pattern
                    const angle = Math.atan2(y, x);
                    const radius = Math.sqrt(x * x + y * y);
                    label = (Math.sin(angle + radius) > 0) ? 1 : 0;
                    break;
                case 'gaussian':
                    // Two Gaussian clusters
                    const dist1 = Math.sqrt((x - 1) ** 2 + (y - 1) ** 2);
                    const dist2 = Math.sqrt((x + 1) ** 2 + (y + 1) ** 2);
                    label = (dist1 < dist2) ? 1 : 0;
                    break;
            }

            points.push({ x, y, label });
        }

        setDataPoints(points);
    };

    // Initialize dataset
    useEffect(() => {
        generateDataset(datasetType);
    }, [datasetType]);

    // Handle canvas resizing
    useEffect(() => {
        const updateCanvasSize = () => {
            if (!containerRef.current) return;
            const { width } = containerRef.current.getBoundingClientRect();
            const height = Math.min(400, width * 0.67); // Maintain aspect ratio with max height
            setCanvasSize({ width, height });
        };

        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);
        return () => window.removeEventListener('resize', updateCanvasSize);
    }, []);

    // Draw neural network visualization
    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw network
        drawNetwork(ctx, canvas.width, canvas.height);
    }, [layers, epoch, canvasSize]);

    const drawNetwork = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        const layerSpacing = width / (layers.length + 1);
        const nodeRadius = 20;

        // Draw connections first (so they appear behind nodes)
        for (let l = 0; l < layers.length - 1; l++) {
            const currentLayer = layers[l];
            const nextLayer = layers[l + 1];
            const x1 = layerSpacing * (l + 1);
            const x2 = layerSpacing * (l + 2);

            for (let i = 0; i < currentLayer.neurons; i++) {
                const y1 = (height / (currentLayer.neurons + 1)) * (i + 1);

                for (let j = 0; j < nextLayer.neurons; j++) {
                    const y2 = (height / (nextLayer.neurons + 1)) * (j + 1);

                    // Draw connection
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.strokeStyle = `rgba(100, 100, 255, ${0.1 + Math.random() * 0.3})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        // Draw nodes
        layers.forEach((layer, layerIndex) => {
            const x = layerSpacing * (layerIndex + 1);
            const neuronSpacing = height / (layer.neurons + 1);

            for (let i = 0; i < layer.neurons; i++) {
                const y = neuronSpacing * (i + 1);

                // Draw neuron
                ctx.beginPath();
                ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);

                // Color based on layer type
                if (layerIndex === 0) {
                    ctx.fillStyle = '#3b82f6'; // Blue for input
                } else if (layerIndex === layers.length - 1) {
                    ctx.fillStyle = '#ef4444'; // Red for output
                } else {
                    ctx.fillStyle = '#8b5cf6'; // Purple for hidden
                }

                ctx.fill();
                ctx.strokeStyle = '#1f2937';
                ctx.lineWidth = 2;
                ctx.stroke();

                // Draw activation (simulated)
                const activation = 0.5 + Math.sin(epoch * 0.1 + i) * 0.3;
                ctx.beginPath();
                ctx.arc(x, y, nodeRadius * activation, 0, 2 * Math.PI);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                ctx.fill();
            }
        });

        // Draw layer labels
        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';

        ctx.fillText('Input', layerSpacing, height - 10);
        for (let i = 1; i < layers.length - 1; i++) {
            ctx.fillText(`Hidden ${i}`, layerSpacing * (i + 1), height - 10);
        }
        ctx.fillText('Output', layerSpacing * layers.length, height - 10);
    };

    // Simulate training
    const startTraining = () => {
        setIsTraining(true);
        setEpoch(0);
    };

    const stopTraining = () => {
        setIsTraining(false);
    };

    const resetNetwork = () => {
        setIsTraining(false);
        setEpoch(0);
        setLoss(0);
    };

    // Training loop
    useEffect(() => {
        if (!isTraining) return;

        const interval = setInterval(() => {
            setEpoch(prev => prev + 1);
            // Simulate decreasing loss
            setLoss(prev => Math.max(0.01, prev * 0.99 + Math.random() * 0.01));
        }, 100);

        return () => clearInterval(interval);
    }, [isTraining]);

    // Add/remove neurons
    const updateLayerNeurons = (layerIndex: number, change: number) => {
        setLayers(prev => {
            const newLayers = [...prev];
            const newCount = Math.max(1, Math.min(8, newLayers[layerIndex].neurons + change));
            newLayers[layerIndex] = { neurons: newCount };
            return newLayers;
        });
    };

    // Add/remove hidden layers
    const addHiddenLayer = () => {
        if (layers.length < 6) {
            setLayers(prev => {
                const newLayers = [...prev];
                newLayers.splice(newLayers.length - 1, 0, { neurons: 4 });
                return newLayers;
            });
        }
    };

    const removeHiddenLayer = () => {
        if (layers.length > 2) {
            setLayers(prev => {
                const newLayers = [...prev];
                newLayers.splice(newLayers.length - 2, 1);
                return newLayers;
            });
        }
    };

    return (
        <div className="my-8 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-2xl border-2 border-indigo-200">
            <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🧠</span>
                <h3 className="text-2xl font-bold text-indigo-900">Neural Network Playground</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Panel - Controls */}
                <div className="space-y-6">
                    {/* Dataset Selection */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <span>📊</span> Dataset
                        </h4>
                        <div className="space-y-2">
                            {['circle', 'xor', 'spiral', 'gaussian'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setDatasetType(type as any)}
                                    className={`w-full px-4 py-2 rounded-lg font-semibold transition ${datasetType === type
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Network Architecture */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <span>🏗️</span> Architecture
                        </h4>
                        <div className="space-y-3">
                            {layers.map((layer, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <span className="text-sm font-semibold text-gray-700">
                                        {index === 0 ? 'Input' :
                                            index === layers.length - 1 ? 'Output' :
                                                `Hidden ${index}`}
                                    </span>
                                    {index !== 0 && index !== layers.length - 1 && (
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateLayerNeurons(index, -1)}
                                                className="w-8 h-8 bg-red-100 text-red-600 rounded hover:bg-red-200 font-bold"
                                            >
                                                -
                                            </button>
                                            <span className="w-8 text-center font-bold">{layer.neurons}</span>
                                            <button
                                                onClick={() => updateLayerNeurons(index, 1)}
                                                className="w-8 h-8 bg-green-100 text-green-600 rounded hover:bg-green-200 font-bold"
                                            >
                                                +
                                            </button>
                                        </div>
                                    )}
                                    {(index === 0 || index === layers.length - 1) && (
                                        <span className="font-bold text-gray-900">{layer.neurons}</span>
                                    )}
                                </div>
                            ))}
                            <div className="flex gap-2 pt-2">
                                <button
                                    onClick={addHiddenLayer}
                                    disabled={layers.length >= 6}
                                    className="flex-1 px-3 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
                                >
                                    + Layer
                                </button>
                                <button
                                    onClick={removeHiddenLayer}
                                    disabled={layers.length <= 2}
                                    className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
                                >
                                    - Layer
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Hyperparameters */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <span>⚙️</span> Hyperparameters
                        </h4>
                        <div className="space-y-3">
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
                            <div>
                                <label className="text-sm font-semibold text-gray-700 block mb-1">
                                    Activation Function
                                </label>
                                <select
                                    value={activationFunction}
                                    onChange={(e) => setActivationFunction(e.target.value as any)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="relu">ReLU</option>
                                    <option value="sigmoid">Sigmoid</option>
                                    <option value="tanh">Tanh</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Training Controls */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <span>🎮</span> Controls
                        </h4>
                        <div className="space-y-2">
                            {!isTraining ? (
                                <button
                                    onClick={startTraining}
                                    className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold transition"
                                >
                                    ▶️ Start Training
                                </button>
                            ) : (
                                <button
                                    onClick={stopTraining}
                                    className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-bold transition"
                                >
                                    ⏸️ Pause Training
                                </button>
                            )}
                            <button
                                onClick={resetNetwork}
                                className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-bold transition"
                            >
                                🔄 Reset
                            </button>
                        </div>
                    </div>

                    {/* Training Stats */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <span>📈</span> Training Stats
                        </h4>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Epoch:</span>
                                <span className="font-bold text-gray-900">{epoch}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Loss:</span>
                                <span className="font-bold text-gray-900">{loss.toFixed(4)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Data Points:</span>
                                <span className="font-bold text-gray-900">{dataPoints.length}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Center Panel - Network Visualization */}
                <div className="lg:col-span-2 space-y-6">
                    <div ref={containerRef} className="bg-white p-6 rounded-lg shadow-md">
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span>🕸️</span> Network Architecture
                        </h4>
                        <canvas
                            ref={canvasRef}
                            width={canvasSize.width}
                            height={canvasSize.height}
                            className="w-full border-2 border-gray-200 rounded-lg"
                            style={{ display: 'block' }}
                        />
                    </div>

                    {/* Data Visualization */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span>🎯</span> Data Distribution
                        </h4>
                        <div className="relative w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-200">
                            <svg width="100%" height="100%" viewBox="-3 -3 6 6" className="overflow-visible">
                                {/* Grid */}
                                <line x1="-3" y1="0" x2="3" y2="0" stroke="#ddd" strokeWidth="0.02" />
                                <line x1="0" y1="-3" x2="0" y2="3" stroke="#ddd" strokeWidth="0.02" />

                                {/* Data points */}
                                {dataPoints.map((point, idx) => (
                                    <circle
                                        key={idx}
                                        cx={point.x}
                                        cy={-point.y}
                                        r="0.08"
                                        fill={point.label === 1 ? '#3b82f6' : '#ef4444'}
                                        opacity="0.7"
                                    />
                                ))}
                            </svg>
                        </div>
                        <div className="flex justify-center gap-6 mt-4">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                                <span className="text-sm text-gray-700">Class 1</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                                <span className="text-sm text-gray-700">Class 0</span>
                            </div>
                        </div>
                    </div>

                    {/* Information Panel */}
                    <div className="bg-indigo-100 p-4 rounded-lg border-2 border-indigo-300">
                        <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                            <span>💡</span> How to Use
                        </h4>
                        <ul className="text-sm text-indigo-800 space-y-1">
                            <li>• Choose a dataset pattern to classify</li>
                            <li>• Adjust network architecture (add/remove layers and neurons)</li>
                            <li>• Set learning rate and activation function</li>
                            <li>• Click "Start Training" to watch the network learn</li>
                            <li>• Observe how the network adapts to the data</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NeuralNetworkPlayground;
