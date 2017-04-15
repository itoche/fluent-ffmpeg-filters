const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the arealtime function.
 *
 *
 * @example
 *  ffmpeg().arealtime()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the arealtime function.
 */
function arealtime(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'arealtime', function() {
    return new ArealtimeFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ArealtimeFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    ArealtimeFilter.prototype.withLimit = limit;
  }

  /**
   * Time limit for the pauses. Any pause longer than that will be considered
   * a timestamp discontinuity and reset the timer. Default is 2 seconds.
   * 
   * @param val
   */
  limit(val) {
    this.limit = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.limit) {
      opt['limit'] = this.limit;
    }

    addFilter(this.ffmpeg, {
      filter: 'arealtime',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.arealtime = arealtime;
