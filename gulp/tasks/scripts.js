const gulp          = require('gulp'),
      plumber       = require('gulp-plumber'),
      rigger       = require('gulp-rigger'),
      minify       = require('gulp-minify'),
      errorHandler  = require('../errorHandler'),
      pkg           = require('../../package.json');

gulp.task('scripts', async () => {
  gulp.src('app/scripts/**/*.js')
  .pipe(plumber({
    errorHandler: errorHandler
  }))
  .pipe(rigger())
  .pipe(minify())
  .pipe(gulp.dest('dist/assets/srcipts'))
});
