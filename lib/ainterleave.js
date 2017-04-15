const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the ainterleave function.
 *
 *
 * @example
 *  ffmpeg().ainterleave()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the ainterleave function.
 */
function ainterleave(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'ainterleave', function() {
    return new AinterleaveFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AinterleaveFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Ainterleave.prototype.withNb_inputs = nb_inputs;
  }

  /**
   * Set the number of different inputs, it is 2 by default.
   * 
   * @param val
   */
  nb_inputs(val) {
    this.nb_inputs = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.nb_inputs) {
      opt['nb_inputs'] = this.nb_inputs;
    }

    addFilter(this.ffmpeg, {
      filter: 'ainterleave',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.ainterleave = ainterleave;
