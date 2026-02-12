@echo off
cls
echo ========================================
echo   LOCAL BUILD TEST
echo ========================================
echo.
echo Testing production build locally...
echo This will catch any deployment issues.
echo.
echo ========================================
echo.

cd frontend

echo [1/4] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo.
    echo ✗ npm install failed
    pause
    exit /b 1
)
echo      ✓ Dependencies installed
echo.

echo [2/4] Running TypeScript check...
call npx tsc --noEmit
if %errorlevel% neq 0 (
    echo.
    echo ✗ TypeScript errors found
    echo Please fix the errors above
    pause
    exit /b 1
)
echo      ✓ TypeScript check passed
echo.

echo [3/4] Building production bundle...
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo ✗ Build failed
    echo Check the errors above
    pause
    exit /b 1
)
echo      ✓ Build successful
echo.

echo [4/4] Starting production server...
echo.
echo ========================================
echo   ✅ BUILD SUCCESSFUL!
echo ========================================
echo.
echo The build completed without errors.
echo This means Vercel deployment should work.
echo.
echo To test the production build locally:
echo   npm start
echo.
echo Then visit: http://localhost:3000
echo.
echo ========================================
echo.

set /p start="Start production server now? (Y/N): "
if /i "%start%"=="Y" (
    echo.
    echo Starting server on http://localhost:3000
    echo Press Ctrl+C to stop
    echo.
    call npm start
)

cd ..
pause
