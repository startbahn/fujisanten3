import * as THREE from '../lib/three.module.js';
import { DDSLoader } from '../lib/DDSLoader.js';
import { MTLLoader } from '../lib/MTLLoader.js';
import { OBJLoader } from '../lib/OBJLoader.js';
var container;
var camera, scene, renderer;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
init();
animate();
function init() {
  container = document.createElement( 'div' );
  container.setAttribute('class','bgFuji');
  document.body.appendChild( container );
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
  camera.position.z = 250;
  // scene
  scene = new THREE.Scene();
  var ambientLight = new THREE.AmbientLight( 0xFFFFFF, 1.5 );
  scene.add( ambientLight );
  var pointLight = new THREE.PointLight( 0xffffff, 0.1 );
  camera.add( pointLight );
  scene.add( camera );
  // model
  var onProgress = function ( xhr ) {
    if ( xhr.lengthComputable ) {
      var percentComplete = xhr.loaded / xhr.total * 100;
      console.log( Math.round( percentComplete, 2 ) + '% downloaded' );
    }
  };
  var onError = function () { };
  var manager = new THREE.LoadingManager();
  manager.addHandler( /\.dds$/i, new DDSLoader() );
  // comment in the following line and import TGALoader if your asset uses TGA textures
  // manager.addHandler( /\.tga$/i, new TGALoader() );
  new MTLLoader( manager )
    .setPath( 'objects/' )
    .load( 'fuji.mtl', function ( materials ) {
      materials.preload();
      new OBJLoader( manager )
        .setMaterials( materials )
        .setPath( 'objects/' )
        .load( 'fuji.obj', function ( object ) {
          object.scale.x = 45;
          object.scale.y = 45;
          object.scale.z = 45;
          object.rotation.y = 3;
          object.position.y = -10.5;
          scene.add( object );
        }, onProgress, onError );
    } );
  //
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  //
  window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
function onDocumentMouseMove( event ) {
  mouseX = ( event.clientX - windowHalfX ) / 2;
  mouseY = ( event.clientY - windowHalfY ) / 2;
}
//
function animate() {
  requestAnimationFrame( animate );
  render();
}
function render() {
  var radian = (window.pageYOffset * 2 + window.innerHeight)  / document.body.clientHeight > 1.46 ? 1.46 : (window.pageYOffset * 2 + window.innerHeight)  / document.body.clientHeight;
  camera.position.z = Math.sin(radian) * 700;
  camera.position.y = Math.cos(radian) * 900;
  camera.lookAt(scene.position);
  renderer.render( scene, camera );
}

var picker = document.getElementById('picker');
var pickerWrap = document.getElementById('picker').querySelector('.section__inr');
var pickerInner = document.getElementById('picker').querySelector('.section__picker--wrap');
pickerWrap.scrollLeft = 1;
var intersected = false;
var option = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5
};
function stopScrolling(e){ e.preventDefault();}
function changeDirection(e){
  console.log(pickerWrap.scrollLeft);
  if (pickerWrap.scrollLeft === 0) {
    intersected = false;
    pickerWrap.scrollLeft = 1;
    document.body.classList.remove('stop');
    document.removeEventListener('mousewheel', stopScrolling, {passive: false});
    picker.removeEventListener('mousewheel', changeDirection);
  // } else if (pickerWrap.scrollLeft >= (pickerInner.getBoundingClientRect().width - window.innerWidth )) {
  //   intersected = false;
  //   document.body.classList.remove('stop');
  //   document.removeEventListener('mousewheel', stopScrolling, {passive: false});
  //   picker.removeEventListener('mousewheel', changeDirection);
  } else {
    pickerWrap.scrollLeft += e.deltaY;
  }
}

// function doWhenIntersect(entries) {
//   intersected = !intersected;
//   console.log(intersected);
//   if(intersected){
    // document.addEventListener('mousewheel', stopScrolling, {passive: false});
    // picker.addEventListener('mousewheel', changeDirection);
//   }

// }
// var observer = new IntersectionObserver(doWhenIntersect, option);
// observer.observe(picker);

window.addEventListener('scroll', function(){
  console.log(window.pageYOffset, picker.offsetTop, pickerWrap.scrollLeft, ( pickerInner.getBoundingClientRect().width - window.innerWidth));
  if(window.pageYOffset > picker.offsetTop && !intersected) {
    intersected = true;
    var scrollOffsetY = picker.offsetTop;
    window.scrollTo(0, scrollOffsetY);
    document.body.classList.add('stop');
    picker.addEventListener('mousewheel', changeDirection);
    document.addEventListener('mousewheel', stopScrolling, {passive: false});
  }
});