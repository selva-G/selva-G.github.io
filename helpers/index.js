var handlebars = require('handlebars');
var handlebarsLayouts = require('handlebars-layouts');

// Register helpers
module.exports = handlebars.registerHelper(handlebarsLayouts(handlebars));
