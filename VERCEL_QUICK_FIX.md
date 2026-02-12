# ⚡ Vercel 404 Error - Quick Fix

## 🎯 The Problem
Your Next.js app is in `frontend/` folder, but Vercel looks at the root.

## ✅ The Solution (3 Steps)

### Step 1: Files Already Fixed ✓
- ✅ `vercel.json` created at root
- ✅ `frontend/next.config.js` updated

### Step 2: Configure Vercel Dashboard

Go to: **Vercel Dashboard → Your Project → Settings → General**

Set these values:

| Setting | Value |
|---------|-------|
| **Framework Preset** | Next.js |
| **Root Directory** | `frontend` |
| **Build Command** | `npm run build` |
| **Output Directory** | `.next` |
| **Install Command** | `npm install` |

### Step 3: Redeploy

Click **"Redeploy"** button in Vercel dashboard.

---

## 🧪 Test After Deployment

Visit these URLs (replace with your domain):

- ✅ Homepage: `https://your-app.vercel.app`
- ✅ Instructor: `https://your-app.vercel.app/instructor`
- ✅ Algorithm: `https://your-app.vercel.app/algorithm/linear_regression`

---

## 🆘 Still Not Working?

### Check Build Logs
1. Go to Vercel Dashboard
2. Click on latest deployment
3. Check "Building" tab for errors

### Common Issues

**Issue**: "No package.json found"
**Fix**: Set Root Directory to `frontend` in dashboard

**Issue**: "Build failed"
**Fix**: Run `cd frontend && npm run build` locally to see errors

**Issue**: "404 on all pages"
**Fix**: Verify `frontend/src/pages/` has your page files

---

## 📋 Deployment Checklist

Before deploying:
- [ ] Changes pushed to GitHub
- [ ] Root Directory = `frontend` in Vercel
- [ ] Build succeeds locally
- [ ] All pages work locally

---

## 📚 Full Guide

For detailed explanation, see: `VERCEL_DEPLOYMENT_GUIDE.md`

---

**Quick Summary**: Your app is in a subfolder. Tell Vercel where to find it using the Root Directory setting.
