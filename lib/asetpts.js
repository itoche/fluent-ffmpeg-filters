const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the asetpts function.
 *
 *
 * @example
 *  ffmpeg().asetpts()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the asetpts function.
 */
function asetpts(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'asetpts', function() {
    return new AsetptsFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AsetptsFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    AsetptsFilter.prototype.withExpr = this.expr;
  }

  /**
   * The expression which is evaluated for each frame to construct its timestamp.
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
      opt['expr'] = this.expr;
    }

    addFilter(this.ffmpeg, {
      filter: 'asetpts',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.asetpts = asetpts;
