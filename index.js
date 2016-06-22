'use strict'

var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var drafts = require('metalsmith-drafts');
var browserSync = require('metalsmith-browser-sync');

var metalsmith = Metalsmith(__dirname)
  .source('content')
  .use(drafts())
  .use(markdown())
  .use(layouts('jade'));

metalsmith.use(browserSync({
  server: './build',
  files: [
    'content/**/*.md',
    'layouts/**/*.jade'
  ],
  ui: false,
  open: false
}));

metalsmith.build(function(err) {
  if (err) throw err;
  console.log('Build finished!');
});
