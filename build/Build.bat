set DEPLOY_DIR=%CD%
set APP_NAME=%1

haxelib upgrade
haxelib install jsmin
haxelib run nme build %DEPLOY_DIR%\application.nmml flash
haxelib run nme build %DEPLOY_DIR%\application.nmml html5

call postBuild.bat %APP_NAME%