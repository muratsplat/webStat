'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

/*
 * SASS TASK
 */
gulp.task('sass', function() {

	gulp.src('./resources/assets/sass/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./resources/assets/css'));

});
gulp.task('sass:watch', function(){
	
	gulp.watch('./resources/assets/sass/*.scss', ['sass']);	

});

gulp.task('default', function() {
	  // place code for your default task here
});
