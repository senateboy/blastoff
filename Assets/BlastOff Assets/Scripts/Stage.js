
#pragma strict

@script RequireComponent(SpriteRenderer);
@script RequireComponent(Card);

class Stage extends Checkpoint{};

//Component vars
//private var cp : Checkpoint;
private var trans : Transform;
private var sprite : SpriteRenderer;
private var anim : Animation;
private var card :Card;


function Awake(){
	//Checkpoint vars
	type = CHECKPOINT.STAGE;
	value = CHECKPOINT.STAGE;

	//Component vars
	sprite = gameObject.GetComponent(SpriteRenderer);
	anim = gameObject.GetComponent(Animation);
	card = gameObject.GetComponent(Card); //NOTE: THis needs to be in awake for Level to see it when building Level.stageList
	
	
}

// Use this for initialization
function Start () {	

	
	//SpriteRenderer Vars
	sprite.material.color = Color.white;

	//Card vars
	card.showPosition.x = 0;
	card.showPosition.y = BlastOff.VIEW_TOP / 2.5;
	card.showSpeed = .8;
	card.showColor = Color.white;
	card.hidePosition.x = 0;
	card.hidePosition.y = BlastOff.VIEW_BOTTOM;
	card.hideSpeed = .8;
	card.hideColor = Color.white;
	//background.opacity = 0;

	transform.localPosition.y = 200;

	gameObject.SetActive(false);
	//gameObject.SetActive(true);
}

function OnEnable(){

	card.show();
}

// Update is called once per frame
function Update () {
	checkpointUpdate();
}



function onComplete(){
	//loadNextStage();
	card.hide();
}



/*
node.addCombo = function(comboBehavior){
	var combo = node.createNode(node.getUniqueName("combo"));
		comboBehavior(combo);
	return combo;
}

node.onComplete = function(){
	node.color = "#000000";
	node.opacity = .25;

	TweenLite.to(node, 1, {posY:700, ease:Power1.Out});
	//am.addAnim(new Transition(node,"posY", 700, 800, "DECEL"), true);
	node.getParent("asLevel").getDecendents("name","bg_emitter")[0].emit(5);
}
*/

function onStart(){
	card.show();

}


function reInit(){
	Debug.Log("reinit: stage");


	var childList = Node.GetChildren(transform, Combo);
	
	for(var i = 0; i < childList.length; i++){ //TODO THIS WONT WORK!!
		childList[i].GetComponent(Checkpoint).reInit();
	}
}

//No longer needed.
/*function loadNextStage(){
	var nextStage : Transform = Node.GetYoungerSib(transform, Checkpoint);
	
	if(nextStage){
		//make it active
		nextStage.gameObject.SetActive(true);
	}
	
}*/


/*

node.showCombos = function(){
	var combos = node.getChildren("asCheckpoint", true);
	if(combos.length){
		for(var i = 0; i < combos.length; i++){
			combos[i].show();
		}
	}
}

node.onShow = function(){
	//node.showCombos();
	//am.addAnim(new Transition(node,"posY", -300, 400, "DECEL"), true);
}

node.onPostShow = function(){
	//node.showCombos();
}

node.onPreShow = function(){
	node.showCombos()
}
*/