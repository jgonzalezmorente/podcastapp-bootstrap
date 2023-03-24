const { src, dest, watch, series } = require( 'gulp' );
const sass = require( 'gulp-sass' )( require( 'sass' ) );
const imagemin = require( 'gulp-imagemin' );
const purgecss = require( 'gulp-purgecss' );
const rename = require( 'gulp-rename' );

function css( done ) {

    src( 'src/scss/app.scss' )
        .pipe( sass() )
        .pipe( dest( 'build/css' ) );

    done();
}

function dev() {
    watch( 'src/scss/**/*.scss', css );
}

function imagenes( done ) {
    src( 'src/img/**/*' )
        .pipe( imagemin({ optimizationLevel: 3 }) )
        .pipe( dest( 'build/img' ) );

    done();
}

function cssbuild( done ) {
    src( 'build/css/app.css' )
        .pipe( rename({
            suffix: '.min',
        }))
        .pipe( purgecss({
            content: [ 'index.html' ]
        }))
        .pipe( dest( 'build/css' ) );

    done();
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.default = series( imagenes, css, dev );
exports.build = series( cssbuild );