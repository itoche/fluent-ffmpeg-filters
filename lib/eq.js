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
    EqFilter.prototype.withContrast = this.contrast;
    EqFilter.prototype.withBrightness = this.brightness;
    EqFilter.prototype.withSaturation = this.saturation;
    EqFilter.prototype.withGamma = this.gamma;
    EqFilter.prototype.withGamma_r = this.gamma_r;
    EqFilter.prototype.withGamma_g = this.gamma_g;
    EqFilter.prototype.withGamma_b = this.gamma_b;
    EqFilter.prototype.withGamma_weight = this.gamma_weight;
    EqFilter.prototype.withEval = this.eval;
  }

  /**
   * Set the contrast expression. The value must be a float value in range
   * -2.0 to 2.0. The default value is &quot;1&quot;.
   * 
   * 
   * @param val
   */
  contrast(val) {
    this._contrast = val;
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
    this._brightness = val;
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
    this._saturation = val;
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
    this._gamma = val;
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
    this._gamma_r = val;
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
    this._gamma_g = val;
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
    this._gamma_b = val;
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
    this._gamma_weight = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  eval(val) {
    this._eval = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._contrast) {
      opt['contrast'] = this._contrast;
    }
    if (this._brightness) {
      opt['brightness'] = this._brightness;
    }
    if (this._saturation) {
      opt['saturation'] = this._saturation;
    }
    if (this._gamma) {
      opt['gamma'] = this._gamma;
    }
    if (this._gamma_r) {
      opt['gamma_r'] = this._gamma_r;
    }
    if (this._gamma_g) {
      opt['gamma_g'] = this._gamma_g;
    }
    if (this._gamma_b) {
      opt['gamma_b'] = this._gamma_b;
    }
    if (this._gamma_weight) {
      opt['gamma_weight'] = this._gamma_weight;
    }
    if (this._eval) {
      opt['eval'] = this._eval;
    }

    addFilter(this.ffmpeg, {
      filter: 'eq',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.eq = eq;
