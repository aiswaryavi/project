/*
	JavaScript code to view and rotate the cube
*/

var container;
var playButton;
var camera, scene, renderer, controls;
var mesh;
var blobUrl;
var curr_index=0;
var rotating=true;
var im=["images/cube1.jpg","images/cube2.jpg","images/cube3.jpg","images/cube4.jpg","images/cube5.jpg","images/cube6.jpg"];

webglAvailable();

init();

function init() {


	//to create container inside which the 3D scene is rendered
	container = document.getElementById("canvas");
	container.style.width = 0.65*window.innerWidth + "px";
	container.style.height = 0.55*window.innerHeight + "px";

	//definition of renderer
	var R_WIDTH = parseFloat(container.style.width);
	var R_HEIGHT = parseFloat(container.style.height);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( R_WIDTH, R_HEIGHT );
	renderer.setClearColor( 0x113355 );
	renderer.setPixelRatio( window.devicePixelRatio );

	//to create "help" bar
	var legend = document.createElement('div');
	legend.setAttribute("id","legend");
	legend.innerHTML = "<code><p align='left' style='margin-left: 4px'>Drag&nbsp;:&nbsp;Rotate<br>Scroll&nbsp;:&nbsp;Zoom&nbsp;In/Out<br>Click on a face to upload photo</p></code>";

	var help = document.createElement('div');
	help.setAttribute("id","help");
	help.innerHTML = "<code>Help</code>";
	help.appendChild(legend);

	//to create start/stop button
	playButton = document.createElement('button');
	
	playButton.setAttribute("onclick","toggle()");
	playButton.setAttribute("class","toggleButton");
	playButton.innerHTML = "<img src='images/extras/rotation.png' width='20px' height='20px' />"

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
	
	cubeRender( );
	animate();
}

function cubeRender( ){
	scene.add( new THREE.AmbientLight( 0xffffff ) );

	//to create the cube
	var geometry = new THREE.BoxGeometry( 150, 150, 150 );

	var materials = [];
	var i;
	for(i in im){
		materials[i] = new THREE.MeshPhongMaterial( { map: (new THREE.TextureLoader().load( im[i] )) } );
	}
	var material = new THREE.MeshFaceMaterial( materials );

	mesh = new THREE.Mesh( geometry, material );

	scene.add( mesh );
	renderer.render(scene,camera);
	renderer.domElement.addEventListener( 'click', onDocumentMouseDown, false );
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
	//to toggle rotation on/off
	rotating = !rotating;
	if(!rotating)
		playButton.innerHTML = "<img src='images/extras/rotation_off.png' width='20px' height='20px' />";
	else
		playButton.innerHTML = "<img src='images/extras/rotation.png' width='20px' height='20px' />"
}
function onDocumentMouseDown( event ) {
	var raycaster = new THREE.Raycaster();

	var vector = new THREE.Vector3(( event.clientX / window.innerWidth ) * 2 - 1, 
					-( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
	vector.unproject( camera );
	raycaster.set( camera.position, vector.sub( camera.position ).normalize() );

	var intersects = raycaster.intersectObject( mesh );
	if ( intersects.length > 0 ) {
		curr_index = Math.floor( intersects[0].faceIndex / 2 );
		newpop1();
   	}
}
	
function loadFile(event) {
	var output = document.getElementById('image');
	output.src = URL.createObjectURL(event.target.files[0]);
	//if(document.getElementById('browse').value)
	document.getElementById("upload").disabled=false;

	if (!event.target.files[0].name.match(/\.(bmp|tiff|jpg|jpeg|png|gif)$/)) {
		alert('Not a Valid type!');
	    	closePopup();
	}
	blobUrl=output.src;
	//to enable "upload" button
	
}

function newpop1()
{
	location.href = "#popup1";
	document.getElementById("image").src = im[curr_index];
}

function uploadFunc() {
	newscene();
	im[curr_index] = blobUrl;

	cubeRender();

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
