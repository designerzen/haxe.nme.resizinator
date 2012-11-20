/*

@author zen

*/
// create our global Class Object
if (typeof NME == 'undefined') NME = {};

NME.Embed = 
{
	// == Vars ==
	
	success:false,
		
	options:{
		id:"haxe:jeash",
		js:"js/nme.application.js",
		swf:"swf/nme.application.swf",
		expressSWF:"swf/express.install.swf",
		swfObject:"http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js",
		swfVersion:"9.0.0",
		loadingClass:"preloading",
		failClass:"fail",
		verbose:false,
		forceFlash:false,
		map:function( source ) 
		{
			var target = this;
			for ( var prop in source ) if ( target.hasOwnProperty( prop ) ) target[ prop ] = source[ prop ];
			return target;
		},
		toString:function()
		{
			return "Config #"+this.id;
		}
	},
	
	// == Utils ==
	
	// If verbose is set to true then display our log file with debug data
	log:function( message ){ if ( this.options.verbose ) console.log( message ); },
	// rescope scope for a method
	rescope:function (scope, fn) {	return function () { fn.apply(scope, arguments); }; },
	//Does the browser support canvas and Jeash?
	canvasSupported:function(){	return !!window.HTMLCanvasElement;	},
	// Does the user have flash installed on their machine
	hasFlash:function()
	{
		try {
			var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
			if (fo) return true;
		}catch(e){
			if (navigator.mimeTypes ["application/x-shockwave-flash"] != undefined) return true;
		}
		return false;
	},
	
	
	// == User Interface ==
	
	// add loading classes to <body>
	showLoader:function(){ this.body.className += ' ' + this.options.loadingClass;	},
	// remove body load class	
	hideLoader:function(){ this.body.className = this.body.className.replace( " "+this.options.loadingClass, ''); },
	
	// == Public Methods ==
	
	/*/////////////////////////////////////////////////////
	Embed your app with the following options :
	/////////////////////////////////////////////////////*/
	script:function ( config )
	{
		// save a reference to the <body> for adding classes to
		this.body = document.getElementsByTagName('body')[0];
		
		// Immediately add the loading class to <body>
		this.showLoader();
		
		// Expand the options from config
		this.options.map( config );
		
		// Create the data node if does not already exist and add to body
		var node = '<div class="flexible" id="'+this.options.id+'" style="width:100%; height:100%" data-framerate="60"></div>';
		var trace = '<!-- <div id="haxe:trace" style="position:absolute; z-index:2147483647;"></div> -->';
		
		// Degrade if no canvas support 
		var useFlash = !this.canvasSupported() ;//|| SWFObject.getQueryParamValue("flash");

		// Over-ride
		if ( this.options.forceFlash ) useFlash = true;
		
		// Log
		this.log( "Embed > is canvas supported? "+this.canvasSupported() );
		this.log( "Embed > using "+( useFlash ? 'Flash' : 'Jeash' )+" with "+this.options );
		
		if ( !useFlash )
		{
			// canvas available so lets use JS version 
			this.addScript( this.options.js, this.onSuccess );
		}else{
			// no html5, favour flash at this point but is flash available!?
			if ( this.hasFlash() ) 
			{
				this.addScript( this.options.swfObject, this.onSWFLoading );
				this.onSWFLoading();
			}else{
				// ultimate failure :(
				this.onFail();
			}
		}
	},


	/*/////////////////////////////////////////////////////
	Embed a SWF into our Haxe DIV
	/////////////////////////////////////////////////////*/
	swf:function( config )
	{
		var
			flashVars 	= {},
			parameters 	= { 
				allowscriptaccess:true, 
				allowfullscreen:true, 
				allownetworking:true, 
				wmode:"opaque",
				menu: "false",
				scale: "noScale"
			},
			attributes = {
				id:"haxe-jeash"
			};	
		swfobject.embedSWF( config.swf, config.id, "100%", "100%", config.swfVersion, config.expressSWF, {}, parameters, flashVars );
		this.onSuccess();
	},

	/*/////////////////////////////////////////////////////
	 Add a JS script to the header to load and optionally
	 Monitor the load progress with a callback method
	/////////////////////////////////////////////////////*/
	addScript:function( url , callback )
	{
		this.log( "Embed > Injecting Script "+url+(callback!=undefined ? " with a callback" : "" ) );
		
		var app = document.createElement("script");
		app.setAttribute("type","text/javascript");
		app.setAttribute("src", url );
		
		// callback on load
		if ( callback != undefined ) app.addEventListener('load', this.rescope( this, callback ), true);

		document.getElementsByTagName("head")[0].appendChild(app);
	},

	/*/////////////////////////////////////////////////////
	EVENT : Flash Required and Propogated
	/////////////////////////////////////////////////////*/
	onSWFLoading:function()
	{
		clearInterval( this.interval );
		
		// check to see if script is ready otherwise wait!
		if (typeof swfobject != 'undefined')
		{
			// script available
			var appropriate = swfobject.hasFlashPlayerVersion( this.options.swfVersion );//|| SWFObject.getQueryParamValue("flash");
			
			this.log( "Embed > has flash :"+this.hasFlash() + " version required :"+this.options.swfVersion+" is suitable :"+appropriate );
			
			// check version & inject or die & ensure correct scope
			if ( appropriate )	this.swf( this.options );
			else this.onFail();
			
		}else{
			// start timing loop and call this again
			this.log( "Embed > Stll waiting for swfObject to load");
			this.interval = setTimeout( this.rescope( this, this.onSWFLoading ), 100 ); 
		}
	},
	
	/*/////////////////////////////////////////////////////
	EVENT : SUCCESS > Yay!!!
	/////////////////////////////////////////////////////*/
	onSuccess:function()
	{
		this.hideLoader();
		this.success = true;
		this.log( "Success ========================== " );
	},

	/*/////////////////////////////////////////////////////
	EVENT : FAIL > No way of adding media - show info panel
	/////////////////////////////////////////////////////*/
	onFail:function()
	{
		this.hideLoader();
		this.body.className += ' ' + this.options.failClass;
		this.success = false;
		this.log( "Fail =============================" );
	}
	// FIN.
};