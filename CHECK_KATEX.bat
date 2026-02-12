@echo off
echo ========================================
echo KaTeX Installation Diagnostic
echo ========================================
echo.

cd frontend

echo Checking KaTeX installation...
echo.

echo [1] Checking node_modules folder...
if exist "node_modules" (
    echo ✓ node_modules exists
) else (
    echo ✗ node_modules NOT found
    echo   Run: npm install
    goto :end
)

echo.
echo [2] Checking KaTeX package...
if exist "node_modules\katex" (
    echo ✓ katex package found
) else (
    echo ✗ katex package NOT found
    echo   Run: npm install katex@^0.16.9
    goto :install
)

echo.
echo [3] Checking KaTeX JavaScript...
if exist "node_modules\katex\dist\katex.min.js" (
    echo ✓ katex.min.js found
) else (
    echo ✗ katex.min.js NOT found
    goto :install
)

echo.
echo [4] Checking KaTeX CSS...
if exist "node_modules\katex\dist\katex.min.css" (
    echo ✓ katex.min.css found
) else (
    echo ✗ katex.min.css NOT found
    goto :install
)

echo.
echo [5] Checking TypeScript types...
if exist "node_modules\@types\katex" (
    echo ✓ @types/katex found
) else (
    echo ✗ @types/katex NOT found
    echo   Run: npm install @types/katex@^0.16.7
)

echo.
echo [6] Checking package.json...
findstr /C:"katex" package.json >nul
if %errorlevel% equ 0 (
    echo ✓ katex listed in package.json
    echo.
    echo   Dependencies:
    findstr /C:"katex" package.json
) else (
    echo ✗ katex NOT in package.json
    goto :install
)

echo.
echo ========================================
echo ✅ KaTeX is properly installed!
echo ========================================
echo.
echo Next steps:
echo 1. Run: TEST_EQUATIONS.bat
echo 2. Open: http://localhost:3000/test-katex.html
echo 3. Test your algorithms
echo.
goto :end

:install
echo.
echo ========================================
echo ❌ KaTeX is NOT properly installed
echo ========================================
echo.
echo To fix this, run:
echo   INSTALL_LATEX.bat
echo.
echo Or manually:
echo   cd frontend
echo   npm install katex@^0.16.9 @types/katex@^0.16.7
echo.

:end
pause
