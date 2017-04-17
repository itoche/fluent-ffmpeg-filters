const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the noise function.
 *
 *
 * @example
 *  ffmpeg().noise()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the noise function.
 */
function noise(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'noise', function() {
    return new NoiseFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class NoiseFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    NoiseFilter.prototype.withAll_seed = this.all_seed;
    NoiseFilter.prototype.withC0_seed = this.c0_seed;
    NoiseFilter.prototype.withC1_seed = this.c1_seed;
    NoiseFilter.prototype.withC2_seed = this.c2_seed;
    NoiseFilter.prototype.withC3_seed = this.c3_seed;
    NoiseFilter.prototype.withAll_strength = this.all_strength;
    NoiseFilter.prototype.withC0_strength = this.c0_strength;
    NoiseFilter.prototype.withC1_strength = this.c1_strength;
    NoiseFilter.prototype.withC2_strength = this.c2_strength;
    NoiseFilter.prototype.withC3_strength = this.c3_strength;
    NoiseFilter.prototype.withAll_flags = this.all_flags;
    NoiseFilter.prototype.withC0_flags = this.c0_flags;
    NoiseFilter.prototype.withC1_flags = this.c1_flags;
    NoiseFilter.prototype.withC2_flags = this.c2_flags;
    NoiseFilter.prototype.withC3_flags = this.c3_flags;
  }

  /**
   * Set noise seed for specific pixel component or all pixel components in case
   * of all_seed. Default value is 123457.
   * 
   * 
   * @param val
   */
  all_seed(val) {
    this.all_seed = val;
    return this;
  }

  /**
   * Set noise seed for specific pixel component or all pixel components in case
   * of all_seed. Default value is 123457.
   * 
   * 
   * @param val
   */
  c0_seed(val) {
    this.c0_seed = val;
    return this;
  }

  /**
   * Set noise seed for specific pixel component or all pixel components in case
   * of all_seed. Default value is 123457.
   * 
   * 
   * @param val
   */
  c1_seed(val) {
    this.c1_seed = val;
    return this;
  }

  /**
   * Set noise seed for specific pixel component or all pixel components in case
   * of all_seed. Default value is 123457.
   * 
   * 
   * @param val
   */
  c2_seed(val) {
    this.c2_seed = val;
    return this;
  }

  /**
   * Set noise seed for specific pixel component or all pixel components in case
   * of all_seed. Default value is 123457.
   * 
   * 
   * @param val
   */
  c3_seed(val) {
    this.c3_seed = val;
    return this;
  }

  /**
   * Set noise strength for specific pixel component or all pixel components in case
   * all_strength. Default value is 0. Allowed range is [0, 100].
   * 
   * 
   * @param val
   */
  all_strength(val) {
    this.all_strength = val;
    return this;
  }

  /**
   * Set noise strength for specific pixel component or all pixel components in case
   * all_strength. Default value is 0. Allowed range is [0, 100].
   * 
   * 
   * @param val
   */
  c0_strength(val) {
    this.c0_strength = val;
    return this;
  }

  /**
   * Set noise strength for specific pixel component or all pixel components in case
   * all_strength. Default value is 0. Allowed range is [0, 100].
   * 
   * 
   * @param val
   */
  c1_strength(val) {
    this.c1_strength = val;
    return this;
  }

  /**
   * Set noise strength for specific pixel component or all pixel components in case
   * all_strength. Default value is 0. Allowed range is [0, 100].
   * 
   * 
   * @param val
   */
  c2_strength(val) {
    this.c2_strength = val;
    return this;
  }

  /**
   * Set noise strength for specific pixel component or all pixel components in case
   * all_strength. Default value is 0. Allowed range is [0, 100].
   * 
   * 
   * @param val
   */
  c3_strength(val) {
    this.c3_strength = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  all_flags(val) {
    this.all_flags = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  c0_flags(val) {
    this.c0_flags = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  c1_flags(val) {
    this.c1_flags = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  c2_flags(val) {
    this.c2_flags = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  c3_flags(val) {
    this.c3_flags = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.all_seed) {
      opt['all_seed'] = this.all_seed;
    }
    if (this.c0_seed) {
      opt['c0_seed'] = this.c0_seed;
    }
    if (this.c1_seed) {
      opt['c1_seed'] = this.c1_seed;
    }
    if (this.c2_seed) {
      opt['c2_seed'] = this.c2_seed;
    }
    if (this.c3_seed) {
      opt['c3_seed'] = this.c3_seed;
    }
    if (this.all_strength) {
      opt['all_strength'] = this.all_strength;
    }
    if (this.c0_strength) {
      opt['c0_strength'] = this.c0_strength;
    }
    if (this.c1_strength) {
      opt['c1_strength'] = this.c1_strength;
    }
    if (this.c2_strength) {
      opt['c2_strength'] = this.c2_strength;
    }
    if (this.c3_strength) {
      opt['c3_strength'] = this.c3_strength;
    }
    if (this.all_flags) {
      opt['all_flags'] = this.all_flags;
    }
    if (this.c0_flags) {
      opt['c0_flags'] = this.c0_flags;
    }
    if (this.c1_flags) {
      opt['c1_flags'] = this.c1_flags;
    }
    if (this.c2_flags) {
      opt['c2_flags'] = this.c2_flags;
    }
    if (this.c3_flags) {
      opt['c3_flags'] = this.c3_flags;
    }

    addFilter(this.ffmpeg, {
      filter: 'noise',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.noise = noise;
