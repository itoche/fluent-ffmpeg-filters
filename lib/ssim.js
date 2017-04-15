const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the ssim function.
 *
 *
 * @example
 *  ffmpeg().ssim()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the ssim function.
 */
function ssim(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'ssim', function() {
    return new SsimFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class SsimFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    SsimFilter.prototype.withStats_file = this.stats_file;
  }

  /**
   * If specified the filter will use the named file to save the SSIM of
   * each individual frame. When filename equals &quot;-&quot; the data is sent to
   * standard output.
   * 
   * @param val
   */
  stats_file(val) {
    this.stats_file = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.stats_file) {
      opt['stats_file'] = this.stats_file;
    }

    addFilter(this.ffmpeg, {
      filter: 'ssim',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.ssim = ssim;
