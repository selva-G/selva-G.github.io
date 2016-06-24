var Handlebars = require('handlebars');
var handlebarsLayouts = require('handlebars-layouts');

// Register helpers
module.exports = Handlebars.registerHelper(handlebarsLayouts(Handlebars));
