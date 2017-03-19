const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the avgblur function.
 *
 *
 * @example
 *  ffmpeg().avgblur()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the avgblur function.
 */
function avgblur(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'avgblur', function() {
    return new AvgblurFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AvgblurFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Avgblur.prototype.withSizeX = sizeX;
    Avgblur.prototype.withPlanes = planes;
    Avgblur.prototype.withSizeY = sizeY;
  }

  /**
   * Set horizontal kernel size.
   * 
   * 
   * @param val
   */
  sizeX(val) {
    this.sizeX = val;
    return this;
  }

  /**
   * Set which planes to filter. By default all planes are filtered.
   * 
   * 
   * @param val
   */
  planes(val) {
    this.planes = val;
    return this;
  }

  /**
   * Set vertical kernel size, if zero it will be same as sizeX.
   * Default is 0.
   * 
   * @param val
   */
  sizeY(val) {
    this.sizeY = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.sizeX) {
      opt.sizeX = this.sizeX;
    }
    if (this.planes) {
      opt.planes = this.planes;
    }
    if (this.sizeY) {
      opt.sizeY = this.sizeY;
    }

    addFilter(this.ffmpeg, {
      filter: 'avgblur',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.avgblur = avgblur;
