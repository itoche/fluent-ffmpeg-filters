const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the transpose function.
 *
 *
 * @example
 *  ffmpeg().transpose()
 *    ...             // call filter configuration functions
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
    TransposeFilter.prototype.withDir = this.dir;
    TransposeFilter.prototype.withPassthrough = this.passthrough;
  }

  /**
   * 
   * @param val
   */
  dir(val) {
    this._dir = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  passthrough(val) {
    this._passthrough = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._dir) {
      opt['dir'] = this._dir;
    }
    if (this._passthrough) {
      opt['passthrough'] = this._passthrough;
    }

    addFilter(this.ffmpeg, {
      filter: 'transpose',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.transpose = transpose;
