const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the gradfun function.
 *
 *
 * @example
 *  ffmpeg().gradfun()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the gradfun function.
 */
function gradfun(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'gradfun', function() {
    return new GradfunFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class GradfunFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    GradfunFilter.prototype.withStrength = this.strength;
    GradfunFilter.prototype.withRadius = this.radius;
  }

  /**
   * The maximum amount by which the filter will change any one pixel. This is also
   * the threshold for detecting nearly flat regions. Acceptable values range from
   * .51 to 64; the default value is 1.2. Out-of-range values will be clipped to the
   * valid range.
   * 
   * 
   * @param val
   */
  strength(val) {
    this._strength = val;
    return this;
  }

  /**
   * The neighborhood to fit the gradient to. A larger radius makes for smoother
   * gradients, but also prevents the filter from modifying the pixels near detailed
   * regions. Acceptable values are 8-32; the default value is 16. Out-of-range
   * values will be clipped to the valid range.
   * 
   * 
   * @param val
   */
  radius(val) {
    this._radius = val;
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
    if (this._radius) {
      opt['radius'] = this._radius;
    }

    addFilter(this.ffmpeg, {
      filter: 'gradfun',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.gradfun = gradfun;
