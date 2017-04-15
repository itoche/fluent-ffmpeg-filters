const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the asetrate function.
 *
 *
 * @example
 *  ffmpeg().asetrate()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the asetrate function.
 */
function asetrate(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'asetrate', function() {
    return new AsetrateFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AsetrateFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Asetrate.prototype.withSample_rate = sample_rate;
  }

  /**
   * Set the output sample rate. Default is 44100 Hz.
   * 
   * @param val
   */
  sample_rate(val) {
    this.sample_rate = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.sample_rate) {
      opt['sample_rate'] = this.sample_rate;
    }

    addFilter(this.ffmpeg, {
      filter: 'asetrate',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.asetrate = asetrate;
