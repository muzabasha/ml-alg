import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const BlockMath = dynamic(
    () => import('react-katex').then((mod) => mod.BlockMath),
    { ssr: false }
);

const InlineMath = dynamic(
    () => import('react-katex').then((mod) => mod.InlineMath),
    { ssr: false }
);

interface TermDefinition {
    term: string;
    symbol?: string;
    definition: string;
    example?: string;
    color?: string;
}

interface EquationExplainerProps {
    equation: string;
    title: string;
    description: string;
    terms: TermDefinition[];
    interpretation: string;
    visualExample?: React.ReactNode;
    practicalUse?: string;
    className?: string;
}

export const EquationExplainer: React.FC<EquationExplainerProps> = ({
    equation,
    title,
    description,
    terms,
    interpretation,
    visualExample,
    practicalUse,
    className = '',
}) => {
    const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

    return (
        <div className={`bg-white rounded-[4rem] p-12 border border-slate-100 shadow-sm ${className}`}>
            {/* Title Section */}
            <div className="mb-10">
                <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">{title}</h3>
                <p className="text-base text-slate-600 leading-relaxed">{description}</p>
            </div>

            {/* Equation Display */}
            <div className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-[3rem] shadow-inner border border-indigo-100 mb-10 relative overflow-hidden">
                <div className="absolute top-4 right-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-white px-3 py-1 rounded-full">
                        Core Formula
                    </span>
                </div>
                <div className="flex items-center justify-center">
                    <BlockMath math={equation} />
                </div>
            </div>

            {/* Interpretation Section */}
            <div className="bg-slate-50 rounded-[2.5rem] p-10 mb-10 border border-slate-100">
                <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-xl font-black shrink-0">
                        💡
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-3">
                            What This Means
                        </h4>
                        <p className="text-lg text-slate-700 leading-relaxed font-light italic">
                            {interpretation}
                        </p>
                    </div>
                </div>
            </div>

            {/* Terms Breakdown */}
            <div className="mb-10">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8 border-b border-slate-100 pb-4">
                    Term-by-Term Breakdown
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {terms.map((term, idx) => (
                        <div
                            key={idx}
                            className={`bg-white border-2 rounded-[2rem] p-6 transition-all duration-300 cursor-pointer hover:shadow-lg ${expandedTerm === term.term
                                    ? 'border-indigo-600 shadow-xl scale-[1.02]'
                                    : 'border-slate-100 hover:border-indigo-200'
                                }`}
                            onClick={() => setExpandedTerm(expandedTerm === term.term ? null : term.term)}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    {term.symbol && (
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono text-lg font-bold ${term.color || 'bg-indigo-50 text-indigo-600'
                                            }`}>
                                            <InlineMath math={term.symbol} />
                                        </div>
                                    )}
                                    <div>
                                        <h5 className="text-sm font-black text-slate-900">{term.term}</h5>
                                        {term.symbol && (
                                            <p className="text-[10px] text-slate-400 font-mono">{term.symbol}</p>
                                        )}
                                    </div>
                                </div>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-transform ${expandedTerm === term.term ? 'bg-indigo-600 text-white rotate-180' : 'bg-slate-100 text-slate-400'
                                    }`}>
                                    ▼
                                </div>
                            </div>

                            <p className="text-sm text-slate-600 leading-relaxed mb-3">
                                {term.definition}
                            </p>

                            {expandedTerm === term.term && term.example && (
                                <div className="mt-4 pt-4 border-t border-slate-100 animate-fadeIn">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-2">
                                        Example
                                    </p>
                                    <p className="text-sm text-slate-600 leading-relaxed bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                                        {term.example}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Visual Example */}
            {visualExample && (
                <div className="mb-10">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8 border-b border-slate-100 pb-4">
                        Visual Illustration
                    </h4>
                    <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100">
                        {visualExample}
                    </div>
                </div>
            )}

            {/* Practical Use */}
            {practicalUse && (
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-[2.5rem] p-10 border border-emerald-100">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white text-xl font-black shrink-0">
                            🎯
                        </div>
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 mb-3">
                                Practical Application
                            </h4>
                            <p className="text-base text-slate-700 leading-relaxed">
                                {practicalUse}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Simplified version for inline explanations
interface InlineTermProps {
    term: string;
    definition: string;
    symbol?: string;
}

export const InlineTerm: React.FC<InlineTermProps> = ({ term, definition, symbol }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <span className="relative inline-block">
            <span
                className="font-medium text-indigo-600 border-b-2 border-dotted border-indigo-300 cursor-help"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                {term}
            </span>
            {showTooltip && (
                <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-slate-900 text-white text-sm p-4 rounded-2xl shadow-2xl animate-fadeIn">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-slate-900 rotate-45"></div>
                    {symbol && (
                        <div className="font-mono text-indigo-300 mb-2 text-center">
                            <InlineMath math={symbol} />
                        </div>
                    )}
                    <p className="leading-relaxed">{definition}</p>
                </div>
            )}
        </span>
    );
};

// Step-by-step equation breakdown
interface EquationStep {
    step: number;
    equation: string;
    explanation: string;
    highlight?: string;
}

interface StepByStepEquationProps {
    title: string;
    steps: EquationStep[];
    finalInsight: string;
}

export const StepByStepEquation: React.FC<StepByStepEquationProps> = ({
    title,
    steps,
    finalInsight,
}) => {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <div className="bg-white rounded-[4rem] p-12 border border-slate-100 shadow-sm">
            <h3 className="text-3xl font-black text-slate-900 mb-10 tracking-tight">{title}</h3>

            {/* Steps Navigation */}
            <div className="flex items-center gap-4 mb-10 overflow-x-auto pb-4">
                {steps.map((step, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveStep(idx)}
                        className={`flex items-center gap-3 px-6 py-3 rounded-[1.5rem] whitespace-nowrap transition-all ${activeStep === idx
                                ? 'bg-indigo-600 text-white shadow-xl scale-105'
                                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                            }`}
                    >
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black ${activeStep === idx ? 'bg-white text-indigo-600' : 'bg-white text-slate-400'
                            }`}>
                            {step.step}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-widest">
                            Step {step.step}
                        </span>
                    </button>
                ))}
            </div>

            {/* Active Step Display */}
            <div className="space-y-8 animate-fadeIn">
                <div className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-[3rem] shadow-inner border border-indigo-100">
                    <div className="flex items-center justify-center">
                        <BlockMath math={steps[activeStep].equation} />
                    </div>
                </div>

                <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-sm font-black shrink-0">
                            {steps[activeStep].step}
                        </div>
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-3">
                                Step {steps[activeStep].step} Explanation
                            </h4>
                            <p className="text-base text-slate-700 leading-relaxed">
                                {steps[activeStep].explanation}
                            </p>
                            {steps[activeStep].highlight && (
                                <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                                    <p className="text-sm text-amber-900 font-medium">
                                        💡 {steps[activeStep].highlight}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-10">
                <button
                    onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                    disabled={activeStep === 0}
                    className={`px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${activeStep === 0
                            ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                            : 'bg-slate-900 text-white hover:bg-slate-800 active:scale-95'
                        }`}
                >
                    ← Previous
                </button>
                <div className="text-sm text-slate-500 font-medium">
                    Step {activeStep + 1} of {steps.length}
                </div>
                <button
                    onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                    disabled={activeStep === steps.length - 1}
                    className={`px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${activeStep === steps.length - 1
                            ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                            : 'bg-indigo-600 text-white hover:bg-indigo-500 active:scale-95'
                        }`}
                >
                    Next →
                </button>
            </div>

            {/* Final Insight */}
            {activeStep === steps.length - 1 && (
                <div className="mt-10 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-[2.5rem] p-10 border border-emerald-100 animate-fadeIn">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white text-xl font-black shrink-0">
                            ✓
                        </div>
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 mb-3">
                                Final Understanding
                            </h4>
                            <p className="text-lg text-slate-700 leading-relaxed font-light italic">
                                {finalInsight}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EquationExplainer;
