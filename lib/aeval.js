const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the aeval function.
 *
 *
 * @example
 *  ffmpeg().aeval()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the aeval function.
 */
function aeval(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'aeval', function() {
    return new AevalFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AevalFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    AevalFilter.prototype.withExprs = this.exprs;
    AevalFilter.prototype.withChannel_layout = this.channel_layout;
  }

  /**
   * Set the ’|’-separated expressions list for each separate channel. If
   * the number of input channels is greater than the number of
   * expressions, the last specified expression is used for the remaining
   * output channels.
   * 
   * 
   * @param val
   */
  exprs(val) {
    this._exprs = val;
    return this;
  }

  /**
   * Set output channel layout. If not specified, the channel layout is
   * specified by the number of expressions. If set to ‘same’, it will
   * use by default the same input channel layout.
   * 
   * @param val
   */
  channel_layout(val) {
    this._channel_layout = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._exprs) {
      opt['exprs'] = this._exprs;
    }
    if (this._channel_layout) {
      opt['channel_layout'] = this._channel_layout;
    }

    addFilter(this.ffmpeg, {
      filter: 'aeval',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.aeval = aeval;
