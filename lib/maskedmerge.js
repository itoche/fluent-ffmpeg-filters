const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the maskedmerge function.
 *
 *
 * @example
 *  ffmpeg().maskedmerge()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the maskedmerge function.
 */
function maskedmerge(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'maskedmerge', function() {
    return new MaskedmergeFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class MaskedmergeFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    MaskedmergeFilter.prototype.withPlanes = this.planes;
  }

  /**
   * Set which planes will be processed as bitmap, unprocessed planes will be
   * copied from first stream.
   * By default value 0xf, all planes will be processed.
   * 
   * @param val
   */
  planes(val) {
    this._planes = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._planes) {
      opt['planes'] = this._planes;
    }

    addFilter(this.ffmpeg, {
      filter: 'maskedmerge',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.maskedmerge = maskedmerge;
