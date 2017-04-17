const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the zoompan function.
 *
 *
 * @example
 *  ffmpeg().zoompan()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the zoompan function.
 */
function zoompan(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'zoompan', function() {
    return new ZoompanFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ZoompanFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    ZoompanFilter.prototype.withZoom = this.zoom;
    ZoompanFilter.prototype.withX = this.x;
    ZoompanFilter.prototype.withY = this.y;
    ZoompanFilter.prototype.withD = this.d;
    ZoompanFilter.prototype.withS = this.s;
    ZoompanFilter.prototype.withFps = this.fps;
  }

  /**
   * Set the zoom expression. Default is 1.
   * 
   * 
   * @param val
   */
  zoom(val) {
    this.zoom = val;
    return this;
  }

  /**
   * Set the x and y expression. Default is 0.
   * 
   * 
   * @param val
   */
  y(val) {
    this.y = val;
    return this;
  }

  /**
   * Set the x and y expression. Default is 0.
   * 
   * 
   * @param val
   */
  y(val) {
    this.y = val;
    return this;
  }

  /**
   * Set the duration expression in number of frames.
   * This sets for how many number of frames effect will last for
   * single input image.
   * 
   * 
   * @param val
   */
  d(val) {
    this.d = val;
    return this;
  }

  /**
   * Set the output image size, default is ’hd720’.
   * 
   * 
   * @param val
   */
  s(val) {
    this.s = val;
    return this;
  }

  /**
   * Set the output frame rate, default is ’25’.
   * 
   * @param val
   */
  fps(val) {
    this.fps = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.zoom) {
      opt['zoom'] = this.zoom;
    }
    if (this.x) {
      opt['x'] = this.x;
    }
    if (this.y) {
      opt['y'] = this.y;
    }
    if (this.d) {
      opt['d'] = this.d;
    }
    if (this.s) {
      opt['s'] = this.s;
    }
    if (this.fps) {
      opt['fps'] = this.fps;
    }

    addFilter(this.ffmpeg, {
      filter: 'zoompan',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.zoompan = zoompan;
