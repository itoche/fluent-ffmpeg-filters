const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the weave function.
 *
 *
 * @example
 *  ffmpeg().weave()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the weave function.
 */
function weave(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'weave', function() {
    return new WeaveFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class WeaveFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    WeaveFilter.prototype.withFirst_field = first_field;
  }

  /**
   * 
   * @param val
   */
  first_field(val) {
    this.first_field = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.first_field) {
      opt['first_field'] = this.first_field;
    }

    addFilter(this.ffmpeg, {
      filter: 'weave',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.weave = weave;
