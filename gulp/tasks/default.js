'use strict';

const gulp = require('gulp'),
      runSequence = require('gulp4-run-sequence');

gulp.task('default', async () => {
	return runSequence(['del'],[
    'stylus',
    'pug',
    'scripts',
    'imagemin',
    'fonts'
  ],
  ['browserSync',
		'watch'])
});
