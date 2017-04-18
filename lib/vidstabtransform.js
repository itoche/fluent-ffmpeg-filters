const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the vidstabtransform function.
 *
 *
 * @example
 *  ffmpeg().vidstabtransform()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the vidstabtransform function.
 */
function vidstabtransform(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'vidstabtransform', function() {
    return new VidstabtransformFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class VidstabtransformFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    VidstabtransformFilter.prototype.withInput = this.input;
    VidstabtransformFilter.prototype.withSmoothing = this.smoothing;
    VidstabtransformFilter.prototype.withOptalgo = this.optalgo;
    VidstabtransformFilter.prototype.withMaxshift = this.maxshift;
    VidstabtransformFilter.prototype.withMaxangle = this.maxangle;
    VidstabtransformFilter.prototype.withCrop = this.crop;
    VidstabtransformFilter.prototype.withInvert = this.invert;
    VidstabtransformFilter.prototype.withRelative = this.relative;
    VidstabtransformFilter.prototype.withZoom = this.zoom;
    VidstabtransformFilter.prototype.withOptzoom = this.optzoom;
    VidstabtransformFilter.prototype.withZoomspeed = this.zoomspeed;
    VidstabtransformFilter.prototype.withInterpol = this.interpol;
    VidstabtransformFilter.prototype.withTripod = this.tripod;
    VidstabtransformFilter.prototype.withDebug = this.debug;
  }

  /**
   * Set path to the file used to read the transforms. Default value is
   * transforms.trf.
   * 
   * 
   * @param val
   */
  input(val) {
    this._input = val;
    return this;
  }

  /**
   * Set the number of frames (value*2 + 1) used for lowpass filtering the
   * camera movements. Default value is 10.
   * 
   * For example a number of 10 means that 21 frames are used (10 in the
   * past and 10 in the future) to smoothen the motion in the video. A
   * larger value leads to a smoother video, but limits the acceleration of
   * the camera (pan/tilt movements). 0 is a special case where a static
   * camera is simulated.
   * 
   * 
   * @param val
   */
  smoothing(val) {
    this._smoothing = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  optalgo(val) {
    this._optalgo = val;
    return this;
  }

  /**
   * Set maximal number of pixels to translate frames. Default value is -1,
   * meaning no limit.
   * 
   * 
   * @param val
   */
  maxshift(val) {
    this._maxshift = val;
    return this;
  }

  /**
   * Set maximal angle in radians (degree*PI/180) to rotate frames. Default
   * value is -1, meaning no limit.
   * 
   * 
   * @param val
   */
  maxangle(val) {
    this._maxangle = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  crop(val) {
    this._crop = val;
    return this;
  }

  /**
   * Invert transforms if set to 1. Default value is 0.
   * 
   * 
   * @param val
   */
  invert(val) {
    this._invert = val;
    return this;
  }

  /**
   * Consider transforms as relative to previous frame if set to 1,
   * absolute if set to 0. Default value is 0.
   * 
   * 
   * @param val
   */
  relative(val) {
    this._relative = val;
    return this;
  }

  /**
   * Set percentage to zoom. A positive value will result in a zoom-in
   * effect, a negative value in a zoom-out effect. Default value is 0 (no
   * zoom).
   * 
   * 
   * @param val
   */
  zoom(val) {
    this._zoom = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  optzoom(val) {
    this._optzoom = val;
    return this;
  }

  /**
   * Set percent to zoom maximally each frame (enabled when
   * optzoom is set to 2). Range is from 0 to 5, default value is
   * 0.25.
   * 
   * 
   * @param val
   */
  zoomspeed(val) {
    this._zoomspeed = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  interpol(val) {
    this._interpol = val;
    return this;
  }

  /**
   * Enable virtual tripod mode if set to 1, which is equivalent to
   * relative&#x3D;0:smoothing&#x3D;0. Default value is 0.
   * 
   * Use also tripod option of vidstabdetect.
   * 
   * 
   * @param val
   */
  tripod(val) {
    this._tripod = val;
    return this;
  }

  /**
   * Increase log verbosity if set to 1. Also the detected global motions
   * are written to the temporary file global_motions.trf. Default
   * value is 0.
   * 
   * @param val
   */
  debug(val) {
    this._debug = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._input) {
      opt['input'] = this._input;
    }
    if (this._smoothing) {
      opt['smoothing'] = this._smoothing;
    }
    if (this._optalgo) {
      opt['optalgo'] = this._optalgo;
    }
    if (this._maxshift) {
      opt['maxshift'] = this._maxshift;
    }
    if (this._maxangle) {
      opt['maxangle'] = this._maxangle;
    }
    if (this._crop) {
      opt['crop'] = this._crop;
    }
    if (this._invert) {
      opt['invert'] = this._invert;
    }
    if (this._relative) {
      opt['relative'] = this._relative;
    }
    if (this._zoom) {
      opt['zoom'] = this._zoom;
    }
    if (this._optzoom) {
      opt['optzoom'] = this._optzoom;
    }
    if (this._zoomspeed) {
      opt['zoomspeed'] = this._zoomspeed;
    }
    if (this._interpol) {
      opt['interpol'] = this._interpol;
    }
    if (this._tripod) {
      opt['tripod'] = this._tripod;
    }
    if (this._debug) {
      opt['debug'] = this._debug;
    }

    addFilter(this.ffmpeg, {
      filter: 'vidstabtransform',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.vidstabtransform = vidstabtransform;
