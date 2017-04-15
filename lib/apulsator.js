const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the apulsator function.
 *
 *
 * @example
 *  ffmpeg().apulsator()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the apulsator function.
 */
function apulsator(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'apulsator', function() {
    return new ApulsatorFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ApulsatorFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    ApulsatorFilter.prototype.withLevel_in = level_in;
    ApulsatorFilter.prototype.withLevel_out = level_out;
    ApulsatorFilter.prototype.withMode = mode;
    ApulsatorFilter.prototype.withAmount = amount;
    ApulsatorFilter.prototype.withOffset_l = offset_l;
    ApulsatorFilter.prototype.withOffset_r = offset_r;
    ApulsatorFilter.prototype.withWidth = width;
    ApulsatorFilter.prototype.withTiming = timing;
    ApulsatorFilter.prototype.withBpm = bpm;
    ApulsatorFilter.prototype.withMs = ms;
    ApulsatorFilter.prototype.withHz = hz;
  }

  /**
   * Set input gain. By default it is 1. Range is [0.015625 - 64].
   * 
   * 
   * @param val
   */
  level_in(val) {
    this.level_in = val;
    return this;
  }

  /**
   * Set output gain. By default it is 1. Range is [0.015625 - 64].
   * 
   * 
   * @param val
   */
  level_out(val) {
    this.level_out = val;
    return this;
  }

  /**
   * Set waveform shape the LFO will use. Can be one of: sine, triangle, square,
   * sawup or sawdown. Default is sine.
   * 
   * 
   * @param val
   */
  mode(val) {
    this.mode = val;
    return this;
  }

  /**
   * Set modulation. Define how much of original signal is affected by the LFO.
   * 
   * 
   * @param val
   */
  amount(val) {
    this.amount = val;
    return this;
  }

  /**
   * Set left channel offset. Default is 0. Allowed range is [0 - 1].
   * 
   * 
   * @param val
   */
  offset_l(val) {
    this.offset_l = val;
    return this;
  }

  /**
   * Set right channel offset. Default is 0.5. Allowed range is [0 - 1].
   * 
   * 
   * @param val
   */
  offset_r(val) {
    this.offset_r = val;
    return this;
  }

  /**
   * Set pulse width. Default is 1. Allowed range is [0 - 2].
   * 
   * 
   * @param val
   */
  width(val) {
    this.width = val;
    return this;
  }

  /**
   * Set possible timing mode. Can be one of: bpm, ms or hz. Default is hz.
   * 
   * 
   * @param val
   */
  timing(val) {
    this.timing = val;
    return this;
  }

  /**
   * Set bpm. Default is 120. Allowed range is [30 - 300]. Only used if timing
   * is set to bpm.
   * 
   * 
   * @param val
   */
  bpm(val) {
    this.bpm = val;
    return this;
  }

  /**
   * Set ms. Default is 500. Allowed range is [10 - 2000]. Only used if timing
   * is set to ms.
   * 
   * 
   * @param val
   */
  ms(val) {
    this.ms = val;
    return this;
  }

  /**
   * Set frequency in Hz. Default is 2. Allowed range is [0.01 - 100]. Only used
   * if timing is set to hz.
   * 
   * @param val
   */
  hz(val) {
    this.hz = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.level_in) {
      opt['level_in'] = this.level_in;
    }
    if (this.level_out) {
      opt['level_out'] = this.level_out;
    }
    if (this.mode) {
      opt['mode'] = this.mode;
    }
    if (this.amount) {
      opt['amount'] = this.amount;
    }
    if (this.offset_l) {
      opt['offset_l'] = this.offset_l;
    }
    if (this.offset_r) {
      opt['offset_r'] = this.offset_r;
    }
    if (this.width) {
      opt['width'] = this.width;
    }
    if (this.timing) {
      opt['timing'] = this.timing;
    }
    if (this.bpm) {
      opt['bpm'] = this.bpm;
    }
    if (this.ms) {
      opt['ms'] = this.ms;
    }
    if (this.hz) {
      opt['hz'] = this.hz;
    }

    addFilter(this.ffmpeg, {
      filter: 'apulsator',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.apulsator = apulsator;
