const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the vibrato function.
 *
 *
 * @example
 *  ffmpeg().vibrato()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the vibrato function.
 */
function vibrato(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'vibrato', function() {
    return new VibratoFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class VibratoFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    VibratoFilter.prototype.withF = this.f;
    VibratoFilter.prototype.withD = this.d;
  }

  /**
   * Modulation frequency in Hertz.
   * Range is 0.1 - 20000.0. Default value is 5.0 Hz.
   * 
   * 
   * @param val
   */
  f(val) {
    this._f = val;
    return this;
  }

  /**
   * Depth of modulation as a percentage. Range is 0.0 - 1.0.
   * Default value is 0.5.
   * 
   * @param val
   */
  d(val) {
    this._d = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._f) {
      opt['f'] = this._f;
    }
    if (this._d) {
      opt['d'] = this._d;
    }

    addFilter(this.ffmpeg, {
      filter: 'vibrato',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.vibrato = vibrato;
