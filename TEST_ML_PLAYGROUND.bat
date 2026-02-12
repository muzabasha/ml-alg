@echo off
echo ========================================
echo Testing ML Playground
echo ========================================
echo.

cd frontend

echo Step 1: Checking component files...
if exist "src\components\MLPlayground.tsx" (
    echo ✓ MLPlayground component found
) else (
    echo ✗ MLPlayground component NOT found
    echo   Component should be at: src\components\MLPlayground.tsx
    pause
    exit /b 1
)

echo.
echo Step 2: Starting development server...
echo.
echo ========================================
echo TESTING INSTRUCTIONS:
echo ========================================
echo.
echo The ML Playground is available on:
echo   1. Linear Regression
echo   2. Logistic Regression
echo   3. K-Nearest Neighbors (KNN)
echo   4. Decision Tree
echo   5. Support Vector Machine (SVM)
echo.
echo How to test:
echo   1. Go to Linear Regression page (opening automatically)
echo   2. Click "Show Interactive Playground" button
echo   3. You should see:
echo      - Interactive canvas with grid
echo      - Dataset selection buttons
echo      - Parameter controls (learning rate slider)
echo      - Training controls (Train/Clear buttons)
echo      - Model statistics panel
echo.
echo What to test:
echo   ✓ Click on canvas to add data points
echo   ✓ Try different datasets (Linear, Quadratic, Clusters, Circles)
echo   ✓ Adjust learning rate slider
echo   ✓ Click "Train Model" and watch regression line appear
echo   ✓ See slope and intercept values
echo   ✓ Clear data and try again
echo.
echo Test all 5 algorithms:
echo   1. Linear Regression - Red regression line
echo   2. Logistic Regression - Decision boundary
echo   3. KNN - Colored decision regions (adjust K value)
echo   4. Decision Tree - Decision boundaries (adjust max depth)
echo   5. SVM - Purple hyperplane (adjust C value)
echo.
echo Expected behavior:
echo   ✓ Canvas displays with grid
echo   ✓ Points appear when clicking
echo   ✓ Training shows progress
echo   ✓ Model visualizes on canvas
echo   ✓ Stats update after training
echo   ✓ All controls are responsive
echo.
echo Press Ctrl+C to stop the server when done
echo ========================================
echo.
timeout /t 3
start http://localhost:3000/algorithm/linear_regression
call npm run dev

pause
