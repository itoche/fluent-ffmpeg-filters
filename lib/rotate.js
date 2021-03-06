const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the rotate function.
 *
 *
 * @example
 *  ffmpeg().rotate()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the rotate function.
 */
function rotate(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'rotate', function() {
    return new RotateFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class RotateFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    RotateFilter.prototype.withAngle = this.angle;
    RotateFilter.prototype.withOut_w = this.out_w;
    RotateFilter.prototype.withOut_h = this.out_h;
    RotateFilter.prototype.withBilinear = this.bilinear;
    RotateFilter.prototype.withFillcolor = this.fillcolor;
  }

  /**
   * Set an expression for the angle by which to rotate the input video
   * clockwise, expressed as a number of radians. A negative value will
   * result in a counter-clockwise rotation. By default it is set to &quot;0&quot;.
   * 
   * This expression is evaluated for each frame.
   * 
   * 
   * @param val
   */
  angle(val) {
    this._angle = val;
    return this;
  }

  /**
   * Set the output width expression, default value is &quot;iw&quot;.
   * This expression is evaluated just once during configuration.
   * 
   * 
   * @param val
   */
  out_w(val) {
    this._out_w = val;
    return this;
  }

  /**
   * Set the output height expression, default value is &quot;ih&quot;.
   * This expression is evaluated just once during configuration.
   * 
   * 
   * @param val
   */
  out_h(val) {
    this._out_h = val;
    return this;
  }

  /**
   * Enable bilinear interpolation if set to 1, a value of 0 disables
   * it. Default value is 1.
   * 
   * 
   * @param val
   */
  bilinear(val) {
    this._bilinear = val;
    return this;
  }

  /**
   * Set the color used to fill the output area not covered by the rotated
   * image. For the general syntax of this option, check the &quot;Color&quot; section in the
   * ffmpeg-utils manual. If the special value &quot;none&quot; is selected then no
   * background is printed (useful for example if the background is never shown).
   * 
   * Default value is &quot;black&quot;.
   * 
   * @param val
   */
  fillcolor(val) {
    this._fillcolor = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._angle) {
      opt['angle'] = this._angle;
    }
    if (this._out_w) {
      opt['out_w'] = this._out_w;
    }
    if (this._out_h) {
      opt['out_h'] = this._out_h;
    }
    if (this._bilinear) {
      opt['bilinear'] = this._bilinear;
    }
    if (this._fillcolor) {
      opt['fillcolor'] = this._fillcolor;
    }

    addFilter(this.ffmpeg, {
      filter: 'rotate',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.rotate = rotate;
