const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the maskedclamp function.
 *
 *
 * @example
 *  ffmpeg().maskedclamp()
 *    ...             // call filter configuration functions
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
    MaskedclampFilter.prototype.withUndershoot = this.undershoot;
    MaskedclampFilter.prototype.withOvershoot = this.overshoot;
    MaskedclampFilter.prototype.withPlanes = this.planes;
  }

  /**
   * Default value is 0.
   * 
   * 
   * @param val
   */
  undershoot(val) {
    this._undershoot = val;
    return this;
  }

  /**
   * Default value is 0.
   * 
   * 
   * @param val
   */
  overshoot(val) {
    this._overshoot = val;
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
    this._planes = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._undershoot) {
      opt['undershoot'] = this._undershoot;
    }
    if (this._overshoot) {
      opt['overshoot'] = this._overshoot;
    }
    if (this._planes) {
      opt['planes'] = this._planes;
    }

    addFilter(this.ffmpeg, {
      filter: 'maskedclamp',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.maskedclamp = maskedclamp;
