const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the aperms function.
 *
 *
 * @example
 *  ffmpeg().aperms()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the aperms function.
 */
function aperms(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'aperms', function() {
    return new ApermsFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ApermsFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Aperms.prototype.withMode = mode;
    Aperms.prototype.withSeed = seed;
  }

  /**
   * 
   * @param val
   */
  mode(val) {
    this.mode = val;
    return this;
  }

  /**
   * Set the seed for the random mode, must be an integer included between
   * 0 and UINT32_MAX. If not specified, or if explicitly set to
   * -1, the filter will try to use a good random seed on a best effort
   * basis.
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
    if (this.mode) {
      opt['mode'] = this.mode;
    }
    if (this.seed) {
      opt['seed'] = this.seed;
    }

    addFilter(this.ffmpeg, {
      filter: 'aperms',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.aperms = aperms;
