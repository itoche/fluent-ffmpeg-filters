const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the bandreject function.
 *
 *
 * @example
 *  ffmpeg().bandreject()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the bandreject function.
 */
function bandreject(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'bandreject', function() {
    return new BandrejectFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class BandrejectFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    BandrejectFilter.prototype.withFrequency = this.frequency;
    BandrejectFilter.prototype.withWidth_type = this.width_type;
    BandrejectFilter.prototype.withWidth = this.width;
  }

  /**
   * Set the filter’s central frequency. Default is 3000.
   * 
   * 
   * @param val
   */
  frequency(val) {
    this.frequency = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  width_type(val) {
    this.width_type = val;
    return this;
  }

  /**
   * Specify the band-width of a filter in width_type units.
   * 
   * @param val
   */
  width(val) {
    this.width = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.frequency) {
      opt['frequency'] = this.frequency;
    }
    if (this.width_type) {
      opt['width_type'] = this.width_type;
    }
    if (this.width) {
      opt['width'] = this.width;
    }

    addFilter(this.ffmpeg, {
      filter: 'bandreject',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.bandreject = bandreject;
