'use strict';

/**
 * @ngdoc directive
 * @name agencyCloudApp.directive:search
 * @description
 * # search
 */

angular

  .module( 'agencyCloudApp' )

  .directive( 'search' , function () {

    return {

      templateUrl : 'views/search.html',

      restrict: 'E',

      replace : true

    };

  });
