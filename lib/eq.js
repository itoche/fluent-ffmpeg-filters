const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the eq function.
 *
 *
 * @example
 *  ffmpeg().eq()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the eq function.
 */
function eq(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'eq', function() {
    return new EqFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class EqFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    EqFilter.prototype.withContrast = contrast;
    EqFilter.prototype.withBrightness = brightness;
    EqFilter.prototype.withSaturation = saturation;
    EqFilter.prototype.withGamma = gamma;
    EqFilter.prototype.withGamma_r = gamma_r;
    EqFilter.prototype.withGamma_g = gamma_g;
    EqFilter.prototype.withGamma_b = gamma_b;
    EqFilter.prototype.withGamma_weight = gamma_weight;
    EqFilter.prototype.withEval = eval;
  }

  /**
   * Set the contrast expression. The value must be a float value in range
   * -2.0 to 2.0. The default value is &quot;1&quot;.
   * 
   * 
   * @param val
   */
  contrast(val) {
    this.contrast = val;
    return this;
  }

  /**
   * Set the brightness expression. The value must be a float value in
   * range -1.0 to 1.0. The default value is &quot;0&quot;.
   * 
   * 
   * @param val
   */
  brightness(val) {
    this.brightness = val;
    return this;
  }

  /**
   * Set the saturation expression. The value must be a float in
   * range 0.0 to 3.0. The default value is &quot;1&quot;.
   * 
   * 
   * @param val
   */
  saturation(val) {
    this.saturation = val;
    return this;
  }

  /**
   * Set the gamma expression. The value must be a float in range
   * 0.1 to 10.0.  The default value is &quot;1&quot;.
   * 
   * 
   * @param val
   */
  gamma(val) {
    this.gamma = val;
    return this;
  }

  /**
   * Set the gamma expression for red. The value must be a float in
   * range 0.1 to 10.0. The default value is &quot;1&quot;.
   * 
   * 
   * @param val
   */
  gamma_r(val) {
    this.gamma_r = val;
    return this;
  }

  /**
   * Set the gamma expression for green. The value must be a float in range
   * 0.1 to 10.0. The default value is &quot;1&quot;.
   * 
   * 
   * @param val
   */
  gamma_g(val) {
    this.gamma_g = val;
    return this;
  }

  /**
   * Set the gamma expression for blue. The value must be a float in range
   * 0.1 to 10.0. The default value is &quot;1&quot;.
   * 
   * 
   * @param val
   */
  gamma_b(val) {
    this.gamma_b = val;
    return this;
  }

  /**
   * Set the gamma weight expression. It can be used to reduce the effect
   * of a high gamma value on bright image areas, e.g. keep them from
   * getting overamplified and just plain white. The value must be a float
   * in range 0.0 to 1.0. A value of 0.0 turns the
   * gamma correction all the way down while 1.0 leaves it at its
   * full strength. Default is &quot;1&quot;.
   * 
   * 
   * @param val
   */
  gamma_weight(val) {
    this.gamma_weight = val;
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
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.contrast) {
      opt['contrast'] = this.contrast;
    }
    if (this.brightness) {
      opt['brightness'] = this.brightness;
    }
    if (this.saturation) {
      opt['saturation'] = this.saturation;
    }
    if (this.gamma) {
      opt['gamma'] = this.gamma;
    }
    if (this.gamma_r) {
      opt['gamma_r'] = this.gamma_r;
    }
    if (this.gamma_g) {
      opt['gamma_g'] = this.gamma_g;
    }
    if (this.gamma_b) {
      opt['gamma_b'] = this.gamma_b;
    }
    if (this.gamma_weight) {
      opt['gamma_weight'] = this.gamma_weight;
    }
    if (this.eval) {
      opt['eval'] = this.eval;
    }

    addFilter(this.ffmpeg, {
      filter: 'eq',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.eq = eq;
