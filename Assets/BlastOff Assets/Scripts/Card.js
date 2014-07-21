//INFO: Give transform properties to allow show/hide animation.
//Creates a child Sprite as a background. 

#pragma strict

@script RequireComponent(SpriteRenderer,Animation);


//Default Style
public var showShape;
public var isShowing;

public var showEaseType;
public var showInterupt;
public var showSpeed : float;
public var showPosition : Vector2;
public var showScale : Vector2;
public var showColor : Color;

public var hideEaseType;
public var hideInterupt;
public var hideSpeed : float;
public var hidePosition : Vector2;
public var hideScale : Vector2;
public var hideColor : Color;

//public var showAnim : AnimationClip;
//public var hideAnim : AnimationClip;


//public var background.color = "#000000";
//public var background.opacity = .8;

public var printIt;
//public var printIt : Function;


function Start () {
	setDefault();
	
	
	
}



function Update () {

}

function setDefault(){
//Default Style
	 showShape = false;
	 isShowing = true;

	 showEaseType = "easeOutQuint";
	 showInterupt = false;
	 showSpeed = 0.4;
	 showPosition = new Vector2(0,0);
	 showScale = new Vector2(1,1);
	 showColor = new Color();
	 

	 hideEaseType = "easeOutQuint";
	 hideInterupt = false;
	 hideSpeed = 0.4;
	 hidePosition = new Vector2(0, 0);
	 hideScale = new Vector2(1,1);
	 hideColor = new Color();
	 
	// hideVisibility = false;
	
	// background.color = "#000000";
	// background.opacity = .8;

}


	


//BGSprite
//node.background = node.createNode("background_sprite")
//asSprite(node.background);


/*
function setDefault(){
	//Default Style
	 posX = 0;
	 posY = 0;
	 showShape = false;
	
	 isShowing = true;

	// background.color = "#000000";
	// background.opacity = .8;
	
	 showSpeed = .4;
	 showEase = "easeOutQuint";
	 showInterupt = false;
	 showPosX = 0;
	 showPosY = 0;
	 showOpacity = 1;
	 showScaleX = 1;
	 showScaleY = 1;

	 hideSpeed = .4;
	 hideEase = "DECEL";
	 hideInterupt = false;
	 hidePosX = -BlastOff.VIEW_X;
	 hidePosY = 0;
	 hideOpacity = 1;
	 hideScaleX = 1;
	 hideScaleY = 1;
	// hideVisibility = false;
}
*/

function show(){
	preAnimateIn();
	animateIn("postAnimateIn");	
}

function hide(){
	preAnimateOut();
	animateOut("postAnimateOut");
}



function animateIn(action){
	
	animation.Play("stage_show"); 
	//iTween.MoveTo(this, Vector3(showPosX, showPosY, 0), showSpeed)
	
	/*
	iTween.MoveTo(gameObject, {
		"x": showPosX, 
		"y": showPosY,
		"time": showSpeed,
		"easeType": showEaseType,
		"oncomplete": action,
		"oncompletetarget": gameObject
	});
	*/
	
	
	/*
	iTween.ScaleTo(gameObject, {
		"x": showScaleX, 
		"y": showScaleY,
		"time": showSpeed,
		"easeType": showEaseType
	});
	*/
	
	/*
	iTween.FadeTo(gameObject, {
		"Opacity": showOpacityX, 
		"y": showScaleY,
		"easeType": showEase,
		//"oncomplete": "action"
	});

	*/
	
	
}

function animateOut(action){
	
	animation.Play("stage_hide"); 
	/*

	TweenLite.to(node, node.hideSpeed,
	{
		posX: node.hidePosX, 
		posY: node.hidePosY,
		scaleX: node.hideScaleX,
		scaleY: node.hideScaleY,
		opacity: node.hideOpacity,
		ease: Strong.easeOut,
		onComplete: action
	});
	*/
}

function preAnimateIn(){
	//visibility = true;
	onPreShow();
}

function preAnimateOut(){
	onPreHide();
}

function postAnimateIn(){
	Debug.Log("post animate in "+ gameObject.name);
	isShowing = true;
	onPostShow();
	onShow();
}

function postAnimateOut(){
	//console.log("post animate out -- %s", node.name)
	Debug.Log("post animate out " + gameObject.name);
	//visibility = false;
	isShowing = false;
	onPostHide();
	onHide();
}


//OverWRitable functions
function onShow(){
}

function onPreShow(){
}

function onPostShow(){
}

function onHide(){
}

function onPreHide(){
}

function onPostHide(){
}

