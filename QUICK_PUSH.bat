@echo off
echo Pushing to GitHub...
echo.

git add .
git commit -m "Add LaTeX math rendering - All 9 algorithms now display beautiful equations"
git push origin main

if %errorlevel% equ 0 (
    echo.
    echo ✅ Pushed successfully!
    echo Vercel will auto-deploy in 2-3 minutes.
) else (
    echo.
    echo ❌ Push failed. Check connection and try again.
)

echo.
pause
