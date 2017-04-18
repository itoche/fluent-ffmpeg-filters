const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the convolution function.
 *
 *
 * @example
 *  ffmpeg().convolution()
 *    ...             // call filter configuration functions
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
    ConvolutionFilter.prototype.with_0m = this._0m;
    ConvolutionFilter.prototype.with_1m = this._1m;
    ConvolutionFilter.prototype.with_2m = this._2m;
    ConvolutionFilter.prototype.with_3m = this._3m;
    ConvolutionFilter.prototype.with_0rdiv = this._0rdiv;
    ConvolutionFilter.prototype.with_1rdiv = this._1rdiv;
    ConvolutionFilter.prototype.with_2rdiv = this._2rdiv;
    ConvolutionFilter.prototype.with_3rdiv = this._3rdiv;
    ConvolutionFilter.prototype.with_0bias = this._0bias;
    ConvolutionFilter.prototype.with_1bias = this._1bias;
    ConvolutionFilter.prototype.with_2bias = this._2bias;
    ConvolutionFilter.prototype.with_3bias = this._3bias;
  }

  /**
   * Set matrix for each plane.
   * Matrix is sequence of 9 or 25 signed integers.
   * 
   * 
   * @param val
   */
  _0m(val) {
    this.__0m = val;
    return this;
  }

  /**
   * Set matrix for each plane.
   * Matrix is sequence of 9 or 25 signed integers.
   * 
   * 
   * @param val
   */
  _1m(val) {
    this.__1m = val;
    return this;
  }

  /**
   * Set matrix for each plane.
   * Matrix is sequence of 9 or 25 signed integers.
   * 
   * 
   * @param val
   */
  _2m(val) {
    this.__2m = val;
    return this;
  }

  /**
   * Set matrix for each plane.
   * Matrix is sequence of 9 or 25 signed integers.
   * 
   * 
   * @param val
   */
  _3m(val) {
    this.__3m = val;
    return this;
  }

  /**
   * Set multiplier for calculated value for each plane.
   * 
   * 
   * @param val
   */
  _0rdiv(val) {
    this.__0rdiv = val;
    return this;
  }

  /**
   * Set multiplier for calculated value for each plane.
   * 
   * 
   * @param val
   */
  _1rdiv(val) {
    this.__1rdiv = val;
    return this;
  }

  /**
   * Set multiplier for calculated value for each plane.
   * 
   * 
   * @param val
   */
  _2rdiv(val) {
    this.__2rdiv = val;
    return this;
  }

  /**
   * Set multiplier for calculated value for each plane.
   * 
   * 
   * @param val
   */
  _3rdiv(val) {
    this.__3rdiv = val;
    return this;
  }

  /**
   * Set bias for each plane. This value is added to the result of the multiplication.
   * Useful for making the overall image brighter or darker. Default is 0.0.
   * 
   * @param val
   */
  _0bias(val) {
    this.__0bias = val;
    return this;
  }

  /**
   * Set bias for each plane. This value is added to the result of the multiplication.
   * Useful for making the overall image brighter or darker. Default is 0.0.
   * 
   * @param val
   */
  _1bias(val) {
    this.__1bias = val;
    return this;
  }

  /**
   * Set bias for each plane. This value is added to the result of the multiplication.
   * Useful for making the overall image brighter or darker. Default is 0.0.
   * 
   * @param val
   */
  _2bias(val) {
    this.__2bias = val;
    return this;
  }

  /**
   * Set bias for each plane. This value is added to the result of the multiplication.
   * Useful for making the overall image brighter or darker. Default is 0.0.
   * 
   * @param val
   */
  _3bias(val) {
    this.__3bias = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.__0m) {
      opt['0m'] = this.__0m;
    }
    if (this.__1m) {
      opt['1m'] = this.__1m;
    }
    if (this.__2m) {
      opt['2m'] = this.__2m;
    }
    if (this.__3m) {
      opt['3m'] = this.__3m;
    }
    if (this.__0rdiv) {
      opt['0rdiv'] = this.__0rdiv;
    }
    if (this.__1rdiv) {
      opt['1rdiv'] = this.__1rdiv;
    }
    if (this.__2rdiv) {
      opt['2rdiv'] = this.__2rdiv;
    }
    if (this.__3rdiv) {
      opt['3rdiv'] = this.__3rdiv;
    }
    if (this.__0bias) {
      opt['0bias'] = this.__0bias;
    }
    if (this.__1bias) {
      opt['1bias'] = this.__1bias;
    }
    if (this.__2bias) {
      opt['2bias'] = this.__2bias;
    }
    if (this.__3bias) {
      opt['3bias'] = this.__3bias;
    }

    addFilter(this.ffmpeg, {
      filter: 'convolution',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.convolution = convolution;
