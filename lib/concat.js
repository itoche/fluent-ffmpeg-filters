const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the concat function.
 *
 *
 * @example
 *  ffmpeg().concat()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the concat function.
 */
function concat(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'concat', function() {
    return new ConcatFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ConcatFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    ConcatFilter.prototype.withN = this.n;
    ConcatFilter.prototype.withV = this.v;
    ConcatFilter.prototype.withA = this.a;
    ConcatFilter.prototype.withUnsafe = this.unsafe;
  }

  /**
   * Set the number of segments. Default is 2.
   * 
   * 
   * @param val
   */
  n(val) {
    this.n = val;
    return this;
  }

  /**
   * Set the number of output video streams, that is also the number of video
   * streams in each segment. Default is 1.
   * 
   * 
   * @param val
   */
  v(val) {
    this.v = val;
    return this;
  }

  /**
   * Set the number of output audio streams, that is also the number of audio
   * streams in each segment. Default is 0.
   * 
   * 
   * @param val
   */
  a(val) {
    this.a = val;
    return this;
  }

  /**
   * Activate unsafe mode: do not fail if segments have a different format.
   * 
   * 
   * @param val
   */
  unsafe(val) {
    this.unsafe = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.n) {
      opt['n'] = this.n;
    }
    if (this.v) {
      opt['v'] = this.v;
    }
    if (this.a) {
      opt['a'] = this.a;
    }
    if (this.unsafe) {
      opt['unsafe'] = this.unsafe;
    }

    addFilter(this.ffmpeg, {
      filter: 'concat',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.concat = concat;
