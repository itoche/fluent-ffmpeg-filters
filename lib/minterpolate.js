const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the minterpolate function.
 *
 *
 * @example
 *  ffmpeg().minterpolate()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the minterpolate function.
 */
function minterpolate(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'minterpolate', function() {
    return new MinterpolateFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class MinterpolateFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Minterpolate.prototype.withFps = fps;
    Minterpolate.prototype.withMi_mode = mi_mode;
    Minterpolate.prototype.with‘me_mode’ = ‘me_mode’;
    Minterpolate.prototype.with‘me’ = ‘me’;
    Minterpolate.prototype.with‘mb_size’ = ‘mb_size’;
    Minterpolate.prototype.with‘search_param’ = ‘search_param’;
    Minterpolate.prototype.with‘vsbmc’ = ‘vsbmc’;
  }

  /**
   * Specify the output frame rate. This can be rational e.g. 60000/1001. Frames are dropped if fps is lower than source fps. Default 60.
   * 
   * 
   * @param val
   */
  fps(val) {
    this.fps = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  mi_mode(val) {
    this.mi_mode = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  ‘me_mode’(val) {
    this.‘me_mode’ = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  ‘me’(val) {
    this.‘me’ = val;
    return this;
  }

  /**
   * Macroblock size. Default 16.
   * 
   * 
   * @param val
   */
  ‘mb_size’(val) {
    this.‘mb_size’ = val;
    return this;
  }

  /**
   * Motion estimation search parameter. Default 32.
   * 
   * 
   * @param val
   */
  ‘search_param’(val) {
    this.‘search_param’ = val;
    return this;
  }

  /**
   * Enable variable-size block motion compensation. Motion estimation is applied with smaller block sizes at object boundaries in order to make the them less blur. Default is 0 (disabled).
   * 
   * @param val
   */
  ‘vsbmc’(val) {
    this.‘vsbmc’ = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.fps) {
      opt.fps = this.fps;
    }
    if (this.mi_mode) {
      opt.mi_mode = this.mi_mode;
    }
    if (this.‘me_mode’) {
      opt.‘me_mode’ = this.‘me_mode’;
    }
    if (this.‘me’) {
      opt.‘me’ = this.‘me’;
    }
    if (this.‘mb_size’) {
      opt.‘mb_size’ = this.‘mb_size’;
    }
    if (this.‘search_param’) {
      opt.‘search_param’ = this.‘search_param’;
    }
    if (this.‘vsbmc’) {
      opt.‘vsbmc’ = this.‘vsbmc’;
    }

    addFilter(this.ffmpeg, {
      filter: 'minterpolate',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.minterpolate = minterpolate;
