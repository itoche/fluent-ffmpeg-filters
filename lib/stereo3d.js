const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the stereo3d function.
 *
 *
 * @example
 *  ffmpeg().stereo3d()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the stereo3d function.
 */
function stereo3d(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'stereo3d', function() {
    return new Stereo3dFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class Stereo3dFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Stereo3d.prototype.withIn = in;
    Stereo3d.prototype.withOut = out;
  }

  /**
   * 
   * @param val
   */
  in(val) {
    this.in = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  out(val) {
    this.out = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.in) {
      opt.in = this.in;
    }
    if (this.out) {
      opt.out = this.out;
    }

    addFilter(this.ffmpeg, {
      filter: 'stereo3d',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.stereo3d = stereo3d;
