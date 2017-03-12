const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the vstack function.
 *
 * @example
 *  ffmpeg().vstack()
 *    .inputs(2)
 *    .shortest(0)
 *    .build()
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the vstack function.
 */
function vstack(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'vstack', function() {
    return new VStackFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class VStackFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
  }
  /**
   * Set number of input streams. Default is 2.
   * @param {number} nb The number of input stream
   */
  inputs(nb) {
      this.numberOfInputsOpt = nb;
      return this;
  }
  /**
   * Alias for {@see #inputs}.
   */
  withInputs(nb) {
    return inputs(nb);
  }
  /**
   * If set to 1, force the output to terminate when the shortest input
   * terminates. Default value is 0.
   * @param {number} nb 1 to force the output to terminate when the shortest
   * input stream terminates.
   */
  shortest(nb) {
    let tmp;
    if (typeof(nb) === "boolean") {
          tmp = nb ? 1 : 0;
    } else {
        tmp = nb;
    }
    this.shortestOpt = tmp;
    return this;
  }
  /**
   * Alias for {@see #shortest}.
   */
  withShortest(nb) {
    return shortest(nb);
  }

  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.numberOfInputsOpt) {
      opt.inputs = this.numberOfInputsOpt;
    }
    if (this.shortestOpt) {
      opt.shortest = this.shortestOpt;
    }

    addFilter(this.ffmpeg, {
      filter: 'vstack',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.vstack = vstack;
