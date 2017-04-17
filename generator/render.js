const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const filterTemplatePath = path.join(__dirname, '.', 'filter.hdb');
const indexTemplatePath = path.join(__dirname, '.', 'index.hdb');

const filterTemplate = handlebars.compile(fs.readFileSync(filterTemplatePath, "utf8"));
const indexTemplate = handlebars.compile(fs.readFileSync(indexTemplatePath, "utf8"));

handlebars.registerHelper('capitalize', function(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
});

handlebars.registerHelper('formatComment', function(text) {
  return text.replace(/(?:\r\n|\r|\n)/g, '\n   * ');
});

handlebars.registerHelper('toIdentifier', function(text) {

  if (RESERVED_WORDS.includes(text) || !isNaN(text.charAt(0))) {
    text = '_' + text;
  }

  return text.replace(/\W+/g, '_');
});

const RESERVED_WORDS = ['null', 'new', 'in', 'function'];

function renderFilter(filter, out, cb) {
  const gen = filterTemplate(filter);
  out(filter.filterName, gen, cb);
}

function renderIndex(filters, out, cb) {
  const gen = indexTemplate(filters);
  out('index', gen, cb);
}


module.exports.renderFilter = renderFilter
module.exports.renderIndex = renderIndex
