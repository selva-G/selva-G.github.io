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
var define = require('metalsmith-define');

Handlebars.registerPartial('layout', fs.readFileSync('layouts/layout.hbs', 'utf8'));

var metalsmith = Metalsmith(__dirname)
  .source('content')
  .use(drafts())
  .use(define({
    moment: require('moment')
  }))
  .use(registerHelpers())
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
      reverse: true,
      metadata: {
        name: 'Articles'
      }
    }
  }))
  .use(pagination({
    'collections.posts': {
      perPage: 15,
      layout: 'posts.hbs',
      first: 'posts/index.html',
      path: 'posts/:num/index.html'
    }
  }))
  .use(layouts('handlebars'))
  .use(permalinks({
    pattern: ':collection/:title'
  }))
  .use(assets())
  .use(sass({
    file: './public/styles/app.scss',
    includePaths: ['./public/styles/']
  }))
  .use(autoprefixer())
  .use(assets({
    source: './vendor/highlight/',
    destination: './vendor/'
  }));

metalsmith.use(browserSync({
  server: './build',
  files: [
    'content/**/*.md',
    'layouts/**/*.hbs',
    'public/**/*',
    'helpers/**/*'
  ],
  ui: false,
  open: false
}));

metalsmith.build(function(err) {
  if (err) throw err;
  console.log('Build finished!');
});
