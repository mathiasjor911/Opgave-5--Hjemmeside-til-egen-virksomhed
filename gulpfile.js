const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const terser = require("gulp-terser");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const critical = require ("critical");

function styles() {
    return(
        gulp.src("css/*.scss")
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(postcss([autoprefixer({grid:true})]))
            .stream         .pipe(sourcemaps.write("."))
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

// Gulp imagemin //
function imgSquash() {
    return gulp
        .src('./img/original/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false},
                    {verbose: true}
                ]
            })
        ]))
        .pipe(gulp.dest('img/'));
}

gulp.task("imgSquash", imgSquash);


// Gulp Critical //
gulp.task('critical', () => {
    return gulp
        .src('*.html')
        .pipe(critical({
            base: 'dist/',
            inline: true,
            css: [
                'css/*.scss'
            ]
        }))
        .on('error', err => {
            log.error(err.message);
        })
        .pipe(gulp.dest('dist/'));
});

exports.styles = styles;
exports.js = js;
exports.watch = watch;
exports.build = build;



