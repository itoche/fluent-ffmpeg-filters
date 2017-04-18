const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the find_rect function.
 *
 *
 * @example
 *  ffmpeg().find_rect()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the find_rect function.
 */
function find_rect(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'find_rect', function() {
    return new Find_rectFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class Find_rectFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Find_rectFilter.prototype.withObject = this.object;
    Find_rectFilter.prototype.withThreshold = this.threshold;
    Find_rectFilter.prototype.withMipmaps = this.mipmaps;
    Find_rectFilter.prototype.withXmin = this.xmin;
  }

  /**
   * Filepath of the object image, needs to be in gray8.
   * 
   * 
   * @param val
   */
  object(val) {
    this._object = val;
    return this;
  }

  /**
   * Detection threshold, default is 0.5.
   * 
   * 
   * @param val
   */
  threshold(val) {
    this._threshold = val;
    return this;
  }

  /**
   * Number of mipmaps, default is 3.
   * 
   * 
   * @param val
   */
  mipmaps(val) {
    this._mipmaps = val;
    return this;
  }

  /**
   * Specifies the rectangle in which to search.
   * 
   * @param val
   */
  xmin(val) {
    this._xmin = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._object) {
      opt['object'] = this._object;
    }
    if (this._threshold) {
      opt['threshold'] = this._threshold;
    }
    if (this._mipmaps) {
      opt['mipmaps'] = this._mipmaps;
    }
    if (this._xmin) {
      opt['xmin'] = this._xmin;
    }

    addFilter(this.ffmpeg, {
      filter: 'find_rect',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.find_rect = find_rect;
