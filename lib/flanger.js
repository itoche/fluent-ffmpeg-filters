const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the flanger function.
 *
 *
 * @example
 *  ffmpeg().flanger()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the flanger function.
 */
function flanger(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'flanger', function() {
    return new FlangerFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class FlangerFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    FlangerFilter.prototype.withDelay = this.delay;
    FlangerFilter.prototype.withDepth = this.depth;
    FlangerFilter.prototype.withRegen = this.regen;
    FlangerFilter.prototype.withWidth = this.width;
    FlangerFilter.prototype.withSpeed = this.speed;
    FlangerFilter.prototype.withShape = this.shape;
    FlangerFilter.prototype.withPhase = this.phase;
    FlangerFilter.prototype.withInterp = this.interp;
  }

  /**
   * Set base delay in milliseconds. Range from 0 to 30. Default value is 0.
   * 
   * 
   * @param val
   */
  delay(val) {
    this._delay = val;
    return this;
  }

  /**
   * Set added swep delay in milliseconds. Range from 0 to 10. Default value is 2.
   * 
   * 
   * @param val
   */
  depth(val) {
    this._depth = val;
    return this;
  }

  /**
   * Set percentage regeneration (delayed signal feedback). Range from -95 to 95.
   * Default value is 0.
   * 
   * 
   * @param val
   */
  regen(val) {
    this._regen = val;
    return this;
  }

  /**
   * Set percentage of delayed signal mixed with original. Range from 0 to 100.
   * Default value is 71.
   * 
   * 
   * @param val
   */
  width(val) {
    this._width = val;
    return this;
  }

  /**
   * Set sweeps per second (Hz). Range from 0.1 to 10. Default value is 0.5.
   * 
   * 
   * @param val
   */
  speed(val) {
    this._speed = val;
    return this;
  }

  /**
   * Set swept wave shape, can be triangular or sinusoidal.
   * Default value is sinusoidal.
   * 
   * 
   * @param val
   */
  shape(val) {
    this._shape = val;
    return this;
  }

  /**
   * Set swept wave percentage-shift for multi channel. Range from 0 to 100.
   * Default value is 25.
   * 
   * 
   * @param val
   */
  phase(val) {
    this._phase = val;
    return this;
  }

  /**
   * Set delay-line interpolation, linear or quadratic.
   * Default is linear.
   * 
   * @param val
   */
  interp(val) {
    this._interp = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._delay) {
      opt['delay'] = this._delay;
    }
    if (this._depth) {
      opt['depth'] = this._depth;
    }
    if (this._regen) {
      opt['regen'] = this._regen;
    }
    if (this._width) {
      opt['width'] = this._width;
    }
    if (this._speed) {
      opt['speed'] = this._speed;
    }
    if (this._shape) {
      opt['shape'] = this._shape;
    }
    if (this._phase) {
      opt['phase'] = this._phase;
    }
    if (this._interp) {
      opt['interp'] = this._interp;
    }

    addFilter(this.ffmpeg, {
      filter: 'flanger',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.flanger = flanger;
