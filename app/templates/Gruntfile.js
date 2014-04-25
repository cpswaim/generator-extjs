// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['<%%= sencha_dependencies_dist %>'],
        dest: 'dist/app.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%%= pkg.name %> */\n'
      },
      dist: {
        files: {
          'dist/<%%= pkg.name %>.min.js': ['<%%= concat.dist.dest %>']
        }
      }
    },
    sencha_dependencies: {
      dist: {
        options: {
          pageRoot:'app/',
          appJs: 'scripts/app.js',
          pageToProcess: 'index.html'
        }
      }
    },
    processhtml: {
      dist:{
        options: {
          process: true,
        },
        files: [
          {
            expand: true,
            cwd: 'app/',
            src: ['index.html'],
            dest: 'dist/',
            ext: '.html'
          }
        ]
      }
    },
    clean: {
      dist: ['dist/']
    },
    connect: {
      dev: {
        options: {
          port: 9001,
          base: 'app/',
          keepalive: true
        }
      },
      dist: {
        options: {
          port: 9001,
          base: 'dist/',
          keepalive: true
        }
      },
    },
    watch: {
      dev:{

      },
      dist:{

      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-sencha-dependencies');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-processhtml');

  grunt.registerTask('compilejs', ['sencha_dependencies', 'concat:dist', 'uglify']);

  grunt.registerTask('dist', ['clean','sencha_dependencies', 'concat:dist', 'uglify', 'processhtml', 'connect:dist']);
  grunt.registerTask('default', ['connect:dev']);
};