const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the yadif function.
 *
 *
 * @example
 *  ffmpeg().yadif()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the yadif function.
 */
function yadif(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'yadif', function() {
    return new YadifFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class YadifFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Yadif.prototype.withMode = mode;
    Yadif.prototype.withParity = parity;
    Yadif.prototype.withDeint = deint;
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
   * 
   * @param val
   */
  parity(val) {
    this.parity = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  deint(val) {
    this.deint = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.mode) {
      opt.mode = this.mode;
    }
    if (this.parity) {
      opt.parity = this.parity;
    }
    if (this.deint) {
      opt.deint = this.deint;
    }

    addFilter(this.ffmpeg, {
      filter: 'yadif',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.yadif = yadif;
