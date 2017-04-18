const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the ass function.
 *
 *
 * @example
 *  ffmpeg().ass()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the ass function.
 */
function ass(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'ass', function() {
    return new AssFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AssFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    AssFilter.prototype.withShaping = this.shaping;
  }

  /**
   * 
   * @param val
   */
  shaping(val) {
    this._shaping = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._shaping) {
      opt['shaping'] = this._shaping;
    }

    addFilter(this.ffmpeg, {
      filter: 'ass',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.ass = ass;
