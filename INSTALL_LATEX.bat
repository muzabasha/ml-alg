@echo off
echo ========================================
echo Installing LaTeX Dependencies
echo ========================================
echo.

cd frontend

echo [1/3] Installing KaTeX and dependencies...
call npm install katex@^0.16.9 @types/katex@^0.16.7
echo.

echo [2/3] Verifying installation...
if exist "node_modules\katex" (
    echo ✓ KaTeX installed successfully
) else (
    echo ✗ KaTeX installation failed
    pause
    exit /b 1
)
echo.

echo [3/3] Testing build...
call npm run build
echo.

echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo Next step: Run SMART_START.bat to test
pause
