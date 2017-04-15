const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the datascope function.
 *
 *
 * @example
 *  ffmpeg().datascope()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the datascope function.
 */
function datascope(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'datascope', function() {
    return new DatascopeFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class DatascopeFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    DatascopeFilter.prototype.withSize = size;
    DatascopeFilter.prototype.withX = x;
    DatascopeFilter.prototype.withY = y;
    DatascopeFilter.prototype.withMode = mode;
    DatascopeFilter.prototype.withAxis = axis;
    DatascopeFilter.prototype.withOpacity = opacity;
  }

  /**
   * Set output video size.
   * 
   * 
   * @param val
   */
  size(val) {
    this.size = val;
    return this;
  }

  /**
   * Set x offset from where to pick pixels.
   * 
   * 
   * @param val
   */
  x(val) {
    this.x = val;
    return this;
  }

  /**
   * Set y offset from where to pick pixels.
   * 
   * 
   * @param val
   */
  y(val) {
    this.y = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  mode(val) {
    this.mode = val;
    return this;
  }

  /**
   * Draw rows and columns numbers on left and top of video.
   * 
   * 
   * @param val
   */
  axis(val) {
    this.axis = val;
    return this;
  }

  /**
   * Set background opacity.
   * 
   * @param val
   */
  opacity(val) {
    this.opacity = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.size) {
      opt['size'] = this.size;
    }
    if (this.x) {
      opt['x'] = this.x;
    }
    if (this.y) {
      opt['y'] = this.y;
    }
    if (this.mode) {
      opt['mode'] = this.mode;
    }
    if (this.axis) {
      opt['axis'] = this.axis;
    }
    if (this.opacity) {
      opt['opacity'] = this.opacity;
    }

    addFilter(this.ffmpeg, {
      filter: 'datascope',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.datascope = datascope;
