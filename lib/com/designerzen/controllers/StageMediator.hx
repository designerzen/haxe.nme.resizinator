/*/////////////////////////////////////////////////////////////////////////////////////

Usage :
	
	- Simply subscribe to the resizeEvent dispatched 
	- You can create an instance with new StageMediator()
	- Or access this like a singelton using StageMediator.getInstance() or StageMediator.global

* HTML5 Compatible

_______________________________________________________________________________________

Set up index.html like so :

<div 
	id="haxe:jeash" 
	style="background-color: #000000; width: 100%; height: 100%" 
	data-framerate="60"
></div>

/////////////////////////////////////////////////////////////////////////////////////*/
package com.designerzen.controllers;

import com.designerzen.models.events.ResizeEvent;
import nme.display.Stage;
import nme.events.Event;
import nme.events.EventDispatcher;
import nme.events.TimerEvent;
import nme.geom.Rectangle;
import nme.Lib;
import nme.utils.Timer;

class StageMediator extends EventDispatcher
{
	#if iphone
	static inline public var DELAY:Int = 50;	
	#elseif flash
	static inline public var DELAY:Int = 2;	
	#elseif js
	static inline public var DELAY:Int = 50;
	#else
	static inline public var DELAY:Int = 10;
	#end
	
	// Singleton if required
	static inline public var global( getInstance, null ):StageMediator;
	static public var instance:StageMediator;
	static inline public function getInstance():StageMediator
	{
		if ( instance == null ) instance = new StageMediator();
		return instance;
	}
	
	// Internals
	private var timeStamp:Int;
	private var timer:Timer;

	// An easy way to read all dimensions in one go
	public var viewPort:Rectangle;
	public var stage:Stage;
	
	// A simple width / height shortcut 16/9, 4/3, etc.
	public var aspectRatio ( getAspectRatio, null ) :Float;
	public var width ( getWidth, null ):Int;
	public var height ( getHeight, null ):Int;
	
	private function getAspectRatio():Float
	{
		return viewPort.width / viewPort.height;
	}

	private function getWidth():Int
	{
		return Std.int( viewPort.width );
	}
	private function getHeight():Int
	{
		return Std.int( viewPort.height );
	}
	
	// Construct
	public function new() 
	{
		super();
		timer = new Timer( DELAY, 1 );
		timeStamp = Lib.getTimer();
		stage = Lib.current.stage;
		viewPort = new Rectangle( 0, 0, stage.stageWidth, stage.stageHeight );
		stage.addEventListener( Event.RESIZE, onStageResizing );
		timer.addEventListener( TimerEvent.TIMER, onStageResized );
	}
	
	/////////////////////////////////////////////////////////////////////////////////////
	// Tell the world about it!
	/////////////////////////////////////////////////////////////////////////////////////
	private function dispatch():Void
	{
		viewPort.width = stage.stageWidth;
		viewPort.height = stage.stageHeight;
		dispatchEvent( new ResizeEvent( stage.stageWidth, stage.stageHeight ) );		
	}
	
	/////////////////////////////////////////////////////////////////////////////////////
	// EVENT : On Resize of DIV in html
	// Stage has been resized... do some checks here to see if the user is still
	// scaling the screen as no neeed to update it on every frame, only after a delay
	/////////////////////////////////////////////////////////////////////////////////////
	private function onStageResizing( event:Event ):Void
	{
		// Nothing has changed so no need to do anything
		if ( (viewPort.width == stage.stageWidth) && ( viewPort.height == stage.stageHeight ) ) return;
		
		// Check to see if a large amount of time has passed since the last time this method was called
		// and instantly refresh if so
		var now:Int = Lib.getTimer();
		var elapsed:Int = now - timeStamp;
		if ( elapsed > DELAY * 4 )
		{
			dispatch();
			timeStamp = now;
			return;
		}
		
		// Either dimension is growing! immediate dispatch if X millseconds elapsed!
		if ( (viewPort.width < stage.stageWidth) || ( viewPort.height < stage.stageHeight ) )
		{
			dispatch();
			return;
		}
		
		// So the user is shrinking the window...
		// first of all check to see if the timer is running at all,
		// and if NOT, then immediately dispatch resize event
		if ( !timer.running ) 
		{
			dispatch();
			timer.start();
		}else {
			// wait a very small time to check to see if it is still scaling,
			// and if so rest the timer
			timer.reset();
			timer.start();
		}
	}
	
	/////////////////////////////////////////////////////////////////////////////////////
	// EVENT : On completed time checks - safe to resize!
	/////////////////////////////////////////////////////////////////////////////////////
	private function onStageResized(  event:TimerEvent  ):Void
	{
		timeStamp = Lib.getTimer();
		dispatch();
		timer.stop();
	}
}