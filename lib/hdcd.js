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
    HdcdFilter.prototype.withDisable_autoconvert = disable_autoconvert;
    HdcdFilter.prototype.withProcess_stereo = process_stereo;
    HdcdFilter.prototype.withCdt_ms = cdt_ms;
    HdcdFilter.prototype.withForce_pe = force_pe;
    HdcdFilter.prototype.withAnalyze_mode = analyze_mode;
  }

  /**
   * Disable any automatic format conversion or resampling in the filter graph.
   * 
   * 
   * @param val
   */
  disable_autoconvert(val) {
    this.disable_autoconvert = val;
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
    this.process_stereo = val;
    return this;
  }

  /**
   * Set the code detect timer period in ms.
   * 
   * 
   * @param val
   */
  cdt_ms(val) {
    this.cdt_ms = val;
    return this;
  }

  /**
   * Always extend peaks above -3dBFS even if PE isn’t signaled.
   * 
   * 
   * @param val
   */
  force_pe(val) {
    this.force_pe = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  analyze_mode(val) {
    this.analyze_mode = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.disable_autoconvert) {
      opt['disable_autoconvert'] = this.disable_autoconvert;
    }
    if (this.process_stereo) {
      opt['process_stereo'] = this.process_stereo;
    }
    if (this.cdt_ms) {
      opt['cdt_ms'] = this.cdt_ms;
    }
    if (this.force_pe) {
      opt['force_pe'] = this.force_pe;
    }
    if (this.analyze_mode) {
      opt['analyze_mode'] = this.analyze_mode;
    }

    addFilter(this.ffmpeg, {
      filter: 'hdcd',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.hdcd = hdcd;
