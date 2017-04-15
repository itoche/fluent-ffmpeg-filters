const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the shuffleframes function.
 *
 *
 * @example
 *  ffmpeg().shuffleframes()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the shuffleframes function.
 */
function shuffleframes(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'shuffleframes', function() {
    return new ShuffleframesFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ShuffleframesFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    ShuffleframesFilter.prototype.withMapping = this.mapping;
  }

  /**
   * Set the destination indexes of input frames.
   * This is space or ’|’ separated list of indexes that maps input frames to output
   * frames. Number of indexes also sets maximal value that each index may have.
   * ’-1’ index have special meaning and that is to drop frame.
   * 
   * @param val
   */
  mapping(val) {
    this.mapping = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.mapping) {
      opt['mapping'] = this.mapping;
    }

    addFilter(this.ffmpeg, {
      filter: 'shuffleframes',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.shuffleframes = shuffleframes;
