const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the chorus function.
 *
 *
 * @example
 *  ffmpeg().chorus()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the chorus function.
 */
function chorus(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'chorus', function() {
    return new ChorusFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ChorusFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    ChorusFilter.prototype.withIn_gain = this.in_gain;
    ChorusFilter.prototype.withOut_gain = this.out_gain;
    ChorusFilter.prototype.withDelays = this.delays;
    ChorusFilter.prototype.withDecays = this.decays;
    ChorusFilter.prototype.withSpeeds = this.speeds;
    ChorusFilter.prototype.withDepths = this.depths;
  }

  /**
   * Set input gain. Default is 0.4.
   * 
   * 
   * @param val
   */
  in_gain(val) {
    this._in_gain = val;
    return this;
  }

  /**
   * Set output gain. Default is 0.4.
   * 
   * 
   * @param val
   */
  out_gain(val) {
    this._out_gain = val;
    return this;
  }

  /**
   * Set delays. A typical delay is around 40ms to 60ms.
   * 
   * 
   * @param val
   */
  delays(val) {
    this._delays = val;
    return this;
  }

  /**
   * Set decays.
   * 
   * 
   * @param val
   */
  decays(val) {
    this._decays = val;
    return this;
  }

  /**
   * Set speeds.
   * 
   * 
   * @param val
   */
  speeds(val) {
    this._speeds = val;
    return this;
  }

  /**
   * Set depths.
   * 
   * @param val
   */
  depths(val) {
    this._depths = val;
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
    if (this._speeds) {
      opt['speeds'] = this._speeds;
    }
    if (this._depths) {
      opt['depths'] = this._depths;
    }

    addFilter(this.ffmpeg, {
      filter: 'chorus',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.chorus = chorus;
