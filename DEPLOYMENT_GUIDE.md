# 🚀 Local Hosting & GitHub Deployment Guide

## 📋 Prerequisites

Before starting, ensure you have:
- [x] Python 3.8+ installed
- [x] Node.js 16+ installed
- [x] npm or yarn installed
- [x] Git installed
- [x] GitHub account created

---

## 🔧 Part 1: Local Setup

### Step 1: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start backend server
python app/main.py
```

**Expected Output:**
```
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000
```

**Test Backend:**
- Open browser: http://localhost:8000/health
- Should see: `{"status": "healthy", "message": "ML Learning Platform API is running"}`
- API Docs: http://localhost:8000/docs

### Step 2: Frontend Setup

Open a **new terminal** (keep backend running):

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Expected Output:**
```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

**Test Frontend:**
- Open browser: http://localhost:3000
- Should see the ML Learning Platform

### Step 3: Add Profile Image

```bash
# Copy your profile image to the public folder
# Place DP_profile.png in: frontend/public/DP_profile.png
```

### Step 4: Verify Everything Works

**Backend Tests:**
```bash
cd backend
python test_api.py
```

**Expected:** All tests pass ✅

**Frontend Pages:**
- Home: http://localhost:3000
- Instructor: http://localhost:3000/instructor
- Algorithm: http://localhost:3000/algorithm/linear_regression

---

## 📦 Part 2: Prepare for GitHub

### Step 1: Create .gitignore

Create `.gitignore` in project root:

```bash
# Create .gitignore file
echo "Creating .gitignore..."
```

### Step 2: Initialize Git Repository

```bash
# Navigate to project root
cd /path/to/ml-learning-platform

# Initialize Git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: ML Learning Platform with 5 algorithms and instructor profile"
```

### Step 3: Create GitHub Repository

1. Go to https://github.com/muzabasha
2. Click "New repository" (green button)
3. Repository name: `ml-alg`
4. Description: "Interactive ML Learning Platform for Engineering Students"
5. Keep it **Public** (or Private if preferred)
6. **DO NOT** initialize with README (we already have one)
7. Click "Create repository"

### Step 4: Connect Local to GitHub

```bash
# Add remote repository
git remote add origin https://github.com/muzabasha/ml-alg.git

# Verify remote
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

**Expected Output:**
```
Enumerating objects: 50, done.
Counting objects: 100% (50/50), done.
Writing objects: 100% (50/50), done.
Total 50 (delta 0), reused 0 (delta 0)
To https://github.com/muzabasha/ml-alg.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

## 🔐 Part 3: GitHub Authentication

If you encounter authentication issues:

### Option 1: Personal Access Token (Recommended)

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Select scopes: `repo` (full control)
4. Copy the token
5. Use token as password when pushing:
   ```bash
   git push -u origin main
   # Username: muzabasha
   # Password: [paste your token]
   ```

### Option 2: SSH Key

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Add to GitHub: Settings → SSH and GPG keys → New SSH key

# Change remote to SSH
git remote set-url origin git@github.com:muzabasha/ml-alg.git

# Push
git push -u origin main
```

---

## 📁 Part 4: Repository Structure on GitHub

After pushing, your GitHub repository will have:

```
muzabasha/ml-alg/
├── README.md
├── ARCHITECTURE.md
├── QUICK_START.md
├── (all documentation files)
├── backend/
│   ├── app/
│   ├── requirements.txt
│   └── test_api.py
├── content/
│   └── algorithms/
│       ├── linear_regression.json
│       ├── logistic_regression.json
│       ├── knn.json
│       ├── decision_tree.json
│       └── svm.json
└── frontend/
    └── src/
        ├── components/
        └── pages/
```

---

## 🌐 Part 5: GitHub Pages (Optional)

To host the frontend on GitHub Pages:

### Step 1: Update next.config.js

```javascript
// frontend/next.config.js
module.exports = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/ml-alg',
  assetPrefix: '/ml-alg/',
}
```

### Step 2: Build and Deploy

```bash
cd frontend
npm run build
npm run export

