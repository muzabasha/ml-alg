@echo off
cls
echo ========================================
echo   QUICK BUILD TEST
echo ========================================
echo.

pushd "%~dp0frontend"

echo [1/2] TypeScript Check...
call npm run typecheck
if %errorlevel% neq 0 (
    echo ✗ TypeScript failed
    popd
    pause
    exit /b 1
)
echo ✓ TypeScript OK
echo.

echo [2/2] Production Build...
call npm run build
if %errorlevel% neq 0 (
    echo ✗ Build failed
    popd
    pause
    exit /b 1
)
echo ✓ Build OK
echo.

popd

echo ========================================
echo   ✅ SUCCESS!
echo ========================================
echo.
echo Ready for deployment!
echo.
pause
