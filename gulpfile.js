var gulp = require('gulp'),
    run = require('gulp-run'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    watch = require('gulp-watch'),
    runElectron = require("gulp-run-electron");


var styleSRC = './assets/styles/main.scss';
var styleDEST = './dist/styles/';

gulp.task('build:css', function(done){
    gulp.src(styleSRC)
        .pipe( sass({
            errorLogToConsole: true,
            outputStyle: 'compressed'
        }) )
        .on( 'error', console.error.bind( console ))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(styleDEST));

    done();
});

gulp.task('build:js', function (done) {
    gulp.src('./assets/app/**/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./dist/script'));

    done();
});

gulp.task('copy:img', function (done) {
    gulp.src('./assets/images/**/*.*')
        .pipe(gulp.dest('./dist/images'));

    done();
});

gulp.task('run', function(done){
    //start electron
    gulp.src("./")
        .pipe(runElectron());
    done();
});

gulp.task('watch', function () {
    //watch files and rerun electron on change
    return watch(['index.html', './assets/**/*'], gulp.series('build:css', 'build:js', runElectron.rerun));
});



gulp.task('clean:dist', function(){
    return gulp.src('./dist/', {allowEmpty: true})
    .pipe(clean());
});

gulp.task('serve', gulp.series('run', 'watch'));
gulp.task('build', gulp.series('clean:dist', 'build:css', 'build:js', 'copy:img'));

