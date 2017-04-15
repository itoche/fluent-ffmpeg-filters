const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the vibrato function.
 *
 *
 * @example
 *  ffmpeg().vibrato()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the vibrato function.
 */
function vibrato(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'vibrato', function() {
    return new VibratoFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class VibratoFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    VibratoFilter.prototype.withF = f;
    VibratoFilter.prototype.withD = d;
  }

  /**
   * Modulation frequency in Hertz.
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
      filter: 'vibrato',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.vibrato = vibrato;
