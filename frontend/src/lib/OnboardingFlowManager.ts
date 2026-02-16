/**
 * OnboardingFlowManager
 * 
 * Manages onboarding flow with:
 * - Onboarding step configuration
 * - Step progression logic
 * - Onboarding completion tracking
 * 
 * Requirements: 2.1, 2.5, 2.6
 */

import { OnboardingStep } from '../components/OnboardingModal';

/**
 * Default onboarding steps for the learning path system
 */
export const DEFAULT_ONBOARDING_STEPS: OnboardingStep[] = [
    {
        id: 'welcome',
        title: 'Welcome to Mathematical ML! 👋',
        description: 'Learn machine learning algorithms through interactive visualizations and step-by-step guidance. Let\'s take a quick tour!',
        icon: '🎓',
        position: 'center'
    },
    {
        id: 'learning-path',
        title: 'Your Learning Path',
        description: 'Algorithms are organized by difficulty level. Start with beginner algorithms and unlock more advanced ones as you progress.',
        icon: '🗺️',
        position: 'center'
    },
    {
        id: 'workflow-steps',
        title: '6-Step Learning Workflow',
        description: 'Each algorithm has 6 steps: Introduction, Mathematics, Intuition, Implementation, Visualization, and Practice. Complete all steps to master the algorithm.',
        icon: '📚',
        position: 'center'
    },
    {
        id: 'progress-tracking',
        title: 'Track Your Progress',
        description: 'Your progress is automatically saved. View your dashboard to see completed algorithms, achievements, and recommendations.',
        icon: '📊',
        position: 'center'
    },
    {
        id: 'challenges',
        title: 'Practice Challenges',
        description: 'Complete practice challenges after each algorithm to test your understanding and earn mastery status.',
        icon: '🎯',
        position: 'center'
    },
    {
        id: 'achievements',
        title: 'Earn Achievements',
        description: 'Unlock badges, earn points, and generate certificates as you complete algorithms and maintain learning streaks.',
        icon: '🏆',
        position: 'center'
    }
];

/**
 * OnboardingFlowManager handles onboarding state and progression
 */
export class OnboardingFlowManager {
    private steps: OnboardingStep[];
    private currentStepIndex: number;
    private isCompleted: boolean;

    constructor(steps: OnboardingStep[] = DEFAULT_ONBOARDING_STEPS) {
        this.steps = steps;
        this.currentStepIndex = 0;
        this.isCompleted = false;
    }

    /**
     * Get all onboarding steps
     */
    getSteps(): OnboardingStep[] {
        return this.steps;
    }

    /**
     * Get current step
     */
    getCurrentStep(): OnboardingStep | null {
        if (this.currentStepIndex >= 0 && this.currentStepIndex < this.steps.length) {
            return this.steps[this.currentStepIndex];
        }
        return null;
    }

    /**
     * Get current step index
     */
    getCurrentStepIndex(): number {
        return this.currentStepIndex;
    }

    /**
     * Move to next step
     * @returns true if moved to next step, false if already at last step
     */
    nextStep(): boolean {
        if (this.currentStepIndex < this.steps.length - 1) {
            this.currentStepIndex++;
            return true;
        }
        return false;
    }

    /**
     * Move to previous step
     * @returns true if moved to previous step, false if already at first step
     */
    previousStep(): boolean {
        if (this.currentStepIndex > 0) {
            this.currentStepIndex--;
            return true;
        }
        return false;
    }

    /**
     * Go to specific step by index
     */
    goToStep(index: number): boolean {
        if (index >= 0 && index < this.steps.length) {
            this.currentStepIndex = index;
            return true;
        }
        return false;
    }

    /**
     * Go to specific step by ID
     */
    goToStepById(stepId: string): boolean {
        const index = this.steps.findIndex(step => step.id === stepId);
        if (index !== -1) {
            this.currentStepIndex = index;
            return true;
        }
        return false;
    }

    /**
     * Check if onboarding is completed
     */
    isOnboardingCompleted(): boolean {
        return this.isCompleted;
    }

    /**
     * Mark onboarding as completed
     */
    markCompleted(): void {
        this.isCompleted = true;
    }

    /**
     * Reset onboarding to start
     */
    reset(): void {
        this.currentStepIndex = 0;
        this.isCompleted = false;
    }

    /**
     * Check if at first step
     */
    isFirstStep(): boolean {
        return this.currentStepIndex === 0;
    }

    /**
     * Check if at last step
     */
    isLastStep(): boolean {
        return this.currentStepIndex === this.steps.length - 1;
    }

    /**
     * Get progress percentage
     */
    getProgressPercentage(): number {
        if (this.steps.length === 0) return 0;
        return ((this.currentStepIndex + 1) / this.steps.length) * 100;
    }

    /**
     * Load onboarding state from localStorage
     */
    static loadFromLocalStorage(key: string = 'onboarding_state'): OnboardingFlowManager | null {
        try {
            const stored = localStorage.getItem(key);
            if (!stored) return null;

            const data = JSON.parse(stored);
            const manager = new OnboardingFlowManager(data.steps || DEFAULT_ONBOARDING_STEPS);
            manager.currentStepIndex = data.currentStepIndex || 0;
            manager.isCompleted = data.isCompleted || false;

            return manager;
        } catch (error) {
            console.error('Failed to load onboarding state:', error);
            return null;
        }
    }

    /**
     * Save onboarding state to localStorage
     */
    saveToLocalStorage(key: string = 'onboarding_state'): void {
        try {
            const data = {
                steps: this.steps,
                currentStepIndex: this.currentStepIndex,
                isCompleted: this.isCompleted
            };
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error('Failed to save onboarding state:', error);
        }
    }

    /**
     * Clear onboarding state from localStorage
     */
    static clearLocalStorage(key: string = 'onboarding_state'): void {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Failed to clear onboarding state:', error);
        }
    }
}

export default OnboardingFlowManager;
