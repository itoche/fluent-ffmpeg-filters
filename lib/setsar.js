const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the setsar function.
 *
 *
 * @example
 *  ffmpeg().setsar()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the setsar function.
 */
function setsar(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'setsar', function() {
    return new SetsarFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class SetsarFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Setsar.prototype.withR = r;
    Setsar.prototype.withMax = max;
  }

  /**
   * Set the aspect ratio used by the filter.
   * 
   * The parameter can be a floating point number string, an expression, or
   * a string of the form num:den, where num and
   * den are the numerator and denominator of the aspect ratio. If
   * the parameter is not specified, it is assumed the value &quot;0&quot;.
   * In case the form &quot;num:den&quot; is used, the : character
   * should be escaped.
   * 
   * 
   * @param val
   */
  r(val) {
    this.r = val;
    return this;
  }

  /**
   * Set the maximum integer value to use for expressing numerator and
   * denominator when reducing the expressed aspect ratio to a rational.
   * Default value is 100.
   * 
   * 
   * @param val
   */
  max(val) {
    this.max = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.r) {
      opt['r'] = this.r;
    }
    if (this.max) {
      opt['max'] = this.max;
    }

    addFilter(this.ffmpeg, {
      filter: 'setsar',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.setsar = setsar;
