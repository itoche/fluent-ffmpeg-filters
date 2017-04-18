const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the lowpass function.
 *
 *
 * @example
 *  ffmpeg().lowpass()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the lowpass function.
 */
function lowpass(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'lowpass', function() {
    return new LowpassFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class LowpassFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    LowpassFilter.prototype.withFrequency = this.frequency;
    LowpassFilter.prototype.withPoles = this.poles;
    LowpassFilter.prototype.withWidth_type = this.width_type;
    LowpassFilter.prototype.withWidth = this.width;
  }

  /**
   * Set frequency in Hz. Default is 500.
   * 
   * 
   * @param val
   */
  frequency(val) {
    this._frequency = val;
    return this;
  }

  /**
   * Set number of poles. Default is 2.
   * 
   * 
   * @param val
   */
  poles(val) {
    this._poles = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  width_type(val) {
    this._width_type = val;
    return this;
  }

  /**
   * Specify the band-width of a filter in width_type units.
   * Applies only to double-pole filter.
   * The default is 0.707q and gives a Butterworth response.
   * 
   * @param val
   */
  width(val) {
    this._width = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._frequency) {
      opt['frequency'] = this._frequency;
    }
    if (this._poles) {
      opt['poles'] = this._poles;
    }
    if (this._width_type) {
      opt['width_type'] = this._width_type;
    }
    if (this._width) {
      opt['width'] = this._width;
    }

    addFilter(this.ffmpeg, {
      filter: 'lowpass',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.lowpass = lowpass;
