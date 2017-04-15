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
    this.level_in = val;
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
    this.level_out = val;
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
    this.balance_in = val;
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
    this.balance_out = val;
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
    this.softclip = val;
    return this;
  }

  /**
   * Mute the left channel. Disabled by default.
   * 
   * 
   * @param val
   */
  mutel(val) {
    this.mutel = val;
    return this;
  }

  /**
   * Mute the right channel. Disabled by default.
   * 
   * 
   * @param val
   */
  muter(val) {
    this.muter = val;
    return this;
  }

  /**
   * Change the phase of the left channel. Disabled by default.
   * 
   * 
   * @param val
   */
  phasel(val) {
    this.phasel = val;
    return this;
  }

  /**
   * Change the phase of the right channel. Disabled by default.
   * 
   * 
   * @param val
   */
  phaser(val) {
    this.phaser = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  mode(val) {
    this.mode = val;
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
    this.slev = val;
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
    this.sbal = val;
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
    this.mlev = val;
    return this;
  }

  /**
   * Set middle signal pan. Default is 0. Allowed range is from -1 to 1.
   * 
   * 
   * @param val
   */
  mpan(val) {
    this.mpan = val;
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
    this.base = val;
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
    this.delay = val;
    return this;
  }

  /**
   * Set S/C level. Default is 1. Allowed range is from 1 to 100.
   * 
   * 
   * @param val
   */
  sclevel(val) {
    this.sclevel = val;
    return this;
  }

  /**
   * Set the stereo phase in degrees. Default is 0. Allowed range is from 0 to 360.
   * 
   * @param val
   */
  phase(val) {
    this.phase = val;
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
    if (this.balance_in) {
      opt['balance_in'] = this.balance_in;
    }
    if (this.balance_out) {
      opt['balance_out'] = this.balance_out;
    }
    if (this.softclip) {
      opt['softclip'] = this.softclip;
    }
    if (this.mutel) {
      opt['mutel'] = this.mutel;
    }
    if (this.muter) {
      opt['muter'] = this.muter;
    }
    if (this.phasel) {
      opt['phasel'] = this.phasel;
    }
    if (this.phaser) {
      opt['phaser'] = this.phaser;
    }
    if (this.mode) {
      opt['mode'] = this.mode;
    }
    if (this.slev) {
      opt['slev'] = this.slev;
    }
    if (this.sbal) {
      opt['sbal'] = this.sbal;
    }
    if (this.mlev) {
      opt['mlev'] = this.mlev;
    }
    if (this.mpan) {
      opt['mpan'] = this.mpan;
    }
    if (this.base) {
      opt['base'] = this.base;
    }
    if (this.delay) {
      opt['delay'] = this.delay;
    }
    if (this.sclevel) {
      opt['sclevel'] = this.sclevel;
    }
    if (this.phase) {
      opt['phase'] = this.phase;
    }

    addFilter(this.ffmpeg, {
      filter: 'stereotools',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.stereotools = stereotools;
