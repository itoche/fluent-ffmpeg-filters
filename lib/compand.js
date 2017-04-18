const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the compand function.
 *
 *
 * @example
 *  ffmpeg().compand()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the compand function.
 */
function compand(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'compand', function() {
    return new CompandFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class CompandFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    CompandFilter.prototype.withAttacks = this.attacks;
    CompandFilter.prototype.withDecays = this.decays;
    CompandFilter.prototype.withPoints = this.points;
    CompandFilter.prototype.withSoft_knee = this.soft_knee;
    CompandFilter.prototype.withGain = this.gain;
    CompandFilter.prototype.withVolume = this.volume;
    CompandFilter.prototype.withDelay = this.delay;
  }

  /**
   * A list of times in seconds for each channel over which the instantaneous level
   * of the input signal is averaged to determine its volume. attacks refers to
   * increase of volume and decays refers to decrease of volume. For most
   * situations, the attack time (response to the audio getting louder) should be
   * shorter than the decay time, because the human ear is more sensitive to sudden
   * loud audio than sudden soft audio. A typical value for attack is 0.3 seconds and
   * a typical value for decay is 0.8 seconds.
   * If specified number of attacks &amp; decays is lower than number of channels, the last
   * set attack/decay will be used for all remaining channels.
   * 
   * 
   * @param val
   */
  attacks(val) {
    this._attacks = val;
    return this;
  }

  /**
   * A list of times in seconds for each channel over which the instantaneous level
   * of the input signal is averaged to determine its volume. attacks refers to
   * increase of volume and decays refers to decrease of volume. For most
   * situations, the attack time (response to the audio getting louder) should be
   * shorter than the decay time, because the human ear is more sensitive to sudden
   * loud audio than sudden soft audio. A typical value for attack is 0.3 seconds and
   * a typical value for decay is 0.8 seconds.
   * If specified number of attacks &amp; decays is lower than number of channels, the last
   * set attack/decay will be used for all remaining channels.
   * 
   * 
   * @param val
   */
  decays(val) {
    this._decays = val;
    return this;
  }

  /**
   * A list of points for the transfer function, specified in dB relative to the
   * maximum possible signal amplitude. Each key points list must be defined using
   * the following syntax: x0/y0|x1/y1|x2/y2|.... or
   * x0/y0 x1/y1 x2/y2 ....
   * 
   * The input values must be in strictly increasing order but the transfer function
   * does not have to be monotonically rising. The point 0/0 is assumed but
   * may be overridden (by 0/out-dBn). Typical values for the transfer
   * function are -70/-70|-60/-20.
   * 
   * 
   * @param val
   */
  points(val) {
    this._points = val;
    return this;
  }

  /**
   * Set the curve radius in dB for all joints. It defaults to 0.01.
   * 
   * 
   * @param val
   */
  soft_knee(val) {
    this._soft_knee = val;
    return this;
  }

  /**
   * Set the additional gain in dB to be applied at all points on the transfer
   * function. This allows for easy adjustment of the overall gain.
   * It defaults to 0.
   * 
   * 
   * @param val
   */
  gain(val) {
    this._gain = val;
    return this;
  }

  /**
   * Set an initial volume, in dB, to be assumed for each channel when filtering
   * starts. This permits the user to supply a nominal level initially, so that, for
   * example, a very large gain is not applied to initial signal levels before the
   * companding has begun to operate. A typical value for audio which is initially
   * quiet is -90 dB. It defaults to 0.
   * 
   * 
   * @param val
   */
  volume(val) {
    this._volume = val;
    return this;
  }

  /**
   * Set a delay, in seconds. The input audio is analyzed immediately, but audio is
   * delayed before being fed to the volume adjuster. Specifying a delay
   * approximately equal to the attack/decay times allows the filter to effectively
   * operate in predictive rather than reactive mode. It defaults to 0.
   * 
   * 
   * @param val
   */
  delay(val) {
    this._delay = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._attacks) {
      opt['attacks'] = this._attacks;
    }
    if (this._decays) {
      opt['decays'] = this._decays;
    }
    if (this._points) {
      opt['points'] = this._points;
    }
    if (this._soft_knee) {
      opt['soft-knee'] = this._soft_knee;
    }
    if (this._gain) {
      opt['gain'] = this._gain;
    }
    if (this._volume) {
      opt['volume'] = this._volume;
    }
    if (this._delay) {
      opt['delay'] = this._delay;
    }

    addFilter(this.ffmpeg, {
      filter: 'compand',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.compand = compand;
