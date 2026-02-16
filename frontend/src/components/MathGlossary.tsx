import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const InlineMath = dynamic(
    () => import('react-katex').then((mod) => mod.InlineMath),
    { ssr: false }
);

export interface GlossaryTerm {
    id: string;
    term: string;
    symbol?: string;
    category: 'algebra' | 'calculus' | 'statistics' | 'linear-algebra' | 'optimization' | 'probability';
    definition: string;
    intuition: string;
    example: string;
    relatedTerms?: string[];
    visualAid?: string;
}

export const mathGlossary: GlossaryTerm[] = [
    {
        id: 'gradient',
        term: 'Gradient',
        symbol: '\\nabla f',
        category: 'calculus',
        definition: 'A vector of partial derivatives that points in the direction of steepest ascent of a function.',
        intuition: 'Think of it as a compass that always points uphill on a mountain. In machine learning, we follow it downhill to find the minimum (best solution).',
        example: 'For f(x,y) = x² + y², the gradient is ∇f = [2x, 2y]. At point (1,1), it points toward (2,2), showing the steepest upward direction.',
        relatedTerms: ['derivative', 'partial-derivative', 'gradient-descent'],
        visualAid: 'Arrow pointing uphill on a 3D surface'
    },
    {
        id: 'loss-function',
        term: 'Loss Function',
        symbol: 'L(\\theta)',
        category: 'optimization',
        definition: 'A function that measures how wrong your model\'s predictions are compared to actual values.',
        intuition: 'It\'s like a score that tells you how badly your model is performing. Lower is better. The goal of training is to minimize this score.',
        example: 'Mean Squared Error: L = (1/n)Σ(yᵢ - ŷᵢ)². If you predict 5 but actual is 3, the loss contribution is (5-3)² = 4.',
        relatedTerms: ['cost-function', 'objective-function', 'mse'],
        visualAid: 'Bowl-shaped curve with minimum point'
    },
    {
        id: 'learning-rate',
        term: 'Learning Rate',
        symbol: '\\alpha',
        category: 'optimization',
        definition: 'A hyperparameter that controls how big of a step we take when updating model parameters.',
        intuition: 'Like the size of your steps when walking downhill. Too big and you might overshoot the valley. Too small and it takes forever to get there.',
        example: 'θ_new = θ_old - α∇L. If α=0.01 and gradient is 10, we update by -0.1. If α=0.1, we update by -1.0 (bigger step).',
        relatedTerms: ['gradient-descent', 'hyperparameter', 'step-size'],
        visualAid: 'Different step sizes on a curve'
    },
    {
        id: 'covariance',
        term: 'Covariance',
        symbol: 'Cov(X,Y)',
        category: 'statistics',
        definition: 'A measure of how two variables change together. Positive means they increase together, negative means one increases as the other decreases.',
        intuition: 'If height and weight have positive covariance, taller people tend to weigh more. If temperature and heating bills have negative covariance, higher temps mean lower bills.',
        example: 'Cov(X,Y) = E[(X-μₓ)(Y-μᵧ)]. If X=[1,2,3] and Y=[2,4,6], they move together perfectly, giving high positive covariance.',
        relatedTerms: ['correlation', 'variance', 'covariance-matrix'],
        visualAid: 'Scatter plot showing positive/negative relationships'
    },
    {
        id: 'eigenvalue',
        term: 'Eigenvalue',
        symbol: '\\lambda',
        category: 'linear-algebra',
        definition: 'A scalar that represents how much a matrix stretches or shrinks a vector in a particular direction (eigenvector).',
        intuition: 'When you transform a vector with a matrix, most vectors change direction. Eigenvectors only get scaled (stretched/shrunk) by their eigenvalue.',
        example: 'For matrix A, if Av = λv, then λ is the eigenvalue. If λ=2, the vector doubles in length. If λ=0.5, it halves.',
        relatedTerms: ['eigenvector', 'pca', 'matrix-decomposition'],
        visualAid: 'Vector being stretched along its direction'
    },
    {
        id: 'bias-variance',
        term: 'Bias-Variance Tradeoff',
        symbol: 'E[(y-\\hat{y})^2]',
        category: 'statistics',
        definition: 'The balance between a model being too simple (high bias) or too complex (high variance).',
        intuition: 'Bias is like consistently missing the bullseye in the same direction. Variance is like your shots being scattered all over. You want low bias AND low variance.',
        example: 'A straight line on curved data has high bias (too simple). A wiggly line through every point has high variance (too complex). A smooth curve is just right.',
        relatedTerms: ['overfitting', 'underfitting', 'model-complexity'],
        visualAid: 'Three plots showing underfitting, good fit, and overfitting'
    },
    {
        id: 'activation-function',
        term: 'Activation Function',
        symbol: '\\sigma(x)',
        category: 'algebra',
        definition: 'A non-linear function applied to neuron outputs in neural networks to introduce non-linearity.',
        intuition: 'Without activation functions, neural networks would just be fancy linear regression. They allow networks to learn complex, curved patterns.',
        example: 'ReLU: σ(x) = max(0,x). Negative inputs become 0, positive stay the same. Sigmoid: σ(x) = 1/(1+e⁻ˣ), squashes values between 0 and 1.',
        relatedTerms: ['relu', 'sigmoid', 'tanh', 'neural-network'],
        visualAid: 'Graphs of ReLU, Sigmoid, and Tanh functions'
    },
    {
        id: 'regularization',
        term: 'Regularization',
        symbol: 'L(\\theta) + \\lambda R(\\theta)',
        category: 'optimization',
        definition: 'A technique to prevent overfitting by adding a penalty term to the loss function that discourages complex models.',
        intuition: 'Like telling your model "keep it simple, stupid". It prevents the model from memorizing training data by penalizing large weights.',
        example: 'L2 regularization: L + λΣθ². If weights get too large, the penalty increases. λ controls how much we care about simplicity vs accuracy.',
        relatedTerms: ['l1-regularization', 'l2-regularization', 'ridge', 'lasso'],
        visualAid: 'Loss surface with regularization constraint'
    },
    {
        id: 'batch-normalization',
        term: 'Batch Normalization',
        symbol: '\\hat{x} = \\frac{x-\\mu}{\\sigma}',
        category: 'statistics',
        definition: 'A technique that normalizes layer inputs to have mean 0 and variance 1, making training faster and more stable.',
        intuition: 'Like standardizing test scores so everyone is on the same scale. It prevents some features from dominating just because they have larger values.',
        example: 'If a batch has values [1,2,3,4,5], mean=3, std=1.41. After normalization: [-1.41, -0.71, 0, 0.71, 1.41].',
        relatedTerms: ['normalization', 'standardization', 'layer-normalization'],
        visualAid: 'Distribution before and after normalization'
    },
    {
        id: 'cross-entropy',
        term: 'Cross-Entropy',
        symbol: 'H(p,q) = -\\sum p(x)\\log q(x)',
        category: 'probability',
        definition: 'A measure of the difference between two probability distributions, commonly used as a loss function for classification.',
        intuition: 'Measures how surprised you are by predictions. If you predict 90% cat and it is a cat, low surprise (low loss). If you predict 10% cat and it is a cat, high surprise (high loss).',
        example: 'True: [1,0,0] (cat). Predicted: [0.7,0.2,0.1]. Loss = -1×log(0.7) ≈ 0.36. If predicted [0.1,0.8,0.1], loss = -1×log(0.1) ≈ 2.3 (much worse).',
        relatedTerms: ['entropy', 'kl-divergence', 'log-loss'],
        visualAid: 'Probability distributions and their difference'
    },
    {
        id: 'momentum',
        term: 'Momentum',
        symbol: 'v_t = \\beta v_{t-1} + \\nabla L',
        category: 'optimization',
        definition: 'An optimization technique that accumulates past gradients to accelerate convergence and dampen oscillations.',
        intuition: 'Like a ball rolling downhill that builds up speed. It helps escape local minima and speeds up convergence in consistent directions.',
        example: 'If gradient points right for 10 steps, momentum builds up speed rightward. A single leftward gradient won\'t immediately reverse direction.',
        relatedTerms: ['sgd', 'adam', 'optimizer', 'velocity'],
        visualAid: 'Ball rolling down a hill with momentum'
    },
    {
        id: 'attention',
        term: 'Attention Mechanism',
        symbol: 'Attn(Q,K,V) = softmax(\\frac{QK^T}{\\sqrt{d_k}})V',
        category: 'linear-algebra',
        definition: 'A mechanism that allows models to focus on relevant parts of the input when making predictions.',
        intuition: 'Like highlighting important words in a sentence. When translating "The cat sat on the mat", the model pays more attention to "cat" when generating the translation for "cat".',
        example: 'In "I love this movie", when predicting sentiment, attention weights might be [0.1, 0.3, 0.1, 0.5], focusing most on "love" and "movie".',
        relatedTerms: ['self-attention', 'transformer', 'query-key-value'],
        visualAid: 'Heatmap showing attention weights'
    }
];

