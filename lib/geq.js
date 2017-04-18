const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the geq function.
 *
 *
 * @example
 *  ffmpeg().geq()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the geq function.
 */
function geq(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'geq', function() {
    return new GeqFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class GeqFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    GeqFilter.prototype.withLum_expr = this.lum_expr;
    GeqFilter.prototype.withCb_expr = this.cb_expr;
    GeqFilter.prototype.withCr_expr = this.cr_expr;
    GeqFilter.prototype.withAlpha_expr = this.alpha_expr;
    GeqFilter.prototype.withRed_expr = this.red_expr;
    GeqFilter.prototype.withGreen_expr = this.green_expr;
    GeqFilter.prototype.withBlue_expr = this.blue_expr;
  }

  /**
   * Set the luminance expression.
   * 
   * @param val
   */
  lum_expr(val) {
    this._lum_expr = val;
    return this;
  }

  /**
   * Set the chrominance blue expression.
   * 
   * @param val
   */
  cb_expr(val) {
    this._cb_expr = val;
    return this;
  }

  /**
   * Set the chrominance red expression.
   * 
   * @param val
   */
  cr_expr(val) {
    this._cr_expr = val;
    return this;
  }

  /**
   * Set the alpha expression.
   * 
   * @param val
   */
  alpha_expr(val) {
    this._alpha_expr = val;
    return this;
  }

  /**
   * Set the red expression.
   * 
   * @param val
   */
  red_expr(val) {
    this._red_expr = val;
    return this;
  }

  /**
   * Set the green expression.
   * 
   * @param val
   */
  green_expr(val) {
    this._green_expr = val;
    return this;
  }

  /**
   * Set the blue expression.
   * 
   * @param val
   */
  blue_expr(val) {
    this._blue_expr = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._lum_expr) {
      opt['lum_expr'] = this._lum_expr;
    }
    if (this._cb_expr) {
      opt['cb_expr'] = this._cb_expr;
    }
    if (this._cr_expr) {
      opt['cr_expr'] = this._cr_expr;
    }
    if (this._alpha_expr) {
      opt['alpha_expr'] = this._alpha_expr;
    }
    if (this._red_expr) {
      opt['red_expr'] = this._red_expr;
    }
    if (this._green_expr) {
      opt['green_expr'] = this._green_expr;
    }
    if (this._blue_expr) {
      opt['blue_expr'] = this._blue_expr;
    }

    addFilter(this.ffmpeg, {
      filter: 'geq',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.geq = geq;
