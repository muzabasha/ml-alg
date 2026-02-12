@echo off
echo ========================================
echo Transformer Attention Playground Demo
echo ========================================
echo.
echo This will start the ML Learning Platform
echo and open the Transformer playground.
echo.
echo Features you'll see:
echo.
echo 🤖 Interactive Attention Visualization
echo    - Click tokens to see attention patterns
echo    - Curved lines show attention flow
echo    - Color intensity = attention strength
echo.
echo 📊 Attention Matrix
echo    - Full token-to-token weights
echo    - Color-coded by intensity
echo    - Softmax normalized
echo.
echo ⚙️ Adjustable Parameters
echo    - Attention heads (1-8)
echo    - Layers (1-6)
echo    - Embedding dimension (32-128)
echo    - Temperature (0.1-2.0)
echo.
echo ✍️ Interactive Input
echo    - Type custom sentences
echo    - 5 sample sentences included
echo    - Real-time tokenization
echo.
echo Press any key to start the server...
pause >nul
echo.
echo Starting development server...
echo.
echo Once started, the playground will be at:
echo http://localhost:3000/algorithm/transformer
echo.
echo Click "Show Attention Playground" button!
echo.
cd frontend
npm run dev
