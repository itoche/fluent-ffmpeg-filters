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
    BassFilter.prototype.withGain = gain;
    BassFilter.prototype.withFrequency = frequency;
    BassFilter.prototype.withWidth_type = width_type;
    BassFilter.prototype.withWidth = width;
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
    this.gain = val;
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
    this.frequency = val;
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
   * Determine how steep is the filter’s shelf transition.
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
    if (this.gain) {
      opt['gain'] = this.gain;
    }
    if (this.frequency) {
      opt['frequency'] = this.frequency;
    }
    if (this.width_type) {
      opt['width_type'] = this.width_type;
    }
    if (this.width) {
      opt['width'] = this.width;
    }

    addFilter(this.ffmpeg, {
      filter: 'bass',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.bass = bass;
