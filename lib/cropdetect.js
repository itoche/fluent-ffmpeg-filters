const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the cropdetect function.
 *
 *
 * @example
 *  ffmpeg().cropdetect()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the cropdetect function.
 */
function cropdetect(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'cropdetect', function() {
    return new CropdetectFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class CropdetectFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    CropdetectFilter.prototype.withLimit = limit;
    CropdetectFilter.prototype.withRound = round;
    CropdetectFilter.prototype.withReset_count = reset_count;
  }

  /**
   * Set higher black value threshold, which can be optionally specified
   * from nothing (0) to everything (255 for 8-bit based formats). An intensity
   * value greater to the set value is considered non-black. It defaults to 24.
   * You can also specify a value between 0.0 and 1.0 which will be scaled depending
   * on the bitdepth of the pixel format.
   * 
   * 
   * @param val
   */
  limit(val) {
    this.limit = val;
    return this;
  }

  /**
   * The value which the width/height should be divisible by. It defaults to
   * 16. The offset is automatically adjusted to center the video. Use 2 to
   * get only even dimensions (needed for 4:2:2 video). 16 is best when
   * encoding to most video codecs.
   * 
   * 
   * @param val
   */
  round(val) {
    this.round = val;
    return this;
  }

  /**
   * Set the counter that determines after how many frames cropdetect will
   * reset the previously detected largest video area and start over to
   * detect the current optimal crop area. Default value is 0.
   * 
   * This can be useful when channel logos distort the video area. 0
   * indicates ’never reset’, and returns the largest area encountered during
   * playback.
   * 
   * @param val
   */
  reset_count(val) {
    this.reset_count = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.limit) {
      opt['limit'] = this.limit;
    }
    if (this.round) {
      opt['round'] = this.round;
    }
    if (this.reset_count) {
      opt['reset_count'] = this.reset_count;
    }

    addFilter(this.ffmpeg, {
      filter: 'cropdetect',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.cropdetect = cropdetect;
