const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the aformat function.
 *
 *
 * @example
 *  ffmpeg().aformat()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the aformat function.
 */
function aformat(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'aformat', function() {
    return new AformatFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AformatFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    AformatFilter.prototype.withSample_fmts = sample_fmts;
    AformatFilter.prototype.withSample_rates = sample_rates;
    AformatFilter.prototype.withChannel_layouts = channel_layouts;
  }

  /**
   * A ’|’-separated list of requested sample formats.
   * 
   * 
   * @param val
   */
  sample_fmts(val) {
    this.sample_fmts = val;
    return this;
  }

  /**
   * A ’|’-separated list of requested sample rates.
   * 
   * 
   * @param val
   */
  sample_rates(val) {
    this.sample_rates = val;
    return this;
  }

  /**
   * A ’|’-separated list of requested channel layouts.
   * 
   * See (ffmpeg-utils)the Channel Layout section in the ffmpeg-utils(1) manual
   * for the required syntax.
   * 
   * @param val
   */
  channel_layouts(val) {
    this.channel_layouts = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.sample_fmts) {
      opt['sample_fmts'] = this.sample_fmts;
    }
    if (this.sample_rates) {
      opt['sample_rates'] = this.sample_rates;
    }
    if (this.channel_layouts) {
      opt['channel_layouts'] = this.channel_layouts;
    }

    addFilter(this.ffmpeg, {
      filter: 'aformat',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.aformat = aformat;
