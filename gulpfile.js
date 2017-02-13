var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task("default", function () {
  return gulp.src("src/js/main/index.js")
    .pipe(babel())
    .pipe(gulp.dest("public/js"));
});
