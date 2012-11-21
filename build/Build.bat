set DEPLOY_DIR=%CD%
set APP_NAME=%1

rem Try and work out our app name if not specified...

call %DEPLOY_DIR%/build/postBuild.bat %APP_NAME%

haxelib upgrade
haxelib install jsmin
haxelib run nme build %DEPLOY_DIR%\application.nmml flash
haxelib run nme build %DEPLOY_DIR%\application.nmml html5

call %DEPLOY_DIR%/build/postBuild.bat %APP_NAME%