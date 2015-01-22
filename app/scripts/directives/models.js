'use strict';

/**
 * @ngdoc directive
 * @name agencyCloudApp.directive:models
 * @description
 * # models
 */

angular

  .module( 'agencyCloudApp' )

  .directive( 'models' , function () {

    return {

      templateUrl : 'views/models.html',

      restrict : 'E',

      link : function postLink( scope , element , attrs ) {

        /*element.text('this is the models directive');*/

      }

    };

  });
