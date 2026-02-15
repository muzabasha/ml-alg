# Deployment Instructions

## Prerequisites
- Node.js 18+ installed
- Python 3.9+ installed (for backend)
- GitHub account
- Vercel account

## Project Structure
```
├── frontend/          # Next.js frontend application
├── backend/           # FastAPI backend application
└── content/          # Algorithm content JSON files
```

## Frontend Deployment (Vercel)

### 1. Push to GitHub
```bash
git add .
git commit -m "Add student learning path feature"
git push origin main
```

### 2. Deploy to Vercel

#### Option A: Vercel CLI
```bash
cd frontend
npm install -g vercel
vercel login
vercel --prod
```

#### Option B: Vercel Dashboard
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

4. Click "Deploy"

### 3. Environment Variables (Optional)
If you need to configure the backend API URL:
- Add environment variable in Vercel dashboard:
  - `NEXT_PUBLIC_API_URL`: Your backend API URL

## Backend Deployment

### Option 1: Vercel (Serverless)
1. Create `vercel.json` in backend directory:
```json
{
  "builds": [
    {
      "src": "app/main.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "app/main.py"
    }
  ]
}
```

2. Deploy:
```bash
cd backend
vercel --prod
```

### Option 2: Railway
1. Go to https://railway.app
2. Create new project from GitHub repo
3. Select backend directory
4. Railway will auto-detect Python and deploy

### Option 3: Render
1. Go to https://render.com
2. Create new Web Service
3. Connect GitHub repository
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

## Local Development

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Access at: http://localhost:3000

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
Access at: http://localhost:8000

## Testing Before Deployment

### 1. Build Test
```bash
cd frontend
npm run build
npm start
```

### 2. Type Check
```bash
cd frontend
npm run type-check  # or: npx tsc --noEmit
```

### 3. Backend Test
```bash
cd backend
python -m pytest  # if tests exist
# or manually test endpoints:
curl http://localhost:8000/health
```

## Post-Deployment Verification

### Frontend Checks
- [ ] Homepage loads correctly
- [ ] Dashboard displays without errors
- [ ] Algorithm pages render properly
- [ ] Progress tracking works
- [ ] Onboarding modal appears for new users

### Backend Checks
- [ ] Health endpoint responds: `/health`
- [ ] Progress endpoints work: `/api/learning-path/progress/load/{student_id}`
- [ ] CORS is configured correctly

## Troubleshooting

### Build Errors
- Check Node.js version (should be 18+)
- Clear cache: `rm -rf .next node_modules && npm install`
- Check for TypeScript errors: `npx tsc --noEmit`

### Runtime Errors
- Check browser console for errors
- Verify API endpoints are accessible
- Check CORS configuration in backend

### Performance Issues
- Enable Next.js image optimization
- Check bundle size: `npm run build` shows size analysis
- Consider adding CDN for static assets

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (.env)
```
CORS_ORIGINS=http://localhost:3000,https://your-frontend.vercel.app
DATABASE_URL=your_database_url  # if using database
```

## Monitoring

### Vercel Analytics
- Enable in Vercel dashboard under project settings
- Provides performance metrics and error tracking

### Backend Monitoring
- Consider adding Sentry for error tracking
- Use Vercel logs or Railway logs for debugging

## Rollback
If deployment fails:
```bash
vercel rollback  # Vercel CLI
# or use Vercel dashboard to rollback to previous deployment
```

## Support
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- FastAPI Docs: https://fastapi.tiangolo.com
