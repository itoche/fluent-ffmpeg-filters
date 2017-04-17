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
  threshold3(val) {
    this.threshold3 = val;
    return this;
  }

  /**
   * Limit the maximum change for each plane, default is 65535.
   * If 0, plane will remain unchanged.
   * 
   * @param val
   */
  threshold3(val) {
    this.threshold3 = val;
    return this;
  }

  /**
   * Limit the maximum change for each plane, default is 65535.
   * If 0, plane will remain unchanged.
   * 
   * @param val
   */
  threshold3(val) {
    this.threshold3 = val;
    return this;
  }

  /**
   * Limit the maximum change for each plane, default is 65535.
   * If 0, plane will remain unchanged.
   * 
   * @param val
   */
  threshold3(val) {
    this.threshold3 = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.threshold0) {
      opt['threshold0'] = this.threshold0;
    }
    if (this.threshold1) {
      opt['threshold1'] = this.threshold1;
    }
    if (this.threshold2) {
      opt['threshold2'] = this.threshold2;
    }
    if (this.threshold3) {
      opt['threshold3'] = this.threshold3;
    }

    addFilter(this.ffmpeg, {
      filter: 'inflate',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.inflate = inflate;
