const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the aevalsrc function.
 *
 *
 * @example
 *  ffmpeg().aevalsrc()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the aevalsrc function.
 */
function aevalsrc(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'aevalsrc', function() {
    return new AevalsrcFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AevalsrcFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    AevalsrcFilter.prototype.withExprs = exprs;
    AevalsrcFilter.prototype.withChannel_layout = channel_layout;
    AevalsrcFilter.prototype.withDuration = duration;
    AevalsrcFilter.prototype.withNb_samples = nb_samples;
    AevalsrcFilter.prototype.withSample_rate = sample_rate;
  }

  /**
   * Set the ’|’-separated expressions list for each separate channel. In case the
   * channel_layout option is not specified, the selected channel layout
   * depends on the number of provided expressions. Otherwise the last
   * specified expression is applied to the remaining output channels.
   * 
   * 
   * @param val
   */
  exprs(val) {
    this.exprs = val;
    return this;
  }

  /**
   * Set the channel layout. The number of channels in the specified layout
   * must be equal to the number of specified expressions.
   * 
   * 
   * @param val
   */
  channel_layout(val) {
    this.channel_layout = val;
    return this;
  }

  /**
   * Set the minimum duration of the sourced audio. See
   * (ffmpeg-utils)the Time duration section in the ffmpeg-utils(1) manual
   * for the accepted syntax.
   * Note that the resulting duration may be greater than the specified
   * duration, as the generated audio is always cut at the end of a
   * complete frame.
   * 
   * If not specified, or the expressed duration is negative, the audio is
   * supposed to be generated forever.
   * 
   * 
   * @param val
   */
  duration(val) {
    this.duration = val;
    return this;
  }

  /**
   * Set the number of samples per channel per each output frame,
   * default to 1024.
   * 
   * 
   * @param val
   */
  nb_samples(val) {
    this.nb_samples = val;
    return this;
  }

  /**
   * Specify the sample rate, default to 44100.
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
    if (this.exprs) {
      opt['exprs'] = this.exprs;
    }
    if (this.channel_layout) {
      opt['channel_layout'] = this.channel_layout;
    }
    if (this.duration) {
      opt['duration'] = this.duration;
    }
    if (this.nb_samples) {
      opt['nb_samples'] = this.nb_samples;
    }
    if (this.sample_rate) {
      opt['sample_rate'] = this.sample_rate;
    }

    addFilter(this.ffmpeg, {
      filter: 'aevalsrc',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.aevalsrc = aevalsrc;
