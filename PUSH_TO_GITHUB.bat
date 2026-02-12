@echo off
echo ========================================
echo Pushing ML Learning Platform to GitHub
echo ========================================
echo.

echo Step 1: Checking Git status...
git status
echo.

echo Step 2: Adding all changes...
git add .
echo.

echo Step 3: Checking what will be committed...
git status
echo.

echo ========================================
echo Files to be committed:
echo ========================================
echo - LaTeX rendering implementation
echo - Enhanced algorithm pages
echo - Testing and diagnostic scripts
echo - Documentation updates
echo ========================================
echo.

set /p confirm="Do you want to commit these changes? (Y/N): "
if /i not "%confirm%"=="Y" (
    echo Cancelled.
    pause
    exit /b 0
)

echo.
echo Step 4: Committing changes...
git commit -m "Add LaTeX math rendering with KaTeX - All 9 algorithms now display beautiful equations - Enhanced LaTeX renderer with loading states - Added diagnostic and testing tools - Updated documentation"
echo.

echo Step 5: Pushing to GitHub...
git push origin main
echo.

if %errorlevel% equ 0 (
    echo ========================================
    echo ✅ Successfully pushed to GitHub!
    echo ========================================
    echo.
    echo Next steps:
    echo 1. Vercel will auto-deploy from GitHub
    echo 2. Wait 2-3 minutes for build
    echo 3. Check Vercel dashboard for status
    echo 4. Test your live site
    echo.
    echo Your changes are now live!
) else (
    echo ========================================
    echo ❌ Push failed!
    echo ========================================
    echo.
    echo Possible issues:
    echo - Not connected to internet
    echo - Authentication required
    echo - Branch protection rules
    echo - Merge conflicts
    echo.
    echo Try:
    echo   git pull origin main
    echo   git push origin main
    echo.
)

pause
