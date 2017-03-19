const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the acompressor function.
 *
 *
 * @example
 *  ffmpeg().acompressor()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the acompressor function.
 */
function acompressor(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'acompressor', function() {
    return new AcompressorFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AcompressorFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Acompressor.prototype.withLevel_in = level_in;
    Acompressor.prototype.withThreshold = threshold;
    Acompressor.prototype.withRatio = ratio;
    Acompressor.prototype.withAttack = attack;
    Acompressor.prototype.withRelease = release;
    Acompressor.prototype.withMakeup = makeup;
    Acompressor.prototype.withKnee = knee;
    Acompressor.prototype.withLink = link;
    Acompressor.prototype.withDetection = detection;
    Acompressor.prototype.withMix = mix;
  }

  /**
   * Set input gain. Default is 1. Range is between 0.015625 and 64.
   * 
   * 
   * @param val
   */
  level_in(val) {
    this.level_in = val;
    return this;
  }

  /**
   * If a signal of second stream rises above this level it will affect the gain
   * reduction of the first stream.
   * By default it is 0.125. Range is between 0.00097563 and 1.
   * 
   * 
   * @param val
   */
  threshold(val) {
    this.threshold = val;
    return this;
  }

  /**
   * Set a ratio by which the signal is reduced. 1:2 means that if the level
   * rose 4dB above the threshold, it will be only 2dB above after the reduction.
   * Default is 2. Range is between 1 and 20.
   * 
   * 
   * @param val
   */
  ratio(val) {
    this.ratio = val;
    return this;
  }

  /**
   * Amount of milliseconds the signal has to rise above the threshold before gain
   * reduction starts. Default is 20. Range is between 0.01 and 2000.
   * 
   * 
   * @param val
   */
  attack(val) {
    this.attack = val;
    return this;
  }

  /**
   * Amount of milliseconds the signal has to fall below the threshold before
   * reduction is decreased again. Default is 250. Range is between 0.01 and 9000.
   * 
   * 
   * @param val
   */
  release(val) {
    this.release = val;
    return this;
  }

  /**
   * Set the amount by how much signal will be amplified after processing.
   * Default is 2. Range is from 1 and 64.
   * 
   * 
   * @param val
   */
  makeup(val) {
    this.makeup = val;
    return this;
  }

  /**
   * Curve the sharp knee around the threshold to enter gain reduction more softly.
   * Default is 2.82843. Range is between 1 and 8.
   * 
   * 
   * @param val
   */
  knee(val) {
    this.knee = val;
    return this;
  }

  /**
   * Choose if the average level between all channels of input stream
   * or the louder(maximum) channel of input stream affects the
   * reduction. Default is average.
   * 
   * 
   * @param val
   */
  link(val) {
    this.link = val;
    return this;
  }

  /**
   * Should the exact signal be taken in case of peak or an RMS one in case
   * of rms. Default is rms which is mostly smoother.
   * 
   * 
   * @param val
   */
  detection(val) {
    this.detection = val;
    return this;
  }

  /**
   * How much to use compressed signal in output. Default is 1.
   * Range is between 0 and 1.
   * 
   * @param val
   */
  mix(val) {
    this.mix = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.level_in) {
      opt.level_in = this.level_in;
    }
    if (this.threshold) {
      opt.threshold = this.threshold;
    }
    if (this.ratio) {
      opt.ratio = this.ratio;
    }
    if (this.attack) {
      opt.attack = this.attack;
    }
    if (this.release) {
      opt.release = this.release;
    }
    if (this.makeup) {
      opt.makeup = this.makeup;
    }
    if (this.knee) {
      opt.knee = this.knee;
    }
    if (this.link) {
      opt.link = this.link;
    }
    if (this.detection) {
      opt.detection = this.detection;
    }
    if (this.mix) {
      opt.mix = this.mix;
    }

    addFilter(this.ffmpeg, {
      filter: 'acompressor',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.acompressor = acompressor;
