const load = require('./metadata.js').load;
const renderFilter = require('./render.js').renderFilter;
const renderIndex = require('./render.js').renderIndex;
const async = require('async');
const fs = require('fs');
const path = require('path');
const program = require('commander');
const version = require('../package.json').version;
const DEBUG_NAMESPACE = 'fluent-ffmpeg-filters:generator';
const debugCore = require('debug');
let debug;

const INVALID_FILTERS = ['escaping', 'syntax'];

let cmdOptions = {};

let choosenFilters = [];

program
  .version(version)
  .usage('[options] [filters...]')
  .option('-d, --debug', 'Logs debug information in the console')
  .action((filters, options) => {
    cmdOptions = options;
    if (options.debug) {
      debugCore.enable(DEBUG_NAMESPACE);
    }
    choosenFilters = choosenFilters.concat(filters);
  })
  .parse(process.argv);

debug = debugCore(DEBUG_NAMESPACE);

async.waterfall([
  load,
  clean,
  generateFilters,
  generateIndex
], function (err, results) {
  if (err) {console.error(err);}
  else {console.log(results);};
});

function clean(filters, callback) {
  filters = removeFilters(filters, INVALID_FILTERS);
  if (choosenFilters && choosenFilters.length > 0) {
      filters = keepFilters(filters, choosenFilters);
  }
  callback(null, filters);
}

function removeFilters(filters, toRemove) {
  return filters.filter((item) => !toRemove.includes(item.filterName));
}

function keepFilters(filters, toKeep) {
  return filters.filter((item) => toKeep.includes(item.filterName));
}

function generateFilters(filters, callback) {

  debug('Generating filters...\n%s', JSON.stringify(filters, null, 4));

  async.each(filters, (filter, cb) => {
    renderFilter(filter, writeToFile, cb);
  }, (err) => {
    callback(err, filters)
  });
}

function generateIndex(filters, callback) {
  debug('Generating index.js file...');
  async.waterfall([
    (cb) => {
      renderIndex(filters, writeToFile, cb);
    }
  ], function (err, results) {
    callback(err, results);
  });
}

const GENERATED_FILES_DIR = path.join(__dirname, '..', 'tmp');

function writeToFile(fileName, fileContent, cb) {
  if (!fs.existsSync(GENERATED_FILES_DIR)){
    fs.mkdirSync(GENERATED_FILES_DIR);
  }
  const filePath = path.join(__dirname, '..', 'tmp', fileName + '.js');

  debug('Outputs filter in ' + filePath);

  fs.writeFile(filePath, fileContent, function(err) {
    if(err) {
        return console.log(err);
    }
    cb();
  });

}

function filterFileName (filterName) {
  const filePath = path.join(__dirname, '..', 'tmp', filterName + '.js');
  return filePath;
}
