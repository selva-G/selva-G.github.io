'use strict'

var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');

Metalsmith(__dirname)
  .source('content')
  .use(markdown())
  .use(layouts('jade'))
  .build(function(err) {
    if (err) throw err;
    console.log('Build finished!');
  });
