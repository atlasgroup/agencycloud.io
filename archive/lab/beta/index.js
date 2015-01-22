/* Header */

( function() {

  window.Header = {};

  window.Header.scene = new THREE.Scene();
  window.Header.camera = new THREE.PerspectiveCamera( 75 , window.innerWidth / window.innerHeight , 0.1 , 1000 );

  window.Header.renderer = new THREE.WebGLRenderer( { alpha : true } );
  window.Header.renderer.setSize( window.innerWidth , window.innerHeight );
  document.getElementsByTagName( 'canvas' )[ 0 ].parentNode.replaceChild( window.Header.renderer.domElement , document.getElementsByTagName( 'canvas' )[ 0 ] );

  window.Header.geometry = new THREE.TetrahedronGeometry();
  window.Header.material = new THREE.MeshBasicMaterial( { color : 0x000000 , wireframe : true } );
  window.Header.mesh = new THREE.Mesh( window.Header.geometry, window.Header.material );
  window.Header.scene.add( window.Header.mesh );

  window.Header.camera.position.z = 5;

  window.Header.raf;

  window.Header.render = function () {

    window.Header.raf = requestAnimationFrame( window.Header.render );

    window.Header.mesh.rotation.x += 0.01;
    window.Header.mesh.rotation.y += 0.01;

    window.Header.renderer.render( window.Header.scene , window.Header.camera );

  };

  window.Header.render();

})();

/* Nav */

( function() {

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75 , 110 / 110 , 0.1 , 1000 );

  var renderer = new THREE.WebGLRenderer( { alpha : true } );
  renderer.setSize( 110 , 110 );
  document.getElementsByTagName( 'canvas' )[ 1 ].parentNode.replaceChild( renderer.domElement , document.getElementsByTagName( 'canvas' )[ 1 ] );

  var geometry = new THREE.TetrahedronGeometry();
  var material = new THREE.MeshBasicMaterial( { color : 0x000000 , wireframe : true } );
  var cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  camera.position.z = 5;

  var render = function () {

    requestAnimationFrame( render );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene , camera );

  };

  render();

})();
