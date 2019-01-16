const fs = require('fs');
const gulp = require('gulp'),
/* scss → CSS変換 */
      sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      postcss = require('gulp-postcss'),
      autoprefixer = require('autoprefixer'),
      flexBugsFixes = require('postcss-flexbugs-fixes'),
      cssWring = require('csswring'),
      autoprefixerOption = {
        grid: true
      },
      postcssOption = [ 
        flexBugsFixes,
        autoprefixer(autoprefixerOption),
        cssWring
      ],
      
/* ejs → html変換 */
      ejs = require('gulp-ejs'),
      htmlmin = require('gulp-htmlmin'),

      configJsonData = fs.readFileSync('./src/ejs/config.json'),
      configObj = JSON.parse(configJsonData),

      ejsDataOption = {
          config: configObj
      }

      ejsSettingOption = {
          ext: '.html'
      },
      
      htmlminOption = {
          collapseWhitespace: true
      },

/* image圧縮 */
      imagemin = require('gulp-imagemin'),
      imageminPngquant = require('imagemin-pngquant'),
      imageminMozjpeg = require('imagemin-mozjpeg'),
      
      imageminOption = [
          imageminPngquant({ quality: '65-80' }),
          imageminMozjpeg( { quality: 80 }),
          imagemin.gifsicle(),
          imagemin.jpegtran(),
          imagemin.optipng(),
          imagemin.svgo()
      ],

/* local-server port5050 */
      browserSync = require('browser-sync').create(),
      browserSyncOption = {
        port: 5055,
        server: './public'
    };

gulp.task('sass', () => {
    return gulp.src('./src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    
    .pipe(sass())
    .pipe(postcss(postcssOption))
        
    .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./public/assets/css'))        
        ;
});

gulp.task('ejs', ()=> {
    return gulp.src(['./src/ejs/**/*.ejs', '!src/ejs/**/_*.ejs'])
        .pipe(ejs(ejsDataOption, {}, ejsSettingOption))
        .pipe(htmlmin(htmlminOption))
        .pipe(gulp.dest('./public/'));
});

gulp.task('imagemin', () => {
    return gulp.src('./src/images/*')
        .pipe(imagemin(imageminOption))
        .pipe(gulp.dest('./public/assets/images'));
});

gulp.task('serve', (done) => {
    browserSync.init(browserSyncOption)
        done()
});

gulp.task('watch', (done) => {
    const browserReload = (done) => {
        browserSync.reload()
        done()
    }
    gulp.watch('./src/sass/**/*.scss', gulp.series('sass'));
    gulp.watch('./src/ejs/**/*.ejs', gulp.series('ejs'));
    gulp.watch('./src/images/*', gulp.series('imagemin'));
    gulp.watch('./public/**/*', browserReload);
    done()
});

gulp.task('default', gulp.series('serve', 'watch'));