interface MathGlossaryProps {
    filterCategory?: GlossaryTerm['category'];
    searchable?: boolean;
    compact?: boolean;
}

export const MathGlossary: React.FC<MathGlossaryProps> = ({
    filterCategory,
    searchable = true,
    compact = false
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<GlossaryTerm['category'] | 'all'>(
        filterCategory || 'all'
    );
    const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

    const categories: Array<{ id: GlossaryTerm['category'] | 'all'; label: string; icon: string }> = [
        { id: 'all', label: 'All Terms', icon: '📚' },
        { id: 'algebra', label: 'Algebra', icon: '🔢' },
        { id: 'calculus', label: 'Calculus', icon: '📈' },
        { id: 'statistics', label: 'Statistics', icon: '📊' },
        { id: 'linear-algebra', label: 'Linear Algebra', icon: '🔷' },
        { id: 'optimization', label: 'Optimization', icon: '🎯' },
        { id: 'probability', label: 'Probability', icon: '🎲' },
    ];

    const filteredTerms = mathGlossary.filter(term => {
        const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
            term.definition.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="bg-white rounded-[4rem] p-12 border border-slate-100 shadow-sm">
            <div className="mb-10">
                <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
                    Mathematical Terms Glossary
                </h3>
                <p className="text-base text-slate-600 leading-relaxed">
                    Clear explanations and intuitive understanding of key mathematical concepts used in machine learning.
                </p>
            </div>

            {/* Search Bar */}
            {searchable && (
                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Search terms..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-6 py-4 rounded-[1.5rem] border-2 border-slate-200 focus:border-indigo-600 focus:outline-none text-base transition-all"
                    />
                </div>
            )}

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-10">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-6 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${selectedCategory === cat.id
                                ? 'bg-indigo-600 text-white shadow-xl scale-105'
                                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                            }`}
                    >
                        <span>{cat.icon}</span>
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Terms List */}
            <div className="space-y-4">
                {filteredTerms.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🔍</div>
                        <p className="text-slate-500">No terms found matching your search.</p>
                    </div>
                ) : (
                    filteredTerms.map(term => (
                        <div
                            key={term.id}
                            className={`border-2 rounded-[2rem] transition-all duration-300 ${expandedTerm === term.id
                                    ? 'border-indigo-600 shadow-xl'
                                    : 'border-slate-100 hover:border-indigo-200'
                                }`}
                        >
                            <button
                                onClick={() => setExpandedTerm(expandedTerm === term.id ? null : term.id)}
                                className="w-full p-6 text-left flex items-center justify-between"
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    {term.symbol && (
                                        <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center font-mono text-lg shrink-0">
                                            <InlineMath math={term.symbol} />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <h4 className="text-lg font-black text-slate-900 mb-1">{term.term}</h4>
                                        <p className="text-sm text-slate-600">{term.definition}</p>
                                    </div>
                                </div>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-transform shrink-0 ml-4 ${expandedTerm === term.id
                                        ? 'bg-indigo-600 text-white rotate-180'
                                        : 'bg-slate-100 text-slate-400'
                                    }`}>
                                    ▼
                                </div>
                            </button>

                            {expandedTerm === term.id && (
                                <div className="px-6 pb-6 space-y-6 animate-fadeIn">
                                    {/* Intuition */}
                                    <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
                                        <div className="flex items-start gap-3 mb-3">
                                            <span className="text-2xl">💡</span>
                                            <h5 className="text-[10px] font-black uppercase tracking-widest text-purple-600">
                                                Intuitive Understanding
                                            </h5>
                                        </div>
                                        <p className="text-base text-slate-700 leading-relaxed italic">
                                            {term.intuition}
                                        </p>
                                    </div>

                                    {/* Example */}
                                    <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
                                        <div className="flex items-start gap-3 mb-3">
                                            <span className="text-2xl">📝</span>
                                            <h5 className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                                                Concrete Example
                                            </h5>
                                        </div>
                                        <p className="text-base text-slate-700 leading-relaxed font-mono text-sm">
                                            {term.example}
                                        </p>
                                    </div>

                                    {/* Visual Aid */}
                                    {term.visualAid && (
                                        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                                            <div className="flex items-start gap-3 mb-3">
                                                <span className="text-2xl">🎨</span>
                                                <h5 className="text-[10px] font-black uppercase tracking-widest text-amber-600">
                                                    Visual Representation
                                                </h5>
                                            </div>
                                            <p className="text-sm text-slate-600 italic">
                                                {term.visualAid}
                                            </p>
                                        </div>
                                    )}

                                    {/* Related Terms */}
                                    {term.relatedTerms && term.relatedTerms.length > 0 && (
                                        <div>
                                            <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                                                Related Concepts
                                            </h5>
                                            <div className="flex flex-wrap gap-2">
                                                {term.relatedTerms.map(relatedId => {
                                                    const relatedTerm = mathGlossary.find(t => t.id === relatedId);
                                                    return relatedTerm ? (
                                                        <button
                                                            key={relatedId}
                                                            onClick={() => setExpandedTerm(relatedId)}
                                                            className="px-4 py-2 bg-slate-100 hover:bg-indigo-100 text-slate-700 hover:text-indigo-700 rounded-xl text-xs font-medium transition-all"
                                                        >
                                                            {relatedTerm.term}
                                                        </button>
                                                    ) : null;
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MathGlossary;
