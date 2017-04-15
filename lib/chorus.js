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
    Chorus.prototype.withIn_gain = in_gain;
    Chorus.prototype.withOut_gain = out_gain;
    Chorus.prototype.withDelays = delays;
    Chorus.prototype.withDecays = decays;
    Chorus.prototype.withSpeeds = speeds;
    Chorus.prototype.withDepths = depths;
  }

  /**
   * Set input gain. Default is 0.4.
   * 
   * 
   * @param val
   */
  in_gain(val) {
    this.in_gain = val;
    return this;
  }

  /**
   * Set output gain. Default is 0.4.
   * 
   * 
   * @param val
   */
  out_gain(val) {
    this.out_gain = val;
    return this;
  }

  /**
   * Set delays. A typical delay is around 40ms to 60ms.
   * 
   * 
   * @param val
   */
  delays(val) {
    this.delays = val;
    return this;
  }

  /**
   * Set decays.
   * 
   * 
   * @param val
   */
  decays(val) {
    this.decays = val;
    return this;
  }

  /**
   * Set speeds.
   * 
   * 
   * @param val
   */
  speeds(val) {
    this.speeds = val;
    return this;
  }

  /**
   * Set depths.
   * 
   * @param val
   */
  depths(val) {
    this.depths = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.in_gain) {
      opt['in_gain'] = this.in_gain;
    }
    if (this.out_gain) {
      opt['out_gain'] = this.out_gain;
    }
    if (this.delays) {
      opt['delays'] = this.delays;
    }
    if (this.decays) {
      opt['decays'] = this.decays;
    }
    if (this.speeds) {
      opt['speeds'] = this.speeds;
    }
    if (this.depths) {
      opt['depths'] = this.depths;
    }

    addFilter(this.ffmpeg, {
      filter: 'chorus',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.chorus = chorus;
