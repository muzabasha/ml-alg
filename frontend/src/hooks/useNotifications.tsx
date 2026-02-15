/**
 * useNotifications Hook - Manages toast notifications
 * 
 * This hook provides a simple interface for displaying toast notifications
 * throughout the application, particularly for unlock notifications.
 */

import { useState, useCallback } from 'react';

export interface Notification {
    id: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
}

export const useNotifications = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const showNotification = useCallback((
        message: string,
        type: Notification['type'] = 'info',
        duration: number = 5000
    ) => {
        const id = `notification-${Date.now()}-${Math.random()}`;
        const notification: Notification = { id, message, type, duration };

        setNotifications(prev => [...prev, notification]);

        return id;
    }, []);

    const removeNotification = useCallback((id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }, []);

    const showUnlockNotification = useCallback((algorithmName: string) => {
        showNotification(
            `🎉 ${algorithmName} is now unlocked! You can start learning it.`,
            'success',
            6000
        );
    }, [showNotification]);

    const showAchievementNotification = useCallback((achievementTitle: string) => {
        showNotification(
            `🏆 Achievement Unlocked: ${achievementTitle}`,
            'success',
            6000
        );
    }, [showNotification]);

    const showCompletionNotification = useCallback((algorithmName: string) => {
        showNotification(
            `✓ Congratulations! You completed ${algorithmName}`,
            'success',
            5000
        );
    }, [showNotification]);

    return {
        notifications,
        showNotification,
        removeNotification,
        showUnlockNotification,
        showAchievementNotification,
        showCompletionNotification
    };
};
