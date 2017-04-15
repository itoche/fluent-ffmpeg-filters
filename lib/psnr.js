const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the psnr function.
 *
 *
 * @example
 *  ffmpeg().psnr()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the psnr function.
 */
function psnr(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'psnr', function() {
    return new PsnrFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class PsnrFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    PsnrFilter.prototype.withStats_file = stats_file;
    PsnrFilter.prototype.withStats_version = stats_version;
    PsnrFilter.prototype.withStats_add_max = stats_add_max;
  }

  /**
   * If specified the filter will use the named file to save the PSNR of
   * each individual frame. When filename equals &quot;-&quot; the data is sent to
   * standard output.
   * 
   * 
   * @param val
   */
  stats_file(val) {
    this.stats_file = val;
    return this;
  }

  /**
   * Specifies which version of the stats file format to use. Details of
   * each format are written below.
   * Default value is 1.
   * 
   * 
   * @param val
   */
  stats_version(val) {
    this.stats_version = val;
    return this;
  }

  /**
   * Determines whether the max value is output to the stats log.
   * Default value is 0.
   * Requires stats_version &gt;&#x3D; 2. If this is set and stats_version &lt; 2,
   * the filter will return an error.
   * 
   * @param val
   */
  stats_add_max(val) {
    this.stats_add_max = val;
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
    if (this.stats_version) {
      opt['stats_version'] = this.stats_version;
    }
    if (this.stats_add_max) {
      opt['stats_add_max'] = this.stats_add_max;
    }

    addFilter(this.ffmpeg, {
      filter: 'psnr',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.psnr = psnr;
