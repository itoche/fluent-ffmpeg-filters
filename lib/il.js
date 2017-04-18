const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the il function.
 *
 *
 * @example
 *  ffmpeg().il()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the il function.
 */
function il(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'il', function() {
    return new IlFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class IlFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    IlFilter.prototype.withLuma_mode = this.luma_mode;
    IlFilter.prototype.withChroma_mode = this.chroma_mode;
    IlFilter.prototype.withAlpha_mode = this.alpha_mode;
    IlFilter.prototype.withLuma_swap = this.luma_swap;
    IlFilter.prototype.withChroma_swap = this.chroma_swap;
    IlFilter.prototype.withAlpha_swap = this.alpha_swap;
  }

  /**
   * 
   * @param val
   */
  luma_mode(val) {
    this._luma_mode = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  chroma_mode(val) {
    this._chroma_mode = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  alpha_mode(val) {
    this._alpha_mode = val;
    return this;
  }

  /**
   * Swap luma/chroma/alpha fields. Exchange even &amp; odd lines. Default value is 0.
   * 
   * @param val
   */
  luma_swap(val) {
    this._luma_swap = val;
    return this;
  }

  /**
   * Swap luma/chroma/alpha fields. Exchange even &amp; odd lines. Default value is 0.
   * 
   * @param val
   */
  chroma_swap(val) {
    this._chroma_swap = val;
    return this;
  }

  /**
   * Swap luma/chroma/alpha fields. Exchange even &amp; odd lines. Default value is 0.
   * 
   * @param val
   */
  alpha_swap(val) {
    this._alpha_swap = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._luma_mode) {
      opt['luma_mode'] = this._luma_mode;
    }
    if (this._chroma_mode) {
      opt['chroma_mode'] = this._chroma_mode;
    }
    if (this._alpha_mode) {
      opt['alpha_mode'] = this._alpha_mode;
    }
    if (this._luma_swap) {
      opt['luma_swap'] = this._luma_swap;
    }
    if (this._chroma_swap) {
      opt['chroma_swap'] = this._chroma_swap;
    }
    if (this._alpha_swap) {
      opt['alpha_swap'] = this._alpha_swap;
    }

    addFilter(this.ffmpeg, {
      filter: 'il',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.il = il;
