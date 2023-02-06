

function init(){
 var stats = initStats();
    // creation de rendu et de la taille
 let rendu = new THREE.WebGLRenderer({ antialias: true });
 rendu.shadowMap.enabled = true;
 let scene = new THREE.Scene();   
 let camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 100);
 rendu.shadowMap.enabled = true;
 rendu.setClearColor(new THREE.Color(0xFFFFFF));
 rendu.setSize(window.innerWidth*.9, window.innerHeight*.9);
 
 

 
    var axes = new THREE.AxesHelper(1);    
    scene.add(axes);
    repere(scene)
    

 //********************************************************
 //
 //  P A R T I E     G E O M E T R I Q U E
 //
 //********************************************************
 
 
 //********************************************************
 //
 // F I N      P A R T I E     G E O M E T R I Q U E
 //
 //********************************************************
 
 //********************************************************
 //
 //  D E B U T     M E N U     G U I
 //
 //********************************************************

 //********************************************************
 //
 //  F I N     M E N U     G U I
 //
 //********************************************************
 renduAnim();
 
 
  // ajoute le rendu dans l'element HTML
 document.getElementById("webgl").appendChild(rendu.domElement);
   
  // affichage de la scene
 rendu.render(scene, camera);
  
 
 function reAffichage() {
  setTimeout(function () { 
 
  }, 200);// fin setTimeout(function ()
    // render avec requestAnimationFrame
  rendu.render(scene, camera);
 }// fin fonction reAffichage()
 
 
  function renduAnim() {
    stats.update();
    // render avec requestAnimationFrame
    requestAnimationFrame(renduAnim);
// ajoute le rendu dans l'element HTML
    rendu.render(scene, camera);
  }
 
} // fin fonction init()

function vecteur(MaScene, A, B, CoulHexa, longCone, RayonCone) {
  var vecAB = new THREE.Vector3(B.x-A.x, B.y-A.y, B.z-A.z);
  vecAB.normalize();
  MaScene.add(new THREE.ArrowHelper(vecAB, A, B.distanceTo(A), CoulHexa,longCone,RayonCone));
}

function repere(MaScene){
  var Point03 = new THREE.Vector3(0,0,0);
  var vecI = new THREE.Vector3(1,0,0);
  var vecJ = new THREE.Vector3(0,1,0);
  var vecK = new THREE.Vector3(0,0,1);
  vecteur(MaScene,Point03,vecI, 0xFF0000, 0.25,0.125);
  vecteur(MaScene,Point03,vecJ, 0x00FF00, 0.25,0.125);
  vecteur(MaScene,Point03,vecK, 0x0000FF, 0.25,0.125);
}
