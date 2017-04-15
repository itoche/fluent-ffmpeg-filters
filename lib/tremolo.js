const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the tremolo function.
 *
 *
 * @example
 *  ffmpeg().tremolo()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the tremolo function.
 */
function tremolo(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'tremolo', function() {
    return new TremoloFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class TremoloFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    TremoloFilter.prototype.withF = f;
    TremoloFilter.prototype.withD = d;
  }

  /**
   * Modulation frequency in Hertz. Modulation frequencies in the subharmonic range
   * (20 Hz or lower) will result in a tremolo effect.
   * This filter may also be used as a ring modulator by specifying
   * a modulation frequency higher than 20 Hz.
   * Range is 0.1 - 20000.0. Default value is 5.0 Hz.
   * 
   * 
   * @param val
   */
  f(val) {
    this.f = val;
    return this;
  }

  /**
   * Depth of modulation as a percentage. Range is 0.0 - 1.0.
   * Default value is 0.5.
   * 
   * @param val
   */
  d(val) {
    this.d = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.f) {
      opt['f'] = this.f;
    }
    if (this.d) {
      opt['d'] = this.d;
    }

    addFilter(this.ffmpeg, {
      filter: 'tremolo',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.tremolo = tremolo;
