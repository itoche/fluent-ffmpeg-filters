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
    FlangerFilter.prototype.withDelay = delay;
    FlangerFilter.prototype.withDepth = depth;
    FlangerFilter.prototype.withRegen = regen;
    FlangerFilter.prototype.withWidth = width;
    FlangerFilter.prototype.withSpeed = speed;
    FlangerFilter.prototype.withShape = shape;
    FlangerFilter.prototype.withPhase = phase;
    FlangerFilter.prototype.withInterp = interp;
  }

  /**
   * Set base delay in milliseconds. Range from 0 to 30. Default value is 0.
   * 
   * 
   * @param val
   */
  delay(val) {
    this.delay = val;
    return this;
  }

  /**
   * Set added swep delay in milliseconds. Range from 0 to 10. Default value is 2.
   * 
   * 
   * @param val
   */
  depth(val) {
    this.depth = val;
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
    this.regen = val;
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
    this.width = val;
    return this;
  }

  /**
   * Set sweeps per second (Hz). Range from 0.1 to 10. Default value is 0.5.
   * 
   * 
   * @param val
   */
  speed(val) {
    this.speed = val;
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
    this.shape = val;
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
    this.phase = val;
    return this;
  }

  /**
   * Set delay-line interpolation, linear or quadratic.
   * Default is linear.
   * 
   * @param val
   */
  interp(val) {
    this.interp = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.delay) {
      opt['delay'] = this.delay;
    }
    if (this.depth) {
      opt['depth'] = this.depth;
    }
    if (this.regen) {
      opt['regen'] = this.regen;
    }
    if (this.width) {
      opt['width'] = this.width;
    }
    if (this.speed) {
      opt['speed'] = this.speed;
    }
    if (this.shape) {
      opt['shape'] = this.shape;
    }
    if (this.phase) {
      opt['phase'] = this.phase;
    }
    if (this.interp) {
      opt['interp'] = this.interp;
    }

    addFilter(this.ffmpeg, {
      filter: 'flanger',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.flanger = flanger;
