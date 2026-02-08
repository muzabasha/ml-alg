# 🖥️ Local Hosting Guide - Step by Step

## 📋 Quick Start Commands

### Windows Users

**Terminal 1 (Backend):**
```cmd
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app/main.py
```

**Terminal 2 (Frontend):**
```cmd
cd frontend
npm install
npm run dev
```

### Mac/Linux Users

**Terminal 1 (Backend):**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app/main.py
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm install
npm run dev
```

---

## 🎯 Detailed Step-by-Step Guide

### Part 1: Backend Setup (5 minutes)

#### Step 1.1: Open Terminal/Command Prompt

**Windows:**
- Press `Win + R`
- Type `cmd` and press Enter

**Mac:**
- Press `Cmd + Space`
- Type `Terminal` and press Enter

#### Step 1.2: Navigate to Project

```bash
# Replace with your actual path
cd "D:\Contribution_REVA_2026\GKVK Training Program\Hands_On\ml-alg"
```

#### Step 1.3: Go to Backend Directory

```bash
cd backend
```

#### Step 1.4: Create Virtual Environment

**Windows:**
```cmd
python -m venv venv
```

**Mac/Linux:**
```bash
python3 -m venv venv
```

**Expected:** A `venv` folder is created

#### Step 1.5: Activate Virtual Environment

**Windows:**
```cmd
venv\Scripts\activate
```

**Mac/Linux:**
```bash
source venv/bin/activate
```

**Expected:** Your prompt shows `(venv)` at the beginning

#### Step 1.6: Install Dependencies

```bash
pip install -r requirements.txt
```

**Expected Output:**
```
Collecting fastapi==0.104.1
Collecting uvicorn[standard]==0.24.0
...
Successfully installed fastapi-0.104.1 uvicorn-0.24.0 ...
```

**Time:** ~2-3 minutes

#### Step 1.7: Start Backend Server

```bash
python app/main.py
```

**Expected Output:**
```
INFO:     Started server process [12345]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

#### Step 1.8: Test Backend

**Open browser and visit:**
- Health check: http://localhost:8000/health
- API docs: http://localhost:8000/docs
- Algorithm list: http://localhost:8000/api/algorithms/list

**Expected:** JSON responses showing the API is working

**✅ Backend is now running!** Keep this terminal open.

---

### Part 2: Frontend Setup (5 minutes)

#### Step 2.1: Open New Terminal

**Important:** Don't close the backend terminal!

Open a **second** terminal/command prompt.

#### Step 2.2: Navigate to Project

```bash
cd "D:\Contribution_REVA_2026\GKVK Training Program\Hands_On\ml-alg"
```

#### Step 2.3: Go to Frontend Directory

```bash
cd frontend
```

#### Step 2.4: Install Node Dependencies

```bash
npm install
```

**Expected Output:**
```
added 500 packages in 45s
```

**Time:** ~2-3 minutes (first time only)

**Note:** If you get errors, try:
```bash
npm install --legacy-peer-deps
```

#### Step 2.5: Start Development Server

```bash
npm run dev
```

**Expected Output:**
```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
event - compiled client and server successfully
```

#### Step 2.6: Test Frontend

**Open browser and visit:**
- Home page: http://localhost:3000
- Instructor profile: http://localhost:3000/instructor
- Algorithm page: http://localhost:3000/algorithm/linear_regression

**✅ Frontend is now running!** Keep this terminal open too.

---

### Part 3: Add Profile Image

#### Step 3.1: Locate Image

Find your `DP_profile.png` file

#### Step 3.2: Copy to Public Folder

**Windows:**
```cmd
copy "path\to\DP_profile.png" "frontend\public\DP_profile.png"
```

**Mac/Linux:**
```bash
cp /path/to/DP_profile.png frontend/public/DP_profile.png
```

**Or manually:**
1. Open `frontend/public/` folder
2. Paste `DP_profile.png` there

#### Step 3.3: Verify

Visit: http://localhost:3000/instructor

**Expected:** Profile image displays correctly

---

### Part 4: Testing (5 minutes)

#### Test 4.1: Backend API Tests

**Open a third terminal:**

```bash
cd backend
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux
python test_api.py
```

**Expected Output:**
```
🔍 Testing health check...
✅ Health check passed!

🔍 Testing algorithm list...
✅ Algorithm list passed!

...

✅ ALL TESTS PASSED!
```

#### Test 4.2: Manual Testing

**Test these URLs in browser:**

1. **Backend:**
   - http://localhost:8000/health ✓
   - http://localhost:8000/docs ✓
   - http://localhost:8000/api/algorithms/list ✓

2. **Frontend:**
   - http://localhost:3000 ✓
   - http://localhost:3000/instructor ✓
   - http://localhost:3000/algorithm/linear_regression ✓

3. **Code Execution:**
   - Go to algorithm page
   - Click "Execute" on code example
   - Verify output displays

**✅ All tests passing? Ready for GitHub!**

---

## 🚀 Part 5: Push to GitHub

### Step 5.1: Verify Git Installation

```bash
git --version
```

**Expected:** `git version 2.x.x`

**If not installed:**
- Windows: Download from https://git-scm.com/
- Mac: `brew install git`
- Linux: `sudo apt-get install git`

