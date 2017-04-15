const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the mcdeint function.
 *
 *
 * @example
 *  ffmpeg().mcdeint()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the mcdeint function.
 */
function mcdeint(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'mcdeint', function() {
    return new McdeintFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class McdeintFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Mcdeint.prototype.withMode = mode;
    Mcdeint.prototype.withParity = parity;
    Mcdeint.prototype.withQp = qp;
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
   * Set per-block quantization parameter (QP) used by the internal
   * encoder.
   * 
   * Higher values should result in a smoother motion vector field but less
   * optimal individual vectors. Default value is 1.
   * 
   * @param val
   */
  qp(val) {
    this.qp = val;
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
    if (this.parity) {
      opt['parity'] = this.parity;
    }
    if (this.qp) {
      opt['qp'] = this.qp;
    }

    addFilter(this.ffmpeg, {
      filter: 'mcdeint',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.mcdeint = mcdeint;
