import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface WorkflowStep {
    id: string;
    title: string;
    shortTitle: string;
    path: string;
    icon: string;
    description: string;
}

const workflowSteps: WorkflowStep[] = [
    {
        id: 'algorithm',
        title: 'Algorithm Theory',
        shortTitle: 'Theory',
        path: '/algorithm/[id]',
        icon: '📚',
        description: 'Learn the mathematical foundations'
    },
    {
        id: 'datasets',
        title: 'Dataset Selection',
        shortTitle: 'Dataset',
        path: '/datasets',
        icon: '📊',
        description: 'Choose and import your data'
    },
    {
        id: 'eda',
        title: 'Exploratory Analysis',
        shortTitle: 'EDA',
        path: '/eda',
        icon: '🔍',
        description: 'Understand your data patterns'
    },
    {
        id: 'preprocessing',
        title: 'Data Preprocessing',
        shortTitle: 'Preprocess',
        path: '/preprocessing',
        icon: '🔧',
        description: 'Clean and transform data'
    },
    {
        id: 'feature-selection',
        title: 'Feature Engineering',
        shortTitle: 'Features',
        path: '/feature-selection',
        icon: '⚡',
        description: 'Select optimal features'
    },
    {
        id: 'playground',
        title: 'Train & Evaluate',
        shortTitle: 'Playground',
        path: '/algorithm/[id]#playground',
        icon: '🎯',
        description: 'Train model and test results'
    }
];

interface MLWorkflowNavProps {
    currentStep?: string;
    algorithmId?: string;
    variant?: 'full' | 'compact' | 'mobile';
}

const MLWorkflowNav: React.FC<MLWorkflowNavProps> = ({
    currentStep,
    algorithmId = 'linear_regression',
    variant = 'full'
}) => {
    const router = useRouter();

    const getCurrentStepIndex = () => {
        if (!currentStep) return -1;
        return workflowSteps.findIndex(step => step.id === currentStep);
    };

    const getStepPath = (step: WorkflowStep) => {
        if (step.path.includes('[id]')) {
            return step.path.replace('[id]', algorithmId);
        }
        return step.path;
    };

    const currentIndex = getCurrentStepIndex();

    if (variant === 'mobile') {
        return (
            <div className="bg-white border-t border-slate-200 fixed bottom-0 left-0 right-0 z-50 md:hidden">
                <div className="flex justify-around items-center py-2">
                    {workflowSteps.map((step, index) => {
                        const isActive = index === currentIndex;
                        const isCompleted = index < currentIndex;
                        const isNext = index === currentIndex + 1;

                        return (
                            <Link
                                key={step.id}
                                href={getStepPath(step)}
                                className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${isActive
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : isCompleted
                                            ? 'text-emerald-600'
                                            : isNext
                                                ? 'text-slate-600'
                                                : 'text-slate-300'
                                    }`}
                            >
                                <span className="text-xl mb-1">{step.icon}</span>
                                <span className="text-[8px] font-black uppercase tracking-wider">
                                    {step.shortTitle}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        );
    }

    if (variant === 'compact') {
        return (
            <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">
                    ML Workflow Pipeline
                </h3>
                <div className="space-y-3">
                    {workflowSteps.map((step, index) => {
                        const isActive = index === currentIndex;
                        const isCompleted = index < currentIndex;
                        const isNext = index === currentIndex + 1;

                        return (
                            <Link
                                key={step.id}
                                href={getStepPath(step)}
                                className={`flex items-center gap-4 p-4 rounded-xl transition-all group ${isActive
                                        ? 'bg-indigo-600 text-white shadow-lg'
                                        : isCompleted
                                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                            : isNext
                                                ? 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                                                : 'bg-white text-slate-400 hover:bg-slate-50'
                                    }`}
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${isActive ? 'bg-white/20' : isCompleted ? 'bg-emerald-100' : 'bg-slate-100'
                                    }`}>
                                    {isCompleted ? '✓' : step.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-black">{step.shortTitle}</div>
                                    <div className={`text-[10px] ${isActive ? 'text-white/70' : 'text-slate-500'}`}>
                                        {step.description}
                                    </div>
                                </div>
                                {isNext && (
                                    <span className="text-xs font-black text-indigo-600">Next →</span>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
        );
    }

    // Full variant
    return (
        <div className="bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full -mr-48 -mt-48 blur-3xl"></div>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-3xl font-black mb-2">ML Workflow Pipeline</h2>
                        <p className="text-indigo-200 text-sm">
                            Step-by-step guide from theory to deployment
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-1">
                            Progress
                        </div>
                        <div className="text-3xl font-black">
                            {currentIndex + 1}/{workflowSteps.length}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {workflowSteps.map((step, index) => {
                        const isActive = index === currentIndex;
                        const isCompleted = index < currentIndex;
                        const isNext = index === currentIndex + 1;
                        const isLocked = index > currentIndex + 1;

                        return (
                            <Link
                                key={step.id}
                                href={getStepPath(step)}
                                className={`relative p-8 rounded-[2rem] transition-all duration-300 group ${isActive
                                        ? 'bg-white text-slate-900 shadow-2xl scale-105'
                                        : isCompleted
                                            ? 'bg-emerald-500/20 border-2 border-emerald-400 hover:bg-emerald-500/30'
                                            : isNext
                                                ? 'bg-white/10 border-2 border-white/20 hover:bg-white/20'
                                                : 'bg-white/5 border-2 border-white/10 opacity-50'
                                    } ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                onClick={(e) => isLocked && e.preventDefault()}
                            >
                                {isCompleted && (
                                    <div className="absolute top-4 right-4 w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center text-white font-black">
                                        ✓
                                    </div>
                                )}

                                {isLocked && (
                                    <div className="absolute top-4 right-4 w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-white text-xs">
                                        🔒
                                    </div>
                                )}

                                <div className={`text-4xl mb-6 ${isActive ? 'scale-110' : ''} transition-transform`}>
                                    {step.icon}
                                </div>

                                <div className={`text-[10px] font-black uppercase tracking-widest mb-3 ${isActive ? 'text-indigo-600' : 'text-white/50'
                                    }`}>
                                    Step {index + 1}
                                </div>

                                <h3 className={`text-xl font-black mb-3 ${isActive ? 'text-slate-900' : 'text-white'
                                    }`}>
                                    {step.title}
                                </h3>

                                <p className={`text-sm ${isActive ? 'text-slate-600' : 'text-white/70'
                                    }`}>
                                    {step.description}
                                </p>

                                {isNext && (
                                    <div className="mt-6 flex items-center gap-2 text-xs font-black text-indigo-400">
                                        <span>Start Next</span>
                                        <span className="transition-transform group-hover:translate-x-1">→</span>
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Progress Bar */}
                <div className="mt-12 bg-white/10 rounded-full h-3 overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-emerald-400 to-indigo-400 transition-all duration-500 rounded-full"
                        style={{ width: `${((currentIndex + 1) / workflowSteps.length) * 100}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default MLWorkflowNav;
