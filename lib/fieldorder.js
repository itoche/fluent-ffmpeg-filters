const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the fieldorder function.
 *
 *
 * @example
 *  ffmpeg().fieldorder()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the fieldorder function.
 */
function fieldorder(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'fieldorder', function() {
    return new FieldorderFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class FieldorderFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    FieldorderFilter.prototype.withOrder = this.order;
  }

  /**
   * The output field order. Valid values are tff for top field first or bff
   * for bottom field first.
   * 
   * @param val
   */
  order(val) {
    this._order = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._order) {
      opt['order'] = this._order;
    }

    addFilter(this.ffmpeg, {
      filter: 'fieldorder',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.fieldorder = fieldorder;
