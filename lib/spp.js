const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the spp function.
 *
 *
 * @example
 *  ffmpeg().spp()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the spp function.
 */
function spp(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'spp', function() {
    return new SppFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class SppFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Spp.prototype.withQuality = quality;
    Spp.prototype.withQp = qp;
    Spp.prototype.withMode = mode;
    Spp.prototype.withUse_bframe_qp = use_bframe_qp;
  }

  /**
   * Set quality. This option defines the number of levels for averaging. It accepts
   * an integer in the range 0-6. If set to 0, the filter will have no
   * effect. A value of 6 means the higher quality. For each increment of
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
   * 
   * @param val
   */
  qp(val) {
    this.qp = val;
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
   * Enable the use of the QP from the B-Frames if set to 1. Using this
   * option may cause flicker since the B-Frames have often larger QP. Default is
   * 0 (not enabled).
   * 
   * @param val
   */
  use_bframe_qp(val) {
    this.use_bframe_qp = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.quality) {
      opt.quality = this.quality;
    }
    if (this.qp) {
      opt.qp = this.qp;
    }
    if (this.mode) {
      opt.mode = this.mode;
    }
    if (this.use_bframe_qp) {
      opt.use_bframe_qp = this.use_bframe_qp;
    }

    addFilter(this.ffmpeg, {
      filter: 'spp',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.spp = spp;
