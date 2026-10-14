@echo off
cd /d "%~dp0"
title Liang Peng Portfolio Preview
set "NODE_EXE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
if exist "%NODE_EXE%" goto run_preview
where node.exe >nul 2>nul
if errorlevel 1 goto node_missing
set "NODE_EXE=node.exe"
:run_preview
"%NODE_EXE%" "%~dp0local-preview-server.mjs"
if errorlevel 1 pause
exit /b %errorlevel%

:node_missing
echo Unable to find Node.js. Open this project in Codex once to restore the runtime.
pause
exit /b 1

