@echo off
cls
echo ========================================
echo   TESTING LOCAL BUILD
echo ========================================
echo.

pushd frontend

echo [1/2] TypeScript Check...
call npx tsc --noEmit
if %errorlevel% neq 0 (
    echo.
    echo ✗ TypeScript errors found
    popd
    pause
    exit /b 1
)
echo      ✓ TypeScript OK
echo.

echo [2/2] Production Build...
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo ✗ Build failed
    popd
    pause
    exit /b 1
)
echo      ✓ Build successful
echo.

popd

echo ========================================
echo   ✅ ALL TESTS PASSED!
echo ========================================
echo.
echo Your code is ready for deployment.
echo Vercel build should succeed.
echo.
pause
