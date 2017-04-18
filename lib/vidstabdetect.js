const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the vidstabdetect function.
 *
 *
 * @example
 *  ffmpeg().vidstabdetect()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the vidstabdetect function.
 */
function vidstabdetect(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'vidstabdetect', function() {
    return new VidstabdetectFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class VidstabdetectFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    VidstabdetectFilter.prototype.withResult = this.result;
    VidstabdetectFilter.prototype.withShakiness = this.shakiness;
    VidstabdetectFilter.prototype.withAccuracy = this.accuracy;
    VidstabdetectFilter.prototype.withStepsize = this.stepsize;
    VidstabdetectFilter.prototype.withMincontrast = this.mincontrast;
    VidstabdetectFilter.prototype.withTripod = this.tripod;
    VidstabdetectFilter.prototype.withShow = this.show;
  }

  /**
   * Set the path to the file used to write the transforms information.
   * Default value is transforms.trf.
   * 
   * 
   * @param val
   */
  result(val) {
    this._result = val;
    return this;
  }

  /**
   * Set how shaky the video is and how quick the camera is. It accepts an
   * integer in the range 1-10, a value of 1 means little shakiness, a
   * value of 10 means strong shakiness. Default value is 5.
   * 
   * 
   * @param val
   */
  shakiness(val) {
    this._shakiness = val;
    return this;
  }

  /**
   * Set the accuracy of the detection process. It must be a value in the
   * range 1-15. A value of 1 means low accuracy, a value of 15 means high
   * accuracy. Default value is 15.
   * 
   * 
   * @param val
   */
  accuracy(val) {
    this._accuracy = val;
    return this;
  }

  /**
   * Set stepsize of the search process. The region around minimum is
   * scanned with 1 pixel resolution. Default value is 6.
   * 
   * 
   * @param val
   */
  stepsize(val) {
    this._stepsize = val;
    return this;
  }

  /**
   * Set minimum contrast. Below this value a local measurement field is
   * discarded. Must be a floating point value in the range 0-1. Default
   * value is 0.3.
   * 
   * 
   * @param val
   */
  mincontrast(val) {
    this._mincontrast = val;
    return this;
  }

  /**
   * Set reference frame number for tripod mode.
   * 
   * If enabled, the motion of the frames is compared to a reference frame
   * in the filtered stream, identified by the specified number. The idea
   * is to compensate all movements in a more-or-less static scene and keep
   * the camera view absolutely still.
   * 
   * If set to 0, it is disabled. The frames are counted starting from 1.
   * 
   * 
   * @param val
   */
  tripod(val) {
    this._tripod = val;
    return this;
  }

  /**
   * Show fields and transforms in the resulting frames. It accepts an
   * integer in the range 0-2. Default value is 0, which disables any
   * visualization.
   * 
   * @param val
   */
  show(val) {
    this._show = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._result) {
      opt['result'] = this._result;
    }
    if (this._shakiness) {
      opt['shakiness'] = this._shakiness;
    }
    if (this._accuracy) {
      opt['accuracy'] = this._accuracy;
    }
    if (this._stepsize) {
      opt['stepsize'] = this._stepsize;
    }
    if (this._mincontrast) {
      opt['mincontrast'] = this._mincontrast;
    }
    if (this._tripod) {
      opt['tripod'] = this._tripod;
    }
    if (this._show) {
      opt['show'] = this._show;
    }

    addFilter(this.ffmpeg, {
      filter: 'vidstabdetect',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.vidstabdetect = vidstabdetect;
