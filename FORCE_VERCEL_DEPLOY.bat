@echo off
cls
echo ========================================
echo   FORCE VERCEL DEPLOYMENT
echo ========================================
echo.
echo This will trigger a new Vercel deployment by:
echo   1. Adding a timestamp to trigger change
echo   2. Committing the change
echo   3. Pushing to GitHub
echo.
echo Vercel will detect the push and deploy automatically.
echo.
echo ========================================
echo.

set /p confirm="Trigger deployment? (Y/N): "
if /i not "%confirm%"=="Y" (
    echo.
    echo Cancelled.
    pause
    exit /b 0
)

echo.
echo ========================================
echo   TRIGGERING DEPLOYMENT
echo ========================================
echo.

echo [1/4] Adding timestamp trigger...
echo # Deployment triggered: %date% %time% >> frontend/README.md
echo      ✓ Timestamp added

echo.
echo [2/4] Staging changes...
git add .
if %errorlevel% neq 0 (
    echo      ✗ Failed to stage
    pause
    exit /b 1
)
echo      ✓ Changes staged

echo.
echo [3/4] Creating commit...
git commit -m "chore: trigger Vercel deployment - %date% %time%"
if %errorlevel% neq 0 (
    echo      ✗ Commit failed
    pause
    exit /b 1
)
echo      ✓ Commit created

echo.
echo [4/4] Pushing to GitHub...
git push origin main
if %errorlevel% neq 0 (
    echo      ✗ Push failed
    pause
    exit /b 1
)
echo      ✓ Pushed successfully

echo.
echo ========================================
echo   ✅ DEPLOYMENT TRIGGERED!
echo ========================================
echo.
echo Vercel should start deploying in 10-30 seconds.
echo.
echo Check deployment status:
echo   1. Go to: https://vercel.com/dashboard
echo   2. Click your project
echo   3. Watch "Deployments" tab
echo.
echo Build takes 2-3 minutes.
echo.
echo ========================================
echo.

pause
