'use strict';

/**
 * @ngdoc filter
 * @name agencyCloudApp.filter:image
 * @function
 * @description
 * # image
 * Filter in the agencyCloudApp.
 */

angular

  .module( 'agencyCloudApp' )

  .filter( 'image' , function () {

    return function ( image , size ) {

      if( image ) {

        if( size === 'original' ) {

          return 'https://s3-us-west-2.amazonaws.com/original.freedommodels.com/' + image.url;

        }

        if( parseInt( size ) === 272 ) {

          return 'https://s3-us-west-2.amazonaws.com/twoseventwo.freedommodels.com/' + image.url;

        }

        if( parseInt( size ) === 750 ) {

          return 'https://s3-us-west-2.amazonaws.com/sevenfivezero.freedommodels.com/' + image.url;

        }

        if( parseInt( size ) === 1536 ) {

          return 'https://s3-us-west-2.amazonaws.com/onefivethreesix.freedommodels.com/' + image.url;

        }

        if( parseInt( size ) === 2880 ) {

          return 'https://s3-us-west-2.amazonaws.com/twoeighteightzero.freedommodels.com/' + image.url;

        }

      }

    };

  });
