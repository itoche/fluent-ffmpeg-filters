const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the xbr function.
 *
 *
 * @example
 *  ffmpeg().xbr()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the xbr function.
 */
function xbr(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'xbr', function() {
    return new XbrFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class XbrFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Xbr.prototype.withN = n;
  }

  /**
   * Set the scaling dimension: 2 for 2xBR, 3 for
   * 3xBR and 4 for 4xBR.
   * Default is 3.
   * 
   * @param val
   */
  n(val) {
    this.n = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.n) {
      opt.n = this.n;
    }

    addFilter(this.ffmpeg, {
      filter: 'xbr',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.xbr = xbr;
