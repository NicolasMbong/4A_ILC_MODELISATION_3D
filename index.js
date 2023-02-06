  // Initialisation de la scène
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
  camera.position.z = 10;
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.render( scene, camera );
  // Création de la sphère S
  var sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
  var sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
  });
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  scene.add(sphere);

  // Création de la petite sphère S0
  var smallSphereGeometry = new THREE.SphereGeometry(1, 32, 32);
  var smallSphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00
  });
  var smallSphere = new THREE.Mesh(smallSphereGeometry, smallSphereMaterial);
  smallSphere.position.set(3, 0, 0);
  scene.add(smallSphere);

  // Créez la courbe de Bézier pour la trajectoire
  var curve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(3, 0, 0),
    new THREE.Vector3(3, 5, 2),
    new THREE.Vector3(-3, 5, 2),
    new THREE.Vector3(-3, 0, 0)
  );

  // Créez le géométrie pour la courbe
  var curveGeometry = new THREE.Geometry();
  curveGeometry.vertices = curve.getPoints(50);

  // Créez le matériel pour la courbe
  var curveMaterial = new THREE.LineBasicMaterial({color: 0xffffff});

  // Créez le maillage pour la courbe
  var curveMesh = new THREE.Line(curveGeometry, curveMaterial);

  scene.add(curveMesh);


  // Paramètres de l'animation
  var params = {
    angle: 0,
    radius: 2,
    speed: 0.01,
    inclinaison: 1.3
  };

  // Initialisation de l'interface de contrôle
  var gui = new dat.GUI();
  gui.add(params, 'radius', 0, 10).step(0.1).onChange(function(value) {
    radius = value;
  });
  gui.add(params, 'speed', -0.1, 0.1).step(0.01).onChange(function(value) {
    speed = value;
  });
  gui.add(params, 'inclinaison', 0, Math.PI / 2).step(0.01).onChange(function(value) {
    inclinaison = value;
  });

  // Définissez le point de contrôle de la caméra
  var control = new THREE.OrbitControls(camera, renderer.domElement);

  // Utilisez Tween.js pour animer la petite sphère sur la courbe
  var tween = new TWEEN.Tween(smallSphere.position)
     .to({x: -3, y: 0, z: 0}, 3000)
     .easing(TWEEN.Easing.Quadratic.InOut)
     .onUpdate(function() {
       smallSphere.position.copy(this);
     })
     .start();

   // Variables de l'animation
   var radius = params.radius;
   var speed = params.speed;
   var inclinaison = params.inclinaison;


   // Fonction de rendu de la scène
  function render() {
    requestAnimationFrame(render);

    // Mise à jour de la petite sphère S0
    smallSphere.position.x = radius * Math.sin(params.angle);
    smallSphere.position.y = radius * Math.sin(inclinaison) * Math.cos(params.angle);
    smallSphere.position.z = radius * Math.cos(inclinaison) * Math.cos(params.angle);

    // Mise à jour de l'angle
    params.angle += speed;

    // Mise à jour de la caméra
    camera.position.x = smallSphere.position.x;
    camera.position.y = smallSphere.position.y;
    camera.position.z = smallSphere.position.z + 10;
    camera.lookAt(sphere.position);

    // Rendu de la scène
    renderer.render(scene, camera);

    // Mise à jour de Tween.js
    TWEEN.update();
  }

  render();