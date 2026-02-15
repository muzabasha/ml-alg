/**
 * Challenge definitions for practice assessments
 * 
 * This file defines practice challenges for each algorithm to test
 * student understanding and mastery.
 */

import {
    Challenge,
    ChallengeType,
    ChallengeDifficulty
} from '../types/learning-path';

/**
 * Challenge definitions for all algorithms
 */
export const CHALLENGES: Record<string, Challenge> = {
    'linear_regression_challenge': {
        id: 'linear_regression_challenge',
        algorithmId: 'linear_regression',
        type: ChallengeType.MultipleChoice,
        question: 'What is the primary objective function that Linear Regression minimizes?',
        options: [
            'Mean Absolute Error (MAE)',
            'Mean Squared Error (MSE)',
            'Cross-Entropy Loss',
            'Hinge Loss'
        ],
        correctAnswer: 'Mean Squared Error (MSE)',
        hint: 'Think about the "least squares" method - MSE = (1/n) * Σ(y_actual - y_predicted)²',
        explanation: 'Linear Regression minimizes the Mean Squared Error (MSE), which measures the average squared difference between predicted and actual values.',
        difficulty: ChallengeDifficulty.Easy
    },
    'logistic_regression_challenge': {
        id: 'logistic_regression_challenge',
        algorithmId: 'logistic_regression',
        type: ChallengeType.MultipleChoice,
        question: 'Which activation function does Logistic Regression use to produce probability outputs?',
        options: [
            'ReLU',
            'Sigmoid',
            'Tanh',
            'Softmax'
        ],
        correctAnswer: 'Sigmoid',
        hint: 'The sigmoid function maps any real number to a value between 0 and 1: σ(z) = 1 / (1 + e^(-z))',
        explanation: 'Logistic Regression uses the sigmoid activation function to transform linear outputs into probabilities between 0 and 1.',
        difficulty: ChallengeDifficulty.Easy
    },
    'knn_challenge': {
        id: 'knn_challenge',
        algorithmId: 'knn',
        type: ChallengeType.MultipleChoice,
        question: 'What happens to the decision boundary as K increases in K-Nearest Neighbors?',
        options: [
            'It becomes more complex and overfits',
            'It becomes smoother and more generalized',
            'It remains unchanged',
            'It becomes linear'
        ],
        correctAnswer: 'It becomes smoother and more generalized',
        hint: 'Larger K means considering more neighbors, which leads to averaging over more data points and smoother boundaries.',
        explanation: 'As K increases, the decision boundary becomes smoother because predictions are based on more neighbors, reducing overfitting but potentially increasing bias.',
        difficulty: ChallengeDifficulty.Medium
    },
    'kmeans_challenge': {
        id: 'kmeans_challenge',
        algorithmId: 'kmeans',
        type: ChallengeType.MultipleChoice,
        question: 'What is the main limitation of K-Means clustering?',
        options: [
            'It cannot handle large datasets',
            'It requires knowing the number of clusters (K) in advance',
            'It only works with categorical data',
            'It cannot find any cluster patterns'
        ],
        correctAnswer: 'It requires knowing the number of clusters (K) in advance',
        hint: 'The "K" in K-Means is a hyperparameter that you must specify before running the algorithm.',
        explanation: 'K-Means requires you to specify the number of clusters (K) beforehand, which can be challenging when the optimal number is unknown.',
        difficulty: ChallengeDifficulty.Easy
    },
    'naive_bayes_challenge': {
        id: 'naive_bayes_challenge',
        algorithmId: 'naive_bayes',
        type: ChallengeType.MultipleChoice,
        question: 'What key assumption does Naive Bayes make about features?',
        options: [
            'All features are normally distributed',
            'Features are conditionally independent given the class',
            'Features are linearly related',
            'Features have equal importance'
        ],
        correctAnswer: 'Features are conditionally independent given the class',
        hint: 'The "naive" assumption means features don\'t influence each other: P(X₁, X₂|Y) = P(X₁|Y) × P(X₂|Y)',
        explanation: 'Naive Bayes assumes that all features are conditionally independent given the class label, which simplifies probability calculations.',
        difficulty: ChallengeDifficulty.Medium
    },
    'decision_tree_challenge': {
        id: 'decision_tree_challenge',
        algorithmId: 'decision_tree',
        type: ChallengeType.MultipleChoice,
        question: 'Which metric is commonly used to measure the quality of a split in Decision Trees?',
        options: [
            'Mean Squared Error',
            'Information Gain (Entropy)',
            'Cosine Similarity',
            'Euclidean Distance'
        ],
        correctAnswer: 'Information Gain (Entropy)',
        hint: 'Information Gain measures the reduction in uncertainty using entropy: Entropy = -Σ p(x) log₂ p(x)',
        explanation: 'Decision Trees use Information Gain based on entropy to measure how well a split reduces uncertainty in the data.',
        difficulty: ChallengeDifficulty.Medium
    },
    'svm_challenge': {
        id: 'svm_challenge',
        algorithmId: 'svm',
        type: ChallengeType.MultipleChoice,
        question: 'What is the primary goal of Support Vector Machines?',
        options: [
            'Minimize the number of support vectors',
            'Maximize the margin between classes',
            'Minimize the training time',
            'Maximize the number of features'
        ],
        correctAnswer: 'Maximize the margin between classes',
        hint: 'SVM finds the optimal separating hyperplane with the largest margin between classes for better generalization.',
        explanation: 'Support Vector Machines aim to maximize the margin (distance) between the decision boundary and the nearest data points from each class.',
        difficulty: ChallengeDifficulty.Hard
    },
    'ann_challenge': {
        id: 'ann_challenge',
        algorithmId: 'ann',
        type: ChallengeType.MultipleChoice,
        question: 'What algorithm is used to train Artificial Neural Networks by computing gradients?',
        options: [
            'Forward Propagation',
            'Gradient Descent',
            'Backpropagation',
            'Stochastic Sampling'
        ],
        correctAnswer: 'Backpropagation',
        hint: 'Backpropagation uses the chain rule to compute gradients and propagates errors backward through the network.',
        explanation: 'Backpropagation is the algorithm that computes gradients of the loss function with respect to weights by propagating errors backward through the network layers.',
        difficulty: ChallengeDifficulty.Medium
    },
    'cnn_challenge': {
        id: 'cnn_challenge',
        algorithmId: 'cnn',
        type: ChallengeType.MultipleChoice,
        question: 'What is the primary advantage of using Convolutional layers in CNNs?',
        options: [
            'They reduce the number of parameters through weight sharing',
            'They increase model complexity',
            'They eliminate the need for activation functions',
            'They work only with text data'
        ],
        correctAnswer: 'They reduce the number of parameters through weight sharing',
        hint: 'Convolutional filters use the same weights across different positions in the input (parameter sharing).',
        explanation: 'Convolutional layers reduce parameters by sharing the same filter weights across the entire input, making CNNs more efficient than fully connected networks.',
        difficulty: ChallengeDifficulty.Hard
    },
    'rnn_challenge': {
        id: 'rnn_challenge',
        algorithmId: 'rnn',
        type: ChallengeType.MultipleChoice,
        question: 'What problem do LSTM and GRU architectures solve in RNNs?',
        options: [
            'Overfitting',
            'Vanishing/Exploding Gradients',
            'High computational cost',
            'Lack of parallelization'
        ],
        correctAnswer: 'Vanishing/Exploding Gradients',
        hint: 'LSTM uses gates to control information flow and prevent gradients from becoming too small or too large during backpropagation.',
        explanation: 'LSTM and GRU architectures solve the vanishing/exploding gradient problem that occurs in standard RNNs when processing long sequences.',
        difficulty: ChallengeDifficulty.Hard
    },
    'transformer_challenge': {
        id: 'transformer_challenge',
        algorithmId: 'transformer',
        type: ChallengeType.MultipleChoice,
        question: 'What mechanism allows Transformers to process sequences in parallel?',
        options: [
            'Recurrent connections',
            'Self-Attention mechanism',
            'Convolutional layers',
            'Pooling layers'
        ],
        correctAnswer: 'Self-Attention mechanism',
        hint: 'Self-attention computes relationships between all positions simultaneously: Attention(Q, K, V) = softmax(QK^T/√d_k)V',
        explanation: 'The self-attention mechanism allows Transformers to process all positions in parallel by computing relationships between all tokens simultaneously, unlike RNNs which process sequentially.',
        difficulty: ChallengeDifficulty.Hard
    }
};

/**
 * Get challenge for an algorithm
 */
export function getChallengeForAlgorithm(algorithmId: string): Challenge | undefined {
    const challengeId = `${algorithmId}_challenge`;
    return CHALLENGES[challengeId];
}

/**
 * Get all challenges
 */
export function getAllChallenges(): Challenge[] {
    return Object.values(CHALLENGES);
}

/**
 * Check if challenge exists for algorithm
 */
export function hasChallengeForAlgorithm(algorithmId: string): boolean {
    const challengeId = `${algorithmId}_challenge`;
    return challengeId in CHALLENGES;
}

/**
 * Get challenges by difficulty
 */
export function getChallengesByDifficulty(difficulty: ChallengeDifficulty): Challenge[] {
    return Object.values(CHALLENGES).filter(c => c.difficulty === difficulty);
}
