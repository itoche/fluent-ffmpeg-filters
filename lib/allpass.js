const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the allpass function.
 *
 *
 * @example
 *  ffmpeg().allpass()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the allpass function.
 */
function allpass(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'allpass', function() {
    return new AllpassFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AllpassFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    AllpassFilter.prototype.withFrequency = this.frequency;
    AllpassFilter.prototype.withWidth_type = this.width_type;
    AllpassFilter.prototype.withWidth = this.width;
  }

  /**
   * Set frequency in Hz.
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
      filter: 'allpass',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.allpass = allpass;
