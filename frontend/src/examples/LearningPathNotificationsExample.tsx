/**
 * Example: Using LearningPath with Notifications
 * 
 * This example demonstrates how to integrate the learning path system
 * with automatic unlock notifications.
 */

import React from 'react';
import LearningPathWithNotifications from '../components/LearningPathWithNotifications';
import { useLearningPath } from '../contexts/LearningPathContext';
import { WorkflowStep } from '../types/learning-path';

/**
 * Example component that uses the learning path with notifications
 */
const AlgorithmProgressExample: React.FC = () => {
    const { markStepComplete, getAlgorithmStatus } = useLearningPath();

    const handleCompleteStep = () => {
        // When a step is completed, the system will:
        // 1. Update progress
        // 2. Check if algorithm is completed
        // 3. Check for newly unlocked algorithms
        // 4. Display unlock notifications automatically
        markStepComplete('linear_regression', WorkflowStep.Introduction);
    };

    return (
        <div>
            <h2>Algorithm Progress</h2>
            <button onClick={handleCompleteStep}>
                Complete Introduction Step
            </button>
            <p>Status: {getAlgorithmStatus('linear_regression')}</p>
        </div>
    );
};

/**
 * App wrapper with notification support
 */
const AppWithNotifications: React.FC = () => {
    return (
        <LearningPathWithNotifications
            studentId="student123"
            onProgressSync={async (progress) => {
                // Optional: Sync progress to backend
                console.log('Syncing progress:', progress);
            }}
        >
            <AlgorithmProgressExample />
        </LearningPathWithNotifications>
    );
};

export default AppWithNotifications;

/**
 * Usage Notes:
 * 
 * 1. Wrap your app with LearningPathWithNotifications instead of LearningPathProvider
 * 2. Notifications will automatically appear when:
 *    - Algorithms are unlocked (after completing prerequisites)
 *    - Achievements are earned
 * 3. The notification system integrates with the existing Toast component
 * 4. Notifications auto-dismiss after 5-6 seconds
 * 5. Multiple notifications stack vertically in the top-right corner
 * 
 * Real-time Validation:
 * - The system validates prerequisites in real-time as steps are completed
 * - When the last step of an algorithm is completed, it checks all dependent algorithms
 * - If prerequisites are met, the algorithm is automatically unlocked
 * - A notification is immediately displayed to inform the student
 * 
 * Integration with Progress Tracker:
 * - The notification system is integrated directly into the LearningPathContext
 * - It uses the existing checkForNewUnlocks method from PrerequisiteEngine
 * - Progress is tracked and validated on every step completion
 * - No polling or manual refresh needed - everything is event-driven
 */
