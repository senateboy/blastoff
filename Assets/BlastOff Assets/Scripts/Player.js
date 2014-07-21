#pragma strict

public var currentPos : Vector3; //Where to start
public var transitionTime : float; //Time to take to transition
public var control : float = 0; //Amount along transition

function Start () {
	transitionTime = 1.0;
	currentPos = new Vector3(0,-3,0); //position

}

function Update () {
	//MovePlayer(new Vector3(0,0,0));
}

//Call this with the transform to move to.
function MoveToPoint(targetPos : Vector3) {
    
    if(control < 1.0){ //Continue until we reach the destination
        control += Time.deltaTime/transitionTime; //move along transition
        transform.position = Vector3.Lerp(currentPos, targetPos, Mathf.SmoothStep(0.0, 1.0, control)); //Smoothing optional
       
    }else{
    	currentPos = targetPos; //we're now at the target's position;
        control = 0;
    }
    
    
}



public function Launch(){
    var speed : float = 2;
    var target : Vector3 = new Vector3(0,0,0);

    iTween.MoveTo(gameObject,
    {
        "position" : target,
        "time" : speed,
        "easeType" : "easeOutQuint"
     });
	
}

function Die (){

}

function Idle(){

}

function Fall(){

}

function FlyLeft(){

}

