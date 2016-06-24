var Handlebars = require('handlebars');

module.exports = function(options) {
  var iframeSrc = options.hash.src;
  var height = options.hash.height;
  return new Handlebars.SafeString(
    `<iframe src=${iframeSrc} height=${height} width="100%" allowfullscreen="allowfullscreen" frameborder="0"></iframe>`
  );
}
