# ML Algorithms Learning Platform - Project Structure

## Directory Layout

```
ml-learning-platform/
├── frontend/                          # React/Next.js application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AlgorithmSelector.tsx
│   │   │   ├── ContentAccordion.tsx
│   │   │   ├── CodeBlock.tsx
│   │   │   ├── MathRenderer.tsx
│   │   │   ├── Visualization.tsx
│   │   │   ├── InteractiveSliders.tsx
│   │   │   ├── QuizComponent.tsx
│   │   │   └── ComparisonView.tsx
│   │   ├── pages/
│   │   │   ├── index.tsx              # Home/Dashboard
│   │   │   ├── algorithm/[id].tsx     # Algorithm detail page
│   │   │   └── compare.tsx            # Algorithm comparison
│   │   ├── styles/
│   │   ├── utils/
│   │   │   ├── algorithmData.ts       # Algorithm content structure
│   │   │   └── codeExecutor.ts        # API calls to backend
│   │   └── app.tsx
│   ├── package.json
│   └── next.config.js
│
├── backend/                           # Python FastAPI server
│   ├── app/
│   │   ├── main.py                    # FastAPI app initialization
│   │   ├── routes/
│   │   │   ├── algorithms.py          # Algorithm endpoints
│   │   │   └── execution.py           # Code execution endpoints
│   │   ├── services/
│   │   │   ├── linear_regression.py
│   │   │   ├── logistic_regression.py
│   │   │   ├── knn.py
│   │   │   ├── naive_bayes.py
│   │   │   ├── decision_tree.py
│   │   │   ├── random_forest.py
│   │   │   ├── svm.py
│   │   │   ├── kmeans.py
│   │   │   ├── hierarchical.py
│   │   │   └── pca.py
│   │   ├── models/
│   │   │   └── schemas.py             # Pydantic models
│   │   └── utils/
│   │       ├── visualization.py
│   │       └── evaluation.py
│   ├── requirements.txt
│   └── run.py
│
├── content/                           # Algorithm content (JSON/YAML)
│   ├── algorithms/
│   │   ├── linear_regression.json
│   │   ├── logistic_regression.json
│   │   ├── knn.json
│   │   ├── naive_bayes.json
│   │   ├── decision_tree.json
│   │   ├── random_forest.json
│   │   ├── svm.json
│   │   ├── kmeans.json
│   │   ├── hierarchical.json
│   │   └── pca.json
│   └── sample_datasets/
│       ├── iris.csv
│       ├── housing.csv
│       └── synthetic_data.csv
│
└── docs/
    ├── ARCHITECTURE.md
    ├── API_SPEC.md
    └── DEPLOYMENT.md
```

## Content Structure Per Algorithm

Each algorithm JSON file follows this structure:

```json
{
  "id": "linear_regression",
  "name": "Linear Regression",
  "category": "Supervised Learning - Regression",
  "sections": {
    "introduction": { ... },
    "mathematical_model": { ... },
    "sample_io": { ... },
    "interpretation": { ... },
    "implementation_scratch": { ... },
    "implementation_api": { ... },
    "evaluation": { ... },
    "performance_interpretation": { ... },
    "improvements": { ... }
  }
}
```

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python 3.11+
- **Visualization**: Plotly.js, D3.js
- **Math Rendering**: KaTeX
- **Code Execution**: Jupyter kernel (optional) or sandboxed Python
- **Database**: Optional (for progress tracking)
- **Deployment**: Docker, Vercel (frontend), AWS/Heroku (backend)
