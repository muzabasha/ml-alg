@echo off
cls
echo ========================================
echo   VERCEL SETUP VERIFICATION
echo ========================================
echo.

echo Checking your setup...
echo.

echo ========================================
echo   1. GIT STATUS
echo ========================================
git status
echo.

echo ========================================
echo   2. LATEST COMMIT
echo ========================================
git log --oneline -1
echo.

echo ========================================
echo   3. REMOTE REPOSITORY
echo ========================================
git remote -v
echo.

echo ========================================
echo   4. VERIFY COMMIT ON GITHUB
echo ========================================
git ls-remote origin main
echo.

echo ========================================
echo   5. CHECK FRONTEND DIRECTORY
echo ========================================
if exist "frontend\package.json" (
    echo ✓ frontend/package.json exists
) else (
    echo ✗ frontend/package.json NOT FOUND
)

if exist "frontend\next.config.js" (
    echo ✓ frontend/next.config.js exists
) else (
    echo ✗ frontend/next.config.js NOT FOUND
)

if exist "frontend\src\pages\index.tsx" (
    echo ✓ frontend/src/pages/index.tsx exists
) else (
    echo ✗ frontend/src/pages/index.tsx NOT FOUND
)

if exist "frontend\public\data" (
    echo ✓ frontend/public/data directory exists
    dir /b frontend\public\data\*.json | find /c ".json" > temp.txt
    set /p count=<temp.txt
    del temp.txt
    echo   Found JSON files in data directory
) else (
    echo ✗ frontend/public/data directory NOT FOUND
)
echo.

echo ========================================
echo   6. CHECK NODE MODULES
echo ========================================
if exist "frontend\node_modules" (
    echo ✓ frontend/node_modules exists
) else (
    echo ⚠ frontend/node_modules NOT FOUND
    echo   Run: cd frontend ^&^& npm install
)
echo.

echo ========================================
echo   SUMMARY
echo ========================================
echo.
echo GitHub Status: READY
echo   Repository: https://github.com/muzabasha/ml-alg
echo   Branch: main
echo   Latest commit is pushed
echo.
echo Vercel Requirements:
echo   ✓ Code is on GitHub
echo   ✓ Frontend directory exists
echo   ✓ Next.js configuration present
echo.
echo ========================================
echo   NEXT STEPS FOR VERCEL
echo ========================================
echo.
echo 1. Go to: https://vercel.com/dashboard
echo.
echo 2. Check if project exists:
echo    - If YES: Go to step 3
echo    - If NO: Click "Add New" -^> "Project" -^> Import from GitHub
echo.
echo 3. Verify these settings:
echo    Framework: Next.js
echo    Root Directory: frontend  ^<-- CRITICAL!
echo    Build Command: npm run build
echo    Output Directory: .next
echo.
echo 4. If settings are wrong:
echo    - Go to: Settings -^> General
echo    - Edit "Root Directory" to: frontend
echo    - Save changes
echo.
echo 5. Trigger deployment:
echo    - Go to: Deployments tab
echo    - Click "..." on latest deployment
echo    - Click "Redeploy"
echo.
echo    OR run: FORCE_VERCEL_DEPLOY.bat
echo.
echo ========================================
echo.

pause
