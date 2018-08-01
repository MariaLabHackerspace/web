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

// Travis FTP Deploy
gulp.task( 'deploy', function () {

var conn = ftp.create( {
    host:     'ftp.marialab.org',
    user:     args.user,
    password: args.password,
    parallel: 10,
    log:      gutil.log,
    secure:   true
});

var globs = [
    'assets/css/**',
    'assets/js/**',
    'index.html'
];

// using base = '.' will transfer everything to /public_html correctly
// turn off buffering in gulp.src for best performance

return gulp.src( globs, { base: '.', buffer: false } )
    .pipe( conn.newer( '/www/v2' ) ) // only upload newer files
    .pipe( conn.dest( '/www/v2' ) );

});

gulp.task('default', ['sass', 'watch']);
gulp.task('build', ['sass']);
