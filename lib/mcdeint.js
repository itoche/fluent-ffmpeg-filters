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
    McdeintFilter.prototype.withMode = this.mode;
    McdeintFilter.prototype.withParity = this.parity;
    McdeintFilter.prototype.withQp = this.qp;
  }

  /**
   * 
   * @param val
   */
  mode(val) {
    this._mode = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  parity(val) {
    this._parity = val;
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
    this._qp = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._mode) {
      opt['mode'] = this._mode;
    }
    if (this._parity) {
      opt['parity'] = this._parity;
    }
    if (this._qp) {
      opt['qp'] = this._qp;
    }

    addFilter(this.ffmpeg, {
      filter: 'mcdeint',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.mcdeint = mcdeint;
