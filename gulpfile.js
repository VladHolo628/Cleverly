const { dest, src, series, watch } = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const csso = require('gulp-csso')
const htmlMin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')
const del = require('del')
const sync = require('browser-sync').create()

function html() {
    return src('./src/**.html')
        .pipe(htmlMin({
            collapseWhitespace: true
        }))
        .pipe(dest('dist'))
}

function scss() {
    return src('./src/scss/**.scss')
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(csso())
        .pipe(dest('dist/css'))
}

function img() {
    return src('src/img/**.{jpg,png,svg}')
        .pipe(imagemin([
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(dest('dist/img'))
}

function clear() {
    return del('dist')
}

function serve() {
    sync.init({
        server: './dist'
    })

    watch('src/**.html', html).on('change', sync.reload)
    watch('src/scss/**.scss', scss).on('change', sync.reload)
    watch('src/img/**.{jpg,png,svg}', img).on('change', sync.reload)
}

exports.serve = series(clear, scss, img, html, serve)
exports.build = series(clear, scss, img, html)