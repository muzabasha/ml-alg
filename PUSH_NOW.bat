@echo off
echo ========================================
echo   Push to GitHub
echo ========================================
echo.
echo Repository: https://github.com/muzabasha/ml-alg
echo.
echo You will be prompted for:
echo   Username: muzabasha
echo   Password: Your Personal Access Token
echo.
echo If you don't have a token:
echo   1. Visit: https://github.com/settings/tokens
echo   2. Generate new token (classic)
echo   3. Select 'repo' scope
echo   4. Copy and use as password
echo.
echo ========================================
echo   Pushing to GitHub...
echo ========================================
echo.

git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   SUCCESS! 
    echo ========================================
    echo.
    echo Your code is now on GitHub!
    echo Visit: https://github.com/muzabasha/ml-alg
    echo.
) else (
    echo.
    echo ========================================
    echo   Push Failed
    echo ========================================
    echo.
    echo Common issues:
    echo 1. Repository doesn't exist on GitHub
    echo 2. Wrong credentials
    echo 3. No internet connection
    echo.
    echo Please check and try again.
    echo.
)

pause
