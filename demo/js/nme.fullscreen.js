
if(typeof NME=='undefined')NME={};NME.FullScreen={enter:function()
{var docElm=document.documentElement;if(docElm.requestFullScreen)docElm.requestFullScreen();else if(docElm.mozRequestFullScreen)docElm.mozRequestFullScreen();else if(docElm.webkitRequestFullScreen)docElm.webkitRequestFullScreen();this.isFullscreen=true;document.getElementsByTagName('body')[0].className+=' fullscreen';},exit:function()
{var body=document.getElementsByTagName('body')[0];if(document.exitFullScreen)document.exitFullScreen();else if(document.mozCancelFullScreen)document.mozCancelFullScreen();else if(document.webkitCancelFullScreen)document.webkitCancelFullScreen();this.isFullscreen=false;body.className=body.className.replace(" fullscreen",'');},monitor:function(callback)
{document.addEventListener("FullScreenchange",this.rescope(this,callback),false);document.addEventListener("mozFullScreenchange",this.rescope(this,callback),false);document.addEventListener("webkitFullScreenchange",this.rescope(this,callback),false);},onKeyDown:function(event)
{var element;if(event.target)element=event.target;else if(event.srcElement)element=event.srcElement;if(element.nodeType==3)element=element.parentNode;if(element.tagName=='INPUT'||element.tagName=='TEXTAREA')return;var keyID;if(event.keyCode)keyID=event.keyCode;else if(event.which)keyID=event.which;var character=String.fromCharCode(keyID).toLowerCase();if(this.isFullscreen)
{switch(character)
{case"any":case this.chosenHotkey:this.exit();break;}}else{switch(character)
{case"any":case this.chosenHotkey:this.enter();break;}}},rescope:function(scope,fn){return function(){fn.apply(scope,arguments);};},key:function(id)
{this.chosenHotkey=id;document.onkeyup=this.rescope(this,this.onKeyDown);}};