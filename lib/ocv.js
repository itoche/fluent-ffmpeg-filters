const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the ocv function.
 *
 *
 * @example
 *  ffmpeg().ocv()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the ocv function.
 */
function ocv(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'ocv', function() {
    return new OcvFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class OcvFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    OcvFilter.prototype.withFilter_name = filter_name;
    OcvFilter.prototype.withFilter_params = filter_params;
  }

  /**
   * The name of the libopencv filter to apply.
   * 
   * 
   * @param val
   */
  filter_name(val) {
    this.filter_name = val;
    return this;
  }

  /**
   * The parameters to pass to the libopencv filter. If not specified, the default
   * values are assumed.
   * 
   * 
   * @param val
   */
  filter_params(val) {
    this.filter_params = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.filter_name) {
      opt['filter_name'] = this.filter_name;
    }
    if (this.filter_params) {
      opt['filter_params'] = this.filter_params;
    }

    addFilter(this.ffmpeg, {
      filter: 'ocv',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.ocv = ocv;
