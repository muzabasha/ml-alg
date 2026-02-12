# 🔧 Troubleshooting Guide

## Issue: Frontend shows "Page not found" or won't load

### Solution 1: Setup Frontend First

Run this command:
```
SETUP_FRONTEND.bat
```

This will install all necessary dependencies.

### Solution 2: Manual Setup

```bash
cd frontend
npm install
npm run dev
```

### Solution 3: Check if Node.js is installed

```bash
node --version
npm --version
```

If not installed, download from: https://nodejs.org/

---

## Issue: Backend not responding

### Check if backend is running:
Visit: http://localhost:8000/health

### Start backend manually:
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app/main.py
```

---

## Issue: Port already in use

### Kill process on port 8000 (Backend):
```bash
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Kill process on port 3000 (Frontend):
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

## Issue: npm install fails

### Try with legacy peer deps:
```bash
cd frontend
npm install --legacy-peer-deps
```

### Clear cache and retry:
```bash
npm cache clean --force
npm install
```

---

## Issue: Python module not found

### Reinstall dependencies:
```bash
cd backend
venv\Scripts\activate
pip install --upgrade pip
pip install -r requirements.txt
```

---

## Issue: Virtual environment activation fails

### Windows:
```bash
cd backend
venv\Scripts\activate
```

### If that fails, try:
```bash
python -m venv venv --clear
venv\Scripts\activate
```

---

## Complete Reset

If nothing works, try a complete reset:

### 1. Delete these folders:
- `backend/venv/`
- `frontend/node_modules/`
- `frontend/.next/`

### 2. Run setup again:
```bash
# Backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

# Frontend
cd frontend
npm install
```

### 3. Start servers:
```bash
# Terminal 1
cd backend
venv\Scripts\activate
python app/main.py

# Terminal 2
cd frontend
npm run dev
```

---

## Check System Requirements

### Python:
```bash
python --version
```
Need: 3.8 or higher

### Node.js:
```bash
node --version
```
Need: 16 or higher

### npm:
```bash
npm --version
```
Need: 8 or higher

---

## Still Having Issues?

1. Check error messages in terminal
2. Look for red text in server windows
3. Check browser console (F12)
4. Verify internet connection
5. Try restarting computer

---

## Quick Diagnostic

Run these commands to check status:

```bash
# Check Python
python --version

# Check Node
node --version

# Check if backend dependencies installed
cd backend
venv\Scripts\activate
pip list

# Check if frontend dependencies installed
cd frontend
dir node_modules
```

---

## Contact for Help

If you're still stuck:
1. Note the exact error message
2. Check which step failed
3. Review the error logs
4. Try the complete reset above

---

**Most common fix: Run SETUP_FRONTEND.bat first!**
