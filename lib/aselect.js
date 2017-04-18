const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the aselect function.
 *
 *
 * @example
 *  ffmpeg().aselect()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the aselect function.
 */
function aselect(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'aselect', function() {
    return new AselectFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AselectFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    AselectFilter.prototype.withExpr = this.expr;
    AselectFilter.prototype.withOutputs = this.outputs;
  }

  /**
   * Set expression, which is evaluated for each input frame.
   * 
   * If the expression is evaluated to zero, the frame is discarded.
   * 
   * If the evaluation result is negative or NaN, the frame is sent to the
   * first output; otherwise it is sent to the output with index
   * ceil(val)-1, assuming that the input index starts from 0.
   * 
   * For example a value of 1.2 corresponds to the output with index
   * ceil(1.2)-1 &#x3D; 2-1 &#x3D; 1, that is the second output.
   * 
   * 
   * @param val
   */
  expr(val) {
    this._expr = val;
    return this;
  }

  /**
   * Set the number of outputs. The output to which to send the selected
   * frame is based on the result of the evaluation. Default value is 1.
   * 
   * @param val
   */
  outputs(val) {
    this._outputs = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._expr) {
      opt['expr'] = this._expr;
    }
    if (this._outputs) {
      opt['outputs'] = this._outputs;
    }

    addFilter(this.ffmpeg, {
      filter: 'aselect',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.aselect = aselect;
