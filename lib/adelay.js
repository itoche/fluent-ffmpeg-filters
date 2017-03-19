const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the adelay function.
 *
 *
 * @example
 *  ffmpeg().adelay()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the adelay function.
 */
function adelay(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'adelay', function() {
    return new AdelayFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AdelayFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Adelay.prototype.withDelays = delays;
  }

  /**
   * Set list of delays in milliseconds for each channel separated by ’|’.
   * At least one delay greater than 0 should be provided.
   * Unused delays will be silently ignored. If number of given delays is
   * smaller than number of channels all remaining channels will not be delayed.
   * If you want to delay exact number of samples, append ’S’ to number.
   * 
   * @param val
   */
  delays(val) {
    this.delays = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.delays) {
      opt.delays = this.delays;
    }

    addFilter(this.ffmpeg, {
      filter: 'adelay',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.adelay = adelay;
