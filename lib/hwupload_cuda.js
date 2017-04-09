const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the hwupload_cuda function.
 *
 *
 * @example
 *  ffmpeg().hwupload_cuda()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the hwupload_cuda function.
 */
function hwupload_cuda(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'hwupload_cuda', function() {
    return new Hwupload_cudaFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class Hwupload_cudaFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Hwupload_cuda.prototype.withDevice = device;
  }

  /**
   * The number of the CUDA device to use
   * 
   * @param val
   */
  device(val) {
    this.device = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.device) {
      opt.device = this.device;
    }

    addFilter(this.ffmpeg, {
      filter: 'hwupload_cuda',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.hwupload_cuda = hwupload_cuda;