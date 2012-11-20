package com.designerzen.models.events;

import nme.events.Event;

class ResizeEvent extends Event
{
	static inline public var RESIZE:String = "stageResized";
	
	public var width:Int;
	public var height:Int;
	
	public function new( stageWidth:Int, stageHeight:Int, bubbles : Bool = false, cancelable : Bool = false ) 
	{
		width = stageWidth;
		height = stageHeight;
		super( RESIZE, bubbles, cancelable );
	}
	
	override public function clone():Event 
	{
		return new ResizeEvent( width, height, bubbles, cancelable );
	}
}