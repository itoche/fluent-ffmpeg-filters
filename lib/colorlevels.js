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
  aimin(val) {
    this.aimin = val;
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
    this.aimin = val;
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
    this.aimin = val;
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
    this.aimin = val;
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
    this.aimax = val;
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
    this.aimax = val;
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
    this.aimax = val;
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
    this.aimax = val;
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
    this.aomin = val;
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
    this.aomin = val;
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
    this.aomin = val;
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
    this.aomin = val;
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
    this.aomax = val;
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
    this.aomax = val;
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
    this.aomax = val;
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
    this.aomax = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.rimin) {
      opt['rimin'] = this.rimin;
    }
    if (this.gimin) {
      opt['gimin'] = this.gimin;
    }
    if (this.bimin) {
      opt['bimin'] = this.bimin;
    }
    if (this.aimin) {
      opt['aimin'] = this.aimin;
    }
    if (this.rimax) {
      opt['rimax'] = this.rimax;
    }
    if (this.gimax) {
      opt['gimax'] = this.gimax;
    }
    if (this.bimax) {
      opt['bimax'] = this.bimax;
    }
    if (this.aimax) {
      opt['aimax'] = this.aimax;
    }
    if (this.romin) {
      opt['romin'] = this.romin;
    }
    if (this.gomin) {
      opt['gomin'] = this.gomin;
    }
    if (this.bomin) {
      opt['bomin'] = this.bomin;
    }
    if (this.aomin) {
      opt['aomin'] = this.aomin;
    }
    if (this.romax) {
      opt['romax'] = this.romax;
    }
    if (this.gomax) {
      opt['gomax'] = this.gomax;
    }
    if (this.bomax) {
      opt['bomax'] = this.bomax;
    }
    if (this.aomax) {
      opt['aomax'] = this.aomax;
    }

    addFilter(this.ffmpeg, {
      filter: 'colorlevels',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.colorlevels = colorlevels;
