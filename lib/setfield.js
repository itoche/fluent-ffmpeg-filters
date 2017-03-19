const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the setfield function.
 *
 *
 * @example
 *  ffmpeg().setfield()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the setfield function.
 */
function setfield(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'setfield', function() {
    return new SetfieldFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class SetfieldFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Setfield.prototype.withMode = mode;
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
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.mode) {
      opt.mode = this.mode;
    }

    addFilter(this.ffmpeg, {
      filter: 'setfield',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.setfield = setfield;
