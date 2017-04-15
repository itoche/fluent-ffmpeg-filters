const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the midequalizer function.
 *
 *
 * @example
 *  ffmpeg().midequalizer()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the midequalizer function.
 */
function midequalizer(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'midequalizer', function() {
    return new MidequalizerFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class MidequalizerFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    MidequalizerFilter.prototype.withPlanes = this.planes;
  }

  /**
   * Set which planes to process. Default is 15, which is all available planes.
   * 
   * @param val
   */
  planes(val) {
    this.planes = val;
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

    addFilter(this.ffmpeg, {
      filter: 'midequalizer',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.midequalizer = midequalizer;
