'use strict';

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container, camera, scene, renderer, composer;
var mouseX = 0;
var mouseY = 0;
var SQRT_3 = Math.pow(3, 0.5);
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var tSide = 400;
var CAMERA_Z = 1000 * 0.5;


init();
animate();


// -----------------------------
// Init
// -----------------------------
function init() {
  // Setup container
  container = document.createElement('div');
  document.body.appendChild(container);

  // Setup camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
  camera.position.z = CAMERA_Z;

  // Setup the Scene
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.0015);

  // Calculate Triangle Vertices
  var vertices = [new THREE.Vector3(0, tSide/SQRT_3, 0),
                  new THREE.Vector3(-tSide/2,  -tSide * 0.5 / SQRT_3, 0),
                  new THREE.Vector3(tSide/2,  -tSide * 0.5 / SQRT_3, 0)];

  // Build Geometry
  var geom = new THREE.Geometry();

  for (var i = vertices.length - 1; i >= 0; i--) {
    geom.vertices.push(vertices[i]);
  };

  geom.faces.push( new THREE.Face3(0, 1, 2) );
  geom.computeFaceNormals();

  var mesh = new THREE.Mesh( geom, new THREE.MeshBasicMaterial({
    color: new THREE.Color('#F9BE99'),
    side: THREE.DoubleSide
  }));

  // Add mesh to scene
  scene.add(mesh);

  // Build and attach renderer to DOM
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(new THREE.Color('#FFEBBA'), 1);
  container.appendChild(renderer.domElement);

  // postprocessing
  composer = new THREE.EffectComposer( renderer );
  composer.addPass(new THREE.RenderPass( scene, camera ));

  var effect = new THREE.ShaderPass( THREE.DotScreenShader );
  effect.uniforms['scale'].value = 6;
  composer.addPass(effect);

  var effect = new THREE.ShaderPass( THREE.RGBShiftShader );
  effect.uniforms['amount'].value = 0.005; // 0.0015;
  effect.renderToScreen = true;
  composer.addPass(effect);

  // Document event listeners
  document.addEventListener('mousemove', onDocumentMouseMove, false);
  document.addEventListener('touchstart', onDocumentTouchStart, false);
  document.addEventListener('touchmove', onDocumentTouchMove, false);
  // Window event listeners
  window.addEventListener('resize', onWindowResize, false);
}


// -----------------------------
// Update Animation
// -----------------------------
function animate() {
  requestAnimationFrame(animate);
  render();
}


// -----------------------------
// Render Loop
// -----------------------------
function render() {
  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (-mouseY - camera.position.y) * 0.05;
  camera.lookAt(scene.position);
  // Render using the composer
  composer.render();
}



// -----------------------------
// Events
// -----------------------------
function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

function onDocumentTouchStart(event) {
  if (event.touches.length === 1) {
    event.preventDefault();

    mouseX = event.touches[0].pageX - windowHalfX;
    mouseY = event.touches[0].pageY - windowHalfY;

  }
}

function onDocumentTouchMove(event) {
  if (event.touches.length === 1) {
    event.preventDefault();

    mouseX = event.touches[0].pageX - windowHalfX;
    mouseY = event.touches[0].pageY - windowHalfY;
  }
}