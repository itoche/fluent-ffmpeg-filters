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
    FirequalizerFilter.prototype.withGain = gain;
    FirequalizerFilter.prototype.withGain_entry = gain_entry;
    FirequalizerFilter.prototype.withDelay = delay;
    FirequalizerFilter.prototype.withAccuracy = accuracy;
    FirequalizerFilter.prototype.withWfunc = wfunc;
    FirequalizerFilter.prototype.withFixed = fixed;
    FirequalizerFilter.prototype.withMulti = multi;
    FirequalizerFilter.prototype.withZero_phase = zero_phase;
    FirequalizerFilter.prototype.withScale = scale;
    FirequalizerFilter.prototype.withDumpfile = dumpfile;
    FirequalizerFilter.prototype.withDumpscale = dumpscale;
    FirequalizerFilter.prototype.withFft2 = fft2;
  }

  /**
   * 
   * @param val
   */
  gain(val) {
    this.gain = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  gain_entry(val) {
    this.gain_entry = val;
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
    this.delay = val;
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
    this.accuracy = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  wfunc(val) {
    this.wfunc = val;
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
    this.fixed = val;
    return this;
  }

  /**
   * Enable multichannels evaluation on gain. Default is disabled.
   * 
   * 
   * @param val
   */
  multi(val) {
    this.multi = val;
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
    this.zero_phase = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  scale(val) {
    this.scale = val;
    return this;
  }

  /**
   * Set file for dumping, suitable for gnuplot.
   * 
   * 
   * @param val
   */
  dumpfile(val) {
    this.dumpfile = val;
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
    this.dumpscale = val;
    return this;
  }

  /**
   * Enable 2-channel convolution using complex FFT. This improves speed significantly.
   * Default is disabled.
   * 
   * @param val
   */
  fft2(val) {
    this.fft2 = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.gain) {
      opt['gain'] = this.gain;
    }
    if (this.gain_entry) {
      opt['gain_entry'] = this.gain_entry;
    }
    if (this.delay) {
      opt['delay'] = this.delay;
    }
    if (this.accuracy) {
      opt['accuracy'] = this.accuracy;
    }
    if (this.wfunc) {
      opt['wfunc'] = this.wfunc;
    }
    if (this.fixed) {
      opt['fixed'] = this.fixed;
    }
    if (this.multi) {
      opt['multi'] = this.multi;
    }
    if (this.zero_phase) {
      opt['zero_phase'] = this.zero_phase;
    }
    if (this.scale) {
      opt['scale'] = this.scale;
    }
    if (this.dumpfile) {
      opt['dumpfile'] = this.dumpfile;
    }
    if (this.dumpscale) {
      opt['dumpscale'] = this.dumpscale;
    }
    if (this.fft2) {
      opt['fft2'] = this.fft2;
    }

    addFilter(this.ffmpeg, {
      filter: 'firequalizer',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.firequalizer = firequalizer;
