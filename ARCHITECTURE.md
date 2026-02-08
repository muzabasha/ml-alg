# ML Algorithms Learning Platform - Architecture & Design

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     Frontend (React/Next.js)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   Sidebar    │  │  Algorithm   │  │  Interactive         │  │
│  │  Selector    │  │  Detail Page │  │  Components          │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓ (HTTP/REST)
┌─────────────────────────────────────────────────────────────────┐
│                  Backend (FastAPI/Python)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  Algorithm   │  │  Code        │  │  Evaluation &        │  │
│  │  Routes      │  │  Execution   │  │  Visualization       │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Content & Services                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  Algorithm   │  │  ML Services │  │  Sample Datasets     │  │
│  │  JSON Files  │  │  (scikit-learn)  │  (CSV)               │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Frontend Architecture

### Component Hierarchy

```
App
├── AlgorithmSelector (Sidebar)
│   └── Algorithm List (by category)
│
└── AlgorithmPage
    ├── Header (Algorithm Title, Metadata)
    └── ContentAccordion
        ├── Introduction Section
        │   ├── Plain Language Explanation
        │   ├── Real-World Analogy
        │   ├── Strengths/Limitations
        │   └── Learning Type Badge
        │
        ├── Mathematical Model Section
        │   ├── EquationBlock (LaTeX)
        │   ├── Key Terms Definition
        │   └── Intuition Explanation
        │
        ├── Sample I/O Section
        │   ├── Input Table
        │   ├── Output Display
        │   └── Visualization
        │
        ├── Implementation Section
        │   └── CodeToggle
        │       ├── From Scratch (NumPy)
        │       └── Using API (scikit-learn)
        │
        ├── Evaluation Section
        │   ├── Metric Explanations
        │   └── Sample Results
        │
        └── Improvements Section
            ├── Feature Engineering
            ├── Hyperparameter Tuning
            └── Data Preprocessing
```

### Key Components

1. **AlgorithmSelector**: Sidebar navigation with algorithm categories
2. **ContentAccordion**: Expandable sections for structured learning
3. **CodeBlock/CodeToggle**: Syntax-highlighted code with execution
4. **MathRenderer**: LaTeX equation rendering with KaTeX
5. **Visualization**: Interactive plots (Plotly)
6. **InteractiveSliders**: Parameter adjustment for experimentation

## Backend Architecture

### API Endpoints

#### Algorithm Routes (`/api/algorithms`)
- `GET /list` - List all algorithms with metadata
- `GET /{algorithm_id}` - Get full algorithm content
- `GET /{algorithm_id}/section/{section_id}` - Get specific section
- `GET /{algorithm_id}/compare?compare_with={id2}` - Compare two algorithms

#### Execution Routes (`/api/execute`)
- `POST /run` - Execute Python code
- `POST /evaluate` - Evaluate model performance
- `POST /visualize` - Generate visualization data

### Service Layer

Each algorithm has a dedicated service module:
- `linear_regression.py` - Linear Regression implementation
- `logistic_regression.py` - Logistic Regression implementation
- `knn.py` - k-Nearest Neighbors implementation
- ... (one per algorithm)

Each service provides:
- `train(X, y)` - Train the model
- `predict(X)` - Make predictions
- `evaluate(y_true, y_pred)` - Calculate metrics
- `visualize(results)` - Generate plot data

## Content Structure

### Algorithm JSON Schema

