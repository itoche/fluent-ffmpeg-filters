const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the colorspace function.
 *
 *
 * @example
 *  ffmpeg().colorspace()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the colorspace function.
 */
function colorspace(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'colorspace', function() {
    return new ColorspaceFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ColorspaceFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    ColorspaceFilter.prototype.withAll = this.all;
    ColorspaceFilter.prototype.withSpace = this.space;
    ColorspaceFilter.prototype.withTrc = this.trc;
    ColorspaceFilter.prototype.withPrimaries = this.primaries;
    ColorspaceFilter.prototype.withRange = this.range;
    ColorspaceFilter.prototype.withFormat = this.format;
    ColorspaceFilter.prototype.withFast = this.fast;
    ColorspaceFilter.prototype.withDither = this.dither;
    ColorspaceFilter.prototype.withWpadapt = this.wpadapt;
    ColorspaceFilter.prototype.withIall = this.iall;
    ColorspaceFilter.prototype.withIspace = this.ispace;
    ColorspaceFilter.prototype.withIprimaries = this.iprimaries;
    ColorspaceFilter.prototype.withItrc = this.itrc;
    ColorspaceFilter.prototype.withIrange = this.irange;
  }

  /**
   * 
   * @param val
   */
  all(val) {
    this._all = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  space(val) {
    this._space = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  trc(val) {
    this._trc = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  primaries(val) {
    this._primaries = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  range(val) {
    this._range = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  format(val) {
    this._format = val;
    return this;
  }

  /**
   * Do a fast conversion, which skips gamma/primary correction. This will take
   * significantly less CPU, but will be mathematically incorrect. To get output
   * compatible with that produced by the colormatrix filter, use fast&#x3D;1.
   * 
   * 
   * @param val
   */
  fast(val) {
    this._fast = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  dither(val) {
    this._dither = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  wpadapt(val) {
    this._wpadapt = val;
    return this;
  }

  /**
   * Override all input properties at once. Same accepted values as all.
   * 
   * 
   * @param val
   */
  iall(val) {
    this._iall = val;
    return this;
  }

  /**
   * Override input colorspace. Same accepted values as space.
   * 
   * 
   * @param val
   */
  ispace(val) {
    this._ispace = val;
    return this;
  }

  /**
   * Override input color primaries. Same accepted values as primaries.
   * 
   * 
   * @param val
   */
  iprimaries(val) {
    this._iprimaries = val;
    return this;
  }

  /**
   * Override input transfer characteristics. Same accepted values as trc.
   * 
   * 
   * @param val
   */
  itrc(val) {
    this._itrc = val;
    return this;
  }

  /**
   * Override input color range. Same accepted values as range.
   * 
   * 
   * @param val
   */
  irange(val) {
    this._irange = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._all) {
      opt['all'] = this._all;
    }
    if (this._space) {
      opt['space'] = this._space;
    }
    if (this._trc) {
      opt['trc'] = this._trc;
    }
    if (this._primaries) {
      opt['primaries'] = this._primaries;
    }
    if (this._range) {
      opt['range'] = this._range;
    }
    if (this._format) {
      opt['format'] = this._format;
    }
    if (this._fast) {
      opt['fast'] = this._fast;
    }
    if (this._dither) {
      opt['dither'] = this._dither;
    }
    if (this._wpadapt) {
      opt['wpadapt'] = this._wpadapt;
    }
    if (this._iall) {
      opt['iall'] = this._iall;
    }
    if (this._ispace) {
      opt['ispace'] = this._ispace;
    }
    if (this._iprimaries) {
      opt['iprimaries'] = this._iprimaries;
    }
    if (this._itrc) {
      opt['itrc'] = this._itrc;
    }
    if (this._irange) {
      opt['irange'] = this._irange;
    }

    addFilter(this.ffmpeg, {
      filter: 'colorspace',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.colorspace = colorspace;
