const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the threshold function.
 *
 *
 * @example
 *  ffmpeg().threshold()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the threshold function.
 */
function threshold(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'threshold', function() {
    return new ThresholdFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ThresholdFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    ThresholdFilter.prototype.withPlanes = planes;
  }

  /**
   * Set which planes will be processed, unprocessed planes will be copied.
   * By default value 0xf, all planes will be processed.
   * 
   * @param val
   */
  planes(val) {
    this.planes = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.planes) {
      opt['planes'] = this.planes;
    }

    addFilter(this.ffmpeg, {
      filter: 'threshold',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.threshold = threshold;
