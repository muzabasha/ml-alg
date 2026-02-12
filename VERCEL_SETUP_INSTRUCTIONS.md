# 🚀 Vercel Deployment - Correct Setup Instructions

## ❌ Previous Error Explained

**Error**: `Command "cd frontend && npm install" exited with 1`

**Cause**: The `cd` command in `vercel.json` doesn't work in Vercel's build environment. Vercel needs to know the root directory through dashboard settings, not shell commands.

---

## ✅ CORRECT SOLUTION (No vercel.json needed)

### Step 1: Import Your Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import from GitHub: `https://github.com/muzabasha/ml-alg`

### Step 2: Configure Build Settings

**IMPORTANT**: Before clicking "Deploy", configure these settings:

#### Framework Preset
```
Next.js
```

#### Root Directory
```
frontend
```
⚠️ **This is the most important setting!** Click "Edit" next to Root Directory and type `frontend`

#### Build Command (leave default)
```
npm run build
```

#### Output Directory (leave default)
```
.next
```

#### Install Command (leave default)
```
npm install
```

### Step 3: Deploy

Click **"Deploy"** button and wait 2-3 minutes.

---

## 📸 Visual Guide

### Setting Root Directory

```
┌─────────────────────────────────────────┐
│ Configure Project                       │
├─────────────────────────────────────────┤
│                                         │
│ Framework Preset: Next.js               │
│                                         │
│ Root Directory: frontend    [Edit]     │  ← Click Edit and type "frontend"
│                                         │
│ Build Command: npm run build           │
│                                         │
│ Output Directory: .next                │
│                                         │
│ Install Command: npm install           │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🎯 Why This Works

### The Problem
Your project structure:
```
ml-alg/
├── frontend/          ← Next.js app is HERE
│   ├── package.json
│   ├── src/
│   └── public/
├── backend/
└── content/
```

### The Solution
By setting **Root Directory** to `frontend`, Vercel:
1. Changes into the `frontend/` directory
2. Runs `npm install` there (finds the correct package.json)
3. Runs `npm run build` there
4. Deploys the `.next` folder from there

### Why vercel.json Failed
- `cd` commands don't work in Vercel's build environment
- Vercel needs the root directory set through its configuration system
- Dashboard settings are the official way to handle monorepos

---

## 🔍 Troubleshooting

### If Build Still Fails

**Check Build Logs**:
1. Go to Vercel Dashboard
2. Click on your deployment
3. Click "Building" tab
4. Look for the actual error message

**Common Issues**:

#### Issue 1: "Cannot find module 'next'"
**Cause**: Root Directory not set to `frontend`  
**Fix**: Set Root Directory to `frontend` in project settings

#### Issue 2: "No package.json found"
**Cause**: Root Directory not set  
**Fix**: Set Root Directory to `frontend`

#### Issue 3: "Build failed with exit code 1"
**Cause**: TypeScript or build errors  
**Fix**: Run `cd frontend && npm run build` locally to see the actual error

#### Issue 4: Node version mismatch
**Cause**: Vercel using different Node version  
**Fix**: Add to `frontend/package.json`:
```json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

---

## 📋 Complete Deployment Checklist

### Before Deploying
- [x] All changes pushed to GitHub
- [x] `vercel.json` removed (not needed)
- [x] Build works locally: `cd frontend && npm run build`
- [x] All pages work locally: `cd frontend && npm start`

### During Deployment
- [ ] Import repository from GitHub
- [ ] Set Framework Preset to "Next.js"
- [ ] Set Root Directory to "frontend" ⚠️ CRITICAL
- [ ] Keep default build commands
- [ ] Click "Deploy"

### After Deployment
- [ ] Check build logs for errors
- [ ] Test homepage
- [ ] Test instructor page
- [ ] Test algorithm pages
- [ ] Test all 9 algorithms

---

## 🧪 Testing Your Deployment

After successful deployment, test these URLs:

### Core Pages
- ✅ Homepage: `https://your-app.vercel.app`
- ✅ Instructor: `https://your-app.vercel.app/instructor`

### Classical ML Algorithms
- ✅ Linear Regression: `https://your-app.vercel.app/algorithm/linear_regression`
- ✅ Logistic Regression: `https://your-app.vercel.app/algorithm/logistic_regression`
- ✅ KNN: `https://your-app.vercel.app/algorithm/knn`
- ✅ Decision Tree: `https://your-app.vercel.app/algorithm/decision_tree`
- ✅ SVM: `https://your-app.vercel.app/algorithm/svm`

### Deep Learning Algorithms
- ✅ ANN: `https://your-app.vercel.app/algorithm/ann`
- ✅ CNN: `https://your-app.vercel.app/algorithm/cnn`
- ✅ RNN: `https://your-app.vercel.app/algorithm/rnn`
- ✅ Transformer: `https://your-app.vercel.app/algorithm/transformer`

---

## 🔄 If You Need to Redeploy

### Method 1: Push New Commit
```bash
git add .
git commit -m "Update"
git push origin main
```
Vercel auto-deploys on push.

### Method 2: Manual Redeploy
1. Go to Vercel Dashboard
2. Click on your project
3. Click "Deployments" tab
4. Click "..." on latest deployment
5. Click "Redeploy"

---

## ⚙️ Project Settings (After First Deploy)

You can change settings anytime:

1. Go to Vercel Dashboard
2. Click your project
3. Click "Settings"
4. Click "General"
5. Scroll to "Build & Development Settings"
6. Edit Root Directory if needed

---

## 🎓 Key Learnings

### What We Learned
1. **Vercel doesn't support `cd` in build commands**
2. **Root Directory must be set in dashboard, not in commands**
3. **vercel.json is optional for simple monorepos**
4. **Dashboard configuration is more reliable than vercel.json for root directory**

### Best Practices
- ✅ Use dashboard settings for root directory
- ✅ Keep build commands simple (no `cd`)
- ✅ Test builds locally before deploying
- ✅ Check build logs for detailed errors
- ❌ Don't use shell commands in vercel.json
- ❌ Don't use `cd` in build commands

---

## 📚 Additional Resources

- [Vercel Monorepo Guide](https://vercel.com/docs/concepts/monorepos)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Vercel Build Configuration](https://vercel.com/docs/build-step)

---

## 🆘 Still Having Issues?

### Get Build Logs
1. Vercel Dashboard → Your Project
2. Click latest deployment
3. Click "Building" tab
4. Copy the error message
5. Share it for specific help

### Common Error Patterns

**"ENOENT: no such file or directory"**
→ Root Directory not set correctly

**"Cannot find module"**
→ Dependencies not installed (Root Directory issue)

**"Build failed"**
→ Check local build first: `cd frontend && npm run build`

---

## ✅ Summary

**The Fix**: 
1. Delete `vercel.json` (done)
2. Set Root Directory to `frontend` in Vercel dashboard
3. Deploy

**Why It Works**:
- Vercel changes to `frontend/` directory first
- Then runs all commands from there
- No need for `cd` commands

**Repository**: https://github.com/muzabasha/ml-alg  
**Root Directory**: `frontend`  
**Framework**: Next.js  

---

**Ready to Deploy!** 🚀

Just remember: **Set Root Directory to `frontend`** in the Vercel dashboard before clicking Deploy.
