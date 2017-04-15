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
    Aphaser.prototype.withIn_gain = in_gain;
    Aphaser.prototype.withOut_gain = out_gain;
    Aphaser.prototype.withDelay = delay;
    Aphaser.prototype.withDecay = decay;
    Aphaser.prototype.withSpeed = speed;
    Aphaser.prototype.withType = type;
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
   * Set output gain. Default is 0.74
   * 
   * 
   * @param val
   */
  out_gain(val) {
    this.out_gain = val;
    return this;
  }

  /**
   * Set delay in milliseconds. Default is 3.0.
   * 
   * 
   * @param val
   */
  delay(val) {
    this.delay = val;
    return this;
  }

  /**
   * Set decay. Default is 0.4.
   * 
   * 
   * @param val
   */
  decay(val) {
    this.decay = val;
    return this;
  }

  /**
   * Set modulation speed in Hz. Default is 0.5.
   * 
   * 
   * @param val
   */
  speed(val) {
    this.speed = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  type(val) {
    this.type = val;
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
    if (this.delay) {
      opt['delay'] = this.delay;
    }
    if (this.decay) {
      opt['decay'] = this.decay;
    }
    if (this.speed) {
      opt['speed'] = this.speed;
    }
    if (this.type) {
      opt['type'] = this.type;
    }

    addFilter(this.ffmpeg, {
      filter: 'aphaser',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.aphaser = aphaser;
