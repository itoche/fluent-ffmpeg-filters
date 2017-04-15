const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the atrim function.
 *
 *
 * @example
 *  ffmpeg().atrim()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the atrim function.
 */
function atrim(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'atrim', function() {
    return new AtrimFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AtrimFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    AtrimFilter.prototype.withStart = this.start;
    AtrimFilter.prototype.withEnd = this.end;
    AtrimFilter.prototype.withStart_pts = this.start_pts;
    AtrimFilter.prototype.withEnd_pts = this.end_pts;
    AtrimFilter.prototype.withDuration = this.duration;
    AtrimFilter.prototype.withStart_sample = this.start_sample;
    AtrimFilter.prototype.withEnd_sample = this.end_sample;
  }

  /**
   * Timestamp (in seconds) of the start of the section to keep. I.e. the audio
   * sample with the timestamp start will be the first sample in the output.
   * 
   * 
   * @param val
   */
  start(val) {
    this.start = val;
    return this;
  }

  /**
   * Specify time of the first audio sample that will be dropped, i.e. the
   * audio sample immediately preceding the one with the timestamp end will be
   * the last sample in the output.
   * 
   * 
   * @param val
   */
  end(val) {
    this.end = val;
    return this;
  }

  /**
   * Same as start, except this option sets the start timestamp in samples
   * instead of seconds.
   * 
   * 
   * @param val
   */
  start_pts(val) {
    this.start_pts = val;
    return this;
  }

  /**
   * Same as end, except this option sets the end timestamp in samples instead
   * of seconds.
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
   * The number of the first sample that should be output.
   * 
   * 
   * @param val
   */
  start_sample(val) {
    this.start_sample = val;
    return this;
  }

  /**
   * The number of the first sample that should be dropped.
   * 
   * @param val
   */
  end_sample(val) {
    this.end_sample = val;
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
    if (this.start_sample) {
      opt['start_sample'] = this.start_sample;
    }
    if (this.end_sample) {
      opt['end_sample'] = this.end_sample;
    }

    addFilter(this.ffmpeg, {
      filter: 'atrim',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.atrim = atrim;
