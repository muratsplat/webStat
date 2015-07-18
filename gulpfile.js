'use strict';

var gulp		= require('gulp');
var sass		= require('gulp-sass');
var sourcemaps	= require('gulp-sourcemaps');
var babel		= require('gulp-babel');
var concat	    = require('gulp-concat');
var uglify		= require('gulp-uglify');
//var del			= require('del');


/*
 * Directories paths
 */
var jsDist	= './resources/js/dist';
var jsSrc	= './resources/js/src';
var cssDest	= './resources/assets/css'; 
var sassSrc	= './resources/assets/sass';

/*
 * SASS TASK
 */
gulp.task('sass', function() {

	gulp.src(sassSrc + '/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(cssDest));
});

/**
 * To watch sass files 
 */
gulp.task('sass:watch', function(){
	
	gulp.watch(sassSrc + '/*.scss', ['sass']);	
});

/**
 * To buid js file via babel builder
 */
gulp.task('buildJs', function () {

	return gulp.src(jsSrc + '/*.js')
			.pipe(sourcemaps.init())
			.pipe(babel())
			.pipe(uglify())
			.pipe(concat('all.min.js'))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest(jsDist));
});

/**
 * To watch js files
 */
gulp.task('js:watch', function() {

	gulp.watch(jsSrc + '/*.js', ['buildJs']);

});

/**
 * Default Task
 */
gulp.task('default', ['sass', 'buildJs']);

/**
 * Watch all of it
 */
gulp.task('watch',['js:watch', 'sass:watch']);

