@echo off
title ML Learning Platform - Local Server
color 0A

echo ========================================
echo   ML Learning Platform
echo   Local Development Server
echo ========================================
echo.

echo Checking prerequisites...
echo.

REM Check Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python not found!
    echo Please install Python 3.8+ from https://www.python.org/
    pause
    exit /b 1
)
echo [OK] Python installed

REM Check Node
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js not found!
    echo Please install Node.js 16+ from https://nodejs.org/
    pause
    exit /b 1
)
echo [OK] Node.js installed

REM Check npm
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm not found!
    pause
    exit /b 1
)
echo [OK] npm installed

echo.
echo ========================================
echo   Starting Backend Server
echo ========================================
echo.

cd backend

REM Check if venv exists
if not exist "venv\" (
    echo Creating virtual environment...
    python -m venv venv
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to create virtual environment
        pause
        exit /b 1
    )
    echo [OK] Virtual environment created
)

REM Activate venv
call venv\Scripts\activate
if %errorlevel% neq 0 (
    echo [ERROR] Failed to activate virtual environment
    pause
    exit /b 1
)

REM Check if requirements are installed
pip show fastapi >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing backend dependencies...
    pip install -r requirements.txt
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install dependencies
        pause
        exit /b 1
    )
    echo [OK] Dependencies installed
)

echo.
echo Starting backend server on http://localhost:8000
echo API Documentation: http://localhost:8000/docs
echo.
echo [Press Ctrl+C to stop the server]
echo.

REM Start backend in new window
start "ML Platform - Backend" cmd /k "cd /d %CD% && venv\Scripts\activate && python app/main.py"

timeout /t 3 /nobreak >nul

echo.
echo ========================================
echo   Starting Frontend Server
echo ========================================
echo.

cd ..\frontend

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing frontend dependencies...
    echo This may take a few minutes...
    npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install dependencies
        pause
        exit /b 1
    )
    echo [OK] Dependencies installed
)

echo.
echo Starting frontend server on http://localhost:3000
echo.
echo [Press Ctrl+C to stop the server]
echo.

REM Start frontend in new window
start "ML Platform - Frontend" cmd /k "cd /d %CD% && npm run dev"

timeout /t 3 /nobreak >nul

echo.
echo ========================================
echo   Servers Started Successfully!
echo ========================================
echo.
echo Backend:  http://localhost:8000
echo API Docs: http://localhost:8000/docs
echo Frontend: http://localhost:3000
echo.
echo Two new windows have opened:
echo 1. Backend Server (Python/FastAPI)
echo 2. Frontend Server (Next.js)
echo.
echo To stop servers: Press Ctrl+C in each window
echo.
echo Opening browser...
timeout /t 2 /nobreak >nul
start http://localhost:3000

echo.
echo ========================================
echo   Quick Links
echo ========================================
echo.
echo Home Page:        http://localhost:3000
echo Instructor:       http://localhost:3000/instructor
echo Algorithm:        http://localhost:3000/algorithm/linear_regression
echo API Health:       http://localhost:8000/health
echo API Docs:         http://localhost:8000/docs
echo.
echo ========================================
echo   Press any key to close this window
echo   (Servers will continue running)
echo ========================================
pause >nul
