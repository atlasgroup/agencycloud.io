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

  .controller( 'NavigationController' , function ( socket , Navigation ) {

    var navigation = this;

    socket.on( 'welcome' , function( response ) {

      console.log( response );

    });

    navigation.links = Navigation.getLinks();

  });
