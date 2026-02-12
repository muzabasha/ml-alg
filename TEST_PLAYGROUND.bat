@echo off
echo ========================================
echo Testing Neural Network Playground
echo ========================================
echo.

cd frontend

echo Step 1: Checking component files...
if exist "src\components\NeuralNetworkPlayground.tsx" (
    echo ✓ NeuralNetworkPlayground component found
) else (
    echo ✗ NeuralNetworkPlayground component NOT found
    echo   Component should be at: src\components\NeuralNetworkPlayground.tsx
    pause
    exit /b 1
)

echo.
echo Step 2: Starting development server...
echo.
echo ========================================
echo TESTING INSTRUCTIONS:
echo ========================================
echo.
echo The Neural Network Playground is available on:
echo   1. Artificial Neural Network (ANN)
echo   2. Convolutional Neural Network (CNN)
echo   3. Recurrent Neural Network (RNN)
echo.
echo How to test:
echo   1. Go to ANN page (opening automatically)
echo   2. Click "Show Interactive Playground" button
echo   3. You should see:
echo      - Network architecture visualization
echo      - Dataset selection buttons
echo      - Layer controls (+/- buttons)
echo      - Training controls (Start/Pause/Reset)
echo      - Data distribution plot
echo.
echo What to test:
echo   ✓ Click different datasets (Circle, XOR, Spiral, Gaussian)
echo   ✓ Add/remove hidden layers
echo   ✓ Adjust neurons per layer
echo   ✓ Change learning rate slider
echo   ✓ Select different activation functions
echo   ✓ Click "Start Training" and watch animation
echo   ✓ Observe epoch count and loss
echo   ✓ Pause and reset training
echo.
echo Expected behavior:
echo   ✓ Network diagram updates when architecture changes
echo   ✓ Data points display in 2D plot
echo   ✓ Training shows animated neuron activations
echo   ✓ Epoch and loss values update
echo   ✓ All controls are responsive
echo.
echo Press Ctrl+C to stop the server when done
echo ========================================
echo.
timeout /t 3
start http://localhost:3000/algorithm/ann
call npm run dev

pause
