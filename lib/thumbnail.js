const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the thumbnail function.
 *
 *
 * @example
 *  ffmpeg().thumbnail()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the thumbnail function.
 */
function thumbnail(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'thumbnail', function() {
    return new ThumbnailFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ThumbnailFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Thumbnail.prototype.withN = n;
  }

  /**
   * Set the frames batch size to analyze; in a set of n frames, the filter
   * will pick one of them, and then handle the next batch of n frames until
   * the end. Default is 100.
   * 
   * @param val
   */
  n(val) {
    this.n = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.n) {
      opt['n'] = this.n;
    }

    addFilter(this.ffmpeg, {
      filter: 'thumbnail',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.thumbnail = thumbnail;
