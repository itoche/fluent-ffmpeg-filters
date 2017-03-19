const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the convolution function.
 *
 *
 * @example
 *  ffmpeg().convolution()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the convolution function.
 */
function convolution(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'convolution', function() {
    return new ConvolutionFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ConvolutionFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Convolution.prototype.with3m = 3m;
    Convolution.prototype.with3rdiv = 3rdiv;
    Convolution.prototype.with3bias = 3bias;
  }

  /**
   * Set matrix for each plane.
   * Matrix is sequence of 9 or 25 signed integers.
   * 
   * 
   * @param val
   */
  3m(val) {
    this.3m = val;
    return this;
  }

  /**
   * Set multiplier for calculated value for each plane.
   * 
   * 
   * @param val
   */
  3rdiv(val) {
    this.3rdiv = val;
    return this;
  }

  /**
   * Set bias for each plane. This value is added to the result of the multiplication.
   * Useful for making the overall image brighter or darker. Default is 0.0.
   * 
   * @param val
   */
  3bias(val) {
    this.3bias = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.3m) {
      opt.3m = this.3m;
    }
    if (this.3rdiv) {
      opt.3rdiv = this.3rdiv;
    }
    if (this.3bias) {
      opt.3bias = this.3bias;
    }

    addFilter(this.ffmpeg, {
      filter: 'convolution',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.convolution = convolution;
