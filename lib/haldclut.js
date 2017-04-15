const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the haldclut function.
 *
 *
 * @example
 *  ffmpeg().haldclut()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the haldclut function.
 */
function haldclut(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'haldclut', function() {
    return new HaldclutFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class HaldclutFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    HaldclutFilter.prototype.withShortest = shortest;
    HaldclutFilter.prototype.withRepeatlast = repeatlast;
  }

  /**
   * Force termination when the shortest input terminates. Default is 0.
   * 
   * @param val
   */
  shortest(val) {
    this.shortest = val;
    return this;
  }

  /**
   * Continue applying the last CLUT after the end of the stream. A value of
   * 0 disable the filter after the last frame of the CLUT is reached.
   * Default is 1.
   * 
   * @param val
   */
  repeatlast(val) {
    this.repeatlast = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.shortest) {
      opt['shortest'] = this.shortest;
    }
    if (this.repeatlast) {
      opt['repeatlast'] = this.repeatlast;
    }

    addFilter(this.ffmpeg, {
      filter: 'haldclut',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.haldclut = haldclut;
