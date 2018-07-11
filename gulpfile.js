const gulp = require('gulp');
const webserver = require('gulp-webserver');
const ejs = require('gulp-ejs');
const htmlprettify = require('gulp-html-prettify');
const config = require('./config');

gulp.task('webserver', function(){
  gulp.src('./dist')
  .pipe(webserver({
    open: true,
    port: 9001
  }));
});

gulp.task('ejs', () => {
  gulp.src(config.ejs.path.exec)
  .pipe(ejs({}, {}, { ext: '.html' }))
  .on('error', swallowError)
  .pipe(htmlprettify({indent_char: ' ', indent_size: 2}))
  .pipe(gulp.dest("./dist"));
});


gulp.task('default', ['webserver', 'ejs'], () => {
  gulp.watch(config.ejs.path.watch, ['ejs']);
});

gulp.task('build', ['ejs']);

/**
* swallowError - 에러 핸들링 (https://stackoverflow.com/questions/23971388/prevent-errors-from-breaking-crashing-gulp-watch)
*
* @param  {obejct} error
*/
function swallowError (error) {
  console.log(error.toString());
}
