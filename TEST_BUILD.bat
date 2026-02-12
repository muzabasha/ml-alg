@echo off
cls
echo ========================================
echo   COMPREHENSIVE BUILD TEST
echo ========================================
echo.
echo This will test the build locally to catch
echo any issues before Vercel deployment.
echo.
echo ========================================
echo.

echo Changing to frontend directory...
pushd "%~dp0frontend"

echo.
echo [1/3] TypeScript Type Check...
echo.
call npm run typecheck
if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo   ✗ TYPESCRIPT ERRORS FOUND
    echo ========================================
    echo.
    echo Please fix the TypeScript errors above.
    echo.
    popd
    pause
    exit /b 1
)
echo.
echo      ✓ TypeScript check passed
echo.

echo [2/3] Next.js Lint Check...
echo.
call npm run lint
if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo   ⚠ LINT WARNINGS FOUND
    echo ========================================
    echo.
    echo Continuing with build...
    echo.
)
echo.
echo      ✓ Lint check completed
echo.

echo [3/3] Production Build...
echo.
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo   ✗ BUILD FAILED
    echo ========================================
    echo.
    echo Check the error messages above.
    echo Fix the issues and try again.
    echo.
    popd
    pause
    exit /b 1
)

popd

echo.
echo ========================================
echo   ✅ ALL TESTS PASSED!
echo ========================================
echo.
echo ✓ TypeScript: No errors
echo ✓ Build: Successful
echo ✓ Ready for deployment
echo.
echo Your code is ready to push to GitHub.
echo Vercel deployment should succeed.
echo.
echo ========================================
echo.
pause
