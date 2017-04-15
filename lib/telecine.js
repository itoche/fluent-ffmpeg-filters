const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the telecine function.
 *
 *
 * @example
 *  ffmpeg().telecine()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the telecine function.
 */
function telecine(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'telecine', function() {
    return new TelecineFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class TelecineFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    TelecineFilter.prototype.withFirst_field = first_field;
    TelecineFilter.prototype.withPattern = pattern;
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
   * A string of numbers representing the pulldown pattern you wish to apply.
   * The default value is 23.
   * 
   * @param val
   */
  pattern(val) {
    this.pattern = val;
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
    if (this.pattern) {
      opt['pattern'] = this.pattern;
    }

    addFilter(this.ffmpeg, {
      filter: 'telecine',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.telecine = telecine;
