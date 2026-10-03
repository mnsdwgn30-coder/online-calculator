@echo off
echo ==============================================
echo Building and Deploying to Cloudflare Pages...
echo ==============================================

echo [1/2] Building Astro project...
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Build failed! Check errors above.
    pause
    exit /b %ERRORLEVEL%
)

echo [2/2] Deploying to Cloudflare Pages...
call npx wrangler pages deploy dist --project-name=online-calculator

echo ==============================================
echo Deployment completed!
echo ==============================================
pause
