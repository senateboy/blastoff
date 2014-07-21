#pragma strict


public var countFrom : int;
public var  count : int;
public var font : Font;
public var material : Material;
public var guiTextList : List.<GameObject>;


function Start () {
	countFrom = 3;
	count = countFrom;
	
	//DoCountDown();



}

function Update () {
	
}

function DoCountDown () {
	
	for(var i = countFrom; i > 0; i--){
		EmitNumbers(count.ToString());

		count--;
		yield WaitForSeconds(1.0); // wait for 1 second

	}
	count = countFrom;

	
}

function EmitNumbers(textStr){
	Debug.Log("Emitting: " + count);


	//Create a Text
	var go : GameObject = Instantiate(Resources.Load("Prefabs/MeshText"));
	
	go.transform.parent = transform;
	go.transform.localPosition = Vector3(0.0,0.0,0);
	
	
	var meshText = go.GetComponent(TextMesh);
	meshText.text = textStr;
	/*
	go.guiText.fontSize = 36;
	go.guiText.anchor = TextAnchor.MiddleCenter;
	go.guiText.font = font;
	go.guiText.material = material;
	//go.guiText.pixelCorrect = false;
	*/
	//guiTextList.Add(go);



	
	//animate it.
	iTween.ScaleTo(go,
	{
		"scale" : new Vector3(3,3,1),
		"time" : 1
	});

	
	iTween.ColorTo(go,
	{
		"a" : 0,
		"time" : 1
	});

	Destroy (go, 1);


	

}



