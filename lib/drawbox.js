const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the drawbox function.
 *
 *
 * @example
 *  ffmpeg().drawbox()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the drawbox function.
 */
function drawbox(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'drawbox', function() {
    return new DrawboxFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class DrawboxFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Drawbox.prototype.withY = y;
    Drawbox.prototype.withHeight = height;
    Drawbox.prototype.withColor = color;
    Drawbox.prototype.withThickness = thickness;
  }

  /**
   * The expressions which specify the top left corner coordinates of the box. It defaults to 0.
   * 
   * 
   * @param val
   */
  y(val) {
    this.y = val;
    return this;
  }

  /**
   * The expressions which specify the width and height of the box; if 0 they are interpreted as
   * the input width and height. It defaults to 0.
   * 
   * 
   * @param val
   */
  height(val) {
    this.height = val;
    return this;
  }

  /**
   * Specify the color of the box to write. For the general syntax of this option,
   * check the &quot;Color&quot; section in the ffmpeg-utils manual. If the special
   * value invert is used, the box edge color is the same as the
   * video with inverted luma.
   * 
   * 
   * @param val
   */
  color(val) {
    this.color = val;
    return this;
  }

  /**
   * The expression which sets the thickness of the box edge. Default value is 3.
   * 
   * See below for the list of accepted constants.
   * 
   * @param val
   */
  thickness(val) {
    this.thickness = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.y) {
      opt.y = this.y;
    }
    if (this.height) {
      opt.height = this.height;
    }
    if (this.color) {
      opt.color = this.color;
    }
    if (this.thickness) {
      opt.thickness = this.thickness;
    }

    addFilter(this.ffmpeg, {
      filter: 'drawbox',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.drawbox = drawbox;
