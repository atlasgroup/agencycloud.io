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

  .service( 'Data' , function ( $q , socket , Progress ) {

    var model = this;

    model.get = function() {

      Progress.progress = 10;

      var defer = $q.defer();

      Progress.progress = 20;

      socket.emit( 'data:get' , { account : 'freedom' } , function( response ) {

        Progress.progress = 80;

        model = JSON.parse( response );

        Progress.progress = 90;

        defer.resolve( model );

        Progress.progress = 100;

      });

      Progress.progress = 30;

      return defer.promise;

    };

    model.put = function( data ) {

      Progress.progress = 20;

      var defer = $q.defer();

      Progress.progress = 30;

      socket.emit( 'data:set' , angular.toJson( data ) , function( response ) {

        Progress.progress = 90;

        defer.resolve( response );

        Progress.progress = 100;

      });

      Progress.progress = 40;

      return defer.promise;

    };

  });
