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
    this.level_in = val;
    return this;
  }

  /**
   * Set level out.
   * 
   * 
   * @param val
   */
  level_out(val) {
    this.level_out = val;
    return this;
  }

  /**
   * Set bit reduction.
   * 
   * 
   * @param val
   */
  bits(val) {
    this.bits = val;
    return this;
  }

  /**
   * Set mixing amount.
   * 
   * 
   * @param val
   */
  mix(val) {
    this.mix = val;
    return this;
  }

  /**
   * Can be linear: lin or logarithmic: log.
   * 
   * 
   * @param val
   */
  mode(val) {
    this.mode = val;
    return this;
  }

  /**
   * Set DC.
   * 
   * 
   * @param val
   */
  dc(val) {
    this.dc = val;
    return this;
  }

  /**
   * Set anti-aliasing.
   * 
   * 
   * @param val
   */
  aa(val) {
    this.aa = val;
    return this;
  }

  /**
   * Set sample reduction.
   * 
   * 
   * @param val
   */
  samples(val) {
    this.samples = val;
    return this;
  }

  /**
   * Enable LFO. By default disabled.
   * 
   * 
   * @param val
   */
  lfo(val) {
    this.lfo = val;
    return this;
  }

  /**
   * Set LFO range.
   * 
   * 
   * @param val
   */
  lforange(val) {
    this.lforange = val;
    return this;
  }

  /**
   * Set LFO rate.
   * 
   * @param val
   */
  lforate(val) {
    this.lforate = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.level_in) {
      opt['level_in'] = this.level_in;
    }
    if (this.level_out) {
      opt['level_out'] = this.level_out;
    }
    if (this.bits) {
      opt['bits'] = this.bits;
    }
    if (this.mix) {
      opt['mix'] = this.mix;
    }
    if (this.mode) {
      opt['mode'] = this.mode;
    }
    if (this.dc) {
      opt['dc'] = this.dc;
    }
    if (this.aa) {
      opt['aa'] = this.aa;
    }
    if (this.samples) {
      opt['samples'] = this.samples;
    }
    if (this.lfo) {
      opt['lfo'] = this.lfo;
    }
    if (this.lforange) {
      opt['lforange'] = this.lforange;
    }
    if (this.lforate) {
      opt['lforate'] = this.lforate;
    }

    addFilter(this.ffmpeg, {
      filter: 'acrusher',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.acrusher = acrusher;
