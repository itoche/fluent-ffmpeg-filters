const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the extractplanes function.
 *
 *
 * @example
 *  ffmpeg().extractplanes()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the extractplanes function.
 */
function extractplanes(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'extractplanes', function() {
    return new ExtractplanesFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ExtractplanesFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    ExtractplanesFilter.prototype.withPlanes = planes;
  }

  /**
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
      filter: 'extractplanes',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.extractplanes = extractplanes;
