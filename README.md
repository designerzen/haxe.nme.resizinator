haxe.nme.resizinator
====================

Haxe NME / JEASH Resizinator Suite (with examples)

See the deploy/ folder for how to set it up.

Included is a useful degradation script that allows you to check to see if your app will work with the user's browser and if not it will load in the flash equivalent


Compilation
====================

NB: If you change the style.css source file in src/html/css be sure to save it as this will automatically update the style.min.css file that is used in the distribution!

To deploy your project to use these scripts, click build and this will compile to your specified platform in the bin/ folder, as well as creating a deploy/ folder with everything you need in one folder.
On top of that, it will create a dist/project_name folder which you can safely work on any customisations without worrying about having them overwritten.

So, if you want customised versions of your build, you can alter anything in the dist/project_name folder as only missing dependencies will get resolved,. The only exception to this is if you update your build in which case it will only overwrite your application files in js and in flash.

There is an ant task that can automate your distribution to some extents
Running the ANT task will copy all the files from your project into their appropriate folders in the deploy/ directory.

You can then either run the ANT task "Upload" (making sure that your configuration details in the build.config are correct)