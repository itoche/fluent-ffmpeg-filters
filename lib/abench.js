const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the abench function.
 *
 *
 * @example
 *  ffmpeg().abench()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the abench function.
 */
function abench(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'abench', function() {
    return new AbenchFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AbenchFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    AbenchFilter.prototype.withAction = this.action;
  }

  /**
   * 
   * @param val
   */
  action(val) {
    this._action = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._action) {
      opt['action'] = this._action;
    }

    addFilter(this.ffmpeg, {
      filter: 'abench',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.abench = abench;
