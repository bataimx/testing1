module.exports = function(grunt) {
  grunt.initConfig({
    source: 'src/',
    dest: 'dist/',
    pug: {
      compile: {
        options: {
          data: {
            debug: false
          }
        },
        files: {
          '<%= dest %>index.html': ['<%= source %>index.pug']
        }
      }
    },
    sass: {
      options: {
        sourceMap: false,
        outputStyle: 'compressed'
      },
      dist: {
        files: {
          '<%= dest %>styles/style.css': '<%= source %>styles/style.scss'
        }
      }
    },
    watch: {
      options: {
        livereload: true,
        dateFormat: function(time) {
          grunt.log.writeln('The watch finished in ' + time);
        }
      },
      html:{
        files: ['<%= source %>**/**.pug'],
        tasks: ['pug']
      },
      css: {
        files: ['<%= source %>**/**.scss'],
        tasks: ['sass']
      }
    },
    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 3000,
          base: '<%= dest %>',
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['pug', 'sass', 'connect', 'watch']);
};