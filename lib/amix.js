const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the amix function.
 *
 *
 * @example
 *  ffmpeg().amix()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the amix function.
 */
function amix(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'amix', function() {
    return new AmixFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AmixFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    AmixFilter.prototype.withInputs = this.inputs;
    AmixFilter.prototype.withDuration = this.duration;
    AmixFilter.prototype.withDropout_transition = this.dropout_transition;
  }

  /**
   * The number of inputs. If unspecified, it defaults to 2.
   * 
   * 
   * @param val
   */
  inputs(val) {
    this._inputs = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  duration(val) {
    this._duration = val;
    return this;
  }

  /**
   * The transition time, in seconds, for volume renormalization when an input
   * stream ends. The default value is 2 seconds.
   * 
   * 
   * @param val
   */
  dropout_transition(val) {
    this._dropout_transition = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._inputs) {
      opt['inputs'] = this._inputs;
    }
    if (this._duration) {
      opt['duration'] = this._duration;
    }
    if (this._dropout_transition) {
      opt['dropout_transition'] = this._dropout_transition;
    }

    addFilter(this.ffmpeg, {
      filter: 'amix',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.amix = amix;
