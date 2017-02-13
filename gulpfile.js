const gulp = require("gulp");
const babel = require("gulp-babel");
const runSequence = require('run-sequence');
const concat = require('gulp-concat');

const basePath = {
    src: 'src/',
    dest: 'public/assets/',
    static: 'public/',
};

const src  = {
    libs: basePath.src + 'js/libs/',
    js: basePath.src + 'js/',
    view: basePath.src + 'view/',
    css: basePath.src + 'css/',
};

const dest = {
    js: basePath.dest + 'js/',
    view: basePath.static,
    css: basePath.dest + 'css/',
};

//Task: concatenate dependencies
gulp.task('make:dependencies', function() {
    console.log("make:dependencies");
    return gulp
        .src([
            src.libs + 'jquery-3.1.1.min.js',
            src.libs + 'bootstrap.min.js',
            src.libs + 'vue.min.js',
            src.libs + 'vue-resource.min.js',
            src.libs + 'director.min.js',
        ])
        .pipe(concat('dependencies.js'))
        .pipe(gulp.dest(dest.js));
});

//Task: convert index.js
gulp.task('make:main-scripts', function() {
    console.log("make:main scripts");
    return gulp.src(src.js + "main/index.js")
        .pipe(babel())
        .pipe(gulp.dest(dest.js));
});

//Task: copy html
gulp.task('copy:view', function() {
    console.log("copy:static html");
    return gulp.src(src.view + 'index.html')
        .pipe(gulp.dest(dest.view));
});

//Task: copy css
gulp.task('copy:style', function() {
    return gulp.src([
        src.css + 'bootstrap.min.css',
        src.css + 'index.css'
        ])
        .pipe(gulp.dest(dest.css));
});

//Main task runner
gulp.task('default', function() {
    runSequence( 'make:dependencies', 'make:main-scripts', 'copy:view', 'copy:style');
});
