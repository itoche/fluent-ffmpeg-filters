const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the erosion function.
 *
 *
 * @example
 *  ffmpeg().erosion()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the erosion function.
 */
function erosion(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'erosion', function() {
    return new ErosionFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ErosionFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    ErosionFilter.prototype.withThreshold0 = this.threshold0;
    ErosionFilter.prototype.withThreshold1 = this.threshold1;
    ErosionFilter.prototype.withThreshold2 = this.threshold2;
    ErosionFilter.prototype.withThreshold3 = this.threshold3;
    ErosionFilter.prototype.withCoordinates = this.coordinates;
  }

  /**
   * Limit the maximum change for each plane, default is 65535.
   * If 0, plane will remain unchanged.
   * 
   * 
   * @param val
   */
  threshold0(val) {
    this.threshold0 = val;
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
    this.threshold1 = val;
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
    this.threshold2 = val;
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
    this.threshold3 = val;
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
    this.coordinates = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.threshold0) {
      opt['threshold0'] = this.threshold0;
    }
    if (this.threshold1) {
      opt['threshold1'] = this.threshold1;
    }
    if (this.threshold2) {
      opt['threshold2'] = this.threshold2;
    }
    if (this.threshold3) {
      opt['threshold3'] = this.threshold3;
    }
    if (this.coordinates) {
      opt['coordinates'] = this.coordinates;
    }

    addFilter(this.ffmpeg, {
      filter: 'erosion',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.erosion = erosion;
