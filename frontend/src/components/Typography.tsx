import React from 'react';
import { typography, cn } from '../styles/typography';

// Page Title Component
export const PageTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <h1 className={cn(typography.pageTitle, className)}>{children}</h1>
);

// Section Title Component
export const SectionTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <h2 className={cn(typography.sectionTitle, className)}>{children}</h2>
);

// Subsection Title Component
export const SubsectionTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <h3 className={cn(typography.subsectionTitle, className)}>{children}</h3>
);

// Card Title Component
export const CardTitle: React.FC<{ children: React.ReactNode; large?: boolean; className?: string }> = ({ children, large, className }) => (
    <h4 className={cn(large ? typography.cardTitleLarge : typography.cardTitle, className)}>{children}</h4>
);

// Micro Title Component (for labels, badges, etc.)
export const MicroTitle: React.FC<{ children: React.ReactNode; primary?: boolean; className?: string }> = ({ children, primary, className }) => (
    <span className={cn(primary ? typography.microTitlePrimary : typography.microTitle, className)}>{children}</span>
);

// Body Text Components
export const BodyLarge: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <p className={cn(typography.bodyLarge, className)}>{children}</p>
);

export const BodyMedium: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <p className={cn(typography.bodyMedium, className)}>{children}</p>
);

export const BodySmall: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <p className={cn(typography.bodySmall, className)}>{children}</p>
);

// Quote Component
export const Quote: React.FC<{ children: React.ReactNode; small?: boolean; className?: string }> = ({ children, small, className }) => (
    <p className={cn(small ? typography.quoteSmall : typography.quote, className)}>{children}</p>
);

// Mathematical Term Component
export const MathTerm: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <span className={cn(typography.mathTerm, className)}>{children}</span>
);

// Mathematical Variable Component (inline code-like)
export const MathVariable: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <code className={cn(typography.mathVariable, className)}>{children}</code>
);

// Inline Code Component
export const InlineCode: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <code className={cn(typography.codeInline, className)}>{children}</code>
);

// Badge Component
export const Badge: React.FC<{
    children: React.ReactNode;
    variant?: 'classification' | 'regression' | 'clustering' | 'timeseries' | 'image' | 'default';
    large?: boolean;
    className?: string;
}> = ({ children, variant = 'default', large, className }) => {
    const variantClasses = {
        classification: 'bg-emerald-50 text-emerald-600',
        regression: 'bg-amber-50 text-amber-600',
        clustering: 'bg-purple-50 text-purple-600',
        timeseries: 'bg-blue-50 text-blue-600',
        image: 'bg-rose-50 text-rose-600',
        default: 'bg-slate-50 text-slate-600',
    };

    return (
        <span className={cn(
            large ? typography.badgeLarge : typography.badge,
            variantClasses[variant],
            className
        )}>
            {children}
        </span>
    );
};

// Stat Display Component
export const StatDisplay: React.FC<{
    value: string | number;
    label: string;
    className?: string;
}> = ({ value, label, className }) => (
    <div className={className}>
        <div className={typography.statValue}>{value}</div>
        <div className={typography.statLabel}>{label}</div>
    </div>
);

// Hero Section Component
export const HeroSection: React.FC<{
    badge?: string;
    title: React.ReactNode;
    description: string;
    className?: string;
}> = ({ badge, title, description, className }) => (
    <div className={cn("bg-slate-900 rounded-[4rem] p-16 md:p-20 mb-20 text-white relative overflow-hidden shadow-[0_64px_128px_-32px_rgba(2,6,23,0.3)]", className)}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-indigo-600/20 blur-[180px] rounded-full -z-10"></div>
        <div className="relative z-10 max-w-3xl">
            {badge && (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full text-[10px] font-black tracking-[0.2em] text-indigo-400 uppercase mb-8 border border-indigo-500/20">
                    {badge}
                </span>
            )}
            <h1 className="text-6xl md:text-8xl font-black mb-12 leading-[0.9] tracking-tighter">
                {title}
            </h1>
            <p className="text-xl text-slate-300 font-light leading-relaxed max-w-2xl">
                {description}
            </p>
        </div>
    </div>
);

// Loading State Component
export const LoadingState: React.FC<{ message?: string }> = ({ message = "Loading" }) => (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-6">
        <div className="w-20 h-20 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="font-black text-indigo-400 tracking-[0.3em] text-xs uppercase animate-pulse">{message}</div>
    </div>
);

// Error State Component
export const ErrorState: React.FC<{
    title?: string;
    message: string;
    icon?: string;
}> = ({ title = "Error", message, icon = "⚠️" }) => (
    <div className="bg-rose-50 rounded-[3rem] border border-rose-100 p-12 text-center">
        <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-3xl mx-auto mb-6">
            {icon}
        </div>
        <h4 className="text-xs font-black text-rose-900 uppercase tracking-[0.4em] mb-4">{title}</h4>
        <p className="text-sm text-rose-700 italic opacity-70">{message}</p>
    </div>
);

// Equation Container Component
export const EquationContainer: React.FC<{
    children: React.ReactNode;
    dark?: boolean;
    className?: string;
}> = ({ children, dark, className }) => (
    <div className={cn(
        dark
            ? "py-12 bg-white/5 rounded-[3rem] shadow-inner border border-white/10 flex items-center justify-center"
            : "py-12 bg-slate-50 rounded-[3rem] shadow-inner border border-slate-100 flex items-center justify-center",
        className
    )}>
        {children}
    </div>
);

// Tab Container Component
export const TabContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <div className={cn("flex flex-wrap gap-3 mb-16 bg-white p-3 rounded-[2.5rem] border border-slate-100 shadow-sm w-max max-w-full overflow-x-auto no-scrollbar", className)}>
        {children}
    </div>
);

// Tab Button Component
export const TabButton: React.FC<{
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
    icon?: string;
    className?: string;
}> = ({ active, onClick, children, icon, className }) => (
    <button
        onClick={onClick}
        className={cn(
            "px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap flex items-center gap-3",
            active
                ? "bg-indigo-600 text-white shadow-2xl shadow-indigo-100 scale-[1.02]"
                : "text-slate-400 hover:text-slate-900 hover:bg-slate-50",
            className
        )}
    >
        {icon && <span>{icon}</span>}
        {children}
    </button>
);

// Accent Text Component (for highlighting important terms)
export const AccentText: React.FC<{
    children: React.ReactNode;
    color?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'purple';
    italic?: boolean;
    className?: string;
}> = ({ children, color = 'indigo', italic, className }) => {
    const colorClasses = {
        indigo: 'text-indigo-600',
        emerald: 'text-emerald-600',
        amber: 'text-amber-600',
        rose: 'text-rose-600',
        purple: 'text-purple-600',
    };

    return (
        <span className={cn(colorClasses[color], italic && 'italic', className)}>
            {children}
        </span>
    );
};
