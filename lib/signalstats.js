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
    SignalstatsFilter.prototype.withYMIN = YMIN;
    SignalstatsFilter.prototype.withYLOW = YLOW;
    SignalstatsFilter.prototype.withYAVG = YAVG;
    SignalstatsFilter.prototype.withYHIGH = YHIGH;
    SignalstatsFilter.prototype.withYMAX = YMAX;
    SignalstatsFilter.prototype.withUMIN = UMIN;
    SignalstatsFilter.prototype.withULOW = ULOW;
    SignalstatsFilter.prototype.withUAVG = UAVG;
    SignalstatsFilter.prototype.withUHIGH = UHIGH;
    SignalstatsFilter.prototype.withUMAX = UMAX;
    SignalstatsFilter.prototype.withVMIN = VMIN;
    SignalstatsFilter.prototype.withVLOW = VLOW;
    SignalstatsFilter.prototype.withVAVG = VAVG;
    SignalstatsFilter.prototype.withVHIGH = VHIGH;
    SignalstatsFilter.prototype.withVMAX = VMAX;
    SignalstatsFilter.prototype.withSATMIN = SATMIN;
    SignalstatsFilter.prototype.withSATLOW = SATLOW;
    SignalstatsFilter.prototype.withSATAVG = SATAVG;
    SignalstatsFilter.prototype.withSATHIGH = SATHIGH;
    SignalstatsFilter.prototype.withSATMAX = SATMAX;
    SignalstatsFilter.prototype.withHUEMED = HUEMED;
    SignalstatsFilter.prototype.withHUEAVG = HUEAVG;
    SignalstatsFilter.prototype.withYDIF = YDIF;
    SignalstatsFilter.prototype.withUDIF = UDIF;
    SignalstatsFilter.prototype.withVDIF = VDIF;
    SignalstatsFilter.prototype.withYBITDEPTH = YBITDEPTH;
    SignalstatsFilter.prototype.withUBITDEPTH = UBITDEPTH;
    SignalstatsFilter.prototype.withVBITDEPTH = VBITDEPTH;
  }

  /**
   * Display the minimal Y value contained within the input frame. Expressed in
   * range of [0-255].
   * 
   * 
   * @param val
   */
  YMIN(val) {
    this.YMIN = val;
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
    this.YLOW = val;
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
    this.YAVG = val;
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
    this.YHIGH = val;
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
    this.YMAX = val;
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
    this.UMIN = val;
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
    this.ULOW = val;
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
    this.UAVG = val;
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
    this.UHIGH = val;
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
    this.UMAX = val;
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
    this.VMIN = val;
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
    this.VLOW = val;
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
    this.VAVG = val;
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
    this.VHIGH = val;
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
    this.VMAX = val;
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
    this.SATMIN = val;
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
    this.SATLOW = val;
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
    this.SATAVG = val;
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
    this.SATHIGH = val;
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
    this.SATMAX = val;
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
    this.HUEMED = val;
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
    this.HUEAVG = val;
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
    this.YDIF = val;
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
    this.UDIF = val;
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
    this.VDIF = val;
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
    this.YBITDEPTH = val;
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
    this.UBITDEPTH = val;
    return this;
  }

  /**
   * Display bit depth of V plane in current frame.
   * Expressed in range of [0-16].
   * 
   * @param val
   */
  VBITDEPTH(val) {
    this.VBITDEPTH = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.YMIN) {
      opt['YMIN'] = this.YMIN;
    }
    if (this.YLOW) {
      opt['YLOW'] = this.YLOW;
    }
    if (this.YAVG) {
      opt['YAVG'] = this.YAVG;
    }
    if (this.YHIGH) {
      opt['YHIGH'] = this.YHIGH;
    }
    if (this.YMAX) {
      opt['YMAX'] = this.YMAX;
    }
    if (this.UMIN) {
      opt['UMIN'] = this.UMIN;
    }
    if (this.ULOW) {
      opt['ULOW'] = this.ULOW;
    }
    if (this.UAVG) {
      opt['UAVG'] = this.UAVG;
    }
    if (this.UHIGH) {
      opt['UHIGH'] = this.UHIGH;
    }
    if (this.UMAX) {
      opt['UMAX'] = this.UMAX;
    }
    if (this.VMIN) {
      opt['VMIN'] = this.VMIN;
    }
    if (this.VLOW) {
      opt['VLOW'] = this.VLOW;
    }
    if (this.VAVG) {
      opt['VAVG'] = this.VAVG;
    }
    if (this.VHIGH) {
      opt['VHIGH'] = this.VHIGH;
    }
    if (this.VMAX) {
      opt['VMAX'] = this.VMAX;
    }
    if (this.SATMIN) {
      opt['SATMIN'] = this.SATMIN;
    }
    if (this.SATLOW) {
      opt['SATLOW'] = this.SATLOW;
    }
    if (this.SATAVG) {
      opt['SATAVG'] = this.SATAVG;
    }
    if (this.SATHIGH) {
      opt['SATHIGH'] = this.SATHIGH;
    }
    if (this.SATMAX) {
      opt['SATMAX'] = this.SATMAX;
    }
    if (this.HUEMED) {
      opt['HUEMED'] = this.HUEMED;
    }
    if (this.HUEAVG) {
      opt['HUEAVG'] = this.HUEAVG;
    }
    if (this.YDIF) {
      opt['YDIF'] = this.YDIF;
    }
    if (this.UDIF) {
      opt['UDIF'] = this.UDIF;
    }
    if (this.VDIF) {
      opt['VDIF'] = this.VDIF;
    }
    if (this.YBITDEPTH) {
      opt['YBITDEPTH'] = this.YBITDEPTH;
    }
    if (this.UBITDEPTH) {
      opt['UBITDEPTH'] = this.UBITDEPTH;
    }
    if (this.VBITDEPTH) {
      opt['VBITDEPTH'] = this.VBITDEPTH;
    }

    addFilter(this.ffmpeg, {
      filter: 'signalstats',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.signalstats = signalstats;
