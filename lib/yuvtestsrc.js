const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the yuvtestsrc function.
 *
 *
 * @example
 *  ffmpeg().yuvtestsrc()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the yuvtestsrc function.
 */
function yuvtestsrc(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'yuvtestsrc', function() {
    return new YuvtestsrcFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class YuvtestsrcFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Yuvtestsrc.prototype.withColor = color;
    Yuvtestsrc.prototype.withLevel = level;
    Yuvtestsrc.prototype.withSize = size;
    Yuvtestsrc.prototype.withRate = rate;
    Yuvtestsrc.prototype.withSar = sar;
    Yuvtestsrc.prototype.withDuration = duration;
    Yuvtestsrc.prototype.withDecimals = decimals;
  }

  /**
   * Specify the color of the source, only available in the color
   * source. For the syntax of this option, check the &quot;Color&quot; section in the
   * ffmpeg-utils manual.
   * 
   * 
   * @param val
   */
  color(val) {
    this.color = val;
    return this;
  }

  /**
   * Specify the level of the Hald CLUT, only available in the haldclutsrc
   * source. A level of N generates a picture of N*N*N by N*N*N
   * pixels to be used as identity matrix for 3D lookup tables. Each component is
   * coded on a 1/(N*N) scale.
   * 
   * 
   * @param val
   */
  level(val) {
    this.level = val;
    return this;
  }

  /**
   * Specify the size of the sourced video. For the syntax of this option, check the
   * (ffmpeg-utils)&quot;Video size&quot; section in the ffmpeg-utils manual.
   * The default value is 320x240.
   * 
   * This option is not available with the haldclutsrc filter.
   * 
   * 
   * @param val
   */
  size(val) {
    this.size = val;
    return this;
  }

  /**
   * Specify the frame rate of the sourced video, as the number of frames
   * generated per second. It has to be a string in the format
   * frame_rate_num/frame_rate_den, an integer number, a floating point
   * number or a valid video frame rate abbreviation. The default value is
   * &quot;25&quot;.
   * 
   * 
   * @param val
   */
  rate(val) {
    this.rate = val;
    return this;
  }

  /**
   * Set the sample aspect ratio of the sourced video.
   * 
   * 
   * @param val
   */
  sar(val) {
    this.sar = val;
    return this;
  }

  /**
   * Set the duration of the sourced video. See
   * (ffmpeg-utils)the Time duration section in the ffmpeg-utils(1) manual
   * for the accepted syntax.
   * 
   * If not specified, or the expressed duration is negative, the video is
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
   * Set the number of decimals to show in the timestamp, only available in the
   * testsrc source.
   * 
   * The displayed timestamp value will correspond to the original
   * timestamp value multiplied by the power of 10 of the specified
   * value. Default value is 0.
   * 
   * @param val
   */
  decimals(val) {
    this.decimals = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.color) {
      opt['color'] = this.color;
    }
    if (this.level) {
      opt['level'] = this.level;
    }
    if (this.size) {
      opt['size'] = this.size;
    }
    if (this.rate) {
      opt['rate'] = this.rate;
    }
    if (this.sar) {
      opt['sar'] = this.sar;
    }
    if (this.duration) {
      opt['duration'] = this.duration;
    }
    if (this.decimals) {
      opt['decimals'] = this.decimals;
    }

    addFilter(this.ffmpeg, {
      filter: 'yuvtestsrc',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.yuvtestsrc = yuvtestsrc;
