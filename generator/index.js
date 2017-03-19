const load = require('./metadata.js').load;
const render = require('./render.js').render;
const async = require('async');
const fs = require('fs');
const path = require('path');

async.waterfall([
  load,
  generate
], function (err, results) {
  if (err) {console.error(err);}
  else {console.log(results);};
});

function generate(filters, callback) {
  async.each(filters, (filter, cb) => {
    render(filter, writeToFile);
  }, callback);
}

const GENERATED_FILES_DIR = path.join(__dirname, '..', 'tmp');

function writeToFile(filterName, fileContent) {
  if (!fs.existsSync(GENERATED_FILES_DIR)){
    fs.mkdirSync(GENERATED_FILES_DIR);
  }

  fs.writeFile(filterFileName(filterName), fileContent, function(err) {
    if(err) {
        return console.log(err);
    }
  });
}

function filterFileName (filterName) {
  const filePath = path.join(__dirname, '..', 'tmp', filterName + '.js');
  return filePath;
}
