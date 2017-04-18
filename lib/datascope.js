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
    DatascopeFilter.prototype.withSize = this.size;
    DatascopeFilter.prototype.withX = this.x;
    DatascopeFilter.prototype.withY = this.y;
    DatascopeFilter.prototype.withMode = this.mode;
    DatascopeFilter.prototype.withAxis = this.axis;
    DatascopeFilter.prototype.withOpacity = this.opacity;
  }

  /**
   * Set output video size.
   * 
   * 
   * @param val
   */
  size(val) {
    this._size = val;
    return this;
  }

  /**
   * Set x offset from where to pick pixels.
   * 
   * 
   * @param val
   */
  x(val) {
    this._x = val;
    return this;
  }

  /**
   * Set y offset from where to pick pixels.
   * 
   * 
   * @param val
   */
  y(val) {
    this._y = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  mode(val) {
    this._mode = val;
    return this;
  }

  /**
   * Draw rows and columns numbers on left and top of video.
   * 
   * 
   * @param val
   */
  axis(val) {
    this._axis = val;
    return this;
  }

  /**
   * Set background opacity.
   * 
   * @param val
   */
  opacity(val) {
    this._opacity = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._size) {
      opt['size'] = this._size;
    }
    if (this._x) {
      opt['x'] = this._x;
    }
    if (this._y) {
      opt['y'] = this._y;
    }
    if (this._mode) {
      opt['mode'] = this._mode;
    }
    if (this._axis) {
      opt['axis'] = this._axis;
    }
    if (this._opacity) {
      opt['opacity'] = this._opacity;
    }

    addFilter(this.ffmpeg, {
      filter: 'datascope',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.datascope = datascope;
