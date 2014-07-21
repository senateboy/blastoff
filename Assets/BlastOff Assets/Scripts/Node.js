#pragma strict

static function GetParentWithComponent(trans : Transform, filter_component : System.Type) : Transform
{
	var node : Transform;
		
	if(trans.parent){
		var nodeList : Transform[];
		nodeList = FilterForComponent([trans.parent],filter_component);

		if(nodeList.length){
			node = nodeList[0];
		}else{
			node = GetParentWithComponent(trans.parent, filter_component);
		}
	}
	
	return node;
}

static function GetDecendents(trans : Transform) : List.<Transform>
{
	var nodeList : List.<Transform> = new List.<Transform>();			
	nodeList.Add(trans);

	if(trans.childCount >= 0){
		// Append Children to the list
		for(var child : Transform in trans){
			//var cList : List.<Transform> = new List.<Transform>();
			var cList = GetDecendents(child);
			
			nodeList.AddRange(cList);
		}
	}

	//Filter results
	//nodeList = self.filterNodes(nodeList, filter_property, filter_value);


	return nodeList;
}



static function GetDecendents(trans : Transform, filter_component : System.Type) : List.<Transform>
{
	var nodeList : List.<Transform> = new List.<Transform>();			
	nodeList.Add(trans);

	if(trans.childCount >= 0){
		// Append Children to the list
		for(var child : Transform in trans){
			var cList = GetDecendents(child);
			
			nodeList.AddRange(cList);
		}
	}

	//Filter results
	nodeList = FilterForComponent(nodeList, filter_component);


	return nodeList;
}


static function GetChildren(trans : Transform) : Transform[]
{
	var childList : List.<Transform> = new List.<Transform>();
	
	//BUILD trans Child list
	for(var t : Transform in trans){
		childList.Add(t);
		
	}

	//Take self out of the list!

	return childList.ToArray();
}

static function GetChildren(trans : Transform,  filter_component : System.Type) : Transform[]
{
	var childList : List.<Transform> = new List.<Transform>();
	
	//BUILD trans Child list
	for(var t : Transform in trans){
		if(t.GetComponent(filter_component)){
			childList.Add(t);
		};
	}

	//Take self out of the list!

	return childList.ToArray();
}



static function GetMyChildIndexFromParent(trans : Transform) : int
{
	var myIndex : int;
	var i : int;

	//BUILD Parent's Child list
	i = 0;
	for(var t : Transform in trans.parent.transform){

		if(t == trans){
			return i;
		}
		i++;
	}

	return -1;


}



static function GetOlderSib(trans : Transform) : Transform
{
	var nodeList : List.<Transform> = new List.<Transform>();		
	var myIndex : int;
	var olderSibIndex : int;
	var olderSib : Transform;
	var i : int;
	
	
	
	//FILTER -- but keep Me in the list
	//nodeList = self.filterNodes(nodeList, filter_property, filter_value, [self] );
	
	//BUILD Parent's Child list
	i = 0;
	for(var t : Transform in trans.parent.transform){
		
		nodeList.Add(t);
		
		if(t == trans){
			myIndex = i;
			break;
		}
		
		i++;
	}
	
	olderSibIndex = myIndex - 1; //older
	
	if(olderSibIndex >= 0){
		olderSib = nodeList[olderSibIndex];
	}else{
		//console.warn("Node:getYoungerSister: No Younger Sister Node");
		olderSib = null;
	}

	
	return olderSib;
}

//Overloaded with Argument Filter
static function GetOlderSib(trans : Transform, filter_component : System.Type) : Transform
{
	var nodeList : List.<Transform> = new List.<Transform>();		
	var myIndex : int;
	var olderSibIndex : int;
	var olderSib : Transform;
	var i : int;
	
	
	
	//FILTER -- but keep Me in the list
	//nodeList = self.filterNodes(nodeList, filter_property, filter_value, [self] );
	
	//BUILD Parent's Child list -- WITH FILTER 
	i = 0;
	for(var t : Transform in trans.parent.transform){
		
		if(t.GetComponent(filter_component)){
			nodeList.Add(t);
		}else{
			//comment this out later. dont need it.
			//nodeList.Add(t);
			//Debug.Log("object isn't a type " + t.ToString());
		}
		
		if(t == trans){
			myIndex = i;
			//break;
		}
		
		i++;
	}
	
	olderSibIndex = myIndex - 1; //older
	
	if(olderSibIndex >= 0){
		Debug.Log(trans.gameObject.name + "'s olderSibIndex is " + olderSibIndex + " and nodeListSize is "+ nodeList.Count );
		olderSib = nodeList[olderSibIndex];
	}else{
		//console.warn("Node:getYoungerSister: No Younger Sister Node");
		olderSib = null;
		//Debug.Log("Node: sibSize is "+nodeList.Count);
	}

	
	return olderSib;
}




