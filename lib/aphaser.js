const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the aphaser function.
 *
 *
 * @example
 *  ffmpeg().aphaser()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the aphaser function.
 */
function aphaser(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'aphaser', function() {
    return new AphaserFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AphaserFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    AphaserFilter.prototype.withIn_gain = this.in_gain;
    AphaserFilter.prototype.withOut_gain = this.out_gain;
    AphaserFilter.prototype.withDelay = this.delay;
    AphaserFilter.prototype.withDecay = this.decay;
    AphaserFilter.prototype.withSpeed = this.speed;
    AphaserFilter.prototype.withType = this.type;
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
   * Set output gain. Default is 0.74
   * 
   * 
   * @param val
   */
  out_gain(val) {
    this._out_gain = val;
    return this;
  }

  /**
   * Set delay in milliseconds. Default is 3.0.
   * 
   * 
   * @param val
   */
  delay(val) {
    this._delay = val;
    return this;
  }

  /**
   * Set decay. Default is 0.4.
   * 
   * 
   * @param val
   */
  decay(val) {
    this._decay = val;
    return this;
  }

  /**
   * Set modulation speed in Hz. Default is 0.5.
   * 
   * 
   * @param val
   */
  speed(val) {
    this._speed = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  type(val) {
    this._type = val;
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
    if (this._delay) {
      opt['delay'] = this._delay;
    }
    if (this._decay) {
      opt['decay'] = this._decay;
    }
    if (this._speed) {
      opt['speed'] = this._speed;
    }
    if (this._type) {
      opt['type'] = this._type;
    }

    addFilter(this.ffmpeg, {
      filter: 'aphaser',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.aphaser = aphaser;
