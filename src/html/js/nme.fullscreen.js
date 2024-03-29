/*////////////////////////////////////////////////////////////////////////////

@author zen

	Switch between modes : call FullScreen.enter() or FullScreen.exit()
	using either ExternalInterface or internal Jeash or even a DOM element
	you can bind a hotkey with the key().bind()

	works in Firefox 10, Safari and Chrome
	
///////////////////////////////////////////////////////////////////////////*/

// create our global Class Object
if (typeof NME == 'undefined') NME = {};

// create our local Class Object
NME.FullScreen = 
{
	/* == */
	enter:function ()
	{
		var docElm = document.documentElement;
		if (docElm.requestFullScreen) docElm.requestFullScreen();
		else if (docElm.mozRequestFullScreen) docElm.mozRequestFullScreen();
		else if (docElm.webkitRequestFullScreen) docElm.webkitRequestFullScreen();
		this.isFullscreen = true;
		document.getElementsByTagName('body')[0].className += ' fullscreen';
	},

	/* == */
	exit:function ()
	{
		var body = document.getElementsByTagName('body')[0];
		if (document.exitFullScreen) document.exitFullScreen();
		else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
		else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
		this.isFullscreen = false;
		body.className = body.className.replace( " fullscreen", '');
	},

	/* == */
	monitor:function ( callback )
	{
		document.addEventListener("FullScreenchange", this.rescope( this, callback ), false);
		document.addEventListener("mozFullScreenchange", this.rescope( this, callback ), false);
		document.addEventListener("webkitFullScreenchange", this.rescope( this, callback ), false);
	},

	/* == */
	onKeyDown:function (event)
	{
		// Don't trigger if in a Input field, Textarea fields
		var element;
		if ( event.target) element = event.target;
		else if( event.srcElement ) element = event.srcElement;
		if ( element.nodeType==3 ) element = element.parentNode;
		if ( element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
		
		//Find Which key is pressed
		var keyID;
		if (event.keyCode) keyID = event.keyCode;
		else if (event.which) keyID = event.which;
		var character = String.fromCharCode(keyID).toLowerCase();
		//console.log( 'keypressed '+character+" is it "+this.chosenHotkey );
		
		if ( this.isFullscreen )
		{
			switch( character )
			{
				case "any":
				case this.chosenHotkey:
					this.exit();
					break;
			}
		
		}else{
			switch( character )
			{
				case "any":
				case this.chosenHotkey:
					this.enter();
					break;
			}
		}
	},
	
	rescope:function (scope, fn) {	return function () { fn.apply(scope, arguments); }; },
	
	/* == */
	key:function( id )
	{
		this.chosenHotkey = id;
		//document.onkeyup = function () { NME.FullScreen.onKeyDown.apply(this, arguments); };
		document.onkeyup = this.rescope( this, this.onKeyDown ) ;
	}

};