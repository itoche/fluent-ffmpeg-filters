const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the lut3d function.
 *
 *
 * @example
 *  ffmpeg().lut3d()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the lut3d function.
 */
function lut3d(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'lut3d', function() {
    return new Lut3dFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class Lut3dFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Lut3dFilter.prototype.withFile = this.file;
    Lut3dFilter.prototype.withInterp = this.interp;
  }

  /**
   * 
   * @param val
   */
  file(val) {
    this._file = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  interp(val) {
    this._interp = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._file) {
      opt['file'] = this._file;
    }
    if (this._interp) {
      opt['interp'] = this._interp;
    }

    addFilter(this.ffmpeg, {
      filter: 'lut3d',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.lut3d = lut3d;
