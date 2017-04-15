const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the colorlevels function.
 *
 *
 * @example
 *  ffmpeg().colorlevels()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the colorlevels function.
 */
function colorlevels(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'colorlevels', function() {
    return new ColorlevelsFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ColorlevelsFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Colorlevels.prototype.withAimin = aimin;
    Colorlevels.prototype.withAimax = aimax;
    Colorlevels.prototype.withAomin = aomin;
    Colorlevels.prototype.withAomax = aomax;
  }

  /**
   * Adjust red, green, blue and alpha input black point.
   * Allowed ranges for options are [-1.0, 1.0]. Defaults are 0.
   * 
   * 
   * @param val
   */
  aimin(val) {
    this.aimin = val;
    return this;
  }

  /**
   * Adjust red, green, blue and alpha input white point.
   * Allowed ranges for options are [-1.0, 1.0]. Defaults are 1.
   * 
   * Input levels are used to lighten highlights (bright tones), darken shadows
   * (dark tones), change the balance of bright and dark tones.
   * 
   * 
   * @param val
   */
  aimax(val) {
    this.aimax = val;
    return this;
  }

  /**
   * Adjust red, green, blue and alpha output black point.
   * Allowed ranges for options are [0, 1.0]. Defaults are 0.
   * 
   * 
   * @param val
   */
  aomin(val) {
    this.aomin = val;
    return this;
  }

  /**
   * Adjust red, green, blue and alpha output white point.
   * Allowed ranges for options are [0, 1.0]. Defaults are 1.
   * 
   * Output levels allows manual selection of a constrained output level range.
   * 
   * @param val
   */
  aomax(val) {
    this.aomax = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.aimin) {
      opt['aimin'] = this.aimin;
    }
    if (this.aimax) {
      opt['aimax'] = this.aimax;
    }
    if (this.aomin) {
      opt['aomin'] = this.aomin;
    }
    if (this.aomax) {
      opt['aomax'] = this.aomax;
    }

    addFilter(this.ffmpeg, {
      filter: 'colorlevels',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.colorlevels = colorlevels;
