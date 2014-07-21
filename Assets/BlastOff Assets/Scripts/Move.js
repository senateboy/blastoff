#pragma strict

//@script RequireComponent(SpriteRenderer);
//@script RequireComponent(Card);

class Move extends Checkpoint{};

//Component vars
private var trans : Transform;
private var sprite : SpriteRenderer;
private var card : Card;

function Awake(){
	
	//Component vars
	trans = GetComponent(Transform);
	sprite = gameObject.GetComponent(SpriteRenderer);
	card = gameObject.GetComponent(Card);
}



function Start () {
	
	//type = CHECKPOINT.MOVE_UP;
	//value = CHECKPOINT.MOVE_UP;
	
}

function Update () {
	checkpointUpdate();
}

function onComplete(){
	Debug.Log("Combo COMPLETE '" + gameObject.name + "'\n");
	animation.Play("combo_pop");
	//Do some stuff here.
}
