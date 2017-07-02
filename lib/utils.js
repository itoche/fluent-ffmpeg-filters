const assert = require('assert');
/**
 * Name of the property that is added to the ffmpeg instance and which will
 * holds the list of filters that are to be applied.
 * @type {String}
 * @static
 */
const FILTERS_ARR_NAME = '_fluent-ffmpeg-filters';

/**
 * Augment the ffmpegCommand with the filterFunc function having the name
 * filterName.
 * @param  {FfmpegCommand} ffmpegCommand [description]
 * @param  {String} filterName    The name of the function
 * @param  {Function} filterFunc    The function to add
 *
 */
function registerFilter(ffmpegCommand, filterName, filterFunc) {
  assert(ffmpegCommand);
  assert(filterName);
  assert(filterFunc);

  ffmpegCommand.prototype[filterName] = filterFunc;

  if (!ffmpegCommand.prototype.applyVideoFilters) {
      ffmpegCommand.prototype.applyVideoFilters = function() {
        this.videoFilters(getFilters(this));
        return this;
      };
  }

  if (!ffmpegCommand.prototype.applyAudioFilters) {
      ffmpegCommand.prototype.applyAudioFilters = function() {
        this.audioFilters(getFilters(this));
        return this;
      };
  }

  if (!ffmpegCommand.prototype.applyComplexFilter) {
      ffmpegCommand.prototype.applyComplexFilter = function() {
        this.complexFilter(getFilters(this));
        return this;
      };
  }
}
/**
 * Register a filter configuration in the ffmpeg instance.
 * @param {FfmpegCommand} ffmpeg    The ffmpeg instance.
 * @param {Object} filterObj The configuration of a ffmpeg filter.
 */
function addFilter(ffmpeg, filterObj) {
  assert(ffmpeg);
  assert(filterObj);
  assert(filterObj.filter);

  const filters = getFilters(ffmpeg);
  filters.push(filterObj);
}

/**
 * Returns the array of filter configurations registered in the ffmpeg instance.
 * @param  {FfmpegCommand} ffmpeg The ffmpeg instance.
 * @return {Object[]} the array of filter configurations registered in the ffmpeg instance.
 */
function getFilters(ffmpeg) {

  if (!ffmpeg[FILTERS_ARR_NAME]) {
      ffmpeg[FILTERS_ARR_NAME] = [];
  }

  return ffmpeg[FILTERS_ARR_NAME];
}

module.exports.addFilter = addFilter;
module.exports.registerFilter = registerFilter;
module.exports.getFilters = getFilters;
