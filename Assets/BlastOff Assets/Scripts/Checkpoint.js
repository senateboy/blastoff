#pragma strict



//UnityScript doesn't support Object Literals. Use an ENUM instead
enum CHECKPOINT {DEFAULT, GAME, LEVEL, STAGE, COMBO, MOVE_UP, MOVE_RIGHT, MOVE_DOWN, MOVE_LEFT};

public var type : CHECKPOINT; //BY DEFAULT
public var value : CHECKPOINT;

public var isComplete = false;
private var isCompleteFIRST_TIME = true;

public var isStarted = false;
private var isStartedFIRST_TIME = true;

public var isActive = false;
private var isActiveFIRST_TIME = true;

public function onStart () {
	
}

public function onLoad (){

}


public function onComplete(){
	Debug.Log("Checkpoint Complete -- " + gameObject.name + "\n");

};



function animPop(){

	
	transform.localScale.x = .8;
	transform.localScale.y = .8;
	
	
	iTween.ScaleTo(gameObject, {
		"x" : 1.1,
		"y" : 1.1,
		"time": 0.1
		
	});
	
	iTween.ScaleTo(gameObject, {
		"x" : 1,
		"y" : 1,
		"time": 0.1,
		"delay" : 0.1 
		
	});
}


function onActive(){
	//Debug.Log("%s node is active", this.name);
};



function getChildrenComplete(){

	//CREATE list of CHILDREN that have "isComplete" property -- and Count the ones where isComplete is "True"
	var numChildren = 0;
	var numComplete = 0;
	
	for(var i : int = 0; i < transform.childCount ; i++){
		
		var cp = transform.GetChild(i).GetComponent(Checkpoint);
		if(cp){
			
			numChildren++;
			
			if(cp.isComplete){
				numComplete++;	
			}	
		}
	}
	
	
	//IF NO Children -- return current Value ;
	if(numChildren == 0){
		//I have no children that have "isComplete" property.
		//return the current value of isComplete.
		return isComplete;
	}
	
	//If ALL Children Complete
	if(numChildren == numComplete){
		return true;
	}else{
		return false;
	}
	
	
};

function getChildrenActive() : Transform[]
{
	//var nodeList = new Array();
	var nodeList : List.<Transform> = new List.<Transform>();	
	var childList = Node.GetChildren(transform, Checkpoint);
	
	for(var i = 0; i < childList.length; i++){ //TODO THIS WONT WORK!!
		if(childList[i].GetComponent(Checkpoint).isActive){     
			nodeList.Add(childList[i]);
		}
	}
	
	return nodeList.ToArray();
};


function autoStart(){
	// PURPOSE: Test weather this checklist should load or not.
	// and set isStarted
	// USED in checkpointUpdate()

	//var sibling = getOlderSister("type", type); 
	var sibling : Transform = Node.GetOlderSib(transform, Checkpoint);
	
	
	
	if(sibling){
		var cp = sibling.GetComponent(Checkpoint);
		if(cp.isComplete){
			isStarted = true;
		}
	}else{
		//I'm First Born.
		isStarted = true;
	}
};




function checkpointUpdate(){
	//CHECKPOINT UPDATE
	isComplete = getChildrenComplete();
	
	

	//TODO: THis causes the PARENT to run onComplete() before the CHILD.
	//isComplete
	if(isComplete && isCompleteFIRST_TIME){
		onComplete();
		isCompleteFIRST_TIME = false;
		isActive = false;
	}

	
	//isStarted
	//autoStart();
	if(isStarted && isStartedFIRST_TIME){
		onStart();
		isStartedFIRST_TIME = false;
		//isActive = true;
	}
	

	//isActive
	//If Children
	if(Node.GetChildren(transform, Checkpoint).length){
		if(getChildrenActive().length){ //
			isActive = true;
		}else{
			isActive = false;
		}
	}else{
		//this is ment to be set manually in LEVEL component.
	}

};


function reInit(){
	var compList : Component[];
	compList = GetComponentsInChildren(Checkpoint);

	for(var cp : Checkpoint in compList){

		//Debug.Log("reInit: " + cp.gameObject.name);

		
		cp.isComplete = false;
		cp.isCompleteFIRST_TIME = true;
		
		cp.isStarted = false;
		cp.isStartedFIRST_TIME = true;

		cp.isActive = false;
		cp.isActiveFIRST_TIME = true; //Not being used yet.
		
	}

}

function Start () {
	
}

function Update () {
	checkpointUpdate();
	//Debug.Log("testing...");
}

	
	