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
    ZscaleFilter.prototype.withHeight = height;
    ZscaleFilter.prototype.withSize = size;
    ZscaleFilter.prototype.withDither = dither;
    ZscaleFilter.prototype.withFilter = filter;
    ZscaleFilter.prototype.withRange = range;
    ZscaleFilter.prototype.withPrimaries = primaries;
    ZscaleFilter.prototype.withTransfer = transfer;
    ZscaleFilter.prototype.withMatrix = matrix;
    ZscaleFilter.prototype.withRangein = rangein;
    ZscaleFilter.prototype.withPrimariesin = primariesin;
    ZscaleFilter.prototype.withTransferin = transferin;
    ZscaleFilter.prototype.withMatrixin = matrixin;
    ZscaleFilter.prototype.withChromal = chromal;
    ZscaleFilter.prototype.withChromalin = chromalin;
    ZscaleFilter.prototype.withNpl = npl;
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
    this.height = val;
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
    this.size = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  dither(val) {
    this.dither = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  filter(val) {
    this.filter = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  range(val) {
    this.range = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  primaries(val) {
    this.primaries = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  transfer(val) {
    this.transfer = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  matrix(val) {
    this.matrix = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  rangein(val) {
    this.rangein = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  primariesin(val) {
    this.primariesin = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  transferin(val) {
    this.transferin = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  matrixin(val) {
    this.matrixin = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  chromal(val) {
    this.chromal = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  chromalin(val) {
    this.chromalin = val;
    return this;
  }

  /**
   * Set the nominal peak luminance.
   * 
   * @param val
   */
  npl(val) {
    this.npl = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.height) {
      opt['height'] = this.height;
    }
    if (this.size) {
      opt['size'] = this.size;
    }
    if (this.dither) {
      opt['dither'] = this.dither;
    }
    if (this.filter) {
      opt['filter'] = this.filter;
    }
    if (this.range) {
      opt['range'] = this.range;
    }
    if (this.primaries) {
      opt['primaries'] = this.primaries;
    }
    if (this.transfer) {
      opt['transfer'] = this.transfer;
    }
    if (this.matrix) {
      opt['matrix'] = this.matrix;
    }
    if (this.rangein) {
      opt['rangein'] = this.rangein;
    }
    if (this.primariesin) {
      opt['primariesin'] = this.primariesin;
    }
    if (this.transferin) {
      opt['transferin'] = this.transferin;
    }
    if (this.matrixin) {
      opt['matrixin'] = this.matrixin;
    }
    if (this.chromal) {
      opt['chromal'] = this.chromal;
    }
    if (this.chromalin) {
      opt['chromalin'] = this.chromalin;
    }
    if (this.npl) {
      opt['npl'] = this.npl;
    }

    addFilter(this.ffmpeg, {
      filter: 'zscale',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.zscale = zscale;
