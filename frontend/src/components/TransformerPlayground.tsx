import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'katex/dist/katex.min.css';

// Dynamic import for react-katex to avoid SSR issues
const BlockMath = dynamic(
    () => import('react-katex').then((mod) => mod.BlockMath),
    { ssr: false }
);

const InlineMath = dynamic(
    () => import('react-katex').then((mod) => mod.InlineMath),
    { ssr: false }
);

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
    const containerRef = useRef<HTMLDivElement>(null);
    const [canvasSize, setCanvasSize] = useState({ width: 800, height: 400 });
    const [activeTab, setActiveTab] = useState<'visualizer' | 'context' | 'architecture'>('visualizer');
    const [inputText, setInputText] = useState('The cat sat on the mat');
    const [tokens, setTokens] = useState<Token[]>([]);
    const [attentionWeights, setAttentionWeights] = useState<AttentionWeight[]>([]);
    const [selectedToken, setSelectedToken] = useState<number>(0);
    const [numHeads, setNumHeads] = useState(4);
    const [numLayers, setNumLayers] = useState(2);
    const [embeddingDim, setEmbeddingDim] = useState(64);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showPositionalEncoding, setShowPositionalEncoding] = useState(true);
    const [temperature, setTemperature] = useState(1.0);
    const [contextPair, setContextPair] = useState(0);

    const contextExamples = [
        {
            s1: "Wait at the bank of the river.",
            s2: "Go to the bank to deposit cash.",
            word: "bank",
            explanation: "In Sentence 1, 'bank' strongly attends to 'river' (Geographic context). In Sentence 2, it attends to 'deposit' and 'cash' (Financial context)."
        },
        {
            s1: "The bark of the oak tree is rough.",
            s2: "The angry dog started to bark.",
            word: "bark",
            explanation: "In Sentence 1, 'bark' is linked to 'tree'. In Sentence 2, it is linked to 'dog' and 'angry'."
        }
    ];

    const sampleSentences = [
        'The cat sat on the mat',
        'I love machine learning',
        'Transformers use attention mechanisms',
        'The quick brown fox jumps',
        'Natural language processing is amazing'
    ];

    // Generate random embedding vector seeded by word
    const generateRandomEmbedding = (dim: number, word?: string): number[] => {
        let seed = 0;
        if (word) {
            for (let i = 0; i < word.length; i++) seed += word.charCodeAt(i);
        }
        return Array.from({ length: dim }, (_, i) => {
            const val = Math.sin(seed + i) * 10000;
            return (val - Math.floor(val)) * 2 - 1;
        });
    };

    // Tokenize input text
    useEffect(() => {
        const words = inputText.toLowerCase().split(/\s+/).filter(w => w.length > 0);
        const newTokens: Token[] = words.map(word => ({
            text: word,
            embedding: generateRandomEmbedding(embeddingDim, word)
        }));
        setTokens(newTokens);
        if (newTokens.length > 0 && selectedToken >= newTokens.length) {
            setSelectedToken(0);
        }
    }, [inputText, embeddingDim]);

    // Handle canvas resizing
    useEffect(() => {
        const updateCanvasSize = () => {
            if (!containerRef.current) return;
            const { width } = containerRef.current.getBoundingClientRect();
            const height = Math.min(400, width * 0.5); // 2:1 aspect ratio with max height
            setCanvasSize({ width, height });
        };

        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);
        return () => window.removeEventListener('resize', updateCanvasSize);
    }, []);

    // Calculate attention weights using simplified self-attention
    const calculateAttention = () => {
        if (tokens.length === 0) return;

        setIsProcessing(true);
        const weights: AttentionWeight[] = [];

        for (let i = 0; i < tokens.length; i++) {
            for (let j = 0; j < tokens.length; j++) {
                const query = tokens[i].embedding;
                const key = tokens[j].embedding;

                let score = 0;
                for (let k = 0; k < Math.min(query.length, key.length); k++) {
                    score += query[k] * key[k];
                }

                // Inject contextual bias for common words if we are in context lab
                if (activeTab === 'context') {
                    const currentWord = tokens[i].text.toLowerCase();
                    const targetWord = contextExamples[contextPair].word;
                    const neighborWord = tokens[j].text.toLowerCase();

                    if (currentWord.includes(targetWord)) {
                        if (contextPair === 0) { // bank
                            if (inputText.includes("river") && neighborWord.includes("river")) score += 5;
                            if (inputText.includes("cash") && (neighborWord.includes("cash") || neighborWord.includes("deposit"))) score += 5;
                        } else if (contextPair === 1) { // bark
                            if (inputText.includes("tree") && neighborWord.includes("tree")) score += 5;
                            if (inputText.includes("dog") && (neighborWord.includes("dog") || neighborWord.includes("angry"))) score += 5;
                        }
                    }
                }

                score = score / Math.sqrt(embeddingDim);
                score = score / temperature;
                weights.push({ from: i, to: j, weight: score });
            }
        }

        // Softmax
        for (let i = 0; i < tokens.length; i++) {
            const tokenWeights = weights.filter(w => w.from === i);
            const maxScore = Math.max(...tokenWeights.map(w => w.weight));

            let sumExp = 0;
            tokenWeights.forEach(w => {
                w.weight = Math.exp(w.weight - maxScore);
                sumExp += w.weight;
            });

            tokenWeights.forEach(w => {
                w.weight = w.weight / sumExp;
            });
        }

        setAttentionWeights(weights);
        setTimeout(() => setIsProcessing(false), 300);
    };

    useEffect(() => {
        if (tokens.length > 0) {
            calculateAttention();
        }
    }, [tokens, temperature, embeddingDim, activeTab, contextPair]);

    // Draw attention visualization
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || tokens.length === 0 || activeTab !== 'visualizer') return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const width = canvas.width;
        const height = canvas.height;
        const tokenSpacing = width / (tokens.length + 1);
        const tokenY = height / 2;
        const tokenRadius = 30;

        const selectedWeights = attentionWeights.filter(w => w.from === selectedToken);

        selectedWeights.forEach(weight => {
            const fromX = tokenSpacing * (selectedToken + 1);
            const toX = tokenSpacing * (weight.to + 1);
            const opacity = weight.weight;
            const lineWidth = 1 + weight.weight * 12;

            const hue = 220 + weight.weight * 100;
            ctx.strokeStyle = `hsla(${hue}, 80%, 50%, ${opacity})`;
            ctx.lineWidth = lineWidth;

            ctx.beginPath();
            ctx.moveTo(fromX, tokenY);
            const controlY = tokenY - 120 - weight.weight * 60;
            const midX = (fromX + toX) / 2;
            ctx.quadraticCurveTo(midX, controlY, toX, tokenY);
            ctx.stroke();

            if (weight.weight > 0.15) {
                ctx.fillStyle = `hsla(${hue}, 80%, 30%, ${opacity})`;
                ctx.font = 'bold 10px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(weight.weight.toFixed(2), midX, controlY - 10);
            }
        });

        tokens.forEach((token, idx) => {
            const x = tokenSpacing * (idx + 1);
            const y = tokenY;
            const isSelected = idx === selectedToken;
            const isTarget = selectedWeights.some(w => w.to === idx);

            ctx.beginPath();
            ctx.arc(x, y, tokenRadius, 0, 2 * Math.PI);

            if (isSelected) {
                ctx.fillStyle = '#4f46e5';
                ctx.strokeStyle = '#312e81';
                ctx.lineWidth = 4;
            } else if (isTarget) {
                const weight = selectedWeights.find(w => w.to === idx)?.weight || 0;
                const intensity = Math.floor(weight * 255);
                ctx.fillStyle = `rgb(${240 - intensity / 2}, ${240 - intensity / 2}, 255)`;
                ctx.strokeStyle = '#818cf8';
                ctx.lineWidth = 2 + weight * 5;
            } else {
                ctx.fillStyle = '#f8fafc';
                ctx.strokeStyle = '#e2e8f0';
                ctx.lineWidth = 1;
            }

            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = isSelected ? '#ffffff' : '#1e293b';
            ctx.font = 'bold 12px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(token.text, x, y);
        });

    }, [tokens, attentionWeights, selectedToken, activeTab, canvasSize]);

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas || tokens.length === 0) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const tokenSpacing = canvas.width / (tokens.length + 1);
        const tokenY = canvas.height / 2;
        const tokenRadius = 30;

        tokens.forEach((_, idx) => {
            const tokenX = tokenSpacing * (idx + 1);
            const distance = Math.sqrt((x - tokenX) ** 2 + (y - tokenY) ** 2);
            if (distance <= tokenRadius) setSelectedToken(idx);
        });
    };

    return (
        <div className="my-12 p-8 bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-indigo-100 italic font-black">T</div>
                    <div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">Transformer <span className="text-indigo-600">Attention Lab</span></h3>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">Contextual Tensor Visualization</p>
                    </div>
                </div>
                <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-2">
                    {[
                        { id: 'visualizer', label: 'Playground', icon: '🎨' },
                        { id: 'context', label: 'Context Lab', icon: '🧠' },
                        { id: 'architecture', label: 'Architecture', icon: '🏗️' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-white text-indigo-600 shadow-xl' : 'text-slate-500 hover:bg-slate-200'}`}
                        >
                            <span className="mr-2">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {activeTab === 'visualizer' && (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-fadeIn">
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Input Sequence</h4>
                            <textarea
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:border-indigo-500 focus:outline-none text-xs font-medium"
                                rows={3}
                                placeholder="Enter text..."
                            />
                            <div className="mt-6 space-y-2">
                                {sampleSentences.map((s, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setInputText(s)}
                                        className="w-full text-left px-4 py-2 bg-white/50 hover:bg-white rounded-xl text-[10px] font-bold text-slate-500 border border-slate-100 transition"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                            <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-6">Hyper-Parameters</h4>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-[10px] font-black text-slate-400 mb-2"><span>TEMPERATURE</span><span>{temperature}</span></div>
                                    <input type="range" min="0.1" max="2.0" step="0.1" value={temperature} onChange={(e) => setTemperature(parseFloat(e.target.value))} className="w-full accent-indigo-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-3 space-y-8">
                        <div ref={containerRef} className="bg-white rounded-[2.5rem] p-1 shadow-2xl overflow-hidden border border-slate-200">
                            <canvas
                                ref={canvasRef}
                                width={canvasSize.width}
                                height={canvasSize.height}
                                onClick={handleCanvasClick}
                                className="w-full cursor-crosshair bg-slate-50"
                                style={{ display: 'block' }}
                            />
                        </div>
                        <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-[2rem]">
                            <p className="text-xs text-indigo-700 font-medium leading-relaxed">
                                <span className="font-black mr-2">PRO TIP:</span> Click on individual tokens to see their <strong>Self-Attention Pattern</strong>. Thick, bright indigo curves represent tokens the model is "focusing" on to build meaning for the selected word.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'context' && (
                <div className="space-y-8 animate-fadeIn">
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
                        <h3 className="text-3xl font-black mb-6">Polysemy & Attention Shift</h3>
                        <p className="text-indigo-100 text-lg font-light leading-relaxed max-w-2xl mb-12">
                            How does a Transformer know if <span className="text-white font-bold italic">bank</span> means a river edge or a financial institution? It looks at the <strong>context words</strong>.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            {[contextExamples[contextPair].s1, contextExamples[contextPair].s2].map((s, i) => (
                                <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-[2.5rem] hover:bg-white/20 transition group">
                                    <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-6 underline decoration-indigo-500">Observation {i + 1}</h4>
                                    <div className="text-xl font-medium mb-8">
                                        {s.split(' ').map((w, j) => (
                                            <span
                                                key={j}
                                                className={`mr-2 px-3 py-1.5 rounded-xl transition-all ${w.toLowerCase().includes(contextExamples[contextPair].word) ? 'bg-indigo-600 text-white shadow-xl scale-110' : 'opacity-40'}`}
                                            >
                                                {w}
                                            </span>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => { setInputText(s); setActiveTab('visualizer'); }}
                                        className="text-[10px] font-black uppercase text-indigo-300 border-b-2 border-indigo-500 pb-1 hover:text-white hover:border-white transition-all"
                                    >
                                        Inspect Attention Tensor →
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="p-8 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20">
                            <h5 className="text-[10px] font-black uppercase text-indigo-100 mb-4">Architectural Interpretation</h5>
                            <p className="text-sm font-light leading-relaxed text-white">{contextExamples[contextPair].explanation}</p>
                        </div>
                    </div>

                    <div className="flex justify-center gap-4">
                        {contextExamples.map((_, i) => (
                            <button key={i} onClick={() => setContextPair(i)} className={`px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${contextPair === i ? 'bg-indigo-600 text-white shadow-xl' : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-50'}`}>
                                Challenge {i + 1}: {contextExamples[i].word}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'architecture' && (
                <div className="space-y-12 animate-fadeIn">
                    <div className="text-center max-w-3xl mx-auto">
                        <h3 className="text-3xl font-black text-slate-900 mb-4">Anatomy of a Transformer Layer</h3>
                        <p className="text-slate-500 font-light text-lg">Stage-by-stage transformation of raw tokens into semantic tensors.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { step: "01", title: "Input Embedding", desc: "Discrete word IDs are transformed into continuous vectors in latent space.", math: "X_{emb} = W_e \\cdot Tokens", color: "indigo", height: "h-16" },
                            { step: "02", title: "Positional Encoding", desc: "Since Transformers have no recurrence, we inject order using Sine waves.", math: "\\begin{aligned}PE_{(pos, 2i)} = \\\\\\sin(pos/10000^{2i/d})\\end{aligned}", color: "purple", height: "h-20" },
                            { step: "03", title: "Multi-Head Attention", desc: "The core engine. It computes 'relevance scores' using Query/Key dot products.", math: "\\begin{aligned}Attn = \\text{softmax}\\\\(\\frac{QK^T}{\\sqrt{d_k}})V\\end{aligned}", color: "emerald", height: "h-24" },
                            { step: "04", title: "Residual Add & Norm", desc: "Original input is added back to output to prevent gradient vanishing.", math: "\\begin{aligned}\\text{LayerNorm}\\\\(x + \\text{Sublayer}(x))\\end{aligned}", color: "amber", height: "h-20" },
                            { step: "05", title: "Feed-Forward (FFN)", desc: "Deep non-linear expansion (usually 4x d_model) for complex feature extraction.", math: "\\begin{aligned}\\text{FFN}(x) = \\\\\\text{ReLU}(xW_1 + b_1)\\\\W_2 + b_2\\end{aligned}", color: "rose", height: "h-28" },
                            { step: "06", title: "Output Projection", desc: "Contextual vectors are projected back to vocabulary space for prediction.", math: "y = \\text{softmax}(Linear(z))", color: "slate", height: "h-16" }
                        ].map((s, i) => (
                            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm border-t-8 transition-all hover:scale-[1.02] hover:shadow-xl" style={{ borderTopColor: `var(--color-${s.color}-500, ${s.color === 'indigo' ? '#6366f1' : s.color === 'purple' ? '#a855f7' : s.color === 'emerald' ? '#10b981' : s.color === 'amber' ? '#f59e0b' : s.color === 'rose' ? '#f43f5e' : '#1e293b'})` }}>
                                <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">Step {s.step}</div>
                                <h4 className="text-xl font-black text-slate-900 mb-4">{s.title}</h4>
                                <p className="text-xs text-slate-500 font-medium leading-relaxed mb-8">{s.desc}</p>
                                <div className={`p-6 bg-slate-50 rounded-2xl ${s.height} flex items-center justify-center overflow-x-auto`}>
                                    <BlockMath math={s.math} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-slate-900 rounded-[3rem] p-16 text-white text-center shadow-2xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-500/10 to-transparent"></div>
                        <h3 className="text-3xl font-black mb-8">Propagation Flow</h3>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                            <div className="px-8 py-4 bg-indigo-600 rounded-2xl text-xs font-black shadow-xl">INPUT TENSOR</div>
                            <div className="text-slate-700 font-black">▶▶</div>
                            <div className="px-8 py-4 bg-slate-800 rounded-2xl text-xs font-black border border-white/10 lowercase tracking-widest italic">N x transformer_blocks</div>
                            <div className="text-slate-700 font-black">▶▶</div>
                            <div className="px-8 py-4 bg-emerald-600 rounded-2xl text-xs font-black shadow-xl">PROBABILITY DIST</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransformerPlayground;
