const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const plumber = require("gulp-plumber");


gulp.task('default', ['browserSyncTask'], function () {
    gulp.watch('scss/**/*.scss',['scss']);
    gulp.watch('**/*.html', ['html'], ['bs-reload']);
});

gulp.task('scss', function() {
    gulp.src('scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass({
            outputStyle: 'expanded'
        })
            .on('error', sass.logError))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.reload({ stream:true }))
});

//BrowserSync
gulp.task("browserSyncTask", function () {
    browserSync.init({
        server: {
            baseDir: "./",
            index: "index.html"
        }
    });
});

gulp.task('html', function() {
    gulp.src(['**/*.html'])
        .pipe(browserSync.reload({ stream:true }))
});
