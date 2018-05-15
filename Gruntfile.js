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
    },
    copy: {
      main: {
        files: [{
            expand: true,
            cwd: '<%= source %>assets/',
            src: ['**'],
            dest: '<%= dest %>assets/'
        }],
      },
    },
    clean: ['<%= dest %>'],
    'gh-pages': {
      options: {
        base: '<%= dest %>'
      },
      src: ['**']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('build', ['clean', 'pug', 'sass', 'copy']);
  grunt.registerTask('startServe', ['connect', 'watch']);
  grunt.registerTask('deploy', ['build', 'gh-pages']);

  grunt.registerTask('default', ['build', 'startServe']);
};