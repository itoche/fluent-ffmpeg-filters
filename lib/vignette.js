const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the vignette function.
 *
 *
 * @example
 *  ffmpeg().vignette()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the vignette function.
 */
function vignette(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'vignette', function() {
    return new VignetteFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class VignetteFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    VignetteFilter.prototype.withAngle = this.angle;
    VignetteFilter.prototype.withX0 = this.x0;
    VignetteFilter.prototype.withY0 = this.y0;
    VignetteFilter.prototype.withMode = this.mode;
    VignetteFilter.prototype.withEval = this.eval;
    VignetteFilter.prototype.withDither = this.dither;
    VignetteFilter.prototype.withAspect = this.aspect;
  }

  /**
   * Set lens angle expression as a number of radians.
   * 
   * The value is clipped in the [0,PI/2] range.
   * 
   * Default value: &quot;PI/5&quot;
   * 
   * 
   * @param val
   */
  angle(val) {
    this.angle = val;
    return this;
  }

  /**
   * Set center coordinates expressions. Respectively &quot;w/2&quot; and &quot;h/2&quot;
   * by default.
   * 
   * 
   * @param val
   */
  y0(val) {
    this.y0 = val;
    return this;
  }

  /**
   * Set center coordinates expressions. Respectively &quot;w/2&quot; and &quot;h/2&quot;
   * by default.
   * 
   * 
   * @param val
   */
  y0(val) {
    this.y0 = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  mode(val) {
    this.mode = val;
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
   * Set dithering to reduce the circular banding effects. Default is 1
   * (enabled).
   * 
   * 
   * @param val
   */
  dither(val) {
    this.dither = val;
    return this;
  }

  /**
   * Set vignette aspect. This setting allows one to adjust the shape of the vignette.
   * Setting this value to the SAR of the input will make a rectangular vignetting
   * following the dimensions of the video.
   * 
   * Default is 1/1.
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
    if (this.angle) {
      opt['angle'] = this.angle;
    }
    if (this.x0) {
      opt['x0'] = this.x0;
    }
    if (this.y0) {
      opt['y0'] = this.y0;
    }
    if (this.mode) {
      opt['mode'] = this.mode;
    }
    if (this.eval) {
      opt['eval'] = this.eval;
    }
    if (this.dither) {
      opt['dither'] = this.dither;
    }
    if (this.aspect) {
      opt['aspect'] = this.aspect;
    }

    addFilter(this.ffmpeg, {
      filter: 'vignette',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.vignette = vignette;
