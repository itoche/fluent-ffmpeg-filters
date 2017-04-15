const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the channelsplit function.
 *
 *
 * @example
 *  ffmpeg().channelsplit()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the channelsplit function.
 */
function channelsplit(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'channelsplit', function() {
    return new ChannelsplitFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ChannelsplitFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    ChannelsplitFilter.prototype.withChannel_layout = channel_layout;
  }

  /**
   * The channel layout of the input stream. The default is &quot;stereo&quot;.
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
    if (this.channel_layout) {
      opt['channel_layout'] = this.channel_layout;
    }

    addFilter(this.ffmpeg, {
      filter: 'channelsplit',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.channelsplit = channelsplit;
