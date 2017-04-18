const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the pp7 function.
 *
 *
 * @example
 *  ffmpeg().pp7()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the pp7 function.
 */
function pp7(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'pp7', function() {
    return new Pp7Filter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class Pp7Filter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Pp7Filter.prototype.withQp = this.qp;
    Pp7Filter.prototype.withMode = this.mode;
  }

  /**
   * Force a constant quantization parameter. It accepts an integer in range
   * 0 to 63. If not set, the filter will use the QP from the video stream
   * (if available).
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
  mode(val) {
    this._mode = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._qp) {
      opt['qp'] = this._qp;
    }
    if (this._mode) {
      opt['mode'] = this._mode;
    }

    addFilter(this.ffmpeg, {
      filter: 'pp7',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.pp7 = pp7;
