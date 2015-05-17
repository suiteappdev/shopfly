/* Variables */
var gulp 				= require('gulp'),
    jshint 				= require('gulp-jshint'),
    uglify 				= require('gulp-uglify'),
    rename 				= require('gulp-rename'),
    concat 				= require('gulp-concat'),
    notify 				= require('gulp-notify'),
    livereload 		= require('gulp-livereload'),
    connect       = require('gulp-connect'),
    jade        	= require('gulp-jade'),
    less 				  = require('gulp-less'),
	historyApiFallback  = require('connect-history-api-fallback');

/* Compresion de Js */
gulp.task('js', function () {
	return gulp.src('assets/js/**/*.js')
	    .pipe(connect.reload());
});

/* less parser */
gulp.task('less', function () {
   	gulp.src('assets/css/**/*.less')
      	.pipe(connect.reload());
});

gulp.task('css', function () {
    gulp.src('assets/css/**/*.css')
        .pipe(connect.reload());
});

// Recarga el navegador cuando hay cambios en el HTML
gulp.task('html', function() {
  	return gulp.src('*.html')
	    .pipe(connect.reload());
});

gulp.task('views', function() {
    return gulp.src('tpl/**/*.html')
	    .pipe(connect.reload());
});

/* Init GulpServer */
gulp.task('default', function() {
    gulp.start('html', 'views', 'js', 'css', 'watch', 'webserver');
});

/* Cambio de archivos */
gulp.task('watch', function() {
   	gulp.watch('assets/css/**/*.css', ['css']),
   	gulp.watch('assets/js/**/*.js', ['js']),
   	gulp.watch(['*.html'], ['html']),
   	gulp.watch(['views/**/*.html'], ['views']);
});

/* LocalServer */
gulp.task('webserver', function() {
   	connect.server({
		root: __dirname,
		hostname: '0.0.0.0',
		port: 9000,
		livereload: true,
		middleware: function(connect, opt) {
			return [ historyApiFallback ];
		}
   	});
});