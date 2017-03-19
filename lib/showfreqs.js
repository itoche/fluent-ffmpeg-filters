const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the showfreqs function.
 *
 *
 * @example
 *  ffmpeg().showfreqs()
      ...             // call filter configuration functions
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
    Showfreqs.prototype.withSize = size;
    Showfreqs.prototype.withMode = mode;
    Showfreqs.prototype.withAscale = ascale;
    Showfreqs.prototype.withFscale = fscale;
    Showfreqs.prototype.withWin_size = win_size;
    Showfreqs.prototype.withWin_func = win_func;
    Showfreqs.prototype.withOverlap = overlap;
    Showfreqs.prototype.withAveraging = averaging;
    Showfreqs.prototype.withColors = colors;
    Showfreqs.prototype.withCmode = cmode;
    Showfreqs.prototype.withMinamp = minamp;
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
    this.size = val;
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
   * 
   * @param val
   */
  ascale(val) {
    this.ascale = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  fscale(val) {
    this.fscale = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  win_size(val) {
    this.win_size = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  win_func(val) {
    this.win_func = val;
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
    this.overlap = val;
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
    this.averaging = val;
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
    this.colors = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  cmode(val) {
    this.cmode = val;
    return this;
  }

  /**
   * Set minimum amplitude used in log amplitude scaler.
   * 
   * 
   * @param val
   */
  minamp(val) {
    this.minamp = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.size) {
      opt.size = this.size;
    }
    if (this.mode) {
      opt.mode = this.mode;
    }
    if (this.ascale) {
      opt.ascale = this.ascale;
    }
    if (this.fscale) {
      opt.fscale = this.fscale;
    }
    if (this.win_size) {
      opt.win_size = this.win_size;
    }
    if (this.win_func) {
      opt.win_func = this.win_func;
    }
    if (this.overlap) {
      opt.overlap = this.overlap;
    }
    if (this.averaging) {
      opt.averaging = this.averaging;
    }
    if (this.colors) {
      opt.colors = this.colors;
    }
    if (this.cmode) {
      opt.cmode = this.cmode;
    }
    if (this.minamp) {
      opt.minamp = this.minamp;
    }

    addFilter(this.ffmpeg, {
      filter: 'showfreqs',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.showfreqs = showfreqs;
