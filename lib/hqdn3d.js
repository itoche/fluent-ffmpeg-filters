const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the hqdn3d function.
 *
 *
 * @example
 *  ffmpeg().hqdn3d()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the hqdn3d function.
 */
function hqdn3d(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'hqdn3d', function() {
    return new Hqdn3dFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class Hqdn3dFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Hqdn3dFilter.prototype.withLuma_spatial = this.luma_spatial;
    Hqdn3dFilter.prototype.withChroma_spatial = this.chroma_spatial;
    Hqdn3dFilter.prototype.withLuma_tmp = this.luma_tmp;
    Hqdn3dFilter.prototype.withChroma_tmp = this.chroma_tmp;
  }

  /**
   * A non-negative floating point number which specifies spatial luma strength.
   * It defaults to 4.0.
   * 
   * 
   * @param val
   */
  luma_spatial(val) {
    this._luma_spatial = val;
    return this;
  }

  /**
   * A non-negative floating point number which specifies spatial chroma strength.
   * It defaults to 3.0*luma_spatial/4.0.
   * 
   * 
   * @param val
   */
  chroma_spatial(val) {
    this._chroma_spatial = val;
    return this;
  }

  /**
   * A floating point number which specifies luma temporal strength. It defaults to
   * 6.0*luma_spatial/4.0.
   * 
   * 
   * @param val
   */
  luma_tmp(val) {
    this._luma_tmp = val;
    return this;
  }

  /**
   * A floating point number which specifies chroma temporal strength. It defaults to
   * luma_tmp*chroma_spatial/luma_spatial.
   * 
   * @param val
   */
  chroma_tmp(val) {
    this._chroma_tmp = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._luma_spatial) {
      opt['luma_spatial'] = this._luma_spatial;
    }
    if (this._chroma_spatial) {
      opt['chroma_spatial'] = this._chroma_spatial;
    }
    if (this._luma_tmp) {
      opt['luma_tmp'] = this._luma_tmp;
    }
    if (this._chroma_tmp) {
      opt['chroma_tmp'] = this._chroma_tmp;
    }

    addFilter(this.ffmpeg, {
      filter: 'hqdn3d',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.hqdn3d = hqdn3d;
