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
    ApulsatorFilter.prototype.withLevel_in = this.level_in;
    ApulsatorFilter.prototype.withLevel_out = this.level_out;
    ApulsatorFilter.prototype.withMode = this.mode;
    ApulsatorFilter.prototype.withAmount = this.amount;
    ApulsatorFilter.prototype.withOffset_l = this.offset_l;
    ApulsatorFilter.prototype.withOffset_r = this.offset_r;
    ApulsatorFilter.prototype.withWidth = this.width;
    ApulsatorFilter.prototype.withTiming = this.timing;
    ApulsatorFilter.prototype.withBpm = this.bpm;
    ApulsatorFilter.prototype.withMs = this.ms;
    ApulsatorFilter.prototype.withHz = this.hz;
  }

  /**
   * Set input gain. By default it is 1. Range is [0.015625 - 64].
   * 
   * 
   * @param val
   */
  level_in(val) {
    this._level_in = val;
    return this;
  }

  /**
   * Set output gain. By default it is 1. Range is [0.015625 - 64].
   * 
   * 
   * @param val
   */
  level_out(val) {
    this._level_out = val;
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
    this._mode = val;
    return this;
  }

  /**
   * Set modulation. Define how much of original signal is affected by the LFO.
   * 
   * 
   * @param val
   */
  amount(val) {
    this._amount = val;
    return this;
  }

  /**
   * Set left channel offset. Default is 0. Allowed range is [0 - 1].
   * 
   * 
   * @param val
   */
  offset_l(val) {
    this._offset_l = val;
    return this;
  }

  /**
   * Set right channel offset. Default is 0.5. Allowed range is [0 - 1].
   * 
   * 
   * @param val
   */
  offset_r(val) {
    this._offset_r = val;
    return this;
  }

  /**
   * Set pulse width. Default is 1. Allowed range is [0 - 2].
   * 
   * 
   * @param val
   */
  width(val) {
    this._width = val;
    return this;
  }

  /**
   * Set possible timing mode. Can be one of: bpm, ms or hz. Default is hz.
   * 
   * 
   * @param val
   */
  timing(val) {
    this._timing = val;
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
    this._bpm = val;
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
    this._ms = val;
    return this;
  }

  /**
   * Set frequency in Hz. Default is 2. Allowed range is [0.01 - 100]. Only used
   * if timing is set to hz.
   * 
   * @param val
   */
  hz(val) {
    this._hz = val;
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
    if (this._level_out) {
      opt['level_out'] = this._level_out;
    }
    if (this._mode) {
      opt['mode'] = this._mode;
    }
    if (this._amount) {
      opt['amount'] = this._amount;
    }
    if (this._offset_l) {
      opt['offset_l'] = this._offset_l;
    }
    if (this._offset_r) {
      opt['offset_r'] = this._offset_r;
    }
    if (this._width) {
      opt['width'] = this._width;
    }
    if (this._timing) {
      opt['timing'] = this._timing;
    }
    if (this._bpm) {
      opt['bpm'] = this._bpm;
    }
    if (this._ms) {
      opt['ms'] = this._ms;
    }
    if (this._hz) {
      opt['hz'] = this._hz;
    }

    addFilter(this.ffmpeg, {
      filter: 'apulsator',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.apulsator = apulsator;
