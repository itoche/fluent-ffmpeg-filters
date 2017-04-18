const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the format function.
 *
 *
 * @example
 *  ffmpeg().format()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the format function.
 */
function format(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'format', function() {
    return new FormatFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class FormatFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    FormatFilter.prototype.withPix_fmts = this.pix_fmts;
  }

  /**
   * A ’|’-separated list of pixel format names, such as
   * &quot;pix_fmts&#x3D;yuv420p|monow|rgb24&quot;.
   * 
   * 
   * @param val
   */
  pix_fmts(val) {
    this._pix_fmts = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._pix_fmts) {
      opt['pix_fmts'] = this._pix_fmts;
    }

    addFilter(this.ffmpeg, {
      filter: 'format',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.format = format;
