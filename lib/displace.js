const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the displace function.
 *
 *
 * @example
 *  ffmpeg().displace()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the displace function.
 */
function displace(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'displace', function() {
    return new DisplaceFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class DisplaceFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    DisplaceFilter.prototype.withEdge = this.edge;
  }

  /**
   * 
   * @param val
   */
  edge(val) {
    this.edge = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.edge) {
      opt['edge'] = this.edge;
    }

    addFilter(this.ffmpeg, {
      filter: 'displace',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.displace = displace;
