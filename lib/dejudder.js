const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the dejudder function.
 *
 *
 * @example
 *  ffmpeg().dejudder()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the dejudder function.
 */
function dejudder(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'dejudder', function() {
    return new DejudderFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class DejudderFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    DejudderFilter.prototype.withCycle = this.cycle;
  }

  /**
   * 
   * @param val
   */
  cycle(val) {
    this._cycle = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._cycle) {
      opt['cycle'] = this._cycle;
    }

    addFilter(this.ffmpeg, {
      filter: 'dejudder',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.dejudder = dejudder;
