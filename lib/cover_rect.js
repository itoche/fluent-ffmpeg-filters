const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the cover_rect function.
 *
 *
 * @example
 *  ffmpeg().cover_rect()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the cover_rect function.
 */
function cover_rect(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'cover_rect', function() {
    return new Cover_rectFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class Cover_rectFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Cover_rectFilter.prototype.withCover = this.cover;
    Cover_rectFilter.prototype.withMode = this.mode;
  }

  /**
   * Filepath of the optional cover image, needs to be in yuv420.
   * 
   * 
   * @param val
   */
  cover(val) {
    this._cover = val;
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
    if (this._cover) {
      opt['cover'] = this._cover;
    }
    if (this._mode) {
      opt['mode'] = this._mode;
    }

    addFilter(this.ffmpeg, {
      filter: 'cover_rect',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.cover_rect = cover_rect;
