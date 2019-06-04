const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const less = require('gulp-less');
const path = require('path');

//  gulp 前端自动构建

// 1. 压缩html
gulp.task('htmlmin', () => {
    return gulp.src('src/html/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist/html'));
});

// 2. 压缩css
gulp.task('cssmin', () => {
    return gulp.src(['./src/css/*.css', '!src/css/*.min.css'])
        .pipe(cssmin())
        .pipe(rename(function(path) {
            path.extname = ".min.css";
        }))
        .pipe(gulp.dest('dist/css'));
});

// 3. 压缩JS
// gulp.task('jsmin', () => {
//     return gulp.src(['./src/js/*.js', '!src/js/*.min.js'])
//         .pipe(uglify())
//         .pipe(rename(function(path) {
//             path.extname = ".min.js";
//         }))
//         .pipe(gulp.dest('dist/js'));
// });


// 4. 压缩图片
gulp.task('imgmin', () => {
    return gulp.src('src/image/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

// 5. 合并压缩js文件
// gulp.task('js', () => {
//     //合并文件时需要注意先后顺序
//     //先后顺序和依赖有关
//     return gulp.src('/src/js/*.js')
//         .pipe(concat('all.js'))
//         .pipe(gulp.dest('dist/js'))
//         .pipe(rename('all.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js'));
// });

// gulp.task('less', () => {
//     return gulp.src('src/css/*.less')
//         .pipe(less({
//             paths: [path.join(__dirname, 'less', 'includes')]
//         }))
//         .pipe(gulp.dest('./src/css'));
// });

// 6. 文件监听
gulp.task('watch', () => {
    gulp.watch(['./src/html/*.html', './src/css/*.css','./src/image/*'], gulp.series('htmlmin', 'cssmin', 'imgmin'));
});

// gulp.task('watchless', () => {
//     gulp.watch('./src/css/*.less', gulp.series('less'));
// });