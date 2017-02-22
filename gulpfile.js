var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var imageMin = require('gulp-imagemin');
var server = require('gulp-server-livereload');


gulp.task('scripts', function() {
    return gulp.src(['src/js/*.js'])
        .pipe(concat('app.js', {newLine: ';'}))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('sass', function () {
    return sass('src/main.scss')
        .on('error', sass.logError)
        .pipe(gulp.dest('dist/css'));
});

gulp.task('images', function(){
    return gulp.src('src/images/*')
        .pipe(gulp.dest('dist/images/'))
});

gulp.task('fonts', function(){
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/css/fonts'))
});

gulp.task('pages', function(){
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
});

gulp.task('webserver', function() {
    gulp.src('dist')
        .pipe(server({
            livereload: true,
            directoryListing: false,
            open: true,
            log: 'info',
            defaultFile: 'index.html'
        }));
});

gulp.task('default', function () {
    gulp.start('scripts', 'sass', 'images', 'fonts', 'pages', 'webserver');
    gulp.watch('src/index.html', ['pages']);
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/**/*.scss', ['sass']);
});
