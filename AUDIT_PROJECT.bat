@echo off
title ML Platform - Project Audit
color 0E
cls

echo ========================================
echo   ML PLATFORM - PROJECT AUDIT
echo ========================================
echo.

cd /d "%~dp0"

echo [AUDIT] Starting comprehensive project audit...
echo.

REM Create audit report file
set REPORT=AUDIT_REPORT.txt
echo ML PLATFORM - AUDIT REPORT > %REPORT%
echo Generated: %date% %time% >> %REPORT%
echo ======================================== >> %REPORT%
echo. >> %REPORT%

REM Check 1: Project Structure
echo [1/10] Checking project structure...
echo. >> %REPORT%
echo [1] PROJECT STRUCTURE >> %REPORT%
echo ---------------------------------------- >> %REPORT%

if exist frontend (
    echo [OK] frontend/ directory exists
    echo [OK] frontend/ directory exists >> %REPORT%
) else (
    echo [ERROR] frontend/ directory missing!
    echo [ERROR] frontend/ directory missing! >> %REPORT%
)

if exist frontend\src\pages (
    echo [OK] frontend/src/pages/ exists
    echo [OK] frontend/src/pages/ exists >> %REPORT%
) else (
    echo [ERROR] frontend/src/pages/ missing!
    echo [ERROR] frontend/src/pages/ missing! >> %REPORT%
)

if exist frontend\public\data (
    echo [OK] frontend/public/data/ exists
    echo [OK] frontend/public/data/ exists >> %REPORT%
) else (
    echo [ERROR] frontend/public/data/ missing!
    echo [ERROR] frontend/public/data/ missing! >> %REPORT%
)

if exist content\algorithms (
    echo [OK] content/algorithms/ exists
    echo [OK] content/algorithms/ exists >> %REPORT%
) else (
    echo [ERROR] content/algorithms/ missing!
    echo [ERROR] content/algorithms/ missing! >> %REPORT%
)
echo.

REM Check 2: Algorithm JSON Files
echo [2/10] Checking algorithm JSON files...
echo. >> %REPORT%
echo [2] ALGORITHM JSON FILES >> %REPORT%
echo ---------------------------------------- >> %REPORT%

set ALGO_COUNT=0
for %%f in (linear_regression logistic_regression knn decision_tree svm ann cnn rnn transformer) do (
    if exist "content\algorithms\%%f.json" (
        echo [OK] %%f.json exists
        echo [OK] %%f.json exists >> %REPORT%
        set /a ALGO_COUNT+=1
    ) else (
        echo [ERROR] %%f.json missing!
        echo [ERROR] %%f.json missing! >> %REPORT%
    )
)
echo Total algorithms: %ALGO_COUNT%/9
echo Total algorithms: %ALGO_COUNT%/9 >> %REPORT%
echo.

REM Check 3: Public Data Files
echo [3/10] Checking public data files...
echo. >> %REPORT%
echo [3] PUBLIC DATA FILES >> %REPORT%
echo ---------------------------------------- >> %REPORT%

set DATA_COUNT=0
for %%f in (linear_regression logistic_regression knn decision_tree svm ann cnn rnn transformer) do (
    if exist "frontend\public\data\%%f.json" (
        echo [OK] public/data/%%f.json exists
        echo [OK] public/data/%%f.json exists >> %REPORT%
        set /a DATA_COUNT+=1
    ) else (
        echo [ERROR] public/data/%%f.json missing!
        echo [ERROR] public/data/%%f.json missing! >> %REPORT%
    )
)
echo Total public data files: %DATA_COUNT%/9
echo Total public data files: %DATA_COUNT%/9 >> %REPORT%
echo.

REM Check 4: Page Files
echo [4/10] Checking page files...
echo. >> %REPORT%
echo [4] PAGE FILES >> %REPORT%
echo ---------------------------------------- >> %REPORT%

set PAGE_COUNT=0
for %%f in (index.tsx instructor.tsx _app.tsx _document.tsx _error.tsx 404.tsx 500.tsx) do (
    if exist "frontend\src\pages\%%f" (
        echo [OK] %%f exists
        echo [OK] %%f exists >> %REPORT%
        set /a PAGE_COUNT+=1
    ) else (
        echo [ERROR] %%f missing!
        echo [ERROR] %%f missing! >> %REPORT%
    )
)

