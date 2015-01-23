'use strict';

/**
 * @ngdoc directive
 * @name agencyCloudApp.directive:progress
 * @description
 * # progress
 */

angular

  .module( 'agencyCloudApp' )

  .directive( 'progress' , function ( Progress ) {

    return {

      templateUrl : 'views/progress.html',

      replace : true,

      restrict: 'E',

      link : function postLink( $scope , $element ) {

        $scope.$watch( function() {

          return Progress.progress;

        } , function() {

          $element.children().width( Progress.progress + '%' );

        });

      }

    };

  });
