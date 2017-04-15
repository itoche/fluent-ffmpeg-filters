const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the join function.
 *
 *
 * @example
 *  ffmpeg().join()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the join function.
 */
function join(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'join', function() {
    return new JoinFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class JoinFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    JoinFilter.prototype.withInputs = this.inputs;
    JoinFilter.prototype.withChannel_layout = this.channel_layout;
    JoinFilter.prototype.withMap = this.map;
  }

  /**
   * The number of input streams. It defaults to 2.
   * 
   * 
   * @param val
   */
  inputs(val) {
    this.inputs = val;
    return this;
  }

  /**
   * The desired output channel layout. It defaults to stereo.
   * 
   * 
   * @param val
   */
  channel_layout(val) {
    this.channel_layout = val;
    return this;
  }

  /**
   * Map channels from inputs to output. The argument is a ’|’-separated list of
   * mappings, each in the input_idx.in_channel-out_channel
   * form. input_idx is the 0-based index of the input stream. in_channel
   * can be either the name of the input channel (e.g. FL for front left) or its
   * index in the specified input stream. out_channel is the name of the output
   * channel.
   * 
   * @param val
   */
  map(val) {
    this.map = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.inputs) {
      opt['inputs'] = this.inputs;
    }
    if (this.channel_layout) {
      opt['channel_layout'] = this.channel_layout;
    }
    if (this.map) {
      opt['map'] = this.map;
    }

    addFilter(this.ffmpeg, {
      filter: 'join',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.join = join;
