# Developer Guide - Adding New Algorithms

This guide shows you how to add a new ML algorithm to the platform in 30 minutes.

## 📋 Prerequisites

- Basic understanding of the ML algorithm
- Python knowledge (NumPy, scikit-learn)
- Text editor or IDE

## 🎯 The 9-Section Template

Every algorithm MUST include these sections:

1. Introduction
2. Mathematical Model
3. Sample Input & Output
4. Interpretation of Output
5. Implementation - From Scratch
6. Implementation - With API
7. Model Evaluation
8. Performance Interpretation
9. Ways to Improve Performance

## 🚀 Step-by-Step Process

### Step 1: Create the JSON File (5 min)

Create `content/algorithms/your_algorithm.json`:

```json
{
    "id": "your_algorithm",
    "name": "Your Algorithm Name",
    "category": "Supervised Learning - Classification",
    "difficulty": "Beginner",
    "estimatedTime": "45 minutes",
    "sections": {
        // Sections go here
    }
}
```

### Step 2: Write the Introduction (5 min)

```json
"introduction": {
    "title": "Introduction to Your Algorithm",
    "plainLanguage": "Explain in simple terms what the algorithm does",
    "realWorldAnalogy": "Use a real-world analogy anyone can understand",
    "whereAndWhy": "When and why to use this algorithm",
    "learningType": "Supervised/Unsupervised Learning",
    "strengths": [
        "Strength 1",
        "Strength 2",
        "Strength 3"
    ],
    "limitations": [
        "Limitation 1",
        "Limitation 2",
        "Limitation 3"
    ]
}
```

**Tips:**
- Use analogies from everyday life
- Be honest about limitations
- Keep language simple and friendly

### Step 3: Mathematical Model (5 min)

```json
"mathematical_model": {
    "title": "Mathematical Formulation",
    "introduction": "Brief intro to the math",
    "equations": [
        {
            "name": "Main Equation",
            "latex": "y = mx + b",
            "explanation": "What this equation means in plain English"
        }
    ],
    "keyTerms": {
        "term1": "definition",
        "term2": "definition"
    },
    "intuition": "Intuitive explanation of the math"
}
```

**Tips:**
- Use LaTeX for equations
- Explain every symbol
- Provide intuition, not just formulas

### Step 4: Sample I/O (3 min)

```json
"sample_io": {
    "title": "Sample Input & Output",
    "description": "What this example demonstrates",
    "input": {
        "format": "Description of input format",
        "table": [
            {"Feature1": 1, "Feature2": 2, "Label": 0},
            {"Feature1": 3, "Feature2": 4, "Label": 1}
        ]
    },
    "output": {
        "parameters": {
            "param1": "value1",
            "param2": "value2"
        },
        "predictions": [
            {"Input": "...", "Predicted": "...", "Actual": "..."}
        ],
        "metrics": {
            "Accuracy": 0.95
        }
    },
    "visualization": "Description of what to visualize"
}
```

**Tips:**
- Use small, realistic datasets
- Show clear input → output mapping
- Include visualization description

### Step 5: Interpretation (3 min)

```json
"interpretation": {
    "title": "Interpreting the Output",
    "parameters": {
        "param1": "What this parameter means",
        "param2": "What this parameter means"
    },
    "predictions": "How to read predictions",
    "metrics": {
        "metric1": "What this metric means"
    },
    "commonMisinterpretations": [
        "❌ WRONG: '...' → ✓ RIGHT: '...'",
        "❌ WRONG: '...' → ✓ RIGHT: '...'"
    ]
}
```

**Tips:**
- Focus on practical interpretation
- Highlight common mistakes
- Use ❌ and ✓ symbols

### Step 6: From-Scratch Implementation (10 min)

```json
"implementation_scratch": {
    "title": "Python Implementation (From Scratch)",
    "description": "What this implementation shows",
    "code": "import numpy as np\n\nclass YourAlgorithm:\n    def __init__(self):\n        # Initialize\n        pass\n    \n    def fit(self, X, y):\n        # Train\n        pass\n    \n    def predict(self, X):\n        # Predict\n        pass\n\n# Example usage\nX = np.array([[1, 2], [3, 4]])\ny = np.array([0, 1])\nmodel = YourAlgorithm()\nmodel.fit(X, y)\nprint(model.predict(X))",
    "explanation": "Step-by-step explanation of the code"
}
```

**Tips:**
- Comment EVERY line
- Use descriptive variable names
- Keep it simple (< 100 lines)
- Test the code before adding

### Step 7: API Implementation (3 min)

```json
"implementation_api": {
    "title": "Python Implementation (Using scikit-learn)",
    "description": "Production-ready implementation",
    "code": "from sklearn.your_module import YourAlgorithm\nimport numpy as np\n\nX = np.array([[1, 2], [3, 4]])\ny = np.array([0, 1])\n\nmodel = YourAlgorithm()\nmodel.fit(X, y)\ny_pred = model.predict(X)\n\nprint(f'Predictions: {y_pred}')",
    "comparison": "How this differs from from-scratch version"
}
```

**Tips:**
- Use standard scikit-learn API
- Show key parameters
- Compare with from-scratch

