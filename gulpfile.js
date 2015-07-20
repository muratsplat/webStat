'use strict';

var gulp		= require('gulp');
var sass		= require('gulp-sass');
var sourcemaps	= require('gulp-sourcemaps');
var babel		= require('gulp-babel');
var concat	    = require('gulp-concat');
var uglify		= require('gulp-uglify');
var rename		= require("gulp-rename");
//var del			= require('del');
var babelify	= require('babelify');
var browserify	= require('browserify');
var source		= require('vinyl-source-stream');
var buffer		= require('gulp-buffer');
var gutil		= require('gulp-util');
var jshint		= require('gulp-jshint');
var stylish		= require('jshint-stylish');
var babel		= require('babel/register');
var mocha		= require('gulp-mocha');

/*
 * Directories paths
 */
var jsDist	= './resources/js/dist';
var jsSrc	= ['./resources/js/src/*.js','./resources/js/src/modules/*.js'];
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
 * To convert ES5 and generate modules
 */
gulp.task('build', function() {

	    return browserify({			    
					entries: './resources/js/src/app.js',
			   	    debug: true
				}).transform(babelify)
			    .bundle()
				.pipe(source('bundle.js'))
				.pipe(buffer())
				.pipe(sourcemaps.init({loadMaps: true}))
				.pipe(uglify())
				.on('error', gutil.log)
				.pipe(sourcemaps.write('.'))
				.pipe(gulp.dest(jsDist));
});

/**
 * Check syntax
 */
gulp.task('check', function() {

	return gulp.src(jsSrc)
			.pipe(jshint({
				esnext : true,
			}))
			.pipe(jshint.reporter(stylish));
 });

/**
 * Unit Test
 */
gulp.task('test', function () {
	
	return gulp.src('./resources/js/src/test/**/*.js', {read: false})
				.pipe(mocha({reporter: 'nyan'}));
});

gulp.task('test', function () {

});

/**
 * To watch js files
 */
gulp.task('js:watch', function() {

	gulp.watch([jsSrc], ['check', 'build']);

});

/**
 * Default Task
 */
gulp.task('default', ['sass', 'check',  'build']);

/**
 * Watch all of it"
 */
gulp.task('watch',['js:watch', 'sass:watch']);

