@echo off
echo ========================================
echo Testing LaTeX Equation Rendering
echo ========================================
echo.

cd frontend

echo Step 1: Checking if KaTeX is installed...
if exist "node_modules\katex\dist\katex.min.js" (
    echo ✓ KaTeX is installed
) else (
    echo ✗ KaTeX NOT found - Installing now...
    call npm install katex@^0.16.9 @types/katex@^0.16.7
    echo.
)

echo.
echo Step 2: Checking KaTeX CSS...
if exist "node_modules\katex\dist\katex.min.css" (
    echo ✓ KaTeX CSS found
) else (
    echo ✗ KaTeX CSS NOT found
)

echo.
echo Step 3: Starting development server...
echo.
echo ========================================
echo TESTING INSTRUCTIONS:
echo ========================================
echo 1. Browser will open automatically
echo 2. Click on "Linear Regression"
echo 3. Click "Mathematical Formulation" in sidebar
echo 4. You should see:
echo    - Beautiful rendered equations (NOT raw LaTeX text)
echo    - Greek letters: θ, α, Σ
echo    - Fractions displayed properly
echo    - Purple boxes around equations
echo.
echo If you see "Latex: ..." text instead:
echo    - Check browser console (F12) for errors
echo    - KaTeX might not be loading
echo.
echo Press Ctrl+C to stop the server when done
echo ========================================
echo.
timeout /t 3
start http://localhost:3000/algorithm/linear_regression
call npm run dev

pause
