#pragma strict

//@script RequireComponent(BoxCollider2D);

enum ALIGN {CENTER, MIN, MAX};

public var alignMethod : ALIGN;
public var alignPosition : Vector2 = new Vector2(0,0);
public var spacing : Vector2 = new Vector2();
//public var alignWith : Transform;
public var alignToX = true;
public var alignToY = true;

public var autoAlign = false;

public var alignScaleX : float = 1.0;
public var alignScaleY : float = 1.0;

private var parent;
private var siblingList : Transform[];

private var selfIndex = 0;
private var pos : Vector2;

private var myWidth : float;
private var myHeight : float;

private var totalWidth : float;
private var totalHeight : float;

private var offset : Vector2;

private var numChildren = 0;




function Start () { //Called AFTER Awake, other objects have been instantiated. INIT connections to OTHERS.

	updateAlign();
	//applyAlign();

}



function Update () {

	if(autoAlign){
		updateAlign();
		applyAlign();
	}
}

function updateAlign () {
	
	//INIT vars
	parent = transform.parent;
	siblingList = Node.GetChildren(parent);//TODO: ChildNodes Must have Components of Type SpriteRenderer. //this is dangerous in that if COMBO is not equal to "alignWith" its index is lost.
	selfIndex = Node.GetMyChildIndexFromParent(transform);
	myWidth = GetComponent(SpriteRenderer).sprite.bounds.size.x;
	myHeight = GetComponent(SpriteRenderer).sprite.bounds.size.y;
	// myWidth = GetComponent(BoxCollider2D).size.x;
	// myHeight = GetComponent(BoxCollider2D).size.y;
	totalWidth = 0;
	totalHeight = 0;
	pos = new Vector2();
	offset = new Vector2();


	//CALCULATE Offsets
	if(alignMethod == ALIGN.CENTER){

		//COUNT WIDTHS of others upto My position
		for(var i = 0; i < selfIndex; i++){
			var childSprite = siblingList[i].GetComponent(SpriteRenderer).sprite;
			// var childSprite = siblingList[i].GetComponent(BoxCollider2D);
			if(childSprite){
				pos.x += childSprite.bounds.size.x;
				pos.y += childSprite.bounds.size.y;
				// pos.x += childSprite.size.x;
				// pos.y += childSprite.size.y;

			}
		}

		//COUNT ALL WIDTHS of transform.parent's children...
		for(var child : Transform in siblingList){
			var childSprite_i = child.GetComponent(SpriteRenderer).sprite;
			// var childSprite_i = child.GetComponent(BoxCollider2D);
			if(childSprite_i){
				totalWidth += childSprite_i.bounds.size.x;
				totalHeight += childSprite_i.bounds.size.y;
				// totalWidth += childSprite_i.size.x;
				// totalHeight += childSprite_i.size.y;
			}

			//numChildren++;
		}

		//Add self width 
		pos.x += myWidth/2;
		pos.y += myWidth/2;

		//CENTER offset.
		offset.x = totalWidth/2;
		offset.y = totalHeight/2;

		//Final position.
		pos.x -= offset.x;
		pos.y -= offset.y;

	}else if(alignMethod == ALIGN.MAX){
		offset.x = 0;
		offset.y = 0;
		pos.x += offset.x;
		pos.y += offset.y;
	
	}else if(alignMethod == ALIGN.MIN){
		offset.x = 0;
		offset.y = 0;
		pos.x = (selfIndex * spacing.x) + offset.x;
		pos.y = (selfIndex * spacing.y) + offset.y;
	}

	//TODO: ADD SPACINGS
	//console.log("%s .offset.xis %s", node.name, offsetX);
	//pos.x = (selfIndex * node.spacing.x) + offsetX;
	//pos.y = (selfIndex * node.spacing.y) + offset.y;

	
	//UPDATE ALIGN POSITIONS
	alignPosition.x = pos.x * alignScaleX;
	alignPosition.y = pos.y * alignScaleY;

}

function applyAlign(){
	updateAlign();
	if(alignToX){
		transform.localPosition.x = alignPosition.x;
	}

	if(alignToY){
		transform.localPosition.y = alignPosition.y;
	}
	

}








