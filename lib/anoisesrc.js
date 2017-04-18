const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the anoisesrc function.
 *
 *
 * @example
 *  ffmpeg().anoisesrc()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the anoisesrc function.
 */
function anoisesrc(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'anoisesrc', function() {
    return new AnoisesrcFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AnoisesrcFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    AnoisesrcFilter.prototype.withSample_rate = this.sample_rate;
    AnoisesrcFilter.prototype.withAmplitude = this.amplitude;
    AnoisesrcFilter.prototype.withDuration = this.duration;
    AnoisesrcFilter.prototype.withColor = this.color;
    AnoisesrcFilter.prototype.withSeed = this.seed;
    AnoisesrcFilter.prototype.withNb_samples = this.nb_samples;
  }

  /**
   * Specify the sample rate. Default value is 48000 Hz.
   * 
   * 
   * @param val
   */
  sample_rate(val) {
    this._sample_rate = val;
    return this;
  }

  /**
   * Specify the amplitude (0.0 - 1.0) of the generated audio stream. Default value
   * is 1.0.
   * 
   * 
   * @param val
   */
  amplitude(val) {
    this._amplitude = val;
    return this;
  }

  /**
   * Specify the duration of the generated audio stream. Not specifying this option
   * results in noise with an infinite length.
   * 
   * 
   * @param val
   */
  duration(val) {
    this._duration = val;
    return this;
  }

  /**
   * Specify the color of noise. Available noise colors are white, pink, and brown.
   * Default color is white.
   * 
   * 
   * @param val
   */
  color(val) {
    this._color = val;
    return this;
  }

  /**
   * Specify a value used to seed the PRNG.
   * 
   * 
   * @param val
   */
  seed(val) {
    this._seed = val;
    return this;
  }

  /**
   * Set the number of samples per each output frame, default is 1024.
   * 
   * @param val
   */
  nb_samples(val) {
    this._nb_samples = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._sample_rate) {
      opt['sample_rate'] = this._sample_rate;
    }
    if (this._amplitude) {
      opt['amplitude'] = this._amplitude;
    }
    if (this._duration) {
      opt['duration'] = this._duration;
    }
    if (this._color) {
      opt['color'] = this._color;
    }
    if (this._seed) {
      opt['seed'] = this._seed;
    }
    if (this._nb_samples) {
      opt['nb_samples'] = this._nb_samples;
    }

    addFilter(this.ffmpeg, {
      filter: 'anoisesrc',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.anoisesrc = anoisesrc;
