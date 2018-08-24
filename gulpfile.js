var svgSprite = require('gulp-svg-sprites');
var svgmin = require('gulp-svgmin');
var cheerio = require('gulp-cheerio');
var replace = require('gulp-replace');
var gulp = require('gulp');

var assetsDir = './';

gulp.task('svgSprite', function () {
  return gulp.src(assetsDir + 'svg/src/*.svg')
    // minify svg
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    // remove all fill and style declarations in out shapes
    .pipe(cheerio({
      run: function ($) {
        // $('[fill]').removeAttr('fill')
        $('[style]').removeAttr('style');
      },
      parserOptions: { xmlMode: true }
    }))
    // cheerio plugin create unnecessary string '>', so replace it.
    .pipe(replace('&gt;', '>'))
    // build svg sprite
    .pipe(svgSprite({
      mode: 'symbols',
      preview: false,
      selector: 'icon-%f',
      svg: {
        symbols: 'symbol_sprite.html'
      }
    }))
    .pipe(gulp.dest(assetsDir + 'svg/'));
});

var sass = require('gulp-sass');
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('default', function () {
  gulp.watch('svg/src/*.svg', ['svgSprite']);
  gulp.watch('./sass/**/*.scss', ['sass']);
});
