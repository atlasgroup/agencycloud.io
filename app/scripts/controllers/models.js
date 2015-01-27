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

  .controller( 'ModelsController' , function ( $scope , $window , $state , $stateParams , Data , User ) {

    /*socket.on( 'model:image:sizes:put' , function( image ) {

      console.log( image );

      for( var index = 0; index < $scope.data.models.length; index++ ) {

        if( $scope.data.models[ index ].url === image.model ) {

          if( $scope.data.models[ index ].image.sizes ) {

            $scope.data.models[ index ].image.sizes.push( image.size );

            if( image.size === 272 ) {

              $scope.data.models[ index ].image.$$progress[ 1 ].status = 'Resized image created.';

              $scope.data.models[ index ].image.$$progress[ 1 ].percentage = 100;

            }

            if( image.size === 750 ) {

              $scope.data.models[ index ].image.$$progress[ 2 ].status = 'Resized image created.';

              $scope.data.models[ index ].image.$$progress[ 2 ].percentage = 100;

            }

            if( image.size === 1536 ) {

              $scope.data.models[ index ].image.$$progress[ 3 ].status = 'Resized image created.';

              $scope.data.models[ index ].image.$$progress[ 3 ].percentage = 100;

            }

            if( image.size === 2880 ) {

              $scope.data.models[ index ].image.$$progress[ 4 ].status = 'Resized image created.';

              $scope.data.models[ index ].image.$$progress[ 4 ].percentage = 100;

              console.log( 'DONE' , ( Date.now() - $window.start ) / 1000 );

            }

          } else {

            $scope.data.models[ index ].image.sizes = [ image.size ];

          }

        }

      }

    });*/

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
