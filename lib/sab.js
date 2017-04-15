const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the sab function.
 *
 *
 * @example
 *  ffmpeg().sab()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the sab function.
 */
function sab(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'sab', function() {
    return new SabFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class SabFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    SabFilter.prototype.withLuma_radius = this.luma_radius;
    SabFilter.prototype.withLuma_pre_filter_radius = this.luma_pre_filter_radius;
    SabFilter.prototype.withLuma_strength = this.luma_strength;
    SabFilter.prototype.withChroma_radius = this.chroma_radius;
    SabFilter.prototype.withChroma_pre_filter_radius = this.chroma_pre_filter_radius;
    SabFilter.prototype.withChroma_strength = this.chroma_strength;
  }

  /**
   * Set luma blur filter strength, must be a value in range 0.1-4.0, default
   * value is 1.0. A greater value will result in a more blurred image, and
   * in slower processing.
   * 
   * 
   * @param val
   */
  luma_radius(val) {
    this.luma_radius = val;
    return this;
  }

  /**
   * Set luma pre-filter radius, must be a value in the 0.1-2.0 range, default
   * value is 1.0.
   * 
   * 
   * @param val
   */
  luma_pre_filter_radius(val) {
    this.luma_pre_filter_radius = val;
    return this;
  }

  /**
   * Set luma maximum difference between pixels to still be considered, must
   * be a value in the 0.1-100.0 range, default value is 1.0.
   * 
   * 
   * @param val
   */
  luma_strength(val) {
    this.luma_strength = val;
    return this;
  }

  /**
   * Set chroma blur filter strength, must be a value in range -0.9-4.0. A
   * greater value will result in a more blurred image, and in slower
   * processing.
   * 
   * 
   * @param val
   */
  chroma_radius(val) {
    this.chroma_radius = val;
    return this;
  }

  /**
   * Set chroma pre-filter radius, must be a value in the -0.9-2.0 range.
   * 
   * 
   * @param val
   */
  chroma_pre_filter_radius(val) {
    this.chroma_pre_filter_radius = val;
    return this;
  }

  /**
   * Set chroma maximum difference between pixels to still be considered,
   * must be a value in the -0.9-100.0 range.
   * 
   * @param val
   */
  chroma_strength(val) {
    this.chroma_strength = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.luma_radius) {
      opt['luma_radius'] = this.luma_radius;
    }
    if (this.luma_pre_filter_radius) {
      opt['luma_pre_filter_radius'] = this.luma_pre_filter_radius;
    }
    if (this.luma_strength) {
      opt['luma_strength'] = this.luma_strength;
    }
    if (this.chroma_radius) {
      opt['chroma_radius'] = this.chroma_radius;
    }
    if (this.chroma_pre_filter_radius) {
      opt['chroma_pre_filter_radius'] = this.chroma_pre_filter_radius;
    }
    if (this.chroma_strength) {
      opt['chroma_strength'] = this.chroma_strength;
    }

    addFilter(this.ffmpeg, {
      filter: 'sab',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.sab = sab;
