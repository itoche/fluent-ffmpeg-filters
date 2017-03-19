const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, '.', 'filter.hdb');

const template = handlebars.compile(fs.readFileSync(templatePath, "utf8"));

handlebars.registerHelper('capitalize', function(text) {
  console.log(text);
  return text.charAt(0).toUpperCase() + text.slice(1);
});

handlebars.registerHelper('formatComment', function(text) {
  return text.replace(/(?:\r\n|\r|\n)/g, '\n   * ');
});

function render(filter, out) {
  const gen = template(filter);
  out(filter.filterName, gen);
}

module.exports.render = render