# Create gh-pages branch
git checkout -b gh-pages
git add out/
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

### Step 3: Enable GitHub Pages

1. Go to repository Settings
2. Pages section
3. Source: Deploy from branch
4. Branch: gh-pages
5. Folder: / (root)
6. Save

**Your site will be at:** https://muzabasha.github.io/ml-alg/

---

## 🔄 Part 6: Future Updates

### Making Changes

```bash
# Make your changes to files

# Check status
git status

# Add changes
git add .

# Commit with message
git commit -m "Add Naive Bayes algorithm"

# Push to GitHub
git push origin main
```

### Creating Branches

```bash
# Create new branch for feature
git checkout -b feature/add-random-forest

# Make changes and commit
git add .
git commit -m "Add Random Forest algorithm"

# Push branch
git push origin feature/add-random-forest

# Create Pull Request on GitHub
# Merge when ready
```

---

## 📊 Part 7: Repository Settings

### Recommended Settings

1. **About Section:**
   - Description: "Interactive ML Learning Platform for Engineering Students"
   - Website: Your deployment URL
   - Topics: `machine-learning`, `education`, `react`, `fastapi`, `python`, `typescript`

2. **README Badges:**
   Add to top of README.md:
   ```markdown
   ![Python](https://img.shields.io/badge/python-3.8+-blue.svg)
   ![React](https://img.shields.io/badge/react-18-blue.svg)
   ![License](https://img.shields.io/badge/license-MIT-green.svg)
   ```

3. **License:**
   - Add LICENSE file (MIT recommended)

4. **Issues:**
   - Enable Issues for bug tracking

5. **Wiki:**
   - Enable Wiki for additional documentation

---

## 🐛 Troubleshooting

### Issue: Large Files

If you have large files (>100MB):

```bash
# Use Git LFS
git lfs install
git lfs track "*.png"
git lfs track "*.jpg"
git add .gitattributes
git commit -m "Add Git LFS"
```

### Issue: Authentication Failed

```bash
# Use Personal Access Token
# Or configure credential helper
git config --global credential.helper store
```

### Issue: Push Rejected

```bash
# Pull first
git pull origin main --rebase

# Then push
git push origin main
```

### Issue: Merge Conflicts

```bash
# View conflicts
git status

# Edit conflicted files
# Remove conflict markers (<<<<, ====, >>>>)

# Add resolved files
git add .

# Continue
git rebase --continue
# or
git merge --continue
```

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Repository visible at https://github.com/muzabasha/ml-alg
- [ ] All files pushed successfully
- [ ] README displays correctly
- [ ] Documentation files accessible
- [ ] Backend code visible
- [ ] Frontend code visible
- [ ] Algorithm content files present
- [ ] .gitignore working (no venv, node_modules, etc.)

---

## 📝 Repository Description

Use this for your GitHub repository:

**Description:**
```
Interactive web-based learning platform for Machine Learning algorithms. 
Features 5 complete algorithms with mathematical formulations, from-scratch 
implementations, and industry-standard API usage. Built with FastAPI, 
React, and Next.js.
```

**Topics:**
```
machine-learning
education
fastapi
react
nextjs
python
typescript
algorithms
data-science
teaching
```

---

## 🎯 Next Steps After GitHub Push

1. **Share Repository:**
   - Share link with students
   - Add to your academic profile
   - Include in publications

2. **Continuous Development:**
   - Add remaining 5 algorithms
   - Implement interactive features
   - Add user authentication

3. **Community:**
   - Accept contributions
   - Respond to issues
   - Update documentation

4. **Deployment:**
   - Deploy backend to Heroku/AWS
   - Deploy frontend to Vercel/Netlify
   - Set up CI/CD pipeline

---

## 📞 Support

**Git Issues:**
- Git documentation: https://git-scm.com/doc
- GitHub guides: https://guides.github.com/

**Deployment Issues:**
- Check QUICK_START.md
- Review error logs
- Test locally first

---

**Status:** Ready to Deploy
**Repository:** https://github.com/muzabasha/ml-alg
**Last Updated:** Current Session
