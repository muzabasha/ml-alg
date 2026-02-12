@echo off
echo ========================================
echo Sample I/O Visual Verification Guide
echo ========================================
echo.
echo This guide will help you visually verify that all
echo sample I/O sections render correctly.
echo.
echo ========================================
echo Step-by-Step Testing
echo ========================================
echo.
echo 1. Start the development server:
echo    cd frontend
echo    npm run dev
echo.
echo 2. Open your browser to: http://localhost:3000
echo.
echo 3. Test each algorithm's sample I/O section:
echo.
echo    CLASSICAL ML ALGORITHMS:
echo    ------------------------
echo    ✓ Linear Regression
echo      URL: http://localhost:3000/algorithm/linear_regression
echo      Section: "Sample Input ^& Output"
echo      Expected: House price prediction example
echo      Visualization: Scatter plot with regression line
echo.
echo    ✓ Logistic Regression
echo      URL: http://localhost:3000/algorithm/logistic_regression
echo      Section: "Sample Input ^& Output"
echo      Expected: Student exam pass/fail example
echo      Visualization: Classification boundary
echo.
echo    ✓ K-Nearest Neighbors
echo      URL: http://localhost:3000/algorithm/knn
echo      Section: "Sample Input ^& Output"
echo      Expected: Iris flower classification
echo      Visualization: Scatter plot with neighbors
echo.
echo    ✓ K-Means Clustering
echo      URL: http://localhost:3000/algorithm/kmeans
echo      Section: "Sample Input ^& Output"
echo      Expected: Customer segmentation
echo      Visualization: Cluster visualization
echo.
echo    ✓ Naive Bayes
echo      URL: http://localhost:3000/algorithm/naive_bayes
echo      Section: "Sample Input ^& Output"
echo      Expected: Email spam detection
echo      Visualization: Probability bars
echo.
echo    ✓ Decision Tree
echo      URL: http://localhost:3000/algorithm/decision_tree
echo      Section: "Sample Input ^& Output"
echo      Expected: Tennis playing decision
echo      Visualization: Tree structure
echo.
echo    ✓ Support Vector Machine
echo      URL: http://localhost:3000/algorithm/svm
echo      Section: "Sample Input ^& Output"
echo      Expected: Binary classification
echo      Visualization: Hyperplane and margins
echo.
echo    DEEP LEARNING ALGORITHMS:
echo    -------------------------
echo    ✓ Artificial Neural Network
echo      URL: http://localhost:3000/algorithm/ann
echo      Section: "Sample Input ^& Output"
echo      Expected: Handwritten digit classification
echo      Format: Input shape [784], Output shape [10]
echo.
echo    ✓ Convolutional Neural Network
echo      URL: http://localhost:3000/algorithm/cnn
echo      Section: "Sample Input ^& Output"
echo      Expected: Image classification
echo      Format: Input shape [28,28,1], Output shape [10]
echo.
echo    ✓ Recurrent Neural Network
echo      URL: http://localhost:3000/algorithm/rnn
echo      Section: "Sample Input ^& Output"
echo      Expected: Sequence prediction
echo      Format: Input shape [sequence_length, features]
echo.
echo    ✓ Transformer Network
echo      URL: http://localhost:3000/algorithm/transformer
echo      Section: "Sample Input ^& Output"
echo      Expected: Text translation or generation
echo      Format: Token sequences with attention
echo.
echo ========================================
echo Visual Checklist
echo ========================================
echo.
echo For EACH algorithm, verify:
echo.
echo [ ] Section has green gradient background
echo [ ] Left border is green accent
echo [ ] Chart icon (📊) is displayed
echo [ ] Title is clear and readable
echo [ ] Description explains the problem
echo [ ] Input data is well-formatted
echo [ ] Output data is clearly shown
echo [ ] Calculations/walkthrough is present
echo [ ] Code blocks have syntax highlighting
echo [ ] Tables are properly aligned
echo [ ] Visualization loads (if applicable)
echo [ ] Responsive design works on mobile
echo.
echo ========================================
echo Common Issues to Check
echo ========================================
echo.
echo ✗ Section not displaying
echo   → Check browser console for errors
echo   → Verify JSON file exists in /public/data/
echo   → Check section key name in JSON
echo.
echo ✗ Styling looks wrong
echo   → Clear browser cache
echo   → Check Tailwind CSS is loaded
echo   → Inspect element in DevTools
echo.
echo ✗ Visualization not loading
echo   → Check Chart.js dependencies
echo   → Verify DataVisualization component
echo   → Look for console errors
echo.
echo ✗ Content is cut off
echo   → Check responsive breakpoints
echo   → Test on different screen sizes
echo   → Verify overflow handling
echo.
echo ========================================
echo Quick Test Commands
echo ========================================
echo.
echo # Check if all JSON files exist
echo dir frontend\public\data\*.json
echo.
echo # Verify no TypeScript errors
echo cd frontend
echo npm run build
echo.
echo # Test on different devices
echo # Desktop: http://localhost:3000
echo # Mobile: http://[your-ip]:3000
echo.
echo ========================================
echo Expected Results
echo ========================================
echo.
echo ✅ All 11 algorithms display sample I/O section
echo ✅ Green theme is consistent across all
echo ✅ Content is readable and well-formatted
echo ✅ Visualizations load smoothly
echo ✅ No console errors
echo ✅ Responsive design works
echo ✅ Professional appearance
echo.
echo ========================================
echo Report Issues
echo ========================================
echo.
echo If you find any issues:
echo 1. Note the algorithm name
echo 2. Describe what's wrong
echo 3. Check browser console
echo 4. Take a screenshot
echo 5. Report for fixing
echo.
echo ========================================
echo Testing Complete!
echo ========================================
echo.
echo Once you've verified all sections, the
echo sample I/O rendering is confirmed working!
echo.
pause
