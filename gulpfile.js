const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');

//Compile Sass && Inject into browser
gulp.task('sass', () => {
  return gulp.src([
    'node_modules/bootstrap/scss/bootstrap.scss',
    'src/scss/*.scss'
  ])
  .pipe(sass()) //Compile
  .pipe(gulp.dest('src/css')) //Send CSS archives for this directory
  .pipe(browserSync.stream()); //Open browser with browser-sync
});

//Move JS Files to src/js
gulp.task('js', () => {
  return gulp.src([
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/popper.js/dist/umd/popper.min.js'
  ])
  .pipe(gulp.dest('src/js')) //Send JS archives for this directory
  .pipe(browserSync.stream()); //Open browser with browser-sync
});

//Watch Sass && Server

gulp.task('serve', ['sass'], () => {
  browserSync.init({
      server: './src'
  });

  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']); //Watch all scss files
  gulp.watch('src/*.html').on('onchange', browserSync.reload); //Watch all html files.
})

//Move Fonts Folder to src/css
gulp.task('fonts', () => {
  return gulp.src('node_modules/font-awesome/fonts/*')
  .pipe(gulp.dest('src/fonts')); //Move Font dir of font-awesome for a src folder
})

//Move Font Awesome CSS to src/css
gulp.task('fa', () => {
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
  .pipe(gulp.dest('src/css')); //Move Font dir of font-awesome for a src folder
})

//Default gulp
gulp.task('default', ['js','serve', 'fa', 'fonts']);
