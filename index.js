'use strict'

var fs = require('fs');
var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var drafts = require('metalsmith-drafts');
var browserSync = require('metalsmith-browser-sync');
var autoprefixer = require('metalsmith-autoprefixer');
var sass = require('metalsmith-sass');
var permalinks = require('metalsmith-permalinks');
var beautify = require('metalsmith-beautify');
var assets = require('metalsmith-assets');
var changed = require('metalsmith-changed');
var Handlebars = require('handlebars');
var registerHelpers = require('metalsmith-register-helpers');
var inPlace = require('metalsmith-in-place');
var collections = require('metalsmith-collections');
var pagination = require('metalsmith-pagination');
var excerpts = require('metalsmith-better-excerpts');
var concat = require('metalsmith-concat');

Handlebars.registerPartial('layout', fs.readFileSync('src/layouts/layout.hbs', 'utf8'));

Metalsmith(__dirname)
  .source('src/content')
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
      pattern: 'content/posts/*.md',
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
  .build(function(err) {
    if (err) throw err;
  });

Metalsmith(__dirname)
  .source('src/styles')
  .use(sass({
    includePaths: ['./src/styles/'],
    outputDir: './css'
  }))
  .use(concat({
    files: '**/*.css',
    output: 'styles/app.css',
    forceOutput: true
  }))
  .use(autoprefixer())
  .build(function(err) {
    if (err) throw err;
  });

  Metalsmith(__dirname)
    .source('src/js')
    .use(assets({
      source: './src/js',
      destination: 'js/'
    }))
    .build(function(err) {
      if (err) throw err;
    });

  Metalsmith(__dirname)
    .source('src/images')
    .use(assets({
      source: './src/images',
      destination: 'images/'
    }))
    .build(function(err) {
      if (err) throw err;
    });

// Metalsmith(__dirname)
//   .use(browserSync({
//     server: './build',
//     files: [
//       'content/**/*.md',
//       'layouts/**/*.hbs',
//       'public/**/*',
//       'helpers/**/*',
//       'styles/**/*'
//     ],
//     ui: false,
//     open: false
//   }))
//   .build(function(err) {
//     if (err) throw err;
//     console.log('Build finished!');
//   });
