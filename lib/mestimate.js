const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the mestimate function.
 *
 *
 * @example
 *  ffmpeg().mestimate()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the mestimate function.
 */
function mestimate(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'mestimate', function() {
    return new MestimateFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class MestimateFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    MestimateFilter.prototype.withMethod = this.method;
    MestimateFilter.prototype.withMb_size = this.mb_size;
    MestimateFilter.prototype.withSearch_param = this.search_param;
  }

  /**
   * 
   * @param val
   */
  method(val) {
    this._method = val;
    return this;
  }

  /**
   * Macroblock size. Default 16.
   * 
   * 
   * @param val
   */
  mb_size(val) {
    this._mb_size = val;
    return this;
  }

  /**
   * Search parameter. Default 7.
   * 
   * @param val
   */
  search_param(val) {
    this._search_param = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._method) {
      opt['method'] = this._method;
    }
    if (this._mb_size) {
      opt['mb_size'] = this._mb_size;
    }
    if (this._search_param) {
      opt['search_param'] = this._search_param;
    }

    addFilter(this.ffmpeg, {
      filter: 'mestimate',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.mestimate = mestimate;
