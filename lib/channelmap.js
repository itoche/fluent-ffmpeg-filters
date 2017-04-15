const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the channelmap function.
 *
 *
 * @example
 *  ffmpeg().channelmap()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the channelmap function.
 */
function channelmap(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'channelmap', function() {
    return new ChannelmapFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ChannelmapFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    ChannelmapFilter.prototype.withMap = this.map;
    ChannelmapFilter.prototype.withChannel_layout = this.channel_layout;
  }

  /**
   * Map channels from input to output. The argument is a ’|’-separated list of
   * mappings, each in the in_channel-out_channel or
   * in_channel form. in_channel can be either the name of the input
   * channel (e.g. FL for front left) or its index in the input channel layout.
   * out_channel is the name of the output channel or its index in the output
   * channel layout. If out_channel is not given then it is implicitly an
   * index, starting with zero and increasing by one for each mapping.
   * 
   * 
   * @param val
   */
  map(val) {
    this.map = val;
    return this;
  }

  /**
   * The channel layout of the output stream.
   * 
   * @param val
   */
  channel_layout(val) {
    this.channel_layout = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.map) {
      opt['map'] = this.map;
    }
    if (this.channel_layout) {
      opt['channel_layout'] = this.channel_layout;
    }

    addFilter(this.ffmpeg, {
      filter: 'channelmap',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.channelmap = channelmap;