if exist "frontend\src\pages\algorithm\[id].tsx" (
    echo [OK] algorithm/[id].tsx exists
    echo [OK] algorithm/[id].tsx exists >> %REPORT%
    set /a PAGE_COUNT+=1
) else (
    echo [ERROR] algorithm/[id].tsx missing!
    echo [ERROR] algorithm/[id].tsx missing! >> %REPORT%
)

echo Total page files: %PAGE_COUNT%/8
echo Total page files: %PAGE_COUNT%/8 >> %REPORT%
echo.

REM Check 5: Configuration Files
echo [5/10] Checking configuration files...
echo. >> %REPORT%
echo [5] CONFIGURATION FILES >> %REPORT%
echo ---------------------------------------- >> %REPORT%

for %%f in (package.json next.config.js tsconfig.json tailwind.config.js postcss.config.js) do (
    if exist "frontend\%%f" (
        echo [OK] %%f exists
        echo [OK] %%f exists >> %REPORT%
    ) else (
        echo [ERROR] %%f missing!
        echo [ERROR] %%f missing! >> %REPORT%
    )
)
echo.

REM Check 6: Image Files
echo [6/10] Checking image files...
echo. >> %REPORT%
echo [6] IMAGE FILES >> %REPORT%
echo ---------------------------------------- >> %REPORT%

if exist "frontend\public\DP_profile.png" (
    echo [OK] Instructor profile image exists
    echo [OK] Instructor profile image exists >> %REPORT%
) else (
    echo [ERROR] Instructor profile image missing!
    echo [ERROR] Instructor profile image missing! >> %REPORT%
)
echo.

REM Check 7: Dependencies
echo [7/10] Checking dependencies...
echo. >> %REPORT%
echo [7] DEPENDENCIES >> %REPORT%
echo ---------------------------------------- >> %REPORT%

if exist "frontend\node_modules" (
    echo [OK] node_modules exists
    echo [OK] node_modules exists >> %REPORT%
) else (
    echo [WARNING] node_modules not found - run npm install
    echo [WARNING] node_modules not found - run npm install >> %REPORT%
)
echo.

REM Check 8: Git Status
echo [8/10] Checking Git status...
echo. >> %REPORT%
echo [8] GIT STATUS >> %REPORT%
echo ---------------------------------------- >> %REPORT%

git status >nul 2>&1
if errorlevel 1 (
    echo [WARNING] Not a git repository
    echo [WARNING] Not a git repository >> %REPORT%
) else (
    echo [OK] Git repository initialized
    echo [OK] Git repository initialized >> %REPORT%
    git remote -v >> %REPORT%
)
echo.

REM Check 9: Documentation
echo [9/10] Checking documentation...
echo. >> %REPORT%
echo [9] DOCUMENTATION >> %REPORT%
echo ---------------------------------------- >> %REPORT%

set DOC_COUNT=0
for %%f in (README.md HOW_TO_RUN.txt TROUBLESHOOTING.md) do (
    if exist "%%f" (
        echo [OK] %%f exists
        echo [OK] %%f exists >> %REPORT%
        set /a DOC_COUNT+=1
    ) else (
        echo [WARNING] %%f missing
        echo [WARNING] %%f missing >> %REPORT%
    )
)
echo Documentation files: %DOC_COUNT%/3
echo Documentation files: %DOC_COUNT%/3 >> %REPORT%
echo.

REM Check 10: File Sizes
echo [10/10] Checking file sizes...
echo. >> %REPORT%
echo [10] FILE SIZES >> %REPORT%
echo ---------------------------------------- >> %REPORT%

echo Checking JSON file sizes...
for %%f in (frontend\public\data\*.json) do (
    echo %%~nxf: %%~zf bytes
    echo %%~nxf: %%~zf bytes >> %REPORT%
)
echo.

REM Summary
echo. >> %REPORT%
echo ======================================== >> %REPORT%
echo AUDIT SUMMARY >> %REPORT%
echo ======================================== >> %REPORT%
echo. >> %REPORT%
echo Algorithms: %ALGO_COUNT%/9 >> %REPORT%
echo Public Data: %DATA_COUNT%/9 >> %REPORT%
echo Pages: %PAGE_COUNT%/8 >> %REPORT%
echo Documentation: %DOC_COUNT%/3 >> %REPORT%
echo. >> %REPORT%

echo ========================================
echo   AUDIT COMPLETE
echo ========================================
echo.
echo Report saved to: %REPORT%
echo.
echo Opening report...
timeout /t 2 /nobreak >nul
notepad %REPORT%

pause
