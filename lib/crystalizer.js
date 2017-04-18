const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the crystalizer function.
 *
 *
 * @example
 *  ffmpeg().crystalizer()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the crystalizer function.
 */
function crystalizer(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'crystalizer', function() {
    return new CrystalizerFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class CrystalizerFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    CrystalizerFilter.prototype.withI = this.i;
    CrystalizerFilter.prototype.withC = this.c;
  }

  /**
   * Sets the intensity of effect (default: 2.0). Must be in range between 0.0
   * (unchanged sound) to 10.0 (maximum effect).
   * 
   * 
   * @param val
   */
  i(val) {
    this._i = val;
    return this;
  }

  /**
   * Enable clipping. By default is enabled.
   * 
   * @param val
   */
  c(val) {
    this._c = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._i) {
      opt['i'] = this._i;
    }
    if (this._c) {
      opt['c'] = this._c;
    }

    addFilter(this.ffmpeg, {
      filter: 'crystalizer',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.crystalizer = crystalizer;
