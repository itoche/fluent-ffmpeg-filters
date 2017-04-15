const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the hysteresis function.
 *
 *
 * @example
 *  ffmpeg().hysteresis()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the hysteresis function.
 */
function hysteresis(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'hysteresis', function() {
    return new HysteresisFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class HysteresisFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Hysteresis.prototype.withPlanes = planes;
    Hysteresis.prototype.withThreshold = threshold;
  }

  /**
   * Set which planes will be processed as bitmap, unprocessed planes will be
   * copied from first stream.
   * By default value 0xf, all planes will be processed.
   * 
   * 
   * @param val
   */
  planes(val) {
    this.planes = val;
    return this;
  }

  /**
   * Set threshold which is used in filtering. If pixel component value is higher than
   * this value filter algorithm for connecting components is activated.
   * By default value is 0.
   * 
   * @param val
   */
  threshold(val) {
    this.threshold = val;
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
    if (this.threshold) {
      opt['threshold'] = this.threshold;
    }

    addFilter(this.ffmpeg, {
      filter: 'hysteresis',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.hysteresis = hysteresis;
