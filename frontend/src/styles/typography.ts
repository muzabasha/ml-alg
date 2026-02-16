// Centralized typography and styling constants for consistent design across the application

export const typography = {
    // Page Titles (Hero sections)
    pageTitle: "text-6xl md:text-8xl font-black mb-12 leading-[0.9] tracking-tighter text-slate-900",
    pageTitleAccent: "text-indigo-400 italic",

    // Section Titles
    sectionTitle: "text-5xl font-black text-slate-900 tracking-tighter leading-tight",
    sectionTitleAccent: "text-indigo-600",

    // Subsection Titles
    subsectionTitle: "text-3xl font-black text-slate-900 mb-4 tracking-tight",
    subsectionTitleAccent: "text-indigo-600",

    // Card Titles
    cardTitle: "text-2xl font-black text-slate-900 mb-4 tracking-tight",
    cardTitleLarge: "text-3xl font-black text-slate-900 mb-4 tracking-tight",

    // Small Titles/Labels
    smallTitle: "text-xl font-black text-slate-900 tracking-tight",
    microTitle: "text-[10px] font-black uppercase tracking-[0.3em] text-slate-400",
    microTitlePrimary: "text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600",

    // Body Text
    bodyLarge: "text-xl text-slate-500 leading-relaxed font-light",
    bodyMedium: "text-base text-slate-600 leading-relaxed font-medium",
    bodySmall: "text-sm text-slate-600 leading-relaxed",
    bodyExtraSmall: "text-xs text-slate-500 leading-relaxed",

    // Italic/Quote Text
    quote: "text-xl text-slate-500 leading-relaxed font-light italic",
    quoteSmall: "text-base text-slate-500 leading-relaxed font-light italic",

    // Code/Monospace
    code: "font-mono text-xs text-slate-300",
    codeInline: "font-mono text-sm bg-slate-100 px-2 py-1 rounded text-slate-700",

    // Badges/Tags
    badge: "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg",
    badgeLarge: "text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full",

    // Buttons
    buttonPrimary: "px-12 py-6 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em]",
    buttonSecondary: "px-8 py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest",

    // Navigation
    navItem: "text-[10px] font-black uppercase tracking-widest",
    navItemActive: "text-[10px] font-black uppercase tracking-widest text-white",

    // Stats/Numbers
    statValue: "text-4xl font-black text-slate-900",
    statLabel: "text-[9px] font-black uppercase tracking-tighter text-slate-300",

    // Mathematical Terms
    mathTerm: "font-medium text-indigo-600",
    mathVariable: "font-mono text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded",
};

export const colors = {
    // Primary Colors
    primary: {
        main: "indigo-600",
        light: "indigo-400",
        dark: "indigo-700",
        bg: "indigo-50",
        border: "indigo-200",
    },

    // Secondary Colors
    secondary: {
        main: "emerald-600",
        light: "emerald-400",
        dark: "emerald-700",
        bg: "emerald-50",
        border: "emerald-200",
    },

    // Accent Colors
    accent: {
        amber: "amber-600",
        purple: "purple-600",
        rose: "rose-600",
        slate: "slate-600",
    },

    // Text Colors
    text: {
        primary: "slate-900",
        secondary: "slate-600",
        tertiary: "slate-500",
        light: "slate-400",
        white: "white",
    },

    // Background Colors
    bg: {
        primary: "white",
        secondary: "slate-50",
        dark: "slate-900",
        darker: "slate-950",
    },
};

export const spacing = {
    // Container Padding
    containerPadding: "px-6 py-20",
    containerPaddingLarge: "px-6 md:px-12 py-24",

    // Section Spacing
    sectionGap: "space-y-12",
    sectionGapLarge: "space-y-20",

    // Card Padding
    cardPadding: "p-8",
    cardPaddingLarge: "p-12",
    cardPaddingXL: "p-16",

    // Grid Gaps
    gridGap: "gap-8",
    gridGapLarge: "gap-12",
    gridGapXL: "gap-16",
};

export const borders = {
    // Border Radius
    radiusSmall: "rounded-2xl",
    radiusMedium: "rounded-[2.5rem]",
    radiusLarge: "rounded-[3rem]",
    radiusXL: "rounded-[4rem]",

    // Border Styles
    borderLight: "border border-slate-100",
    borderMedium: "border border-slate-200",
    borderPrimary: "border border-indigo-200",
};

export const shadows = {
    // Shadow Styles
    shadowSmall: "shadow-sm",
    shadowMedium: "shadow-xl",
    shadowLarge: "shadow-[0_64px_128px_-32px_rgba(2,6,23,0.05)]",
    shadowXL: "shadow-[0_64px_128px_-32px_rgba(2,6,23,0.3)]",
};

// Chart-specific text styling
export const chartText = {
    title: {
        font: { family: 'Outfit', size: 20, weight: '900' },
        color: '#0f172a',
        padding: { top: 10, bottom: 30 }
    },
    axisLabel: {
        font: { family: 'Outfit', size: 12, weight: '900' },
        color: '#64748b',
        padding: { top: 10 }
    },
    legend: {
        font: { family: 'Outfit', size: 11, weight: '700' },
        color: '#0f172a',
    },
    tooltip: {
        titleFont: { family: 'Outfit', size: 13, weight: '900' },
        bodyFont: { family: 'Outfit', size: 12, weight: '500' },
    }
};

// Equation container styling
export const equationStyles = {
    container: "py-12 bg-slate-50 rounded-[3rem] shadow-inner border border-slate-100 flex items-center justify-center",
    containerDark: "py-12 bg-white/5 rounded-[3rem] shadow-inner border border-white/10 flex items-center justify-center",
    inline: "bg-slate-50 px-4 py-2 rounded-xl inline-flex items-center",
};

// Loading state styling
export const loadingStyles = {
    container: "min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-6",
    spinner: "w-20 h-20 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin",
    text: "font-black text-indigo-400 tracking-[0.3em] text-xs uppercase animate-pulse",
};

// Error state styling
export const errorStyles = {
    container: "bg-rose-50 rounded-[3rem] border border-rose-100 p-12 text-center",
    icon: "w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-3xl mx-auto mb-6",
    title: "text-xs font-black text-rose-900 uppercase tracking-[0.4em] mb-4",
    message: "text-sm text-rose-700 italic opacity-70",
};

// Hero section styling
export const heroStyles = {
    container: "bg-slate-900 rounded-[4rem] p-16 md:p-20 mb-20 text-white relative overflow-hidden shadow-[0_64px_128px_-32px_rgba(2,6,23,0.3)]",
    badge: "inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full text-[10px] font-black tracking-[0.2em] text-indigo-400 uppercase mb-8 border border-indigo-500/20",
    title: "text-6xl md:text-8xl font-black mb-12 leading-[0.9] tracking-tighter",
    titleAccent: "text-indigo-400 italic",
    description: "text-xl text-slate-300 font-light leading-relaxed max-w-2xl",
};

// Tab/Navigation styling
export const tabStyles = {
    container: "flex flex-wrap gap-3 mb-16 bg-white p-3 rounded-[2.5rem] border border-slate-100 shadow-sm w-max max-w-full overflow-x-auto no-scrollbar",
    tab: "px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
    tabActive: "bg-indigo-600 text-white shadow-2xl shadow-indigo-100 scale-[1.02]",
    tabInactive: "text-slate-400 hover:text-slate-900 hover:bg-slate-50",
};

// Helper function to combine classes
export function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
}
