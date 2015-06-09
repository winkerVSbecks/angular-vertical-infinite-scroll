var colors = require('colors');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var ngAnnotate = require('gulp-ng-annotate');
var ngHtml2Js = require("gulp-ng-html2js");
var watch = require('gulp-watch');

var dependencies = [
  'bower_components/angular/angular.js',
  'bower_components/angular-animate/angular-animate.js',
  'bower_components/ui-router/release/angular-ui-router.js',
  'bower_components/scrollMonitor/scrollMonitor.js'
];


gulp.task('gh-deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages({
      remoteUrl: 'git@github.com:rangle/front-end-workshop.git'
    }));
});

gulp.task('dependencies', function () {
  return gulp.src(dependencies)
          .pipe(gulp.dest('./build/dependencies'));
});

gulp.task('js', function () {
  return gulp.src('./app/**/*.js')
          .pipe(concat('app.js'))
          .pipe(gulp.dest('./build/js'));
});

gulp.task('ng-annotate', ['js'], function () {
  return gulp.src('./build/js/app.js')
          .pipe(ngAnnotate())
          .pipe(gulp.dest('./build/js'))
          .pipe(connect.reload());
});

gulp.task('html', function () {
  return gulp.src('./app/**/*.html')
          .pipe(ngHtml2Js({
            moduleName: 'verticalScrollingTest',
            prefix: 'app/',
            single_quotes: true
          }))
          .pipe(concat('app.templ.js'))
          .pipe(gulp.dest('./build/app'))
          .pipe(connect.reload());
});

gulp.task('styles', function() {
  return gulp.src('./css/**/*.css')
          .pipe(gulp.dest('./build/css'))
          .pipe(connect.reload());
});

gulp.task('assets', function() {
  return gulp.src('./assets/**/*')
          .pipe(gulp.dest('./build/assets'))
          .pipe(connect.reload());
});

gulp.task('index', function() {
  return gulp.src('./index.html')
          .pipe(gulp.dest('./build'))
          .pipe(connect.reload());
});


gulp.task('dev', [
  'index',
  'assets',
  'styles',
  'dependencies',
  'ng-annotate',
  'html'
], function() {
  // Start a server
  connect.server({
    root: './build',
    port: 3000,
    livereload: true
  });
  console.log('[CONNECT] Listening on port 3000'.yellow.inverse);

  watch(['./css/**/*.css'], function () {
    gulp.start('styles');
  });

  watch('./assets/**/*', function () {
    gulp.start('assets');
  });

  watch('./index.html', function () {
    gulp.start('index');
  });

  watch('./app/**/*.js', function () {
    gulp.start('ng-annotate');
  });

  watch('./app/**/*.html', function () {
    gulp.start('html');
  });
});
