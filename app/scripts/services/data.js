'use strict';

/**
 * @ngdoc service
 * @name agencyCloudApp.Data
 * @description
 * # Data
 * Service in the agencyCloudApp.
 */

angular

  .module( 'agencyCloudApp' )

  .service( 'Data' , function ( $q , socket ) {

    var model = this;

    model.get = function() {

      var defer = $q.defer();

      socket.emit( 'data:get' , {

        account : 'freedom'

      } , function( response ) {

        defer.resolve( JSON.parse( response ) );

      });

      return defer.promise;

    };

  });
