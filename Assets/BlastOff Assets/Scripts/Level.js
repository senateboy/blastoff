#pragma strict

@script RequireComponent(Checkpoint);

//Game variables
//public var moveList = new Array(); //grab leaf nodes from top checkpointnode for this
public var moveList : List.<Transform>; //grab leaf nodes from top checkpointnode for this
public var moveIndex = 0;
public var activeMove : Transform;

//public var stageList : List.<Transform>;
//public var stageIndex = 0;
public var activeStage : Transform;

public var activeCombo : Transform;

//Time variables
/*
public var timeCount = false; // flag when to counting time.
public var timeStart;
public var timeComplete;
public var timePast = "00.00"; //for Display Only.
public var timePauseStart;
public var timePauseEnd;
public var activeMoveTimeStamp; //time when active Move was ready.
*/

public var playTime = 0.0;
public var pauseTime = 0.0;
public var completeTime = 0.0;
public var isPlayerPaused = true;

public var hintTime = 0.0;
public var hint : GameObject;
public var isShowingHint = false;


function Start () {
		init();
}



/*
function setInputCommands(){
	inputCommandList.up = function(){
		advance(CHECKPOINT.MOVE.UP);
	}

	inputCommandList.right = function(){
		advance(CHECKPOINT.MOVE.RIGHT);
	}

	inputCommandList.down = function(){
		advance(CHECKPOINT.MOVE.DOWN);
	}

	inputCommandList.left = function(){
		advance(CHECKPOINT.MOVE.LEFT);
	}
}
*/

function updateInput(){
	
	if (Input.GetKeyDown (KeyCode.UpArrow)){
		//Debug.Log("Up pressed");
		advance(CHECKPOINT.MOVE_UP);
	}
	
	if (Input.GetKeyDown (KeyCode.RightArrow)){
		//Debug.Log("Right pressed");
		advance(CHECKPOINT.MOVE_RIGHT);
	}
	
	
	if (Input.GetKeyDown (KeyCode.DownArrow)){
		//Debug.Log("Down pressed");
		advance(CHECKPOINT.MOVE_DOWN);
	}
	
	if (Input.GetKeyDown (KeyCode.LeftArrow)){
		//Debug.Log ("Left pressed");
		advance(CHECKPOINT.MOVE_LEFT);
	}

	if (Input.GetKeyDown (KeyCode.C)){
		//Debug.Log ("Left pressed");
		setActiveCombo(activeStage);
	}
	
	
	
				
}

//Main Level Mechanic:
//Traversing through combos and moving to the next one.
function advance(player_move : CHECKPOINT){
	if(!isPlayerPaused){
			if(moveIndex < moveList.Count){

				//var correctMove = moveList[moveIndex].value; //--from HTML version
				var moveCheckpoint = moveList[moveIndex].GetComponent(Checkpoint);
				var correctMove = moveCheckpoint.value;
				
				if(correctMove == player_move){
					Debug.Log("level:advance: "+ player_move + " CORRECT!\n");
					
					//SET move as complete AND de-activate Move
					moveCheckpoint.isComplete = true;
					moveCheckpoint.isActive = false;
					updateAllCheckpoints();
					
					if(activeCombo.GetComponent(Checkpoint).isComplete){
						hideHint();
						resetHint();
					}
					onAdvanceCorrect();

					//CHECK IF more moves...
					moveIndex++;
					if(moveIndex < moveList.Count){
						initActiveCheckpoints();
						onAdvanceNextMove();

					}else{
						//No more moves -- Level complete
						playerFinish();
						GetComponent(Checkpoint).isComplete = true;
					}

					return true;
					
				}else{
					Debug.Log("level:advance: "+ player_move + " WRONG!\n" );
					if(!isShowingHint){
						showHint();
					}
					onAdvanceWrong();
					return false;
				}
			}
			return false;
	}
	
	return false;
}



function onAdvanceCorrect(){
	//hintUI.hide();
	//rocketManUI_rise();
	
}

function onAdvanceWrong(){
	//hintUI.show();
	//rocketManUI_fall();
}

function onAdvanceNextMove(){
	//delayShowHintUI(2);
}

function onAdvanceStageCombo(){
	//currently Not called at all.
}

function onAdvanceStage(){
	//getDecendents("name","bg_emitter")[0].emit(5);
}


function deActivateAllStages(){

	var Stage_grp = GameObject.Find("Stage_grp");
	for(var trans : Transform in Stage_grp.GetComponent(Transform)){
		//Debug.Log("reInit: " + cp.gameObject.name);
		trans.gameObject.SetActive(false);
	}
}

function activateFirstStage(){
	//ACTIVATE first stage -- begins taking input
	activeStage.gameObject.SetActive(true);
}


function updateAllCheckpoints(){
		for(var cp : Checkpoint in GameObject.Find("Stage_grp").GetComponentsInChildren(Checkpoint)){
		cp.checkpointUpdate();
	}
}


function setActiveCombo(stage: Transform){
	//INIT activeCombo
	updateAllCheckpoints();
	Debug.Log("stageCombo.activeChildren is " + stage.GetComponent(Checkpoint).getChildrenActive().length);
	activeCombo = stage.GetComponent(Checkpoint).getChildrenActive()[0]; //index out of bounds when swapping stage.

}

function setActiveStage(move: Transform){
	activeStage = Node.GetParentWithComponent(move, Stage);
}

function initActiveCheckpoints(){
	if(moveList.Count){
		activeMove = moveList[moveIndex];
		activeMove.GetComponent(Checkpoint).isActive = true;
		setActiveStage(activeMove);
		activeStage.gameObject.SetActive(true);
		setActiveCombo(activeStage);
		
	}else{
		Debug.LogWarning("No 'Moves' Are part of the Game");
	}
}

