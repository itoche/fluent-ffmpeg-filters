const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the framepack function.
 *
 *
 * @example
 *  ffmpeg().framepack()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the framepack function.
 */
function framepack(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'framepack', function() {
    return new FramepackFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class FramepackFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    FramepackFilter.prototype.withFormat = this.format;
  }

  /**
   * 
   * @param val
   */
  format(val) {
    this._format = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._format) {
      opt['format'] = this._format;
    }

    addFilter(this.ffmpeg, {
      filter: 'framepack',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.framepack = framepack;
