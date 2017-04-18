const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the colorlevels function.
 *
 *
 * @example
 *  ffmpeg().colorlevels()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the colorlevels function.
 */
function colorlevels(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'colorlevels', function() {
    return new ColorlevelsFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ColorlevelsFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    ColorlevelsFilter.prototype.withRimin = this.rimin;
    ColorlevelsFilter.prototype.withGimin = this.gimin;
    ColorlevelsFilter.prototype.withBimin = this.bimin;
    ColorlevelsFilter.prototype.withAimin = this.aimin;
    ColorlevelsFilter.prototype.withRimax = this.rimax;
    ColorlevelsFilter.prototype.withGimax = this.gimax;
    ColorlevelsFilter.prototype.withBimax = this.bimax;
    ColorlevelsFilter.prototype.withAimax = this.aimax;
    ColorlevelsFilter.prototype.withRomin = this.romin;
    ColorlevelsFilter.prototype.withGomin = this.gomin;
    ColorlevelsFilter.prototype.withBomin = this.bomin;
    ColorlevelsFilter.prototype.withAomin = this.aomin;
    ColorlevelsFilter.prototype.withRomax = this.romax;
    ColorlevelsFilter.prototype.withGomax = this.gomax;
    ColorlevelsFilter.prototype.withBomax = this.bomax;
    ColorlevelsFilter.prototype.withAomax = this.aomax;
  }

  /**
   * Adjust red, green, blue and alpha input black point.
   * Allowed ranges for options are [-1.0, 1.0]. Defaults are 0.
   * 
   * 
   * @param val
   */
  rimin(val) {
    this._rimin = val;
    return this;
  }

  /**
   * Adjust red, green, blue and alpha input black point.
   * Allowed ranges for options are [-1.0, 1.0]. Defaults are 0.
   * 
   * 
   * @param val
   */
  gimin(val) {
    this._gimin = val;
    return this;
  }

  /**
   * Adjust red, green, blue and alpha input black point.
   * Allowed ranges for options are [-1.0, 1.0]. Defaults are 0.
   * 
   * 
   * @param val
   */
  bimin(val) {
    this._bimin = val;
    return this;
  }

  /**
   * Adjust red, green, blue and alpha input black point.
   * Allowed ranges for options are [-1.0, 1.0]. Defaults are 0.
   * 
   * 
   * @param val
   */
  aimin(val) {
    this._aimin = val;
    return this;
  }

  /**
   * Adjust red, green, blue and alpha input white point.
   * Allowed ranges for options are [-1.0, 1.0]. Defaults are 1.
   * 
   * Input levels are used to lighten highlights (bright tones), darken shadows
   * (dark tones), change the balance of bright and dark tones.
   * 
   * 
   * @param val
   */
  rimax(val) {
    this._rimax = val;
    return this;
  }

  /**
   * Adjust red, green, blue and alpha input white point.
   * Allowed ranges for options are [-1.0, 1.0]. Defaults are 1.
   * 
   * Input levels are used to lighten highlights (bright tones), darken shadows
   * (dark tones), change the balance of bright and dark tones.
   * 
   * 
   * @param val
   */
  gimax(val) {
    this._gimax = val;
    return this;
  }

  /**
   * Adjust red, green, blue and alpha input white point.
   * Allowed ranges for options are [-1.0, 1.0]. Defaults are 1.
   * 
   * Input levels are used to lighten highlights (bright tones), darken shadows
   * (dark tones), change the balance of bright and dark tones.
   * 
   * 
   * @param val
   */
  bimax(val) {
    this._bimax = val;
    return this;
  }

  /**
   * Adjust red, green, blue and alpha input white point.
   * Allowed ranges for options are [-1.0, 1.0]. Defaults are 1.
   * 
   * Input levels are used to lighten highlights (bright tones), darken shadows
   * (dark tones), change the balance of bright and dark tones.
   * 
   * 
   * @param val
   */
  aimax(val) {
    this._aimax = val;
    return this;
  }

  /**
   * Adjust red, green, blue and alpha output black point.
   * Allowed ranges for options are [0, 1.0]. Defaults are 0.
   * 
   * 
   * @param val
   */
  romin(val) {
    this._romin = val;
    return this;
  }

  /**
   * Adjust red, green, blue and alpha output black point.
   * Allowed ranges for options are [0, 1.0]. Defaults are 0.
   * 
   * 
   * @param val
   */
  gomin(val) {
    this._gomin = val;
    return this;
  }

  /**
   * Adjust red, green, blue and alpha output black point.
   * Allowed ranges for options are [0, 1.0]. Defaults are 0.
   * 
   * 
   * @param val
   */
  bomin(val) {
    this._bomin = val;
    return this;
  }

  /**
   * Adjust red, green, blue and alpha output black point.
   * Allowed ranges for options are [0, 1.0]. Defaults are 0.
   * 
   * 
   * @param val
   */
  aomin(val) {
    this._aomin = val;
    return this;
  }

  /**
   * Adjust red, green, blue and alpha output white point.
   * Allowed ranges for options are [0, 1.0]. Defaults are 1.
   * 
   * Output levels allows manual selection of a constrained output level range.
   * 
   * @param val
   */
  romax(val) {
    this._romax = val;
    return this;
  }

  /**
   * Adjust red, green, blue and alpha output white point.
   * Allowed ranges for options are [0, 1.0]. Defaults are 1.
   * 
   * Output levels allows manual selection of a constrained output level range.
   * 
   * @param val
   */
  gomax(val) {
    this._gomax = val;
    return this;
  }

  /**
   * Adjust red, green, blue and alpha output white point.
   * Allowed ranges for options are [0, 1.0]. Defaults are 1.
   * 
   * Output levels allows manual selection of a constrained output level range.
   * 
   * @param val
   */
  bomax(val) {
    this._bomax = val;
    return this;
  }

  /**
   * Adjust red, green, blue and alpha output white point.
   * Allowed ranges for options are [0, 1.0]. Defaults are 1.
   * 
   * Output levels allows manual selection of a constrained output level range.
   * 
   * @param val
   */
  aomax(val) {
    this._aomax = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._rimin) {
      opt['rimin'] = this._rimin;
    }
    if (this._gimin) {
      opt['gimin'] = this._gimin;
    }
    if (this._bimin) {
      opt['bimin'] = this._bimin;
    }
    if (this._aimin) {
      opt['aimin'] = this._aimin;
    }
    if (this._rimax) {
      opt['rimax'] = this._rimax;
    }
    if (this._gimax) {
      opt['gimax'] = this._gimax;
    }
    if (this._bimax) {
      opt['bimax'] = this._bimax;
    }
    if (this._aimax) {
      opt['aimax'] = this._aimax;
    }
    if (this._romin) {
      opt['romin'] = this._romin;
    }
    if (this._gomin) {
      opt['gomin'] = this._gomin;
    }
    if (this._bomin) {
      opt['bomin'] = this._bomin;
    }
    if (this._aomin) {
      opt['aomin'] = this._aomin;
    }
    if (this._romax) {
      opt['romax'] = this._romax;
    }
    if (this._gomax) {
      opt['gomax'] = this._gomax;
    }
    if (this._bomax) {
      opt['bomax'] = this._bomax;
    }
    if (this._aomax) {
      opt['aomax'] = this._aomax;
    }

    addFilter(this.ffmpeg, {
      filter: 'colorlevels',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.colorlevels = colorlevels;
