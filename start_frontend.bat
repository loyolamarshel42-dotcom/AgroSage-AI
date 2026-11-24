@echo off
echo ========================================================
echo   Starting AgroSage AI React Frontend Server (Port 5173)
echo ========================================================
cd frontend
..\node_bin\node.exe node_modules\vite\bin\vite.js --host
