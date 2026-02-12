import React, { useState, useEffect, useRef } from 'react';

interface Token {
    text: string;
    embedding: number[];
}

interface AttentionWeight {
    from: number;
    to: number;
    weight: number;
}

const TransformerPlayground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [inputText, setInputText] = useState('The cat sat on the mat');
    const [tokens, setTokens] = useState<Token[]>([]);
    const [attentionWeights, setAttentionWeights] = useState<AttentionWeight[]>([]);
    const [selectedToken, setSelectedToken] = useState<number>(0);
    const [numHeads, setNumHeads] = useState(4);
    const [numLayers, setNumLayers] = useState(2);
    const [embeddingDim, setEmbeddingDim] = useState(64);
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentLayer, setCurrentLayer] = useState(0);
    const [showPositionalEncoding, setShowPositionalEncoding] = useState(true);
    const [temperature, setTemperature] = useState(1.0);

    // Tokenize input text
    useEffect(() => {
        const words = inputText.toLowerCase().split(/\s+/).filter(w => w.length > 0);
        const newTokens: Token[] = words.map(word => ({
            text: word,
            embedding: generateRandomEmbedding(embeddingDim)
        }));
        setTokens(newTokens);
        if (newTokens.length > 0 && selectedToken >= newTokens.length) {
            setSelectedToken(0);
        }
    }, [inputText, embeddingDim]);

    // Generate random embedding vector
    const generateRandomEmbedding = (dim: number): number[] => {
        return Array.from({ length: dim }, () => Math.random() * 2 - 1);
    };

    // Calculate attention weights using simplified self-attention
    const calculateAttention = () => {
        if (tokens.length === 0) return;

        setIsProcessing(true);
        const weights: AttentionWeight[] = [];

        // Simulate self-attention calculation
        for (let i = 0; i < tokens.length; i++) {
            for (let j = 0; j < tokens.length; j++) {
                // Simplified dot product attention
                const query = tokens[i].embedding;
                const key = tokens[j].embedding;

                // Dot product
                let score = 0;
                for (let k = 0; k < Math.min(query.length, key.length); k++) {
                    score += query[k] * key[k];
                }

                // Scale by sqrt(d_k)
                score = score / Math.sqrt(embeddingDim);

                // Apply temperature
                score = score / temperature;

                weights.push({ from: i, to: j, weight: score });
            }
        }

        // Softmax normalization for each query token
        for (let i = 0; i < tokens.length; i++) {
            const tokenWeights = weights.filter(w => w.from === i);
            const maxScore = Math.max(...tokenWeights.map(w => w.weight));

            // Exp and sum
            let sumExp = 0;
            tokenWeights.forEach(w => {
                w.weight = Math.exp(w.weight - maxScore);
                sumExp += w.weight;
            });

            // Normalize
            tokenWeights.forEach(w => {
                w.weight = w.weight / sumExp;
            });
        }

        setAttentionWeights(weights);

        setTimeout(() => setIsProcessing(false), 500);
    };

    // Auto-calculate attention when tokens change
    useEffect(() => {
        if (tokens.length > 0) {
            calculateAttention();
        }
    }, [tokens, temperature, embeddingDim]);

    // Draw attention visualization
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || tokens.length === 0) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const width = canvas.width;
        const height = canvas.height;
        const tokenSpacing = width / (tokens.length + 1);
        const tokenY = height / 2;
        const tokenRadius = 30;

        // Draw attention lines from selected token
        const selectedWeights = attentionWeights.filter(w => w.from === selectedToken);

        selectedWeights.forEach(weight => {
            const fromX = tokenSpacing * (selectedToken + 1);
            const toX = tokenSpacing * (weight.to + 1);

            // Line opacity based on attention weight
            const opacity = weight.weight;
            const lineWidth = 1 + weight.weight * 8;

            // Color gradient based on weight
            const hue = 200 + weight.weight * 60; // Blue to cyan
            ctx.strokeStyle = `hsla(${hue}, 80%, 50%, ${opacity})`;
            ctx.lineWidth = lineWidth;

            // Draw curved line
            ctx.beginPath();
            ctx.moveTo(fromX, tokenY);

            const controlY = tokenY - 100 - weight.weight * 50;
            const midX = (fromX + toX) / 2;

            ctx.quadraticCurveTo(midX, controlY, toX, tokenY);
            ctx.stroke();

            // Draw weight label for strong connections
            if (weight.weight > 0.15) {
                ctx.fillStyle = `hsla(${hue}, 80%, 40%, ${opacity})`;
                ctx.font = 'bold 12px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(
                    weight.weight.toFixed(2),
                    midX,
                    controlY - 10
                );
            }
        });

        // Draw tokens
        tokens.forEach((token, idx) => {
            const x = tokenSpacing * (idx + 1);
            const y = tokenY;

            // Token circle
            const isSelected = idx === selectedToken;
            const isTarget = selectedWeights.some(w => w.to === idx);

            ctx.beginPath();
            ctx.arc(x, y, tokenRadius, 0, 2 * Math.PI);

            if (isSelected) {
                ctx.fillStyle = '#3b82f6';
                ctx.strokeStyle = '#1e40af';
                ctx.lineWidth = 4;
            } else if (isTarget) {
                const weight = selectedWeights.find(w => w.to === idx)?.weight || 0;
                const intensity = Math.floor(weight * 255);
                ctx.fillStyle = `rgb(${100 + intensity}, ${150 + intensity}, 255)`;
                ctx.strokeStyle = '#60a5fa';
                ctx.lineWidth = 3;
            } else {
                ctx.fillStyle = '#e5e7eb';
                ctx.strokeStyle = '#9ca3af';
                ctx.lineWidth = 2;
            }

            ctx.fill();
            ctx.stroke();

            // Token text
            ctx.fillStyle = isSelected ? '#ffffff' : '#1f2937';
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(token.text, x, y);

            // Attention score below token
            if (isTarget && !isSelected) {
                const weight = selectedWeights.find(w => w.to === idx)?.weight || 0;
                ctx.fillStyle = '#3b82f6';
                ctx.font = 'bold 11px Arial';
                ctx.fillText(weight.toFixed(3), x, y + tokenRadius + 15);
            }
        });

        // Draw legend
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('💡 Click on tokens to see their attention patterns', 10, 20);
        ctx.fillText(`🎯 Showing attention from: "${tokens[selectedToken]?.text}"`, 10, 40);

    }, [tokens, attentionWeights, selectedToken]);

    // Handle canvas click
    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas || tokens.length === 0) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const tokenSpacing = canvas.width / (tokens.length + 1);
        const tokenY = canvas.height / 2;
        const tokenRadius = 30;

        // Check which token was clicked
        tokens.forEach((token, idx) => {
            const tokenX = tokenSpacing * (idx + 1);
            const distance = Math.sqrt((x - tokenX) ** 2 + (y - tokenY) ** 2);

            if (distance <= tokenRadius) {
                setSelectedToken(idx);
            }
        });
    };

    // Sample sentences
    const sampleSentences = [
        'The cat sat on the mat',
        'I love machine learning',
        'Transformers use attention mechanisms',
        'The quick brown fox jumps',
        'Natural language processing is amazing'
    ];

    return (
        <div className="my-8 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-2xl border-2 border-purple-200">
            <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🤖</span>
                <h3 className="text-2xl font-bold text-purple-900">
                    Transformer Attention Playground
                </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left Panel - Controls */}
                <div className="space-y-4">
                    {/* Input Text */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <span>✍️</span> Input Text
                        </h4>
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-sm"
                            rows={3}
                            placeholder="Enter text to analyze..."
                        />
                        <div className="mt-2 text-xs text-gray-600">
                            {tokens.length} tokens
                        </div>
                    </div>

                    {/* Sample Sentences */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <span>📝</span> Samples
                        </h4>
                        <div className="space-y-2">
                            {sampleSentences.map((sentence, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setInputText(sentence)}
                                    className="w-full px-3 py-2 text-left text-sm bg-gray-100 hover:bg-purple-100 rounded-lg transition"
                                >
                                    {sentence}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Model Parameters */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <span>⚙️</span> Parameters
                        </h4>
                        <div className="space-y-3">
                            <div>
                                <label className="text-sm font-semibold text-gray-700 block mb-1">
                                    Attention Heads: {numHeads}
                                </label>
                                <input
                                    type="range"
                                    min="1"
                                    max="8"
                                    step="1"
                                    value={numHeads}
                                    onChange={(e) => setNumHeads(parseInt(e.target.value))}
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-700 block mb-1">
                                    Layers: {numLayers}
                                </label>
                                <input
                                    type="range"
                                    min="1"
                                    max="6"
                                    step="1"
                                    value={numLayers}
                                    onChange={(e) => setNumLayers(parseInt(e.target.value))}
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-700 block mb-1">
                                    Embedding Dim: {embeddingDim}
                                </label>
                                <input
                                    type="range"
                                    min="32"
                                    max="128"
                                    step="32"
                                    value={embeddingDim}
                                    onChange={(e) => setEmbeddingDim(parseInt(e.target.value))}
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-700 block mb-1">
                                    Temperature: {temperature.toFixed(1)}
                                </label>
                                <input
                                    type="range"
                                    min="0.1"
                                    max="2.0"
                                    step="0.1"
                                    value={temperature}
                                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                                    className="w-full"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Lower = sharper, Higher = smoother
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Options */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <span>🎛️</span> Options
                        </h4>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={showPositionalEncoding}
                                    onChange={(e) => setShowPositionalEncoding(e.target.checked)}
                                    className="w-4 h-4"
                                />
                                <span className="text-sm text-gray-700">Show Positional Encoding</span>
                            </label>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <span>📊</span> Stats
                        </h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tokens:</span>
                                <span className="font-bold text-gray-900">{tokens.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Parameters:</span>
                                <span className="font-bold text-gray-900">
                                    {(embeddingDim * embeddingDim * numHeads * numLayers / 1000).toFixed(1)}K
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Attention Ops:</span>
                                <span className="font-bold text-gray-900">
                                    {tokens.length * tokens.length * numHeads}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Visualization */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span>🔍</span> Self-Attention Visualization
                        </h4>
                        <canvas
                            ref={canvasRef}
                            width={800}
                            height={400}
                            onClick={handleCanvasClick}
                            className="w-full border-2 border-gray-200 rounded-lg cursor-pointer bg-gradient-to-b from-gray-50 to-white"
                        />
                        <p className="text-sm text-gray-600 mt-3 text-center">
                            Click on any token to see what it attends to
                        </p>
                    </div>

                    {/* Attention Matrix */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span>📈</span> Attention Matrix
                        </h4>
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs">
                                <thead>
                                    <tr>
                                        <th className="p-2 border border-gray-300 bg-gray-100">Query →<br />Key ↓</th>
                                        {tokens.map((token, idx) => (
                                            <th key={idx} className="p-2 border border-gray-300 bg-purple-100 font-bold">
                                                {token.text}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {tokens.map((queryToken, queryIdx) => (
                                        <tr key={queryIdx}>
                                            <td className="p-2 border border-gray-300 bg-purple-100 font-bold">
                                                {queryToken.text}
                                            </td>
                                            {tokens.map((keyToken, keyIdx) => {
                                                const weight = attentionWeights.find(
                                                    w => w.from === queryIdx && w.to === keyIdx
                                                )?.weight || 0;

                                                const intensity = Math.floor(weight * 255);
                                                const bgColor = `rgb(${255 - intensity}, ${255 - intensity / 2}, 255)`;

                                                return (
                                                    <td
                                                        key={keyIdx}
                                                        className="p-2 border border-gray-300 text-center font-mono"
                                                        style={{ backgroundColor: bgColor }}
                                                    >
                                                        {weight.toFixed(3)}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-gray-600 mt-3">
                            Darker purple = stronger attention. Each row sums to 1.0 (softmax normalized).
                        </p>
                    </div>

                    {/* Instructions */}
                    <div className="bg-purple-100 p-4 rounded-lg border-2 border-purple-300">
                        <h4 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                            <span>💡</span> How to Use
                        </h4>
                        <ul className="text-sm text-purple-800 space-y-1">
                            <li>• Type your own text or select a sample sentence</li>
                            <li>• Click on any token to see its attention pattern</li>
                            <li>• Thicker/brighter lines = stronger attention</li>
                            <li>• Adjust temperature to control attention sharpness</li>
                            <li>• The attention matrix shows all token-to-token weights</li>
                            <li>• Each row in the matrix represents one query token's attention distribution</li>
                        </ul>
                    </div>

                    {/* Key Concepts */}
                    <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                        <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                            <span>🎓</span> Key Concepts
                        </h4>
                        <div className="text-sm text-blue-800 space-y-2">
                            <p><strong>Self-Attention:</strong> Each token looks at all other tokens to understand context</p>
                            <p><strong>Query, Key, Value:</strong> Q finds what to look for, K is what to match, V is what to retrieve</p>
                            <p><strong>Multi-Head:</strong> Multiple attention patterns run in parallel for richer representations</p>
                            <p><strong>Softmax:</strong> Converts scores to probabilities (all weights sum to 1)</p>
                            <p><strong>Temperature:</strong> Controls how focused vs distributed the attention is</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransformerPlayground;
