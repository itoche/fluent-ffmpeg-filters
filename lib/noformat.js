const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the noformat function.
 *
 *
 * @example
 *  ffmpeg().noformat()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the noformat function.
 */
function noformat(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'noformat', function() {
    return new NoformatFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class NoformatFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    NoformatFilter.prototype.withPix_fmts = this.pix_fmts;
  }

  /**
   * A ’|’-separated list of pixel format names, such as
   * apix_fmts&#x3D;yuv420p|monow|rgb24&quot;.
   * 
   * 
   * @param val
   */
  pix_fmts(val) {
    this.pix_fmts = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.pix_fmts) {
      opt['pix_fmts'] = this.pix_fmts;
    }

    addFilter(this.ffmpeg, {
      filter: 'noformat',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.noformat = noformat;
