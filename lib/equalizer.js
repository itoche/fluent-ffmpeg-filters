const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the equalizer function.
 *
 *
 * @example
 *  ffmpeg().equalizer()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the equalizer function.
 */
function equalizer(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'equalizer', function() {
    return new EqualizerFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class EqualizerFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    EqualizerFilter.prototype.withFrequency = frequency;
    EqualizerFilter.prototype.withWidth_type = width_type;
    EqualizerFilter.prototype.withWidth = width;
    EqualizerFilter.prototype.withGain = gain;
  }

  /**
   * Set the filter’s central frequency in Hz.
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
   * Specify the band-width of a filter in width_type units.
   * 
   * 
   * @param val
   */
  width(val) {
    this.width = val;
    return this;
  }

  /**
   * Set the required gain or attenuation in dB.
   * Beware of clipping when using a positive gain.
   * 
   * @param val
   */
  gain(val) {
    this.gain = val;
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
    if (this.width_type) {
      opt['width_type'] = this.width_type;
    }
    if (this.width) {
      opt['width'] = this.width;
    }
    if (this.gain) {
      opt['gain'] = this.gain;
    }

    addFilter(this.ffmpeg, {
      filter: 'equalizer',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.equalizer = equalizer;
