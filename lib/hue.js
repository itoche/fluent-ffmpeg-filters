const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the hue function.
 *
 *
 * @example
 *  ffmpeg().hue()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the hue function.
 */
function hue(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'hue', function() {
    return new HueFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class HueFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    HueFilter.prototype.withH = this.h;
    HueFilter.prototype.withS = this.s;
    HueFilter.prototype.withH = this.H;
    HueFilter.prototype.withB = this.b;
  }

  /**
   * Specify the hue angle as a number of degrees. It accepts an expression,
   * and defaults to &quot;0&quot;.
   * 
   * 
   * @param val
   */
  h(val) {
    this._h = val;
    return this;
  }

  /**
   * Specify the saturation in the [-10,10] range. It accepts an expression and
   * defaults to &quot;1&quot;.
   * 
   * 
   * @param val
   */
  s(val) {
    this._s = val;
    return this;
  }

  /**
   * Specify the hue angle as a number of radians. It accepts an
   * expression, and defaults to &quot;0&quot;.
   * 
   * 
   * @param val
   */
  H(val) {
    this._H = val;
    return this;
  }

  /**
   * Specify the brightness in the [-10,10] range. It accepts an expression and
   * defaults to &quot;0&quot;.
   * 
   * @param val
   */
  b(val) {
    this._b = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._h) {
      opt['h'] = this._h;
    }
    if (this._s) {
      opt['s'] = this._s;
    }
    if (this._H) {
      opt['H'] = this._H;
    }
    if (this._b) {
      opt['b'] = this._b;
    }

    addFilter(this.ffmpeg, {
      filter: 'hue',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.hue = hue;
