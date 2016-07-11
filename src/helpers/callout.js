var Handlebars = require('handlebars');

var calloutClass = {
  warning: 'callout-warning',
  error: 'callout-error',
  info: 'callout-info',
  success: 'callout-success'
};

module.exports = function(options) {
  var type = options.hash.type;
  var message = options.hash.message;

  return new Handlebars.SafeString(
    `<blockquote class="${calloutClass[type]}">${message}</blockquote>`
  );
}
