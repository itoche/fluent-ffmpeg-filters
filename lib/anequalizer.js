const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the anequalizer function.
 *
 *
 * @example
 *  ffmpeg().anequalizer()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the anequalizer function.
 */
function anequalizer(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'anequalizer', function() {
    return new AnequalizerFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AnequalizerFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Anequalizer.prototype.withParams = params;
  }

  /**
   * 
   * @param val
   */
  params(val) {
    this.params = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.params) {
      opt.params = this.params;
    }

    addFilter(this.ffmpeg, {
      filter: 'anequalizer',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.anequalizer = anequalizer;
