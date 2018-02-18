//gulpfile.js

var gulp = require('gulp');
var sass = require('gulp-sass');
var ftp = require('vinyl-ftp');
var gutil = require('gulp-util');
var minimist = require('minimist');
var args = minimist(process.argv.slice(2));

//style paths
var sassFiles = 'assets/sass/**/*.scss',
    cssDest = 'assets/css/';

gulp.task('sass', function(){
    gulp.src(sassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(cssDest));
});

gulp.task('watch',function() {
    gulp.watch(sassFiles,['sass']);
});

gulp.task('default', ['sass', 'watch']);

// Travis FTP Deploy
gulp.task('deploy', function() {
    var remotePath = '/www/';
    var conn = ftp.create({
      host: 'ftp.marialab.org',
      user: args.user,
      password: args.password,
      log: gutil.log
    });
    gulp.src(['index.html', sassFiles])
      .pipe(conn.newer(remotePath))
      .pipe(conn.dest(remotePath));
  });