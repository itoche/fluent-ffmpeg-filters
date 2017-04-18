const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the loudnorm function.
 *
 *
 * @example
 *  ffmpeg().loudnorm()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the loudnorm function.
 */
function loudnorm(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'loudnorm', function() {
    return new LoudnormFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class LoudnormFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    LoudnormFilter.prototype.withI = this.I;
    LoudnormFilter.prototype.withLRA = this.LRA;
    LoudnormFilter.prototype.withTP = this.TP;
    LoudnormFilter.prototype.withMeasured_I = this.measured_I;
    LoudnormFilter.prototype.withMeasured_LRA = this.measured_LRA;
    LoudnormFilter.prototype.withMeasured_TP = this.measured_TP;
    LoudnormFilter.prototype.withMeasured_thresh = this.measured_thresh;
    LoudnormFilter.prototype.withOffset = this.offset;
    LoudnormFilter.prototype.withLinear = this.linear;
    LoudnormFilter.prototype.withDual_mono = this.dual_mono;
    LoudnormFilter.prototype.withPrint_format = this.print_format;
  }

  /**
   * Set integrated loudness target.
   * Range is -70.0 - -5.0. Default value is -24.0.
   * 
   * 
   * @param val
   */
  I(val) {
    this._I = val;
    return this;
  }

  /**
   * Set loudness range target.
   * Range is 1.0 - 20.0. Default value is 7.0.
   * 
   * 
   * @param val
   */
  LRA(val) {
    this._LRA = val;
    return this;
  }

  /**
   * Set maximum true peak.
   * Range is -9.0 - +0.0. Default value is -2.0.
   * 
   * 
   * @param val
   */
  TP(val) {
    this._TP = val;
    return this;
  }

  /**
   * Measured IL of input file.
   * Range is -99.0 - +0.0.
   * 
   * 
   * @param val
   */
  measured_I(val) {
    this._measured_I = val;
    return this;
  }

  /**
   * Measured LRA of input file.
   * Range is  0.0 - 99.0.
   * 
   * 
   * @param val
   */
  measured_LRA(val) {
    this._measured_LRA = val;
    return this;
  }

  /**
   * Measured true peak of input file.
   * Range is  -99.0 - +99.0.
   * 
   * 
   * @param val
   */
  measured_TP(val) {
    this._measured_TP = val;
    return this;
  }

  /**
   * Measured threshold of input file.
   * Range is -99.0 - +0.0.
   * 
   * 
   * @param val
   */
  measured_thresh(val) {
    this._measured_thresh = val;
    return this;
  }

  /**
   * Set offset gain. Gain is applied before the true-peak limiter.
   * Range is  -99.0 - +99.0. Default is +0.0.
   * 
   * 
   * @param val
   */
  offset(val) {
    this._offset = val;
    return this;
  }

  /**
   * Normalize linearly if possible.
   * measured_I, measured_LRA, measured_TP, and measured_thresh must also
   * to be specified in order to use this mode.
   * Options are true or false. Default is true.
   * 
   * 
   * @param val
   */
  linear(val) {
    this._linear = val;
    return this;
  }

  /**
   * Treat mono input files as &quot;dual-mono&quot;. If a mono file is intended for playback
   * on a stereo system, its EBU R128 measurement will be perceptually incorrect.
   * If set to true, this option will compensate for this effect.
   * Multi-channel input files are not affected by this option.
   * Options are true or false. Default is false.
   * 
   * 
   * @param val
   */
  dual_mono(val) {
    this._dual_mono = val;
    return this;
  }

  /**
   * Set print format for stats. Options are summary, json, or none.
   * Default value is none.
   * 
   * @param val
   */
  print_format(val) {
    this._print_format = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._I) {
      opt['I'] = this._I;
    }
    if (this._LRA) {
      opt['LRA'] = this._LRA;
    }
    if (this._TP) {
      opt['TP'] = this._TP;
    }
    if (this._measured_I) {
      opt['measured_I'] = this._measured_I;
    }
    if (this._measured_LRA) {
      opt['measured_LRA'] = this._measured_LRA;
    }
    if (this._measured_TP) {
      opt['measured_TP'] = this._measured_TP;
    }
    if (this._measured_thresh) {
      opt['measured_thresh'] = this._measured_thresh;
    }
    if (this._offset) {
      opt['offset'] = this._offset;
    }
    if (this._linear) {
      opt['linear'] = this._linear;
    }
    if (this._dual_mono) {
      opt['dual_mono'] = this._dual_mono;
    }
    if (this._print_format) {
      opt['print_format'] = this._print_format;
    }

    addFilter(this.ffmpeg, {
      filter: 'loudnorm',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.loudnorm = loudnorm;
