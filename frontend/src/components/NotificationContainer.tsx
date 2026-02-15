/**
 * NotificationContainer - Renders toast notifications
 * 
 * This component displays a stack of toast notifications in the top-right
 * corner of the screen.
 */

import React from 'react';
import Toast from './Toast';
import { Notification } from '../hooks/useNotifications';

interface NotificationContainerProps {
    notifications: Notification[];
    onRemove: (id: string) => void;
}

const NotificationContainer: React.FC<NotificationContainerProps> = ({
    notifications,
    onRemove
}) => {
    return (
        <div className="fixed top-24 right-8 z-[200] flex flex-col gap-4">
            {notifications.map((notification, index) => (
                <div
                    key={notification.id}
                    style={{
                        transform: `translateY(${index * 10}px)`,
                        zIndex: 200 - index
                    }}
                >
                    <Toast
                        message={notification.message}
                        type={notification.type}
                        duration={notification.duration}
                        onClose={() => onRemove(notification.id)}
                    />
                </div>
            ))}
        </div>
    );
};

export default NotificationContainer;
