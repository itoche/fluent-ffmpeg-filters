const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the codecview function.
 *
 *
 * @example
 *  ffmpeg().codecview()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the codecview function.
 */
function codecview(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'codecview', function() {
    return new CodecviewFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class CodecviewFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Codecview.prototype.withMv = mv;
    Codecview.prototype.withQp = qp;
    Codecview.prototype.withMv_type = mv_type;
    Codecview.prototype.withFrame_type = frame_type;
  }

  /**
   * 
   * @param val
   */
  mv(val) {
    this.mv = val;
    return this;
  }

  /**
   * Display quantization parameters using the chroma planes.
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
  mv_type(val) {
    this.mv_type = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  frame_type(val) {
    this.frame_type = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.mv) {
      opt.mv = this.mv;
    }
    if (this.qp) {
      opt.qp = this.qp;
    }
    if (this.mv_type) {
      opt.mv_type = this.mv_type;
    }
    if (this.frame_type) {
      opt.frame_type = this.frame_type;
    }

    addFilter(this.ffmpeg, {
      filter: 'codecview',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.codecview = codecview;
