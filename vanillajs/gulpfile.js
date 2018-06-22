// Require gulp and plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    order = require("gulp-order"),
    connect = require('gulp-connect'),
    minifyHTML = require('gulp-minify-html'),
    inject = require('gulp-inject'),
    gutil = require('gulp-util');


// Define file sources
var sassMain = ['src/sass/main.scss'];
var sassOther = ['src/sass/*.scss'];
var jsSources = ['src/js/progressbar.js','src/js/loader.js','src/js/app.js']; // Any .js file in scripts directory
var htmlSources = ['src/index.html']

// Task to compile SASS files
gulp.task('sass', function() {
    gulp.src(sassMain) // use sassMain file source
        .pipe(sass({
            outputStyle: 'compressed' // Style of compiled CSS
        })
            .on('error', gutil.log)) // Log descriptive errors to the terminal
        .pipe(gulp.dest('dist/css')) // The destination for the compiled file
        .pipe(connect.reload()); 
});


// Task to concatenate and uglify js files
gulp.task('concat', function() {
    gulp.src(jsSources) // use jsSources
        .pipe(concat('main.js')) // Concat to a file named 'main.js'
        .pipe(uglify()) // Uglify concatenated file
        .pipe(gulp.dest('dist/js')) // The destination for the concatenated and uglified file
        .pipe(connect.reload());
});


// Task to watch for changes in our file sources
gulp.task('watch', function() {
    gulp.watch(sassOther,['sass']); 
    gulp.watch(jsSources,['concat']);
    gulp.watch(htmlSources,['inject']); 
});

gulp.task('serve', function() {
    connect.server({
      root: 'dist',
      port: 8888,
      livereload: true
    });
});
gulp.task('inject', function () {
    var target = gulp.src(htmlSources);
    var sources = gulp.src(['./dist/**/*.js', './dist/**/*.css'], {read: false});
   
    return target.pipe(inject(sources,{ignorePath: 'dist'}))
        .pipe(minifyHTML())
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});
// Default gulp task
gulp.task('default', ['sass', 'concat', 'inject', 'watch', 'serve']);