const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the mptestsrc function.
 *
 *
 * @example
 *  ffmpeg().mptestsrc()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the mptestsrc function.
 */
function mptestsrc(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'mptestsrc', function() {
    return new MptestsrcFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class MptestsrcFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    MptestsrcFilter.prototype.withRate = this.rate;
    MptestsrcFilter.prototype.withDuration = this.duration;
    MptestsrcFilter.prototype.withTest = this.test;
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
   * 
   * @param val
   */
  test(val) {
    this.test = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.rate) {
      opt['rate'] = this.rate;
    }
    if (this.duration) {
      opt['duration'] = this.duration;
    }
    if (this.test) {
      opt['test'] = this.test;
    }

    addFilter(this.ffmpeg, {
      filter: 'mptestsrc',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.mptestsrc = mptestsrc;
