const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the colorbalance function.
 *
 *
 * @example
 *  ffmpeg().colorbalance()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the colorbalance function.
 */
function colorbalance(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'colorbalance', function() {
    return new ColorbalanceFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ColorbalanceFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Colorbalance.prototype.withBs = bs;
    Colorbalance.prototype.withBm = bm;
    Colorbalance.prototype.withBh = bh;
  }

  /**
   * Adjust red, green and blue shadows (darkest pixels).
   * 
   * 
   * @param val
   */
  bs(val) {
    this.bs = val;
    return this;
  }

  /**
   * Adjust red, green and blue midtones (medium pixels).
   * 
   * 
   * @param val
   */
  bm(val) {
    this.bm = val;
    return this;
  }

  /**
   * Adjust red, green and blue highlights (brightest pixels).
   * 
   * Allowed ranges for options are [-1.0, 1.0]. Defaults are 0.
   * 
   * @param val
   */
  bh(val) {
    this.bh = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.bs) {
      opt.bs = this.bs;
    }
    if (this.bm) {
      opt.bm = this.bm;
    }
    if (this.bh) {
      opt.bh = this.bh;
    }

    addFilter(this.ffmpeg, {
      filter: 'colorbalance',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.colorbalance = colorbalance;
