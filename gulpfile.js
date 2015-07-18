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

/*
 * Directories paths
 */
var jsDist	= './resources/js/dist';
var jsSrc	= ['./resources/js/src/modules/*.js','./resources/js/src/*.js'];
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

	return gulp.src(jsSrc)
			.pipe(babel())
			.pipe(concat('all.js'))
			.pipe(gulp.dest(jsDist));
			
});


gulp.task('modules', function() {

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

gulp.task('compress', function() {
	
	return gulp.src(jsDist + '/all.js')
				.pipe(uglify())
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
gulp.task('default', ['sass', 'buildJs', 'modules']);

/**
 * Watch all of it"
 */
gulp.task('watch',['js:watch', 'sass:watch']);

