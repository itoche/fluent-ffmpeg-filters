const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the apad function.
 *
 *
 * @example
 *  ffmpeg().apad()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the apad function.
 */
function apad(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'apad', function() {
    return new ApadFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ApadFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    ApadFilter.prototype.withPacket_size = this.packet_size;
    ApadFilter.prototype.withPad_len = this.pad_len;
    ApadFilter.prototype.withWhole_len = this.whole_len;
  }

  /**
   * Set silence packet size. Default value is 4096.
   * 
   * 
   * @param val
   */
  packet_size(val) {
    this.packet_size = val;
    return this;
  }

  /**
   * Set the number of samples of silence to add to the end. After the
   * value is reached, the stream is terminated. This option is mutually
   * exclusive with whole_len.
   * 
   * 
   * @param val
   */
  pad_len(val) {
    this.pad_len = val;
    return this;
  }

  /**
   * Set the minimum total number of samples in the output audio stream. If
   * the value is longer than the input audio length, silence is added to
   * the end, until the value is reached. This option is mutually exclusive
   * with pad_len.
   * 
   * @param val
   */
  whole_len(val) {
    this.whole_len = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.packet_size) {
      opt['packet_size'] = this.packet_size;
    }
    if (this.pad_len) {
      opt['pad_len'] = this.pad_len;
    }
    if (this.whole_len) {
      opt['whole_len'] = this.whole_len;
    }

    addFilter(this.ffmpeg, {
      filter: 'apad',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.apad = apad;
