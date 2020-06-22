const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

gulp.task('images', function () {
    return gulp.src("src/img/**/*")
        .pipe(
            imagemin({
                optimixationLevel: 5 // 0 to 7
            })
        )
        .pipe(gulp.dest("dist/img"));
});
gulp.task('default', gulp.parallel('images'));