/*
Type: JavaScript
Description: To view and rotate the cube
*/

var flag=0;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
var geometry = new THREE.BoxGeometry( 2, 2, 2, 5, 5, 1);
var material = new THREE.MeshBasicMaterial( {color: 0xEE00EE, wireframe: true, wireframeLinewidth: 1} );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 4;

renderer.render(scene,camera);

function animate() {
	requestAnimationFrame(animate);

	if(flag==1){
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.02;
		renderer.render(scene,camera);
	}
	if(flag==2){
		renderer.render(scene,camera);
	}
}

function begin() {
	if(flag==0)
		animate();
	flag=1;
}

function stop() {
	flag=2;
}

