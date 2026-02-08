@echo off
echo ========================================
echo ML Learning Platform - GitHub Setup
echo ========================================
echo.

echo Step 1: Initializing Git repository...
git init
if %errorlevel% neq 0 (
    echo ERROR: Git initialization failed. Is Git installed?
    pause
    exit /b 1
)
echo ✓ Git repository initialized
echo.

echo Step 2: Adding all files...
git add .
if %errorlevel% neq 0 (
    echo ERROR: Failed to add files
    pause
    exit /b 1
)
echo ✓ Files added
echo.

echo Step 3: Creating initial commit...
git commit -m "Initial commit: ML Learning Platform with 5 algorithms and instructor profile"
if %errorlevel% neq 0 (
    echo ERROR: Commit failed
    pause
    exit /b 1
)
echo ✓ Initial commit created
echo.

echo Step 4: Adding remote repository...
git remote add origin https://github.com/muzabasha/ml-alg.git
if %errorlevel% neq 0 (
    echo Note: Remote might already exist, continuing...
    git remote set-url origin https://github.com/muzabasha/ml-alg.git
)
echo ✓ Remote repository configured
echo.

echo Step 5: Renaming branch to main...
git branch -M main
echo ✓ Branch renamed to main
echo.

echo ========================================
echo Ready to push to GitHub!
echo ========================================
echo.
echo Next steps:
echo 1. Make sure you have created the repository on GitHub:
echo    https://github.com/muzabasha/ml-alg
echo.
echo 2. Run the following command to push:
echo    git push -u origin main
echo.
echo 3. You may need to authenticate with:
echo    - Username: muzabasha
echo    - Password: Your GitHub Personal Access Token
echo.
echo To create a Personal Access Token:
echo 1. Go to GitHub Settings
echo 2. Developer settings
echo 3. Personal access tokens
echo 4. Generate new token (classic)
echo 5. Select 'repo' scope
echo 6. Copy and use as password
echo.
pause
