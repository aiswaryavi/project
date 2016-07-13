/*
	JavaScript code to view and rotate the cube
*/

var container;
var camera, scene, renderer, controls;
var mesh;
var rotating=1;
var flag=0;
var raycaster,index;
var i1="images/cube1.jpg";
var i2="images/cube2.jpg";
var i3="images/cube3.jpg";
var i4="images/cube4.jpg";
var i5="images/cube5.jpg";
var i6="images/cube6.jpg";


init();

function init() {
	//to create container inside which the 3D scene is rendered
	container = document.createElement('div');
	container.style.width = 0.65*window.innerWidth + "px";
	container.style.height = 0.55*window.innerHeight + "px";
	container.style.marginTop = "3%";
	container.style.marginBottom = "3%";
	container.style.position = "relative";
	
	container.setAttribute("id","canvas");
	container.setAttribute("width", 0.65*window.innerWidth + "px");
	container.setAttribute("height", 0.7*window.innerHeight + "px");

	document.body.appendChild( container );

	//definition of renderer
	var r_width = parseFloat(document.getElementById("canvas").getAttribute("width"));
	var r_height = parseFloat(document.getElementById("canvas").getAttribute("height"));
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( r_width, r_height );
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

	//definition of scene, camera and controls
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 45, r_width / r_height , 1, 1000 );
	camera.position.set( 150, 150, 350 );

	controls = new THREE.TrackballControls( camera, renderer.domElement );
	controls.minDistance = 250;
	controls.maxDistance = 800;
	controls.rotateSpeed = 2.0;
	controls.zoomSpeed = 0.5;
	controls.noPan = true;
	cubeRender(i1,i2,i3,i4,i5,i6);
	animate();
}

	function cubeRender(i11,i12,i13,i14,i15,i16){
	scene.add( new THREE.AmbientLight( 0xffffff ) );

	//to create the cube
	var geometry = new THREE.BoxGeometry( 150, 150, 150 );
	
	var texture1 = new THREE.TextureLoader().load(i11 );
	var texture2 = new THREE.TextureLoader().load( i12 );
	var texture3 = new THREE.TextureLoader().load( i13);
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

	if(rotating==1){
		mesh.rotation.x += 0.01;
		mesh.rotation.y += 0.02;
	}
	controls.update();
	renderer.render(scene,camera);
}

function toggle() {
	//function invoked on button click
	if(rotating==0) {
		rotating=1;
	}
	else if (rotating==1) {
		rotating=0;
	}
}
function onDocumentMouseDown( event ) {

	raycaster = new THREE.Raycaster();

   var vector = new THREE.Vector3( 
      ( event.clientX / window.innerWidth ) * 2 - 1, 
      - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
   vector.unproject( camera );
   raycaster.set( camera.position, vector.sub( camera.position ).normalize() );

   var intersects = raycaster.intersectObject( mesh );
   if ( intersects.length > 0 ) {
      index = Math.floor( intersects[0].faceIndex / 2 );
      switch (index) {
         case 0: 
         	alert(index);
         	scene = new THREE.Scene();
        	newpop1();
           	break;
         
         case 1: 
         	alert(index); 
         	scene = new THREE.Scene();
         	newpop1();
         	dr(i1,i2,i3,i4,i5,i6);
         	break;
         
         case 2: 
         	alert(index);
         	scene = new THREE.Scene();
         	newpop1();
         	dr(i1,i2,i3,i4,i5,i6);
         	 break;
         
         case 3: 
         	alert(index);
         	scene = new THREE.Scene();
         	newpop1();
         	dr(i1,i2,i3,i4,i5,i6); 
         	break;
         
         case 4: 
         	alert(index); 
         	scene = new THREE.Scene();
         	newpop1();
         	dr(i1,i2,i3,i4,i5,i6);
         	break;
         
         case 5: 
         	alert(index);
         	scene = new THREE.Scene();
         	newpop1();
         	dr(i1,i2,i3,i4,i5,i6); 
         	break;
      }

   }
  
}






function newpop1()
{
  generator=window.open('pop/popup.html','w1','height=400,width=500',titlebar='0');

 	//return 1;
 

 
/*  generator.document.write('</head><body>');
  var pp=generator.document.createElement("input");
  pp.setAttribute("type","file");
   pp.setAttribute("id","ff");
  generator.document.body.appendChild(pp);
   im=generator.document.getElementById("ff").value;
    var pp=generator.document.createElement("button");
  pp.setAttribute("onclick","uu()");
   pp.setAttribute("id","bu");
     pp.setAttribute("name","upload");
     var t = document.createTextNode("upload");      
	pp.appendChild(t); 
  generator.document.body.appendChild(pp);
  var a=""	
  //generator.document.write('<a href="javascript:self.close()"> Close</a>');
  generator.document.write('javascript:""+str');
  generator.document.write('</body></html>');
  //generator.document.close();
  //alert (im);
  return im;*/
}
function newscene() {
	scene = new THREE.Scene();	
}

