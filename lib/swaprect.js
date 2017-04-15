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
    Swaprect.prototype.withW = w;
    Swaprect.prototype.withH = h;
    Swaprect.prototype.withX1 = x1;
    Swaprect.prototype.withY1 = y1;
    Swaprect.prototype.withX2 = x2;
    Swaprect.prototype.withY2 = y2;
  }

  /**
   * Set object width.
   * 
   * 
   * @param val
   */
  w(val) {
    this.w = val;
    return this;
  }

  /**
   * Set object height.
   * 
   * 
   * @param val
   */
  h(val) {
    this.h = val;
    return this;
  }

  /**
   * Set 1st rect x coordinate.
   * 
   * 
   * @param val
   */
  x1(val) {
    this.x1 = val;
    return this;
  }

  /**
   * Set 1st rect y coordinate.
   * 
   * 
   * @param val
   */
  y1(val) {
    this.y1 = val;
    return this;
  }

  /**
   * Set 2nd rect x coordinate.
   * 
   * 
   * @param val
   */
  x2(val) {
    this.x2 = val;
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
    this.y2 = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.w) {
      opt['w'] = this.w;
    }
    if (this.h) {
      opt['h'] = this.h;
    }
    if (this.x1) {
      opt['x1'] = this.x1;
    }
    if (this.y1) {
      opt['y1'] = this.y1;
    }
    if (this.x2) {
      opt['x2'] = this.x2;
    }
    if (this.y2) {
      opt['y2'] = this.y2;
    }

    addFilter(this.ffmpeg, {
      filter: 'swaprect',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.swaprect = swaprect;
