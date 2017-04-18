const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the hdcd function.
 *
 *
 * @example
 *  ffmpeg().hdcd()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the hdcd function.
 */
function hdcd(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'hdcd', function() {
    return new HdcdFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class HdcdFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    HdcdFilter.prototype.withDisable_autoconvert = this.disable_autoconvert;
    HdcdFilter.prototype.withProcess_stereo = this.process_stereo;
    HdcdFilter.prototype.withCdt_ms = this.cdt_ms;
    HdcdFilter.prototype.withForce_pe = this.force_pe;
    HdcdFilter.prototype.withAnalyze_mode = this.analyze_mode;
  }

  /**
   * Disable any automatic format conversion or resampling in the filter graph.
   * 
   * 
   * @param val
   */
  disable_autoconvert(val) {
    this._disable_autoconvert = val;
    return this;
  }

  /**
   * Process the stereo channels together. If target_gain does not match between
   * channels, consider it invalid and use the last valid target_gain.
   * 
   * 
   * @param val
   */
  process_stereo(val) {
    this._process_stereo = val;
    return this;
  }

  /**
   * Set the code detect timer period in ms.
   * 
   * 
   * @param val
   */
  cdt_ms(val) {
    this._cdt_ms = val;
    return this;
  }

  /**
   * Always extend peaks above -3dBFS even if PE isn’t signaled.
   * 
   * 
   * @param val
   */
  force_pe(val) {
    this._force_pe = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  analyze_mode(val) {
    this._analyze_mode = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._disable_autoconvert) {
      opt['disable_autoconvert'] = this._disable_autoconvert;
    }
    if (this._process_stereo) {
      opt['process_stereo'] = this._process_stereo;
    }
    if (this._cdt_ms) {
      opt['cdt_ms'] = this._cdt_ms;
    }
    if (this._force_pe) {
      opt['force_pe'] = this._force_pe;
    }
    if (this._analyze_mode) {
      opt['analyze_mode'] = this._analyze_mode;
    }

    addFilter(this.ffmpeg, {
      filter: 'hdcd',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.hdcd = hdcd;
