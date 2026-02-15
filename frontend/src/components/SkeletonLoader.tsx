import React from 'react';

interface SkeletonLoaderProps {
    variant?: 'card' | 'text' | 'circle' | 'rect' | 'algorithm-card';
    count?: number;
    className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
    variant = 'rect',
    count = 1,
    className = ''
}) => {
    const renderSkeleton = () => {
        switch (variant) {
            case 'card':
                return (
                    <div className={`bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-sm animate-pulse ${className}`}>
                        <div className="flex justify-between items-start mb-10">
                            <div className="w-16 h-16 bg-slate-100 rounded-[1.5rem]"></div>
                            <div className="w-20 h-6 bg-slate-100 rounded-full"></div>
                        </div>
                        <div className="space-y-4">
                            <div className="h-8 bg-slate-100 rounded-2xl w-3/4"></div>
                            <div className="h-4 bg-slate-100 rounded-xl w-1/2"></div>
                        </div>
                        <div className="mt-10 pt-10 border-t border-slate-50 space-y-3">
                            <div className="h-3 bg-slate-100 rounded-lg w-1/4"></div>
                            <div className="h-4 bg-slate-100 rounded-xl w-full"></div>
                        </div>
                    </div>
                );

            case 'algorithm-card':
                return (
                    <div className={`bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-sm animate-pulse ${className}`}>
                        <div className="flex justify-between items-start mb-10">
                            <div className="w-16 h-16 bg-slate-100 rounded-[1.5rem] shimmer"></div>
                            <div className="w-24 h-6 bg-slate-100 rounded-full shimmer"></div>
                        </div>
                        <div className="space-y-4 mb-10">
                            <div className="h-8 bg-slate-100 rounded-2xl w-3/4 shimmer"></div>
                            <div className="h-4 bg-slate-100 rounded-xl w-1/2 shimmer"></div>
                        </div>
                        <div className="pt-10 border-t border-slate-50 space-y-4">
                            <div className="h-3 bg-slate-100 rounded-lg w-1/3 shimmer"></div>
                            <div className="h-4 bg-slate-100 rounded-xl w-full shimmer"></div>
                        </div>
                    </div>
                );

            case 'text':
                return (
                    <div className={`space-y-3 ${className}`}>
                        <div className="h-4 bg-slate-100 rounded-xl w-full animate-pulse shimmer"></div>
                        <div className="h-4 bg-slate-100 rounded-xl w-5/6 animate-pulse shimmer"></div>
                        <div className="h-4 bg-slate-100 rounded-xl w-4/6 animate-pulse shimmer"></div>
                    </div>
                );

            case 'circle':
                return (
                    <div className={`w-16 h-16 bg-slate-100 rounded-full animate-pulse shimmer ${className}`}></div>
                );

            case 'rect':
            default:
                return (
                    <div className={`h-48 bg-slate-100 rounded-3xl animate-pulse shimmer ${className}`}></div>
                );
        }
    };

    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index}>
                    {renderSkeleton()}
                </div>
            ))}
            <style jsx>{`
                @keyframes shimmer {
                    0% {
                        background-position: -1000px 0;
                    }
                    100% {
                        background-position: 1000px 0;
                    }
                }
                .shimmer {
                    background: linear-gradient(
                        90deg,
                        #f1f5f9 0%,
                        #e2e8f0 20%,
                        #f1f5f9 40%,
                        #f1f5f9 100%
                    );
                    background-size: 1000px 100%;
                    animation: shimmer 2s infinite linear;
                }
            `}</style>
        </>
    );
};

export default SkeletonLoader;
