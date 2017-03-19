const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the dctdnoiz function.
 *
 *
 * @example
 *  ffmpeg().dctdnoiz()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the dctdnoiz function.
 */
function dctdnoiz(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'dctdnoiz', function() {
    return new DctdnoizFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class DctdnoizFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Dctdnoiz.prototype.withSigma = sigma;
    Dctdnoiz.prototype.withOverlap = overlap;
    Dctdnoiz.prototype.withExpr = expr;
    Dctdnoiz.prototype.withN = n;
  }

  /**
   * Set the noise sigma constant.
   * 
   * This sigma defines a hard threshold of 3 * sigma; every DCT
   * coefficient (absolute value) below this threshold with be dropped.
   * 
   * If you need a more advanced filtering, see expr.
   * 
   * Default is 0.
   * 
   * 
   * @param val
   */
  sigma(val) {
    this.sigma = val;
    return this;
  }

  /**
   * Set number overlapping pixels for each block. Since the filter can be slow, you
   * may want to reduce this value, at the cost of a less effective filter and the
   * risk of various artefacts.
   * 
   * If the overlapping value doesn’t permit processing the whole input width or
   * height, a warning will be displayed and according borders won’t be denoised.
   * 
   * Default value is blocksize-1, which is the best possible setting.
   * 
   * 
   * @param val
   */
  overlap(val) {
    this.overlap = val;
    return this;
  }

  /**
   * Set the coefficient factor expression.
   * 
   * For each coefficient of a DCT block, this expression will be evaluated as a
   * multiplier value for the coefficient.
   * 
   * If this is option is set, the sigma option will be ignored.
   * 
   * The absolute value of the coefficient can be accessed through the c
   * variable.
   * 
   * 
   * @param val
   */
  expr(val) {
    this.expr = val;
    return this;
  }

  /**
   * Set the blocksize using the number of bits. 1&lt;&lt;n defines the
   * blocksize, which is the width and height of the processed blocks.
   * 
   * The default value is 3 (8x8) and can be raised to 4 for a
   * blocksize of 16x16. Note that changing this setting has huge consequences
   * on the speed processing. Also, a larger block size does not necessarily means a
   * better de-noising.
   * 
   * @param val
   */
  n(val) {
    this.n = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.sigma) {
      opt.sigma = this.sigma;
    }
    if (this.overlap) {
      opt.overlap = this.overlap;
    }
    if (this.expr) {
      opt.expr = this.expr;
    }
    if (this.n) {
      opt.n = this.n;
    }

    addFilter(this.ffmpeg, {
      filter: 'dctdnoiz',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.dctdnoiz = dctdnoiz;
