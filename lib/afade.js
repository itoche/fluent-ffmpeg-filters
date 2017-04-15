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
    AfadeFilter.prototype.withType = type;
    AfadeFilter.prototype.withStart_sample = start_sample;
    AfadeFilter.prototype.withNb_samples = nb_samples;
    AfadeFilter.prototype.withStart_time = start_time;
    AfadeFilter.prototype.withDuration = duration;
    AfadeFilter.prototype.withCurve = curve;
  }

  /**
   * Specify the effect type, can be either in for fade-in, or
   * out for a fade-out effect. Default is in.
   * 
   * 
   * @param val
   */
  type(val) {
    this.type = val;
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
    this.start_sample = val;
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
    this.nb_samples = val;
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
    this.start_time = val;
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
    this.duration = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  curve(val) {
    this.curve = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.type) {
      opt['type'] = this.type;
    }
    if (this.start_sample) {
      opt['start_sample'] = this.start_sample;
    }
    if (this.nb_samples) {
      opt['nb_samples'] = this.nb_samples;
    }
    if (this.start_time) {
      opt['start_time'] = this.start_time;
    }
    if (this.duration) {
      opt['duration'] = this.duration;
    }
    if (this.curve) {
      opt['curve'] = this.curve;
    }

    addFilter(this.ffmpeg, {
      filter: 'afade',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.afade = afade;
