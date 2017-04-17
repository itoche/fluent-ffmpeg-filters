const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the pad function.
 *
 *
 * @example
 *  ffmpeg().pad()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the pad function.
 */
function pad(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'pad', function() {
    return new PadFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class PadFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    PadFilter.prototype.withWidth = this.width;
    PadFilter.prototype.withHeight = this.height;
    PadFilter.prototype.withX = this.x;
    PadFilter.prototype.withY = this.y;
    PadFilter.prototype.withColor = this.color;
    PadFilter.prototype.withEval = this.eval;
    PadFilter.prototype.withAspect = this.aspect;
  }

  /**
   * Specify an expression for the size of the output image with the
   * paddings added. If the value for width or height is 0, the
   * corresponding input size is used for the output.
   * 
   * The width expression can reference the value set by the
   * height expression, and vice versa.
   * 
   * The default value of width and height is 0.
   * 
   * 
   * @param val
   */
  width(val) {
    this.width = val;
    return this;
  }

  /**
   * Specify an expression for the size of the output image with the
   * paddings added. If the value for width or height is 0, the
   * corresponding input size is used for the output.
   * 
   * The width expression can reference the value set by the
   * height expression, and vice versa.
   * 
   * The default value of width and height is 0.
   * 
   * 
   * @param val
   */
  height(val) {
    this.height = val;
    return this;
  }

  /**
   * Specify the offsets to place the input image at within the padded area,
   * with respect to the top/left border of the output image.
   * 
   * The x expression can reference the value set by the y
   * expression, and vice versa.
   * 
   * The default value of x and y is 0.
   * 
   * If x or y evaluate to a negative number, they’ll be changed
   * so the input image is centered on the padded area.
   * 
   * 
   * @param val
   */
  x(val) {
    this.x = val;
    return this;
  }

  /**
   * Specify the offsets to place the input image at within the padded area,
   * with respect to the top/left border of the output image.
   * 
   * The x expression can reference the value set by the y
   * expression, and vice versa.
   * 
   * The default value of x and y is 0.
   * 
   * If x or y evaluate to a negative number, they’ll be changed
   * so the input image is centered on the padded area.
   * 
   * 
   * @param val
   */
  y(val) {
    this.y = val;
    return this;
  }

  /**
   * Specify the color of the padded area. For the syntax of this option,
   * check the &quot;Color&quot; section in the ffmpeg-utils manual.
   * 
   * The default value of color is &quot;black&quot;.
   * 
   * 
   * @param val
   */
  color(val) {
    this.color = val;
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
   * Pad to aspect instead to a resolution.
   * 
   * 
   * @param val
   */
  aspect(val) {
    this.aspect = val;
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
    if (this.x) {
      opt['x'] = this.x;
    }
    if (this.y) {
      opt['y'] = this.y;
    }
    if (this.color) {
      opt['color'] = this.color;
    }
    if (this.eval) {
      opt['eval'] = this.eval;
    }
    if (this.aspect) {
      opt['aspect'] = this.aspect;
    }

    addFilter(this.ffmpeg, {
      filter: 'pad',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.pad = pad;
