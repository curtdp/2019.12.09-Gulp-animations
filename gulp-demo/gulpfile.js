const { src, dest, series, parallel, watch } = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const nunjucks = require('gulp-nunjucks');
const browserSync = require('browser-sync').create();







function defaultTask(cb) {
  src('src/*.html')
    .pipe(nunjucks.compile())
    .pipe(dest('dist'));
  // place code for your default task here
  cb();
}

function imageMin(cb) {
  src('src/img/**/*.png')
    .pipe(imagemin())
    .pipe(dest('dist/img'));
  // place code for your default task here
  cb();
}

function uglifyTask(cb) {
  src('src/js/*.js')
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(dest('dist/js'));
  // place code for your default task here
  cb();
}

function sassTask(cb) {
  src('src/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('dist/styles'))
    .pipe(browserSync.stream());
  cb();
}

// Watch
function watchTask() {
  // serve();
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
  watch(`src/*.html`, defaultTask).on('change', browserSync.reload);
  watch(`src/img`, imageMin);
  watch(`src/**/*.js`, uglifyTask);
  watch(`src/**/*.scss`, sassTask);
}


exports.default = defaultTask;
exports.imagemin = imageMin;
exports.uglify = uglifyTask;
exports.styles = sassTask;
exports.build = parallel(defaultTask, imageMin, uglifyTask, sassTask);
exports.watch = watchTask;