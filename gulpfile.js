// less编译 压缩  合并
// js合并 压缩 混淆
// img复制
// html压缩

// 载入gulp包
var gulp = require('gulp');
// less编译模块  
var less = require('gulp-less');
// css压缩模块
var cssnano = require('gulp-cssnano');
//合并
var concat = require('gulp-concat');
//压缩混淆
var uglify = require('gulp-uglify');
// less可以导包 所以没必要合并

//html压缩
var htmlmin = require('gulp-htmlmin');

var browserSync = require('browser-sync');
// 实现less编译 压缩  合并
gulp.task('style',function(){
	//这里是执行style任务时自动执行

	gulp.src(['src/style/*.less','!src/style/_*.less'])
	.pipe(less())
	.pipe(cssnano())
	.pipe(gulp.dest('dist/style/'))
	.pipe(browserSync.reload({stream: true})); // css有更改刷新
});

// js合并 压缩 混淆
gulp.task('script',function(){
	gulp.src('src/script/*.js')
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/script/'))
	.pipe(browserSync.reload({stream: true})); // js有更改刷新
});

// img复制
gulp.task('img',function(){
	gulp.src('src/images/*.*')
	.pipe(gulp.dest('dist/images'))
	.pipe(browserSync.reload({stream: true})); // 图片有更改刷新
});

// html压缩
gulp.task('html',function(){
	gulp.src('src/*.html')
	.pipe(htmlmin({collapseWhitespace: true,
      removeComments: true}))
	.pipe(gulp.dest('dist/'))
	.pipe(browserSync.reload({stream: true})); // html有更改刷新
});


gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: ['dist']
    },
  }, function(err, bs) {
    console.log(bs.options.getIn(["urls", "local"]));
  });
// 启动serve后执行监控
  gulp.watch('src/style/*.less',['style']);
  gulp.watch('src/script/*.js',['script']);
  gulp.watch('src/images/*.*',['img']);
  gulp.watch('src/*.html',['html']);
});
