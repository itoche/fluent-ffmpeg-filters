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
    VectorscopeFilter.prototype.withMode = mode;
    VectorscopeFilter.prototype.withX = x;
    VectorscopeFilter.prototype.withY = y;
    VectorscopeFilter.prototype.withIntensity = intensity;
    VectorscopeFilter.prototype.withEnvelope = envelope;
    VectorscopeFilter.prototype.withGraticule = graticule;
    VectorscopeFilter.prototype.withOpacity = opacity;
    VectorscopeFilter.prototype.withFlags = flags;
    VectorscopeFilter.prototype.withBgopacity = bgopacity;
    VectorscopeFilter.prototype.withLthreshold = lthreshold;
    VectorscopeFilter.prototype.withHthreshold = hthreshold;
    VectorscopeFilter.prototype.withColorspace = colorspace;
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
   * Set which color component will be represented on X-axis. Default is 1.
   * 
   * 
   * @param val
   */
  x(val) {
    this.x = val;
    return this;
  }

  /**
   * Set which color component will be represented on Y-axis. Default is 2.
   * 
   * 
   * @param val
   */
  y(val) {
    this.y = val;
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
    this.intensity = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  envelope(val) {
    this.envelope = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  graticule(val) {
    this.graticule = val;
    return this;
  }

  /**
   * Set graticule opacity.
   * 
   * 
   * @param val
   */
  opacity(val) {
    this.opacity = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  flags(val) {
    this.flags = val;
    return this;
  }

  /**
   * Set background opacity.
   * 
   * 
   * @param val
   */
  bgopacity(val) {
    this.bgopacity = val;
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
    this.lthreshold = val;
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
    this.hthreshold = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  colorspace(val) {
    this.colorspace = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.mode) {
      opt['mode'] = this.mode;
    }
    if (this.x) {
      opt['x'] = this.x;
    }
    if (this.y) {
      opt['y'] = this.y;
    }
    if (this.intensity) {
      opt['intensity'] = this.intensity;
    }
    if (this.envelope) {
      opt['envelope'] = this.envelope;
    }
    if (this.graticule) {
      opt['graticule'] = this.graticule;
    }
    if (this.opacity) {
      opt['opacity'] = this.opacity;
    }
    if (this.flags) {
      opt['flags'] = this.flags;
    }
    if (this.bgopacity) {
      opt['bgopacity'] = this.bgopacity;
    }
    if (this.lthreshold) {
      opt['lthreshold'] = this.lthreshold;
    }
    if (this.hthreshold) {
      opt['hthreshold'] = this.hthreshold;
    }
    if (this.colorspace) {
      opt['colorspace'] = this.colorspace;
    }

    addFilter(this.ffmpeg, {
      filter: 'vectorscope',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.vectorscope = vectorscope;
