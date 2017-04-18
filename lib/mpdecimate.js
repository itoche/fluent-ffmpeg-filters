const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the mpdecimate function.
 *
 *
 * @example
 *  ffmpeg().mpdecimate()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the mpdecimate function.
 */
function mpdecimate(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'mpdecimate', function() {
    return new MpdecimateFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class MpdecimateFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    MpdecimateFilter.prototype.withMax = this.max;
    MpdecimateFilter.prototype.withHi = this.hi;
    MpdecimateFilter.prototype.withLo = this.lo;
    MpdecimateFilter.prototype.withFrac = this.frac;
  }

  /**
   * Set the maximum number of consecutive frames which can be dropped (if
   * positive), or the minimum interval between dropped frames (if
   * negative). If the value is 0, the frame is dropped unregarding the
   * number of previous sequentially dropped frames.
   * 
   * Default value is 0.
   * 
   * 
   * @param val
   */
  max(val) {
    this._max = val;
    return this;
  }

  /**
   * Set the dropping threshold values.
   * 
   * Values for hi and lo are for 8x8 pixel blocks and
   * represent actual pixel value differences, so a threshold of 64
   * corresponds to 1 unit of difference for each pixel, or the same spread
   * out differently over the block.
   * 
   * A frame is a candidate for dropping if no 8x8 blocks differ by more
   * than a threshold of hi, and if no more than frac blocks (1
   * meaning the whole image) differ by more than a threshold of lo.
   * 
   * Default value for hi is 64*12, default value for lo is
   * 64*5, and default value for frac is 0.33.
   * 
   * @param val
   */
  hi(val) {
    this._hi = val;
    return this;
  }

  /**
   * Set the dropping threshold values.
   * 
   * Values for hi and lo are for 8x8 pixel blocks and
   * represent actual pixel value differences, so a threshold of 64
   * corresponds to 1 unit of difference for each pixel, or the same spread
   * out differently over the block.
   * 
   * A frame is a candidate for dropping if no 8x8 blocks differ by more
   * than a threshold of hi, and if no more than frac blocks (1
   * meaning the whole image) differ by more than a threshold of lo.
   * 
   * Default value for hi is 64*12, default value for lo is
   * 64*5, and default value for frac is 0.33.
   * 
   * @param val
   */
  lo(val) {
    this._lo = val;
    return this;
  }

  /**
   * Set the dropping threshold values.
   * 
   * Values for hi and lo are for 8x8 pixel blocks and
   * represent actual pixel value differences, so a threshold of 64
   * corresponds to 1 unit of difference for each pixel, or the same spread
   * out differently over the block.
   * 
   * A frame is a candidate for dropping if no 8x8 blocks differ by more
   * than a threshold of hi, and if no more than frac blocks (1
   * meaning the whole image) differ by more than a threshold of lo.
   * 
   * Default value for hi is 64*12, default value for lo is
   * 64*5, and default value for frac is 0.33.
   * 
   * @param val
   */
  frac(val) {
    this._frac = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._max) {
      opt['max'] = this._max;
    }
    if (this._hi) {
      opt['hi'] = this._hi;
    }
    if (this._lo) {
      opt['lo'] = this._lo;
    }
    if (this._frac) {
      opt['frac'] = this._frac;
    }

    addFilter(this.ffmpeg, {
      filter: 'mpdecimate',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.mpdecimate = mpdecimate;
