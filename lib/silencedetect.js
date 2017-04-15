const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the silencedetect function.
 *
 *
 * @example
 *  ffmpeg().silencedetect()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the silencedetect function.
 */
function silencedetect(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'silencedetect', function() {
    return new SilencedetectFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class SilencedetectFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    SilencedetectFilter.prototype.withDuration = this.duration;
    SilencedetectFilter.prototype.withNoise = this.noise;
  }

  /**
   * Set silence duration until notification (default is 2 seconds).
   * 
   * 
   * @param val
   */
  duration(val) {
    this.duration = val;
    return this;
  }

  /**
   * Set noise tolerance. Can be specified in dB (in case &quot;dB&quot; is appended to the
   * specified value) or amplitude ratio. Default is -60dB, or 0.001.
   * 
   * @param val
   */
  noise(val) {
    this.noise = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.duration) {
      opt['duration'] = this.duration;
    }
    if (this.noise) {
      opt['noise'] = this.noise;
    }

    addFilter(this.ffmpeg, {
      filter: 'silencedetect',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.silencedetect = silencedetect;
