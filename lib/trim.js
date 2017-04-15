const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the trim function.
 *
 *
 * @example
 *  ffmpeg().trim()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the trim function.
 */
function trim(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'trim', function() {
    return new TrimFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class TrimFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Trim.prototype.withStart = start;
    Trim.prototype.withEnd = end;
    Trim.prototype.withStart_pts = start_pts;
    Trim.prototype.withEnd_pts = end_pts;
    Trim.prototype.withDuration = duration;
    Trim.prototype.withStart_frame = start_frame;
    Trim.prototype.withEnd_frame = end_frame;
  }

  /**
   * Specify the time of the start of the kept section, i.e. the frame with the
   * timestamp start will be the first frame in the output.
   * 
   * 
   * @param val
   */
  start(val) {
    this.start = val;
    return this;
  }

  /**
   * Specify the time of the first frame that will be dropped, i.e. the frame
   * immediately preceding the one with the timestamp end will be the last
   * frame in the output.
   * 
   * 
   * @param val
   */
  end(val) {
    this.end = val;
    return this;
  }

  /**
   * This is the same as start, except this option sets the start timestamp
   * in timebase units instead of seconds.
   * 
   * 
   * @param val
   */
  start_pts(val) {
    this.start_pts = val;
    return this;
  }

  /**
   * This is the same as end, except this option sets the end timestamp
   * in timebase units instead of seconds.
   * 
   * 
   * @param val
   */
  end_pts(val) {
    this.end_pts = val;
    return this;
  }

  /**
   * The maximum duration of the output in seconds.
   * 
   * 
   * @param val
   */
  duration(val) {
    this.duration = val;
    return this;
  }

  /**
   * The number of the first frame that should be passed to the output.
   * 
   * 
   * @param val
   */
  start_frame(val) {
    this.start_frame = val;
    return this;
  }

  /**
   * The number of the first frame that should be dropped.
   * 
   * @param val
   */
  end_frame(val) {
    this.end_frame = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.start) {
      opt['start'] = this.start;
    }
    if (this.end) {
      opt['end'] = this.end;
    }
    if (this.start_pts) {
      opt['start_pts'] = this.start_pts;
    }
    if (this.end_pts) {
      opt['end_pts'] = this.end_pts;
    }
    if (this.duration) {
      opt['duration'] = this.duration;
    }
    if (this.start_frame) {
      opt['start_frame'] = this.start_frame;
    }
    if (this.end_frame) {
      opt['end_frame'] = this.end_frame;
    }

    addFilter(this.ffmpeg, {
      filter: 'trim',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.trim = trim;
