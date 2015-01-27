'use strict';

/*jshint -W109 */

/**
 * @ngdoc function
 * @name agencyCloudApp.controller:ModelController
 * @description
 * # ModelController
 * Controller of the agencyCloudApp
 */

angular

  .module( 'agencyCloudApp' )

  .controller( 'ModelController' , function ( $scope , $state , $stateParams , $window , Data , User , socket ) {

    socket.on( 'progress:put' , function( request ) {

      var message = JSON.parse( request );

      for( var index = 1; index < $scope.model.image.$$progress.length; index++ ) {

        var progress = $scope.model.image.$$progress[ index ];

        if( progress.label === message.size + 'px' && progress.state < message.status ) {

          progress.state = message.status;

          if( progress.state === 1 ) {

            progress.status = 'Worker server launched. Receiving original image data…';

            progress.percentage = 50;

          }

          if( progress.state === 2 ) {

            progress.status = 'Original image data received. Resizing to ' + progress.label + '…';

            progress.percentage = 75;

          }

          if( progress.state === 3 ) {

            progress.status = 'Image resize completed.';

            progress.percentage = 100;

          }

        }

      }

    });

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

      if( $scope.model.image && $scope.model.image.$$file ) {

        $scope.model.image.$$progress = [

          {

            status : 'Uploading original image…',

            label : 'Original',

            percentage : 0,

            state : 0

          } , {

            status : 'Waiting for original image to finish uploading…',

            label : '272px',

            percentage : 0,

            state : 0

          } , {

            status : 'Waiting for original image to finish uploading…',

            label : '750px',

            percentage : 0,

            state : 0

          } , {

            status : 'Waiting for original image to finish uploading…',

            label : '1536px',

            percentage : 0,

            state : 0

          } , {

            status : 'Waiting for original image to finish uploading…',

            label : '2880px',

            percentage : 0,

            state : 0

          }

        ];

        socket.emit( 'aws:credentials:get' , {} , function( credentials ) {

          var today = new Date().toJSON().slice( 0 , 10 ).split( '-' ).join( '' );

          var endpoint = 'https://s3-us-west-2.amazonaws.com/lambdatestbucket/';

          var form = new FormData();

          form.append( 'key' , $scope.model.image.url );

          form.append( 'x-amz-credential' , 'AKIAJD4CVTSTWPYNI4DQ/' + today + '/us-west-2/s3/aws4_request' );

          form.append( 'x-amz-algorithm' , 'AWS4-HMAC-SHA256' );

          form.append( 'x-amz-date' , today + 'T000000Z' );

          form.append( 'policy' , credentials.policy );

          form.append( 'x-amz-signature' , credentials.signature );

          form.append( 'file' , $scope.model.image.$$file );

          var xhr = new XMLHttpRequest();

          xhr.upload.addEventListener( 'progress' , _.throttle( function( event ) {

            $scope.model.image.$$progress[ 0 ].percentage = event.position / ( event.totalSize / 100 );

            $scope.$apply();

          } , 1000 ) , false );

          xhr.onload = function() {

            socket.emit( 'progress:get' , xhr.getResponseHeader( 'ETag' ).slice( 1 , -1 ) );

            $scope.model.image.$$progress[ 0 ].status = 'Original image upload completed.';

            for( var index = 1; index < $scope.model.image.$$progress.length; index++ ) {

              var progress = $scope.model.image.$$progress[ index ];

              progress.status = 'Launching a new server to resize the original image to ' + progress.label + '…';

              progress.percentage = 25;

            }

          };

          xhr.open( 'POST' , endpoint , true );

          xhr.send( form );

        });

      }

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
