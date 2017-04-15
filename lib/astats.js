const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the astats function.
 *
 *
 * @example
 *  ffmpeg().astats()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the astats function.
 */
function astats(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'astats', function() {
    return new AstatsFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AstatsFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Astats.prototype.withLength = length;
    Astats.prototype.withMetadata = metadata;
    Astats.prototype.withReset = reset;
  }

  /**
   * Short window length in seconds, used for peak and trough RMS measurement.
   * Default is 0.05 (50 milliseconds). Allowed range is [0.1 - 10].
   * 
   * 
   * @param val
   */
  length(val) {
    this.length = val;
    return this;
  }

  /**
   * 
   * Set metadata injection. All the metadata keys are prefixed with lavfi.astats.X,
   * where X is channel number starting from 1 or string Overall. Default is
   * disabled.
   * 
   * Available keys for each channel are:
   * DC_offset
   * Min_level
   * Max_level
   * Min_difference
   * Max_difference
   * Mean_difference
   * Peak_level
   * RMS_peak
   * RMS_trough
   * Crest_factor
   * Flat_factor
   * Peak_count
   * Bit_depth
   * 
   * and for Overall:
   * DC_offset
   * Min_level
   * Max_level
   * Min_difference
   * Max_difference
   * Mean_difference
   * Peak_level
   * RMS_level
   * RMS_peak
   * RMS_trough
   * Flat_factor
   * Peak_count
   * Bit_depth
   * Number_of_samples
   * 
   * For example full key look like this lavfi.astats.1.DC_offset or
   * this lavfi.astats.Overall.Peak_count.
   * 
   * For description what each key means read below.
   * 
   * 
   * @param val
   */
  metadata(val) {
    this.metadata = val;
    return this;
  }

  /**
   * Set number of frame after which stats are going to be recalculated.
   * Default is disabled.
   * 
   * @param val
   */
  reset(val) {
    this.reset = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.length) {
      opt['length'] = this.length;
    }
    if (this.metadata) {
      opt['metadata'] = this.metadata;
    }
    if (this.reset) {
      opt['reset'] = this.reset;
    }

    addFilter(this.ffmpeg, {
      filter: 'astats',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.astats = astats;
