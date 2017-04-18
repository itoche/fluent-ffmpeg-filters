const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the bs2b function.
 *
 *
 * @example
 *  ffmpeg().bs2b()
 *    ...             // call filter configuration functions
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
    Bs2bFilter.prototype.withProfile = this.profile;
    Bs2bFilter.prototype.withFcut = this.fcut;
    Bs2bFilter.prototype.withFeed = this.feed;
  }

  /**
   * 
   * @param val
   */
  profile(val) {
    this._profile = val;
    return this;
  }

  /**
   * Cut frequency (in Hz).
   * 
   * 
   * @param val
   */
  fcut(val) {
    this._fcut = val;
    return this;
  }

  /**
   * Feed level (in Hz).
   * 
   * 
   * @param val
   */
  feed(val) {
    this._feed = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._profile) {
      opt['profile'] = this._profile;
    }
    if (this._fcut) {
      opt['fcut'] = this._fcut;
    }
    if (this._feed) {
      opt['feed'] = this._feed;
    }

    addFilter(this.ffmpeg, {
      filter: 'bs2b',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.bs2b = bs2b;
