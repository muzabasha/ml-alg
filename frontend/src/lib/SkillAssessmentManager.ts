/**
 * Skill Assessment Manager - Evaluates student performance on challenges
 * 
 * This class manages practice challenges, evaluates responses, tracks
 * performance, and provides adaptive difficulty recommendations.
 */

import {
    Challenge,
    ChallengeResponse,
    AssessmentResult,
    ChallengeAttempt,
    MasteryStatus
} from '../types/learning-path';
import {
    getChallengeForAlgorithm,
    hasChallengeForAlgorithm
} from '../config/challenges';
import { getAlgorithmById } from '../config/algorithms';
import { ProgressTracker } from './ProgressTracker';

/**
 * Performance thresholds for assessment
 */
const ASSESSMENT_THRESHOLDS = {
    FAST_COMPLETION: 60,      // seconds
    SLOW_COMPLETION: 300,     // seconds (5 minutes)
    MAX_HINTS_ALLOWED: 3,
    MASTERY_SCORE: 80         // out of 100
};

/**
 * SkillAssessmentManager class for managing challenges and assessments
 */
export class SkillAssessmentManager {
    private progressTracker: ProgressTracker;
    private currentHintsUsed: Map<string, number>;

    constructor(progressTracker: ProgressTracker) {
        this.progressTracker = progressTracker;
        this.currentHintsUsed = new Map();
    }

    /**
     * Get challenge for an algorithm
     * Property 24: Challenge Presentation on Algorithm Completion
     */
    getChallengeForAlgorithm(algorithmId: string): Challenge | null {
        const challenge = getChallengeForAlgorithm(algorithmId);
        if (!challenge) {
            console.warn(`No challenge found for algorithm: ${algorithmId}`);
            return null;
        }

        // Reset hints counter for new challenge
        this.currentHintsUsed.set(challenge.id, 0);

        return challenge;
    }

    /**
     * Submit challenge response and get assessment result
     * Property 25: Mastery Status on Challenge Success
     * Property 26: Challenge Retry on Failure
     */
    submitChallengeResponse(
        challengeId: string,
        response: ChallengeResponse
    ): AssessmentResult {
        const challenge = this.findChallengeById(challengeId);

        if (!challenge) {
            return {
                correct: false,
                score: 0,
                feedback: 'Challenge not found',
                explanation: 'The requested challenge could not be found.'
            };
        }

        // Validate response
        const isCorrect = this.validateResponse(challenge, response.selectedAnswer);

        // Calculate score based on correctness, time, and hints
        const score = this.calculateScore(
            isCorrect,
            response.timeSpent,
            this.currentHintsUsed.get(challengeId) || 0
        );

        // Create challenge attempt record
        const attempt: ChallengeAttempt = {
            challengeId,
            algorithmId: challenge.algorithmId,
            timestamp: new Date(),
            correct: isCorrect,
            timeSpent: response.timeSpent,
            hintsUsed: this.currentHintsUsed.get(challengeId) || 0
        };

        // Record attempt in progress tracker
        this.progressTracker.addChallengeAttempt(challenge.algorithmId, attempt);

        // If correct, mark algorithm as mastered
        if (isCorrect) {
            const algoStatus = this.progressTracker.getAlgorithmStatus(challenge.algorithmId);
            if (algoStatus === MasteryStatus.Completed) {
                this.progressTracker.markAlgorithmMastered(challenge.algorithmId);
            }
        }

        // Generate feedback and explanation
        const feedback = this.generateFeedback(isCorrect, score, response.timeSpent);
        const explanation = this.generateExplanation(challenge, response.selectedAnswer);

        // Provide hints if incorrect
        const hints = isCorrect ? undefined : this.getNextHints(challenge);

        return {
            correct: isCorrect,
            score,
            feedback,
            hints,
            explanation
        };
    }

