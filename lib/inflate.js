const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the inflate function.
 *
 *
 * @example
 *  ffmpeg().inflate()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the inflate function.
 */
function inflate(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'inflate', function() {
    return new InflateFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class InflateFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    InflateFilter.prototype.withThreshold0 = this.threshold0;
    InflateFilter.prototype.withThreshold1 = this.threshold1;
    InflateFilter.prototype.withThreshold2 = this.threshold2;
    InflateFilter.prototype.withThreshold3 = this.threshold3;
  }

  /**
   * Limit the maximum change for each plane, default is 65535.
   * If 0, plane will remain unchanged.
   * 
   * @param val
   */
  threshold0(val) {
    this._threshold0 = val;
    return this;
  }

  /**
   * Limit the maximum change for each plane, default is 65535.
   * If 0, plane will remain unchanged.
   * 
   * @param val
   */
  threshold1(val) {
    this._threshold1 = val;
    return this;
  }

  /**
   * Limit the maximum change for each plane, default is 65535.
   * If 0, plane will remain unchanged.
   * 
   * @param val
   */
  threshold2(val) {
    this._threshold2 = val;
    return this;
  }

  /**
   * Limit the maximum change for each plane, default is 65535.
   * If 0, plane will remain unchanged.
   * 
   * @param val
   */
  threshold3(val) {
    this._threshold3 = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._threshold0) {
      opt['threshold0'] = this._threshold0;
    }
    if (this._threshold1) {
      opt['threshold1'] = this._threshold1;
    }
    if (this._threshold2) {
      opt['threshold2'] = this._threshold2;
    }
    if (this._threshold3) {
      opt['threshold3'] = this._threshold3;
    }

    addFilter(this.ffmpeg, {
      filter: 'inflate',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.inflate = inflate;
