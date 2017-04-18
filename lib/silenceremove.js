const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the silenceremove function.
 *
 *
 * @example
 *  ffmpeg().silenceremove()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the silenceremove function.
 */
function silenceremove(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'silenceremove', function() {
    return new SilenceremoveFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class SilenceremoveFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    SilenceremoveFilter.prototype.withStart_periods = this.start_periods;
    SilenceremoveFilter.prototype.withStart_duration = this.start_duration;
    SilenceremoveFilter.prototype.withStart_threshold = this.start_threshold;
    SilenceremoveFilter.prototype.withStop_periods = this.stop_periods;
    SilenceremoveFilter.prototype.withStop_duration = this.stop_duration;
    SilenceremoveFilter.prototype.withStop_threshold = this.stop_threshold;
    SilenceremoveFilter.prototype.withLeave_silence = this.leave_silence;
    SilenceremoveFilter.prototype.withDetection = this.detection;
    SilenceremoveFilter.prototype.withWindow = this.window;
  }

  /**
   * This value is used to indicate if audio should be trimmed at beginning of
   * the audio. A value of zero indicates no silence should be trimmed from the
   * beginning. When specifying a non-zero value, it trims audio up until it
   * finds non-silence. Normally, when trimming silence from beginning of audio
   * the start_periods will be 1 but it can be increased to higher
   * values to trim all audio up to specific count of non-silence periods.
   * Default value is 0.
   * 
   * 
   * @param val
   */
  start_periods(val) {
    this._start_periods = val;
    return this;
  }

  /**
   * Specify the amount of time that non-silence must be detected before it stops
   * trimming audio. By increasing the duration, bursts of noises can be treated
   * as silence and trimmed off. Default value is 0.
   * 
   * 
   * @param val
   */
  start_duration(val) {
    this._start_duration = val;
    return this;
  }

  /**
   * This indicates what sample value should be treated as silence. For digital
   * audio, a value of 0 may be fine but for audio recorded from analog,
   * you may wish to increase the value to account for background noise.
   * Can be specified in dB (in case &quot;dB&quot; is appended to the specified value)
   * or amplitude ratio. Default value is 0.
   * 
   * 
   * @param val
   */
  start_threshold(val) {
    this._start_threshold = val;
    return this;
  }

  /**
   * Set the count for trimming silence from the end of audio.
   * To remove silence from the middle of a file, specify a stop_periods
   * that is negative. This value is then treated as a positive value and is
   * used to indicate the effect should restart processing as specified by
   * start_periods, making it suitable for removing periods of silence
   * in the middle of the audio.
   * Default value is 0.
   * 
   * 
   * @param val
   */
  stop_periods(val) {
    this._stop_periods = val;
    return this;
  }

  /**
   * Specify a duration of silence that must exist before audio is not copied any
   * more. By specifying a higher duration, silence that is wanted can be left in
   * the audio.
   * Default value is 0.
   * 
   * 
   * @param val
   */
  stop_duration(val) {
    this._stop_duration = val;
    return this;
  }

  /**
   * This is the same as start_threshold but for trimming silence from
   * the end of audio.
   * Can be specified in dB (in case &quot;dB&quot; is appended to the specified value)
   * or amplitude ratio. Default value is 0.
   * 
   * 
   * @param val
   */
  stop_threshold(val) {
    this._stop_threshold = val;
    return this;
  }

  /**
   * This indicates that stop_duration length of audio should be left intact
   * at the beginning of each period of silence.
   * For example, if you want to remove long pauses between words but do not want
   * to remove the pauses completely. Default value is 0.
   * 
   * 
   * @param val
   */
  leave_silence(val) {
    this._leave_silence = val;
    return this;
  }

  /**
   * Set how is silence detected. Can be rms or peak. Second is faster
   * and works better with digital silence which is exactly 0.
   * Default value is rms.
   * 
   * 
   * @param val
   */
  detection(val) {
    this._detection = val;
    return this;
  }

  /**
   * Set ratio used to calculate size of window for detecting silence.
   * Default value is 0.02. Allowed range is from 0 to 10.
   * 
   * @param val
   */
  window(val) {
    this._window = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._start_periods) {
      opt['start_periods'] = this._start_periods;
    }
    if (this._start_duration) {
      opt['start_duration'] = this._start_duration;
    }
    if (this._start_threshold) {
      opt['start_threshold'] = this._start_threshold;
    }
    if (this._stop_periods) {
      opt['stop_periods'] = this._stop_periods;
    }
    if (this._stop_duration) {
      opt['stop_duration'] = this._stop_duration;
    }
    if (this._stop_threshold) {
      opt['stop_threshold'] = this._stop_threshold;
    }
    if (this._leave_silence) {
      opt['leave_silence'] = this._leave_silence;
    }
    if (this._detection) {
      opt['detection'] = this._detection;
    }
    if (this._window) {
      opt['window'] = this._window;
    }

    addFilter(this.ffmpeg, {
      filter: 'silenceremove',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.silenceremove = silenceremove;
