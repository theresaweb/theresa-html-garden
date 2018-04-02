var gulp = require('gulp'),
  sass = require('gulp-sass'),
  cleanCss = require('gulp-clean-css'),
  concat = require('gulp-concat');

gulp.task('styles', function () {

    var foundationCss = gulp.src('node_modules/foundation-sites/assets/foundation.scss')
        .pipe(sass({
            includePaths: ['node_modules/foundation-sites/scss'],
            errLogToConsole: true
        }))
        .pipe(gulp.dest('app/css/'));
    var appCss = gulp.src('app/scss/app.scss')
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest('app/css/'));
    return gulp.src(['app/css/foundation.css','app/css/app.css'])
        .pipe(concat('bundle.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('dist'));
});