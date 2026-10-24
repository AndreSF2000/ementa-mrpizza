@echo off
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
    echo.
    echo  Node.js nao encontrado.
    echo  Instala em https://nodejs.org e volta a abrir este atalho.
    echo.
    pause
    exit /b 1
)

rem Se o servidor ja estiver a correr, apenas abre o browser.
netstat -ano | findstr /r /c:"127.0.0.1:8099 .*LISTENING" >nul 2>nul
if errorlevel 1 (
    echo A iniciar servidor do editor...
    start "Editor MR Pizza" cmd /k "cd /d "%~dp0" && node editor\servidor.js && pause"
    timeout /t 4 /nobreak >nul
)

echo A abrir editor em http://127.0.0.1:8099
start "" "http://127.0.0.1:8099"
timeout /t 2 /nobreak >nul



