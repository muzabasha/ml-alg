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
        <div className="relative group my-8 rounded-[2.5rem] overflow-hidden border border-slate-800 bg-slate-950 shadow-[0_32px_64px_-16px_rgba(2,6,23,0.5)] transition-all duration-500 hover:scale-[1.01]">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none"></div>

            {/* Header / Language Bar */}
            <div className="bg-slate-900/50 backdrop-blur-md px-8 py-4 flex justify-between items-center border-b border-white/5 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500/20 border border-rose-500/40"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/40"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40"></div>
                    </div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-4">
                        {language} core
                    </span>
                </div>
                {showCopy && (
                    <button
                        onClick={handleCopy}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest active:scale-95 ${copied
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-white/5 text-slate-400 hover:bg-white hover:text-slate-900 border border-white/5'
                            }`}
                    >
                        {copied ? (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Copied</span>
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                </svg>
                                <span>Copy Signal</span>
                            </>
                        )}
                    </button>
                )}
            </div>

            {/* Code Content */}
            <div className="px-10 py-10 overflow-x-auto relative z-10 custom-scrollbar">
                <pre className="text-slate-300 text-sm leading-relaxed font-mono whitespace-pre italic">
                    <code className="block">{code}</code>
                </pre>
            </div>

            <div className="bg-slate-900/30 px-10 py-3 flex justify-end gap-6 text-[9px] font-black text-slate-600 uppercase tracking-widest border-t border-white/5 relative z-10">
                <span>UTF-8 Encoding</span>
                <span>Optimized Latency</span>
            </div>
        </div>
    );
};

export default CodeBlock;
