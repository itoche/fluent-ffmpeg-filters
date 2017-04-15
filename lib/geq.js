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
    Geq.prototype.withLum_expr = lum_expr;
    Geq.prototype.withCb_expr = cb_expr;
    Geq.prototype.withCr_expr = cr_expr;
    Geq.prototype.withAlpha_expr = alpha_expr;
    Geq.prototype.withRed_expr = red_expr;
    Geq.prototype.withGreen_expr = green_expr;
    Geq.prototype.withBlue_expr = blue_expr;
  }

  /**
   * Set the luminance expression.
   * 
   * @param val
   */
  lum_expr(val) {
    this.lum_expr = val;
    return this;
  }

  /**
   * Set the chrominance blue expression.
   * 
   * @param val
   */
  cb_expr(val) {
    this.cb_expr = val;
    return this;
  }

  /**
   * Set the chrominance red expression.
   * 
   * @param val
   */
  cr_expr(val) {
    this.cr_expr = val;
    return this;
  }

  /**
   * Set the alpha expression.
   * 
   * @param val
   */
  alpha_expr(val) {
    this.alpha_expr = val;
    return this;
  }

  /**
   * Set the red expression.
   * 
   * @param val
   */
  red_expr(val) {
    this.red_expr = val;
    return this;
  }

  /**
   * Set the green expression.
   * 
   * @param val
   */
  green_expr(val) {
    this.green_expr = val;
    return this;
  }

  /**
   * Set the blue expression.
   * 
   * @param val
   */
  blue_expr(val) {
    this.blue_expr = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.lum_expr) {
      opt['lum_expr'] = this.lum_expr;
    }
    if (this.cb_expr) {
      opt['cb_expr'] = this.cb_expr;
    }
    if (this.cr_expr) {
      opt['cr_expr'] = this.cr_expr;
    }
    if (this.alpha_expr) {
      opt['alpha_expr'] = this.alpha_expr;
    }
    if (this.red_expr) {
      opt['red_expr'] = this.red_expr;
    }
    if (this.green_expr) {
      opt['green_expr'] = this.green_expr;
    }
    if (this.blue_expr) {
      opt['blue_expr'] = this.blue_expr;
    }

    addFilter(this.ffmpeg, {
      filter: 'geq',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.geq = geq;
