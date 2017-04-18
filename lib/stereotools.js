const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the stereotools function.
 *
 *
 * @example
 *  ffmpeg().stereotools()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the stereotools function.
 */
function stereotools(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'stereotools', function() {
    return new StereotoolsFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class StereotoolsFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    StereotoolsFilter.prototype.withLevel_in = this.level_in;
    StereotoolsFilter.prototype.withLevel_out = this.level_out;
    StereotoolsFilter.prototype.withBalance_in = this.balance_in;
    StereotoolsFilter.prototype.withBalance_out = this.balance_out;
    StereotoolsFilter.prototype.withSoftclip = this.softclip;
    StereotoolsFilter.prototype.withMutel = this.mutel;
    StereotoolsFilter.prototype.withMuter = this.muter;
    StereotoolsFilter.prototype.withPhasel = this.phasel;
    StereotoolsFilter.prototype.withPhaser = this.phaser;
    StereotoolsFilter.prototype.withMode = this.mode;
    StereotoolsFilter.prototype.withSlev = this.slev;
    StereotoolsFilter.prototype.withSbal = this.sbal;
    StereotoolsFilter.prototype.withMlev = this.mlev;
    StereotoolsFilter.prototype.withMpan = this.mpan;
    StereotoolsFilter.prototype.withBase = this.base;
    StereotoolsFilter.prototype.withDelay = this.delay;
    StereotoolsFilter.prototype.withSclevel = this.sclevel;
    StereotoolsFilter.prototype.withPhase = this.phase;
  }

  /**
   * Set input level before filtering for both channels. Defaults is 1.
   * Allowed range is from 0.015625 to 64.
   * 
   * 
   * @param val
   */
  level_in(val) {
    this._level_in = val;
    return this;
  }

  /**
   * Set output level after filtering for both channels. Defaults is 1.
   * Allowed range is from 0.015625 to 64.
   * 
   * 
   * @param val
   */
  level_out(val) {
    this._level_out = val;
    return this;
  }

  /**
   * Set input balance between both channels. Default is 0.
   * Allowed range is from -1 to 1.
   * 
   * 
   * @param val
   */
  balance_in(val) {
    this._balance_in = val;
    return this;
  }

  /**
   * Set output balance between both channels. Default is 0.
   * Allowed range is from -1 to 1.
   * 
   * 
   * @param val
   */
  balance_out(val) {
    this._balance_out = val;
    return this;
  }

  /**
   * Enable softclipping. Results in analog distortion instead of harsh digital 0dB
   * clipping. Disabled by default.
   * 
   * 
   * @param val
   */
  softclip(val) {
    this._softclip = val;
    return this;
  }

  /**
   * Mute the left channel. Disabled by default.
   * 
   * 
   * @param val
   */
  mutel(val) {
    this._mutel = val;
    return this;
  }

  /**
   * Mute the right channel. Disabled by default.
   * 
   * 
   * @param val
   */
  muter(val) {
    this._muter = val;
    return this;
  }

  /**
   * Change the phase of the left channel. Disabled by default.
   * 
   * 
   * @param val
   */
  phasel(val) {
    this._phasel = val;
    return this;
  }

  /**
   * Change the phase of the right channel. Disabled by default.
   * 
   * 
   * @param val
   */
  phaser(val) {
    this._phaser = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  mode(val) {
    this._mode = val;
    return this;
  }

  /**
   * Set level of side signal. Default is 1.
   * Allowed range is from 0.015625 to 64.
   * 
   * 
   * @param val
   */
  slev(val) {
    this._slev = val;
    return this;
  }

  /**
   * Set balance of side signal. Default is 0.
   * Allowed range is from -1 to 1.
   * 
   * 
   * @param val
   */
  sbal(val) {
    this._sbal = val;
    return this;
  }

  /**
   * Set level of the middle signal. Default is 1.
   * Allowed range is from 0.015625 to 64.
   * 
   * 
   * @param val
   */
  mlev(val) {
    this._mlev = val;
    return this;
  }

  /**
   * Set middle signal pan. Default is 0. Allowed range is from -1 to 1.
   * 
   * 
   * @param val
   */
  mpan(val) {
    this._mpan = val;
    return this;
  }

  /**
   * Set stereo base between mono and inversed channels. Default is 0.
   * Allowed range is from -1 to 1.
   * 
   * 
   * @param val
   */
  base(val) {
    this._base = val;
    return this;
  }

  /**
   * Set delay in milliseconds how much to delay left from right channel and
   * vice versa. Default is 0. Allowed range is from -20 to 20.
   * 
   * 
   * @param val
   */
  delay(val) {
    this._delay = val;
    return this;
  }

  /**
   * Set S/C level. Default is 1. Allowed range is from 1 to 100.
   * 
   * 
   * @param val
   */
  sclevel(val) {
    this._sclevel = val;
    return this;
  }

  /**
   * Set the stereo phase in degrees. Default is 0. Allowed range is from 0 to 360.
   * 
   * @param val
   */
  phase(val) {
    this._phase = val;
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
    if (this._balance_in) {
      opt['balance_in'] = this._balance_in;
    }
    if (this._balance_out) {
      opt['balance_out'] = this._balance_out;
    }
    if (this._softclip) {
      opt['softclip'] = this._softclip;
    }
    if (this._mutel) {
      opt['mutel'] = this._mutel;
    }
    if (this._muter) {
      opt['muter'] = this._muter;
    }
    if (this._phasel) {
      opt['phasel'] = this._phasel;
    }
    if (this._phaser) {
      opt['phaser'] = this._phaser;
    }
    if (this._mode) {
      opt['mode'] = this._mode;
    }
    if (this._slev) {
      opt['slev'] = this._slev;
    }
    if (this._sbal) {
      opt['sbal'] = this._sbal;
    }
    if (this._mlev) {
      opt['mlev'] = this._mlev;
    }
    if (this._mpan) {
      opt['mpan'] = this._mpan;
    }
    if (this._base) {
      opt['base'] = this._base;
    }
    if (this._delay) {
      opt['delay'] = this._delay;
    }
    if (this._sclevel) {
      opt['sclevel'] = this._sclevel;
    }
    if (this._phase) {
      opt['phase'] = this._phase;
    }

    addFilter(this.ffmpeg, {
      filter: 'stereotools',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.stereotools = stereotools;
