module.exports = {
  indexHTMLDebugApp: {
    src : 'index.html', dest : 'index.html',
    options: { context: { dist: false, tests: false } }
  },
  indexHTMLDebugTests: {
    src : 'index.html', dest : 'tmp/result/tests/index.html',
    options: { context: { dist: false, tests: true } }
  },
  indexHTMLDistApp: {
    src : 'index.html', dest : 'tmp/result/index.html',
    options: { context: { dist: true, tests: false } }
  },
  indexHTMLDistTests: {
    src : 'index.html', dest : 'tmp/result/tests/index.html',
    options: { context: { dist: true, tests: true } }
  }
};