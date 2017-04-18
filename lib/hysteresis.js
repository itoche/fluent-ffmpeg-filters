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
    HysteresisFilter.prototype.withPlanes = this.planes;
    HysteresisFilter.prototype.withThreshold = this.threshold;
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
    this._planes = val;
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
    this._threshold = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._planes) {
      opt['planes'] = this._planes;
    }
    if (this._threshold) {
      opt['threshold'] = this._threshold;
    }

    addFilter(this.ffmpeg, {
      filter: 'hysteresis',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.hysteresis = hysteresis;
