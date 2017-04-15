const load = require('./metadata.js').load;
const renderFilter = require('./render.js').renderFilter;
const renderIndex = require('./render.js').renderIndex;
const async = require('async');
const fs = require('fs');
const path = require('path');

const INVALID_FILTERS = ['escaping', 'syntax'];

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
  filters = filters.filter((item) => !INVALID_FILTERS.includes(item.filterName));

  callback(null, filters);
}

function generateFilters(filters, callback) {
  async.each(filters, (filter, cb) => {
    renderFilter(filter, writeToFile, cb);
  }, (err) => {
    callback(err, filters)
  });
}

function generateIndex(filters, callback) {
  console.log('generateIndex');
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

  console.log('create filte ' + filePath);

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
