const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the atadenoise function.
 *
 *
 * @example
 *  ffmpeg().atadenoise()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the atadenoise function.
 */
function atadenoise(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'atadenoise', function() {
    return new AtadenoiseFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AtadenoiseFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Atadenoise.prototype.with0a = 0a;
    Atadenoise.prototype.with0b = 0b;
    Atadenoise.prototype.with1a = 1a;
    Atadenoise.prototype.with1b = 1b;
    Atadenoise.prototype.with2a = 2a;
    Atadenoise.prototype.with2b = 2b;
    Atadenoise.prototype.withS = s;
    Atadenoise.prototype.withP = p;
  }

  /**
   * Set threshold A for 1st plane. Default is 0.02.
   * Valid range is 0 to 0.3.
   * 
   * 
   * @param val
   */
  0a(val) {
    this.0a = val;
    return this;
  }

  /**
   * Set threshold B for 1st plane. Default is 0.04.
   * Valid range is 0 to 5.
   * 
   * 
   * @param val
   */
  0b(val) {
    this.0b = val;
    return this;
  }

  /**
   * Set threshold A for 2nd plane. Default is 0.02.
   * Valid range is 0 to 0.3.
   * 
   * 
   * @param val
   */
  1a(val) {
    this.1a = val;
    return this;
  }

  /**
   * Set threshold B for 2nd plane. Default is 0.04.
   * Valid range is 0 to 5.
   * 
   * 
   * @param val
   */
  1b(val) {
    this.1b = val;
    return this;
  }

  /**
   * Set threshold A for 3rd plane. Default is 0.02.
   * Valid range is 0 to 0.3.
   * 
   * 
   * @param val
   */
  2a(val) {
    this.2a = val;
    return this;
  }

  /**
   * Set threshold B for 3rd plane. Default is 0.04.
   * Valid range is 0 to 5.
   * 
   * Threshold A is designed to react on abrupt changes in the input signal and
   * threshold B is designed to react on continuous changes in the input signal.
   * 
   * 
   * @param val
   */
  2b(val) {
    this.2b = val;
    return this;
  }

  /**
   * Set number of frames filter will use for averaging. Default is 33. Must be odd
   * number in range [5, 129].
   * 
   * 
   * @param val
   */
  s(val) {
    this.s = val;
    return this;
  }

  /**
   * Set what planes of frame filter will use for averaging. Default is all.
   * 
   * @param val
   */
  p(val) {
    this.p = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.0a) {
      opt.0a = this.0a;
    }
    if (this.0b) {
      opt.0b = this.0b;
    }
    if (this.1a) {
      opt.1a = this.1a;
    }
    if (this.1b) {
      opt.1b = this.1b;
    }
    if (this.2a) {
      opt.2a = this.2a;
    }
    if (this.2b) {
      opt.2b = this.2b;
    }
    if (this.s) {
      opt.s = this.s;
    }
    if (this.p) {
      opt.p = this.p;
    }

    addFilter(this.ffmpeg, {
      filter: 'atadenoise',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.atadenoise = atadenoise;
