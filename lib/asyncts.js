const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the asyncts function.
 *
 *
 * @example
 *  ffmpeg().asyncts()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the asyncts function.
 */
function asyncts(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'asyncts', function() {
    return new AsynctsFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AsynctsFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Asyncts.prototype.withCompensate = compensate;
    Asyncts.prototype.withMin_delta = min_delta;
    Asyncts.prototype.withMax_comp = max_comp;
    Asyncts.prototype.withFirst_pts = first_pts;
  }

  /**
   * Enable stretching/squeezing the data to make it match the timestamps. Disabled
   * by default. When disabled, time gaps are covered with silence.
   * 
   * 
   * @param val
   */
  compensate(val) {
    this.compensate = val;
    return this;
  }

  /**
   * The minimum difference between timestamps and audio data (in seconds) to trigger
   * adding/dropping samples. The default value is 0.1. If you get an imperfect
   * sync with this filter, try setting this parameter to 0.
   * 
   * 
   * @param val
   */
  min_delta(val) {
    this.min_delta = val;
    return this;
  }

  /**
   * The maximum compensation in samples per second. Only relevant with compensate&#x3D;1.
   * The default value is 500.
   * 
   * 
   * @param val
   */
  max_comp(val) {
    this.max_comp = val;
    return this;
  }

  /**
   * Assume that the first PTS should be this value. The time base is 1 / sample
   * rate. This allows for padding/trimming at the start of the stream. By default,
   * no assumption is made about the first frame’s expected PTS, so no padding or
   * trimming is done. For example, this could be set to 0 to pad the beginning with
   * silence if an audio stream starts after the video stream or to trim any samples
   * with a negative PTS due to encoder delay.
   * 
   * 
   * @param val
   */
  first_pts(val) {
    this.first_pts = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.compensate) {
      opt.compensate = this.compensate;
    }
    if (this.min_delta) {
      opt.min_delta = this.min_delta;
    }
    if (this.max_comp) {
      opt.max_comp = this.max_comp;
    }
    if (this.first_pts) {
      opt.first_pts = this.first_pts;
    }

    addFilter(this.ffmpeg, {
      filter: 'asyncts',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.asyncts = asyncts;
