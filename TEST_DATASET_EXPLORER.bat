@echo off
echo ========================================
echo Testing Dataset Explorer
echo ========================================
echo.

echo [1/3] Checking if datasets.tsx exists...
if exist "frontend\src\pages\datasets.tsx" (
    echo ✓ datasets.tsx found
    for %%A in ("frontend\src\pages\datasets.tsx") do echo   File size: %%~zA bytes
) else (
    echo ✗ datasets.tsx NOT found
    exit /b 1
)
echo.

echo [2/3] Checking homepage integration...
findstr /C:"datasets" "frontend\src\pages\index.tsx" >nul
if %errorlevel%==0 (
    echo ✓ Datasets link added to homepage
) else (
    echo ✗ Datasets link NOT found
)

findstr /C:"Explore Datasets" "frontend\src\pages\index.tsx" >nul
if %errorlevel%==0 (
    echo ✓ Dataset Explorer section added
) else (
    echo ✗ Dataset Explorer section NOT found
)
echo.

echo [3/3] Verifying content...
findstr /C:"Iris" "frontend\src\pages\datasets.tsx" >nul
if %errorlevel%==0 (
    echo ✓ Iris dataset included
) else (
    echo ✗ Iris dataset NOT found
)

findstr /C:"Wine" "frontend\src\pages\datasets.tsx" >nul
if %errorlevel%==0 (
    echo ✓ Wine dataset included
) else (
    echo ✗ Wine dataset NOT found
)

findstr /C:"statistics" "frontend\src\pages\datasets.tsx" >nul
if %errorlevel%==0 (
    echo ✓ Statistics view included
) else (
    echo ✗ Statistics view NOT found
)

findstr /C:"correlations" "frontend\src\pages\datasets.tsx" >nul
if %errorlevel%==0 (
    echo ✓ Correlations view included
) else (
    echo ✗ Correlations view NOT found
)
echo.

echo ========================================
echo Integration Test Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Run: cd frontend
echo 2. Run: npm run dev
echo 3. Open: http://localhost:3000
echo 4. Click "Datasets" in navigation
echo 5. Or click "Explore Datasets" button
echo.
echo Features to test:
echo - Switch between Iris and Wine datasets
echo - View Overview (dataset info + loading code)
echo - View Statistics (descriptive stats table)
echo - View Correlations (feature relationships)
echo - View Usage (complete examples + tips)
echo - Copy code examples to try yourself
echo.
pause
