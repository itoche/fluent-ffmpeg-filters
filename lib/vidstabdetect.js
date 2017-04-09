const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the vidstabdetect function.
 *
 *
 * @example
 *  ffmpeg().vidstabdetect()
      ...             // call filter configuration functions
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
    Vidstabdetect.prototype.withResult = result;
    Vidstabdetect.prototype.withShakiness = shakiness;
    Vidstabdetect.prototype.withAccuracy = accuracy;
    Vidstabdetect.prototype.withStepsize = stepsize;
    Vidstabdetect.prototype.withMincontrast = mincontrast;
    Vidstabdetect.prototype.withTripod = tripod;
    Vidstabdetect.prototype.withShow = show;
  }

  /**
   * Set the path to the file used to write the transforms information.
   * Default value is transforms.trf.
   * 
   * 
   * @param val
   */
  result(val) {
    this.result = val;
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
    this.shakiness = val;
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
    this.accuracy = val;
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
    this.stepsize = val;
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
    this.mincontrast = val;
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
    this.tripod = val;
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
    this.show = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.result) {
      opt.result = this.result;
    }
    if (this.shakiness) {
      opt.shakiness = this.shakiness;
    }
    if (this.accuracy) {
      opt.accuracy = this.accuracy;
    }
    if (this.stepsize) {
      opt.stepsize = this.stepsize;
    }
    if (this.mincontrast) {
      opt.mincontrast = this.mincontrast;
    }
    if (this.tripod) {
      opt.tripod = this.tripod;
    }
    if (this.show) {
      opt.show = this.show;
    }

    addFilter(this.ffmpeg, {
      filter: 'vidstabdetect',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.vidstabdetect = vidstabdetect;