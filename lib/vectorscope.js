const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the vectorscope function.
 *
 *
 * @example
 *  ffmpeg().vectorscope()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the vectorscope function.
 */
function vectorscope(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'vectorscope', function() {
    return new VectorscopeFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class VectorscopeFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    VectorscopeFilter.prototype.withMode = this.mode;
    VectorscopeFilter.prototype.withX = this.x;
    VectorscopeFilter.prototype.withY = this.y;
    VectorscopeFilter.prototype.withIntensity = this.intensity;
    VectorscopeFilter.prototype.withEnvelope = this.envelope;
    VectorscopeFilter.prototype.withGraticule = this.graticule;
    VectorscopeFilter.prototype.withOpacity = this.opacity;
    VectorscopeFilter.prototype.withFlags = this.flags;
    VectorscopeFilter.prototype.withBgopacity = this.bgopacity;
    VectorscopeFilter.prototype.withLthreshold = this.lthreshold;
    VectorscopeFilter.prototype.withHthreshold = this.hthreshold;
    VectorscopeFilter.prototype.withColorspace = this.colorspace;
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
   * Set which color component will be represented on X-axis. Default is 1.
   * 
   * 
   * @param val
   */
  x(val) {
    this._x = val;
    return this;
  }

  /**
   * Set which color component will be represented on Y-axis. Default is 2.
   * 
   * 
   * @param val
   */
  y(val) {
    this._y = val;
    return this;
  }

  /**
   * Set intensity, used by modes: gray, color, color3 and color5 for increasing brightness
   * of color component which represents frequency of (X, Y) location in graph.
   * 
   * 
   * @param val
   */
  intensity(val) {
    this._intensity = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  envelope(val) {
    this._envelope = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  graticule(val) {
    this._graticule = val;
    return this;
  }

  /**
   * Set graticule opacity.
   * 
   * 
   * @param val
   */
  opacity(val) {
    this._opacity = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  flags(val) {
    this._flags = val;
    return this;
  }

  /**
   * Set background opacity.
   * 
   * 
   * @param val
   */
  bgopacity(val) {
    this._bgopacity = val;
    return this;
  }

  /**
   * Set low threshold for color component not represented on X or Y axis.
   * Values lower than this value will be ignored. Default is 0.
   * Note this value is multiplied with actual max possible value one pixel component
   * can have. So for 8-bit input and low threshold value of 0.1 actual threshold
   * is 0.1 * 255 &#x3D; 25.
   * 
   * 
   * @param val
   */
  lthreshold(val) {
    this._lthreshold = val;
    return this;
  }

  /**
   * Set high threshold for color component not represented on X or Y axis.
   * Values higher than this value will be ignored. Default is 1.
   * Note this value is multiplied with actual max possible value one pixel component
   * can have. So for 8-bit input and high threshold value of 0.9 actual threshold
   * is 0.9 * 255 &#x3D; 230.
   * 
   * 
   * @param val
   */
  hthreshold(val) {
    this._hthreshold = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  colorspace(val) {
    this._colorspace = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._mode) {
      opt['mode'] = this._mode;
    }
    if (this._x) {
      opt['x'] = this._x;
    }
    if (this._y) {
      opt['y'] = this._y;
    }
    if (this._intensity) {
      opt['intensity'] = this._intensity;
    }
    if (this._envelope) {
      opt['envelope'] = this._envelope;
    }
    if (this._graticule) {
      opt['graticule'] = this._graticule;
    }
    if (this._opacity) {
      opt['opacity'] = this._opacity;
    }
    if (this._flags) {
      opt['flags'] = this._flags;
    }
    if (this._bgopacity) {
      opt['bgopacity'] = this._bgopacity;
    }
    if (this._lthreshold) {
      opt['lthreshold'] = this._lthreshold;
    }
    if (this._hthreshold) {
      opt['hthreshold'] = this._hthreshold;
    }
    if (this._colorspace) {
      opt['colorspace'] = this._colorspace;
    }

    addFilter(this.ffmpeg, {
      filter: 'vectorscope',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.vectorscope = vectorscope;
