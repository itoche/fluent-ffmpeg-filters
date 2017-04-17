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
  _3m(val) {
    this._3m = val;
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
    this._3m = val;
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
    this._3m = val;
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
    this._3m = val;
    return this;
  }

  /**
   * Set multiplier for calculated value for each plane.
   * 
   * 
   * @param val
   */
  _3rdiv(val) {
    this._3rdiv = val;
    return this;
  }

  /**
   * Set multiplier for calculated value for each plane.
   * 
   * 
   * @param val
   */
  _3rdiv(val) {
    this._3rdiv = val;
    return this;
  }

  /**
   * Set multiplier for calculated value for each plane.
   * 
   * 
   * @param val
   */
  _3rdiv(val) {
    this._3rdiv = val;
    return this;
  }

  /**
   * Set multiplier for calculated value for each plane.
   * 
   * 
   * @param val
   */
  _3rdiv(val) {
    this._3rdiv = val;
    return this;
  }

  /**
   * Set bias for each plane. This value is added to the result of the multiplication.
   * Useful for making the overall image brighter or darker. Default is 0.0.
   * 
   * @param val
   */
  _3bias(val) {
    this._3bias = val;
    return this;
  }

  /**
   * Set bias for each plane. This value is added to the result of the multiplication.
   * Useful for making the overall image brighter or darker. Default is 0.0.
   * 
   * @param val
   */
  _3bias(val) {
    this._3bias = val;
    return this;
  }

  /**
   * Set bias for each plane. This value is added to the result of the multiplication.
   * Useful for making the overall image brighter or darker. Default is 0.0.
   * 
   * @param val
   */
  _3bias(val) {
    this._3bias = val;
    return this;
  }

  /**
   * Set bias for each plane. This value is added to the result of the multiplication.
   * Useful for making the overall image brighter or darker. Default is 0.0.
   * 
   * @param val
   */
  _3bias(val) {
    this._3bias = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._0m) {
      opt['0m'] = this._0m;
    }
    if (this._1m) {
      opt['1m'] = this._1m;
    }
    if (this._2m) {
      opt['2m'] = this._2m;
    }
    if (this._3m) {
      opt['3m'] = this._3m;
    }
    if (this._0rdiv) {
      opt['0rdiv'] = this._0rdiv;
    }
    if (this._1rdiv) {
      opt['1rdiv'] = this._1rdiv;
    }
    if (this._2rdiv) {
      opt['2rdiv'] = this._2rdiv;
    }
    if (this._3rdiv) {
      opt['3rdiv'] = this._3rdiv;
    }
    if (this._0bias) {
      opt['0bias'] = this._0bias;
    }
    if (this._1bias) {
      opt['1bias'] = this._1bias;
    }
    if (this._2bias) {
      opt['2bias'] = this._2bias;
    }
    if (this._3bias) {
      opt['3bias'] = this._3bias;
    }

    addFilter(this.ffmpeg, {
      filter: 'convolution',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.convolution = convolution;
