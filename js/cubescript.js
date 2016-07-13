/*
	JavaScript code to view and rotate the cube
*/

/*	Variable declarations		*/
var	container,
	playButtonOn, playButtonOff,
	camera, scene, renderer, controls,
	mesh,
	rx=0, ry=0,
	blobUrl,
	MIN_INDEX=0, MAX_INDEX=5,
	curr_index=0,
	rotating=true,
	R_WIDTH, R_HEIGHT,
	imprefix="images/cube";
	im=[imprefix+"1.jpg",imprefix+"2.jpg",imprefix+"3.jpg",imprefix+"4.jpg",imprefix+"5.jpg",imprefix+"6.jpg"];



/*	Function to render the cube with images on each face	*/
function cubeRender( ){
	scene.add( new THREE.AmbientLight( 0xffffff ) );

	var geometry = new THREE.BoxGeometry( 150, 150, 150 );

	var materials = [];
	var i;
	for(i in im){
		materials[i] = new THREE.MeshPhongMaterial( { map: (new THREE.TextureLoader().load( im[i] )), overdraw:0.5 } );
	}
	var material = new THREE.MeshFaceMaterial( materials );

	mesh = new THREE.Mesh( geometry, material );

	scene.add( mesh );
	mesh.rotation.set(rx,ry,0);
	
	renderer.render(scene,camera);
	renderer.domElement.addEventListener( 'click', onDocumentMouseDown, false );
}

/*	Function to animate the scene	*/
function animate() {

	requestAnimationFrame( animate );

	if(rotating){
		mesh.rotation.x += 0.01;
		mesh.rotation.y += 0.02;
	}
	rx=mesh.rotation.x;
	ry=mesh.rotation.y;
	controls.update();
	renderer.render(scene,camera);
}

/*	Function to toggle cube rotation on/off	*/
function toggle() {
	rotating = !rotating;
	if(rotating){
		playButtonOff.style.display = "none";
		playButtonOn.style.display = "initial";
	}
	else{
		playButtonOn.style.display = "none";
		playButtonOff.style.display = "initial";
	}
}

/*	Function to open the pop-up modal	*/
function newpop1()
{
	rotating=false;
	playButtonOn.style.display = "none";
	playButtonOff.style.display = "initial";
	
	var overlay = document.getElementById("popup1");
	overlay.style.transform = "scale(1)";
	overlay.style.visibility = "visible";
	overlay.style.opacity = "1";
	document.getElementById("image").src = im[curr_index];
}


/*	Function to handle face click event	*/
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

/*	Function to load the URL of uploaded image and display it on the pop-up	*/
function loadFile(event) {
	var output = document.getElementById('image');
	output.src = URL.createObjectURL(event.target.files[0]);
	
	document.getElementById("upload").disabled=false;

	if (!event.target.files[0].name.match(/\.(bmp|tiff|jpg|jpeg|png|gif)$/)) {
		alert('Not a Valid type!');
	    	closePopup();
	}
	blobUrl=output.src;
}

/*	Function to create new scene	*/
function newscene() {
	scene = new THREE.Scene();	
}

/*	Function to load the image onto the face of the cube	*/
function uploadFunc() {
	newscene();
	im[curr_index] = blobUrl;

	cubeRender();

	//to disable "upload" button
	document.getElementById("upload").disabled=true;
}

/*	Function to close the pop-up modal	*/
function closePopup() {
	var overlay = document.getElementById("popup1");
	overlay.style.transform = "scale(0)";
	overlay.style.visibility = "hidden";
	overlay.style.opacity = "0";
	document.getElementById("upload").disabled=true;
}

/* Functions prevImage() and nextImage() to navigate the image gallery on the pop-up	*/
function prevImage(){
	
	curr_index--;
	if(curr_index==MIN_INDEX-1){
		curr_index=MAX_INDEX;
	}
	document.getElementById("image").src=im[curr_index];

}

function nextImage(){
	curr_index++;
	if(curr_index==MAX_INDEX+1){
		curr_index=MIN_INDEX;
	}
	document.getElementById("image").src=im[curr_index];

}

/*	Function to handle the window resize event	*/
function onWindowResize(){
	var containerInfo = container.getBoundingClientRect();
	R_WIDTH = containerInfo.width;
	R_HEIGHT = containerInfo.height;

	camera.aspect = R_WIDTH / R_HEIGHT;
	camera.updateProjectionMatrix();

	renderer.setSize( R_WIDTH, R_HEIGHT );
}

/*	Function to detect support for WebGL renderer	*/
function webglAvailable() {
	try {
		var canvas = document.createElement( 'canvas' );
		return !!( window.WebGLRenderingContext && (
			canvas.getContext( 'webgl' ) ||
			canvas.getContext( 'experimental-webgl' ) )
			);
	} catch ( e ) {
		return false;
	}
}

/*	init() function	*/
function init() {

	//to create container inside which the 3D scene is rendered
	container = document.getElementById("canvas");

	//definition of renderer
	
	var containerInfo = container.getBoundingClientRect();
	R_WIDTH = containerInfo.width;
	R_HEIGHT = containerInfo.height;

	webglAvailable();
	if ( webglAvailable() ) {
		renderer = new THREE.WebGLRenderer();
	} else {
		renderer = new THREE.CanvasRenderer();
	}
	renderer.domElement.setAttribute("id","render");
	renderer.setSize( R_WIDTH, R_HEIGHT );
	renderer.setClearColor( 0x1abc9c );
	renderer.setPixelRatio( window.devicePixelRatio );

	//to create "help" bar

	container.appendChild( renderer.domElement );

	playButtonOn = document.getElementById("r_on");
	playButtonOff = document.getElementById("r_off");

	//to restrict size of pop-up image
	document.getElementById("image").style.maxWidth = 0.7*window.innerWidth + "px";
	document.getElementById("image").style.maxHeight = 0.7*window.innerHeight + "px";
	document.getElementById("popup1").style.zIndex = "1000";

	//definition of scene, camera and controls
	scene = new THREE.Scene();
	var ord = 300;
	camera = new THREE.PerspectiveCamera( 45, R_WIDTH / R_HEIGHT , 1, 1000 );
	camera.position.set( ord, ord, ord);

	controls = new THREE.TrackballControls( camera, renderer.domElement );
	controls.minDistance = 275;
	controls.maxDistance = 700;
	controls.rotateSpeed = 2.0;
	controls.zoomSpeed = 0.5;
	controls.noPan = true;
	
	cubeRender( );
	animate();
	
	window.addEventListener( 'resize', onWindowResize, false );
}

init();

/*/////////////////////////////////////////////////////////////
			END OF SCRIPT
//////////////////////////////////////////////////////////////*/
