const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the stereowiden function.
 *
 *
 * @example
 *  ffmpeg().stereowiden()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the stereowiden function.
 */
function stereowiden(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'stereowiden', function() {
    return new StereowidenFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class StereowidenFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    StereowidenFilter.prototype.withDelay = this.delay;
    StereowidenFilter.prototype.withFeedback = this.feedback;
    StereowidenFilter.prototype.withCrossfeed = this.crossfeed;
    StereowidenFilter.prototype.withDrymix = this.drymix;
  }

  /**
   * Time in milliseconds of the delay of left signal into right and vice versa.
   * Default is 20 milliseconds.
   * 
   * 
   * @param val
   */
  delay(val) {
    this.delay = val;
    return this;
  }

  /**
   * Amount of gain in delayed signal into right and vice versa. Gives a delay
   * effect of left signal in right output and vice versa which gives widening
   * effect. Default is 0.3.
   * 
   * 
   * @param val
   */
  feedback(val) {
    this.feedback = val;
    return this;
  }

  /**
   * Cross feed of left into right with inverted phase. This helps in suppressing
   * the mono. If the value is 1 it will cancel all the signal common to both
   * channels. Default is 0.3.
   * 
   * 
   * @param val
   */
  crossfeed(val) {
    this.crossfeed = val;
    return this;
  }

  /**
   * Set level of input signal of original channel. Default is 0.8.
   * 
   * @param val
   */
  drymix(val) {
    this.drymix = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.delay) {
      opt['delay'] = this.delay;
    }
    if (this.feedback) {
      opt['feedback'] = this.feedback;
    }
    if (this.crossfeed) {
      opt['crossfeed'] = this.crossfeed;
    }
    if (this.drymix) {
      opt['drymix'] = this.drymix;
    }

    addFilter(this.ffmpeg, {
      filter: 'stereowiden',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.stereowiden = stereowiden;
