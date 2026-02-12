# 🚀 Vercel Deployment Guide - Complete Solution

## ❌ The Problem: 404 NOT_FOUND Error

You're getting a 404 error because Vercel doesn't know where your Next.js app is located. Your project has a **monorepo structure** (frontend in a subfolder), but Vercel expects the Next.js app at the root.

---

## ✅ 1. THE FIX - Step by Step

### Option A: Using vercel.json (Recommended for Monorepo)

I've created a `vercel.json` file at the root that tells Vercel:
- Where to find your Next.js app (`frontend/` folder)
- How to build it
- How to route requests

**What was changed:**
1. Created `vercel.json` with proper configuration
2. Updated `frontend/next.config.js` to remove `output: 'standalone'` (conflicts with Vercel)

### Option B: Restructure Project (Alternative)

If you prefer, you can move everything from `frontend/` to the root:
```bash
# Move all frontend files to root
mv frontend/* .
mv frontend/.* . 2>/dev/null
rmdir frontend
```

---

## 📋 2. DEPLOYMENT STEPS

### Step 1: Commit Changes
```bash
git add vercel.json frontend/next.config.js
git commit -m "Fix Vercel deployment configuration"
git push origin main
```

### Step 2: Configure Vercel Project

Go to your Vercel dashboard and update these settings:

**Framework Preset**: Next.js

**Root Directory**: `frontend`

**Build Command**: 
```bash
npm run build
```

**Output Directory**: 
```
.next
```

**Install Command**:
```bash
npm install
```

### Step 3: Environment Variables (if needed)

Add any environment variables in Vercel dashboard:
- Go to Project Settings → Environment Variables
- Add variables if your app needs them

### Step 4: Redeploy

Click "Redeploy" in Vercel dashboard or push a new commit.

---

## 🧠 3. ROOT CAUSE EXPLANATION

### What Was Happening:

**Your Code Structure:**
```
ml-alg/
├── frontend/          ← Next.js app is HERE
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/
└── content/
```

**What Vercel Expected:**
```
ml-alg/
├── src/              ← Next.js app at ROOT
├── public/
└── package.json
```

### Why It Failed:

1. **Vercel's Default Behavior**: Looks for `package.json` and Next.js files at the repository root
2. **Your Structure**: Next.js app is in `frontend/` subfolder
3. **Result**: Vercel couldn't find the app → 404 error

### The Misconception:

Many developers assume Vercel automatically detects subfolder projects. It doesn't. You must explicitly tell Vercel where your app lives using:
- `vercel.json` configuration, OR
- Vercel dashboard "Root Directory" setting

---

## 📚 4. UNDERLYING CONCEPTS

### Why Does This Error Exist?

**Purpose**: Vercel needs to know:
- Where is the buildable application?
- What framework is being used?
- How to route incoming requests?

**Protection**: Prevents Vercel from:
- Building the wrong folder
- Serving incorrect files
- Wasting build time on non-app directories

### The Correct Mental Model:

Think of Vercel deployment in 3 phases:

**Phase 1: Discovery**
- Vercel scans the repository
- Looks for framework indicators (`package.json`, `next.config.js`)
- Determines what to build

**Phase 2: Build**
- Runs install command
- Runs build command
- Generates production files

**Phase 3: Serve**
- Routes requests to built files
- Handles dynamic routes
- Serves static assets

**Your Issue**: Phase 1 failed because Vercel couldn't find the Next.js app.

### How This Fits Into Next.js/Vercel Design:

**Next.js Philosophy**: Convention over configuration
- Expects specific file structure
- Looks for pages in `pages/` or `src/pages/`
- Looks for config at root

**Vercel Philosophy**: Zero-config deployment
- Auto-detects frameworks
- But requires explicit config for non-standard structures

**Your Case**: Non-standard structure (monorepo) requires explicit configuration.

---

## ⚠️ 5. WARNING SIGNS - Recognize This Pattern

### Signs You'll Hit This Issue:

✅ **Project Structure Indicators:**
- Next.js app in a subfolder (not root)
- Monorepo with multiple apps
- Separate `frontend/` and `backend/` folders
- Multiple `package.json` files

✅ **Deployment Indicators:**
- Build succeeds but app shows 404
- Vercel says "No framework detected"
- Build logs show "No package.json found"
- Routes work locally but not on Vercel

### Similar Mistakes to Watch For:

1. **Wrong Root Directory**: Setting root to `src/` instead of `frontend/`
2. **Missing Build Output**: Forgetting to specify output directory
3. **Incorrect Rewrites**: Routing rules that don't match your structure
4. **Environment Variables**: Not setting them in Vercel dashboard

### Code Smells:

```javascript
// ❌ BAD: output: 'standalone' conflicts with Vercel
const nextConfig = {
  output: 'standalone',  // Remove this for Vercel
}

// ✅ GOOD: Let Vercel handle output
const nextConfig = {
  // No output specified
}
```