```json
{
  "id": "algorithm_id",
  "name": "Algorithm Name",
  "category": "Category",
  "difficulty": "Beginner|Intermediate|Advanced",
  "estimatedTime": "45 minutes",
  "sections": {
    "introduction": {
      "plainLanguage": "...",
      "realWorldAnalogy": "...",
      "whereAndWhy": "...",
      "learningType": "Supervised/Unsupervised",
      "strengths": ["..."],
      "limitations": ["..."]
    },
    "mathematical_model": {
      "introduction": "...",
      "equations": [
        {
          "name": "Equation Name",
          "latex": "\\frac{...}{...}",
          "explanation": "..."
        }
      ],
      "keyTerms": { "term": "definition" },
      "intuition": "..."
    },
    "sample_io": {
      "description": "...",
      "input": { "table": [...] },
      "output": { "parameters": {...}, "predictions": [...] },
      "visualization": "..."
    },
    "interpretation": {
      "parameters": "...",
      "predictions": "...",
      "metrics": "...",
      "commonMisinterpretations": ["..."]
    },
    "implementation_scratch": {
      "description": "...",
      "code": "..."
    },
    "implementation_api": {
      "description": "...",
      "code": "...",
      "comparison": "..."
    },
    "evaluation": {
      "why": "...",
      "metrics": [
        {
          "name": "Metric Name",
          "formula": "...",
          "interpretation": "...",
          "example": "..."
        }
      ]
    },
    "performance_interpretation": {
      "whatIsGood": "...",
      "whenModelFails": ["..."],
      "biasVariance": {...},
      "overfittingVsUnderfitting": "..."
    },
    "improvements": {
      "featureEngineering": ["..."],
      "hyperparameterTuning": ["..."],
      "dataPreprocessing": ["..."],
      "algorithmSpecific": ["..."],
      "ensemblePossibilities": ["..."]
    }
  }
}
```

## Data Flow

### Learning Flow
1. User selects algorithm from sidebar
2. Frontend fetches algorithm content from backend
3. Content is displayed in accordion sections
4. User reads through each section sequentially
5. User can toggle between math and intuition views
6. User can view code implementations

### Code Execution Flow
1. User clicks "Execute" button on code block
2. Frontend sends code to backend `/api/execute/run`
3. Backend executes code in sandboxed environment
4. Results are returned as JSON
5. Frontend displays output and visualizations

### Evaluation Flow
1. User trains a model using provided code
2. Frontend sends evaluation request to backend
3. Backend calculates metrics (accuracy, precision, etc.)
4. Results are displayed with interpretation
5. Visualizations (confusion matrix, etc.) are rendered

## Technology Choices

### Frontend
- **Next.js**: Server-side rendering, static generation, API routes
- **React**: Component-based UI
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first styling
- **KaTeX**: Fast LaTeX rendering
- **Plotly.js**: Interactive visualizations
- **Lucide Icons**: Lightweight icon library

### Backend
- **FastAPI**: Modern, fast Python web framework
- **Pydantic**: Data validation
- **scikit-learn**: ML algorithms
- **NumPy/Pandas**: Data manipulation
- **Matplotlib/Plotly**: Visualization

### Deployment
- **Frontend**: Vercel (Next.js optimized)
- **Backend**: AWS EC2 / Heroku / DigitalOcean
- **Database**: Optional (PostgreSQL for progress tracking)
- **Docker**: Containerization for consistency

## Scalability Considerations

### Current Design
- Stateless backend (easy to scale horizontally)
- Content served as static JSON (can be cached)
- Code execution sandboxed (prevents resource abuse)

### Future Enhancements
1. **User Accounts**: Track progress, save notes
2. **Database**: Store user progress, quiz results
3. **Caching**: Redis for frequently accessed content
4. **CDN**: Distribute static assets globally
5. **Microservices**: Separate services per algorithm
6. **Jupyter Integration**: Full notebook environment
7. **Real-time Collaboration**: Multiple users learning together

## Security Considerations

1. **Code Execution**: Sandboxed environment with timeout
2. **Input Validation**: Pydantic models for all inputs
3. **CORS**: Restricted to known origins
4. **Rate Limiting**: Prevent abuse of execution endpoint
5. **Error Handling**: Don't expose internal errors to users
6. **Dependencies**: Regular security updates

## Performance Optimization

1. **Frontend**:
   - Code splitting per algorithm
   - Lazy loading of visualizations
   - Image optimization
   - Caching of algorithm content

2. **Backend**:
   - Async request handling
   - Connection pooling
   - Query optimization
   - Response compression

3. **Content**:
   - Static JSON files (no database queries)
   - Pre-computed sample outputs
   - Cached visualizations
