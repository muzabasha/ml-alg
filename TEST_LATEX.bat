@echo off
echo ========================================
echo Testing LaTeX Rendering Implementation
echo ========================================
echo.

cd frontend

echo [1/4] Checking if katex is installed...
if exist "node_modules\katex" (
    echo ✓ katex module found
) else (
    echo ✗ katex module NOT found - installing...
    call npm install katex@^0.16.9 react-katex@^3.0.1 @types/katex@^0.16.7
)
echo.

echo [2/4] Checking TypeScript configuration...
type tsconfig.json | findstr "moduleResolution"
echo.

echo [3/4] Running TypeScript check...
call npx tsc --noEmit
echo.

echo [4/4] Building project...
call npm run build
echo.

echo ========================================
echo Test Complete!
echo ========================================
pause
