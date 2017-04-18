const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the readvitc function.
 *
 *
 * @example
 *  ffmpeg().readvitc()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the readvitc function.
 */
function readvitc(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'readvitc', function() {
    return new ReadvitcFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ReadvitcFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    ReadvitcFilter.prototype.withScan_max = this.scan_max;
    ReadvitcFilter.prototype.withThr_b = this.thr_b;
    ReadvitcFilter.prototype.withThr_w = this.thr_w;
  }

  /**
   * Set the maximum number of lines to scan for VITC data. If the value is set to
   * -1 the full video frame is scanned. Default is 45.
   * 
   * 
   * @param val
   */
  scan_max(val) {
    this._scan_max = val;
    return this;
  }

  /**
   * Set the luma threshold for black. Accepts float numbers in the range [0.0,1.0],
   * default value is 0.2. The value must be equal or less than thr_w.
   * 
   * 
   * @param val
   */
  thr_b(val) {
    this._thr_b = val;
    return this;
  }

  /**
   * Set the luma threshold for white. Accepts float numbers in the range [0.0,1.0],
   * default value is 0.6. The value must be equal or greater than thr_b.
   * 
   * @param val
   */
  thr_w(val) {
    this._thr_w = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._scan_max) {
      opt['scan_max'] = this._scan_max;
    }
    if (this._thr_b) {
      opt['thr_b'] = this._thr_b;
    }
    if (this._thr_w) {
      opt['thr_w'] = this._thr_w;
    }

    addFilter(this.ffmpeg, {
      filter: 'readvitc',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.readvitc = readvitc;
