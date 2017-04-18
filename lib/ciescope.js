const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the ciescope function.
 *
 *
 * @example
 *  ffmpeg().ciescope()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the ciescope function.
 */
function ciescope(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'ciescope', function() {
    return new CiescopeFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class CiescopeFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    CiescopeFilter.prototype.withSystem = this.system;
    CiescopeFilter.prototype.withCie = this.cie;
    CiescopeFilter.prototype.withGamuts = this.gamuts;
    CiescopeFilter.prototype.withSize = this.size;
    CiescopeFilter.prototype.withIntensity = this.intensity;
    CiescopeFilter.prototype.withContrast = this.contrast;
    CiescopeFilter.prototype.withCorrgamma = this.corrgamma;
    CiescopeFilter.prototype.withShowwhite = this.showwhite;
    CiescopeFilter.prototype.withGamma = this.gamma;
  }

  /**
   * 
   * @param val
   */
  system(val) {
    this._system = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  cie(val) {
    this._cie = val;
    return this;
  }

  /**
   * Set what gamuts to draw.
   * 
   * See system option for available values.
   * 
   * 
   * @param val
   */
  gamuts(val) {
    this._gamuts = val;
    return this;
  }

  /**
   * Set ciescope size, by default set to 512.
   * 
   * 
   * @param val
   */
  size(val) {
    this._size = val;
    return this;
  }

  /**
   * Set intensity used to map input pixel values to CIE diagram.
   * 
   * 
   * @param val
   */
  intensity(val) {
    this._intensity = val;
    return this;
  }

  /**
   * Set contrast used to draw tongue colors that are out of active color system gamut.
   * 
   * 
   * @param val
   */
  contrast(val) {
    this._contrast = val;
    return this;
  }

  /**
   * Correct gamma displayed on scope, by default enabled.
   * 
   * 
   * @param val
   */
  corrgamma(val) {
    this._corrgamma = val;
    return this;
  }

  /**
   * Show white point on CIE diagram, by default disabled.
   * 
   * 
   * @param val
   */
  showwhite(val) {
    this._showwhite = val;
    return this;
  }

  /**
   * Set input gamma. Used only with XYZ input color space.
   * 
   * @param val
   */
  gamma(val) {
    this._gamma = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._system) {
      opt['system'] = this._system;
    }
    if (this._cie) {
      opt['cie'] = this._cie;
    }
    if (this._gamuts) {
      opt['gamuts'] = this._gamuts;
    }
    if (this._size) {
      opt['size'] = this._size;
    }
    if (this._intensity) {
      opt['intensity'] = this._intensity;
    }
    if (this._contrast) {
      opt['contrast'] = this._contrast;
    }
    if (this._corrgamma) {
      opt['corrgamma'] = this._corrgamma;
    }
    if (this._showwhite) {
      opt['showwhite'] = this._showwhite;
    }
    if (this._gamma) {
      opt['gamma'] = this._gamma;
    }

    addFilter(this.ffmpeg, {
      filter: 'ciescope',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.ciescope = ciescope;
