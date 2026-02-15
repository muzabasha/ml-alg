import React, { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
    message: string;
    type: ToastType;
    duration?: number;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, duration = 5000, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        // Trigger entrance animation
        setTimeout(() => setIsVisible(true), 10);

        // Auto-dismiss
        const timer = setTimeout(() => {
            handleClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsVisible(false);
            onClose();
        }, 300);
    };

    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };

    const colors = {
        success: 'bg-emerald-500 border-emerald-600',
        error: 'bg-rose-500 border-rose-600',
        warning: 'bg-amber-500 border-amber-600',
        info: 'bg-indigo-500 border-indigo-600'
    };

    return (
        <div
            role="alert"
            aria-live="polite"
            className={`fixed top-24 right-8 z-[200] transition-all duration-300 ${isVisible && !isExiting
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-full opacity-0'
                }`}
        >
            <div className={`${colors[type]} text-white px-8 py-5 rounded-2xl shadow-2xl border-2 flex items-center gap-4 min-w-[320px] max-w-md backdrop-blur-xl`}>
                <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center font-black text-lg">
                    {icons[type]}
                </div>
                <p className="flex-1 font-medium text-sm leading-relaxed">{message}</p>
                <button
                    onClick={handleClose}
                    className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all active:scale-90"
                    aria-label="Close notification"
                >
                    <span className="text-sm font-black">✕</span>
                </button>
            </div>
        </div>
    );
};

export default Toast;
