const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the drawgrid function.
 *
 *
 * @example
 *  ffmpeg().drawgrid()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the drawgrid function.
 */
function drawgrid(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'drawgrid', function() {
    return new DrawgridFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class DrawgridFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    DrawgridFilter.prototype.withX = this.x;
    DrawgridFilter.prototype.withY = this.y;
    DrawgridFilter.prototype.withWidth = this.width;
    DrawgridFilter.prototype.withHeight = this.height;
    DrawgridFilter.prototype.withColor = this.color;
    DrawgridFilter.prototype.withThickness = this.thickness;
  }

  /**
   * The expressions which specify the coordinates of some point of grid intersection (meant to configure offset). Both default to 0.
   * 
   * 
   * @param val
   */
  x(val) {
    this._x = val;
    return this;
  }

  /**
   * The expressions which specify the coordinates of some point of grid intersection (meant to configure offset). Both default to 0.
   * 
   * 
   * @param val
   */
  y(val) {
    this._y = val;
    return this;
  }

  /**
   * The expressions which specify the width and height of the grid cell, if 0 they are interpreted as the
   * input width and height, respectively, minus thickness, so image gets
   * framed. Default to 0.
   * 
   * 
   * @param val
   */
  width(val) {
    this._width = val;
    return this;
  }

  /**
   * The expressions which specify the width and height of the grid cell, if 0 they are interpreted as the
   * input width and height, respectively, minus thickness, so image gets
   * framed. Default to 0.
   * 
   * 
   * @param val
   */
  height(val) {
    this._height = val;
    return this;
  }

  /**
   * Specify the color of the grid. For the general syntax of this option,
   * check the &quot;Color&quot; section in the ffmpeg-utils manual. If the special
   * value invert is used, the grid color is the same as the
   * video with inverted luma.
   * 
   * 
   * @param val
   */
  color(val) {
    this._color = val;
    return this;
  }

  /**
   * The expression which sets the thickness of the grid line. Default value is 1.
   * 
   * See below for the list of accepted constants.
   * 
   * @param val
   */
  thickness(val) {
    this._thickness = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._x) {
      opt['x'] = this._x;
    }
    if (this._y) {
      opt['y'] = this._y;
    }
    if (this._width) {
      opt['width'] = this._width;
    }
    if (this._height) {
      opt['height'] = this._height;
    }
    if (this._color) {
      opt['color'] = this._color;
    }
    if (this._thickness) {
      opt['thickness'] = this._thickness;
    }

    addFilter(this.ffmpeg, {
      filter: 'drawgrid',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.drawgrid = drawgrid;
