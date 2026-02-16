import React from 'react';

// Loading component for charts
export const ChartLoadingPlaceholder = () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-50 rounded-2xl border border-slate-100">
        <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs font-black text-indigo-600 uppercase tracking-widest animate-pulse">
                Rendering Visualization
            </p>
        </div>
    </div>
);

// Error component for charts
export const ChartErrorPlaceholder = ({ message }: { message?: string }) => (
    <div className="w-full h-full flex items-center justify-center bg-rose-50 rounded-2xl border border-rose-100">
        <div className="text-center space-y-4 p-8">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-3xl mx-auto">
                ⚠️
            </div>
            <div>
                <h4 className="text-xs font-black text-rose-900 uppercase tracking-widest mb-2">
                    Visualization Error
                </h4>
                <p className="text-sm text-rose-700 italic opacity-70">
                    {message || 'Unable to render chart'}
                </p>
            </div>
        </div>
    </div>
);
