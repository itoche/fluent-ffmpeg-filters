const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the sine function.
 *
 *
 * @example
 *  ffmpeg().sine()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the sine function.
 */
function sine(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'sine', function() {
    return new SineFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class SineFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    SineFilter.prototype.withFrequency = this.frequency;
    SineFilter.prototype.withBeep_factor = this.beep_factor;
    SineFilter.prototype.withSample_rate = this.sample_rate;
    SineFilter.prototype.withDuration = this.duration;
    SineFilter.prototype.withSamples_per_frame = this.samples_per_frame;
  }

  /**
   * Set the carrier frequency. Default is 440 Hz.
   * 
   * 
   * @param val
   */
  frequency(val) {
    this._frequency = val;
    return this;
  }

  /**
   * Enable a periodic beep every second with frequency beep_factor times
   * the carrier frequency. Default is 0, meaning the beep is disabled.
   * 
   * 
   * @param val
   */
  beep_factor(val) {
    this._beep_factor = val;
    return this;
  }

  /**
   * Specify the sample rate, default is 44100.
   * 
   * 
   * @param val
   */
  sample_rate(val) {
    this._sample_rate = val;
    return this;
  }

  /**
   * Specify the duration of the generated audio stream.
   * 
   * 
   * @param val
   */
  duration(val) {
    this._duration = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  samples_per_frame(val) {
    this._samples_per_frame = val;
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
    if (this._beep_factor) {
      opt['beep_factor'] = this._beep_factor;
    }
    if (this._sample_rate) {
      opt['sample_rate'] = this._sample_rate;
    }
    if (this._duration) {
      opt['duration'] = this._duration;
    }
    if (this._samples_per_frame) {
      opt['samples_per_frame'] = this._samples_per_frame;
    }

    addFilter(this.ffmpeg, {
      filter: 'sine',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.sine = sine;
