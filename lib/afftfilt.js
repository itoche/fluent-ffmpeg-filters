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
    Afftfilt.prototype.withReal = real;
    Afftfilt.prototype.withImag = imag;
    Afftfilt.prototype.withWin_size = win_size;
    Afftfilt.prototype.withWin_func = win_func;
    Afftfilt.prototype.withOverlap = overlap;
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
    this.real = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  imag(val) {
    this.imag = val;
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
   * Set window function. Default is hann.
   * 
   * 
   * @param val
   */
  win_func(val) {
    this.win_func = val;
    return this;
  }

  /**
   * Set window overlap. If set to 1, the recommended overlap for selected
   * window function will be picked. Default is 0.75.
   * 
   * @param val
   */
  overlap(val) {
    this.overlap = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.real) {
      opt['real'] = this.real;
    }
    if (this.imag) {
      opt['imag'] = this.imag;
    }
    if (this.win_size) {
      opt['win_size'] = this.win_size;
    }
    if (this.win_func) {
      opt['win_func'] = this.win_func;
    }
    if (this.overlap) {
      opt['overlap'] = this.overlap;
    }

    addFilter(this.ffmpeg, {
      filter: 'afftfilt',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.afftfilt = afftfilt;