static function GetYoungerSib(trans: Transform) : Transform
{
	var nodeList : List.<Transform> = new List.<Transform>();		
	var myIndex : int;
	var youngerSibIndex : int;
	var youngerSib : Transform;
	var i : int;
	
	
	
	//FILTER -- but keep Me in the list
	//nodeList = self.filterNodes(nodeList, filter_property, filter_value, [self] );
	
	//BUILD Parent's Child list
	var parent : Transform = trans.parent;
	if(parent){
		i = 0;
		for(var t : Transform in parent.transform){
			
			nodeList.Add(t);
			if(t == trans){
				myIndex = i;
				//break;
			}
			
			i++;
		}
	}else{
		youngerSib = null;
		return youngerSib;
	}
	
	
	
	//FIND sibling
	youngerSibIndex = myIndex + 1; //older
	if(youngerSibIndex < nodeList.Count){
		youngerSib = nodeList[youngerSibIndex];
	}else{
		//console.warn("Node:getYoungerSister: No Younger Sister Node");
		youngerSib = null;
	}

	
	return youngerSib;
}


static function GetYoungerSib(trans: Transform, filter_component : System.Type) : Transform
{
	var nodeList : List.<Transform> = new List.<Transform>();		
	var myIndex : int;
	var youngerSibIndex : int;
	var youngerSib : Transform;
	var i : int;
	
	
	
	//FILTER -- but keep Me in the list
	//nodeList = self.filterNodes(nodeList, filter_property, filter_value, [self] );
	
	//BUILD Parent's Child list
	var parent : Transform = trans.parent;
	if(parent){
		i = 0;
		for(var t : Transform in parent.transform){
			
			if(t.GetComponent(filter_component)){
				nodeList.Add(t);
			}

			if(t == trans){
				myIndex = i;
				//break;
			}
			
			i++;
		}
	}else{
		youngerSib = null;
		return youngerSib;
	}
	
	
	
	//FIND sibling
	youngerSibIndex = myIndex + 1; //older
	if(youngerSibIndex < nodeList.Count){
		youngerSib = nodeList[youngerSibIndex];
	}else{
		//console.warn("Node:getYoungerSister: No Younger Sister Node");
		youngerSib = null;
	}

	
	return youngerSib;
}



//Takes Arg: List and returns List
static function FilterForComponent(nodes : List.<Transform>, component : System.Type) : List.<Transform>
{
	var nodeList : List.<Transform> = new List.<Transform>();
	
	
	for(var node : Transform in nodes){

		if(node.GetComponent(component)){
			nodeList.Add(node.gameObject.transform);
		}
	}
	
	return nodeList;
}

static function FilterForComponent(nodes : Transform[], component : System.Type) : Transform[]
{
	var nodeList : List.<Transform> = new List.<Transform>();
	
	
	for(var node : Transform in nodes){

		if(node.GetComponent(component)){
			nodeList.Add(node.gameObject.transform);
		}
	}
	
	return nodeList.ToArray();
}






//Rerturn a new List containing only Checkpoints.
static function FilterForCheckpoint(nodes : List.<Transform>) : List.<Transform>
{
	var nodeList : List.<Transform> = new List.<Transform>();
	
	
	for(var node : Transform in nodes){

		if(node.GetComponent.<Checkpoint>()){
			nodeList.Add(node.gameObject.transform);
		}
	}
	
	return nodeList;
}











static function FilterForCheckpointMove(nodes : List.<Transform>) : List.<Transform>
{
	var nodeList : List.<Transform> = new List.<Transform>();
	
	
	for(var node : Transform in nodes){
		var c = node.GetComponent.<Checkpoint>();

		//If checkpoint.value is a MOVE
		if(c && (node.GetComponent.<Checkpoint>().value == CHECKPOINT.MOVE_UP
		 || node.GetComponent.<Checkpoint>().value == CHECKPOINT.MOVE_RIGHT 
		 || node.GetComponent.<Checkpoint>().value == CHECKPOINT.MOVE_DOWN 
		 || node.GetComponent.<Checkpoint>().value == CHECKPOINT.MOVE_LEFT 
		 )){
			nodeList.Add(node.gameObject.transform);
		}
	}
	
	return nodeList;
}





