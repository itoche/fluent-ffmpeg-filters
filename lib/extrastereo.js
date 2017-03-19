const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the extrastereo function.
 *
 *
 * @example
 *  ffmpeg().extrastereo()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the extrastereo function.
 */
function extrastereo(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'extrastereo', function() {
    return new ExtrastereoFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ExtrastereoFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Extrastereo.prototype.withM = m;
    Extrastereo.prototype.withC = c;
  }

  /**
   * Sets the difference coefficient (default: 2.5). 0.0 means mono sound
   * (average of both channels), with 1.0 sound will be unchanged, with
   * -1.0 left and right channels will be swapped.
   * 
   * 
   * @param val
   */
  m(val) {
    this.m = val;
    return this;
  }

  /**
   * Enable clipping. By default is enabled.
   * 
   * @param val
   */
  c(val) {
    this.c = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.m) {
      opt.m = this.m;
    }
    if (this.c) {
      opt.c = this.c;
    }

    addFilter(this.ffmpeg, {
      filter: 'extrastereo',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.extrastereo = extrastereo;
