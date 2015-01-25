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

  .controller( 'ModelsController' , function ( $scope , $window , $state , $stateParams , Data , User , socket ) {

    socket.on( 'model:image:sizes:put' , function( image ) {

      for( var index = 0; index < $scope.data.models.length; index++ ) {

        if( $scope.data.models[ index ].url === image.model ) {

          if( $scope.data.models[ index ].image.sizes ) {

            $scope.data.models[ index ].image.sizes.push( image.size );

          } else {

            $scope.data.models[ index ].image.sizes = [ image.size ];

          }

        }

      }

    });

    Data.get().then( function( response ) {

      $scope.data = response;

      if( !$stateParams.model ) {

        /* No model is set, show the first one in the list */

        $state.go( 'models.model' , { model : $scope.data.models[ 0 ].url } );

      }

    });

    $scope.create = function() {

      /* Create a new model */

      var model = {

        name : 'New model',

        url : 'new-model',

        created : {

          on : Date.now(),

          by : User.name

        },

        updated : {

          on : Date.now(),

          by : User.name

        }

      };

      /* Add a new model to the list */

      $scope.data.models.unshift( model );

      /* Go to the new model */

      $state.go( 'models.model' , { model : 'new-model' } );

    };

  });
