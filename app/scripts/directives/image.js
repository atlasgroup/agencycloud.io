'use strict';

/**
 * @ngdoc directive
 * @name agencyCloudApp.directive:image
 * @description
 * # image
 */

angular

  .module( 'agencyCloudApp' )

  .directive( 'image' , function ( $parse ) {

    return {

      restrict : 'A',

      link : function postLink( $scope , $element , $attributes ) {

        $element.bind( 'change' , function() {

          var image = {

            url : 'models/' + $scope.model.url + '/' + $scope.model.url + '.jpg',

            $$file : $element[ 0 ].files[ 0 ],

            sizes : []

          };

          $parse( $attributes.image ).assign( $scope , image );

          $scope.$apply();

        });

      }

    };

  });
