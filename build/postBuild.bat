set DEPLOY_DIR=%CD%
set APP_NAME=%1

rem First copy the appropriate files to deploy
echo Deleting Deploy directory
DEL %DEPLOY_DIR%\deploy /q /s /a  
DIR %DEPLOY_DIR%\deploy\ /A:H /B
RMDIR %DEPLOY_DIR%\deploy /Q 

echo Creating directory tree

XCOPY %DEPLOY_DIR%\src\html %DEPLOY_DIR%\deploy /i /e /t /y

echo Adding support files and dependencies
XCOPY %DEPLOY_DIR%\src\html\js\*.js %DEPLOY_DIR%\deploy\js /i /y /v
XCOPY %DEPLOY_DIR%\src\html\img\* %DEPLOY_DIR%\deploy\img /i /y /v /e
XCOPY %DEPLOY_DIR%\src\html\swf\* %DEPLOY_DIR%\deploy\swf /i /y /v /e
XCOPY %DEPLOY_DIR%\src\html\css\style.min.css %DEPLOY_DIR%\deploy\css /i /y /v
rem XCOPY %DEPLOY_DIR%\src\html\style.min.css %DEPLOY_DIR%\deploy\css /i /y /v
XCOPY %DEPLOY_DIR%\src\html\index.html %DEPLOY_DIR%\deploy\ /i /y /v

echo Copying files to deploy folder...
XCOPY %DEPLOY_DIR%\bin\flash\bin\*.swf %DEPLOY_DIR%\deploy\swf /i /y /v
rem FOR /D %d in (*) DO xcopy /S /I %d %DEPLOY_DIR%\deploy\%d
rem XCOPY %DEPLOY_DIR%\bin\html5\web\bin\** %DEPLOY_DIR%\deploy /i /y /v
ROBOCOPY %DEPLOY_DIR%\bin\html5\web\bin\ %DEPLOY_DIR%\deploy *.css *.mp3 *.ogg *.wav *.png *.jpg *.jpeg /E
XCOPY %DEPLOY_DIR%\bin\html5\web\bin\%APP_NAME%.js %DEPLOY_DIR%\deploy\js /i /y /v

rem Now rename some of the file names
REN %DEPLOY_DIR%\deploy\css\style.min.css style.css
REN %DEPLOY_DIR%\deploy\js\%APP_NAME%.js nme.application.js
REN %DEPLOY_DIR%\deploy\swf\%APP_NAME%.swf nme.application.swf

rem And Minify the Javascript
echo Shrinking Javascript Files

haxelib run jsmin %DEPLOY_DIR%\deploy\js\nme.embed.js %DEPLOY_DIR%\deploy\js\nme.embed.js
haxelib run jsmin %DEPLOY_DIR%\deploy\js\nme.fullscreen.js %DEPLOY_DIR%\deploy\js\nme.fullscreen.js
rem haxelib run jsmin %DEPLOY_DIR%\deploy\js\nme.application.js %DEPLOY_DIR%\deploy\js\nme.application.js


rem then overwrite any that don't already exist into dist
echo Now updating your distribution...
XCOPY %DEPLOY_DIR%\deploy\** %DEPLOY_DIR%\dist\%APP_NAME%\ /i /e /y /v /f

echo Your Distribution is now ready