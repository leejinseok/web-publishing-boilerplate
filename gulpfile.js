const gulp = require('gulp');
const ejs = require('gulp-ejs');
const htmlprettify = require('gulp-html-prettify');
const removeFiles = require('gulp-remove-files');
const config = require('./gulp.config');

gulp.task('ejs', () => {
  gulp.src(config.ejs.path.exec)
    .pipe(ejs({}, {}, { ext: '.html' })).on('error', swallowError)
    .pipe(htmlprettify({indent_char: ' ', indent_size: 2})).on('error', swallowError)
    .pipe(gulp.dest("./dist")).on('error', swallowError)
    
  gulp.src('./dist/**/*.ejs')
    .pipe(removeFiles())
});

gulp.task('default', ['ejs'], () => {
  gulp.watch(config.ejs.path.watch, ['ejs']);
});

gulp.task('build', ['ejs']);

/**
* swallowError - 에러 핸들링 (https://stackoverflow.com/questions/23971388/prevent-errors-from-breaking-crashing-gulp-watch)
*
* @param  {obejct} error
*/
function swallowError (error) {
  console.log(error);
}