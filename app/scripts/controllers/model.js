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

  .controller( 'ModelController' , function ( $scope , $state , $stateParams , $window , Data , User ) {

    /* Set the current model once data is recieved */

    $scope.$watch( '$parent.data' , function() {

      if( $scope.$parent.data ) {

        $scope.model = _.findWhere( $scope.$parent.data.models , { url : $stateParams.model } ) || $scope.$parent.data.models[ 0 ];

      }

    });

    $scope.$watch( 'model.name' , function() {

      if( $scope.model ) {

        $scope.model.url = $scope.model.name.toLowerCase().replace( /[^\w ]+/g , '' ).replace( / +/g , '-' );

      }

    });

    $scope.update = function( model ) {

      if( !model.created ) {

        model.created = {

          on : Date.now(),

          by : User.name

        };

       }

       if( !model.updated ) {

        model.updated = {

          on : Date.now(),

          by : User.name

        };

       } else {

         model.updated.on = Date.now();

         model.updated.by = User.name;

       }

    };

    $scope.submit = function() {

      Data.put( $scope.$parent.data );

    };

    $scope.remove = function( model ) {

      if ( $window.prompt( 'Please enter your password to remove this model.' ) === 'admin' ) {

        $scope.$parent.data.models = _.without( $scope.$parent.data.models , model );

        $scope.submit();

        $state.go( 'models.model' , { model : $scope.data.models[ 0 ].url } );

      } else {

        $window.alert( 'You do not have permission to remove this model.' );

      }

    };

    $scope.notes = {

      create : function( model ) {

        var note = {

          created : {

            on : Date.now(),

            by : User.name

          },

          updated : {

            on : Date.now(),

            by : User.name

          }

        };

        if( model.notes ) {

          model.notes.push( note );

        } else {

          model.notes = [ note ];

        }

        $scope.update( model );

      },

      update : function( note , model ) {

        note.updated.on = Date.now();

        note.updated.by = User.name;

        $scope.update( model );

      },

      remove : function( note , model ) {

        model.notes = _.without( model.notes , note );

        $scope.update( model );

      }

    };

  });
