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
    AevalsrcFilter.prototype.withExprs = this.exprs;
    AevalsrcFilter.prototype.withChannel_layout = this.channel_layout;
    AevalsrcFilter.prototype.withDuration = this.duration;
    AevalsrcFilter.prototype.withNb_samples = this.nb_samples;
    AevalsrcFilter.prototype.withSample_rate = this.sample_rate;
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
    this._exprs = val;
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
    this._channel_layout = val;
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
    this._duration = val;
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
    this._nb_samples = val;
    return this;
  }

  /**
   * Specify the sample rate, default to 44100.
   * 
   * @param val
   */
  sample_rate(val) {
    this._sample_rate = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._exprs) {
      opt['exprs'] = this._exprs;
    }
    if (this._channel_layout) {
      opt['channel_layout'] = this._channel_layout;
    }
    if (this._duration) {
      opt['duration'] = this._duration;
    }
    if (this._nb_samples) {
      opt['nb_samples'] = this._nb_samples;
    }
    if (this._sample_rate) {
      opt['sample_rate'] = this._sample_rate;
    }

    addFilter(this.ffmpeg, {
      filter: 'aevalsrc',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.aevalsrc = aevalsrc;
