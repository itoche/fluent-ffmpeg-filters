const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the maskedclamp function.
 *
 *
 * @example
 *  ffmpeg().maskedclamp()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the maskedclamp function.
 */
function maskedclamp(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'maskedclamp', function() {
    return new MaskedclampFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class MaskedclampFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Maskedclamp.prototype.withUndershoot = undershoot;
    Maskedclamp.prototype.withOvershoot = overshoot;
    Maskedclamp.prototype.withPlanes = planes;
  }

  /**
   * Default value is 0.
   * 
   * 
   * @param val
   */
  undershoot(val) {
    this.undershoot = val;
    return this;
  }

  /**
   * Default value is 0.
   * 
   * 
   * @param val
   */
  overshoot(val) {
    this.overshoot = val;
    return this;
  }

  /**
   * Set which planes will be processed as bitmap, unprocessed planes will be
   * copied from first stream.
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
    if (this.undershoot) {
      opt.undershoot = this.undershoot;
    }
    if (this.overshoot) {
      opt.overshoot = this.overshoot;
    }
    if (this.planes) {
      opt.planes = this.planes;
    }

    addFilter(this.ffmpeg, {
      filter: 'maskedclamp',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.maskedclamp = maskedclamp;
