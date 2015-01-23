'use strict';

/**
 * @ngdoc function
 * @name agencyCloudApp.controller:ModelController
 * @description
 * # ModelController
 * Controller of the agencyCloudApp
 */

angular

  .module( 'agencyCloudApp' )

  .controller( 'ModelController' , function ( $scope , $state , $stateParams , Data ) {

    Data.get().then( function( response ) {

      $scope.data = response;

      if( $stateParams.model ) {

        $scope.model = $scope.data.models.filter( function( model ) {

          return model.url === $stateParams.model;

        })[ 0 ];

      } else {

        $state.go( 'models.model' , { model : $scope.data.models[ 0 ].url } );

      }

    });

  });
