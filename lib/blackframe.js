const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the blackframe function.
 *
 *
 * @example
 *  ffmpeg().blackframe()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the blackframe function.
 */
function blackframe(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'blackframe', function() {
    return new BlackframeFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class BlackframeFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    BlackframeFilter.prototype.withAmount = this.amount;
    BlackframeFilter.prototype.withThreshold = this.threshold;
  }

  /**
   * The percentage of the pixels that have to be below the threshold; it defaults to
   * 98.
   * 
   * 
   * @param val
   */
  amount(val) {
    this._amount = val;
    return this;
  }

  /**
   * The threshold below which a pixel value is considered black; it defaults to
   * 32.
   * 
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
    if (this._amount) {
      opt['amount'] = this._amount;
    }
    if (this._threshold) {
      opt['threshold'] = this._threshold;
    }

    addFilter(this.ffmpeg, {
      filter: 'blackframe',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.blackframe = blackframe;
