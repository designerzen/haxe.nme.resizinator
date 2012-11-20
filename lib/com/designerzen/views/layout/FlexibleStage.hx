/*/////////////////////////////////////////////////////////////////////////////////////

Usage :
	
	- Extend this class and over-ride the "resize" method
	
* HTML5 Compatible : Designed for use with Jeash / Haxe NME

_______________________________________________________________________________________

Check out the example html files aand appropriate css in the bin folder

/////////////////////////////////////////////////////////////////////////////////////*/
package com.designerzen.views.layout;

import com.designerzen.controllers.StageMediator;
import com.designerzen.models.events.ResizeEvent;
import nme.display.Sprite;
import nme.errors.Error;
import nme.events.Event;
import nme.geom.Rectangle;

class FlexibleStage extends Sprite
{
	static private var stageManager:StageMediator;

	// Constructor : Takes defaultSizes as paramaters
	public function new() 
	{
		super();
		addEventListener( Event.ADDED_TO_STAGE, onAddedToStage );
	}
	
	// Stage is available
	private function onAddedToStage(e:Event):Void 
	{
		removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
		// check to see if we have an instance of stage resizer in memory
		if ( stageManager == null ) stageManager = new StageMediator();
		// now watch for stage resizing
		stageManager.addEventListener( ResizeEvent.RESIZE , onStageResized );
		// updatesize before it is addded
		resize( stage.stageWidth, stage.stageHeight );
		// added to stage helper
		added();
	}
	
	private function added() 
	{
		
	}
	
	private function onStageResized( event:ResizeEvent ):Void
	{
		resize( event.width, event.height );
	}
	
	// Over-ride this
	public function resize( stageWidth:Float, stageHeight:Float ):Void
	{
		throw new Error( "You must over-ride the resize() method in your class but do *not* call super.resize() from within" );
	}
	
}