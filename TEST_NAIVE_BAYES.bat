@echo off
echo ========================================
echo Testing Naive Bayes Integration
echo ========================================
echo.

echo [1/4] Checking if naive_bayes.json exists in frontend/public/data...
if exist "frontend\public\data\naive_bayes.json" (
    echo ✓ naive_bayes.json found
) else (
    echo ✗ naive_bayes.json NOT found
    exit /b 1
)
echo.

echo [2/4] Checking file size...
for %%A in ("frontend\public\data\naive_bayes.json") do echo File size: %%~zA bytes
echo.

echo [3/4] Verifying JSON structure...
findstr /C:"\"id\": \"naive_bayes\"" "frontend\public\data\naive_bayes.json" >nul
if %errorlevel%==0 (
    echo ✓ JSON has correct id
) else (
    echo ✗ JSON id not found
)

findstr /C:"\"name\": \"Naive Bayes Classifier\"" "frontend\public\data\naive_bayes.json" >nul
if %errorlevel%==0 (
    echo ✓ JSON has correct name
) else (
    echo ✗ JSON name not found
)

findstr /C:"\"sections\"" "frontend\public\data\naive_bayes.json" >nul
if %errorlevel%==0 (
    echo ✓ JSON has sections
) else (
    echo ✗ JSON sections not found
)
echo.

echo [4/4] Checking homepage integration...
findstr /C:"naive_bayes" "frontend\src\pages\index.tsx" >nul
if %errorlevel%==0 (
    echo ✓ Naive Bayes added to homepage
) else (
    echo ✗ Naive Bayes NOT in homepage
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
echo 4. Click on "Naive Bayes Classifier"
echo 5. Verify all sections display correctly
echo 6. Click "Show Interactive Playground" button
echo.
pause
