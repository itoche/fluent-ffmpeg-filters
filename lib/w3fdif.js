const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the w3fdif function.
 *
 *
 * @example
 *  ffmpeg().w3fdif()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the w3fdif function.
 */
function w3fdif(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'w3fdif', function() {
    return new W3fdifFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class W3fdifFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    W3fdifFilter.prototype.withFilter = this.filter;
    W3fdifFilter.prototype.withDeint = this.deint;
  }

  /**
   * 
   * @param val
   */
  filter(val) {
    this.filter = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  deint(val) {
    this.deint = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.filter) {
      opt['filter'] = this.filter;
    }
    if (this.deint) {
      opt['deint'] = this.deint;
    }

    addFilter(this.ffmpeg, {
      filter: 'w3fdif',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.w3fdif = w3fdif;
