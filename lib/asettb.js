const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the asettb function.
 *
 *
 * @example
 *  ffmpeg().asettb()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the asettb function.
 */
function asettb(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'asettb', function() {
    return new AsettbFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AsettbFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Asettb.prototype.withExpr = expr;
  }

  /**
   * The expression which is evaluated into the output timebase.
   * 
   * 
   * @param val
   */
  expr(val) {
    this.expr = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.expr) {
      opt.expr = this.expr;
    }

    addFilter(this.ffmpeg, {
      filter: 'asettb',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.asettb = asettb;
