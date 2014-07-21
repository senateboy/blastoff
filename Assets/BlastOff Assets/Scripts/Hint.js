#pragma strict
//Also requires Checkpoint

//@script RequireComponent(SpriteRenderer);
@script RequireComponent(Transition);

public var target : GameObject;
public var hintList : Transform[];

function Start () {

}

function Update () {
	

	if (Input.GetKeyDown (KeyCode.B)){
		Debug.Log("Building Hint...");
		buildHint(target.transform);
	}

	if (Input.GetKeyDown (KeyCode.D)){
		Debug.Log("Deleting Hint...");
		deleteHints();
	
	}
	
}



function setAlignPositions(){
	//Debug.Log("Aligning Hints...");
	for(var i = 0; i < hintList.length; i++){
		hintList[i].GetComponent(Align).updateAlign();
	}
}


function setHintPositions(){
	//Debug.Log("Setting Hint Positions...");	
	for(var i = 0; i < hintList.length ;i++){
		hintList[i].GetComponent(Align).applyAlign();
	}

}

function deleteHints(){
	//Debug.Log("Deleting Hints...");
	for(var i = 0; i < hintList.length; i++){
		GameObject.Destroy(hintList[i].gameObject);
	}
	hintList = [];
}

function buildHint(checkpoint : Transform){
	
	
	//Delete Current Hints
	deleteHints();

	//for each Combo child
	var nodeList : List.<Transform> = new List.<Transform>();
	var checkpointList = Node.GetChildren(checkpoint, Checkpoint);
	
	for(var i = 0; i < checkpointList.length ;i++){
		
		var combo : Transform;
		var hint : GameObject;
		var spriteComp : SpriteRenderer;
		var sprite : Sprite;
		var alignComp : Align;

		combo = checkpointList[i];

		//create transform under Hint_grp
		hint = new GameObject();
		hint.name = ("hintSprite"+i);
		hint.transform.parent = transform;
		hint.transform.position = transform.position;
		nodeList.Add(hint.transform);

		//add Sprite component
		spriteComp = hint.AddComponent(SpriteRenderer);

		//set sprite compoennt to trans.sprite.
		spriteComp.sprite = combo.GetComponent(SpriteRenderer).sprite;

		//addALign to sprite
		alignComp = hint.AddComponent("Align");

		//set AlignToY to false; ALign only X
		alignComp.alignToY = false;

		
	}

	//Copy Hints to var hintList
	hintList = nodeList.ToArray();

	//update the aligns positions.
	setAlignPositions();
	setHintPositions();
}


