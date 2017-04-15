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
    this.system = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  cie(val) {
    this.cie = val;
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
    this.gamuts = val;
    return this;
  }

  /**
   * Set ciescope size, by default set to 512.
   * 
   * 
   * @param val
   */
  size(val) {
    this.size = val;
    return this;
  }

  /**
   * Set intensity used to map input pixel values to CIE diagram.
   * 
   * 
   * @param val
   */
  intensity(val) {
    this.intensity = val;
    return this;
  }

  /**
   * Set contrast used to draw tongue colors that are out of active color system gamut.
   * 
   * 
   * @param val
   */
  contrast(val) {
    this.contrast = val;
    return this;
  }

  /**
   * Correct gamma displayed on scope, by default enabled.
   * 
   * 
   * @param val
   */
  corrgamma(val) {
    this.corrgamma = val;
    return this;
  }

  /**
   * Show white point on CIE diagram, by default disabled.
   * 
   * 
   * @param val
   */
  showwhite(val) {
    this.showwhite = val;
    return this;
  }

  /**
   * Set input gamma. Used only with XYZ input color space.
   * 
   * @param val
   */
  gamma(val) {
    this.gamma = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.system) {
      opt['system'] = this.system;
    }
    if (this.cie) {
      opt['cie'] = this.cie;
    }
    if (this.gamuts) {
      opt['gamuts'] = this.gamuts;
    }
    if (this.size) {
      opt['size'] = this.size;
    }
    if (this.intensity) {
      opt['intensity'] = this.intensity;
    }
    if (this.contrast) {
      opt['contrast'] = this.contrast;
    }
    if (this.corrgamma) {
      opt['corrgamma'] = this.corrgamma;
    }
    if (this.showwhite) {
      opt['showwhite'] = this.showwhite;
    }
    if (this.gamma) {
      opt['gamma'] = this.gamma;
    }

    addFilter(this.ffmpeg, {
      filter: 'ciescope',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.ciescope = ciescope;
