const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the astreamselect function.
 *
 *
 * @example
 *  ffmpeg().astreamselect()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the astreamselect function.
 */
function astreamselect(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'astreamselect', function() {
    return new AstreamselectFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AstreamselectFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    AstreamselectFilter.prototype.withInputs = this.inputs;
    AstreamselectFilter.prototype.withMap = this.map;
  }

  /**
   * Set number of inputs. Default is 2.
   * 
   * 
   * @param val
   */
  inputs(val) {
    this._inputs = val;
    return this;
  }

  /**
   * Set input indexes to remap to outputs.
   * 
   * @param val
   */
  map(val) {
    this._map = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._inputs) {
      opt['inputs'] = this._inputs;
    }
    if (this._map) {
      opt['map'] = this._map;
    }

    addFilter(this.ffmpeg, {
      filter: 'astreamselect',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.astreamselect = astreamselect;
