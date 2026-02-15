/**
 * LearningPathWithNotifications - Wrapper component that integrates notifications
 * 
 * This component wraps the LearningPathProvider and adds notification support
 * for unlock events and achievements.
 */

import React, { ReactNode } from 'react';
import { LearningPathProvider } from '../contexts/LearningPathContext';
import NotificationContainer from './NotificationContainer';
import { useNotifications } from '../hooks/useNotifications';
import { getAlgorithmById } from '../config/algorithms';
import { StudentProgress, Achievement } from '../types/learning-path';

interface LearningPathWithNotificationsProps {
    children: ReactNode;
    studentId?: string;
    onProgressSync?: (progress: StudentProgress) => Promise<void>;
}

/**
 * Wrapper component that provides learning path functionality with notifications
 */
const LearningPathWithNotifications: React.FC<LearningPathWithNotificationsProps> = ({
    children,
    studentId,
    onProgressSync
}) => {
    const {
        notifications,
        removeNotification,
        showUnlockNotification,
        showAchievementNotification
    } = useNotifications();

    /**
     * Handle unlock notifications
     * Validates: Requirements 4.4 - Automatic unlock notification
     */
    const handleUnlockNotification = (algorithmIds: string[]) => {
        algorithmIds.forEach(algorithmId => {
            const algorithm = getAlgorithmById(algorithmId);
            if (algorithm) {
                showUnlockNotification(algorithm.name);
            }
        });
    };

    /**
     * Handle achievement notifications
     */
    const handleAchievementNotification = (achievements: Achievement[]) => {
        achievements.forEach(achievement => {
            showAchievementNotification(achievement.title);
        });
    };

    return (
        <LearningPathProvider
            studentId={studentId}
            onProgressSync={onProgressSync}
            onUnlockNotification={handleUnlockNotification}
            onAchievementNotification={handleAchievementNotification}
        >
            {children}
            <NotificationContainer
                notifications={notifications}
                onRemove={removeNotification}
            />
        </LearningPathProvider>
    );
};

export default LearningPathWithNotifications;
