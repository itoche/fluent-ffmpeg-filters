const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the paletteuse function.
 *
 *
 * @example
 *  ffmpeg().paletteuse()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the paletteuse function.
 */
function paletteuse(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'paletteuse', function() {
    return new PaletteuseFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class PaletteuseFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    PaletteuseFilter.prototype.withDither = this.dither;
    PaletteuseFilter.prototype.withBayer_scale = this.bayer_scale;
    PaletteuseFilter.prototype.withDiff_mode = this.diff_mode;
    PaletteuseFilter.prototype.withNew = this._new;
  }

  /**
   * 
   * @param val
   */
  dither(val) {
    this._dither = val;
    return this;
  }

  /**
   * When bayer dithering is selected, this option defines the scale of the
   * pattern (how much the crosshatch pattern is visible). A low value means more
   * visible pattern for less banding, and higher value means less visible pattern
   * at the cost of more banding.
   * 
   * The option must be an integer value in the range [0,5]. Default is 2.
   * 
   * 
   * @param val
   */
  bayer_scale(val) {
    this._bayer_scale = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  diff_mode(val) {
    this._diff_mode = val;
    return this;
  }

  /**
   * Take new palette for each output frame.
   * 
   * @param val
   */
  _new(val) {
    this.__new = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._dither) {
      opt['dither'] = this._dither;
    }
    if (this._bayer_scale) {
      opt['bayer_scale'] = this._bayer_scale;
    }
    if (this._diff_mode) {
      opt['diff_mode'] = this._diff_mode;
    }
    if (this.__new) {
      opt['new'] = this.__new;
    }

    addFilter(this.ffmpeg, {
      filter: 'paletteuse',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.paletteuse = paletteuse;
