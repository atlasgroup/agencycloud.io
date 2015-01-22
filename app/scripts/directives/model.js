'use strict';

/**
 * @ngdoc directive
 * @name agencyCloudApp.directive:model
 * @description
 * # model
 */

angular

  .module( 'agencyCloudApp' )

  .directive( 'model' , function () {

    return {

      templateUrl : 'views/model.html',

      restrict : 'E',

      link : function postLink( scope , element , attrs ) {

        /*element.text('this is the model directive');*/

      }

    };

  });
