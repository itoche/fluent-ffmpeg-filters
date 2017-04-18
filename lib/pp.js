const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the pp function.
 *
 *
 * @example
 *  ffmpeg().pp()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the pp function.
 */
function pp(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'pp', function() {
    return new PpFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class PpFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    PpFilter.prototype.withSubfilters = this.subfilters;
  }

  /**
   * Set postprocessing subfilters string.
   * 
   * @param val
   */
  subfilters(val) {
    this._subfilters = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._subfilters) {
      opt['subfilters'] = this._subfilters;
    }

    addFilter(this.ffmpeg, {
      filter: 'pp',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.pp = pp;
