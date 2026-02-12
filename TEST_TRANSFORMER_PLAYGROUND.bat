@echo off
echo ========================================
echo Testing Transformer Playground
echo ========================================
echo.

echo [1/3] Checking if TransformerPlayground.tsx exists...
if exist "frontend\src\components\TransformerPlayground.tsx" (
    echo ✓ TransformerPlayground.tsx found
) else (
    echo ✗ TransformerPlayground.tsx NOT found
    exit /b 1
)
echo.

echo [2/3] Checking algorithm page integration...
findstr /C:"TransformerPlayground" "frontend\src\pages\algorithm\[id].tsx" >nul
if %errorlevel%==0 (
    echo ✓ TransformerPlayground imported in algorithm page
) else (
    echo ✗ TransformerPlayground NOT imported
)

findstr /C:"transformer" "frontend\src\pages\algorithm\[id].tsx" >nul
if %errorlevel%==0 (
    echo ✓ Transformer conditions added
) else (
    echo ✗ Transformer conditions NOT found
)
echo.

echo [3/3] Verifying transformer.json exists...
if exist "frontend\public\data\transformer.json" (
    echo ✓ transformer.json found
    for %%A in ("frontend\public\data\transformer.json") do echo   File size: %%~zA bytes
) else (
    echo ✗ transformer.json NOT found
)
echo.

echo ========================================
echo Integration Test Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Run: cd frontend
echo 2. Run: npm run dev
echo 3. Open: http://localhost:3000/algorithm/transformer
echo 4. Click "Show Attention Playground" button
echo 5. Try different sentences and see attention patterns
echo.
echo Features to test:
echo - Type custom text or use sample sentences
echo - Click on tokens to see their attention patterns
echo - Adjust temperature slider (0.1 = sharp, 2.0 = smooth)
echo - View attention matrix with color-coded weights
echo - Change number of heads and layers
echo - Adjust embedding dimensions
echo.
pause
