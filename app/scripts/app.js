'use strict';

/**
 * @ngdoc overview
 * @name agencyCloudApp
 * @description
 * # agencyCloudApp
 *
 * Main module of the application.
 */

angular

  .module( 'agencyCloudApp' , [

    'ui.router',
    'ngTouch'

  ])

  .config( function ( $stateProvider , $urlRouterProvider ) {

    $stateProvider

      .state( 'dashboard' , {

        templateUrl : 'views/dashboard.html',

        url : '/dashboard'

      })

      .state( 'models' , {

        templateUrl : 'views/models.html',

        controller : 'ModelsController',

        url : '/models'

      })

      .state( 'models.model' , {

        templateUrl : 'views/model.html',

        controller : 'ModelController',

        url : '/:model'

      });

    $urlRouterProvider

      .otherwise( '/models' );

  });
