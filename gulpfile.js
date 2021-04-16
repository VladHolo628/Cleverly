const { dest, src } = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const csso = require('gulp-csso')
const htmlMin = require('gulp-htmlmin')
const sync = require('browser-sync').create()

function scss() {
    return src('./src/scss/**.scss')
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(csso())
        .pipe(dest('dist/css'))
}
exports.scss = scss