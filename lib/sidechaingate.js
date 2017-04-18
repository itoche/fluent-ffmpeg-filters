const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the sidechaingate function.
 *
 *
 * @example
 *  ffmpeg().sidechaingate()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the sidechaingate function.
 */
function sidechaingate(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'sidechaingate', function() {
    return new SidechaingateFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class SidechaingateFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    SidechaingateFilter.prototype.withLevel_in = this.level_in;
    SidechaingateFilter.prototype.withRange = this.range;
    SidechaingateFilter.prototype.withThreshold = this.threshold;
    SidechaingateFilter.prototype.withRatio = this.ratio;
    SidechaingateFilter.prototype.withAttack = this.attack;
    SidechaingateFilter.prototype.withRelease = this.release;
    SidechaingateFilter.prototype.withMakeup = this.makeup;
    SidechaingateFilter.prototype.withKnee = this.knee;
    SidechaingateFilter.prototype.withDetection = this.detection;
    SidechaingateFilter.prototype.withLink = this.link;
    SidechaingateFilter.prototype.withLevel_sc = this.level_sc;
  }

  /**
   * Set input level before filtering.
   * Default is 1. Allowed range is from 0.015625 to 64.
   * 
   * 
   * @param val
   */
  level_in(val) {
    this._level_in = val;
    return this;
  }

  /**
   * Set the level of gain reduction when the signal is below the threshold.
   * Default is 0.06125. Allowed range is from 0 to 1.
   * 
   * 
   * @param val
   */
  range(val) {
    this._range = val;
    return this;
  }

  /**
   * If a signal rises above this level the gain reduction is released.
   * Default is 0.125. Allowed range is from 0 to 1.
   * 
   * 
   * @param val
   */
  threshold(val) {
    this._threshold = val;
    return this;
  }

  /**
   * Set a ratio about which the signal is reduced.
   * Default is 2. Allowed range is from 1 to 9000.
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
   * reduction stops.
   * Default is 20 milliseconds. Allowed range is from 0.01 to 9000.
   * 
   * 
   * @param val
   */
  attack(val) {
    this._attack = val;
    return this;
  }

  /**
   * Amount of milliseconds the signal has to fall below the threshold before the
   * reduction is increased again. Default is 250 milliseconds.
   * Allowed range is from 0.01 to 9000.
   * 
   * 
   * @param val
   */
  release(val) {
    this._release = val;
    return this;
  }

  /**
   * Set amount of amplification of signal after processing.
   * Default is 1. Allowed range is from 1 to 64.
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
   * Default is 2.828427125. Allowed range is from 1 to 8.
   * 
   * 
   * @param val
   */
  knee(val) {
    this._knee = val;
    return this;
  }

  /**
   * Choose if exact signal should be taken for detection or an RMS like one.
   * Default is rms. Can be peak or rms.
   * 
   * 
   * @param val
   */
  detection(val) {
    this._detection = val;
    return this;
  }

  /**
   * Choose if the average level between all channels or the louder channel affects
   * the reduction.
   * Default is average. Can be average or maximum.
   * 
   * 
   * @param val
   */
  link(val) {
    this._link = val;
    return this;
  }

  /**
   * Set sidechain gain. Default is 1. Range is from 0.015625 to 64.
   * 
   * @param val
   */
  level_sc(val) {
    this._level_sc = val;
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
    if (this._range) {
      opt['range'] = this._range;
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
    if (this._detection) {
      opt['detection'] = this._detection;
    }
    if (this._link) {
      opt['link'] = this._link;
    }
    if (this._level_sc) {
      opt['level_sc'] = this._level_sc;
    }

    addFilter(this.ffmpeg, {
      filter: 'sidechaingate',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.sidechaingate = sidechaingate;
