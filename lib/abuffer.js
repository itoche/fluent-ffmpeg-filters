const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the abuffer function.
 *
 *
 * @example
 *  ffmpeg().abuffer()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the abuffer function.
 */
function abuffer(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'abuffer', function() {
    return new AbufferFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AbufferFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    AbufferFilter.prototype.withTime_base = this.time_base;
    AbufferFilter.prototype.withSample_rate = this.sample_rate;
    AbufferFilter.prototype.withSample_fmt = this.sample_fmt;
    AbufferFilter.prototype.withChannel_layout = this.channel_layout;
    AbufferFilter.prototype.withChannels = this.channels;
  }

  /**
   * The timebase which will be used for timestamps of submitted frames. It must be
   * either a floating-point number or in numerator/denominator form.
   * 
   * 
   * @param val
   */
  time_base(val) {
    this._time_base = val;
    return this;
  }

  /**
   * The sample rate of the incoming audio buffers.
   * 
   * 
   * @param val
   */
  sample_rate(val) {
    this._sample_rate = val;
    return this;
  }

  /**
   * The sample format of the incoming audio buffers.
   * Either a sample format name or its corresponding integer representation from
   * the enum AVSampleFormat in libavutil/samplefmt.h
   * 
   * 
   * @param val
   */
  sample_fmt(val) {
    this._sample_fmt = val;
    return this;
  }

  /**
   * The channel layout of the incoming audio buffers.
   * Either a channel layout name from channel_layout_map in
   * libavutil/channel_layout.c or its corresponding integer representation
   * from the AV_CH_LAYOUT_* macros in libavutil/channel_layout.h
   * 
   * 
   * @param val
   */
  channel_layout(val) {
    this._channel_layout = val;
    return this;
  }

  /**
   * The number of channels of the incoming audio buffers.
   * If both channels and channel_layout are specified, then they
   * must be consistent.
   * 
   * 
   * @param val
   */
  channels(val) {
    this._channels = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._time_base) {
      opt['time_base'] = this._time_base;
    }
    if (this._sample_rate) {
      opt['sample_rate'] = this._sample_rate;
    }
    if (this._sample_fmt) {
      opt['sample_fmt'] = this._sample_fmt;
    }
    if (this._channel_layout) {
      opt['channel_layout'] = this._channel_layout;
    }
    if (this._channels) {
      opt['channels'] = this._channels;
    }

    addFilter(this.ffmpeg, {
      filter: 'abuffer',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.abuffer = abuffer;
