haxe.nme.resizinator
====================

Haxe NME / JEASH Resizinator Suite (with examples)

This is a simple toolkit to allow you to create Haxe NME projects that resize nicely across platforms.
It is based around a specially configured FlashDevelop project but it is perfectly compatible with any IDE.

Features
====================

* Makes resizing apps simply with cross platform full screen modes provided from custom Haxe classes.

* Includes a fullscreen mode for Jeash as well as browser based resizing for flash.

* Allows for custom css preloaders before the app is even requested! The class 'preloading' is appended to body and removed when loaded.

* Saves on bandwidth as only the appropriate version is ever loaded into memory (so if flash is loaded, the jeash.js script never gets loaded)

* Degrades nicely so that it works in the following order of preference Html5 -> Flash

* Same webpage works on IE6-IE10, Safari, Chrome and Firefox

Degradation process :
1. Firstly check to see if your browser can handle the Jeash Version -> HTML Version
2. If not, check to see if flash is enabled via Javascript and is the correct version -> Flash Version
3. If flash is the wrong version it will try to update itself with expressInstall -> Express Install -> Flash
3. If Javascript is not available, we default to flash -> Flash
4. If Javascript is available, but canvas and flash are not, append a fail class to the body element -> Failure


Instructions
====================

Create your application in the src/haxe/ folder 

The easiest way to implement it is by extending FlexibleStage in your main class  and over-riding the resize method like so :

import com.designerzen.views.layout.FlexibleStage;
class Main extends FlexibleStage
{
	override public function resize(stageWidth:Float, stageHeight:Float):Void 
}

Included in the package is an example html file and an associated css file that is really all you need, but to simplify, improve and streamline your distribution, there is also an embed script written in javascript.

This script (nme.embed.js) is a useful degradation script that allows you to check to see if your app will work with the user's browser and if not it will load in the flash equivalent. In this way, html5 and Jeash are preffered over flash where possible.

See the build/ folder for instructions on how to set it up.


Compilation
====================

NB: If you change the style.css source file in src/html/css be sure to save it as this will automatically update the style.min.css file that is used in the distribution!

To deploy your project to use these scripts, click build and this will compile to your specified platform in the bin/ folder, as well as creating a deploy/ folder with everything you need in one folder.
On top of that, it will create a dist/project_name folder which you can safely work on any customisations without worrying about having them overwritten.

So, if you want customised versions of your build, you can alter anything in the dist/project_name folder as only missing dependencies will get resolved,. The only exception to this is if you update your build in which case it will only overwrite your application files in js and in flash.


TODO
=====================

There is an ant task that can automate your distribution to some extents
Running the ANT task will copy all the files from your project into their appropriate folders in the deploy/ directory.

You can then either run the ANT task "Upload" (making sure that your configuration details in the build.config are correct)