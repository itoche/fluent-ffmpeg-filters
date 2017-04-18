const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the histeq function.
 *
 *
 * @example
 *  ffmpeg().histeq()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the histeq function.
 */
function histeq(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'histeq', function() {
    return new HisteqFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class HisteqFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    HisteqFilter.prototype.withStrength = this.strength;
    HisteqFilter.prototype.withIntensity = this.intensity;
    HisteqFilter.prototype.withAntibanding = this.antibanding;
  }

  /**
   * Determine the amount of equalization to be applied.  As the strength
   * is reduced, the distribution of pixel intensities more-and-more
   * approaches that of the input frame. The value must be a float number
   * in the range [0,1] and defaults to 0.200.
   * 
   * 
   * @param val
   */
  strength(val) {
    this._strength = val;
    return this;
  }

  /**
   * Set the maximum intensity that can generated and scale the output
   * values appropriately.  The strength should be set as desired and then
   * the intensity can be limited if needed to avoid washing-out. The value
   * must be a float number in the range [0,1] and defaults to 0.210.
   * 
   * 
   * @param val
   */
  intensity(val) {
    this._intensity = val;
    return this;
  }

  /**
   * Set the antibanding level. If enabled the filter will randomly vary
   * the luminance of output pixels by a small amount to avoid banding of
   * the histogram. Possible values are none, weak or
   * strong. It defaults to none.
   * 
   * @param val
   */
  antibanding(val) {
    this._antibanding = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._strength) {
      opt['strength'] = this._strength;
    }
    if (this._intensity) {
      opt['intensity'] = this._intensity;
    }
    if (this._antibanding) {
      opt['antibanding'] = this._antibanding;
    }

    addFilter(this.ffmpeg, {
      filter: 'histeq',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.histeq = histeq;
