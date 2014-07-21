#pragma strict
//Container, has stretchable parts - that expand 

//private totalChildwidth


public var expandWidth = true;
public var expandHeight = true;
public var autoResize = true;
public var minWidth : float;
public var maxWidth : float;
public var minHeight : float;
public var maxHeight : float;
public var width : float;
public var height : float;




function Start () {

}

function Update () {
	//add childwidths
	setChildMinMaxWidth();

}

function setChildMinMaxWidth() {


	//GET LIST OF SPRITE-RENDERS
	var childSpriteList = GetComponentsInChildren(SpriteRenderer);

	for(var sprite : SpriteRenderer in childSpriteList){
        
		//if not self
		if(sprite != GetComponent(SpriteRenderer)){
	        Debug.Log("Container Bounds is: " + GetComponent(SpriteRenderer).bounds);
	        Debug.Log("Child Bounds is: " + sprite.bounds);
	        
	       	if(sprite.bounds.max.x > maxWidth){
	       		maxWidth = sprite.bounds.max.x;
	       	}
	       	if(sprite.bounds.min.x < minWidth){
	       		minWidth = sprite.bounds.min.x;
	       	}


	        Debug.Log("max Bounds is: {" + minWidth + "-->" + maxWidth + "}");
        }
	}

	//APPLY min and max
	//transform.localScale.x = 4;//(maxWidth - minWidth);


}

function applyWidth(){

}

function applyHeight(){

}



