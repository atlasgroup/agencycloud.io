'use strict';

/**
 * @ngdoc directive
 * @name agencyCloudApp.directive:logo
 * @description
 * # logo
 */

angular

  .module( 'agencyCloudApp' )

  .directive( 'logo' , function () {

    return {

      restrict : 'E',

      link : function postLink( scope , element ) {

        var scene = new THREE.Scene();

        var camera = new THREE.PerspectiveCamera( 75 , element.width() / ( element.width() / 1.62 ) , 0.1 , 1000 );

        var renderer = new THREE.WebGLRenderer( { alpha : true } );

        renderer.setSize( element.width() , element.width() / 1.62 );

        element.append( renderer.domElement );

        var geometry = new THREE.TetrahedronGeometry();

        var material = new THREE.MeshBasicMaterial( { color : 0x000000 , wireframe : true } );

        var tetrahedron = new THREE.Mesh( geometry, material );

        scene.add( tetrahedron );

        camera.position.z = 5;

        var render = function () {

          requestAnimationFrame( render );

          tetrahedron.rotation.x += 0.01;
          tetrahedron.rotation.y += 0.01;

          renderer.render( scene , camera );

        };

        render();
      }

    };

  });
