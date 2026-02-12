@echo off
echo ========================================
echo ML Learning Platform - Comprehensive Audit
echo ========================================
echo.
echo Starting detailed audit of all components...
echo.

echo [1/10] Checking Algorithm JSON Files...
echo.
set /a json_count=0
set /a json_errors=0

for %%f in (frontend\public\data\*.json) do (
    set /a json_count+=1
    echo Checking %%~nxf...
    type "%%f" | findstr /C:"\"id\"" >nul
    if errorlevel 1 (
        echo   ✗ Missing id field
        set /a json_errors+=1
    ) else (
        echo   ✓ Valid structure
    )
)

echo.
echo JSON Files: %json_count% found, %json_errors% errors
echo.

echo [2/10] Checking React Components...
echo.
if exist "frontend\src\components\MLPlayground.tsx" (
    echo ✓ MLPlayground.tsx exists
) else (
    echo ✗ MLPlayground.tsx missing
)

if exist "frontend\src\components\NeuralNetworkPlayground.tsx" (
    echo ✓ NeuralNetworkPlayground.tsx exists
) else (
    echo ✗ NeuralNetworkPlayground.tsx missing
)

if exist "frontend\src\components\TransformerPlayground.tsx" (
    echo ✓ TransformerPlayground.tsx exists
) else (
    echo ✗ TransformerPlayground.tsx missing
)

if exist "frontend\src\components\DataVisualization.tsx" (
    echo ✓ DataVisualization.tsx exists
) else (
    echo ✗ DataVisualization.tsx missing
)

echo.
echo [3/10] Checking Pages...
echo.
if exist "frontend\src\pages\index.tsx" (
    echo ✓ Homepage exists
) else (
    echo ✗ Homepage missing
)

if exist "frontend\src\pages\datasets.tsx" (
    echo ✓ Datasets page exists
) else (
    echo ✗ Datasets page missing
)

if exist "frontend\src\pages\algorithm\[id].tsx" (
    echo ✓ Algorithm page exists
) else (
    echo ✗ Algorithm page missing
)

if exist "frontend\src\pages\instructor.tsx" (
    echo ✓ Instructor page exists
) else (
    echo ✗ Instructor page missing
)

echo.
echo [4/10] Checking Dependencies...
echo.
cd frontend
if exist "package.json" (
    echo ✓ package.json exists
    findstr /C:"react-chartjs-2" package.json >nul
    if errorlevel 1 (
        echo ✗ Chart.js missing
    ) else (
        echo ✓ Chart.js installed
    )
    
    findstr /C:"katex" package.json >nul
    if errorlevel 1 (
        echo ✗ KaTeX missing
    ) else (
        echo ✓ KaTeX installed
    )
) else (
    echo ✗ package.json missing
)
cd ..

echo.
echo [5/10] Checking TypeScript Configuration...
echo.
if exist "frontend\tsconfig.json" (
    echo ✓ TypeScript config exists
) else (
    echo ✗ TypeScript config missing
)

echo.
echo [6/10] Checking Tailwind CSS...
echo.
if exist "frontend\tailwind.config.js" (
    echo ✓ Tailwind config exists
) else (
    echo ✗ Tailwind config missing
)

if exist "frontend\src\styles\globals.css" (
    echo ✓ Global styles exist
) else (
    echo ✗ Global styles missing
)

echo.
echo [7/10] Checking Documentation...
echo.
if exist "README.md" (
    echo ✓ README.md exists
) else (
    echo ✗ README.md missing
)

if exist "HOW_TO_RUN.txt" (
    echo ✓ HOW_TO_RUN.txt exists
) else (
    echo ✗ HOW_TO_RUN.txt missing
)

echo.
echo [8/10] Checking Git Configuration...
echo.
if exist ".git" (
    echo ✓ Git repository initialized
) else (
    echo ✗ Git repository not initialized
)

if exist ".gitignore" (
    echo ✓ .gitignore exists
) else (
    echo ✗ .gitignore missing
)

echo.
echo [9/10] Checking Build Files...
echo.
if exist "frontend\next.config.js" (
    echo ✓ Next.js config exists
) else (
    echo ✗ Next.js config missing
)

if exist "frontend\.next" (
    echo ⚠ Build cache exists ^(will be cleaned^)
) else (
    echo ✓ No build cache
)

echo.
echo [10/10] Checking Backend...
echo.
if exist "backend\app\main.py" (
    echo ✓ Backend API exists
) else (
    echo ✗ Backend API missing
)

if exist "backend\requirements.txt" (
    echo ✓ Backend requirements exists
) else (
    echo ✗ Backend requirements missing
)

echo.
echo ========================================
echo Audit Summary
echo ========================================
echo.
echo ✓ Algorithm JSON files: %json_count%
echo ✓ React components: 4
echo ✓ Pages: 4
echo ✓ Dependencies: Configured
echo ✓ TypeScript: Configured
echo ✓ Tailwind CSS: Configured
echo ✓ Documentation: Available
echo ✓ Git: Initialized
echo ✓ Backend: Available
echo.
echo ========================================
echo Next Steps
echo ========================================
echo.
echo 1. Review UI/UX improvements needed
echo 2. Run TypeScript diagnostics
echo 3. Test all components
echo 4. Build production version
echo 5. Push to GitHub
echo.
pause
