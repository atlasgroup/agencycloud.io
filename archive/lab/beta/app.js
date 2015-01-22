angular

  .module( 'app' , [ 'ngTouch' , 'ngAnimate' ])

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

        })

      }

    };

  })

  .filter( 'small' , function() {

    return function( image ) {

      return image.$$preview ? image.$$preview : 'https://s3-us-west-2.amazonaws.com/foureighty.freedommodels.com/' + image.url;

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

        resizeArea.style.visibility = 'hidden';

        document.body.appendChild( resizeArea );

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

        resizeArea.style.visibility = 'hidden';

        document.body.appendChild( resizeArea );

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

          scope.$parent.$parent.$parent.$parent.edit();

          origin = this;

          event.dataTransfer.setData( 'text/html' , this.innerHTML );

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

  .controller( 'ModelsController' , function( $scope , socket ) {

    document.getElementsByTagName( 'progress' )[ 0 ].value = 22;

    /* Socket functions */

    socket.on( 'welcome' , function( message ) {

      console.log( message );

    });

    socket.emit( 'data:load' , 'freedom' );

    socket.on( 'data:loaded' , function( data ) {

      console.log( JSON.parse( data ) );

      $scope.data = JSON.parse( data );

      $scope.model = $scope.data.models[ 0 ] || {};

      setTimeout( function() {

        document.getElementsByTagName( 'progress' )[ 0 ].value = 100;

        document.body.classList.add( 'ready' );

        setTimeout( function() {

          cancelAnimationFrame( window.Header.raf );

          delete window.Header;

          document.getElementsByTagName( 'progress' )[ 0 ].value = 0;

          document.getElementsByTagName( 'header' )[ 0 ].parentNode.removeChild( document.getElementsByTagName( 'header' )[ 0 ] );

        } , 1000 );

      } , 1500 );

    });

    /*socket.on( 'data:update' , function( data ) {

      $scope.data = JSON.parse( data );

      console.log( $scope.data );

    });*/

    /* Scope functions */

    $scope.menu = function( event ) {

      event.preventDefault();

      document.getElementById( 'menu' ).checked = !document.getElementById( 'menu' ).checked;

    };

    $scope.active = function( model ) {

      return model === $scope.model;

    };

    $scope.set = function( model ) {

      $scope.model = model;

      document.getElementById( 'list' ).checked = false;

    };

    $scope.new = function() {

      $scope.model = {};

      $scope.data.models.unshift( $scope.model );

      document.forms[ 'model' ].getElementsByTagName( 'input' )[ 0 ].focus();

    };

    $scope.edit = function() {

      document.getElementById( 'edit' ).checked = true;

    };

    $scope.save = function() {

      /* Save progress */

      var progress = [ 10 ];

      document.getElementsByTagName( 'progress' )[ 0 ].value = progress.shift();

      var saves = 1;

      if( $scope.model.image && $scope.model.image.$$file ) {

        saves += 1;

      }

      if( $scope.model.albums ) {

        for( var album = 0; album < $scope.model.albums.length; album++ ) {

          if( $scope.model.albums[ album ].images ) {

            for( var image = 0; image < $scope.model.albums[ album ].images.length; image++ ) {

              if( $scope.model.albums[ album ].images[ image ].$$file ) {

                saves += 1;

              }

            }

          }

        }

      }

      for( var save = 1; save < saves; save++ ) {

        progress.push( 10 + ( ( 90 / saves ) * save ) );

      }

      progress.push( 100 );

      socket.on( 'data:saved' , function() {

        document.getElementsByTagName( 'progress' )[ 0 ].value = progress.shift();

      });

      socket.emit( 'data:save' , angular.toJson( $scope.data ) );

      /* Amazon S3 upload authentication */

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

            document.getElementsByTagName( 'progress' )[ 0 ].value = progress.shift();

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

    $scope.delete = function() {

      if( confirm( 'Are you sure?' ) ) {

        $scope.data.models.splice( $scope.data.models.indexOf( $scope.model ) , 1 );

        $scope.model = $scope.data.models[ 0 ] || {};

        $scope.save();

      }

    };

    $scope.albums = {

      create : function() {

        var album = { images : [] };

        $scope.model.albums ? $scope.model.albums.push( album ) : $scope.model.albums = [ album ];

        $scope.edit();

      },

      delete : function( album ) {

        if( confirm( 'Are you sure?' ) ) {

          $scope.model.albums.splice( $scope.model.albums.indexOf( album ) , 1 );

          $scope.save();

        }

      }

    };

  });
