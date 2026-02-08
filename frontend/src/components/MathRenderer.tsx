import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathRendererProps {
    latex: string;
    display?: boolean;
    className?: string;
}

export const MathRenderer: React.FC<MathRendererProps> = ({
    latex,
    display = false,
    className = '',
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current && latex) {
            try {
                katex.render(latex, containerRef.current, {
                    displayMode: display,
                    throwOnError: false,
                });
            } catch (error) {
                console.error('KaTeX rendering error:', error);
                if (containerRef.current) {
                    containerRef.current.textContent = latex;
                }
            }
        }
    }, [latex, display]);

    return (
        <div
            ref={containerRef}
            className={`${display ? 'flex justify-center my-6 p-6 bg-slate-50 border border-slate-100 rounded-xl shadow-inner scroll-x-auto' : 'inline'
                } ${className}`}
        />
    );
};

interface EquationBlockProps {
    name: string;
    latex: string;
    explanation: string;
}

export const EquationBlock: React.FC<EquationBlockProps> = ({
    name,
    latex,
    explanation,
}) => {
    return (
        <div className="mb-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl shadow-sm">
            <h4 className="font-bold text-blue-900 mb-4 text-lg border-b border-blue-200 pb-2">{name}</h4>
            <div className="overflow-x-auto">
                <MathRenderer latex={latex} display={true} />
            </div>
            <div className="mt-4 flex items-start space-x-3">
                <div className="min-w-fit mt-1">
                    <span className="text-blue-500 font-bold ml-1 italic">i</span>
                </div>
                <p className="text-blue-800 text-sm leading-relaxed">{explanation}</p>
            </div>
        </div>
    );
};

export default MathRenderer;
