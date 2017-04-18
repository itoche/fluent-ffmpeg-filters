const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the afftfilt function.
 *
 *
 * @example
 *  ffmpeg().afftfilt()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the afftfilt function.
 */
function afftfilt(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'afftfilt', function() {
    return new AfftfiltFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AfftfiltFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    AfftfiltFilter.prototype.withReal = this.real;
    AfftfiltFilter.prototype.withImag = this.imag;
    AfftfiltFilter.prototype.withWin_size = this.win_size;
    AfftfiltFilter.prototype.withWin_func = this.win_func;
    AfftfiltFilter.prototype.withOverlap = this.overlap;
  }

  /**
   * Set frequency domain real expression for each separate channel separated
   * by ’|’. Default is &quot;1&quot;.
   * If the number of input channels is greater than the number of
   * expressions, the last specified expression is used for the remaining
   * output channels.
   * 
   * 
   * @param val
   */
  real(val) {
    this._real = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  imag(val) {
    this._imag = val;
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
   * Set window function. Default is hann.
   * 
   * 
   * @param val
   */
  win_func(val) {
    this._win_func = val;
    return this;
  }

  /**
   * Set window overlap. If set to 1, the recommended overlap for selected
   * window function will be picked. Default is 0.75.
   * 
   * @param val
   */
  overlap(val) {
    this._overlap = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._real) {
      opt['real'] = this._real;
    }
    if (this._imag) {
      opt['imag'] = this._imag;
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

    addFilter(this.ffmpeg, {
      filter: 'afftfilt',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.afftfilt = afftfilt;
