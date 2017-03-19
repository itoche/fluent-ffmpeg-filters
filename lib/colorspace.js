const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the colorspace function.
 *
 *
 * @example
 *  ffmpeg().colorspace()
      ...             // call filter configuration functions
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
    Colorspace.prototype.withAll = all;
    Colorspace.prototype.withSpace = space;
    Colorspace.prototype.withTrc = trc;
    Colorspace.prototype.withPrimaries = primaries;
    Colorspace.prototype.withRange = range;
    Colorspace.prototype.withFormat = format;
    Colorspace.prototype.withFast = fast;
    Colorspace.prototype.withDither = dither;
    Colorspace.prototype.withWpadapt = wpadapt;
    Colorspace.prototype.withIall = iall;
    Colorspace.prototype.withIspace = ispace;
    Colorspace.prototype.withIprimaries = iprimaries;
    Colorspace.prototype.withItrc = itrc;
    Colorspace.prototype.withIrange = irange;
  }

  /**
   * 
   * @param val
   */
  all(val) {
    this.all = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  space(val) {
    this.space = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  trc(val) {
    this.trc = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  primaries(val) {
    this.primaries = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  range(val) {
    this.range = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  format(val) {
    this.format = val;
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
    this.fast = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  dither(val) {
    this.dither = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  wpadapt(val) {
    this.wpadapt = val;
    return this;
  }

  /**
   * Override all input properties at once. Same accepted values as all.
   * 
   * 
   * @param val
   */
  iall(val) {
    this.iall = val;
    return this;
  }

  /**
   * Override input colorspace. Same accepted values as space.
   * 
   * 
   * @param val
   */
  ispace(val) {
    this.ispace = val;
    return this;
  }

  /**
   * Override input color primaries. Same accepted values as primaries.
   * 
   * 
   * @param val
   */
  iprimaries(val) {
    this.iprimaries = val;
    return this;
  }

  /**
   * Override input transfer characteristics. Same accepted values as trc.
   * 
   * 
   * @param val
   */
  itrc(val) {
    this.itrc = val;
    return this;
  }

  /**
   * Override input color range. Same accepted values as range.
   * 
   * 
   * @param val
   */
  irange(val) {
    this.irange = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.all) {
      opt.all = this.all;
    }
    if (this.space) {
      opt.space = this.space;
    }
    if (this.trc) {
      opt.trc = this.trc;
    }
    if (this.primaries) {
      opt.primaries = this.primaries;
    }
    if (this.range) {
      opt.range = this.range;
    }
    if (this.format) {
      opt.format = this.format;
    }
    if (this.fast) {
      opt.fast = this.fast;
    }
    if (this.dither) {
      opt.dither = this.dither;
    }
    if (this.wpadapt) {
      opt.wpadapt = this.wpadapt;
    }
    if (this.iall) {
      opt.iall = this.iall;
    }
    if (this.ispace) {
      opt.ispace = this.ispace;
    }
    if (this.iprimaries) {
      opt.iprimaries = this.iprimaries;
    }
    if (this.itrc) {
      opt.itrc = this.itrc;
    }
    if (this.irange) {
      opt.irange = this.irange;
    }

    addFilter(this.ffmpeg, {
      filter: 'colorspace',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.colorspace = colorspace;
