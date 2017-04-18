const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the dcshift function.
 *
 *
 * @example
 *  ffmpeg().dcshift()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the dcshift function.
 */
function dcshift(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'dcshift', function() {
    return new DcshiftFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class DcshiftFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    DcshiftFilter.prototype.withShift = this.shift;
    DcshiftFilter.prototype.withLimitergain = this.limitergain;
  }

  /**
   * Set the DC shift, allowed range is [-1, 1]. It indicates the amount to shift
   * the audio.
   * 
   * 
   * @param val
   */
  shift(val) {
    this._shift = val;
    return this;
  }

  /**
   * Optional. It should have a value much less than 1 (e.g. 0.05 or 0.02) and is
   * used to prevent clipping.
   * 
   * @param val
   */
  limitergain(val) {
    this._limitergain = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._shift) {
      opt['shift'] = this._shift;
    }
    if (this._limitergain) {
      opt['limitergain'] = this._limitergain;
    }

    addFilter(this.ffmpeg, {
      filter: 'dcshift',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.dcshift = dcshift;
