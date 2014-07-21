using UnityEngine;
using System.Collections;
using System.Collections.Generic; //"List" usage.

//It is common to create a class to contain all of your
//extension methods. This class must be static.
public static class ExtensionMethods
{
	//Even though they are used like normal methods, extension
	//methods must be declared static. Notice that the first
	//parameter has the 'this' keyword followed by a Transform
	//variable. This variable denotes which class the extension
	//method becomes a part of.
	public static void ResetTransformation(this Transform trans)
	{
		trans.position = Vector3.zero;
		trans.localRotation = Quaternion.identity;
		trans.localScale = new Vector3(1, 1, 1);
	}



	public static List<Transform> GetDecendents(this Transform trans){
		List<Transform> nodeList = new List<Transform>();			
		nodeList.Add(trans);
		
		if(trans.childCount >= 0){
			// Append Children's ofValue to the list
			foreach(Transform child in trans){
				nodeList.AddRange(child.GetDecendents());
			}
		}
		
		//Filter results
		//nodeList = self.filterNodes(nodeList, filter_property, filter_value);
		
		return nodeList;
	}



}

