const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the showpalette function.
 *
 *
 * @example
 *  ffmpeg().showpalette()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the showpalette function.
 */
function showpalette(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'showpalette', function() {
    return new ShowpaletteFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ShowpaletteFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    ShowpaletteFilter.prototype.withS = s;
  }

  /**
   * Set the size of the box used to represent one palette color entry. Default is
   * 30 (for a 30x30 pixel box).
   * 
   * @param val
   */
  s(val) {
    this.s = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.s) {
      opt['s'] = this.s;
    }

    addFilter(this.ffmpeg, {
      filter: 'showpalette',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.showpalette = showpalette;
