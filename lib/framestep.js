const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the framestep function.
 *
 *
 * @example
 *  ffmpeg().framestep()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the framestep function.
 */
function framestep(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'framestep', function() {
    return new FramestepFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class FramestepFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    FramestepFilter.prototype.withStep = this.step;
  }

  /**
   * Select frame after every step frames.
   * Allowed values are positive integers higher than 0. Default value is 1.
   * 
   * @param val
   */
  step(val) {
    this.step = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.step) {
      opt['step'] = this.step;
    }

    addFilter(this.ffmpeg, {
      filter: 'framestep',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.framestep = framestep;
