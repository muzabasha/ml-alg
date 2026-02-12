@echo off
echo ========================================
echo Git Commit: LaTeX Implementation
echo ========================================
echo.

echo Changes to be committed:
echo.
echo MODIFIED FILES:
echo   M  frontend/src/pages/algorithm/[id].tsx
echo.
echo NEW FILES:
echo   + CHECK_KATEX.bat
echo   + DEPLOYMENT_STATUS.md
echo   + FIX_LATEX_DISPLAY.md
echo   + INSTALL_LATEX.bat
echo   + LATEX_IMPLEMENTATION.md
echo   + LATEX_TROUBLESHOOTING.md
echo   + PROJECT_COMPLETE.md
echo   + PUSH_TO_GITHUB.bat
echo   + TEST_EQUATIONS.bat
echo   + TEST_LATEX.bat
echo   + WHATS_NEW.md
echo   + frontend/public/test-katex.html
echo.
echo ========================================
echo Summary of Changes:
echo ========================================
echo.
echo ✅ LaTeX Math Rendering
echo    - Added KaTeX integration
echo    - Enhanced LaTeX renderer component
echo    - Loading states and error handling
echo.
echo ✅ Testing Tools
echo    - CHECK_KATEX.bat - Diagnostic tool
echo    - INSTALL_LATEX.bat - Installation script
echo    - TEST_EQUATIONS.bat - Testing script
echo    - test-katex.html - Independent test
echo.
echo ✅ Documentation
echo    - LATEX_IMPLEMENTATION.md
echo    - LATEX_TROUBLESHOOTING.md
echo    - FIX_LATEX_DISPLAY.md
echo    - DEPLOYMENT_STATUS.md
echo    - PROJECT_COMPLETE.md
echo    - WHATS_NEW.md
echo.
echo ========================================
echo.

set /p proceed="Proceed with commit and push? (Y/N): "
if /i not "%proceed%"=="Y" (
    echo.
    echo Cancelled. No changes made.
    pause
    exit /b 0
)

echo.
echo [1/4] Adding all changes...
git add .

echo.
echo [2/4] Creating commit...
git commit -m "feat: Add LaTeX math rendering with KaTeX

- Implement LaTeX renderer component with loading states
- Add KaTeX integration for beautiful equation display
- Create diagnostic and testing tools (CHECK_KATEX, INSTALL_LATEX, TEST_EQUATIONS)
- Add independent KaTeX test page (test-katex.html)
- Enhance error handling and fallback display
- Update all 9 algorithms with LaTeX support
- Add comprehensive documentation and troubleshooting guides

All algorithms now display mathematical equations beautifully with:
- Greek letters (θ, α, β, Σ)
- Proper fractions and subscripts
- Purple-themed equation boxes
- Responsive design

Testing tools included for easy verification and debugging."

if %errorlevel% neq 0 (
    echo.
    echo ❌ Commit failed!
    pause
    exit /b 1
)

echo.
echo [3/4] Pushing to GitHub...
git push origin main

if %errorlevel% neq 0 (
    echo.
    echo ❌ Push failed!
    echo.
    echo Possible solutions:
    echo 1. Check internet connection
    echo 2. Verify GitHub authentication
    echo 3. Try: git pull origin main
    echo 4. Then: git push origin main
    pause
    exit /b 1
)

echo.
echo [4/4] Verifying push...
git log -1 --oneline

echo.
echo ========================================
echo ✅ SUCCESS! Changes pushed to GitHub
echo ========================================
echo.
echo What happens next:
echo.
echo 1. Vercel detects the new commit
echo 2. Automatic deployment starts
echo 3. Build takes 2-3 minutes
echo 4. Your site updates automatically
echo.
echo Check deployment status:
echo   https://vercel.com/dashboard
echo.
echo Your repository:
echo   https://github.com/muzabasha/ml-alg
echo.
echo ========================================
echo.
echo IMPORTANT: Before testing on Vercel
echo ========================================
echo.
echo 1. Run locally first: INSTALL_LATEX.bat
echo 2. Test equations: TEST_EQUATIONS.bat
echo 3. Verify all 9 algorithms work
echo 4. Then check Vercel deployment
echo.
echo If equations don't render on Vercel:
echo - Check Vercel build logs
echo - Verify katex is in dependencies
echo - Ensure build completed successfully
echo.

pause
