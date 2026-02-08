# Quick Start Guide

Get the ML Learning Platform running in 5 minutes!

## Prerequisites Check

```bash
# Check Python version (need 3.8+)
python --version

# Check Node.js version (need 16+)
node --version

# Check npm
npm --version
```

## Step 1: Clone and Navigate

```bash
cd ml-learning-platform
```

## Step 2: Backend Setup (Terminal 1)

```bash
# Navigate to backend
cd backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run backend server
python app/main.py
```

✅ Backend should now be running on `http://localhost:8000`

Test it: Open `http://localhost:8000/health` in your browser

## Step 3: Frontend Setup (Terminal 2)

```bash
# Navigate to frontend (from project root)
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

✅ Frontend should now be running on `http://localhost:3000`

## Step 4: Verify Everything Works

### Test Backend API

```bash
# List all algorithms
curl http://localhost:8000/api/algorithms/list

# Get Linear Regression content
curl http://localhost:8000/api/algorithms/linear_regression

# Execute sample code
curl -X POST http://localhost:8000/api/execute/run \
  -H "Content-Type: application/json" \
  -d "{\"code\": \"print('Hello ML!')\"}"
```

### Test Frontend

1. Open browser: `http://localhost:3000`
2. You should see the algorithm selector sidebar
3. Click on "Linear Regression"
4. Explore the accordion sections

## Common Issues & Solutions

### Issue: Port already in use

**Backend (8000)**
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:8000 | xargs kill -9
```

**Frontend (3000)**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Issue: Module not found

**Backend**
```bash
pip install --upgrade pip
pip install -r requirements.txt --force-reinstall
```

**Frontend**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: CORS errors

Make sure backend is running on port 8000 and frontend on port 3000. Check `backend/app/main.py` CORS configuration.

## Development Workflow

### Adding a New Algorithm

1. **Create content file**: `content/algorithms/your_algorithm.json`
2. **Follow the 9-section structure** (see existing algorithms)
3. **Test the JSON** is valid:
   ```bash
   python -c "import json; print(json.load(open('content/algorithms/your_algorithm.json')))"
   ```
4. **Restart backend** to load new content
5. **Verify** via API:
   ```bash
   curl http://localhost:8000/api/algorithms/your_algorithm
   ```

### Testing Code Execution

```bash
# Test Python code execution
curl -X POST http://localhost:8000/api/execute/run \
  -H "Content-Type: application/json" \
  -d '{
    "code": "import numpy as np\nx = np.array([1,2,3])\nprint(f\"Mean: {x.mean()}\")"
  }'
```

### Testing Model Evaluation

```bash
# Test regression evaluation
curl -X POST http://localhost:8000/api/execute/evaluate \
  -H "Content-Type: application/json" \
  -d '{
    "y_true": [1, 2, 3, 4, 5],
    "y_pred": [1.1, 2.0, 3.2, 3.9, 5.1],
    "task_type": "regression"
  }'

# Test classification evaluation
curl -X POST http://localhost:8000/api/execute/evaluate \
  -H "Content-Type: application/json" \
  -d '{
    "y_true": [0, 1, 1, 0, 1],
    "y_pred": [0, 1, 0, 0, 1],
    "task_type": "classification"
  }'
```

## API Documentation

Once backend is running, explore the interactive API docs:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Next Steps

1. ✅ Explore existing algorithms (Linear Regression, Logistic Regression, KNN, Decision Tree)
2. ✅ Try executing code examples
3. ✅ Add more algorithms following the template
4. ✅ Customize the frontend components
5. ✅ Add your own datasets in `content/sample_datasets/`

## Production Deployment

### Backend (Example: Heroku)

```bash
# Create Procfile
echo "web: uvicorn app.main:app --host 0.0.0.0 --port \$PORT" > Procfile

# Deploy
heroku create your-ml-platform-api
git push heroku main
```

### Frontend (Example: Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
```

## Useful Commands

```bash
# Backend
python app/main.py              # Run server
pip freeze > requirements.txt   # Update dependencies

# Frontend
npm run dev                     # Development server
npm run build                   # Production build
npm run start                   # Production server
npm run lint                    # Lint code

# Both
git status                      # Check changes
git add .                       # Stage changes
git commit -m "message"         # Commit changes
```

## Getting Help

- Check `ARCHITECTURE.md` for system design
- Check `PROJECT_STRUCTURE.md` for file organization
- Check `README.md` for comprehensive documentation
- Open an issue on GitHub for bugs or questions

---

**You're all set! Start learning ML algorithms! 🎓**
