const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the asetnsamples function.
 *
 *
 * @example
 *  ffmpeg().asetnsamples()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the asetnsamples function.
 */
function asetnsamples(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'asetnsamples', function() {
    return new AsetnsamplesFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AsetnsamplesFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Asetnsamples.prototype.withNb_out_samples = nb_out_samples;
    Asetnsamples.prototype.withPad = pad;
  }

  /**
   * Set the number of frames per each output audio frame. The number is
   * intended as the number of samples per each channel.
   * Default value is 1024.
   * 
   * 
   * @param val
   */
  nb_out_samples(val) {
    this.nb_out_samples = val;
    return this;
  }

  /**
   * If set to 1, the filter will pad the last audio frame with zeroes, so
   * that the last frame will contain the same number of samples as the
   * previous ones. Default value is 1.
   * 
   * @param val
   */
  pad(val) {
    this.pad = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.nb_out_samples) {
      opt.nb_out_samples = this.nb_out_samples;
    }
    if (this.pad) {
      opt.pad = this.pad;
    }

    addFilter(this.ffmpeg, {
      filter: 'asetnsamples',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.asetnsamples = asetnsamples;
