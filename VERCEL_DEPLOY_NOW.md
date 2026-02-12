# ⚡ Deploy to Vercel - Simple Steps

## 🎯 The Fix for "npm install exited with 1" Error

**Problem**: `vercel.json` was using `cd` commands that don't work in Vercel.  
**Solution**: Use Vercel dashboard settings instead (no vercel.json needed).

---

## 🚀 3 Simple Steps to Deploy

### Step 1: Import Repository

1. Go to: https://vercel.com/new
2. Click **"Import Git Repository"**
3. Paste: `https://github.com/muzabasha/ml-alg`
4. Click **"Import"**

### Step 2: Configure Settings (CRITICAL!)

Before clicking "Deploy", you'll see a configuration screen.

**⚠️ IMPORTANT: Click "Edit" next to "Root Directory"**

Set these values:

```
Framework Preset:    Next.js
Root Directory:      frontend    ← TYPE THIS!
Build Command:       npm run build
Output Directory:    .next
Install Command:     npm install
```

### Step 3: Deploy

Click the blue **"Deploy"** button.

Wait 2-3 minutes. Done! ✅

---

## 📸 What You Should See

### Configuration Screen

```
┌──────────────────────────────────────────────┐
│  Configure Project                           │
├──────────────────────────────────────────────┤
│                                              │
│  Framework Preset                            │
│  ┌────────────────────────────────────────┐ │
│  │ Next.js                          ▼     │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  Root Directory                              │
│  ┌────────────────────────────────────────┐ │
│  │ frontend                         [Edit]│ │ ← CLICK EDIT!
│  └────────────────────────────────────────┘ │
│                                              │
│  Build Command                               │
│  ┌────────────────────────────────────────┐ │
│  │ npm run build                          │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  Output Directory                            │
│  ┌────────────────────────────────────────┐ │
│  │ .next                                  │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  Install Command                             │
│  ┌────────────────────────────────────────┐ │
│  │ npm install                            │ │
│  └────────────────────────────────────────┘ │
│                                              │
│                                              │
│              [Deploy]                        │
│                                              │
└──────────────────────────────────────────────┘
```

---

## ✅ After Deployment

You'll get a URL like: `https://ml-alg.vercel.app`

Test these pages:

- Homepage: `https://your-app.vercel.app`
- Instructor: `https://your-app.vercel.app/instructor`
- Any algorithm: `https://your-app.vercel.app/algorithm/linear_regression`

---

## 🆘 If It Still Fails

### Check the Error

1. Click on the failed deployment
2. Click "Building" tab
3. Look for the error message

### Common Fixes

**Error: "Cannot find module 'next'"**
→ You forgot to set Root Directory to `frontend`

**Error: "No package.json found"**
→ You forgot to set Root Directory to `frontend`

**Error: Build failed**
→ Test locally first: `cd frontend && npm run build`

---

## 🔑 The Key Point

**Root Directory MUST be set to `frontend`**

This tells Vercel:
- Your Next.js app is in the `frontend/` folder
- Run all commands from that folder
- Look for `package.json` there

Without this setting, Vercel looks at the root and finds no Next.js app → Error!

---

## 📋 Quick Checklist

- [ ] Go to https://vercel.com/new
- [ ] Import: `https://github.com/muzabasha/ml-alg`
- [ ] Set Framework to "Next.js"
- [ ] Set Root Directory to "frontend" ⚠️
- [ ] Click "Deploy"
- [ ] Wait 2-3 minutes
- [ ] Test your site!

---

## 🎉 That's It!

Your ML Learning Platform with 9 algorithms will be live on Vercel!

**Repository**: https://github.com/muzabasha/ml-alg  
**Root Directory**: `frontend` (don't forget this!)  
**Framework**: Next.js

---

**Need more help?** Check `VERCEL_SETUP_INSTRUCTIONS.md` for detailed troubleshooting.
