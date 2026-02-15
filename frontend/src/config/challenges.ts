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
        hints: [
            'Think about the "least squares" method',
            'The loss function involves squaring the differences',
            'MSE = (1/n) * Σ(y_actual - y_predicted)²'
        ],
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
        hints: [
            'The function maps any real number to a value between 0 and 1',
            'It has an S-shaped curve',
            'σ(z) = 1 / (1 + e^(-z))'
        ],
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
        hints: [
            'Larger K means considering more neighbors',
            'More neighbors lead to averaging over more data points',
            'Think about the bias-variance tradeoff'
        ],
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
        hints: [
            'Think about what you need to specify before running the algorithm',
            'The "K" in K-Means is a hyperparameter',
            'You must choose K before the algorithm starts'
        ],
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
        hints: [
            'The word "naive" refers to this assumption',
            'It assumes features don\'t influence each other',
            'P(X₁, X₂|Y) = P(X₁|Y) × P(X₂|Y)'
        ],
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
        hints: [
            'It measures the reduction in uncertainty',
            'Based on information theory',
            'Entropy = -Σ p(x) log₂ p(x)'
        ],
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
        hints: [
            'SVM finds the optimal separating hyperplane',
            'The margin is the distance between the hyperplane and nearest points',
            'Larger margin = better generalization'
        ],
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
        hints: [
            'It propagates errors backward through the network',
            'Uses the chain rule to compute gradients',
            'Updates weights from output layer to input layer'
        ],
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
        hints: [
            'Convolutional filters are applied across the entire input',
            'Same filter weights are used at different positions',
            'This is called parameter sharing or weight tying'
        ],
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
        hints: [
            'Standard RNNs struggle with long sequences',
            'Gradients become very small or very large during backpropagation',
            'LSTM uses gates to control information flow'
        ],
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
        hints: [
            'It computes relationships between all positions simultaneously',
            'No sequential processing required',
            'Attention(Q, K, V) = softmax(QK^T/√d_k)V'
        ],
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
