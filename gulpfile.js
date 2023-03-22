const { src, dest, watch, series } = require( 'gulp' );
const sass = require( 'gulp-sass' )( require( 'sass' ) );
const imagemin = require( 'gulp-imagemin' );

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

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.default = series( imagenes, css, dev );