#pragma strict

@script RequireComponent(Align);

class Combo extends Checkpoint {}

// Use this for initialization
function Start () {
	value = CHECKPOINT.COMBO;
	type = CHECKPOINT.COMBO;

	setChildCheckpointVisibility(false);

	GetComponent(Align).applyAlign();

	
}

// Update is called once per frame
function Update () {
	checkpointUpdate();

	/*if (Input.GetKeyDown (KeyCode.I)){
		Debug.Log("Combo: invising children checkpoints...");
		setChildCheckpointVisibility(false);
	}

	if (Input.GetKeyDown (KeyCode.P)){
		Debug.Log("Combo: Popping...");
		animatePop();
	}*/
}


function onComplete(){
	Debug.Log("Combo COMPLETE '" + gameObject.name + "'\n");
	animatePop();
	GetComponent(SpriteRenderer).color.a = .5;
	
}


function setChildCheckpointVisibility(bool){
	var childList : Transform[] = Node.GetChildren(transform, Checkpoint);

	for(var i = 0; i < childList.length; i++){
		childList[i].renderer.enabled = bool;
	}
}

function animatePop(){

	iTween.ScaleTo(gameObject,
	{
		"x" : 1.2,
		"y" : 1.2,
		"time": .05,
		"easeType" : "linear"
		

	});

	iTween.ScaleTo(gameObject,
	{
		"x" : .8,
		"y" : .8,
		"time": .05,
		"easeType" : "linear",
		"delay" : .05

	});


}


function reInit(){
	Debug.Log("reinit: checkpoint");

	transform.localScale.x = 1;
	transform.localScale.y = 1;
	GetComponent(SpriteRenderer).color.a = 1;
}
