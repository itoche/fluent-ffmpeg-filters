const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the random function.
 *
 *
 * @example
 *  ffmpeg().random()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the random function.
 */
function random(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'random', function() {
    return new RandomFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class RandomFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    RandomFilter.prototype.withFrames = this.frames;
    RandomFilter.prototype.withSeed = this.seed;
  }

  /**
   * Set size in number of frames of internal cache, in range from 2 to
   * 512. Default is 30.
   * 
   * 
   * @param val
   */
  frames(val) {
    this.frames = val;
    return this;
  }

  /**
   * Set seed for random number generator, must be an integer included between
   * 0 and UINT32_MAX. If not specified, or if explicitly set to
   * less than 0, the filter will try to use a good random seed on a
   * best effort basis.
   * 
   * @param val
   */
  seed(val) {
    this.seed = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.frames) {
      opt['frames'] = this.frames;
    }
    if (this.seed) {
      opt['seed'] = this.seed;
    }

    addFilter(this.ffmpeg, {
      filter: 'random',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.random = random;
