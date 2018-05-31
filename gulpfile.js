var gulp = require('gulp'), 
  sass = require('gulp-sass'), //compile sass
  cleanCss = require('gulp-clean-css'),  //minify sass
  concat = require('gulp-concat'),  //concat css and js
  uglify = require('gulp-uglify'), //minify js
  autoprefixer = require('gulp-autoprefixer'), //add vendor prefixes to css
  htmlmin = require('gulp-htmlmin');
  
// Set the browser  to support
const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('default', ['styles','js', 'pages']);
  
gulp.task('styles', function () {
    var foundationCss = gulp.src('./node_modules/foundation-sites/assets/foundation.scss')
        .pipe(sass({
            includePaths: ['./node_modules/foundation-sites/scss'],
			errLogToConsole: false,
			onError: function(err) {
				return notify().write(err);
			}
        }))
        .pipe(gulp.dest('app/css/'));
    var appCss = gulp.src('./app/scss/app.scss')
        .pipe(sass({
			errLogToConsole: false,
			onError: function(err) {
				return notify().write(err);
			}
        }))
        .pipe(gulp.dest('./app/css/'));	
	/*var flowersCss = gulp.src('./app/scss/flowers.scss')
		.pipe(sass({
			errLogToConsole: false,
			onError: function(err) {
				return notify().write(err);
			}
		}))
		.pipe(gulp.dest('./app/css/'));*/
    return gulp.src(['./app/css/foundation.css','./app/css/app.css'])
        .pipe(concat('bundle.css'))
		.pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
        .pipe(cleanCss())
        .pipe(gulp.dest('./dist/css'));
});
// merge and minify all foundation js files
gulp.task('js', function () {
    return gulp.src(['./node_modules/jquery/dist/jquery.js' , './node_modules/foundation-sites/dist/js/foundation.min.js', './app/js/app.js'])
        .pipe(concat('bundle.js'))
		.pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});
//minify HTML files
gulp.task('pages', function() {
  return gulp.src(['./views/*.html'])
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('./dist'));
});
//TODO add grunt-contrib-jshint
//TODO set up gulp watch