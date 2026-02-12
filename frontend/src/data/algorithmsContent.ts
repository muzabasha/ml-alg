// Comprehensive algorithm content for all 9 sections
export const algorithmsContent: Record<string, any> = {
    linear_regression: {
        name: 'Linear Regression',
        category: 'Regression',
        difficulty: 'Beginner',
        description: 'A fundamental supervised learning algorithm for predicting continuous values by finding the best-fitting straight line through data points.',
        sections: {
            introduction: {
                title: '1. Introduction',
                content: `Linear Regression is the simplest machine learning algorithm. It finds the best-fitting straight line through your data points.

**Real-World Analogy:** Think of it like a weather forecast—if you know the temperature has been rising by 2 degrees per day, you can predict tomorrow's temperature by adding 2 to today's. Linear Regression does exactly this.

**Where It's Used:**
• Predicting house prices based on size
• Forecasting sales based on advertising spend
• Estimating crop yield based on rainfall
• Predicting student scores based on study hours

**Type:** Supervised Learning (Regression)

**Strengths:**
✓ Simple and interpretable
✓ Fast to train and predict
✓ Works well for linear relationships
✓ Requires little computational power

**Limitations:**
✗ Assumes linear relationship
✗ Sensitive to outliers
✗ Cannot capture complex patterns
✗ Struggles with feature interactions`
            },
            mathematical: {
                title: '2. Mathematical Model',
                content: `**Hypothesis Function:**
h(x) = θ₀ + θ₁x

Where:
• θ₀ (theta-zero) = y-intercept
• θ₁ (theta-one) = slope
• x = input feature

**Cost Function (MSE):**
J(θ) = (1/2m) Σ(h(x⁽ⁱ⁾) - y⁽ⁱ⁾)²

**Gradient Descent:**
θⱼ := θⱼ - α(∂J/∂θⱼ)

**Intuitive Explanation:**
Imagine you're on a hill trying to reach the valley (minimum error). Gradient descent takes steps downhill. The slope tells you which direction, and learning rate (α) determines step size.`
            }
        }
    }
};
