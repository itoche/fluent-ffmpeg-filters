const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the acompressor function.
 *
 *
 * @example
 *  ffmpeg().acompressor()
 *    ...             // call filter configuration functions
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
    AcompressorFilter.prototype.withLevel_in = this.level_in;
    AcompressorFilter.prototype.withThreshold = this.threshold;
    AcompressorFilter.prototype.withRatio = this.ratio;
    AcompressorFilter.prototype.withAttack = this.attack;
    AcompressorFilter.prototype.withRelease = this.release;
    AcompressorFilter.prototype.withMakeup = this.makeup;
    AcompressorFilter.prototype.withKnee = this.knee;
    AcompressorFilter.prototype.withLink = this.link;
    AcompressorFilter.prototype.withDetection = this.detection;
    AcompressorFilter.prototype.withMix = this.mix;
  }

  /**
   * Set input gain. Default is 1. Range is between 0.015625 and 64.
   * 
   * 
   * @param val
   */
  level_in(val) {
    this._level_in = val;
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
    this._threshold = val;
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
    this._ratio = val;
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
    this._attack = val;
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
    this._release = val;
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
    this._makeup = val;
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
    this._knee = val;
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
    this._link = val;
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
    this._detection = val;
    return this;
  }

  /**
   * How much to use compressed signal in output. Default is 1.
   * Range is between 0 and 1.
   * 
   * @param val
   */
  mix(val) {
    this._mix = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._level_in) {
      opt['level_in'] = this._level_in;
    }
    if (this._threshold) {
      opt['threshold'] = this._threshold;
    }
    if (this._ratio) {
      opt['ratio'] = this._ratio;
    }
    if (this._attack) {
      opt['attack'] = this._attack;
    }
    if (this._release) {
      opt['release'] = this._release;
    }
    if (this._makeup) {
      opt['makeup'] = this._makeup;
    }
    if (this._knee) {
      opt['knee'] = this._knee;
    }
    if (this._link) {
      opt['link'] = this._link;
    }
    if (this._detection) {
      opt['detection'] = this._detection;
    }
    if (this._mix) {
      opt['mix'] = this._mix;
    }

    addFilter(this.ffmpeg, {
      filter: 'acompressor',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.acompressor = acompressor;
