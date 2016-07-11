var Handlebars = require('handlebars');

module.exports = function(condition, truthyValue) {
  if (condition) return truthyValue;
}
