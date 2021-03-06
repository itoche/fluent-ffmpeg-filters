const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the delogo function.
 *
 *
 * @example
 *  ffmpeg().delogo()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the delogo function.
 */
function delogo(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'delogo', function() {
    return new DelogoFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class DelogoFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    DelogoFilter.prototype.withX = this.x;
    DelogoFilter.prototype.withY = this.y;
    DelogoFilter.prototype.withW = this.w;
    DelogoFilter.prototype.withH = this.h;
    DelogoFilter.prototype.withBand = this.band;
    DelogoFilter.prototype.withShow = this.show;
  }

  /**
   * Specify the top left corner coordinates of the logo. They must be
   * specified.
   * 
   * 
   * @param val
   */
  x(val) {
    this._x = val;
    return this;
  }

  /**
   * Specify the top left corner coordinates of the logo. They must be
   * specified.
   * 
   * 
   * @param val
   */
  y(val) {
    this._y = val;
    return this;
  }

  /**
   * Specify the width and height of the logo to clear. They must be
   * specified.
   * 
   * 
   * @param val
   */
  w(val) {
    this._w = val;
    return this;
  }

  /**
   * Specify the width and height of the logo to clear. They must be
   * specified.
   * 
   * 
   * @param val
   */
  h(val) {
    this._h = val;
    return this;
  }

  /**
   * Specify the thickness of the fuzzy edge of the rectangle (added to
   * w and h). The default value is 1. This option is
   * deprecated, setting higher values should no longer be necessary and
   * is not recommended.
   * 
   * 
   * @param val
   */
  band(val) {
    this._band = val;
    return this;
  }

  /**
   * When set to 1, a green rectangle is drawn on the screen to simplify
   * finding the right x, y, w, and h parameters.
   * The default value is 0.
   * 
   * The rectangle is drawn on the outermost pixels which will be (partly)
   * replaced with interpolated values. The values of the next pixels
   * immediately outside this rectangle in each direction will be used to
   * compute the interpolated pixel values inside the rectangle.
   * 
   * 
   * @param val
   */
  show(val) {
    this._show = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._x) {
      opt['x'] = this._x;
    }
    if (this._y) {
      opt['y'] = this._y;
    }
    if (this._w) {
      opt['w'] = this._w;
    }
    if (this._h) {
      opt['h'] = this._h;
    }
    if (this._band) {
      opt['band'] = this._band;
    }
    if (this._show) {
      opt['show'] = this._show;
    }

    addFilter(this.ffmpeg, {
      filter: 'delogo',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.delogo = delogo;
