const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the bass function.
 *
 *
 * @example
 *  ffmpeg().bass()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the bass function.
 */
function bass(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'bass', function() {
    return new BassFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class BassFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    BassFilter.prototype.withGain = this.gain;
    BassFilter.prototype.withFrequency = this.frequency;
    BassFilter.prototype.withWidth_type = this.width_type;
    BassFilter.prototype.withWidth = this.width;
  }

  /**
   * Give the gain at 0 Hz. Its useful range is about -20
   * (for a large cut) to +20 (for a large boost).
   * Beware of clipping when using a positive gain.
   * 
   * 
   * @param val
   */
  gain(val) {
    this._gain = val;
    return this;
  }

  /**
   * Set the filter’s central frequency and so can be used
   * to extend or reduce the frequency range to be boosted or cut.
   * The default value is 100 Hz.
   * 
   * 
   * @param val
   */
  frequency(val) {
    this._frequency = val;
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
   * Determine how steep is the filter’s shelf transition.
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
    if (this._gain) {
      opt['gain'] = this._gain;
    }
    if (this._frequency) {
      opt['frequency'] = this._frequency;
    }
    if (this._width_type) {
      opt['width_type'] = this._width_type;
    }
    if (this._width) {
      opt['width'] = this._width;
    }

    addFilter(this.ffmpeg, {
      filter: 'bass',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.bass = bass;
