'use strict';

var gulp		= require('gulp');
var sass		= require('gulp-sass');
var sourcemaps	= require('gulp-sourcemaps');

/*
 * SASS TASK
 */
gulp.task('sass', function() {

	gulp.src('./resources/assets/sass/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./resources/assets/css'));

});
gulp.task('sass:watch', function(){
	
	gulp.watch('./resources/assets/sass/*.scss', ['sass']);	

});

gulp.task('default', function() {
	  // place code for your default task here
});
