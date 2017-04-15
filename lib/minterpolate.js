const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the minterpolate function.
 *
 *
 * @example
 *  ffmpeg().minterpolate()
 *    ...             // call filter configuration functions
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
    MinterpolateFilter.prototype.withFps = fps;
    MinterpolateFilter.prototype.withMi_mode = mi_mode;
    MinterpolateFilter.prototype.with_me_mode_ = _me_mode_;
    MinterpolateFilter.prototype.with_me_ = _me_;
    MinterpolateFilter.prototype.with_mb_size_ = _mb_size_;
    MinterpolateFilter.prototype.with_search_param_ = _search_param_;
    MinterpolateFilter.prototype.with_vsbmc_ = _vsbmc_;
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
  _me_mode_(val) {
    this._me_mode_ = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  _me_(val) {
    this._me_ = val;
    return this;
  }

  /**
   * Macroblock size. Default 16.
   * 
   * 
   * @param val
   */
  _mb_size_(val) {
    this._mb_size_ = val;
    return this;
  }

  /**
   * Motion estimation search parameter. Default 32.
   * 
   * 
   * @param val
   */
  _search_param_(val) {
    this._search_param_ = val;
    return this;
  }

  /**
   * Enable variable-size block motion compensation. Motion estimation is applied with smaller block sizes at object boundaries in order to make the them less blur. Default is 0 (disabled).
   * 
   * @param val
   */
  _vsbmc_(val) {
    this._vsbmc_ = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.fps) {
      opt['fps'] = this.fps;
    }
    if (this.mi_mode) {
      opt['mi_mode'] = this.mi_mode;
    }
    if (this._me_mode_) {
      opt['‘me_mode’'] = this._me_mode_;
    }
    if (this._me_) {
      opt['‘me’'] = this._me_;
    }
    if (this._mb_size_) {
      opt['‘mb_size’'] = this._mb_size_;
    }
    if (this._search_param_) {
      opt['‘search_param’'] = this._search_param_;
    }
    if (this._vsbmc_) {
      opt['‘vsbmc’'] = this._vsbmc_;
    }

    addFilter(this.ffmpeg, {
      filter: 'minterpolate',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.minterpolate = minterpolate;
