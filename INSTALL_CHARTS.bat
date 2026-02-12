@echo off
echo ========================================
echo Installing Chart.js for Visualizations
echo ========================================
echo.

cd frontend

echo [1/3] Installing Chart.js and React wrapper...
call npm install chart.js@^4.4.1 react-chartjs-2@^5.2.0
echo.

echo [2/3] Verifying installation...
if exist "node_modules\chart.js" (
    echo ✓ Chart.js installed successfully
) else (
    echo ✗ Chart.js installation failed
    pause
    exit /b 1
)

if exist "node_modules\react-chartjs-2" (
    echo ✓ react-chartjs-2 installed successfully
) else (
    echo ✗ react-chartjs-2 installation failed
    pause
    exit /b 1
)
echo.

echo [3/3] Testing build...
call npm run build
echo.

echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo Visualizations added:
echo   ✓ Interactive scatter plots
echo   ✓ Line charts for predictions
echo   ✓ Data point visualization
echo   ✓ Fitted line display
echo.
echo Next step: Run SMART_START.bat to test
pause
