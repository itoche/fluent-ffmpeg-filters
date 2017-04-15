const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the acrossfade function.
 *
 *
 * @example
 *  ffmpeg().acrossfade()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the acrossfade function.
 */
function acrossfade(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'acrossfade', function() {
    return new AcrossfadeFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AcrossfadeFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    AcrossfadeFilter.prototype.withNb_samples = this.nb_samples;
    AcrossfadeFilter.prototype.withDuration = this.duration;
    AcrossfadeFilter.prototype.withOverlap = this.overlap;
    AcrossfadeFilter.prototype.withCurve1 = this.curve1;
    AcrossfadeFilter.prototype.withCurve2 = this.curve2;
  }

  /**
   * Specify the number of samples for which the cross fade effect has to last.
   * At the end of the cross fade effect the first input audio will be completely
   * silent. Default is 44100.
   * 
   * 
   * @param val
   */
  nb_samples(val) {
    this.nb_samples = val;
    return this;
  }

  /**
   * Specify the duration of the cross fade effect. See
   * (ffmpeg-utils)the Time duration section in the ffmpeg-utils(1) manual
   * for the accepted syntax.
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
   * Should first stream end overlap with second stream start. Default is enabled.
   * 
   * 
   * @param val
   */
  overlap(val) {
    this.overlap = val;
    return this;
  }

  /**
   * Set curve for cross fade transition for first stream.
   * 
   * 
   * @param val
   */
  curve1(val) {
    this.curve1 = val;
    return this;
  }

  /**
   * Set curve for cross fade transition for second stream.
   * 
   * For description of available curve types see afade filter description.
   * 
   * @param val
   */
  curve2(val) {
    this.curve2 = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.nb_samples) {
      opt['nb_samples'] = this.nb_samples;
    }
    if (this.duration) {
      opt['duration'] = this.duration;
    }
    if (this.overlap) {
      opt['overlap'] = this.overlap;
    }
    if (this.curve1) {
      opt['curve1'] = this.curve1;
    }
    if (this.curve2) {
      opt['curve2'] = this.curve2;
    }

    addFilter(this.ffmpeg, {
      filter: 'acrossfade',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.acrossfade = acrossfade;
