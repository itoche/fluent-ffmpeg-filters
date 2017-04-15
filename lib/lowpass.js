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
    LowpassFilter.prototype.withFrequency = frequency;
    LowpassFilter.prototype.withPoles = poles;
    LowpassFilter.prototype.withWidth_type = width_type;
    LowpassFilter.prototype.withWidth = width;
  }

  /**
   * Set frequency in Hz. Default is 500.
   * 
   * 
   * @param val
   */
  frequency(val) {
    this.frequency = val;
    return this;
  }

  /**
   * Set number of poles. Default is 2.
   * 
   * 
   * @param val
   */
  poles(val) {
    this.poles = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  width_type(val) {
    this.width_type = val;
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
    this.width = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.frequency) {
      opt['frequency'] = this.frequency;
    }
    if (this.poles) {
      opt['poles'] = this.poles;
    }
    if (this.width_type) {
      opt['width_type'] = this.width_type;
    }
    if (this.width) {
      opt['width'] = this.width;
    }

    addFilter(this.ffmpeg, {
      filter: 'lowpass',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.lowpass = lowpass;
