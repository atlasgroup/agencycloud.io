'use strict';

/**
 * @ngdoc function
 * @name agencyCloudApp.controller:ModelsController
 * @description
 * # ModelsController
 * Controller of the agencyCloudApp
 */

angular

  .module( 'agencyCloudApp' )

  .controller( 'ModelsController' , function ( $scope , $state , $stateParams , Data , Progress ) {

    Progress.progress = 30;

    Data.get().then( function( response ) {

      Progress.progress = 90;

      $scope.data = response;

      if( $stateParams.model ) {

        $scope.model = $scope.data.models.filter( function( model ) {

          return model.url === $stateParams.model;

        })[ 0 ];

      } else {

        $state.go( 'models.model' , { model : $scope.data.models[ 0 ].url } );

      }

      Progress.progress = 100;

    });

  });
