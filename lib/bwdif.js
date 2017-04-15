const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the bwdif function.
 *
 *
 * @example
 *  ffmpeg().bwdif()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the bwdif function.
 */
function bwdif(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'bwdif', function() {
    return new BwdifFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class BwdifFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    BwdifFilter.prototype.withMode = this.mode;
    BwdifFilter.prototype.withParity = this.parity;
    BwdifFilter.prototype.withDeint = this.deint;
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
   * 
   * @param val
   */
  parity(val) {
    this.parity = val;
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
    if (this.mode) {
      opt['mode'] = this.mode;
    }
    if (this.parity) {
      opt['parity'] = this.parity;
    }
    if (this.deint) {
      opt['deint'] = this.deint;
    }

    addFilter(this.ffmpeg, {
      filter: 'bwdif',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.bwdif = bwdif;
