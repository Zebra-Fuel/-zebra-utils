/* eslint-disable node/no-unpublished-require */
const { src, dest } = require('gulp');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

const sentry = () =>
    src('sentry.js')
        .pipe(
            babel({
                presets: ['@babel/env'],
            }),
        )
        .pipe(uglify())
        .pipe(dest('dist'));

exports.sentry = sentry;
