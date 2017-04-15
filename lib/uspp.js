const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the uspp function.
 *
 *
 * @example
 *  ffmpeg().uspp()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the uspp function.
 */
function uspp(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'uspp', function() {
    return new UsppFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class UsppFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    UsppFilter.prototype.withQuality = quality;
    UsppFilter.prototype.withQp = qp;
  }

  /**
   * Set quality. This option defines the number of levels for averaging. It accepts
   * an integer in the range 0-8. If set to 0, the filter will have no
   * effect. A value of 8 means the higher quality. For each increment of
   * that value the speed drops by a factor of approximately 2.  Default value is
   * 3.
   * 
   * 
   * @param val
   */
  quality(val) {
    this.quality = val;
    return this;
  }

  /**
   * Force a constant quantization parameter. If not set, the filter will use the QP
   * from the video stream (if available).
   * 
   * @param val
   */
  qp(val) {
    this.qp = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.quality) {
      opt['quality'] = this.quality;
    }
    if (this.qp) {
      opt['qp'] = this.qp;
    }

    addFilter(this.ffmpeg, {
      filter: 'uspp',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.uspp = uspp;
