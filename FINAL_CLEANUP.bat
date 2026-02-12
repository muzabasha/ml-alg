@echo off
echo Cleaning up temporary files...

REM Delete temporary docs (ignore errors if files don't exist)
for %%f in (
    ALL_TYPESCRIPT_FIXES.md
    BUILD_ERROR_FIXED.md
    BUILD_FIXED.md
    CLEANUP_AND_PUSH.bat
    COMMIT_SUMMARY.md
    COMPLETE_PLATFORM_SUMMARY.md
    DATASET_EXPLORER_COMPLETE.md
    DEPLOYMENT_FIXED_SUMMARY.md
    DEPLOYMENT_NEXT_STEPS.md
    DEPLOYMENT_READY.md
    DEPLOYMENT_STATUS.md
    ENHANCED_STYLING_GUIDE.md
    FINAL_PLATFORM_SUMMARY.md
    FIX_LATEX_DISPLAY.md
    KMEANS_ADDED.md
    LATEX_IMPLEMENTATION.md
    LATEX_TROUBLESHOOTING.md
    ML_PLAYGROUND_GUIDE.md
    ML_PLAYGROUND_IMPLEMENTATION.md
    NAIVE_BAYES_INTEGRATION.md
    NEURAL_NETWORK_PLAYGROUND.md
    PLAYGROUNDS_COMPLETE.md
    PLAYGROUNDS_STATUS.md
    PLAYGROUND_IMPLEMENTATION.md
    PRE_PUSH_CHECKLIST.md
    PROJECT_COMPLETE.md
    README_PUSH.md
    SAMPLE_IO_VERIFICATION_SUMMARY.md
    SECOND_FIX_APPLIED.md
    TESTING_CHECKLIST.md
    TRANSFORMER_PLAYGROUND_COMPLETE.md
    TRANSFORMER_PLAYGROUND_GUIDE.md
    TROUBLESHOOTING.md
    UIUX_IMPROVEMENTS_APPLIED.md
    VERCEL_DEPLOYMENT_DIAGNOSTIC.md
    VERCEL_DEPLOYMENT_GUIDE.md
    VERCEL_DEPLOY_NOW.md
    VERCEL_DIAGNOSTIC.md
    VERCEL_FIX_NOW.md
    VERCEL_QUICK_FIX.md
    VERCEL_SETUP_INSTRUCTIONS.md
    VERCEL_TROUBLESHOOTING_CHECKLIST.md
    VERIFY_SAMPLE_IO_COMPLETE.md
    VISUALIZATION_GUIDE.md
    VISUALIZATION_IMPLEMENTATION.md
    WHATS_NEW.md
    WHATS_NEW_VISUALIZATIONS.md
    WHY_VERCEL_NOT_UPDATING.md
) do if exist %%f del /q %%f

REM Delete test scripts
for %%f in (
    AUDIT_PROJECT.bat
    CHECK_DEPLOYMENT_STATUS.bat
    CHECK_KATEX.bat
    CHECK_VERCEL_SETUP.bat
    COMPREHENSIVE_AUDIT.bat
    FORCE_VERCEL_DEPLOY.bat
    GIT_COMMIT_LATEX.bat
    INSTALL_CHARTS.bat
    INSTALL_LATEX.bat
    LOCAL_DEPLOY_TEST.bat
    PUSH_NOW.bat
    PUSH_TO_GITHUB.bat
    PUSH_TO_GITHUB_FINAL.bat
    QUICK_PUSH.bat
    SAMPLE_IO_VISUAL_TEST.bat
    SMART_START.bat
    START_COMPLETE_PLATFORM.bat
    START_TRANSFORMER_DEMO.bat
    START_WITH_NAIVE_BAYES.bat
    TEST_DATASET_EXPLORER.bat
    TEST_EQUATIONS.bat
    TEST_LATEX.bat
    TEST_ML_PLAYGROUND.bat
    TEST_NAIVE_BAYES.bat
    TEST_PLAYGROUND.bat
    TEST_SAMPLE_IO_RENDERING.bat
    TEST_TRANSFORMER_PLAYGROUND.bat
    TEST_VISUALIZATIONS.bat
) do if exist %%f del /q %%f

echo Cleanup complete!
echo.
echo Staging changes...
git add -A

echo.
echo Creating commit...
git commit -m "chore: cleanup temporary files and prepare for production"

echo.
echo Pushing to GitHub...
git push origin main

echo.
echo ========================================
echo   DONE!
echo ========================================
echo.
echo Repository: https://github.com/muzabasha/ml-alg
echo.
pause
