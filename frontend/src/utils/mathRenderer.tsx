import React from 'react';
import dynamic from 'next/dynamic';

// Dynamic import for react-katex to avoid SSR issues
const InlineMath = dynamic(
    () => import('react-katex').then((mod) => mod.InlineMath),
    { ssr: false }
);

/**
 * Renders text with inline LaTeX expressions
 * Converts $...$ syntax to rendered math
 * 
 * Example: "The function $f(x) = x^2$ is quadratic"
 * Renders: The function [rendered: f(x) = x²] is quadratic
 */
export const renderTextWithMath = (text: string): JSX.Element => {
    // Split by $...$ patterns while keeping the delimiters
    const parts = text.split(/(\$[^$]+\$)/g);

    return (
        <>
            {parts.map((part, idx) => {
                // Check if this part is a math expression
                if (part.startsWith('$') && part.endsWith('$')) {
                    // Extract the LaTeX code (remove $ delimiters)
                    const math = part.slice(1, -1);
                    return <InlineMath key={idx} math={math} />;
                }
                // Regular text
                return <span key={idx}>{part}</span>;
            })}
        </>
    );
};

/**
 * Renders a paragraph with potential inline math
 */
export const MathParagraph: React.FC<{ children: string; className?: string }> = ({ children, className = '' }) => {
    return (
        <p className={className}>
            {renderTextWithMath(children)}
        </p>
    );
};

/**
 * Renders a heading with potential inline math
 */
export const MathHeading: React.FC<{ children: string; className?: string; level?: 1 | 2 | 3 | 4 | 5 | 6 }> = ({
    children,
    className = '',
    level = 3
}) => {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    return React.createElement(Tag, { className }, renderTextWithMath(children));
};
