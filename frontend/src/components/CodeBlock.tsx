import React, { useState } from 'react';

interface CodeBlockProps {
    code: string;
    language?: string;
    showCopy?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'python', showCopy = true }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className="relative group my-6 shadow-lg rounded-xl overflow-hidden border border-gray-700 bg-gray-900">
            {/* Header / Language Bar */}
            <div className="bg-gray-800 px-4 py-2 flex justify-between items-center border-b border-gray-700">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    {language}
                </span>
                {showCopy && (
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-all text-xs font-medium"
                        title="Copy to clipboard"
                    >
                        {copied ? (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-green-400">Copied!</span>
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                </svg>
                                <span>Copy Code</span>
                            </>
                        )}
                    </button>
                )}
            </div>

            {/* Code Content */}
            <div className="p-6 overflow-x-auto">
                <pre className="text-gray-100 text-sm leading-relaxed font-mono whitespace-pre">
                    <code>{code}</code>
                </pre>
            </div>
        </div>
    );
};

export default CodeBlock;
