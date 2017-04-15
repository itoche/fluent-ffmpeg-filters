const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the amerge function.
 *
 *
 * @example
 *  ffmpeg().amerge()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the amerge function.
 */
function amerge(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'amerge', function() {
    return new AmergeFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AmergeFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    AmergeFilter.prototype.withInputs = inputs;
  }

  /**
   * Set the number of inputs. Default is 2.
   * 
   * 
   * @param val
   */
  inputs(val) {
    this.inputs = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.inputs) {
      opt['inputs'] = this.inputs;
    }

    addFilter(this.ffmpeg, {
      filter: 'amerge',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.amerge = amerge;
