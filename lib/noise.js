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
    Noise.prototype.withC3_seed = c3_seed;
    Noise.prototype.withC3_strength = c3_strength;
    Noise.prototype.withC3_flags = c3_flags;
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
  c3_strength(val) {
    this.c3_strength = val;
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
    if (this.c3_seed) {
      opt['c3_seed'] = this.c3_seed;
    }
    if (this.c3_strength) {
      opt['c3_strength'] = this.c3_strength;
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
