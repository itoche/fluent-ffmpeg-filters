const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the edgedetect function.
 *
 *
 * @example
 *  ffmpeg().edgedetect()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the edgedetect function.
 */
function edgedetect(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'edgedetect', function() {
    return new EdgedetectFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class EdgedetectFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    EdgedetectFilter.prototype.withHigh = this.high;
    EdgedetectFilter.prototype.withMode = this.mode;
  }

  /**
   * Set low and high threshold values used by the Canny thresholding
   * algorithm.
   * 
   * The high threshold selects the &quot;strong&quot; edge pixels, which are then
   * connected through 8-connectivity with the &quot;weak&quot; edge pixels selected
   * by the low threshold.
   * 
   * low and high threshold values must be chosen in the range
   * [0,1], and low should be lesser or equal to high.
   * 
   * Default value for low is 20/255, and default value for high
   * is 50/255.
   * 
   * 
   * @param val
   */
  high(val) {
    this.high = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  mode(val) {
    this.mode = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.high) {
      opt['high'] = this.high;
    }
    if (this.mode) {
      opt['mode'] = this.mode;
    }

    addFilter(this.ffmpeg, {
      filter: 'edgedetect',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.edgedetect = edgedetect;
