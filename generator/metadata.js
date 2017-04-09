const htmlparser = require('htmlparser2');
const afterLoad = require('after-load');
const async = require('async');
const request = require('request');

class Parameter {

  constructor() {
    this.allowedValues = [];
  }

  set name(name) {
    this.paramName = name;
  }

  get name() {
    return this.paramName;
  }

  set description(desc) {
    this.paramDesc = desc;
  }

  get description() {
    return this.paramDesc;
  }

  addAllowedValue(param) {
    this.allowedValues.push(param);
  }

}

class FilterMeta {

  constructor() {
    this.params = [];
  }

  set name(name) {
    this.filterName = name;
  }

  get name() {
    return this.filterName;
  }

  addParameter(param) {
    this.params.push(param);
  }
}

const filters = [];


function load(cb) {
  async.waterfall([
    function (callback) {
      // afterLoad('http://ffmpeg.org/ffmpeg-filters.html', function(html){
      //    callback(null, html);
      // });
      request('http://ffmpeg.org/ffmpeg-filters.html', function (error, response, body) {
        callback(error, body);
      });
    },
    function (html, callback) {
      parse(html, callback);
    }
  ], function (err, results) {
    cb(err, results);
  });
}


const log = false;

function parse(html, callback) {
  let current;
  let buffer = '';
  let captureText = false;
  let captureParams = false;
  let captureParam = false;
  let captureAllowedValues = false;
  let currentParam;
  let currentValue;
  let currentAllowedValue;

  let level = 0;

  function identStr(level) {
    return ' '.repeat(level);
  }

  function incLevel() {
    level++;
  }

  function decLevel() {
    level--;
  }

  function logOpenTag(name) {
    //console.log(identStr() + '<' + name + '>');
    incLevel();
  }
  function logEndTag(name) {
    decLevel();
    //console.log(identStr() + '</' + name + '>');
  }

  var parser = new htmlparser.Parser({
      onopentag: function(tagname, attribs){
          if (log) logOpenTag(tagname);
          if(tagname === "h3") {
            current = new FilterMeta();
            captureText = true;
          }
          if (captureParams && tagname === "dl") {
            if (captureParam) {
                captureAllowedValues = true;
            } else {
                captureParam = true;
            }

          }
          if (captureParam && tagname === "dt") {
            if (captureAllowedValues) {
                currentAllowedValue = new Parameter();
            } else {
                currentParam = new Parameter();
            }
            captureText = true;
          }
          if (captureParam && tagname === "dd") {
            captureText = true;
          }
      },
      ontext: function(text) {
        if (captureText) {

          buffer += text;
          if (log)  console.log(buffer);
        }

      },
      onclosetag: function(tagname){
         if (log) logEndTag(tagname);
          if(tagname === "h3"){
              current.name = buffer.split(" ").pop();;
              console.log('Filter ' + buffer);
              filters.push(current);
              buffer = '';
              captureText = false;
              captureParams = true;
          }
          if (tagname === "dl") {
            if (captureAllowedValues) {
                captureAllowedValues = false;
                //currentParam.addAllowedValue(currentAllowedValue);
            } else {
              captureParams = false;
              captureParam = false;
            }
          }
          if (tagname === "dt") {
            if (captureParams) {
                if (captureAllowedValues) {
                currentAllowedValue.name = buffer;
              } else {
                const names = parseParamName(buffer) ;
                currentParam.name = names.main;
              }
            }

             buffer = '';
             captureText = false;
          }
          if (tagname === "dd" && currentParam) {
            if (captureParams) {
                if (captureAllowedValues) {
                //console.log(currentAllowedValue);
                currentAllowedValue.description = buffer;
                //console.log(currentAllowedValue);
                //currentParam.addAllowedValue(currentAllowedValue);
                currentAllowedValue = null;
              } else {
                //console.log(currentParam);
                currentParam.description = buffer;
                //console.log(currentParam);
                current.addParameter(currentParam);
                currentParam = null;
              }
            }

             buffer = '';
             captureText = false;

          }
      }
  }, {decodeEntities: true});

  parser.write(html);
  parser.end();

  console.log(JSON.stringify(filters, null, 4));
  console.log('Filters found: ' + filters.length);
  callback(null, filters);
}

function parseParamName(text) {
  let names = text.split(',');
  names = names.map(item => item.trim());
  return {
    main: names.shift(),
    aliases: names
  }
}

module.exports.load = load;
