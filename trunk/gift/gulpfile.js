var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var webserver = require('gulp-webserver');

gulp.task('copy-ionic', function(){
	gulp.src('gift/ionic/**/*')
	.pipe(gulp.dest('giftPro/ionic'));
})
gulp.task('copy-data', function(){
	gulp.src('gift/data/**/*')
	.pipe(gulp.dest('giftPro/data'));
})
gulp.task('copy-img', function(){
	gulp.src('gift/img/**/*')
	.pipe(gulp.dest('giftPro/img'));
})
gulp.task('handle-js', function(){
	gulp.src('gift/javascript/**/*')
	.pipe(concat('gift.bundle.js'))
	.pipe(gulp.dest('giftPro/javascript'))
	.pipe(uglify())
	.pipe(rename('gift.bundle.min.js'))
	.pipe(gulp.dest('giftPro/javascript'));
})
gulp.task('handle-css', function(){
	gulp.src('gift/css/**/*')
	.pipe(concat('style.css'))
	.pipe(gulp.dest('giftPro/css'))
	.pipe(minifyCSS())
	.pipe(rename('style.min.css'))
	.pipe(gulp.dest('giftPro/css'));
})
gulp.task('handle-html', function(){
	gulp.src('gift/views/**/*')
	.pipe(gulp.dest('giftPro/views'));
	gulp.src('gift/index.html')
	.pipe(gulp.dest('giftPro'));
})

gulp.task('default', ['copy-ionic', 'copy-data', 'copy-img', 'handle-js', 'handle-css', 'handle-html']);
