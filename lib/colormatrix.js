const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the colormatrix function.
 *
 *
 * @example
 *  ffmpeg().colormatrix()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the colormatrix function.
 */
function colormatrix(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'colormatrix', function() {
    return new ColormatrixFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ColormatrixFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    ColormatrixFilter.prototype.withSrc = this.src;
    ColormatrixFilter.prototype.withDst = this.dst;
  }

  /**
   * 
   * @param val
   */
  src(val) {
    this.src = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  dst(val) {
    this.dst = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.src) {
      opt['src'] = this.src;
    }
    if (this.dst) {
      opt['dst'] = this.dst;
    }

    addFilter(this.ffmpeg, {
      filter: 'colormatrix',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.colormatrix = colormatrix;
