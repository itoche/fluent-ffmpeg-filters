const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the treble function.
 *
 *
 * @example
 *  ffmpeg().treble()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the treble function.
 */
function treble(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'treble', function() {
    return new TrebleFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class TrebleFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    TrebleFilter.prototype.withGain = gain;
    TrebleFilter.prototype.withFrequency = frequency;
    TrebleFilter.prototype.withWidth_type = width_type;
    TrebleFilter.prototype.withWidth = width;
  }

  /**
   * Give the gain at whichever is the lower of ~22 kHz and the
   * Nyquist frequency. Its useful range is about -20 (for a large cut)
   * to +20 (for a large boost). Beware of clipping when using a positive gain.
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
   * The default value is 3000 Hz.
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
      filter: 'treble',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.treble = treble;
