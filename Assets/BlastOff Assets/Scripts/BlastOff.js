#pragma strict

import System.Collections.Generic; //for "List" creation versus Arrays.

static public var VIEW_X : float;
static public var VIEW_Y : float;
static public var VIEW_TOP : float;
static public var VIEW_BOTTOM : float;
static public var VIEW_RIGHT : float;
static public var VIEW_LEFT : float;

static public var playerScore : float;
static public var playerHighScore : float;


public var COMBO_SIZE : float;
public var MOVE_SIZE : float;
public var COUNTDOWN_SIZE : float;
public var MENU_ITEM_SIZE_X : float;
public var MENU_ITEM_SIZE_Y : float;


VIEW_X = Screen.width;
VIEW_Y = Screen.height;
VIEW_TOP = VIEW_Y * -0.5;
VIEW_BOTTOM = VIEW_Y * 0.5;
VIEW_RIGHT = VIEW_X * 0.5;
VIEW_LEFT = VIEW_X * -0.5;

COMBO_SIZE = VIEW_X / 6;
MOVE_SIZE = VIEW_X * 0.1;
COUNTDOWN_SIZE = VIEW_X * 0.25;
MENU_ITEM_SIZE_X = VIEW_X * 0.75;
MENU_ITEM_SIZE_Y = MENU_ITEM_SIZE_X * 0.3;

function Start () {
	VIEW_X = Screen.width;
	VIEW_Y = Screen.height;
	VIEW_TOP = VIEW_Y * -0.5;
	VIEW_BOTTOM = VIEW_Y * 0.5;
	VIEW_RIGHT = VIEW_X * 0.5;
	VIEW_LEFT = VIEW_X * -0.5;

	COMBO_SIZE = VIEW_X / 6;
	MOVE_SIZE = VIEW_X * 0.1;
	COUNTDOWN_SIZE = VIEW_X * 0.25;
	MENU_ITEM_SIZE_X = VIEW_X * 0.75;
	MENU_ITEM_SIZE_Y = MENU_ITEM_SIZE_X * 0.3;

	//Show StartScren
	GameObject.Find("Start_window").GetComponent(Transition).show();
}


function Update () {

}



//unity function to save data.
//Start with just saving score and obtaining last score.
//TODO: add past scores to view.  Need to add to list. or recreate list data.
static public function SaveScore () {
	playerHighScore = playerScore;
    PlayerPrefs.SetInt("Player High Score", playerHighScore);
}
static public function LoadHighScore () {
    if(PlayerPrefs.GetInt("Player High Score")){
    	playerHighScore = PlayerPrefs.GetInt("Player High Score");
    }else{
    	playerHighScore = 10000;
    }
    
}
