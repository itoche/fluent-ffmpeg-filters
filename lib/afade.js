const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the afade function.
 *
 *
 * @example
 *  ffmpeg().afade()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the afade function.
 */
function afade(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'afade', function() {
    return new AfadeFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AfadeFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    AfadeFilter.prototype.withType = this.type;
    AfadeFilter.prototype.withStart_sample = this.start_sample;
    AfadeFilter.prototype.withNb_samples = this.nb_samples;
    AfadeFilter.prototype.withStart_time = this.start_time;
    AfadeFilter.prototype.withDuration = this.duration;
    AfadeFilter.prototype.withCurve = this.curve;
  }

  /**
   * Specify the effect type, can be either in for fade-in, or
   * out for a fade-out effect. Default is in.
   * 
   * 
   * @param val
   */
  type(val) {
    this._type = val;
    return this;
  }

  /**
   * Specify the number of the start sample for starting to apply the fade
   * effect. Default is 0.
   * 
   * 
   * @param val
   */
  start_sample(val) {
    this._start_sample = val;
    return this;
  }

  /**
   * Specify the number of samples for which the fade effect has to last. At
   * the end of the fade-in effect the output audio will have the same
   * volume as the input audio, at the end of the fade-out transition
   * the output audio will be silence. Default is 44100.
   * 
   * 
   * @param val
   */
  nb_samples(val) {
    this._nb_samples = val;
    return this;
  }

  /**
   * Specify the start time of the fade effect. Default is 0.
   * The value must be specified as a time duration; see
   * (ffmpeg-utils)the Time duration section in the ffmpeg-utils(1) manual
   * for the accepted syntax.
   * If set this option is used instead of start_sample.
   * 
   * 
   * @param val
   */
  start_time(val) {
    this._start_time = val;
    return this;
  }

  /**
   * Specify the duration of the fade effect. See
   * (ffmpeg-utils)the Time duration section in the ffmpeg-utils(1) manual
   * for the accepted syntax.
   * At the end of the fade-in effect the output audio will have the same
   * volume as the input audio, at the end of the fade-out transition
   * the output audio will be silence.
   * By default the duration is determined by nb_samples.
   * If set this option is used instead of nb_samples.
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
  curve(val) {
    this._curve = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._type) {
      opt['type'] = this._type;
    }
    if (this._start_sample) {
      opt['start_sample'] = this._start_sample;
    }
    if (this._nb_samples) {
      opt['nb_samples'] = this._nb_samples;
    }
    if (this._start_time) {
      opt['start_time'] = this._start_time;
    }
    if (this._duration) {
      opt['duration'] = this._duration;
    }
    if (this._curve) {
      opt['curve'] = this._curve;
    }

    addFilter(this.ffmpeg, {
      filter: 'afade',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.afade = afade;
