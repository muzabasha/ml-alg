@echo off
echo ========================================
echo Testing Data Visualizations
echo ========================================
echo.

cd frontend

echo Step 1: Checking Chart.js installation...
if exist "node_modules\chart.js" (
    echo ✓ Chart.js is installed
) else (
    echo ✗ Chart.js NOT found - Installing now...
    call npm install chart.js@^4.4.1 react-chartjs-2@^5.2.0
    echo.
)

echo.
echo Step 2: Checking DataVisualization component...
if exist "src\components\DataVisualization.tsx" (
    echo ✓ DataVisualization component found
) else (
    echo ✗ DataVisualization component NOT found
    echo   Component should be at: src\components\DataVisualization.tsx
)

echo.
echo Step 3: Starting development server...
echo.
echo ========================================
echo TESTING INSTRUCTIONS:
echo ========================================
echo.
echo What to test:
echo   1. Go to Linear Regression page
echo   2. Click "Sample Input & Output" section
echo   3. You should see an interactive chart with:
echo      - Blue dots (actual data points)
echo      - Red triangles (predictions)
echo      - Red line (fitted model)
echo      - Hover tooltips with values
echo.
echo Test all 9 algorithms:
echo   ✓ Linear Regression
echo   ✓ Logistic Regression
echo   ✓ K-Nearest Neighbors
echo   ✓ Decision Tree
echo   ✓ Support Vector Machine
echo   ✓ Artificial Neural Network
echo   ✓ Convolutional Neural Network
echo   ✓ Recurrent Neural Network
echo   ✓ Transformer
echo.
echo What to check:
echo   ✓ Chart displays correctly
echo   ✓ Data points are visible
echo   ✓ Hover shows tooltips
echo   ✓ Chart is responsive
echo   ✓ No console errors
echo.
echo Press Ctrl+C to stop the server when done
echo ========================================
echo.
timeout /t 3
start http://localhost:3000/algorithm/linear_regression
call npm run dev

pause