//Not being used yet...
function invisAllMoves(){
	for(var i = 0; i < moveList.Count; i++){
		moveList[i].renderer.enabled = false;
	}
}

//Call this in Start().
function init(){
	
	//POPULATE moveList
	moveList = Node.GetDecendents(transform);
	moveList = Node.FilterForCheckpointMove(moveList);

	//INIT player indexes
	moveIndex = 0;

	//INIT activeMove,Stage,Combo
	initActiveCheckpoints();

	//INIT timer vars
	playTime = 0;
	pauseTime = 0;
	isPlayerPaused = true;

	//INIT hints
	resetHint();


};




function reInit(){

	//RE-INIT Stages
	var stageGrp = GameObject.Find("Stage_grp");
	
	for(var i = 0; i < stageGrp.transform.childCount; i++){
	 	var stage = stageGrp.transform.GetChild(i);
	 	stage.GetComponent(Stage).reInit();
	}

	//RE-INIT Checkpoints
	GameObject.Find("Stage_grp").GetComponent(Checkpoint).reInit();

	//DEACTIVATE STAGES
	deActivateAllStages();

	//INIT player indexes
	moveIndex = 0;
	//stageIndex = 0;

	//INIT activeMove
	initActiveCheckpoints();

	//INIT timer vars -- Save Values.
	playTime = 0;
	pauseTime = 0;
	isPlayerPaused = true;

}






function playerBegin(){
	//
	GameObject.Find("CountDown_grp").GetComponent(CountDownEmitter).DoCountDown();
	yield WaitForSeconds(3.0);
	
	//ANIMATE Rocketman
	GameObject.Find("Player_grp").GetComponent(Player).Launch();

	//ACTIVATE first stage
	GetComponent(Level).activateFirstStage(); //TODO: Is there a BETTER way to do this????
	GameObject.Find("StopwatchDisplay").GetComponent(Transition).show();
	isPlayerPaused = false;
}

function playerFinish(){
	Debug.Log("Level Complete!\n");

	GameObject.Find("StopwatchDisplay").GetComponent(Transition).hide();
	isPlayerPaused = true;

	//REPLAY MENU
	BlastOff.LoadHighScore();
	if(BlastOff.playerScore < BlastOff.playerHighScore){
		BlastOff.SaveScore();
		BlastOff.LoadHighScore();
	}

	GameObject.Find("Replay_window/HighScore_text").GetComponent(TextMesh).text = BlastOff.playerHighScore.ToString();
	GameObject.Find("Replay_window").GetComponent(Transition).show();

}

function updateHintTimer(){
	if(!isPlayerPaused){
		hintTime += Time.deltaTime;
		//Debug.Log("not paused: " + isPlayerPaused);
	}

	if(hintTime > 2 && !isShowingHint){
		isShowingHint = true;
		showHint();
		//hintGrp.GetComponent(Transition).show();

	}
}

function resetHint(){
	hint.GetComponent(Hint).deleteHints();
	isShowingHint = false;
	hintTime = 0;
}

function showHint(){
	hint.GetComponent(Hint).buildHint(activeCombo);
	isShowingHint = true;
	hint.transform.position.x = activeCombo.position.x;
	hint.transform.position.y = activeCombo.position.y;

	//hint.GetComponent(Transition).showPosition.x = activeCombo.position.x;
	//hint.GetComponent(Transition).showPosition.y = 2;
	hint.GetComponent(Transition).show();
}

function hideHint(){
	hint.GetComponent(Hint).deleteHints();
}


function updateStopwatch(){
	
	if(!isPlayerPaused){
		playTime += Time.deltaTime;
		//Debug.Log("not paused: " + isPlayerPaused);
	}

	//UPDATE StopWatchDisplay
	//CHOP float to hundreths -- rounding down
	var timeAsFloatMult : float;
	var timeAsInt : int;
	var timeAsIntMult : int; 
	var timeAsFloatToHundredths : float;
	var timeAsFloatToHundredthsMult : float;
	var timeAsFloatToHundredthsToInt : int;
	var hundredthsAsString : String;

	var timeAsString : String;
	var zeros = "00";
	
	
	timeAsInt = playTime;
	timeAsFloatMult += .005; //rounding up.
	timeAsFloatMult = playTime * 100; //cutting off thousands place.
	timeAsIntMult = timeAsFloatMult;
	timeAsFloatToHundredths = timeAsIntMult;
	timeAsFloatToHundredths /= 100;
	timeAsFloatToHundredths -= timeAsInt;
	timeAsFloatToHundredths *= 100;
	timeAsFloatToHundredthsToInt = timeAsFloatToHundredths;
	hundredthsAsString = timeAsFloatToHundredthsToInt.ToString();
	hundredthsAsString = String.Concat(hundredthsAsString, zeros);
	hundredthsAsString = hundredthsAsString.Substring(0,2);

	timeAsString = timeAsFloatToHundredths.ToString();


	//ONSCREEN display
	GameObject.Find("StopwatchDisplay/integer_txt").GetComponent(TextMesh).text = timeAsInt.ToString();
	GameObject.Find("StopwatchDisplay/hundredths_txt").GetComponent(TextMesh).text = hundredthsAsString;

	//COMPLETE display
	GameObject.Find("StopwatchDisplayComplete/integer_txt").GetComponent(TextMesh).text = timeAsInt.ToString();
	GameObject.Find("StopwatchDisplayComplete/hundredths_txt").GetComponent(TextMesh).text = hundredthsAsString;

	//update scoreTime
	BlastOff.playerScore = playTime;
	//Debug.Log("playerScore is: " + BlastOff.playerScore);


}






function Update () {
	updateHintTimer();
	updateStopwatch();
	updateInput();
}

