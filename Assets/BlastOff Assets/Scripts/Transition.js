//INFO: Give transform properties to allow show/hide animation.
//Uses leanTween Library.


#pragma strict

//@script RequireComponent(SpriteRenderer,Animation);



//Default Style

public var showShape;
public var isShowing;
//public var showByDefault = true;

public var defaultPosition : Vector2 = new Vector2();

public var showEaseType;
public var showInterupt;
public var showSpeed : float = .3;
public var showPosition : Vector2 = new Vector2();
public var showScale : Vector2;
public var showColor : Color;

public var hideEaseType;
public var hideInterupt;
public var hideSpeed : float = .3;
public var hidePosition : Vector2 = new Vector2();
public var hideScale : Vector2;
public var hideColor : Color;


//public var background.color = "#000000";
//public var background.opacity = .8;

public var printIt;
//public var printIt : Function;


function Start () {
	//Default Style
	 

	 showShape = false;
	 isShowing = true;
	 //showByDefault = true;

	 //defaultPosition = new Vector2(-6,0); //Set in class body INORDER to allow Insepctor Editing

	 showEaseType = "easeOutQuint";
	 showInterupt = false;
	 //showSpeed = 0.3;
	// showPosition = new Vector2(0,0); //Set in class body INORDER to allow Insepctor Editing
	 showScale = new Vector2(1,1);
	 showColor = new Color();
	 

	 hideEaseType = "easeOutQuint";
	 hideInterupt = false;
	 //hideSpeed = 0.3;
	 //hidePosition = new Vector2(-6, 0); //Set in class body INORDER to allow Insepctor Editing
	 hideScale = new Vector2(1,1);
	 hideColor = new Color();
	
	// background.color = "#000000";
	// background.opacity = .8;

	transform.localPosition = defaultPosition;


}



function Update () {

}



function show(){
	preAnimateIn();
	animateIn("postAnimateIn");	
}

function hide(){
	preAnimateOut();
	animateOut("postAnimateOut");
}



function animateIn(action){

	//animation.Play("Transition_show"); 

	iTween.MoveTo(gameObject,
	{
		"x" : showPosition.x,
		"y" : showPosition.y,
		"time": showSpeed,
		"easeType" : "easeOutQuint"

	});
		
}

function animateOut(action){
	
	//animation.Play("Transition_hide"); 
	
	iTween.MoveTo(gameObject,
	{
		"x" : hidePosition.x,
		"y" : hidePosition.y,
		"time": hideSpeed,
		"easeType" : "easeOutQuint"

	});
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
	onHide(); //Redudent Usage
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

