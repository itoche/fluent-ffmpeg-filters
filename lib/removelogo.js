const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the removelogo function.
 *
 *
 * @example
 *  ffmpeg().removelogo()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the removelogo function.
 */
function removelogo(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'removelogo', function() {
    return new RemovelogoFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class RemovelogoFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Removelogo.prototype.withFilename = filename;
  }

  /**
   * Set the filter bitmap file, which can be any image format supported by
   * libavformat. The width and height of the image file must match those of the
   * video stream being processed.
   * 
   * @param val
   */
  filename(val) {
    this.filename = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.filename) {
      opt['filename'] = this.filename;
    }

    addFilter(this.ffmpeg, {
      filter: 'removelogo',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.removelogo = removelogo;
