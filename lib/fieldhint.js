const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the fieldhint function.
 *
 *
 * @example
 *  ffmpeg().fieldhint()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the fieldhint function.
 */
function fieldhint(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'fieldhint', function() {
    return new FieldhintFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class FieldhintFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Fieldhint.prototype.withHint = hint;
    Fieldhint.prototype.withMode = mode;
  }

  /**
   * Set file containing hints: absolute/relative frame numbers.
   * 
   * There must be one line for each frame in a clip. Each line must contain two
   * numbers separated by the comma, optionally followed by - or +.
   * Numbers supplied on each line of file can not be out of [N-1,N+1] where N
   * is current frame number for absolute mode or out of [-1, 1] range
   * for relative mode. First number tells from which frame to pick up top
   * field and second number tells from which frame to pick up bottom field.
   * 
   * If optionally followed by + output frame will be marked as interlaced,
   * else if followed by - output frame will be marked as progressive, else
   * it will be marked same as input frame.
   * If line starts with # or ; that line is skipped.
   * 
   * 
   * @param val
   */
  hint(val) {
    this.hint = val;
    return this;
  }

  /**
   * Can be item absolute or relative. Default is absolute.
   * 
   * @param val
   */
  mode(val) {
    this.mode = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.hint) {
      opt.hint = this.hint;
    }
    if (this.mode) {
      opt.mode = this.mode;
    }

    addFilter(this.ffmpeg, {
      filter: 'fieldhint',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.fieldhint = fieldhint;
