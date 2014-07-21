#pragma strict

public var transition : Transition;

public var default_color : Color;// = new Color(200,200,200,1); //light gray
public var hover_color : Color ;
public var clicked_color : Color;
public var isClicked = false;

public var action : Function;

function Start () {
	
	transition = GameObject.Find("Start_window").GetComponent(Transition);

	//TODO: MOVE these colors to a global Style Sheet for the game.  USE A DEFAULT BASE CLASS
	default_color = new Color(0.95, 0.95, 0.95,1.0); //lighter gray
	hover_color = new Color(1,1,1,1);
	clicked_color = new Color(0.9, 0.9, 1.0 ,1.0);
	
	renderer.material.color = default_color;

	isClicked = false;

	action = startLevel;

}

function Update () {

}


function OnMouseEnter(){
	renderer.material.color = hover_color;
}


function OnMouseExit(){
	if(isClicked){
		renderer.material.color = clicked_color;
	}else{
		renderer.material.color = default_color;
	}
}

function OnMouseUpAsButton(){
	//Debug.Log("button clicked!");
	renderer.material.color = clicked_color;
	isClicked = true;

	if(action){
		action();
	};
}


function resetButton(){
	isClicked = false;
}

function startLevel(){
	Debug.Log("Starting Level...\n");
	
	var level = GameObject.Find("Level").GetComponent(Level);
	level.playerBegin();


	//SHOW Transition
	//Transition = GameObject.Find("Start_window").GetComponent(Transition);
	transition.hide();

}




















