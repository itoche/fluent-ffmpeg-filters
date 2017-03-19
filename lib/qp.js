const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the qp function.
 *
 *
 * @example
 *  ffmpeg().qp()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the qp function.
 */
function qp(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'qp', function() {
    return new QpFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class QpFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Qp.prototype.withQp = qp;
  }

  /**
   * Set expression for quantization parameter.
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
    if (this.qp) {
      opt.qp = this.qp;
    }

    addFilter(this.ffmpeg, {
      filter: 'qp',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.qp = qp;
