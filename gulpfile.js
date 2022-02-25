const gulp=require('gulp');
const sass=require('gulp-sass');
const cssnano=require('gulp-cssnano');
const rev=require('gulp-rev');
const uglify=require('gulp-uglify-es').default;
const del=require('del');



// gulp have tasks

gulp.task('css',function(done){
    console.log('minifying css');
    gulp.src('./assets/css/**/*.css')
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));

    return gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge : true,
    }))
    .pipe(gulp.dest('./public/assets'));
    

   

});
gulp.task('javascript',function(done){
         console.log('minifying js');
    
        gulp.src('./assets/**/*.js')
         .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('./public/assets'))
        .pipe(rev.manifest({
            cwd:'public',
          merge: true,
        })).pipe(gulp.dest('./public/assets'));
    
         done();
     });


  gulp.task('cleanassets',function(done){
      del.sync('./public/assets');
      done();
  })  
    
  gulp.task('build',gulp.series('cleanassets','css','javascript'),function(done){
      console.log('building assets');
      done();
  })
    