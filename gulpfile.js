const gulp = require('gulp')
const ts = require('gulp-typescript')
const clean = require('gulp-clean')
const merge = require('merge2')
const tsProject = ts.createProject('tsconfig.json', { declaration: true })

gulp.task('clean', () => {
    return gulp.src('lib', { read: false })
        .pipe(clean({ force: true }))
})

gulp.task('compile', () => {
    const tsResult = gulp
        .src('src/**/*.ts')
        .pipe(tsProject())
    
    return merge([
        tsResult.dts.pipe(gulp.dest('lib')),
        tsResult.js.pipe(gulp.dest('lib')),
    ])
})

gulp.task('build', gulp.series(['clean', 'compile']))