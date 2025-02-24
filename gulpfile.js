const { src, dest, watch, series, parallel } = require('gulp')
const sass = require('gulp-sass')(require('sass')) // sass to css
const postcss = require('gulp-postcss') //minified css
const cssnano = require('cssnano') // minified css
const terser = require('gulp-terser') // minified js
const browsersync = require('browser-sync').create()

// File Path
const paths = {
    html: 'src/*.html',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
    icons: 'icons/**/*',
    imgs: 'images/**/*',
    output: 'dist',
}

// HTML Task - Copies HTML files to `dist`
function htmlTask() {
    return src(paths.html)
        .pipe(dest(paths.output));
}

// Sass Tasks 
function scssTask() {
    return src(paths.scss, { sourcemaps: true})
        .pipe(sass())
        .pipe(postcss([cssnano()]))
        .pipe(dest(paths.output, { sourcemaps: '.'}))
}



// Copy Icons Task
function iconsTask() {
    return src(paths.icons)
        .pipe(dest(`${paths.output}/icons`));
}

// Copy Images Task
function imgsTask() {
    return src(paths.imgs)
        .pipe(dest(`${paths.output}/images`))
}

// JS Tasks 
function jsTask() {
    return src(paths.js, { sourcemaps: true})
        .pipe(terser())
        .pipe(dest(paths.output, { sourcemaps: '.'}))
}

// BrowserSync Tasks 
function browsersyncServe(callback) {
    browsersync.init({
        server: {
            baseDir: paths.output
        }
    })

    callback()
}

function browsersyncReload(callback) {
    browsersync.reload()
    callback()
}

// Watch Tasks
function watchTasks() {
    watch(paths.html, series(htmlTask ,browsersyncReload))
    watch([paths.scss, paths.js], series(parallel(scssTask, jsTask), browsersyncReload))
    watch(paths.icons, series(iconsTask, browsersyncReload))
    watch(paths.imgs, series(imgsTask, browsersyncReload))
}

// Default Gulp Task
exports.default = series(
    scssTask,
    jsTask,
    htmlTask,
    iconsTask,
    imgsTask,
    browsersyncServe,
    watchTasks
)

// Build task for CI/CD (GitHub Actions)
exports.build = series(scssTask, jsTask, htmlTask, iconsTask, imgsTask);