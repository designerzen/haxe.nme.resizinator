
if(typeof NME=='undefined')NME={};NME.Embed={success:false,options:{id:"haxe:jeash",js:"js/nme.application.js",swf:"swf/nme.application.swf",expressSWF:"swf/express.install.swf",swfObject:"http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js",swfVersion:"9.0.0",loadingClass:"preloading",failClass:"fail",verbose:false,forceFlash:false,map:function(source)
{var target=this;for(var prop in source)if(target.hasOwnProperty(prop))target[prop]=source[prop];return target;},toString:function()
{return"Config #"+this.id;}},log:function(message){if(this.options.verbose)console.log(message);},rescope:function(scope,fn){return function(){fn.apply(scope,arguments);};},canvasSupported:function(){return!!window.HTMLCanvasElement;},hasFlash:function()
{try{var fo=new ActiveXObject('ShockwaveFlash.ShockwaveFlash');if(fo)return true;}catch(e){if(navigator.mimeTypes["application/x-shockwave-flash"]!=undefined)return true;}
return false;},showLoader:function(){this.body.className+=' '+this.options.loadingClass;},hideLoader:function(){this.body.className=this.body.className.replace(" "+this.options.loadingClass,'');},script:function(config)
{this.body=document.getElementsByTagName('body')[0];this.showLoader();this.options.map(config);var useFlash=!this.canvasSupported();if(this.options.forceFlash)useFlash=true;var div=document.getElementById(this.options.id);if(div==undefined)
{if(!useFlash)
{var trace=document.createElement("div");trace.setAttribute("id","haxe:trace");trace.setAttribute("class","trace");this.body.insertBefore(trace,this.body.firstChild);}
var app=document.createElement("div");app.setAttribute("style","width:100%; height:100%");app.setAttribute("class","flexible");app.setAttribute("data-framerate","60");app.setAttribute("id",this.options.id);this.body.insertBefore(app,this.body.firstChild);}
this.log("Embed > does div exist? "+div);this.log("Embed > is canvas supported? "+this.canvasSupported());this.log("Embed > using "+(useFlash?'Flash':'Jeash')+" with "+this.options);if(!useFlash)
{this.addScript(this.options.js,this.onSuccess);}else{if(this.hasFlash())
{this.addScript(this.options.swfObject,this.onSWFLoading);this.onSWFLoading();}else{this.onFail();}}},swf:function(config)
{var
flashVars={},parameters={allowscriptaccess:true,allowfullscreen:true,allownetworking:true,wmode:"opaque",menu:"false",scale:"noScale"},attributes={id:"haxe-jeash"};swfobject.embedSWF(config.swf,config.id,"100%","100%",config.swfVersion,config.expressSWF,{},parameters,flashVars);this.onSuccess();},addScript:function(url,callback)
{this.log("Embed > Injecting Script "+url+(callback!=undefined?" with a callback":""));var app=document.createElement("script");app.setAttribute("type","text/javascript");app.setAttribute("src",url);if(callback!=undefined)app.addEventListener('load',this.rescope(this,callback),true);document.getElementsByTagName("head")[0].appendChild(app);},onSWFLoading:function()
{clearInterval(this.interval);if(typeof swfobject!='undefined')
{var appropriate=swfobject.hasFlashPlayerVersion(this.options.swfVersion);this.log("Embed > has flash :"+this.hasFlash()+" version required :"+this.options.swfVersion+" is suitable :"+appropriate);if(appropriate)this.swf(this.options);else this.onFail();}else{this.log("Embed > Stll waiting for swfObject to load");this.interval=setTimeout(this.rescope(this,this.onSWFLoading),100);}},onSuccess:function()
{this.hideLoader();this.success=true;this.log("Success ========================== ");},onFail:function()
{this.hideLoader();this.body.className+=' '+this.options.failClass;this.success=false;this.log("Fail =============================");}};