### Step 5.2: Configure Git (First Time Only)

```bash
git config --global user.name "Dr. Syed Muzamil Basha"
git config --global user.email "muzamilbasha.s@reva.edu.in"
```

### Step 5.3: Run Setup Script

**Windows:**
```cmd
setup_github.bat
```

**Mac/Linux:**
```bash
chmod +x setup_github.sh
./setup_github.sh
```

**Or manually:**

```bash
# Initialize repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: ML Learning Platform with 5 algorithms and instructor profile"

# Add remote
git remote add origin https://github.com/muzabasha/ml-alg.git

# Rename branch to main
git branch -M main
```

### Step 5.4: Create GitHub Repository

1. Go to https://github.com/muzabasha
2. Click "New repository" (green button)
3. Repository name: `ml-alg`
4. Description: "Interactive ML Learning Platform for Engineering Students"
5. **Public** repository
6. **DO NOT** check "Initialize with README"
7. Click "Create repository"

### Step 5.5: Push to GitHub

```bash
git push -u origin main
```

**You'll be prompted for:**
- Username: `muzabasha`
- Password: Your Personal Access Token (not your GitHub password!)

**To create Personal Access Token:**
1. GitHub → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token
4. Select scope: `repo` (full control)
5. Generate token
6. Copy and save it (you won't see it again!)
7. Use as password when pushing

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

### Step 5.6: Verify on GitHub

Visit: https://github.com/muzabasha/ml-alg

**You should see:**
- All your files
- README.md displayed
- Documentation files
- Backend and frontend folders
- Algorithm content

**✅ Successfully pushed to GitHub!**

---

## 📊 What You Now Have

### Local Development Environment
- ✅ Backend running on http://localhost:8000
- ✅ Frontend running on http://localhost:3000
- ✅ All 5 algorithms accessible
- ✅ Instructor profile working
- ✅ API documentation available

### GitHub Repository
- ✅ Code hosted at https://github.com/muzabasha/ml-alg
- ✅ Version controlled
- ✅ Shareable with students
- ✅ Ready for collaboration
- ✅ Backup of all work

---

## 🔄 Daily Workflow

### Starting Work

**Terminal 1 (Backend):**
```bash
cd backend
venv\Scripts\activate
python app/main.py
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

### Making Changes

1. Edit files in your IDE
2. Save changes
3. Browser auto-refreshes (frontend)
4. Backend auto-reloads (if using --reload flag)

### Committing Changes

```bash
# Check what changed
git status

# Add changes
git add .

# Commit with message
git commit -m "Add Naive Bayes algorithm"

# Push to GitHub
git push origin main
```

### Stopping Servers

**In each terminal:**
- Press `Ctrl + C`
- Type `deactivate` (to exit venv)

---

## 🐛 Common Issues & Solutions

### Issue 1: Port Already in Use

**Error:** `Address already in use: 8000`

**Solution:**
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:8000 | xargs kill -9
```

### Issue 2: Module Not Found

**Error:** `ModuleNotFoundError: No module named 'fastapi'`

**Solution:**
```bash
# Make sure venv is activated
pip install -r requirements.txt
```

### Issue 3: npm Install Fails

**Error:** `npm ERR! code ERESOLVE`

**Solution:**
```bash
npm install --legacy-peer-deps
```

### Issue 4: Git Push Fails

**Error:** `Authentication failed`

**Solution:**
- Use Personal Access Token, not password
- Or set up SSH key (see DEPLOYMENT_GUIDE.md)

### Issue 5: Image Not Loading

**Error:** Profile image doesn't show

**Solution:**
- Verify file is at `frontend/public/DP_profile.png`
- Check filename matches exactly (case-sensitive)
- Restart frontend server

---

## ✅ Success Checklist

- [ ] Backend running on port 8000
- [ ] Frontend running on port 3000
- [ ] Health check returns success
- [ ] API docs accessible
- [ ] Algorithm list loads
- [ ] Instructor profile displays
- [ ] Profile image shows
- [ ] Code execution works
- [ ] All tests pass
- [ ] Git repository initialized
- [ ] Pushed to GitHub successfully
- [ ] Repository visible online

---

## 📞 Need Help?

**Check these files:**
- `QUICK_START.md` - Quick setup guide
- `DEPLOYMENT_GUIDE.md` - Detailed deployment
- `README.md` - Project overview
- `backend/test_api.py` - Run tests

**Common Commands:**
```bash
# Backend
cd backend
venv\Scripts\activate
python app/main.py

# Frontend
cd frontend
npm run dev

# Tests
python test_api.py

# Git
git status
git add .
git commit -m "message"
git push origin main
```

---

## 🎉 Congratulations!

You now have:
- ✅ Local development environment running
- ✅ Code hosted on GitHub
- ✅ Professional ML learning platform
- ✅ 5 complete algorithms
- ✅ Instructor profile
- ✅ Comprehensive documentation

**Next Steps:**
1. Share GitHub link with students
2. Add remaining 5 algorithms
3. Implement interactive features
4. Deploy to production

**Your Repository:**
https://github.com/muzabasha/ml-alg

**Happy Teaching! 🎓**
