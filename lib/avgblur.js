const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the avgblur function.
 *
 *
 * @example
 *  ffmpeg().avgblur()
 *    ...             // call filter configuration functions
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
    AvgblurFilter.prototype.withSizeX = this.sizeX;
    AvgblurFilter.prototype.withPlanes = this.planes;
    AvgblurFilter.prototype.withSizeY = this.sizeY;
  }

  /**
   * Set horizontal kernel size.
   * 
   * 
   * @param val
   */
  sizeX(val) {
    this._sizeX = val;
    return this;
  }

  /**
   * Set which planes to filter. By default all planes are filtered.
   * 
   * 
   * @param val
   */
  planes(val) {
    this._planes = val;
    return this;
  }

  /**
   * Set vertical kernel size, if zero it will be same as sizeX.
   * Default is 0.
   * 
   * @param val
   */
  sizeY(val) {
    this._sizeY = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._sizeX) {
      opt['sizeX'] = this._sizeX;
    }
    if (this._planes) {
      opt['planes'] = this._planes;
    }
    if (this._sizeY) {
      opt['sizeY'] = this._sizeY;
    }

    addFilter(this.ffmpeg, {
      filter: 'avgblur',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.avgblur = avgblur;
