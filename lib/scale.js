const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the scale function.
 *
 *
 * @example
 *  ffmpeg().scale()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the scale function.
 */
function scale(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'scale', function() {
    return new ScaleFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ScaleFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    ScaleFilter.prototype.withWidth = this.width;
    ScaleFilter.prototype.withHeight = this.height;
    ScaleFilter.prototype.withEval = this.eval;
    ScaleFilter.prototype.withInterl = this.interl;
    ScaleFilter.prototype.withFlags = this.flags;
    ScaleFilter.prototype.withParam0 = this.param0;
    ScaleFilter.prototype.withSize = this.size;
    ScaleFilter.prototype.withIn_color_matrix = this.in_color_matrix;
    ScaleFilter.prototype.withOut_color_matrix = this.out_color_matrix;
    ScaleFilter.prototype.withIn_range = this.in_range;
    ScaleFilter.prototype.withOut_range = this.out_range;
    ScaleFilter.prototype.withForce_original_aspect_ratio = this.force_original_aspect_ratio;
  }

  /**
   * Set the output video dimension expression. Default value is the input
   * dimension.
   * 
   * If the value is 0, the input width is used for the output.
   * 
   * If one of the values is -1, the scale filter will use a value that
   * maintains the aspect ratio of the input image, calculated from the
   * other specified dimension. If both of them are -1, the input size is
   * used
   * 
   * If one of the values is -n with n &gt; 1, the scale filter will also use a value
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
   * Set the output video dimension expression. Default value is the input
   * dimension.
   * 
   * If the value is 0, the input width is used for the output.
   * 
   * If one of the values is -1, the scale filter will use a value that
   * maintains the aspect ratio of the input image, calculated from the
   * other specified dimension. If both of them are -1, the input size is
   * used
   * 
   * If one of the values is -n with n &gt; 1, the scale filter will also use a value
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
   * 
   * @param val
   */
  eval(val) {
    this.eval = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  interl(val) {
    this.interl = val;
    return this;
  }

  /**
   * Set libswscale scaling flags. See
   * (ffmpeg-scaler)the ffmpeg-scaler manual for the
   * complete list of values. If not explicitly specified the filter applies
   * the default flags.
   * 
   * 
   * 
   * @param val
   */
  flags(val) {
    this.flags = val;
    return this;
  }

  /**
   * Set libswscale input parameters for scaling algorithms that need them. See
   * (ffmpeg-scaler)the ffmpeg-scaler manual for the
   * complete documentation. If not explicitly specified the filter applies
   * empty parameters.
   * 
   * 
   * 
   * 
   * @param val
   */
  param0(val) {
    this.param0 = val;
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
  out_color_matrix(val) {
    this.out_color_matrix = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  out_color_matrix(val) {
    this.out_color_matrix = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  out_range(val) {
    this.out_range = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  out_range(val) {
    this.out_range = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  force_original_aspect_ratio(val) {
    this.force_original_aspect_ratio = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.width) {
      opt['width'] = this.width;
    }
    if (this.height) {
      opt['height'] = this.height;
    }
    if (this.eval) {
      opt['eval'] = this.eval;
    }
    if (this.interl) {
      opt['interl'] = this.interl;
    }
    if (this.flags) {
      opt['flags'] = this.flags;
    }
    if (this.param0) {
      opt['param0'] = this.param0;
    }
    if (this.size) {
      opt['size'] = this.size;
    }
    if (this.in_color_matrix) {
      opt['in_color_matrix'] = this.in_color_matrix;
    }
    if (this.out_color_matrix) {
      opt['out_color_matrix'] = this.out_color_matrix;
    }
    if (this.in_range) {
      opt['in_range'] = this.in_range;
    }
    if (this.out_range) {
      opt['out_range'] = this.out_range;
    }
    if (this.force_original_aspect_ratio) {
      opt['force_original_aspect_ratio'] = this.force_original_aspect_ratio;
    }

    addFilter(this.ffmpeg, {
      filter: 'scale',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.scale = scale;
