const gulp = require('gulp');
const webserver = require('gulp-webserver');
const ejs = require('gulp-ejs');
const pug = require('gulp-pug');
const htmlprettify = require('gulp-html-prettify');
const config = require('./config');

gulp.task('webserver', function(){
  gulp.src('./dist')
  .pipe(webserver({
    open: true,
    port: 9001
  }));
});

gulp.task('pug', () => {
  gulp.src(config.pug.path.exec)
  .pipe(pug({}, {}, { ext: '.html' }))
  .on('error', swallowError)
  .pipe(htmlprettify({indent_char: ' ', indent_size: 2}))
  .pipe(gulp.dest("./dist"));
});


gulp.task('default', ['webserver', 'pug'], () => {
  gulp.watch(config.pug.path.watch, ['pug']);
});

gulp.task('build', ['pug']);

/**
* swallowError - 에러 핸들링 (https://stackoverflow.com/questions/23971388/prevent-errors-from-breaking-crashing-gulp-watch)
*
* @param  {obejct} error
*/
function swallowError (error) {
  console.log(error.toString());
}
