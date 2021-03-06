const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the bitplanenoise function.
 *
 *
 * @example
 *  ffmpeg().bitplanenoise()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the bitplanenoise function.
 */
function bitplanenoise(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'bitplanenoise', function() {
    return new BitplanenoiseFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class BitplanenoiseFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    BitplanenoiseFilter.prototype.withBitplane = this.bitplane;
    BitplanenoiseFilter.prototype.withFilter = this.filter;
  }

  /**
   * Set which plane to analyze. Default is 1.
   * 
   * 
   * @param val
   */
  bitplane(val) {
    this._bitplane = val;
    return this;
  }

  /**
   * Filter out noisy pixels from bitplane set above.
   * Default is disabled.
   * 
   * @param val
   */
  filter(val) {
    this._filter = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._bitplane) {
      opt['bitplane'] = this._bitplane;
    }
    if (this._filter) {
      opt['filter'] = this._filter;
    }

    addFilter(this.ffmpeg, {
      filter: 'bitplanenoise',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.bitplanenoise = bitplanenoise;
