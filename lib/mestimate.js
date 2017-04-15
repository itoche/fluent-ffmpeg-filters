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
    MestimateFilter.prototype.withMethod = method;
    MestimateFilter.prototype.withMb_size = mb_size;
    MestimateFilter.prototype.withSearch_param = search_param;
  }

  /**
   * 
   * @param val
   */
  method(val) {
    this.method = val;
    return this;
  }

  /**
   * Macroblock size. Default 16.
   * 
   * 
   * @param val
   */
  mb_size(val) {
    this.mb_size = val;
    return this;
  }

  /**
   * Search parameter. Default 7.
   * 
   * @param val
   */
  search_param(val) {
    this.search_param = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.method) {
      opt['method'] = this.method;
    }
    if (this.mb_size) {
      opt['mb_size'] = this.mb_size;
    }
    if (this.search_param) {
      opt['search_param'] = this.search_param;
    }

    addFilter(this.ffmpeg, {
      filter: 'mestimate',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.mestimate = mestimate;
