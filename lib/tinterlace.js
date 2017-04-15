const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the tinterlace function.
 *
 *
 * @example
 *  ffmpeg().tinterlace()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the tinterlace function.
 */
function tinterlace(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'tinterlace', function() {
    return new TinterlaceFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class TinterlaceFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    TinterlaceFilter.prototype.withMode = mode;
    TinterlaceFilter.prototype.withFlags = flags;
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
   * 
   * @param val
   */
  flags(val) {
    this.flags = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.mode) {
      opt['mode'] = this.mode;
    }
    if (this.flags) {
      opt['flags'] = this.flags;
    }

    addFilter(this.ffmpeg, {
      filter: 'tinterlace',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.tinterlace = tinterlace;
