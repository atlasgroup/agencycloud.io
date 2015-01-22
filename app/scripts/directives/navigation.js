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

      restrict: 'E',

      link: function postLink( scope , element , attrs ) {

        /*element.text('this is the navigation directive');*/

      }

    };

  });
