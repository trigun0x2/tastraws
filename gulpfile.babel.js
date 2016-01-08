'use strict';

import gulp from 'gulp';
import babelify from 'babelify';
import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import gutil from 'gulp-util';
import es from 'event-stream';
import 'colors';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify';

const files = [
  {
    entry: 'js/app.js',
    output: 'js/app.min.js',
  },
];

gulp.task('sass', () => {
  return gulp.src('src/css/*.scss')
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'expanded',
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('html', () => {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest(''));
});

gulp.task('js', () => {
  return es.merge.apply(null, files.map((file) => {
    const bundler = watchify(browserify(`src/${file.entry}`))
      .transform(babelify);

    function bundle() {
      gutil.log(`Bundled dist/${file.output}`.green);
      return bundler.bundle()
        .on('error', gutil.log)
        .pipe(source(`${file.output}`))
        // .pipe(buffer())
        // .pipe(uglify().on('error', gutil.log))
        .pipe(gulp.dest('dist/'));
    }

    bundler.on('update', bundle);
    return bundle();
  }));
});

gulp.task('default', () => {
  gulp.watch('src/css/**/*.scss', ['sass']);
  gulp.start('sass');

  gulp.watch('src/**/*.html', ['html']);
  gulp.start('html');

  gulp.start('js');
});
