module.exports = function( grunt ) {

  grunt.initConfig({

    aws: grunt.file.readJSON( '../../../Amazon/aws@atlasgroup.io/rvdm.json' ),

    s3: {

      options: {

        accessKeyId: "<%= aws.accessKeyId %>",
        secretAccessKey: "<%= aws.secretAccessKey %>",
        bucket: "agencycloud.io",
        region: "us-west-1",
        headers: {

          CacheControl: 60

        }

      },

      index : {

        src : 'index.html',
        dest : 'index.html'

      },

      alpha : {

        cwd : 'lab/',
        src : '**',
        dest : 'lab/'

      }

    }

  });

  grunt.loadNpmTasks( 'grunt-aws' );

  grunt.registerTask( 'default' , [ 's3' ]);

};
