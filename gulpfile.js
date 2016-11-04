var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var jade        = require('gulp-jade');

var reload = browserSync.reload;

gulp.task('browser-sync', ['sass'], function() {
    browserSync({
        notify: false,
        server: {
            baseDir: '.'
        }
    });

    gulp.watch('assets/css/**', ['sass']);
    gulp.watch('assets/js/**').on('change', reload);;
    gulp.watch(['*.html', '_layouts/*.html', '_includes/*']).on('change', reload);
    gulp.watch('_jadefiles/*', ['jade']);
});


gulp.task('sass', function () {
    return gulp.src('assets/css/main.sass')
        .pipe(sass({
            includePaths: ['css'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/assets/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('jade', function(){
    return gulp.src('_jadefiles/*.jade')
            .pipe(jade())
            .pipe(gulp.dest('_includes'));
});

gulp.task('default', ['browser-sync']);
