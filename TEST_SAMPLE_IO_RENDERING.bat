@echo off
echo ========================================
echo Testing Sample I/O Section Rendering
echo ========================================
echo.

echo Checking which algorithms use which section name...
echo.

echo Classical ML Algorithms (should use "sample_io"):
echo.

findstr /C:"\"sample_io\"" "frontend\public\data\linear_regression.json" >nul
if %errorlevel%==0 (
    echo ✓ Linear Regression uses sample_io
) else (
    echo ✗ Linear Regression missing sample_io
)

findstr /C:"\"sample_io\"" "frontend\public\data\logistic_regression.json" >nul
if %errorlevel%==0 (
    echo ✓ Logistic Regression uses sample_io
) else (
    echo ✗ Logistic Regression missing sample_io
)

findstr /C:"\"sample_io\"" "frontend\public\data\knn.json" >nul
if %errorlevel%==0 (
    echo ✓ KNN uses sample_io
) else (
    echo ✗ KNN missing sample_io
)

findstr /C:"\"sample_io\"" "frontend\public\data\kmeans.json" >nul
if %errorlevel%==0 (
    echo ✓ K-Means uses sample_io
) else (
    echo ✗ K-Means missing sample_io
)

findstr /C:"\"sample_io\"" "frontend\public\data\naive_bayes.json" >nul
if %errorlevel%==0 (
    echo ✓ Naive Bayes uses sample_io
) else (
    echo ✗ Naive Bayes missing sample_io
)

findstr /C:"\"sample_io\"" "frontend\public\data\decision_tree.json" >nul
if %errorlevel%==0 (
    echo ✓ Decision Tree uses sample_io
) else (
    echo ✗ Decision Tree missing sample_io
)

findstr /C:"\"sample_io\"" "frontend\public\data\svm.json" >nul
if %errorlevel%==0 (
    echo ✓ SVM uses sample_io
) else (
    echo ✗ SVM missing sample_io
)

echo.
echo Deep Learning Algorithms (checking both names):
echo.

findstr /C:"\"sample_io\"" "frontend\public\data\ann.json" >nul
if %errorlevel%==0 (
    echo ✓ ANN uses sample_io
) else (
    findstr /C:"\"sample_input_output\"" "frontend\public\data\ann.json" >nul
    if %errorlevel%==0 (
        echo ⚠ ANN uses sample_input_output ^(needs standardization^)
    ) else (
        echo ✗ ANN missing sample section
    )
)

findstr /C:"\"sample_io\"" "frontend\public\data\cnn.json" >nul
if %errorlevel%==0 (
    echo ✓ CNN uses sample_io
) else (
    findstr /C:"\"sample_input_output\"" "frontend\public\data\cnn.json" >nul
    if %errorlevel%==0 (
        echo ⚠ CNN uses sample_input_output ^(needs standardization^)
    ) else (
        echo ✗ CNN missing sample section
    )
)

findstr /C:"\"sample_io\"" "frontend\public\data\rnn.json" >nul
if %errorlevel%==0 (
    echo ✓ RNN uses sample_io
) else (
    findstr /C:"\"sample_input_output\"" "frontend\public\data\rnn.json" >nul
    if %errorlevel%==0 (
        echo ⚠ RNN uses sample_input_output ^(needs standardization^)
    ) else (
        echo ✗ RNN missing sample section
    )
)

findstr /C:"\"sample_io\"" "frontend\public\data\transformer.json" >nul
if %errorlevel%==0 (
    echo ✓ Transformer uses sample_io
) else (
    findstr /C:"\"sample_input_output\"" "frontend\public\data\transformer.json" >nul
    if %errorlevel%==0 (
        echo ⚠ Transformer uses sample_input_output ^(needs standardization^)
    ) else (
        echo ✗ Transformer missing sample section
    )
)

echo.
echo ========================================
echo Checking Rendering Component
echo ========================================
echo.

findstr /C:"sample_io" "frontend\src\pages\algorithm\[id].tsx" >nul
if %errorlevel%==0 (
    echo ✓ Component handles sample_io
) else (
    echo ✗ Component missing sample_io handling
)

findstr /C:"sample_input_output" "frontend\src\pages\algorithm\[id].tsx" >nul
if %errorlevel%==0 (
    echo ✓ Component handles sample_input_output
) else (
    echo ⚠ Component may not handle sample_input_output
)

echo.
echo ========================================
echo Summary
echo ========================================
echo.
echo If any algorithms use "sample_input_output" instead of
echo "sample_io", they need to be standardized for consistent
echo rendering across all algorithm pages.
echo.
echo The rendering component in algorithm/[id].tsx should
echo handle both "sample_io" and "sample_input_output" keys
echo to ensure all sections display correctly.
echo.
pause
