@echo off
cls
echo ========================================
echo   PUSH TO GITHUB - LaTeX Implementation
echo ========================================
echo.
echo This will push all LaTeX changes to GitHub
echo.
echo Changes include:
echo   ✓ LaTeX math rendering
echo   ✓ Enhanced algorithm pages
echo   ✓ Testing tools
echo   ✓ Documentation
echo.
echo After push:
echo   → Vercel will auto-deploy
echo   → Build takes ~3 minutes
echo   → Site updates automatically
echo.
echo ========================================
echo.

set /p confirm="Ready to push? (Y/N): "
if /i not "%confirm%"=="Y" (
    echo.
    echo Push cancelled.
    pause
    exit /b 0
)

echo.
echo ========================================
echo   PUSHING TO GITHUB
echo ========================================
echo.

echo [1/3] Staging all changes...
git add .
echo      ✓ Files staged

echo.
echo [2/3] Creating commit...
git commit -m "feat: Add LaTeX math rendering with KaTeX - Implement beautiful equation display for all 9 algorithms - Add testing and diagnostic tools - Include comprehensive documentation"
if %errorlevel% neq 0 (
    echo      ✗ Commit failed
    pause
    exit /b 1
)
echo      ✓ Commit created

echo.
echo [3/3] Pushing to GitHub...
git push origin main
if %errorlevel% neq 0 (
    echo      ✗ Push failed
    echo.
    echo Troubleshooting:
    echo   1. Check internet connection
    echo   2. Verify GitHub authentication
    echo   3. Try: git pull origin main
    pause
    exit /b 1
)
echo      ✓ Pushed successfully

echo.
echo ========================================
echo   ✅ SUCCESS!
echo ========================================
echo.
echo Your changes are now on GitHub!
echo.
echo Next steps:
echo   1. Vercel is deploying (2-3 minutes)
echo   2. Check: https://vercel.com/dashboard
echo   3. Test your live site
echo.
echo Repository:
echo   https://github.com/muzabasha/ml-alg
echo.
echo ========================================
echo.

pause
