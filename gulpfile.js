const fs = require('fs');
const gulp = require('gulp');
const runSequence = require('run-sequence');
const del = require('del');
const frontMatter = require('gulp-front-matter');
const assign = require('lodash.assign');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const gulpsmith = require('gulpsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const drafts = require('metalsmith-drafts');
const registerHelpers = require('metalsmith-register-helpers');
const inPlace = require('metalsmith-in-place');
const collections = require('metalsmith-collections');
const pagination = require('metalsmith-pagination');
const excerpts = require('metalsmith-better-excerpts');
const permalinks = require('metalsmith-permalinks');
const Handlebars = require('handlebars');
const browserSync = require('browser-sync').create();

Handlebars.registerPartial('layout', fs.readFileSync('src/layouts/layout.hbs', 'utf8'));

gulp.task('clean', () => {
  return del('build/')
});

gulp.task('build:metalsmith', () => {
  return gulp.src('src/content/**/*.md')
    .pipe(frontMatter().on('data', (file) => {
      assign(file, file.frontMatter);
      delete file.frontMatter;
    }))
    .pipe(
      gulpsmith()
        .use(drafts())
        .use(registerHelpers({
          directory: 'src/helpers'
        }))
        .use(inPlace({
          engine: 'handlebars',
          pattern: '**/*.md'
        }))
        .use(markdown({
          langPrefix: 'hljs lang-',
          highlight: function(code, lang) {
            return require('highlight.js').highlightAuto(code, [lang]).value;
          }
        }))
        .use(excerpts({
          pruneLength: 150
        }))
        .use(collections({
          posts: {
            pattern: 'content/posts/*.html',
            sortBy: 'date',
            reverse: true
          }
        }))
        .use(pagination({
          'collections.posts': {
            perPage: 15,
            layout: 'posts.hbs',
            first: 'index.html',
            path: 'posts/:num/index.html'
          }
        }))
        .use(permalinks({
          pattern: ':collection/:title'
        }))
        .use(layouts({
          engine: 'handlebars',
          directory: 'src/layouts'
        }))
    )
    .pipe(gulp.dest('./build'));
});

gulp.task('build:css', () => {
  return gulp.src('src/styles/**/*')
    .pipe(sass())
    .pipe(concat('site.css'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./build/styles'))
    .pipe(browserSync.stream());
});

gulp.task('build:js', () => {
  return gulp.src('src/js/**/*')
    .pipe(concat('site.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('build:images', () => {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('./build/images'));
});

gulp.task('build', (cb) => {
  runSequence('clean', ['build:metalsmith', 'build:css', 'build:js', 'build:images'], cb);
});

gulp.task('reload', () => {
  browserSync.reload();
});

gulp.task('serve', ['build'], () => {
  browserSync.init({
    server: './build'
  });

  gulp.watch('src/styles/*.scss', ['build:css']);
  gulp.watch('src/images/**/*', () => {
    runSequence('build:images', 'reload');
  });
  gulp.watch('src/js/**/*', () => {
    runSequence('build:js', 'reload');
  });
  gulp.watch('src/content/**/*.md', () => {
    runSequence('build:metalsmith', 'reload');
  });
});

gulp.task('default', ['build']);
