@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ============================================
echo   Avajang Online Shop  ^|  سامانه فروشگاه آواژنگ
echo ============================================
echo.
echo   Server is starting...  |  بعد از چند ثانیه مرورگر باز مي‌شود
echo   To stop, close this window.  |  براي دريافت Ctrl+C بزنيد
echo.
start "" cmd /c "timeout /t 6 /nobreak >nul & start http://localhost:3000"
npm run dev
echo.
echo Press any key to close...
pause >nul