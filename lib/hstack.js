const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the hstack function.
 *
 *
 * @example
 *  ffmpeg().hstack()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the hstack function.
 */
function hstack(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'hstack', function() {
    return new HstackFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class HstackFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    HstackFilter.prototype.withInputs = inputs;
    HstackFilter.prototype.withShortest = shortest;
  }

  /**
   * Set number of input streams. Default is 2.
   * 
   * 
   * @param val
   */
  inputs(val) {
    this.inputs = val;
    return this;
  }

  /**
   * If set to 1, force the output to terminate when the shortest input
   * terminates. Default value is 0.
   * 
   * @param val
   */
  shortest(val) {
    this.shortest = val;
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
    if (this.shortest) {
      opt['shortest'] = this.shortest;
    }

    addFilter(this.ffmpeg, {
      filter: 'hstack',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.hstack = hstack;
