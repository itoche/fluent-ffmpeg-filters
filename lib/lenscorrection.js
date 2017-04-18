const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the lenscorrection function.
 *
 *
 * @example
 *  ffmpeg().lenscorrection()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the lenscorrection function.
 */
function lenscorrection(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'lenscorrection', function() {
    return new LenscorrectionFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class LenscorrectionFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    LenscorrectionFilter.prototype.withCx = this.cx;
    LenscorrectionFilter.prototype.withCy = this.cy;
    LenscorrectionFilter.prototype.withK1 = this.k1;
    LenscorrectionFilter.prototype.withK2 = this.k2;
  }

  /**
   * Relative x-coordinate of the focal point of the image, and thereby the center of the
   * distortion. This value has a range [0,1] and is expressed as fractions of the image
   * width.
   * 
   * @param val
   */
  cx(val) {
    this._cx = val;
    return this;
  }

  /**
   * Relative y-coordinate of the focal point of the image, and thereby the center of the
   * distortion. This value has a range [0,1] and is expressed as fractions of the image
   * height.
   * 
   * @param val
   */
  cy(val) {
    this._cy = val;
    return this;
  }

  /**
   * Coefficient of the quadratic correction term. 0.5 means no correction.
   * 
   * @param val
   */
  k1(val) {
    this._k1 = val;
    return this;
  }

  /**
   * Coefficient of the double quadratic correction term. 0.5 means no correction.
   * 
   * @param val
   */
  k2(val) {
    this._k2 = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._cx) {
      opt['cx'] = this._cx;
    }
    if (this._cy) {
      opt['cy'] = this._cy;
    }
    if (this._k1) {
      opt['k1'] = this._k1;
    }
    if (this._k2) {
      opt['k2'] = this._k2;
    }

    addFilter(this.ffmpeg, {
      filter: 'lenscorrection',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.lenscorrection = lenscorrection;
