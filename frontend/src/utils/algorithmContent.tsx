import React from 'react';

export interface AlgorithmSection {
    title: string;
    content: React.ReactNode;
}

export interface AlgorithmData {
    name: string;
    category: string;
    difficulty: string;
    description: string;
    sections: {
        [key: string]: AlgorithmSection;
    };
}

// Helper component for LaTeX-style math
const Math = ({ children }: { children: string }) => (
    <span className="font-mono bg-blue-50 px-2 py-1 rounded text-blue-900 border border-blue-200">
        {children}
    </span>
);

// Helper component for code blocks
const Code = ({ children, language = 'python' }: { children: string; language?: string }) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4">
        <code className="text-sm">{children}</code>
    </pre>
);

export const algorithmsContent: Record<string, AlgorithmData> = {
    linear_regression: {
        name: 'Linear Regression',
        category: 'Regression',
        difficulty: 'Beginner',
        description: 'Predict continuous values using a straight line relationship',
        sections: {
            introduction: {
                title: '1. Introduction',
                content: (
                    <div className="space-y-4">
                        <p className="text-lg leading-relaxed">
                            Linear Regression is the simplest machine learning algorithm. It finds the best-fitting
                            straight line through your data points to make predictions.
                        </p>

                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                            <h4 className="font-bold text-blue-900 mb-2">🌤️ Real-World Analogy</h4>
                            <p className="text-blue-800">
                                Think of it like a weather forecast: if the temperature has been rising by 2 degrees
                                per day, you can predict tomorrow's temperature by adding 2 to today's. Linear Regression
                                does exactly this—it finds the "rate of change" and uses it to make predictions.
                            </p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-6 my-4">
                            <h4 className="font-bold text-gray-900 mb-3">📍 Where It's Used</h4>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Predicting house prices based on size and location</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Forecasting sales based on advertising spend</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Estimating crop yield based on rainfall</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Predicting student scores based on study hours</span>
                                </li>
                            </ul>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 my-4">
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <h4 className="font-bold text-green-900 mb-2">✓ Strengths</h4>
                                <ul className="text-sm space-y-1 text-green-800">
                                    <li>• Simple and interpretable</li>
                                    <li>• Fast to train and predict</li>
                                    <li>• Works well for linear relationships</li>
                                    <li>• Requires little computational power</li>
                                </ul>
                            </div>
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <h4 className="font-bold text-red-900 mb-2">✗ Limitations</h4>
                                <ul className="text-sm space-y-1 text-red-800">
                                    <li>• Assumes linear relationship</li>
                                    <li>• Sensitive to outliers</li>
                                    <li>• Cannot capture complex patterns</li>
                                    <li>• Struggles with feature interactions</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                            <p className="text-purple-900">
                                <strong>Type:</strong> Supervised Learning (Regression)
                            </p>
                        </div>
                    </div>
                ),
            },
            mathematical: {
                title: '2. Mathematical Model',
                content: (
                    <div className="space-y-6">
                        <p className="text-lg">
                            Linear Regression finds the line that minimizes the distance between predicted and actual values.
                        </p>

                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
                            <h4 className="font-bold text-blue-900 mb-3">Hypothesis Function</h4>
                            <div className="bg-white p-4 rounded border border-blue-100 mb-3">
                                <p className="text-center text-xl font-mono">
                                    h(x) = θ₀ + θ₁x
                                </p>
                            </div>
                            <div className="text-sm space-y-2">
                                <p><Math>θ₀</Math> (theta-zero) = y-intercept (where line crosses y-axis)</p>
                                <p><Math>θ₁</Math> (theta-one) = slope (steepness of the line)</p>
                                <p><Math>x</Math> = input feature (independent variable)</p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
                            <h4 className="font-bold text-purple-900 mb-3">Cost Function (Mean Squared Error)</h4>
                            <div className="bg-white p-4 rounded border border-purple-100 mb-3">
                                <p className="text-center text-lg font-mono">
                                    J(θ₀, θ₁) = (1/2m) Σ(h(x⁽ⁱ⁾) - y⁽ⁱ⁾)²
                                </p>
                            </div>
                            <p className="text-sm text-purple-800">
                                This measures how wrong our predictions are. <Math>m</Math> is the number of training examples.
                                We square the errors to penalize large mistakes more heavily. The goal is to minimize this cost.
                            </p>
                        </div>

                        <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-lg p-6">
                            <h4 className="font-bold text-green-900 mb-3">Gradient Descent Update Rule</h4>
                            <div className="bg-white p-4 rounded border border-green-100 mb-3">
                                <p className="text-center text-lg font-mono">
                                    θⱼ := θⱼ - α(∂J/∂θⱼ)
                                </p>
                            </div>
                            <p className="text-sm text-green-800">
                                This is how we improve our parameters. <Math>α</Math> (alpha) is the learning rate—how big
                                a step we take. We repeatedly update θ until the cost stops decreasing.
                            </p>
                        </div>

                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                            <h4 className="font-bold text-yellow-900 mb-2">💡 Intuitive Explanation</h4>
                            <p className="text-yellow-800">
                                Imagine you're on a hill and want to reach the valley (minimum error). Gradient descent
                                is like taking steps downhill. The slope tells you which direction to go, and the learning
                                rate determines how big your steps are.
                            </p>
                        </div>
                    </div>
                ),
            },
        },
    },
};
