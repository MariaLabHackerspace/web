//gulpfile.js

var gulp = require('gulp');
var sass = require('gulp-sass');

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