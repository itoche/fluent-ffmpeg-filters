const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the prewitt function.
 *
 *
 * @example
 *  ffmpeg().prewitt()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the prewitt function.
 */
function prewitt(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'prewitt', function() {
    return new PrewittFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class PrewittFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Prewitt.prototype.withPlanes = planes;
    Prewitt.prototype.withScale = scale;
    Prewitt.prototype.withDelta = delta;
  }

  /**
   * Set which planes will be processed, unprocessed planes will be copied.
   * By default value 0xf, all planes will be processed.
   * 
   * 
   * @param val
   */
  planes(val) {
    this.planes = val;
    return this;
  }

  /**
   * Set value which will be multiplied with filtered result.
   * 
   * 
   * @param val
   */
  scale(val) {
    this.scale = val;
    return this;
  }

  /**
   * Set value which will be added to filtered result.
   * 
   * @param val
   */
  delta(val) {
    this.delta = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.planes) {
      opt['planes'] = this.planes;
    }
    if (this.scale) {
      opt['scale'] = this.scale;
    }
    if (this.delta) {
      opt['delta'] = this.delta;
    }

    addFilter(this.ffmpeg, {
      filter: 'prewitt',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.prewitt = prewitt;
