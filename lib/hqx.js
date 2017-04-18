const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the hqx function.
 *
 *
 * @example
 *  ffmpeg().hqx()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the hqx function.
 */
function hqx(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'hqx', function() {
    return new HqxFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class HqxFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    HqxFilter.prototype.withN = this.n;
  }

  /**
   * Set the scaling dimension: 2 for hq2x, 3 for
   * hq3x and 4 for hq4x.
   * Default is 3.
   * 
   * @param val
   */
  n(val) {
    this._n = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._n) {
      opt['n'] = this._n;
    }

    addFilter(this.ffmpeg, {
      filter: 'hqx',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.hqx = hqx;
