const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the transpose function.
 *
 *
 * @example
 *  ffmpeg().transpose()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the transpose function.
 */
function transpose(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'transpose', function() {
    return new TransposeFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class TransposeFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Transpose.prototype.withDir = dir;
    Transpose.prototype.withPassthrough = passthrough;
  }

  /**
   * 
   * @param val
   */
  dir(val) {
    this.dir = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  passthrough(val) {
    this.passthrough = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.dir) {
      opt.dir = this.dir;
    }
    if (this.passthrough) {
      opt.passthrough = this.passthrough;
    }

    addFilter(this.ffmpeg, {
      filter: 'transpose',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.transpose = transpose;
