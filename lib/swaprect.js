const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the swaprect function.
 *
 *
 * @example
 *  ffmpeg().swaprect()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the swaprect function.
 */
function swaprect(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'swaprect', function() {
    return new SwaprectFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class SwaprectFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    SwaprectFilter.prototype.withW = this.w;
    SwaprectFilter.prototype.withH = this.h;
    SwaprectFilter.prototype.withX1 = this.x1;
    SwaprectFilter.prototype.withY1 = this.y1;
    SwaprectFilter.prototype.withX2 = this.x2;
    SwaprectFilter.prototype.withY2 = this.y2;
  }

  /**
   * Set object width.
   * 
   * 
   * @param val
   */
  w(val) {
    this._w = val;
    return this;
  }

  /**
   * Set object height.
   * 
   * 
   * @param val
   */
  h(val) {
    this._h = val;
    return this;
  }

  /**
   * Set 1st rect x coordinate.
   * 
   * 
   * @param val
   */
  x1(val) {
    this._x1 = val;
    return this;
  }

  /**
   * Set 1st rect y coordinate.
   * 
   * 
   * @param val
   */
  y1(val) {
    this._y1 = val;
    return this;
  }

  /**
   * Set 2nd rect x coordinate.
   * 
   * 
   * @param val
   */
  x2(val) {
    this._x2 = val;
    return this;
  }

  /**
   * Set 2nd rect y coordinate.
   * 
   * All expressions are evaluated once for each frame.
   * 
   * @param val
   */
  y2(val) {
    this._y2 = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._w) {
      opt['w'] = this._w;
    }
    if (this._h) {
      opt['h'] = this._h;
    }
    if (this._x1) {
      opt['x1'] = this._x1;
    }
    if (this._y1) {
      opt['y1'] = this._y1;
    }
    if (this._x2) {
      opt['x2'] = this._x2;
    }
    if (this._y2) {
      opt['y2'] = this._y2;
    }

    addFilter(this.ffmpeg, {
      filter: 'swaprect',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.swaprect = swaprect;
