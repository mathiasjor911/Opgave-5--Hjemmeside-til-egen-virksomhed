const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const terser = require("gulp-terser");
const rename = require("gulp-rename");

function styles() {

    return(
        gulp.src("css/*.scss")
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(postcss([autoprefixer({grid:true}), cssnano()]))
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest("css"))
            .pipe(browserSync.stream())
    );
}

function js(){
    return(
        gulp.src(["js/*.js", "!js/*min.js"])
            .pipe(sourcemaps.init())
            .pipe(terser())
            .pipe(rename({
                suffix:".min"
            }))
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest("js"))
    );
}

function watch(){
    gulp.watch("css/*.scss", styles);
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch(["js/*.js", "!js/*min.js"], js);
    
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    
    
}

const build = gulp.parallel(styles, js);


exports.styles = styles;
exports.js = js;
exports.watch = watch;
exports.build = build;



