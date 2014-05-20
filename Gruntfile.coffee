'use strict';

module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    banner: ''
    clean:
      dist:
        src: ['dist/**']
    "regex-replace":
      dist:
        src: ['dist/*.html']
        actions: [
            {
                name: 'requirejs',
                search: 'data-main=.*vendors/requirejs/require.js'
                replace: 'src="scripts/require.min.js'
                flags: 'ig'
            }
        ]
    concat:
      options:
        banner: '<%= banner %>'
        stripBanners: true
      dist:
        src: ['sample/vendors/requirejs/require.js', '<%= concat.dist.dest %>'],
        dest: 'dist/scripts/require.js'
    uglify:
      options:
        banner: '',
        sourceMap: 'dist/scripts/require-map.js'
        sourceMapRoot: './'
        sourceMappingURL: 'require-map.js'
        sourceMapPrefix: 'dist/scripts/'
      dist:
        src: '<%= concat.dist.dest %>'
        dest: 'dist/scripts/require.min.js'
    jshint:
      gruntfile:
        options:
          jshintrc: '.jshintrc'
        src: 'Gruntfile.js'
      dev:
        options:
          jshintrc: 'sample/scripts/.jshintrc'
        src: ['sample/scripts/**/*.js']
      test:
        options:
          jshintrc: 'test/.jshintrc'
        src: ['test/**/*.js']
    less:
      compile:
        options:
          paths: ['sample/styles/']
          compress: true
        files: [{
          expand: true,
          cwd: 'sample/styles'
          src: ['**/*.less']
          dest: 'sample/styles'
          ext: '.css'
        }]
    watch:
      options:
        livereload: true
      js:
        files: ['sample/scripts/**/*.js']
      style:
        files: ['sample/styles/**/*.less'],
        tasks: ['less']
      html:
        files: ['sample/**/*.html']
    requirejs:
      compile:
        options:
          baseUrl: 'sample/',
          name: 'scripts/config',
          mainConfigFile: 'sample/scripts/config.js',
          out: '<%= concat.dist.dest %>',
          optimize: 'none'
    imagemin:
      dist:
        options:
          optimizationLevel: 3
        files: [{
          expand: true,
          cwd: 'sample/',
          src: ['**/*.png', '**/*.jpg'],
          dest: 'dist/'
        }]
    htmlmin:
      dist:
        options:
          files: [{
            expand: true,
            cwd: 'dev',
            src: ['**/*.html', '!**/vendors/**/*.html'],
            dest: 'dist/'
          }]
    copy:
      dist:
        files: [{
          expand: true
          cwd: 'sample/'
          src: ['**', '!**/images/*.*', '!**/*.html', '!**/*.less', '!scripts/**/*.js', 'scripts/**/*.min.js']
          dest: 'dist/'}]
    connect:
      devserver:
        options:
          keepalive: true
          hostname: '127.0.0.1'
          base: './dev'
          port: 9000
          livereload: 35729
          open: true

  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-requirejs'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-imagemin'
  grunt.loadNpmTasks 'grunt-contrib-htmlmin'
  grunt.loadNpmTasks 'grunt-regex-replace'

  grunt.registerTask 'default', ['jshint', 'less']
  grunt.registerTask 'build', ['requirejs', 'less', 'clean:dist', 'copy:dist', 'requirejs', 'concat', 'uglify', 'imagemin:dist', 'htmlmin:dist', 'regex-replace:dist']