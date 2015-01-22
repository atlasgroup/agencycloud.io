'use strict';

/**
 * @ngdoc service
 * @name agencyCloudApp.socket
 * @description
 * # socket
 * Factory in the agencyCloudApp.
 */

angular

  .module( 'agencyCloudApp' )

  .factory( 'socket' , function ( $rootScope ) {

    var socket = io.connect( 'https://api.agencycloud.io:443' );

    return {

      on: function ( event , callback ) {

        socket.on( event , function () {

          var args = arguments;

          $rootScope.$apply( function () {

            callback.apply( socket , args );

          });

        });

      },

      emit: function ( event , data , callback ) {

        socket.emit( event , data , function () {

          var args = arguments;

          $rootScope.$apply( function () {

            if ( callback ) {

              callback.apply( socket , args );

            }

          });

        });

      }

    };

  });
