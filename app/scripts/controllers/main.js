'use strict';

/**
 * @ngdoc function
 * @name agencyCloudApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the agencyCloudApp
 */

angular

  .module( 'agencyCloudApp' )

  .controller( 'MainController' , function ( $scope , socket ) {

    socket.on( 'welcome' , function( response ) {

      console.log( response );

    });

    $scope.nav = [

      'dashboard',

      'models'

    ];

    /* Data needs to be a service */

    socket.emit( 'data:get' , {

      account : 'freedom'

    } , function( response ) {

      $scope.data = JSON.parse( response );

      console.log( $scope.data );

    });

  });
