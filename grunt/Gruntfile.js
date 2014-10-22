module.exports = function(grunt) {

  grunt.initConfig({
  
    sass: {
      compile: {
        options: {
          style: 'expanded'
        },
        files: [
          {
            expand: true,
            cwd: 'assets/stylesheets/src',
            src: ['**/*.sass'],
            dest: 'assets/stylesheets',
            ext: '.css'
          }
        ]
      }
    },
    coffee: {
      compile: {
        expand: true,
        cwd: 'assets/javascripts/src',
        src: ['**/*.coffee'],
        dest: 'assets/javascripts',
        ext: '.js',
        options: {
          bare: true,
          preserve_dirs: true
        }
      }
    },
    watch: {
      html: {
        files: ['**/*.php']
      },
      sass: {
        files: '<%= sass.compile.files[0].src %>',
        tasks: ['sass']
      },
      coffee: {
        files: '<%= coffee.compile.src %>',
        tasks: ['coffee']
      },
      options: {
        livereload: true
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'assets/stylesheets',
        src: ['*.css'],
        dest: 'assets/stylesheets',
        ext: '.css'
      }
    },
    uglify: {
      my_target: {
        files: {
          'assets/javascripts/example.js': ['assets/javascripts/example.js']
        }
      }
    }
    
  });
  
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  grunt.registerTask('default', ['sass', 'coffee', 'watch']);
  grunt.registerTask('min', ['cssmin', 'uglify']);
};
