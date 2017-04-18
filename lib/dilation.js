const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the dilation function.
 *
 *
 * @example
 *  ffmpeg().dilation()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the dilation function.
 */
function dilation(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'dilation', function() {
    return new DilationFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class DilationFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    DilationFilter.prototype.withThreshold0 = this.threshold0;
    DilationFilter.prototype.withThreshold1 = this.threshold1;
    DilationFilter.prototype.withThreshold2 = this.threshold2;
    DilationFilter.prototype.withThreshold3 = this.threshold3;
    DilationFilter.prototype.withCoordinates = this.coordinates;
  }

  /**
   * Limit the maximum change for each plane, default is 65535.
   * If 0, plane will remain unchanged.
   * 
   * 
   * @param val
   */
  threshold0(val) {
    this._threshold0 = val;
    return this;
  }

  /**
   * Limit the maximum change for each plane, default is 65535.
   * If 0, plane will remain unchanged.
   * 
   * 
   * @param val
   */
  threshold1(val) {
    this._threshold1 = val;
    return this;
  }

  /**
   * Limit the maximum change for each plane, default is 65535.
   * If 0, plane will remain unchanged.
   * 
   * 
   * @param val
   */
  threshold2(val) {
    this._threshold2 = val;
    return this;
  }

  /**
   * Limit the maximum change for each plane, default is 65535.
   * If 0, plane will remain unchanged.
   * 
   * 
   * @param val
   */
  threshold3(val) {
    this._threshold3 = val;
    return this;
  }

  /**
   * Flag which specifies the pixel to refer to. Default is 255 i.e. all eight
   * pixels are used.
   * 
   * Flags to local 3x3 coordinates maps like this:
   * 
   * 1 2 3
   *     4   5
   *     6 7 8
   * 
   * @param val
   */
  coordinates(val) {
    this._coordinates = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._threshold0) {
      opt['threshold0'] = this._threshold0;
    }
    if (this._threshold1) {
      opt['threshold1'] = this._threshold1;
    }
    if (this._threshold2) {
      opt['threshold2'] = this._threshold2;
    }
    if (this._threshold3) {
      opt['threshold3'] = this._threshold3;
    }
    if (this._coordinates) {
      opt['coordinates'] = this._coordinates;
    }

    addFilter(this.ffmpeg, {
      filter: 'dilation',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.dilation = dilation;