    /**
     * Get challenge history for an algorithm
     */
    getChallengeHistory(algorithmId: string): ChallengeAttempt[] {
        const algoProgress = this.progressTracker.getAlgorithmProgress(algorithmId);
        if (!algoProgress) return [];

        return algoProgress.challengeAttempts.sort(
            (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
        );
    }

    /**
     * Get performance score for an algorithm (0-100)
     * Property 41: Performance Metric Tracking
     */
    getPerformanceScore(algorithmId: string): number {
        const history = this.getChallengeHistory(algorithmId);
        if (history.length === 0) return 0;

        // Get most recent attempt
        const latestAttempt = history[0];

        // Base score on correctness
        let score = latestAttempt.correct ? 100 : 0;

        if (latestAttempt.correct) {
            // Deduct points for hints used
            score -= latestAttempt.hintsUsed * 10;

            // Deduct points for slow completion
            if (latestAttempt.timeSpent > ASSESSMENT_THRESHOLDS.SLOW_COMPLETION) {
                score -= 20;
            } else if (latestAttempt.timeSpent > ASSESSMENT_THRESHOLDS.FAST_COMPLETION) {
                score -= 10;
            }

            // Bonus for fast completion with no hints
            if (latestAttempt.timeSpent < ASSESSMENT_THRESHOLDS.FAST_COMPLETION &&
                latestAttempt.hintsUsed === 0) {
                score += 10;
            }
        }

        return Math.max(0, Math.min(100, score));
    }

    /**
     * Check if should suggest review
     * Property 43: Low Performance Review Suggestions
     */
    shouldSuggestReview(algorithmId: string): boolean {
        const history = this.getChallengeHistory(algorithmId);
        if (history.length === 0) return false;

        // Check recent attempts
        const recentAttempts = history.slice(0, 3);
        const failureRate = recentAttempts.filter(a => !a.correct).length / recentAttempts.length;

        // Suggest review if failure rate > 50%
        if (failureRate > 0.5) return true;

        // Check if using too many hints
        const avgHints = recentAttempts.reduce((sum, a) => sum + a.hintsUsed, 0) / recentAttempts.length;
        if (avgHints > 2) return true;

        // Check if taking too long
        const avgTime = recentAttempts.reduce((sum, a) => sum + a.timeSpent, 0) / recentAttempts.length;
        if (avgTime > ASSESSMENT_THRESHOLDS.SLOW_COMPLETION) return true;

        return false;
    }

    /**
     * Check if should suggest advanced content
     */
    shouldSuggestAdvancedContent(): boolean {
        const allProgress = this.progressTracker.getAllProgress();
        const completedAlgorithms = Object.values(allProgress.algorithmProgress)
            .filter(p => p.status === MasteryStatus.Completed || p.status === MasteryStatus.Mastered);

        if (completedAlgorithms.length < 3) return false;

        // Check if consistently performing well
        let highPerformanceCount = 0;
        completedAlgorithms.forEach(algoProgress => {
            const score = this.getPerformanceScore(algoProgress.algorithmId);
            if (score >= ASSESSMENT_THRESHOLDS.MASTERY_SCORE) {
                highPerformanceCount++;
            }
        });

        return highPerformanceCount >= completedAlgorithms.length * 0.8; // 80% high performance
    }

    /**
     * Get hint for a challenge
     */
    getNextHint(challengeId: string): string | null {
        const challenge = this.findChallengeById(challengeId);
        if (!challenge) return null;

        const hintsUsed = this.currentHintsUsed.get(challengeId) || 0;

        // Only one hint available per challenge
        if (hintsUsed >= 1 || !challenge.hint) {
            return null; // Hint already used or not available
        }

        this.currentHintsUsed.set(challengeId, 1);
        return challenge.hint;
    }

    /**
     * Reset hints for a challenge
     */
    resetHints(challengeId: string): void {
        this.currentHintsUsed.set(challengeId, 0);
    }

    /**
     * Check if algorithm has a challenge
     */
    hasChallenge(algorithmId: string): boolean {
        return hasChallengeForAlgorithm(algorithmId);
    }

    /**
     * Get challenge completion status
     */
    isChallengeCompleted(algorithmId: string): boolean {
        const algoProgress = this.progressTracker.getAlgorithmProgress(algorithmId);
        return algoProgress?.challengeCompleted || false;
    }

    /**
     * Get challenge success rate for an algorithm
     */
    getChallengeSuccessRate(algorithmId: string): number {
        const history = this.getChallengeHistory(algorithmId);
        if (history.length === 0) return 0;

        const successCount = history.filter(a => a.correct).length;
        return Math.round((successCount / history.length) * 100);
    }

    /**
     * Get average time spent on challenges
     */
    getAverageChallengeTime(algorithmId: string): number {
        const history = this.getChallengeHistory(algorithmId);
        if (history.length === 0) return 0;

        const totalTime = history.reduce((sum, a) => sum + a.timeSpent, 0);
        return Math.round(totalTime / history.length);
    }

    /**
     * Private helper methods
     */

    private findChallengeById(challengeId: string): Challenge | null {
        // Extract algorithm ID from challenge ID (format: algorithmId_challenge)
        const algorithmId = challengeId.replace('_challenge', '');
        return getChallengeForAlgorithm(algorithmId) || null;
    }

    private validateResponse(challenge: Challenge, answer: string): boolean {
        // Normalize answers for comparison
        const normalizedAnswer = answer.trim().toLowerCase();
        const normalizedCorrect = challenge.correctAnswer.trim().toLowerCase();

        return normalizedAnswer === normalizedCorrect;
    }

    private calculateScore(
        isCorrect: boolean,
        timeSpent: number,
        hintsUsed: number
    ): number {
        if (!isCorrect) return 0;

        let score = 100;

        // Deduct points for hints (10 points per hint)
        score -= hintsUsed * 10;

        // Deduct points for time
        if (timeSpent > ASSESSMENT_THRESHOLDS.SLOW_COMPLETION) {
            score -= 30; // Very slow
        } else if (timeSpent > ASSESSMENT_THRESHOLDS.FAST_COMPLETION * 2) {
            score -= 20; // Slow
        } else if (timeSpent > ASSESSMENT_THRESHOLDS.FAST_COMPLETION) {
            score -= 10; // Moderate
        }

        // Bonus for exceptional performance
        if (timeSpent < ASSESSMENT_THRESHOLDS.FAST_COMPLETION && hintsUsed === 0) {
            score += 10;
        }

        return Math.max(0, Math.min(100, score));
    }

    private generateFeedback(
        isCorrect: boolean,
        score: number,
        timeSpent: number
    ): string {
        if (!isCorrect) {
            return 'Not quite right. Review the hints and try again!';
        }

        if (score >= 100) {
            return 'Perfect! Outstanding performance with no hints needed.';
        } else if (score >= 90) {
            return 'Excellent work! You have a strong understanding of this algorithm.';
        } else if (score >= 80) {
            return 'Great job! You\'ve mastered the core concepts.';
        } else if (score >= 70) {
            return 'Good work! Consider reviewing the material to strengthen your understanding.';
        } else {
            return 'Correct! But there\'s room for improvement. Try to solve it faster with fewer hints.';
        }
    }

    private generateExplanation(challenge: Challenge, userAnswer: string): string {
        const isCorrect = this.validateResponse(challenge, userAnswer);

        if (isCorrect) {
            return this.getCorrectAnswerExplanation(challenge);
        } else {
            return this.getIncorrectAnswerExplanation(challenge, userAnswer);
        }
    }

    private getCorrectAnswerExplanation(challenge: Challenge): string {
        const explanations: Record<string, string> = {
            'linear_regression_challenge': 'Correct! Linear Regression minimizes Mean Squared Error (MSE), which is the average of squared differences between predicted and actual values. This is also known as the "least squares" method.',
            'logistic_regression_challenge': 'Correct! The Sigmoid function σ(z) = 1/(1+e^(-z)) maps any real number to a probability between 0 and 1, making it perfect for binary classification.',
            'knn_challenge': 'Correct! As K increases, the decision boundary becomes smoother because predictions are based on more neighbors, reducing the impact of individual noisy data points. This increases bias but reduces variance.',
            'kmeans_challenge': 'Correct! K-Means requires you to specify the number of clusters (K) before running the algorithm. This is a key limitation, though techniques like the Elbow Method can help choose K.',
            'naive_bayes_challenge': 'Correct! Naive Bayes assumes features are conditionally independent given the class label. This "naive" assumption simplifies computation but may not hold in reality.',
            'decision_tree_challenge': 'Correct! Information Gain measures the reduction in entropy (uncertainty) after a split. The algorithm chooses splits that maximize information gain.',
            'svm_challenge': 'Correct! SVM finds the hyperplane that maximizes the margin (distance) between classes. This maximum-margin principle leads to better generalization.',
            'ann_challenge': 'Correct! Backpropagation uses the chain rule to compute gradients of the loss with respect to each weight, propagating errors backward through the network.',
            'cnn_challenge': 'Correct! Convolutional layers use the same filter weights across different spatial positions (weight sharing), dramatically reducing the number of parameters compared to fully connected layers.',
            'rnn_challenge': 'Correct! LSTM and GRU use gating mechanisms to control information flow, allowing gradients to flow through many time steps without vanishing or exploding.',
            'transformer_challenge': 'Correct! Self-Attention computes relationships between all positions in parallel, eliminating the sequential bottleneck of RNNs and enabling efficient parallelization.'
        };

        return explanations[challenge.id] || 'Correct! You have a good understanding of this concept.';
    }

    private getIncorrectAnswerExplanation(challenge: Challenge, userAnswer: string): string {
        return `The correct answer is "${challenge.correctAnswer}". ${this.getCorrectAnswerExplanation(challenge)}`;
    }

    private getNextHints(challenge: Challenge): string[] {
        const hintsUsed = this.currentHintsUsed.get(challenge.id) || 0;

        // Return hint if available and not yet used
        if (hintsUsed < 1 && challenge.hint) {
            this.currentHintsUsed.set(challenge.id, 1);
            return [challenge.hint];
        }

        return [];
    }

    /**
     * Get detailed performance analysis
     */
    getPerformanceAnalysis(algorithmId: string): {
        score: number;
        successRate: number;
        averageTime: number;
        totalAttempts: number;
        needsReview: boolean;
        strengths: string[];
        improvements: string[];
    } {
        const history = this.getChallengeHistory(algorithmId);
        const score = this.getPerformanceScore(algorithmId);
        const successRate = this.getChallengeSuccessRate(algorithmId);
        const averageTime = this.getAverageChallengeTime(algorithmId);
        const needsReview = this.shouldSuggestReview(algorithmId);

        const strengths: string[] = [];
        const improvements: string[] = [];

        // Analyze strengths
        if (successRate >= 80) {
            strengths.push('High success rate on challenges');
        }
        if (averageTime < ASSESSMENT_THRESHOLDS.FAST_COMPLETION) {
            strengths.push('Quick problem-solving ability');
        }
        if (history.length > 0 && history[0].hintsUsed === 0) {
            strengths.push('Independent problem solving');
        }

        // Analyze areas for improvement
        if (successRate < 60) {
            improvements.push('Review core concepts and theory');
        }
        if (averageTime > ASSESSMENT_THRESHOLDS.SLOW_COMPLETION) {
            improvements.push('Practice to improve speed');
        }
        if (history.length > 0 && history[0].hintsUsed > 2) {
            improvements.push('Strengthen understanding to reduce hint dependency');
        }

        return {
            score,
            successRate,
            averageTime,
            totalAttempts: history.length,
            needsReview,
            strengths,
            improvements
        };
    }
}
