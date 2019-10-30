var container;
var camera, scene, renderer;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
  container = document.createElement('div');
  container.setAttribute('class','bgFuji');
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.z = 1000;

  // scene
  scene = new THREE.Scene();
  camera.lookAt(scene.position);

  var ambient = new THREE.AmbientLight(0xffffff);
  scene.add(ambient);

  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(0, 0, 1);
  // scene.add(directionalLight);

  // texture
  var manager = new THREE.LoadingManager();
  manager.onProgress = function(item, loaded, total) {

    console.log(item, loaded, total);

  };

  var texture = new THREE.Texture();

  var onProgress = function(xhr) {
    if (xhr.lengthComputable) {
      var percentComplete = xhr.loaded / xhr.total * 100;
      console.log(Math.round(percentComplete, 2) + '% downloaded');
    }
  };

  var onError = function(xhr) {};

  var loader = new THREE.ImageLoader(manager);
   loader.load('./objects/texture.jpg', function(image) {
    texture.image = image;
    texture.needsUpdate = true;
  });

  // model
  var loader2 = new THREE.OBJLoader(manager);
  loader2.load('./objects/fuji.obj', function(object) {

    object.traverse(function(child) {

      console.log(child.material, texture);

      if (child instanceof THREE.Mesh) {

        child.material.map = texture;

      }

    });

    object.scale.x = 45;
    object.scale.y = 45;
    object.scale.z = 45;
    object.rotation.y = 3;
    object.position.y = -10.5;
    scene.add(object);

  }, onProgress, onError);

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  document.addEventListener('mousemove', onDocumentMouseMove, false);

  window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

function onDocumentMouseMove(event) {

  mouseX = (event.clientX - windowHalfX) / 2;
  mouseY = (event.clientY - windowHalfY) / 2;

}


function animate() {

  requestAnimationFrame(animate);
  render();

}

function render() {

  var radian = (window.pageYOffset * 2 + window.innerHeight)  / document.body.clientHeight > 1.46 ? 1.46 : (window.pageYOffset * 2 + window.innerHeight)  / document.body.clientHeight;
  camera.position.z = Math.sin(radian) * 700;
  camera.position.y = Math.cos(radian) * 900;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);

}