const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the acrusher function.
 *
 *
 * @example
 *  ffmpeg().acrusher()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the acrusher function.
 */
function acrusher(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'acrusher', function() {
    return new AcrusherFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AcrusherFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    AcrusherFilter.prototype.withLevel_in = this.level_in;
    AcrusherFilter.prototype.withLevel_out = this.level_out;
    AcrusherFilter.prototype.withBits = this.bits;
    AcrusherFilter.prototype.withMix = this.mix;
    AcrusherFilter.prototype.withMode = this.mode;
    AcrusherFilter.prototype.withDc = this.dc;
    AcrusherFilter.prototype.withAa = this.aa;
    AcrusherFilter.prototype.withSamples = this.samples;
    AcrusherFilter.prototype.withLfo = this.lfo;
    AcrusherFilter.prototype.withLforange = this.lforange;
    AcrusherFilter.prototype.withLforate = this.lforate;
  }

  /**
   * Set level in.
   * 
   * 
   * @param val
   */
  level_in(val) {
    this._level_in = val;
    return this;
  }

  /**
   * Set level out.
   * 
   * 
   * @param val
   */
  level_out(val) {
    this._level_out = val;
    return this;
  }

  /**
   * Set bit reduction.
   * 
   * 
   * @param val
   */
  bits(val) {
    this._bits = val;
    return this;
  }

  /**
   * Set mixing amount.
   * 
   * 
   * @param val
   */
  mix(val) {
    this._mix = val;
    return this;
  }

  /**
   * Can be linear: lin or logarithmic: log.
   * 
   * 
   * @param val
   */
  mode(val) {
    this._mode = val;
    return this;
  }

  /**
   * Set DC.
   * 
   * 
   * @param val
   */
  dc(val) {
    this._dc = val;
    return this;
  }

  /**
   * Set anti-aliasing.
   * 
   * 
   * @param val
   */
  aa(val) {
    this._aa = val;
    return this;
  }

  /**
   * Set sample reduction.
   * 
   * 
   * @param val
   */
  samples(val) {
    this._samples = val;
    return this;
  }

  /**
   * Enable LFO. By default disabled.
   * 
   * 
   * @param val
   */
  lfo(val) {
    this._lfo = val;
    return this;
  }

  /**
   * Set LFO range.
   * 
   * 
   * @param val
   */
  lforange(val) {
    this._lforange = val;
    return this;
  }

  /**
   * Set LFO rate.
   * 
   * @param val
   */
  lforate(val) {
    this._lforate = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._level_in) {
      opt['level_in'] = this._level_in;
    }
    if (this._level_out) {
      opt['level_out'] = this._level_out;
    }
    if (this._bits) {
      opt['bits'] = this._bits;
    }
    if (this._mix) {
      opt['mix'] = this._mix;
    }
    if (this._mode) {
      opt['mode'] = this._mode;
    }
    if (this._dc) {
      opt['dc'] = this._dc;
    }
    if (this._aa) {
      opt['aa'] = this._aa;
    }
    if (this._samples) {
      opt['samples'] = this._samples;
    }
    if (this._lfo) {
      opt['lfo'] = this._lfo;
    }
    if (this._lforange) {
      opt['lforange'] = this._lforange;
    }
    if (this._lforate) {
      opt['lforate'] = this._lforate;
    }

    addFilter(this.ffmpeg, {
      filter: 'acrusher',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.acrusher = acrusher;
