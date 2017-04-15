const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the scale_npp function.
 *
 *
 * @example
 *  ffmpeg().scale_npp()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the scale_npp function.
 */
function scale_npp(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'scale_npp', function() {
    return new Scale_nppFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class Scale_nppFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Scale_nppFilter.prototype.withFormat = format;
    Scale_nppFilter.prototype.withInterp_algo = interp_algo;
  }

  /**
   * The pixel format of the output CUDA frames. If set to the string &quot;same&quot; (the
   * default), the input format will be kept. Note that automatic format negotiation
   * and conversion is not yet supported for hardware frames
   * 
   * 
   * @param val
   */
  format(val) {
    this.format = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  interp_algo(val) {
    this.interp_algo = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.format) {
      opt['format'] = this.format;
    }
    if (this.interp_algo) {
      opt['interp_algo'] = this.interp_algo;
    }

    addFilter(this.ffmpeg, {
      filter: 'scale_npp',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.scale_npp = scale_npp;
