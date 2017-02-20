const gulp = require("gulp");
const babel = require("gulp-babel");
const runSequence = require('run-sequence');
const concat = require('gulp-concat');
const filter = require('gulp-filter');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync');
const mainBowerFiles = require('gulp-main-bower-files');

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

gulp.task('make:js-dependencies', function(){
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles())
        .pipe(concat('dependencies.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dest.js))
        .pipe(browserSync.stream());
});

//Task: convert index.js
gulp.task('make:main-scripts', function() {
    console.log("make:main scripts");
    return gulp.src(src.js + "main/index.js")
        .pipe(babel())
        .pipe(gulp.dest(dest.js))
        .pipe(browserSync.stream());
});

//Task: copy html
gulp.task('copy:view', function() {
    console.log("copy:static html");
    return gulp.src(src.view + 'index.html')
        .pipe(gulp.dest(dest.view))
        .pipe(browserSync.stream());
});

//Task: copy css
gulp.task('copy:style', function() {
    return gulp.src([
        src.css + 'bootstrap.min.css',
        src.css + 'index.css'
        ])
        .pipe(gulp.dest(dest.css))
        .pipe(browserSync.stream());
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: basePath.static,
        },
        port: 8080,
        open: false,
        notify: false,
    });

    gulp.watch(src.js + 'main/*.js', ['make:main-scripts']);
    gulp.watch(src.css + '*.css', ['copy:style']);
    gulp.watch(src.view + 'index.html', ['copy:view']);
    gulp.watch(dest.static + 'index.html').on('change', browserSync.reload);
});


//Main task runner
gulp.task('default', function() {
    runSequence( 'make:js-dependencies', 'make:main-scripts', 'copy:view', 'copy:style', 'browser-sync');
});