---

## 🔄 6. ALTERNATIVE APPROACHES

### Approach 1: vercel.json (Current Solution)

**Pros:**
- ✅ Keeps monorepo structure
- ✅ Clear configuration in code
- ✅ Version controlled
- ✅ Works with multiple apps

**Cons:**
- ❌ Extra configuration file
- ❌ Must maintain rewrites

**When to Use**: Monorepo with multiple apps (frontend, backend, etc.)

### Approach 2: Root Directory Setting (Dashboard)

**Pros:**
- ✅ No code changes needed
- ✅ Simple configuration
- ✅ UI-based setup

**Cons:**
- ❌ Not version controlled
- ❌ Must configure per deployment
- ❌ Team members might miss it

**When to Use**: Single Next.js app in subfolder, no other apps

### Approach 3: Restructure to Root

**Pros:**
- ✅ Zero configuration
- ✅ Follows Next.js conventions
- ✅ Simplest deployment

**Cons:**
- ❌ Loses monorepo structure
- ❌ Harder to separate concerns
- ❌ Backend must be separate repo

**When to Use**: Frontend-only project, no backend needed

### Approach 4: Vercel Monorepo (Advanced)

**Pros:**
- ✅ Multiple apps in one repo
- ✅ Shared dependencies
- ✅ Proper monorepo tooling

**Cons:**
- ❌ Complex setup
- ❌ Requires Turborepo or similar
- ❌ Steeper learning curve

**When to Use**: Large projects with multiple related apps

---

## 🎯 RECOMMENDED SOLUTION FOR YOUR PROJECT

Given your structure (frontend + backend + content), I recommend:

**Use vercel.json (Already Created)**

This approach:
- ✅ Keeps your clean folder structure
- ✅ Allows backend to stay in repo (for reference)
- ✅ Makes deployment explicit and clear
- ✅ Easy for team members to understand

---

## 🧪 TESTING YOUR DEPLOYMENT

### Before Pushing:

```bash
# Test build locally
cd frontend
npm run build
npm start

# Visit http://localhost:3000
# Verify all pages work
```

### After Deploying:

1. **Homepage**: `https://your-app.vercel.app`
2. **Instructor**: `https://your-app.vercel.app/instructor`
3. **Algorithms**: `https://your-app.vercel.app/algorithm/linear_regression`

### Common Issues After Deploy:

**Issue**: Images don't load
**Fix**: Check `public/` folder is in `frontend/public/`

**Issue**: API routes fail
**Fix**: Ensure API routes are in `frontend/src/pages/api/`

**Issue**: 404 on refresh
**Fix**: Already handled by Next.js automatic routing

---

## 📝 CHECKLIST

Before deploying, ensure:

- [ ] `vercel.json` exists at root
- [ ] `frontend/next.config.js` doesn't have `output: 'standalone'`
- [ ] All JSON files are in `frontend/public/data/`
- [ ] Images are in `frontend/public/`
- [ ] Build succeeds locally: `cd frontend && npm run build`
- [ ] All pages work locally: `npm start`
- [ ] Changes committed and pushed to GitHub
- [ ] Vercel project connected to GitHub repo
- [ ] Root directory set to `frontend` in Vercel dashboard (if not using vercel.json)

---

## 🆘 TROUBLESHOOTING

### Still Getting 404?

1. **Check Vercel Build Logs**:
   - Go to Vercel Dashboard → Deployments → Click latest deployment
   - Check "Building" tab for errors

2. **Verify Root Directory**:
   - Vercel Dashboard → Settings → General
   - Root Directory should be `frontend`

3. **Check Build Output**:
   - Should see `.next` folder created
   - Should see "Compiled successfully" message

4. **Verify Routes**:
   - Check `frontend/src/pages/` has all your pages
   - Ensure `[id].tsx` is in `frontend/src/pages/algorithm/`

### Build Fails?

```bash
# Clear cache and rebuild
cd frontend
rm -rf .next node_modules
npm install
npm run build
```

### Environment Issues?

- Check Node.js version: Vercel uses Node 18 by default
- Verify all dependencies are in `package.json`
- Ensure no local-only dependencies

---

## 🎓 KEY TAKEAWAYS

1. **Vercel needs explicit configuration for non-standard structures**
2. **Monorepos require `vercel.json` or dashboard settings**
3. **Always test builds locally before deploying**
4. **Check Vercel build logs for detailed error messages**
5. **Keep configuration in version control when possible**

---

## 📚 FURTHER READING

- [Vercel Monorepo Documentation](https://vercel.com/docs/concepts/monorepos)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vercel Configuration Reference](https://vercel.com/docs/project-configuration)

---

**Last Updated**: February 12, 2026
**Status**: Ready to Deploy 🚀
