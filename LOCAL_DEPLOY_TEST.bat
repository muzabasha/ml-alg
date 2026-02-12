@echo off
title ML Platform - Local Deployment & Audit
color 0B
cls

echo ========================================
echo   ML PLATFORM - LOCAL DEPLOYMENT
echo   Full Build Test & Audit
echo ========================================
echo.

cd /d "%~dp0"

REM Step 1: Check Node.js
echo [1/8] Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is NOT installed!
    echo Please install from: https://nodejs.org
    pause
    exit /b 1
)
echo [OK] Node.js version:
node --version
echo.

REM Step 2: Navigate to frontend
echo [2/8] Navigating to frontend directory...
cd frontend
if errorlevel 1 (
    echo [ERROR] Frontend directory not found!
    pause
    exit /b 1
)
echo [OK] In frontend directory
echo.

REM Step 3: Clean previous builds
echo [3/8] Cleaning previous builds...
if exist .next rmdir /s /q .next 2>nul
if exist node_modules rmdir /s /q node_modules 2>nul
echo [OK] Cleaned
echo.

REM Step 4: Install dependencies
echo [4/8] Installing dependencies...
echo This may take 2-3 minutes...
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install dependencies!
    pause
    exit /b 1
)
echo [OK] Dependencies installed
echo.

REM Step 5: Run TypeScript check
echo [5/8] Checking TypeScript types...
call npx tsc --noEmit
if errorlevel 1 (
    echo [WARNING] TypeScript errors found!
    echo Continuing anyway...
) else (
    echo [OK] No TypeScript errors
)
echo.

REM Step 6: Build production version
echo [6/8] Building production version...
echo This may take 2-3 minutes...
call npm run build
if errorlevel 1 (
    echo [ERROR] Build failed!
    echo Check the error messages above.
    pause
    exit /b 1
)
echo [OK] Build successful!
echo.

REM Step 7: Start production server
echo [7/8] Starting production server...
echo.
echo ========================================
echo   SERVER STARTING ON PORT 3000
echo ========================================
echo.
echo   URL: http://localhost:3000
echo.
echo   Test these pages:
echo   - Homepage:    http://localhost:3000
echo   - Instructor:  http://localhost:3000/instructor
echo   - Algorithms:  http://localhost:3000/algorithm/linear_regression
echo.
echo ========================================
echo.
echo Opening browser in 5 seconds...
timeout /t 5 /nobreak >nul

start http://localhost:3000

echo.
echo [8/8] Server running...
echo.
echo Press Ctrl+C to stop the server
echo.

call npm start

pause
