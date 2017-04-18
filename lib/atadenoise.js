const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the atadenoise function.
 *
 *
 * @example
 *  ffmpeg().atadenoise()
 *    ...             // call filter configuration functions
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
    AtadenoiseFilter.prototype.with_0a = this._0a;
    AtadenoiseFilter.prototype.with_0b = this._0b;
    AtadenoiseFilter.prototype.with_1a = this._1a;
    AtadenoiseFilter.prototype.with_1b = this._1b;
    AtadenoiseFilter.prototype.with_2a = this._2a;
    AtadenoiseFilter.prototype.with_2b = this._2b;
    AtadenoiseFilter.prototype.withS = this.s;
    AtadenoiseFilter.prototype.withP = this.p;
  }

  /**
   * Set threshold A for 1st plane. Default is 0.02.
   * Valid range is 0 to 0.3.
   * 
   * 
   * @param val
   */
  _0a(val) {
    this.__0a = val;
    return this;
  }

  /**
   * Set threshold B for 1st plane. Default is 0.04.
   * Valid range is 0 to 5.
   * 
   * 
   * @param val
   */
  _0b(val) {
    this.__0b = val;
    return this;
  }

  /**
   * Set threshold A for 2nd plane. Default is 0.02.
   * Valid range is 0 to 0.3.
   * 
   * 
   * @param val
   */
  _1a(val) {
    this.__1a = val;
    return this;
  }

  /**
   * Set threshold B for 2nd plane. Default is 0.04.
   * Valid range is 0 to 5.
   * 
   * 
   * @param val
   */
  _1b(val) {
    this.__1b = val;
    return this;
  }

  /**
   * Set threshold A for 3rd plane. Default is 0.02.
   * Valid range is 0 to 0.3.
   * 
   * 
   * @param val
   */
  _2a(val) {
    this.__2a = val;
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
  _2b(val) {
    this.__2b = val;
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
    this._s = val;
    return this;
  }

  /**
   * Set what planes of frame filter will use for averaging. Default is all.
   * 
   * @param val
   */
  p(val) {
    this._p = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.__0a) {
      opt['0a'] = this.__0a;
    }
    if (this.__0b) {
      opt['0b'] = this.__0b;
    }
    if (this.__1a) {
      opt['1a'] = this.__1a;
    }
    if (this.__1b) {
      opt['1b'] = this.__1b;
    }
    if (this.__2a) {
      opt['2a'] = this.__2a;
    }
    if (this.__2b) {
      opt['2b'] = this.__2b;
    }
    if (this._s) {
      opt['s'] = this._s;
    }
    if (this._p) {
      opt['p'] = this._p;
    }

    addFilter(this.ffmpeg, {
      filter: 'atadenoise',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.atadenoise = atadenoise;
