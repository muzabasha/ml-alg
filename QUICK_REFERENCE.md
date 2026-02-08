# 🚀 Quick Reference Card

## ⚡ Start Development (Every Time)

### Terminal 1 - Backend
```bash
cd backend
venv\Scripts\activate          # Windows
# source venv/bin/activate     # Mac/Linux
python app/main.py
```
**URL:** http://localhost:8000

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```
**URL:** http://localhost:3000

---

## 📦 First Time Setup Only

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

### Frontend
```bash
cd frontend
npm install
```

### Profile Image
Copy `DP_profile.png` to `frontend/public/`

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
venv\Scripts\activate
python test_api.py
```

### Manual Tests
- http://localhost:8000/health
- http://localhost:8000/docs
- http://localhost:3000
- http://localhost:3000/instructor

---

## 📤 Push to GitHub

### First Time
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/muzabasha/ml-alg.git
git branch -M main
git push -u origin main
```

### Regular Updates
```bash
git add .
git commit -m "Your message"
git push origin main
```

---

## 🔗 Important URLs

### Local Development
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs
- Frontend: http://localhost:3000
- Instructor: http://localhost:3000/instructor

### GitHub
- Repository: https://github.com/muzabasha/ml-alg
- Settings: https://github.com/muzabasha/ml-alg/settings

---

## 🛠️ Common Commands

### Stop Servers
Press `Ctrl + C` in each terminal

### Deactivate venv
```bash
deactivate
```

### Check Git Status
```bash
git status
```

### View Logs
```bash
# Backend logs in terminal
# Frontend logs in terminal
```

---

## 🐛 Quick Fixes

### Port in Use
```bash
# Kill process on port 8000
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Module Not Found
```bash
pip install -r requirements.txt
```

### npm Errors
```bash
npm install --legacy-peer-deps
```

---

## 📁 Key Files

### Documentation
- `README.md` - Project overview
- `QUICK_START.md` - Setup guide
- `LOCAL_HOSTING_GUIDE.md` - Detailed hosting
- `DEPLOYMENT_GUIDE.md` - GitHub deployment

### Code
- `backend/app/main.py` - Backend entry
- `backend/test_api.py` - Tests
- `frontend/src/pages/instructor.tsx` - Instructor page
- `frontend/src/components/InstructorProfile.tsx` - Profile component

### Content
- `content/algorithms/*.json` - Algorithm files

---

## ✅ Daily Checklist

- [ ] Start backend (Terminal 1)
- [ ] Start frontend (Terminal 2)
- [ ] Test http://localhost:8000/health
- [ ] Test http://localhost:3000
- [ ] Make changes
- [ ] Test changes
- [ ] Commit to Git
- [ ] Push to GitHub

---

## 🎯 Project Stats

- **Algorithms**: 5/10 complete (50%)
- **Backend**: 9 API endpoints
- **Frontend**: 6 components
- **Documentation**: 20+ files
- **Lines of Code**: 8,500+
- **Status**: 72% complete

---

## 📞 Quick Help

**Issue?** Check:
1. `LOCAL_HOSTING_GUIDE.md` - Detailed steps
2. `DEPLOYMENT_GUIDE.md` - GitHub help
3. `QUICK_START.md` - Setup issues
4. Terminal error messages

**GitHub:** https://github.com/muzabasha/ml-alg
**Email:** muzamilbasha.s@reva.edu.in

---

**Print this page for quick reference!** 📄
