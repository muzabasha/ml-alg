# 🎓 ML Learning Platform

A comprehensive, interactive machine learning education platform featuring 11 algorithms, 3 interactive playgrounds, and real-world dataset exploration.

## 🌟 Features

### 📚 11 Complete ML Algorithms
- **Classical ML**: Linear Regression, Logistic Regression, KNN, K-Means, Naive Bayes, Decision Tree, SVM
- **Deep Learning**: ANN, CNN, RNN, Transformer

Each algorithm includes:
- Comprehensive theory and explanations
- Mathematical models with LaTeX rendering
- Real-world applications and use cases
- From-scratch and library implementations
- Sample inputs/outputs with visualizations
- Evaluation metrics and best practices

### 🎮 3 Interactive Playgrounds

#### ML Playground
- Interactive learning for 7 classical algorithms
- Click to add data points
- Real-time model training
- Decision boundary visualization
- Adjustable hyperparameters

#### Neural Network Playground
- Design custom network architectures
- Add/remove layers and neurons
- 4 built-in datasets (Circle, XOR, Spiral, Gaussian)
- Real-time training visualization
- Loss and accuracy tracking

#### Transformer Playground
- Interactive attention mechanism visualization
- Click tokens to see attention patterns
- Multi-head attention display
- Adjustable parameters (heads, layers, temperature)
- Custom text input support

### 📊 Dataset Explorer
- **Iris Flower Dataset**: 150 samples, 4 features, 3 classes
- **Wine Quality Dataset**: 178 samples, 13 features, 3 classes

Features:
- Descriptive statistics
- Feature correlations
- Complete Python code examples
- Best practices and tips

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+ (for backend, optional)

### Installation

```bash
# Clone the repository
git clone https://github.com/muzabasha/ml-alg.git
cd ml-alg

# Install frontend dependencies
cd frontend
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the platform.

### Production Build

```bash
cd frontend
npm run build
npm start
```

## 📁 Project Structure

```
ml-alg/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── DataVisualization.tsx
│   │   │   ├── MLPlayground.tsx
│   │   │   ├── NeuralNetworkPlayground.tsx
│   │   │   └── TransformerPlayground.tsx
│   │   ├── pages/           # Next.js pages
│   │   │   ├── index.tsx    # Homepage
│   │   │   ├── datasets.tsx # Dataset explorer
│   │   │   ├── instructor.tsx
│   │   │   └── algorithm/[id].tsx
│   │   └── styles/          # Global styles
│   ├── public/
│   │   └── data/            # Algorithm JSON files
│   └── package.json
├── backend/                 # FastAPI backend (optional)
│   ├── app/
│   │   └── main.py
│   └── requirements.txt
└── content/                 # Algorithm content
    └── algorithms/          # Algorithm JSON files
```

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Math Rendering**: KaTeX
- **Charts**: Chart.js with react-chartjs-2
- **Deployment**: Vercel

### Backend (Optional)
- **Framework**: FastAPI
- **Language**: Python 3.8+

## 📖 Usage

### Exploring Algorithms
1. Visit the homepage
2. Click on any algorithm card
3. Navigate through 9 comprehensive sections
4. Try the interactive playground

### Using Playgrounds
1. Select an algorithm with playground support
2. Click "Open Playground" button
3. Interact with the visualization
4. Adjust parameters and see real-time results

### Dataset Explorer
1. Go to "Datasets" page
2. Select a dataset (Iris or Wine)
3. Explore statistics and correlations
4. Copy Python code examples

## 🎯 Educational Goals

This platform is designed to:
- Provide comprehensive ML algorithm education
- Enable hands-on interactive learning
- Bridge theory and practical implementation
- Support both beginners and advanced learners
- Demonstrate real-world applications

## 🌐 Deployment

### Vercel (Recommended)

1. Fork this repository
2. Import to Vercel
3. Set **Root Directory** to `frontend`
4. Deploy

### Manual Deployment

```bash
cd frontend
npm run build
npm start
```

## 📝 Algorithm Coverage

### Supervised Learning
- Linear Regression
- Logistic Regression
- K-Nearest Neighbors
- Naive Bayes
- Decision Tree
- Support Vector Machine

### Unsupervised Learning
- K-Means Clustering

### Deep Learning
- Artificial Neural Networks
- Convolutional Neural Networks
- Recurrent Neural Networks
- Transformer Networks

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with Next.js, React, and TypeScript
- Math rendering powered by KaTeX
- Visualizations powered by Chart.js
- Inspired by TensorFlow Playground

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Repository**: https://github.com/muzabasha/ml-alg  
**Version**: 1.0.0  
**Status**: Production Ready ✅

🎉 **Happy Learning!** 🎉
