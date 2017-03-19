const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the bs2b function.
 *
 *
 * @example
 *  ffmpeg().bs2b()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the bs2b function.
 */
function bs2b(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'bs2b', function() {
    return new Bs2bFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class Bs2bFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Bs2b.prototype.withProfile = profile;
    Bs2b.prototype.withFcut = fcut;
    Bs2b.prototype.withFeed = feed;
  }

  /**
   * 
   * @param val
   */
  profile(val) {
    this.profile = val;
    return this;
  }

  /**
   * Cut frequency (in Hz).
   * 
   * 
   * @param val
   */
  fcut(val) {
    this.fcut = val;
    return this;
  }

  /**
   * Feed level (in Hz).
   * 
   * 
   * @param val
   */
  feed(val) {
    this.feed = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.profile) {
      opt.profile = this.profile;
    }
    if (this.fcut) {
      opt.fcut = this.fcut;
    }
    if (this.feed) {
      opt.feed = this.feed;
    }

    addFilter(this.ffmpeg, {
      filter: 'bs2b',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.bs2b = bs2b;
