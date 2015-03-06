//Init gulp
var gulp 				= require('gulp');

//plugins 
var	watch 				= require('gulp-watch'),
	del                 = require('del'),
	sass 		    	= require('gulp-sass'),
	minifycss           = require('gulp-minify-css'),
	uglify              = require('gulp-uglify'),
	concat              = require('gulp-concat'),
	minifyHTML          = require('gulp-minify-html'),
	inject              = require("gulp-inject"),
	bowerFiles          = require('main-bower-files'),
	filter              = require('gulp-filter'),
	jshint              = require('gulp-jshint'),
	runSequence         = require('run-sequence'),
	browserSync         = require('browser-sync');

var paths = {
	html:'src/index.html' ,
	scss:[
		'src/components/styles/base-rules.scss',
		'src/components/styles/layout-rules.scss',
		'src/app/**/*.scss',
		'src/components/styles/state-rules.scss',
		'src/components/styles/theme-rules.scss'
	],
	css: [
		'src/app/base-rules.css',
		'src/app/layout-rules.css',
		'!src/app/state-rules.css', 
		'!src/app/theme-rules.css',
		'src/app/**/*.css'
	],
	lastCss: ['src/app/state-rules.css', 'src/app/theme-rules.css'],
	js:[
		'src/components/**/*.js', 
		'!src/components/**/*.test.js', 
		'!src/components/**/*.e2e.js', 
		'src/app/**/*.js', '!src/app/**/*.test.js', '!src/app/**/*.e2e.js',
		'src/app/**/**/*.js', '!src/app/**/**/*.test.js', '!src/app/**/**/*.e2e.js',
		'src/app/**/**/**/*.js', '!src/app/**/**/**/*.test.js', '!src/app/**/**/**/*.e2e.js'
	],
	dist:'./dist/'
};

// Delete the dist directory
gulp.task('clean', function() {
	del(paths.dist);
});

//Sass converter to CSS, Minify and concatenate all css files and export them into the distribution folder
gulp.task('styles', function() {
	return gulp.src(paths.scss)
		.pipe(sass())
		.pipe(gulp.dest('./src/app'))
		.pipe(minifycss())
		.pipe(concat('all.min.css'))
		.pipe(gulp.dest(paths.dist));
});

//Minify all javascripts files and export them into the distribution folder
gulp.task('javascript', function() {  
	return gulp.src(paths.js)
		.pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
		.pipe(uglify())
		.pipe(concat('all.min.js'))
		.pipe(gulp.dest(paths.dist));
});

//Inject the JS and CSS files into the main HTML
gulp.task('html', function() {
	return gulp.src(paths.html)
		.pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'externalLibs', relative: true}))
		.pipe(inject(gulp.src(paths.js, {read: false}), {ignorePath: 'src', addRootSlash: false}))
		.pipe(inject(gulp.src(paths.css, {read: false}), {ignorePath: 'src', addRootSlash: false}))
		.pipe(inject(gulp.src(paths.lastCss, {read: false}), {name: 'lastCss', ignorePath: 'src', addRootSlash: false}))
		.pipe(gulp.dest('src/'));
});

//Export the minify externalLibs.js into the distribution folder
gulp.task('externalLibs', function() {
	return gulp.src(bowerFiles())
		.pipe(filter('*.js'))
		.pipe(concat('externalLibs.js'))
		.pipe(uglify())
		.pipe(gulp.dest(paths.dist));
});

//Inject and create the distribution files
gulp.task('dist', function() {
	return gulp.src(paths.html)
		.pipe(inject(gulp.src(paths.dist + 'externalLibs.js', {read: false}), {name: 'externalLibs', relative: true}))
		.pipe(inject(gulp.src(paths.dist + 'all.min.js', {read: false}), {relative: true}))
		.pipe(inject(gulp.src(paths.dist + 'all.min.css', {read: false}), {relative: true}))
		.pipe(inject(gulp.src(paths.lastCss), {starttag: '<!-- lastCss:css -->', transform: function () { return ' '}}))
		.pipe(minifyHTML({quotes:true, empty:true}))
		.pipe(gulp.dest(paths.dist));
});

// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "src"
        }
    });
});

//Build distribution
gulp.task('build', function() {
  runSequence('clean',
              ['javascript', 'styles', 'externalLibs'],
              'html',
              'dist'
              );
});

// Watch Files For Changes
gulp.task('watch', ['browser-sync'], function() {
    gulp.watch(paths.js, ['build', browserSync.reload]);
    gulp.watch(paths.scss, ['build', browserSync.reload]);
});

// Default Task
gulp.task('default', function (){
	console.log(
		'Gulp commands:' + '\n' +
		'gulp build ------>  Process SCSS and JS files and build distribution folder and files ' + '\n' +
		'gulp clean ------>  Clean distribution folder and files ' + '\n' +
		'gulp watch ------>  Watch SCSS/JS changes and open a realtime sync browser window. ' + '\n'
		);
});