### Step 8: Evaluation (3 min)

```json
"evaluation": {
    "title": "Model Evaluation",
    "why": "Why evaluation is needed",
    "metrics": [
        {
            "name": "Metric Name",
            "formula": "LaTeX formula",
            "interpretation": "What it means",
            "example": "Example value and interpretation"
        }
    ]
}
```

**Tips:**
- Include 3-5 relevant metrics
- Explain when to use each
- Provide interpretation guidelines

### Step 9: Performance & Improvements (3 min)

```json
"performance_interpretation": {
    "title": "Interpreting Model Performance",
    "whatIsGood": "What constitutes good performance",
    "whenModelFails": [
        "Scenario 1",
        "Scenario 2"
    ],
    "biasVariance": {
        "highBias": "What causes high bias",
        "highVariance": "What causes high variance"
    },
    "overfittingVsUnderfitting": "Explanation"
},
"improvements": {
    "title": "Ways to Improve Performance",
    "featureEngineering": ["Tip 1", "Tip 2"],
    "hyperparameterTuning": ["Tip 1", "Tip 2"],
    "dataPreprocessing": ["Tip 1", "Tip 2"],
    "algorithmSpecific": ["Tip 1", "Tip 2"],
    "ensemblePossibilities": ["Tip 1", "Tip 2"]
}
```

**Tips:**
- Be specific and actionable
- Provide concrete examples
- Focus on practical improvements

## ✅ Validation Checklist

Before submitting, verify:

- [ ] JSON is valid (use JSON validator)
- [ ] All 9 sections are present
- [ ] Code examples are tested and work
- [ ] LaTeX equations render correctly
- [ ] No unexplained jargon
- [ ] Analogies are clear and relatable
- [ ] Common mistakes are highlighted
- [ ] Tone is beginner-friendly

## 🧪 Testing Your Algorithm

### 1. Validate JSON
```bash
python -c "import json; print(json.load(open('content/algorithms/your_algorithm.json')))"
```

### 2. Test via API
```bash
# Start backend
cd backend
python app/main.py

# In another terminal
curl http://localhost:8000/api/algorithms/your_algorithm
```

### 3. Test Code Execution
```bash
curl -X POST http://localhost:8000/api/execute/run \
  -H "Content-Type: application/json" \
  -d '{"code": "YOUR_CODE_HERE"}'
```

## 📝 Writing Style Guide

### Do's ✅
- Use simple, conversational language
- Include real-world analogies
- Explain WHY, not just HOW
- Highlight common mistakes
- Provide actionable advice
- Use examples liberally

### Don'ts ❌
- Don't use unexplained jargon
- Don't assume prior knowledge
- Don't skip steps in explanations
- Don't use overly complex math
- Don't forget to test code
- Don't be intimidating

## 🎨 Formatting Guidelines

### Code Blocks
- Use `\n` for newlines in JSON
- Indent with 4 spaces
- Comment every line
- Keep lines < 80 characters

### LaTeX Equations
- Use double backslashes: `\\frac{1}{2}`
- Test in KaTeX renderer
- Provide plain-text explanation

### Lists
- Use arrays for lists
- Keep items concise
- Use parallel structure

## 🔍 Example: Complete Algorithm Template

See `content/algorithms/linear_regression.json` for a complete example.

Key sections to study:
- Introduction: Clear analogy and use cases
- Mathematical Model: LaTeX with intuition
- Implementation: Heavily commented code
- Interpretation: Common mistakes highlighted

## 🚀 Quick Reference

### Algorithm Categories
- "Supervised Learning - Regression"
- "Supervised Learning - Classification"
- "Unsupervised Learning - Clustering"
- "Unsupervised Learning - Dimensionality Reduction"

### Difficulty Levels
- "Beginner" - Linear Regression, KNN
- "Intermediate" - Decision Tree, Naïve Bayes
- "Advanced" - SVM, Neural Networks

### Estimated Times
- Beginner: 40-50 minutes
- Intermediate: 50-60 minutes
- Advanced: 60-75 minutes

## 💡 Pro Tips

1. **Start with Introduction**: Get the analogy right first
2. **Test Code Early**: Don't wait until the end
3. **Use Existing Algorithms**: Copy structure from similar algorithms
4. **Get Feedback**: Have someone review before submitting
5. **Iterate**: First draft doesn't need to be perfect

## 🤝 Getting Help

- Check existing algorithms for examples
- Review ARCHITECTURE.md for system design
- Read QUICK_START.md for setup
- Open an issue on GitHub for questions

## 📚 Resources

### LaTeX
- [KaTeX Supported Functions](https://katex.org/docs/supported.html)
- [LaTeX Math Symbols](https://www.overleaf.com/learn/latex/List_of_Greek_letters_and_math_symbols)

### scikit-learn
- [API Reference](https://scikit-learn.org/stable/modules/classes.html)
- [User Guide](https://scikit-learn.org/stable/user_guide.html)

### JSON
- [JSON Validator](https://jsonlint.com/)
- [JSON Formatter](https://jsonformatter.org/)

---

**Ready to add your first algorithm? Start with the template above!** 🚀

**Estimated Time: 30-40 minutes for a complete algorithm**
