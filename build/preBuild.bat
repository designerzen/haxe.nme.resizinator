set DEPLOY_DIR=%CD%
set APP_NAME=%1

@echo off
taskkill /f /fi "IMAGENAME eq FlashPlayerDebugger.exe"

rem MKDIR %DEPLOY_DIR%\bin\html5\web\bin\css
rem XCOPY %DEPLOY_DIR%\src\html\css\style.min.css %DEPLOY_DIR%\bin\html5\web\bin\css /y /v /i
