'use strict'

var cheerio = require('cheerio');
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

var metalsmith = Metalsmith(__dirname)
  .source('content')
  .use(drafts())
  .use(markdown({
    langPrefix: 'hljs lang-',
    highlight: function(code, lang) {
      return require('highlight.js').highlightAuto(code, [lang]).value;
    }
  }))
  .use(layouts('jade'))
  .use(permalinks({
    pattern: ':title'
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
    'layouts/**/*.jade',
    'public/**/*'
  ],
  ui: false,
  open: false
}));

metalsmith.build(function(err) {
  if (err) throw err;
  console.log('Build finished!');
});
