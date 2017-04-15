const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the field function.
 *
 *
 * @example
 *  ffmpeg().field()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the field function.
 */
function field(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'field', function() {
    return new FieldFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class FieldFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Field.prototype.withType = type;
  }

  /**
   * Specify whether to extract the top (if the value is 0 or
   * top) or the bottom field (if the value is 1 or
   * bottom).
   * 
   * @param val
   */
  type(val) {
    this.type = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.type) {
      opt['type'] = this.type;
    }

    addFilter(this.ffmpeg, {
      filter: 'field',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.field = field;
