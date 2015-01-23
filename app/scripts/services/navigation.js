'use strict';

/**
 * @ngdoc service
 * @name agencyCloudApp.navigation
 * @description
 * # navigation
 * Service in the agencyCloudApp.
 */

angular

  .module( 'agencyCloudApp' )

  .service( 'Navigation' , function () {

    var model = this;

    var links = [

      'dashboard',

      'models'

    ];

    model.getLinks = function() {

      return links;

    };

  });
