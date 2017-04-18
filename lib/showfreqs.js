const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the showfreqs function.
 *
 *
 * @example
 *  ffmpeg().showfreqs()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the showfreqs function.
 */
function showfreqs(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'showfreqs', function() {
    return new ShowfreqsFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ShowfreqsFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    ShowfreqsFilter.prototype.withSize = this.size;
    ShowfreqsFilter.prototype.withMode = this.mode;
    ShowfreqsFilter.prototype.withAscale = this.ascale;
    ShowfreqsFilter.prototype.withFscale = this.fscale;
    ShowfreqsFilter.prototype.withWin_size = this.win_size;
    ShowfreqsFilter.prototype.withWin_func = this.win_func;
    ShowfreqsFilter.prototype.withOverlap = this.overlap;
    ShowfreqsFilter.prototype.withAveraging = this.averaging;
    ShowfreqsFilter.prototype.withColors = this.colors;
    ShowfreqsFilter.prototype.withCmode = this.cmode;
    ShowfreqsFilter.prototype.withMinamp = this.minamp;
  }

  /**
   * Specify size of video. For the syntax of this option, check the
   * (ffmpeg-utils)&quot;Video size&quot; section in the ffmpeg-utils manual.
   * Default is 1024x512.
   * 
   * 
   * @param val
   */
  size(val) {
    this._size = val;
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
   * 
   * @param val
   */
  ascale(val) {
    this._ascale = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  fscale(val) {
    this._fscale = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  win_size(val) {
    this._win_size = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  win_func(val) {
    this._win_func = val;
    return this;
  }

  /**
   * Set window overlap. In range [0, 1]. Default is 1,
   * which means optimal overlap for selected window function will be picked.
   * 
   * 
   * @param val
   */
  overlap(val) {
    this._overlap = val;
    return this;
  }

  /**
   * Set time averaging. Setting this to 0 will display current maximal peaks.
   * Default is 1, which means time averaging is disabled.
   * 
   * 
   * @param val
   */
  averaging(val) {
    this._averaging = val;
    return this;
  }

  /**
   * Specify list of colors separated by space or by ’|’ which will be used to
   * draw channel frequencies. Unrecognized or missing colors will be replaced
   * by white color.
   * 
   * 
   * @param val
   */
  colors(val) {
    this._colors = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  cmode(val) {
    this._cmode = val;
    return this;
  }

  /**
   * Set minimum amplitude used in log amplitude scaler.
   * 
   * 
   * @param val
   */
  minamp(val) {
    this._minamp = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._size) {
      opt['size'] = this._size;
    }
    if (this._mode) {
      opt['mode'] = this._mode;
    }
    if (this._ascale) {
      opt['ascale'] = this._ascale;
    }
    if (this._fscale) {
      opt['fscale'] = this._fscale;
    }
    if (this._win_size) {
      opt['win_size'] = this._win_size;
    }
    if (this._win_func) {
      opt['win_func'] = this._win_func;
    }
    if (this._overlap) {
      opt['overlap'] = this._overlap;
    }
    if (this._averaging) {
      opt['averaging'] = this._averaging;
    }
    if (this._colors) {
      opt['colors'] = this._colors;
    }
    if (this._cmode) {
      opt['cmode'] = this._cmode;
    }
    if (this._minamp) {
      opt['minamp'] = this._minamp;
    }

    addFilter(this.ffmpeg, {
      filter: 'showfreqs',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.showfreqs = showfreqs;
