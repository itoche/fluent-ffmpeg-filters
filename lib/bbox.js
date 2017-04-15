const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the bbox function.
 *
 *
 * @example
 *  ffmpeg().bbox()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the bbox function.
 */
function bbox(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'bbox', function() {
    return new BboxFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class BboxFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    BboxFilter.prototype.withMin_val = min_val;
  }

  /**
   * Set the minimal luminance value. Default is 16.
   * 
   * @param val
   */
  min_val(val) {
    this.min_val = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.min_val) {
      opt['min_val'] = this.min_val;
    }

    addFilter(this.ffmpeg, {
      filter: 'bbox',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.bbox = bbox;
