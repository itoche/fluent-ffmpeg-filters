const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the codecview function.
 *
 *
 * @example
 *  ffmpeg().codecview()
 *    ...             // call filter configuration functions
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
    CodecviewFilter.prototype.withMv = this.mv;
    CodecviewFilter.prototype.withQp = this.qp;
    CodecviewFilter.prototype.withMv_type = this.mv_type;
    CodecviewFilter.prototype.withFrame_type = this.frame_type;
  }

  /**
   * 
   * @param val
   */
  mv(val) {
    this._mv = val;
    return this;
  }

  /**
   * Display quantization parameters using the chroma planes.
   * 
   * 
   * @param val
   */
  qp(val) {
    this._qp = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  mv_type(val) {
    this._mv_type = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  frame_type(val) {
    this._frame_type = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._mv) {
      opt['mv'] = this._mv;
    }
    if (this._qp) {
      opt['qp'] = this._qp;
    }
    if (this._mv_type) {
      opt['mv_type'] = this._mv_type;
    }
    if (this._frame_type) {
      opt['frame_type'] = this._frame_type;
    }

    addFilter(this.ffmpeg, {
      filter: 'codecview',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.codecview = codecview;
