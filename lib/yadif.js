const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the yadif function.
 *
 *
 * @example
 *  ffmpeg().yadif()
 *    ...             // call filter configuration functions
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
    YadifFilter.prototype.withMode = this.mode;
    YadifFilter.prototype.withParity = this.parity;
    YadifFilter.prototype.withDeint = this.deint;
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
   * 
   * @param val
   */
  deint(val) {
    this._deint = val;
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
    if (this._deint) {
      opt['deint'] = this._deint;
    }

    addFilter(this.ffmpeg, {
      filter: 'yadif',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.yadif = yadif;
