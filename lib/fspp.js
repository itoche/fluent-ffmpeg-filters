const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the fspp function.
 *
 *
 * @example
 *  ffmpeg().fspp()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the fspp function.
 */
function fspp(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'fspp', function() {
    return new FsppFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class FsppFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    FsppFilter.prototype.withQuality = this.quality;
    FsppFilter.prototype.withQp = this.qp;
    FsppFilter.prototype.withStrength = this.strength;
    FsppFilter.prototype.withUse_bframe_qp = this.use_bframe_qp;
  }

  /**
   * Set quality. This option defines the number of levels for averaging. It accepts
   * an integer in the range 4-5. Default value is 4.
   * 
   * 
   * @param val
   */
  quality(val) {
    this.quality = val;
    return this;
  }

  /**
   * Force a constant quantization parameter. It accepts an integer in range 0-63.
   * If not set, the filter will use the QP from the video stream (if available).
   * 
   * 
   * @param val
   */
  qp(val) {
    this.qp = val;
    return this;
  }

  /**
   * Set filter strength. It accepts an integer in range -15 to 32. Lower values mean
   * more details but also more artifacts, while higher values make the image smoother
   * but also blurrier. Default value is 0 − PSNR optimal.
   * 
   * 
   * @param val
   */
  strength(val) {
    this.strength = val;
    return this;
  }

  /**
   * Enable the use of the QP from the B-Frames if set to 1. Using this
   * option may cause flicker since the B-Frames have often larger QP. Default is
   * 0 (not enabled).
   * 
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
      opt['quality'] = this.quality;
    }
    if (this.qp) {
      opt['qp'] = this.qp;
    }
    if (this.strength) {
      opt['strength'] = this.strength;
    }
    if (this.use_bframe_qp) {
      opt['use_bframe_qp'] = this.use_bframe_qp;
    }

    addFilter(this.ffmpeg, {
      filter: 'fspp',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.fspp = fspp;
