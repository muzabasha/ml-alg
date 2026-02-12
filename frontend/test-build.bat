@echo off
echo Testing TypeScript...
call npx tsc --noEmit
if %errorlevel% neq 0 (
    echo TypeScript check failed!
    pause
    exit /b 1
)
echo TypeScript OK!
echo.
echo Building...
call npm run build
if %errorlevel% neq 0 (
    echo Build failed!
    pause
    exit /b 1
)
echo Build successful!
pause
