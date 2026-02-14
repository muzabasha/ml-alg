import React from 'react';
import dynamic from 'next/dynamic';

const CodeBlock = dynamic(() => import('./CodeBlock'), {
    ssr: false,
    loading: () => <div className="h-40 bg-slate-900 rounded-[2.5rem] animate-pulse my-6"></div>
});

interface EnhancedSampleIOProps {
    content: any;
    icon: string;
    accent: string;
}

const EnhancedSampleIO: React.FC<EnhancedSampleIOProps> = ({ content, icon, accent }) => {
    try {
        if (!content) {
            return (
                <div className="bg-slate-50 rounded-[3rem] p-12 border border-slate-100 italic text-slate-400 text-center">
                    Signal buffer empty. No sample data detected.
                </div>
            );
        }

        const hasStructuredData = typeof content === 'object' && content !== null && (content.input || content.output);

        if (!hasStructuredData) {
            return (
                <div className="space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-3xl shadow-2xl shadow-indigo-100">{icon}</div>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase tracking-[0.1em]">Signal Manifest</h3>
                    </div>
                    <CodeBlock
                        code={typeof content === 'string' ? content : JSON.stringify(content, null, 2)}
                        language={typeof content === 'string' ? 'text' : 'json'}
                    />
                </div>
            );
        }

        return (
            <div className="space-y-16 animate-fadeIn">
                {/* Header */}
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-slate-950 rounded-[2rem] flex items-center justify-center text-4xl shadow-2xl text-white italic transition-transform hover:rotate-12">Σ</div>
                    <div>
                        <h3 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">
                            {content.title || 'Signal Decomposition'}
                        </h3>
                        {content.description && (
                            <p className="text-slate-500 mt-3 text-lg font-light italic">{content.description}</p>
                        )}
                    </div>
                </div>

                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Input Section */}
                    {content.input && (
                        <div className="bg-white rounded-[4rem] border border-slate-100 shadow-[0_32px_64px_-16px_rgba(2,6,23,0.05)] overflow-hidden group">
                            <div className="bg-slate-950 px-10 py-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-lg">📥</div>
                                    <div>
                                        <h4 className="text-xs font-black text-white uppercase tracking-[0.4em]">Input Manifold</h4>
                                        {content.input.format && (
                                            <p className="text-indigo-400 text-[9px] font-black uppercase mt-1 tracking-widest">{String(content.input.format)}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="p-10">
                                {content.input.table && Array.isArray(content.input.table) ? (
                                    <div className="overflow-x-auto no-scrollbar">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="border-b border-slate-50">
                                                    {Object.keys(content.input.table[0] || {}).map((key: string, idx: number) => (
                                                        <th key={idx} className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                            {String(key)}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-50">
                                                {content.input.table.map((row: any, idx: number) => (
                                                    <tr key={idx} className="hover:bg-indigo-50/30 transition-all group/row">
                                                        {Object.values(row).map((value: any, vidx: number) => (
                                                            <td key={vidx} className="px-6 py-5 text-sm font-medium text-slate-600 group-hover/row:text-slate-950">
                                                                {typeof value === 'number' ? value.toLocaleString() : String(value || '')}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <CodeBlock code={JSON.stringify(content.input, null, 2)} language="json" />
                                )}
                            </div>
                        </div>
                    )}

                    {/* Output Section */}
                    {content.output && (
                        <div className="bg-white rounded-[4rem] border border-slate-100 shadow-[0_32px_64px_-16px_rgba(2,6,23,0.05)] overflow-hidden group">
                            <div className="bg-indigo-600 px-10 py-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center text-xl shadow-lg">📤</div>
                                    <div>
                                        <h4 className="text-xs font-black text-white uppercase tracking-[0.4em]">Inference Result</h4>
                                        <p className="text-indigo-200 text-[9px] font-black uppercase mt-1 tracking-widest">Calculated Convergence</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-10 space-y-10">
                                {content.output.parameters && (
                                    <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100">
                                        <h5 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                                            <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                                            Learned Weights (β)
                                        </h5>
                                        <div className="grid grid-cols-1 gap-4">
                                            {Object.entries(content.output.parameters).map(([key, value]: [string, any], idx: number) => (
                                                <div key={idx} className="flex justify-between items-center bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-50 group/item">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover/item:text-indigo-600 transition-colors">{String(key)}</span>
                                                    <span className="text-sm font-black text-slate-950 font-mono italic">
                                                        {typeof value === 'number' ? value.toLocaleString() : String(value)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {content.output.predictions && (
                                    <div className="overflow-x-auto no-scrollbar">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="border-b border-slate-50">
                                                    {Object.keys(content.output.predictions[0] || {}).map((key: string, idx: number) => (
                                                        <th key={idx} className="px-5 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                                            {String(key)}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-50">
                                                {content.output.predictions.map((row: any, idx: number) => (
                                                    <tr key={idx} className="hover:bg-emerald-50/30 transition-all font-medium">
                                                        {Object.values(row).map((value: any, vidx: number) => (
                                                            <td key={vidx} className="px-5 py-4 text-sm text-slate-600">
                                                                {typeof value === 'number' ? value.toFixed(3) : String(value || '')}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {content.output.metrics && (
                                    <div className="grid grid-cols-2 gap-4">
                                        {Object.entries(content.output.metrics).map(([key, value]: [string, any], idx: number) => (
                                            <div key={idx} className="bg-emerald-50 rounded-[2rem] p-6 border border-emerald-100 relative group/stat overflow-hidden">
                                                <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 rounded-full blur-xl group-hover/stat:scale-150 transition-transform"></div>
                                                <div className="text-[9px] font-black text-emerald-800 uppercase tracking-widest mb-2 opacity-60">{String(key)}</div>
                                                <div className="text-2xl font-black text-emerald-950 tracking-tighter">
                                                    {typeof value === 'number' ? value.toFixed(4) : String(value)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Visualization Note */}
                {content.visualization && (
                    <div className="bg-indigo-600 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000"></div>
                        <div className="flex items-start gap-6 relative z-10">
                            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl">📈</div>
                            <div>
                                <h5 className="text-xs font-black uppercase tracking-[0.4em] mb-4 text-indigo-200">Architectural Note</h5>
                                <p className="text-2xl font-light italic leading-relaxed text-indigo-50">"{String(content.visualization)}"</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        return <div className="p-12 bg-rose-50 rounded-[3rem] text-rose-900 font-black text-center">Rendering Core Exception. Signal corrupted.</div>;
    }
};

export default EnhancedSampleIO;
