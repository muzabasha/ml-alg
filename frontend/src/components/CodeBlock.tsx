import React, { useState } from 'react';
import { Copy, Play, Check } from 'lucide-react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('python', python);

interface CodeBlockProps {
    code: string;
    language?: string;
    title?: string;
    description?: string;
    onExecute?: (code: string) => Promise<void>;
    isExecuting?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
    code,
    language = 'python',
    title,
    description,
    onExecute,
    isExecuting = false,
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleExecute = async () => {
        if (onExecute) {
            await onExecute(code);
        }
    };

    return (
        <div className="mb-6 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
            {(title || description) && (
                <div className="bg-slate-50 border-b border-slate-200 px-6 py-3">
                    {title && <h4 className="font-semibold text-slate-900">{title}</h4>}
                    {description && <p className="text-xs text-slate-500 mt-1">{description}</p>}
                </div>
            )}

            <div className="relative group">
                <SyntaxHighlighter
                    language={language}
                    style={atomOneDark}
                    customStyle={{
                        margin: 0,
                        padding: '1.5rem',
                        fontSize: '0.875rem',
                        lineHeight: '1.7',
                        backgroundColor: '#1a1a1a',
                    }}
                    showLineNumbers
                >
                    {code}
                </SyntaxHighlighter>

                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={handleCopy}
                        className="p-2 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg backdrop-blur-sm transition-all"
                        title="Copy code"
                    >
                        {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                    </button>
                    {onExecute && (
                        <button
                            onClick={handleExecute}
                            disabled={isExecuting}
                            className="p-2 bg-green-600/80 hover:bg-green-600 text-white rounded-lg backdrop-blur-sm transition-all disabled:opacity-50"
                            title="Execute code"
                        >
                            <Play size={16} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

interface CodeToggleProps {
    scratchCode: string;
    apiCode: string;
    scratchTitle?: string;
    apiTitle?: string;
    scratchDescription?: string;
    apiDescription?: string;
    comparison?: string;
    onExecute?: (code: string, type: 'scratch' | 'api') => Promise<void>;
    isExecuting?: boolean;
}

export const CodeToggle: React.FC<CodeToggleProps> = ({
    scratchCode,
    apiCode,
    scratchTitle = 'From Scratch (NumPy)',
    apiTitle = 'Using scikit-learn',
    scratchDescription,
    apiDescription,
    comparison,
    onExecute,
    isExecuting,
}) => {
    const [activeTab, setActiveTab] = useState<'scratch' | 'api'>('scratch');

    return (
        <div className="space-y-4">
            <div className="flex p-1 bg-slate-100 rounded-xl w-fit">
                <button
                    onClick={() => setActiveTab('scratch')}
                    className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'scratch'
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                >
                    {scratchTitle}
                </button>
                <button
                    onClick={() => setActiveTab('api')}
                    className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'api'
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                >
                    {apiTitle}
                </button>
            </div>

            {activeTab === 'scratch' ? (
                <CodeBlock
                    code={scratchCode}
                    title={scratchTitle}
                    description={scratchDescription}
                    onExecute={onExecute ? (code) => onExecute(code, 'scratch') : undefined}
                    isExecuting={isExecuting}
                />
            ) : (
                <CodeBlock
                    code={apiCode}
                    title={apiTitle}
                    description={apiDescription}
                    onExecute={onExecute ? (code) => onExecute(code, 'api') : undefined}
                    isExecuting={isExecuting}
                />
            )}

            {comparison && (
                <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
                    <div className="flex items-start space-x-3">
                        <span className="text-lg">💡</span>
                        <div>
                            <p className="text-sm font-bold text-amber-900 uppercase tracking-wider mb-1">Comparison</p>
                            <p className="text-sm text-amber-800 leading-relaxed">{comparison}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CodeBlock;
