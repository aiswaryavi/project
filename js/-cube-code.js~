/*
	JavaScript code to view and rotate the cube
*/

var container;
var camera, scene, renderer, controls;
var mesh;
var curr_index;
var rotating=true;
var im=["images/cube1.jpg","images/cube2.jpg","images/cube3.jpg","images/cube4.jpg","images/cube5.jpg","images/cube6.jpg"];

webglAvailable();

init();

function init() {


	//to create container inside which the 3D scene is rendered
	container = document.createElement('div');
	container.style.width = 0.65*window.innerWidth + "px";
	container.style.height = 0.55*window.innerHeight + "px";
	container.style.marginTop = "3%";
	container.style.marginBottom = "3%";
	container.style.position = "relative";
	container.style.zIndex = "1";
	
	container.setAttribute("id","canvas");
	container.setAttribute("width", 0.65*window.innerWidth + "px");
	container.setAttribute("height", 0.7*window.innerHeight + "px");

	document.body.appendChild( container );

	//definition of renderer
	var R_WIDTH = parseFloat(document.getElementById("canvas").getAttribute("width"));
	var R_HEIGHT = parseFloat(document.getElementById("canvas").getAttribute("height"));
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( R_WIDTH, R_HEIGHT );
	renderer.setClearColor( 0x444444 );
	renderer.setPixelRatio( window.devicePixelRatio );

	//to create "help" bar
	var legend = document.createElement('div');
	
	legend.setAttribute("id","legend");
	
//	legend.style.width = 0.21*parseInt(document.getElementById("canvas").getAttribute("width")) + "px";
//	legend.style.height = 0.16*parseInt(document.getElementById("canvas").getAttribute("height")) + "px";
	legend.innerHTML = "<code><p align='left' style='margin-left: 4px'>Drag&nbsp;:&nbsp;Rotate<br>Scroll&nbsp;:&nbsp;Zoom&nbsp;In/Out<br>Click on a face to upload photo</p></code>";

	var help = document.createElement('div');
	help.setAttribute("id","help");
	help.innerHTML = "<code>Help</code>";
	help.appendChild(legend);

	//to create start/stop button
	var playButton = document.createElement('button');
	
	playButton.setAttribute("onclick","toggle()");
	playButton.setAttribute("class","toggleButton");
	
	playButton.innerHTML = "TOGGLE ROTATION ON/OFF";

	container.appendChild( renderer.domElement );
	container.appendChild( help );
	container.appendChild( playButton );

	//to restrict image size
	document.getElementById("image").style.maxWidth = 0.7*window.innerWidth + "px";
	document.getElementById("image").style.maxHeight = 0.7*window.innerHeight + "px";
	document.getElementById("popup1").style.zIndex = "1000";

	//definition of scene, camera and controls
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 45, R_WIDTH / R_HEIGHT , 1, 1000 );
	camera.position.set( 150, 150, 350 );

	controls = new THREE.TrackballControls( camera, renderer.domElement );
	controls.minDistance = 250;
	controls.maxDistance = 800;
	controls.rotateSpeed = 2.0;
	controls.zoomSpeed = 0.5;
	controls.noPan = true;
	
	cubeRender(im[0],im[1],im[2],im[3],im[4],im[5]);
	animate();
}

function cubeRender(i11,i12,i13,i14,i15,i16){
	scene.add( new THREE.AmbientLight( 0xffffff ) );

	//to create the cube
	var geometry = new THREE.BoxGeometry( 150, 150, 150 );
	
	var texture1 = new THREE.TextureLoader().load( i11 );
	var texture2 = new THREE.TextureLoader().load( i12 );
	var texture3 = new THREE.TextureLoader().load( i13 );
	var texture4 = new THREE.TextureLoader().load( i14 );
	var texture5 = new THREE.TextureLoader().load( i15 );
	var texture6 = new THREE.TextureLoader().load( i16 );

	var material1 = new THREE.MeshPhongMaterial( { map: texture1 } );
	var material2 = new THREE.MeshPhongMaterial( { map: texture2 } );
	var material3 = new THREE.MeshPhongMaterial( { map: texture3 } );
	var material4 = new THREE.MeshPhongMaterial( { map: texture4 } );
	var material5 = new THREE.MeshPhongMaterial( { map: texture5 } );
	var material6 = new THREE.MeshPhongMaterial( { map: texture6 } );

	var materials = [material1, material2, material3, material4, material5, material6];
	var material = new THREE.MeshFaceMaterial( materials );
	
	mesh = new THREE.Mesh( geometry, material );

	scene.add( mesh );
	renderer.render(scene,camera);
	renderer.domElement.addEventListener( 'click', onDocumentMouseDown, false );
	//animate();
}

