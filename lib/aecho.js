const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the aecho function.
 *
 *
 * @example
 *  ffmpeg().aecho()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the aecho function.
 */
function aecho(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'aecho', function() {
    return new AechoFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AechoFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    AechoFilter.prototype.withIn_gain = this.in_gain;
    AechoFilter.prototype.withOut_gain = this.out_gain;
    AechoFilter.prototype.withDelays = this.delays;
    AechoFilter.prototype.withDecays = this.decays;
  }

  /**
   * Set input gain of reflected signal. Default is 0.6.
   * 
   * 
   * @param val
   */
  in_gain(val) {
    this._in_gain = val;
    return this;
  }

  /**
   * Set output gain of reflected signal. Default is 0.3.
   * 
   * 
   * @param val
   */
  out_gain(val) {
    this._out_gain = val;
    return this;
  }

  /**
   * Set list of time intervals in milliseconds between original signal and reflections
   * separated by ’|’. Allowed range for each delay is (0 - 90000.0].
   * Default is 1000.
   * 
   * 
   * @param val
   */
  delays(val) {
    this._delays = val;
    return this;
  }

  /**
   * Set list of loudnesses of reflected signals separated by ’|’.
   * Allowed range for each decay is (0 - 1.0].
   * Default is 0.5.
   * 
   * @param val
   */
  decays(val) {
    this._decays = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._in_gain) {
      opt['in_gain'] = this._in_gain;
    }
    if (this._out_gain) {
      opt['out_gain'] = this._out_gain;
    }
    if (this._delays) {
      opt['delays'] = this._delays;
    }
    if (this._decays) {
      opt['decays'] = this._decays;
    }

    addFilter(this.ffmpeg, {
      filter: 'aecho',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.aecho = aecho;
