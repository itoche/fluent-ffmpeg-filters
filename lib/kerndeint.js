const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the kerndeint function.
 *
 *
 * @example
 *  ffmpeg().kerndeint()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the kerndeint function.
 */
function kerndeint(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'kerndeint', function() {
    return new KerndeintFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class KerndeintFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Kerndeint.prototype.withThresh = thresh;
    Kerndeint.prototype.withMap = map;
    Kerndeint.prototype.withOrder = order;
    Kerndeint.prototype.withSharp = sharp;
    Kerndeint.prototype.withTwoway = twoway;
  }

  /**
   * Set the threshold which affects the filter’s tolerance when
   * determining if a pixel line must be processed. It must be an integer
   * in the range [0,255] and defaults to 10. A value of 0 will result in
   * applying the process on every pixels.
   * 
   * 
   * @param val
   */
  thresh(val) {
    this.thresh = val;
    return this;
  }

  /**
   * Paint pixels exceeding the threshold value to white if set to 1.
   * Default is 0.
   * 
   * 
   * @param val
   */
  map(val) {
    this.map = val;
    return this;
  }

  /**
   * Set the fields order. Swap fields if set to 1, leave fields alone if
   * 0. Default is 0.
   * 
   * 
   * @param val
   */
  order(val) {
    this.order = val;
    return this;
  }

  /**
   * Enable additional sharpening if set to 1. Default is 0.
   * 
   * 
   * @param val
   */
  sharp(val) {
    this.sharp = val;
    return this;
  }

  /**
   * Enable twoway sharpening if set to 1. Default is 0.
   * 
   * @param val
   */
  twoway(val) {
    this.twoway = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.thresh) {
      opt.thresh = this.thresh;
    }
    if (this.map) {
      opt.map = this.map;
    }
    if (this.order) {
      opt.order = this.order;
    }
    if (this.sharp) {
      opt.sharp = this.sharp;
    }
    if (this.twoway) {
      opt.twoway = this.twoway;
    }

    addFilter(this.ffmpeg, {
      filter: 'kerndeint',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.kerndeint = kerndeint;