function animate() {
	//function to animate the scene
	requestAnimationFrame( animate );

	if(rotating==true){
		mesh.rotation.x += 0.01;
		mesh.rotation.y += 0.02;
	}
	controls.update();
	renderer.render(scene,camera);
}

function toggle() {
	//function invoked on button click
	if(rotating==false) {
		rotating=true;
	}
	else {
		rotating=false;
	}
}
function onDocumentMouseDown( event ) {
	var raycaster = new THREE.Raycaster();

	var vector = new THREE.Vector3(( event.clientX / window.innerWidth ) * 2 - 1, 
					-( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
	vector.unproject( camera );
	raycaster.set( camera.position, vector.sub( camera.position ).normalize() );

	var intersects = raycaster.intersectObject( mesh );
	if ( intersects.length > 0 ) {
		var index = Math.floor( intersects[0].faceIndex / 2 );
		
		switch (index) {
			case 0: 
		        	curr_index=newpop1(index);
           			break;
       			case 1: 
         			curr_index=newpop1(index);
         			break;
           		case 2: 
         			curr_index=newpop1(index);
				break;
			case 3: 
				curr_index=newpop1(index);
				break;
			case 4: 
				curr_index=newpop1(index);
				break;
			case 5: 
 				curr_index=newpop1(index);
	         		break;
      		}

   	}
}


var x;
	
function loadFile(event) {
	var output = document.getElementById('image');
	output.src = URL.createObjectURL(event.target.files[0]);
	//if(document.getElementById('browse').value)
	document.getElementById("upload").disabled=false;

	if (!event.target.files[0].name.match(/\.(bmp|tiff|jpg|jpeg|png|gif)$/)) {
		alert('Not a Valid type!');
	    	closePopup();
	}
	x=output.src;
	//console.log("value of x:"+x);
	//to enable "upload" button
	
}

function newpop1(index)
{
	location.href = "#popup1";
	
	switch(index) {
		case 0: 
			document.getElementById("image").src=im[0];
			break;
		case 1:
			document.getElementById("image").src=im[1];
			break;
		case 2:
			document.getElementById("image").src=im[2];
			break;
		case 3:
			document.getElementById("image").src=im[3];
			break;
		case 4:
			document.getElementById("image").src=im[4];
			break;
		case 5:
			document.getElementById("image").src=im[5];
			break;
	}
	return index;
}

function uploadFunc(index) {
	console.log("upload func called, index="+index);
	newscene();

	switch(index){
		case 0:
			im[0]=x;
			break;
		case 1:
			im[1]=x;
			break;
		case 2:
			im[2]=x;
			break;
		case 3:
			im[3]=x;
			break;
		case 4:
			im[4]=x;
			break;
		case 5:
			im[5]=x;
			break;
	}
	cubeRender(im[0],im[1],im[2],im[3],im[4],im[5]);
	//to disable "upload" button
	document.getElementById("upload").disabled=true;
}

function closePopup() {
	location.href = "#";
	//to disable "upload" button
	document.getElementById("upload").disabled=true;
}

function newscene() {
	scene = new THREE.Scene();	
}
function changeImageP(){
	
	//index_val=curr_index;
	curr_index-=1;
	if(curr_index==-1){
		curr_index=5;
	}
	document.getElementById("image").src=im[curr_index];

}
function changeImageN(){
	
	//index_val=curr_index;
	curr_index+=1;
	if(curr_index==6){
		curr_index=0;
	}
	document.getElementById("image").src=im[curr_index];

}
function webglAvailable() {
    try {
        var canvas1 = document.createElement("canvas");
        return !!
            window.WebGLRenderingContext && 
            (canvas.getContext("webgl") || 
                canvas.getContext("experimental-webgl"));
    } catch(e) { 
        return false;
    } 
}
