'use strict';

/**
 * @ngdoc directive
 * @name agencyCloudApp.directive:navigation
 * @description
 * # navigation
 */

angular

  .module( 'agencyCloudApp' )

  .directive( 'navigation' , function () {

    return {

      templateUrl : 'views/navigation.html',

      replace : true,

      restrict: 'E'

    };

  });
