const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the palettegen function.
 *
 *
 * @example
 *  ffmpeg().palettegen()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the palettegen function.
 */
function palettegen(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'palettegen', function() {
    return new PalettegenFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class PalettegenFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    PalettegenFilter.prototype.withMax_colors = this.max_colors;
    PalettegenFilter.prototype.withReserve_transparent = this.reserve_transparent;
    PalettegenFilter.prototype.withStats_mode = this.stats_mode;
  }

  /**
   * Set the maximum number of colors to quantize in the palette.
   * Note: the palette will still contain 256 colors; the unused palette entries
   * will be black.
   * 
   * 
   * @param val
   */
  max_colors(val) {
    this.max_colors = val;
    return this;
  }

  /**
   * Create a palette of 255 colors maximum and reserve the last one for
   * transparency. Reserving the transparency color is useful for GIF optimization.
   * If not set, the maximum of colors in the palette will be 256. You probably want
   * to disable this option for a standalone image.
   * Set by default.
   * 
   * 
   * @param val
   */
  reserve_transparent(val) {
    this.reserve_transparent = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  stats_mode(val) {
    this.stats_mode = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.max_colors) {
      opt['max_colors'] = this.max_colors;
    }
    if (this.reserve_transparent) {
      opt['reserve_transparent'] = this.reserve_transparent;
    }
    if (this.stats_mode) {
      opt['stats_mode'] = this.stats_mode;
    }

    addFilter(this.ffmpeg, {
      filter: 'palettegen',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.palettegen = palettegen;
