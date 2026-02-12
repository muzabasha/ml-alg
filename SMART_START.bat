@echo off
title ML Platform - Smart Start
color 0B
cls
echo ================================================
echo   ML PLATFORM - SMART START
echo ================================================
echo.
echo Checking system and starting application...
echo ================================================
echo.

cd /d "%~dp0"

REM Check if Node.js is installed
echo [1/7] Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is NOT installed!
    echo.
    echo Please install Node.js from: https://nodejs.org
    echo.
    pause
    exit /b 1
)
echo ✅ Node.js is installed
node --version

echo.
echo [2/7] Checking npm...
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm is NOT installed!
    pause
    exit /b 1
)
echo ✅ npm is installed
npm --version

echo.
echo [3/7] Copying profile image...
copy /Y "public\DP_profile.png" "frontend\public\DP_profile.png" >nul 2>&1
if errorlevel 1 (
    echo ⚠️ Could not copy image (may already exist)
) else (
    echo ✅ Profile image copied
)

echo.
echo [4/7] Checking port 3000...
netstat -ano | findstr :3000 | findstr LISTENING >nul 2>&1
if errorlevel 1 (
    echo ✅ Port 3000 is available
    set USE_PORT=3000
    set NPM_SCRIPT=dev
) else (
    echo ⚠️ Port 3000 is in use, using port 3001
    set USE_PORT=3001
    set NPM_SCRIPT=dev:alt
)

cd frontend

echo.
echo [5/7] Clearing cache...
if exist .next\cache rmdir /s /q .next\cache 2>nul
echo ✅ Cache cleared

echo.
echo [6/7] Installing dependencies...
call npm install
if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)
echo ✅ Dependencies installed

echo.
echo [7/7] Starting server on port %USE_PORT%...
start "ML Platform - Port %USE_PORT%" cmd /k "npm run %NPM_SCRIPT%"

echo.
echo Waiting for server to start...
timeout /t 25 /nobreak

echo.
echo ================================================
echo   SERVER STARTED SUCCESSFULLY!
echo ================================================
echo.
echo   Frontend: http://localhost:%USE_PORT%
echo.
echo   Available Pages:
echo   - Home:       http://localhost:%USE_PORT%
echo   - Instructor: http://localhost:%USE_PORT%/instructor
echo.
echo ================================================
echo.

start http://localhost:%USE_PORT%

echo.
echo ✅ Application started successfully!
echo.
echo Browser opened to http://localhost:%USE_PORT%
echo.
echo To stop: Press Ctrl+C in server window
echo.
pause
