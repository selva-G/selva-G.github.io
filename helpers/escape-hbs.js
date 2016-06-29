var Handlebars = require('handlebars');

module.exports = function(content) {
  return new Handlebars.SafeString(`${content}`);
}
