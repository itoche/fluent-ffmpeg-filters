const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the detelecine function.
 *
 *
 * @example
 *  ffmpeg().detelecine()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the detelecine function.
 */
function detelecine(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'detelecine', function() {
    return new DetelecineFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class DetelecineFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    DetelecineFilter.prototype.withFirst_field = first_field;
    DetelecineFilter.prototype.withPattern = pattern;
    DetelecineFilter.prototype.withStart_frame = start_frame;
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
   * 
   * @param val
   */
  pattern(val) {
    this.pattern = val;
    return this;
  }

  /**
   * A number representing position of the first frame with respect to the telecine
   * pattern. This is to be used if the stream is cut. The default value is 0.
   * 
   * @param val
   */
  start_frame(val) {
    this.start_frame = val;
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
    if (this.start_frame) {
      opt['start_frame'] = this.start_frame;
    }

    addFilter(this.ffmpeg, {
      filter: 'detelecine',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.detelecine = detelecine;
