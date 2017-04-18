const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the firequalizer function.
 *
 *
 * @example
 *  ffmpeg().firequalizer()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the firequalizer function.
 */
function firequalizer(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'firequalizer', function() {
    return new FirequalizerFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class FirequalizerFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    FirequalizerFilter.prototype.withGain = this.gain;
    FirequalizerFilter.prototype.withGain_entry = this.gain_entry;
    FirequalizerFilter.prototype.withDelay = this.delay;
    FirequalizerFilter.prototype.withAccuracy = this.accuracy;
    FirequalizerFilter.prototype.withWfunc = this.wfunc;
    FirequalizerFilter.prototype.withFixed = this.fixed;
    FirequalizerFilter.prototype.withMulti = this.multi;
    FirequalizerFilter.prototype.withZero_phase = this.zero_phase;
    FirequalizerFilter.prototype.withScale = this.scale;
    FirequalizerFilter.prototype.withDumpfile = this.dumpfile;
    FirequalizerFilter.prototype.withDumpscale = this.dumpscale;
    FirequalizerFilter.prototype.withFft2 = this.fft2;
  }

  /**
   * 
   * @param val
   */
  gain(val) {
    this._gain = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  gain_entry(val) {
    this._gain_entry = val;
    return this;
  }

  /**
   * Set filter delay in seconds. Higher value means more accurate.
   * Default is 0.01.
   * 
   * 
   * @param val
   */
  delay(val) {
    this._delay = val;
    return this;
  }

  /**
   * Set filter accuracy in Hz. Lower value means more accurate.
   * Default is 5.
   * 
   * 
   * @param val
   */
  accuracy(val) {
    this._accuracy = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  wfunc(val) {
    this._wfunc = val;
    return this;
  }

  /**
   * If enabled, use fixed number of audio samples. This improves speed when
   * filtering with large delay. Default is disabled.
   * 
   * 
   * @param val
   */
  fixed(val) {
    this._fixed = val;
    return this;
  }

  /**
   * Enable multichannels evaluation on gain. Default is disabled.
   * 
   * 
   * @param val
   */
  multi(val) {
    this._multi = val;
    return this;
  }

  /**
   * Enable zero phase mode by subtracting timestamp to compensate delay.
   * Default is disabled.
   * 
   * 
   * @param val
   */
  zero_phase(val) {
    this._zero_phase = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  scale(val) {
    this._scale = val;
    return this;
  }

  /**
   * Set file for dumping, suitable for gnuplot.
   * 
   * 
   * @param val
   */
  dumpfile(val) {
    this._dumpfile = val;
    return this;
  }

  /**
   * Set scale for dumpfile. Acceptable values are same with scale option.
   * Default is linlog.
   * 
   * 
   * @param val
   */
  dumpscale(val) {
    this._dumpscale = val;
    return this;
  }

  /**
   * Enable 2-channel convolution using complex FFT. This improves speed significantly.
   * Default is disabled.
   * 
   * @param val
   */
  fft2(val) {
    this._fft2 = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._gain) {
      opt['gain'] = this._gain;
    }
    if (this._gain_entry) {
      opt['gain_entry'] = this._gain_entry;
    }
    if (this._delay) {
      opt['delay'] = this._delay;
    }
    if (this._accuracy) {
      opt['accuracy'] = this._accuracy;
    }
    if (this._wfunc) {
      opt['wfunc'] = this._wfunc;
    }
    if (this._fixed) {
      opt['fixed'] = this._fixed;
    }
    if (this._multi) {
      opt['multi'] = this._multi;
    }
    if (this._zero_phase) {
      opt['zero_phase'] = this._zero_phase;
    }
    if (this._scale) {
      opt['scale'] = this._scale;
    }
    if (this._dumpfile) {
      opt['dumpfile'] = this._dumpfile;
    }
    if (this._dumpscale) {
      opt['dumpscale'] = this._dumpscale;
    }
    if (this._fft2) {
      opt['fft2'] = this._fft2;
    }

    addFilter(this.ffmpeg, {
      filter: 'firequalizer',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.firequalizer = firequalizer;
