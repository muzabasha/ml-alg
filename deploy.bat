@echo off
REM Deployment Script for ML Learning Platform (Windows)
REM This script helps prepare and deploy the application

echo ========================================
echo ML Learning Platform - Deployment Script
echo ========================================
echo.

REM Check if we're in the right directory
if not exist "frontend" (
    echo Error: Must run from project root directory
    exit /b 1
)
if not exist "backend" (
    echo Error: Must run from project root directory
    exit /b 1
)

REM Step 1: Check Node.js
echo Checking Node.js version...
node --version >nul 2>&1
if errorlevel 1 (
    echo Error: Node.js not found
    exit /b 1
)
echo Node.js version OK
echo.

REM Step 2: Install frontend dependencies
echo Installing frontend dependencies...
cd frontend
call npm ci
if errorlevel 1 (
    echo Error: Failed to install frontend dependencies
    exit /b 1
)
echo Frontend dependencies installed
echo.

REM Step 3: Type check
echo Running TypeScript type check...
call npx tsc --noEmit
if errorlevel 1 (
    echo Error: Type errors found - please fix before deploying
    exit /b 1
)
echo No type errors found
echo.

REM Step 4: Build frontend
echo Building frontend...
call npm run build
if errorlevel 1 (
    echo Error: Frontend build failed
    exit /b 1
)
echo Frontend build successful
echo.

REM Step 5: Check backend syntax
echo Checking backend Python syntax...
cd ..\backend
python -m py_compile app\main.py 2>nul
if errorlevel 1 (
    echo Warning: Backend syntax check had warnings
) else (
    echo Backend syntax check passed
)
echo.

REM Step 6: Git status
cd ..
echo Git status:
git status --short
echo.

REM Step 7: Prompt for commit
set /p COMMIT_CHOICE="Do you want to commit changes? (y/n): "
if /i "%COMMIT_CHOICE%"=="y" (
    set /p COMMIT_MSG="Enter commit message: "
    git add .
    git commit -m "%COMMIT_MSG%"
    echo Changes committed
    echo.
)

REM Step 8: Prompt for push
set /p PUSH_CHOICE="Do you want to push to GitHub? (y/n): "
if /i "%PUSH_CHOICE%"=="y" (
    for /f "tokens=*" %%i in ('git branch --show-current') do set BRANCH=%%i
    git push origin %BRANCH%
    echo Pushed to GitHub (%BRANCH%)
    echo.
)

REM Step 9: Deployment options
echo Deployment Options:
echo 1. Deploy to Vercel (automatic from GitHub)
echo 2. Deploy using Vercel CLI
echo 3. Skip deployment
echo.
set /p DEPLOY_CHOICE="Choose option (1-3): "

if "%DEPLOY_CHOICE%"=="1" (
    echo Vercel will automatically deploy from GitHub
    echo Visit https://vercel.com/dashboard to monitor deployment
) else if "%DEPLOY_CHOICE%"=="2" (
    echo Deploying to Vercel...
    cd frontend
    vercel --prod
    if errorlevel 1 (
        echo Error: Vercel CLI not installed. Install with: npm i -g vercel
        exit /b 1
    )
    echo Deployed to Vercel
) else (
    echo Skipping deployment
)

echo.
echo ========================================
echo Deployment preparation complete!
echo.
echo Next steps:
echo 1. Monitor deployment at https://vercel.com/dashboard
echo 2. Test the deployed application
echo 3. Check for any errors in Vercel logs
echo.
echo Documentation:
echo - Deployment Instructions: DEPLOYMENT_INSTRUCTIONS.md
echo - Pre-Deployment Checklist: PRE_DEPLOYMENT_CHECKLIST.md
echo.
pause
