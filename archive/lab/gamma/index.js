/* Nav */

( function() {

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75 , 110 / 110 , 0.1 , 1000 );

  var renderer = new THREE.WebGLRenderer( { alpha : true } );
  renderer.setSize( 110 , 110 );
  document.getElementsByTagName( 'canvas' )[ 1 ].parentNode.replaceChild( renderer.domElement , document.getElementsByTagName( 'canvas' )[ 1 ] );

  var geometry = new THREE.TetrahedronGeometry();
  var material = new THREE.MeshBasicMaterial( { color : 0x000000 , wireframe : true } );
  var cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  camera.position.z = 5;

  var render = function () {

    requestAnimationFrame( render );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene , camera );

  };

  render();

})();

angular

  .module( 'app' , [ 'ngTouch' ])

  .factory( 'socket' , function ( $rootScope ) {

    var socket = io.connect( 'https://api.agencycloud.io:443' );

    return {

      on : function ( eventName , callback ) {

        socket.on( eventName , function () {

          var args = arguments;

          $rootScope.$apply( function () {

            callback.apply( socket , args );

          });

        });

      },

      emit: function ( eventName , data , callback ) {

        socket.emit( eventName , data , function () {

          var args = arguments;

          $rootScope.$apply( function () {

            if ( callback ) {

              callback.apply( socket , args );

            }

          });

        });

      }

    };

  })

  .directive( 'image' , function( $q ) {

    'use strict'

    var URL = window.URL || window.webkitURL;

    var getResizeArea = function () {

      var resizeAreaId = 'fileupload-resize-area';

      var resizeArea = document.getElementById( resizeAreaId );

      if ( !resizeArea ) {

        resizeArea = document.createElement( 'canvas' );

        resizeArea.id = resizeAreaId;

      }

      return resizeArea;

    };

    var resizeImage = function ( origImage , options ) {

      var maxHeight = options.resizeMaxHeight || 300;

      var maxWidth = options.resizeMaxWidth || 250;

      var quality = options.resizeQuality || 0.7;

      var type = options.resizeType || 'image/jpg';

      var canvas = getResizeArea();

      var height = origImage.height;

      var width = origImage.width;

      // calculate the width and height, constraining the proportions

      if ( width > height ) {

        if ( width > maxWidth ) {

          height = Math.round( height *= maxWidth / width );

          width = maxWidth;

        }

      } else {

        if ( height > maxHeight ) {

          width = Math.round( width *= maxHeight / height );

          height = maxHeight;

        }

      }

      canvas.width = width;

      canvas.height = height;

      //draw image on canvas

      var ctx = canvas.getContext( '2d' );

      ctx.drawImage( origImage , 0 , 0 , width , height );

      // get the data from canvas as 70% jpg (or specified type).

      return canvas.toDataURL( type , quality );

    };

    var createImage = function( url , callback ) {

      var image = new Image();

      image.onload = function() {

        callback( image );

      };

      image.src = url;

    };

    var fileToDataURL = function ( file ) {

      var deferred = $q.defer();

      var reader = new FileReader();

      reader.onload = function ( event) {

        deferred.resolve( event.target.result );

      };

      reader.readAsDataURL( file );

      return deferred.promise;

    };

    return {

      restrict: 'A',

      scope: {

        image: '=',

        resizeMaxHeight: '@?',

        resizeMaxWidth: '@?',

        resizeQuality: '@?',

        resizeType: '@?',

      },

      link : function postLink( scope , element , attrs , ctrl ) {

        var doResizing = function( imageResult , callback ) {

          createImage( imageResult.$$blob , function( image ) {

            var dataURL = resizeImage( image , scope );

            imageResult.$$preview =  dataURL;

            imageResult.url = 'models/' + scope.$parent.model.url + '/' + scope.$parent.model.url + '.jpg';

            callback( imageResult );

          });

        };

        var applyScope = function( imageResult ) {

          scope.$apply( function() {

            scope.image = imageResult;

          });

        };

        element.bind( 'change' , function ( event ) {

          var file = event.target.files[ 0 ];

          var imageResult = {

            $$file : file,

            $$blob : URL.createObjectURL( file )

          };

          if( scope.resizeMaxHeight || scope.resizeMaxWidth ) {

            //resize image

            doResizing( imageResult , function( imageResult ) {

              applyScope( imageResult );

            });

          } else {

            //no resizing

            applyScope( imageResult );

          }

        });

      }

    };

  })

  .directive( 'images' , function( $q ) {

    'use strict'

    var URL = window.URL || window.webkitURL;

    var getResizeArea = function () {

      var resizeAreaId = 'fileupload-resize-area';

      var resizeArea = document.getElementById( resizeAreaId );

      if ( !resizeArea ) {

        resizeArea = document.createElement( 'canvas' );

        resizeArea.id = resizeAreaId;

      }

      return resizeArea;

    };

    var resizeImage = function ( origImage , options ) {

      var maxHeight = options.resizeMaxHeight || 300;

      var maxWidth = options.resizeMaxWidth || 250;

      var quality = options.resizeQuality || 0.7;

      var type = options.resizeType || 'image/jpg';

      var canvas = getResizeArea();

      var height = origImage.height;

      var width = origImage.width;

      // calculate the width and height, constraining the proportions

      if ( width > height ) {

        if ( width > maxWidth ) {

          height = Math.round( height *= maxWidth / width );

          width = maxWidth;

        }

      } else {

        if ( height > maxHeight ) {

          width = Math.round( width *= maxHeight / height );

          height = maxHeight;

        }

      }

      canvas.width = width;

      canvas.height = height;

      //draw image on canvas

      var ctx = canvas.getContext( '2d' );

      ctx.drawImage( origImage , 0 , 0 , width , height );

      // get the data from canvas as 70% jpg (or specified type).

      return canvas.toDataURL( type , quality );

    };

    var createImage = function( url , callback ) {

      var image = new Image();

      image.onload = function() {

        callback( image );

      };

      image.src = url;

    };

    var fileToDataURL = function ( file ) {

      var deferred = $q.defer();

      var reader = new FileReader();

      reader.onload = function ( event) {

        deferred.resolve( event.target.result );

      };

      reader.readAsDataURL( file );

      return deferred.promise;

    };

    return {

      restrict: 'A',

      scope: {

        images: '=',

        resizeMaxHeight: '@?',

        resizeMaxWidth: '@?',

        resizeQuality: '@?',

        resizeType: '@?',

      },

      link : function postLink( scope , element , attrs , ctrl ) {

        var doResizing = function( imageResult , callback ) {

          createImage( imageResult.$$blob , function( image ) {

            var dataURL = resizeImage( image , scope );

            imageResult.$$preview =  dataURL;

            imageResult.url = 'models/' + scope.$parent.$parent.$parent.model.url + '/' + scope.$parent.album.url + '/' + scope.$parent.$parent.$parent.model.url + '-' + scope.$parent.album.url + '-' + ( imageResult.$$index + 1 ) + '.jpg';

            callback( imageResult );

          });

        };

        var applyScope = function( imageResult ) {

          scope.$apply( function() {

            if( attrs.multiple ) {

              scope.images.push( imageResult );

            } else {

              scope.images = imageResult;

            }

          });

        };

        element.bind( 'change' , function ( evt ) {

          //when multiple always return an array of images

          if( attrs.multiple ) {

            scope.images = [];

          }

          var files = evt.target.files;

          for( var i = 0; i < files.length; i++ ) {

            //create a result object for each file in files

            var imageResult = {

              $$index : i,

              $$file : files[ i ],

              $$blob : URL.createObjectURL( files[ i ] )

            };

            if( scope.resizeMaxHeight || scope.resizeMaxWidth ) {

              //resize image

              doResizing( imageResult , function( imageResult ) {

                applyScope( imageResult );

              });

            } else {

              //no resizing

              applyScope( imageResult );

            }

          }

        });

      }

    };

  })

  .directive( 'sort' , function( $parse ) {

    return {

      restrict : 'A',

      scope: {

        album : '='

      },

      link : function( scope , element , attributes ) {

        window.origin = null;

        element[ 0 ].draggable = true;

        element[ 0 ].addEventListener( 'dragstart' , function( event ) {

          origin = this;

          console.log( origin );

        });

        element[ 0 ].addEventListener( 'dragover' , function( event ) {

          event.preventDefault();

          event.dataTransfer.dropEffect = 'move';

        });

        element[ 0 ].addEventListener( 'drop' , function( event ) {

          event.stopPropagation();

          var swap = scope.album.images[ this.getAttribute( 'index' ) ];

          scope.album.images[ this.getAttribute( 'index' ) ] = scope.album.images[ origin.getAttribute( 'index' ) ];

          scope.album.images[ origin.getAttribute( 'index' ) ] = swap;

          scope.$apply();

          return false;

        });

      }

    };

  })

  .filter( 'small' , function() {

    return function( image ) {

      return image.$$preview ? image.$$preview : 'https://s3-us-west-2.amazonaws.com/foureighty.freedommodels.com/' + image.url;

    };

  })

  .controller( 'Controller' , function( $scope , $timeout , socket ) {

    /* Socket functions */

    socket.on( 'welcome' , function( message ) {

      console.log( message );

    });

    $scope.progress = 33;

    socket.emit( 'data:get' , 'freedom' , function( data ) {

      $scope.data = JSON.parse( data );

      $scope.model = $scope.data.models[ 0 ] || {};

      console.log( $scope.data );

      $timeout( function() { $scope.progress = 100; } , 100 );

      $timeout( function() { $scope.ready = true } , 1000 );

      $timeout( function() {

        cancelAnimationFrame( window.Header.raf );

        delete window.Header;

        $scope.progress = 0;

        document.getElementsByTagName( 'header' )[ 0 ].parentNode.removeChild( document.getElementsByTagName( 'header' )[ 0 ] );

      } , 2500 );

    });

    $scope.models = {

      active : function( model ) {

        return model === $scope.model;

      },

      set : function( model ) {

        $scope.model = model;

      },

      create : function() {

        $scope.model = {};

        $scope.data.models.unshift( $scope.model );

      },

      delete : function( model ) {

        if( confirm( 'Are you sure?' ) ) {

          $scope.data.models.splice( $scope.data.models.indexOf( model ) , 1 );

          $scope.model = $scope.data.models[ 0 ] || {};

          $scope.submit( $scope.data );

        }

      },

      albums : {

        create : function() {

          var album = { images : [] };

          $scope.model.albums ? $scope.model.albums.push( album ) : $scope.model.albums = [ album ];

        },

        delete : function( album ) {

          if( confirm( 'Are you sure?' ) ) {

            $scope.model.albums.splice( $scope.model.albums.indexOf( album ) , 1 );

            $scope.submit( $scope.data );

          }

        }

      }

    };

    $scope.submit = function( data ) {

      $scope.progress = 10;

      socket.emit( 'data:set' , angular.toJson( data ) , function() {

        $scope.progress = 33;

        $timeout( function() { $scope.progress = 100; } , 1000 );

        $timeout( function() { $scope.progress = 0; } , 2000 );

      });

      socket.emit( 'aws:authenticate' );

      socket.on( 'aws:authenticated' , function( credentials ) {

        var today = new Date().toJSON().slice( 0 , 10 ).split( '-' ).join( '' );

        var endpoint = 'https://s3-us-west-2.amazonaws.com/original.freedommodels.com/';

        /* Upload model image */

        if( $scope.model.image && $scope.model.image.$$file ) {

          var form = new FormData();

          form.append( 'key' , 'models/' + $scope.model.url + '/' + $scope.model.url + '.jpg' );

          form.append( 'success_action_status' , "201" );

          form.append( 'x-amz-credential' , 'AKIAJD4CVTSTWPYNI4DQ/' + today + '/us-west-2/s3/aws4_request' );

          form.append( 'x-amz-algorithm' , 'AWS4-HMAC-SHA256' );

          form.append( 'x-amz-date' , today + 'T000000Z' );

          form.append( 'policy' , credentials.policy );

          form.append( 'x-amz-signature' , credentials.signature );

          form.append( 'file' , $scope.model.image.$$file );

          var xhr = new XMLHttpRequest();

          xhr.onload = function( event ) {

            console.log( 'IMAGE SAVED' );

          };

          xhr.open( 'POST' , endpoint , true );

          xhr.send( form );

        }

        /* Upload album images */

        if( $scope.model.albums ) {

          for( var album = 0; album < $scope.model.albums.length; album++ ) {

              if( $scope.model.albums[ album ].images ) {

                for( var image = 0; image < $scope.model.albums[ album ].images.length; image++ ) {

                  if( $scope.model.albums[ album ].images[ image ].$$file ) {

                    /* Contruct Form Data */

                    var form = new FormData();

                    form.append( 'key' , $scope.model.albums[ album ].images[ image ].url );

                    form.append( 'success_action_status' , "201" );

                    form.append( 'x-amz-credential' , 'AKIAJD4CVTSTWPYNI4DQ/' + today + '/us-west-2/s3/aws4_request' );

                    form.append( 'x-amz-algorithm' , 'AWS4-HMAC-SHA256' );

                    form.append( 'x-amz-date' , today + 'T000000Z' );

                    form.append( 'policy' , credentials.policy );

                    form.append( 'x-amz-signature' , credentials.signature );

                    form.append( 'file' , $scope.model.albums[ album ].images[ image ].$$file );

                    /* Send XHR Request */

                    var xhr = new XMLHttpRequest();

                    xhr.onload = function( event ) {

                      document.getElementsByTagName( 'progress' )[ 0 ].value = progress.shift();

                    };

                    xhr.open( 'POST' , endpoint , true );

                    xhr.send( form );

                  }

                }

              }

          }

        }

      });

    };

  });
