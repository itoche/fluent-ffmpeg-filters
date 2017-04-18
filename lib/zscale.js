const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the zscale function.
 *
 *
 * @example
 *  ffmpeg().zscale()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the zscale function.
 */
function zscale(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'zscale', function() {
    return new ZscaleFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ZscaleFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    ZscaleFilter.prototype.withWidth = this.width;
    ZscaleFilter.prototype.withHeight = this.height;
    ZscaleFilter.prototype.withSize = this.size;
    ZscaleFilter.prototype.withDither = this.dither;
    ZscaleFilter.prototype.withFilter = this.filter;
    ZscaleFilter.prototype.withRange = this.range;
    ZscaleFilter.prototype.withPrimaries = this.primaries;
    ZscaleFilter.prototype.withTransfer = this.transfer;
    ZscaleFilter.prototype.withMatrix = this.matrix;
    ZscaleFilter.prototype.withRangein = this.rangein;
    ZscaleFilter.prototype.withPrimariesin = this.primariesin;
    ZscaleFilter.prototype.withTransferin = this.transferin;
    ZscaleFilter.prototype.withMatrixin = this.matrixin;
    ZscaleFilter.prototype.withChromal = this.chromal;
    ZscaleFilter.prototype.withChromalin = this.chromalin;
    ZscaleFilter.prototype.withNpl = this.npl;
  }

  /**
   * Set the output video dimension expression. Default value is the input
   * dimension.
   * 
   * If the width or w is 0, the input width is used for the output.
   * If the height or h is 0, the input height is used for the output.
   * 
   * If one of the values is -1, the zscale filter will use a value that
   * maintains the aspect ratio of the input image, calculated from the
   * other specified dimension. If both of them are -1, the input size is
   * used
   * 
   * If one of the values is -n with n &gt; 1, the zscale filter will also use a value
   * that maintains the aspect ratio of the input image, calculated from the other
   * specified dimension. After that it will, however, make sure that the calculated
   * dimension is divisible by n and adjust the value if necessary.
   * 
   * See below for the list of accepted constants for use in the dimension
   * expression.
   * 
   * 
   * @param val
   */
  width(val) {
    this._width = val;
    return this;
  }

  /**
   * Set the output video dimension expression. Default value is the input
   * dimension.
   * 
   * If the width or w is 0, the input width is used for the output.
   * If the height or h is 0, the input height is used for the output.
   * 
   * If one of the values is -1, the zscale filter will use a value that
   * maintains the aspect ratio of the input image, calculated from the
   * other specified dimension. If both of them are -1, the input size is
   * used
   * 
   * If one of the values is -n with n &gt; 1, the zscale filter will also use a value
   * that maintains the aspect ratio of the input image, calculated from the other
   * specified dimension. After that it will, however, make sure that the calculated
   * dimension is divisible by n and adjust the value if necessary.
   * 
   * See below for the list of accepted constants for use in the dimension
   * expression.
   * 
   * 
   * @param val
   */
  height(val) {
    this._height = val;
    return this;
  }

  /**
   * Set the video size. For the syntax of this option, check the
   * (ffmpeg-utils)&quot;Video size&quot; section in the ffmpeg-utils manual.
   * 
   * 
   * @param val
   */
  size(val) {
    this._size = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  dither(val) {
    this._dither = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  filter(val) {
    this._filter = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  range(val) {
    this._range = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  primaries(val) {
    this._primaries = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  transfer(val) {
    this._transfer = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  matrix(val) {
    this._matrix = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  rangein(val) {
    this._rangein = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  primariesin(val) {
    this._primariesin = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  transferin(val) {
    this._transferin = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  matrixin(val) {
    this._matrixin = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  chromal(val) {
    this._chromal = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  chromalin(val) {
    this._chromalin = val;
    return this;
  }

  /**
   * Set the nominal peak luminance.
   * 
   * @param val
   */
  npl(val) {
    this._npl = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._width) {
      opt['width'] = this._width;
    }
    if (this._height) {
      opt['height'] = this._height;
    }
    if (this._size) {
      opt['size'] = this._size;
    }
    if (this._dither) {
      opt['dither'] = this._dither;
    }
    if (this._filter) {
      opt['filter'] = this._filter;
    }
    if (this._range) {
      opt['range'] = this._range;
    }
    if (this._primaries) {
      opt['primaries'] = this._primaries;
    }
    if (this._transfer) {
      opt['transfer'] = this._transfer;
    }
    if (this._matrix) {
      opt['matrix'] = this._matrix;
    }
    if (this._rangein) {
      opt['rangein'] = this._rangein;
    }
    if (this._primariesin) {
      opt['primariesin'] = this._primariesin;
    }
    if (this._transferin) {
      opt['transferin'] = this._transferin;
    }
    if (this._matrixin) {
      opt['matrixin'] = this._matrixin;
    }
    if (this._chromal) {
      opt['chromal'] = this._chromal;
    }
    if (this._chromalin) {
      opt['chromalin'] = this._chromalin;
    }
    if (this._npl) {
      opt['npl'] = this._npl;
    }

    addFilter(this.ffmpeg, {
      filter: 'zscale',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.zscale = zscale;
