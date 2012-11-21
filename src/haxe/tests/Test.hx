package tests;

import com.designerzen.views.layout.FlexibleStage;
import nme.display.Sprite;

class Test extends FlexibleStage
{
	public function new() 
	{
		super();	
	}
	
	// This method gets automatically called when the window size
	// changes dimensions. The new size is available as stageWidth / stageHeight
	override public function resize(stageWidth:Float, stageHeight:Float):Void 
	{
		var halfWidth:Int = Std.int( stageWidth * 0.5 );
		var halfHeight:Int = Std.int( stageHeight * 0.5 );
		var radius:Int = ( halfWidth > halfHeight ) ? halfHeight : halfWidth;
		graphics.clear();
		graphics.beginFill( Std.int( Math.random() * 0xffffff), 0.5 );
		graphics.drawRect( 0, 0, stageWidth, stageHeight);
		graphics.drawCircle( halfWidth, halfHeight, radius );
	}
}
