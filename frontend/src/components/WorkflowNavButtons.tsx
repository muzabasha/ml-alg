import React from 'react';
import Link from 'next/link';

interface WorkflowNavButtonsProps {
    currentStep: string;
    algorithmId?: string;
    prevLabel?: string;
    nextLabel?: string;
}

const workflowOrder = [
    { id: 'algorithm', path: '/algorithm/[id]', label: 'Algorithm Theory' },
    { id: 'datasets', path: '/datasets', label: 'Dataset Selection' },
    { id: 'eda', path: '/eda', label: 'Exploratory Analysis' },
    { id: 'preprocessing', path: '/preprocessing', label: 'Data Preprocessing' },
    { id: 'feature-selection', path: '/feature-selection', label: 'Feature Engineering' },
    { id: 'playground', path: '/algorithm/[id]#playground', label: 'Train & Evaluate' }
];

const WorkflowNavButtons: React.FC<WorkflowNavButtonsProps> = ({
    currentStep,
    algorithmId = 'linear_regression',
    prevLabel,
    nextLabel
}) => {
    const currentIndex = workflowOrder.findIndex(step => step.id === currentStep);
    const prevStep = currentIndex > 0 ? workflowOrder[currentIndex - 1] : null;
    const nextStep = currentIndex < workflowOrder.length - 1 ? workflowOrder[currentIndex + 1] : null;

    const getPath = (path: string) => {
        return path.replace('[id]', algorithmId);
    };

    return (
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-6 mt-16">
            {prevStep ? (
                <Link
                    href={getPath(prevStep.path)}
                    className="flex items-center gap-4 px-8 py-5 bg-white border-2 border-slate-200 rounded-[2rem] hover:border-indigo-300 hover:shadow-lg transition-all group flex-1"
                >
                    <span className="text-2xl transition-transform group-hover:-translate-x-1">←</span>
                    <div className="text-left">
                        <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">
                            Previous Step
                        </div>
                        <div className="text-sm font-black text-slate-900">
                            {prevLabel || prevStep.label}
                        </div>
                    </div>
                </Link>
            ) : (
                <div className="flex-1"></div>
            )}

            {nextStep ? (
                <Link
                    href={getPath(nextStep.path)}
                    className="flex items-center gap-4 px-8 py-5 bg-indigo-600 text-white rounded-[2rem] hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-200 transition-all group flex-1 justify-end"
                >
                    <div className="text-right">
                        <div className="text-[9px] font-black uppercase tracking-widest text-indigo-200 mb-1">
                            Next Step
                        </div>
                        <div className="text-sm font-black">
                            {nextLabel || nextStep.label}
                        </div>
                    </div>
                    <span className="text-2xl transition-transform group-hover:translate-x-1">→</span>
                </Link>
            ) : (
                <Link
                    href="/"
                    className="flex items-center gap-4 px-8 py-5 bg-emerald-600 text-white rounded-[2rem] hover:bg-emerald-700 hover:shadow-2xl hover:shadow-emerald-200 transition-all group flex-1 justify-end"
                >
                    <div className="text-right">
                        <div className="text-[9px] font-black uppercase tracking-widest text-emerald-200 mb-1">
                            Complete
                        </div>
                        <div className="text-sm font-black">
                            Back to Home
                        </div>
                    </div>
                    <span className="text-2xl">✓</span>
                </Link>
            )}
        </div>
    );
};

export default WorkflowNavButtons;
