const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the signalstats function.
 *
 *
 * @example
 *  ffmpeg().signalstats()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the signalstats function.
 */
function signalstats(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'signalstats', function() {
    return new SignalstatsFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class SignalstatsFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    SignalstatsFilter.prototype.withYMIN = this.YMIN;
    SignalstatsFilter.prototype.withYLOW = this.YLOW;
    SignalstatsFilter.prototype.withYAVG = this.YAVG;
    SignalstatsFilter.prototype.withYHIGH = this.YHIGH;
    SignalstatsFilter.prototype.withYMAX = this.YMAX;
    SignalstatsFilter.prototype.withUMIN = this.UMIN;
    SignalstatsFilter.prototype.withULOW = this.ULOW;
    SignalstatsFilter.prototype.withUAVG = this.UAVG;
    SignalstatsFilter.prototype.withUHIGH = this.UHIGH;
    SignalstatsFilter.prototype.withUMAX = this.UMAX;
    SignalstatsFilter.prototype.withVMIN = this.VMIN;
    SignalstatsFilter.prototype.withVLOW = this.VLOW;
    SignalstatsFilter.prototype.withVAVG = this.VAVG;
    SignalstatsFilter.prototype.withVHIGH = this.VHIGH;
    SignalstatsFilter.prototype.withVMAX = this.VMAX;
    SignalstatsFilter.prototype.withSATMIN = this.SATMIN;
    SignalstatsFilter.prototype.withSATLOW = this.SATLOW;
    SignalstatsFilter.prototype.withSATAVG = this.SATAVG;
    SignalstatsFilter.prototype.withSATHIGH = this.SATHIGH;
    SignalstatsFilter.prototype.withSATMAX = this.SATMAX;
    SignalstatsFilter.prototype.withHUEMED = this.HUEMED;
    SignalstatsFilter.prototype.withHUEAVG = this.HUEAVG;
    SignalstatsFilter.prototype.withYDIF = this.YDIF;
    SignalstatsFilter.prototype.withUDIF = this.UDIF;
    SignalstatsFilter.prototype.withVDIF = this.VDIF;
    SignalstatsFilter.prototype.withYBITDEPTH = this.YBITDEPTH;
    SignalstatsFilter.prototype.withUBITDEPTH = this.UBITDEPTH;
    SignalstatsFilter.prototype.withVBITDEPTH = this.VBITDEPTH;
  }

  /**
   * Display the minimal Y value contained within the input frame. Expressed in
   * range of [0-255].
   * 
   * 
   * @param val
   */
  YMIN(val) {
    this._YMIN = val;
    return this;
  }

  /**
   * Display the Y value at the 10% percentile within the input frame. Expressed in
   * range of [0-255].
   * 
   * 
   * @param val
   */
  YLOW(val) {
    this._YLOW = val;
    return this;
  }

  /**
   * Display the average Y value within the input frame. Expressed in range of
   * [0-255].
   * 
   * 
   * @param val
   */
  YAVG(val) {
    this._YAVG = val;
    return this;
  }

  /**
   * Display the Y value at the 90% percentile within the input frame. Expressed in
   * range of [0-255].
   * 
   * 
   * @param val
   */
  YHIGH(val) {
    this._YHIGH = val;
    return this;
  }

  /**
   * Display the maximum Y value contained within the input frame. Expressed in
   * range of [0-255].
   * 
   * 
   * @param val
   */
  YMAX(val) {
    this._YMAX = val;
    return this;
  }

  /**
   * Display the minimal U value contained within the input frame. Expressed in
   * range of [0-255].
   * 
   * 
   * @param val
   */
  UMIN(val) {
    this._UMIN = val;
    return this;
  }

  /**
   * Display the U value at the 10% percentile within the input frame. Expressed in
   * range of [0-255].
   * 
   * 
   * @param val
   */
  ULOW(val) {
    this._ULOW = val;
    return this;
  }

  /**
   * Display the average U value within the input frame. Expressed in range of
   * [0-255].
   * 
   * 
   * @param val
   */
  UAVG(val) {
    this._UAVG = val;
    return this;
  }

  /**
   * Display the U value at the 90% percentile within the input frame. Expressed in
   * range of [0-255].
   * 
   * 
   * @param val
   */
  UHIGH(val) {
    this._UHIGH = val;
    return this;
  }

  /**
   * Display the maximum U value contained within the input frame. Expressed in
   * range of [0-255].
   * 
   * 
   * @param val
   */
  UMAX(val) {
    this._UMAX = val;
    return this;
  }

  /**
   * Display the minimal V value contained within the input frame. Expressed in
   * range of [0-255].
   * 
   * 
   * @param val
   */
  VMIN(val) {
    this._VMIN = val;
    return this;
  }

  /**
   * Display the V value at the 10% percentile within the input frame. Expressed in
   * range of [0-255].
   * 
   * 
   * @param val
   */
  VLOW(val) {
    this._VLOW = val;
    return this;
  }

  /**
   * Display the average V value within the input frame. Expressed in range of
   * [0-255].
   * 
   * 
   * @param val
   */
  VAVG(val) {
    this._VAVG = val;
    return this;
  }

  /**
   * Display the V value at the 90% percentile within the input frame. Expressed in
   * range of [0-255].
   * 
   * 
   * @param val
   */
  VHIGH(val) {
    this._VHIGH = val;
    return this;
  }

  /**
   * Display the maximum V value contained within the input frame. Expressed in
   * range of [0-255].
   * 
   * 
   * @param val
   */
  VMAX(val) {
    this._VMAX = val;
    return this;
  }

  /**
   * Display the minimal saturation value contained within the input frame.
   * Expressed in range of [0-~181.02].
   * 
   * 
   * @param val
   */
  SATMIN(val) {
    this._SATMIN = val;
    return this;
  }

  /**
   * Display the saturation value at the 10% percentile within the input frame.
   * Expressed in range of [0-~181.02].
   * 
   * 
   * @param val
   */
  SATLOW(val) {
    this._SATLOW = val;
    return this;
  }

  /**
   * Display the average saturation value within the input frame. Expressed in range
   * of [0-~181.02].
   * 
   * 
   * @param val
   */
  SATAVG(val) {
    this._SATAVG = val;
    return this;
  }

  /**
   * Display the saturation value at the 90% percentile within the input frame.
   * Expressed in range of [0-~181.02].
   * 
   * 
   * @param val
   */
  SATHIGH(val) {
    this._SATHIGH = val;
    return this;
  }

  /**
   * Display the maximum saturation value contained within the input frame.
   * Expressed in range of [0-~181.02].
   * 
   * 
   * @param val
   */
  SATMAX(val) {
    this._SATMAX = val;
    return this;
  }

  /**
   * Display the median value for hue within the input frame. Expressed in range of
   * [0-360].
   * 
   * 
   * @param val
   */
  HUEMED(val) {
    this._HUEMED = val;
    return this;
  }

  /**
   * Display the average value for hue within the input frame. Expressed in range of
   * [0-360].
   * 
   * 
   * @param val
   */
  HUEAVG(val) {
    this._HUEAVG = val;
    return this;
  }

  /**
   * Display the average of sample value difference between all values of the Y
   * plane in the current frame and corresponding values of the previous input frame.
   * Expressed in range of [0-255].
   * 
   * 
   * @param val
   */
  YDIF(val) {
    this._YDIF = val;
    return this;
  }

  /**
   * Display the average of sample value difference between all values of the U
   * plane in the current frame and corresponding values of the previous input frame.
   * Expressed in range of [0-255].
   * 
   * 
   * @param val
   */
  UDIF(val) {
    this._UDIF = val;
    return this;
  }

  /**
   * Display the average of sample value difference between all values of the V
   * plane in the current frame and corresponding values of the previous input frame.
   * Expressed in range of [0-255].
   * 
   * 
   * @param val
   */
  VDIF(val) {
    this._VDIF = val;
    return this;
  }

  /**
   * Display bit depth of Y plane in current frame.
   * Expressed in range of [0-16].
   * 
   * 
   * @param val
   */
  YBITDEPTH(val) {
    this._YBITDEPTH = val;
    return this;
  }

  /**
   * Display bit depth of U plane in current frame.
   * Expressed in range of [0-16].
   * 
   * 
   * @param val
   */
  UBITDEPTH(val) {
    this._UBITDEPTH = val;
    return this;
  }

  /**
   * Display bit depth of V plane in current frame.
   * Expressed in range of [0-16].
   * 
   * @param val
   */
  VBITDEPTH(val) {
    this._VBITDEPTH = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._YMIN) {
      opt['YMIN'] = this._YMIN;
    }
    if (this._YLOW) {
      opt['YLOW'] = this._YLOW;
    }
    if (this._YAVG) {
      opt['YAVG'] = this._YAVG;
    }
    if (this._YHIGH) {
      opt['YHIGH'] = this._YHIGH;
    }
    if (this._YMAX) {
      opt['YMAX'] = this._YMAX;
    }
    if (this._UMIN) {
      opt['UMIN'] = this._UMIN;
    }
    if (this._ULOW) {
      opt['ULOW'] = this._ULOW;
    }
    if (this._UAVG) {
      opt['UAVG'] = this._UAVG;
    }
    if (this._UHIGH) {
      opt['UHIGH'] = this._UHIGH;
    }
    if (this._UMAX) {
      opt['UMAX'] = this._UMAX;
    }
    if (this._VMIN) {
      opt['VMIN'] = this._VMIN;
    }
    if (this._VLOW) {
      opt['VLOW'] = this._VLOW;
    }
    if (this._VAVG) {
      opt['VAVG'] = this._VAVG;
    }
    if (this._VHIGH) {
      opt['VHIGH'] = this._VHIGH;
    }
    if (this._VMAX) {
      opt['VMAX'] = this._VMAX;
    }
    if (this._SATMIN) {
      opt['SATMIN'] = this._SATMIN;
    }
    if (this._SATLOW) {
      opt['SATLOW'] = this._SATLOW;
    }
    if (this._SATAVG) {
      opt['SATAVG'] = this._SATAVG;
    }
    if (this._SATHIGH) {
      opt['SATHIGH'] = this._SATHIGH;
    }
    if (this._SATMAX) {
      opt['SATMAX'] = this._SATMAX;
    }
    if (this._HUEMED) {
      opt['HUEMED'] = this._HUEMED;
    }
    if (this._HUEAVG) {
      opt['HUEAVG'] = this._HUEAVG;
    }
    if (this._YDIF) {
      opt['YDIF'] = this._YDIF;
    }
    if (this._UDIF) {
      opt['UDIF'] = this._UDIF;
    }
    if (this._VDIF) {
      opt['VDIF'] = this._VDIF;
    }
    if (this._YBITDEPTH) {
      opt['YBITDEPTH'] = this._YBITDEPTH;
    }
    if (this._UBITDEPTH) {
      opt['UBITDEPTH'] = this._UBITDEPTH;
    }
    if (this._VBITDEPTH) {
      opt['VBITDEPTH'] = this._VBITDEPTH;
    }

    addFilter(this.ffmpeg, {
      filter: 'signalstats',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.signalstats = signalstats;
