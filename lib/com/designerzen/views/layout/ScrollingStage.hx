package com.designerzen.views.layout;

import nme.display.DisplayObject;
import nme.display.GradientType;
import nme.display.Sprite;
import nme.events.Event;

/**
 * ...
 * @author zen
 */

class ScrollingStage extends FlexibleStage
{

	private var canvas:Sprite;
	private var marginX:Int = 100;
	private var marginY:Int = 100;
	
	public function new() 
	{
		canvas = new Sprite();
		super();
	}
	
	override private function added():Dynamic 
	{
		super.added();
		addChild( canvas );
		addEventListener( Event.ENTER_FRAME, onEveryFrame );
	}
	
	public function setCanvasSize( w:Float, h:Float ):Void
	{
		canvas.graphics.clear();
		//canvas.graphics.beginFill( 0xff0000, 0.5 );
		canvas.graphics.beginGradientFill( GradientType.LINEAR, [ 0xffffff, 0xededed ] , [ 1,1 ] , [0,255] );
		canvas.graphics.drawRect(0, 0, w+marginX*2, h+marginY*2 );
		canvas.graphics.endFill();
	}
	
	override public function resize( stageWidth:Float, stageHeight:Float ):Void 
	{
		
	}
	
	public function addChildHere( child:DisplayObject, locationX:Float, locationY:Float ):DisplayObject
	{
		// TODO : Add margins?
		child.x = locationX + marginX;
		child.y = locationY + marginY;
		return canvas.addChild( child );
	}
	
	private function onEveryFrame( event:Event ):Void 
	{
		// move the stage to the corresponding section
		var percentageX:Float = stage.mouseX  / stage.stageWidth;
		var percentageY:Float = stage.mouseY  / stage.stageHeight;
		canvas.x = percentageX * ( stage.stageWidth - canvas.width );
		canvas.y = percentageY * ( stage.stageHeight - canvas.height );
	}
	
}