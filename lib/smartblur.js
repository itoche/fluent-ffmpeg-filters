const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the smartblur function.
 *
 *
 * @example
 *  ffmpeg().smartblur()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the smartblur function.
 */
function smartblur(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'smartblur', function() {
    return new SmartblurFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class SmartblurFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    SmartblurFilter.prototype.withLuma_radius = this.luma_radius;
    SmartblurFilter.prototype.withLuma_strength = this.luma_strength;
    SmartblurFilter.prototype.withLuma_threshold = this.luma_threshold;
    SmartblurFilter.prototype.withChroma_radius = this.chroma_radius;
    SmartblurFilter.prototype.withChroma_strength = this.chroma_strength;
    SmartblurFilter.prototype.withChroma_threshold = this.chroma_threshold;
  }

  /**
   * Set the luma radius. The option value must be a float number in
   * the range [0.1,5.0] that specifies the variance of the gaussian filter
   * used to blur the image (slower if larger). Default value is 1.0.
   * 
   * 
   * @param val
   */
  luma_radius(val) {
    this._luma_radius = val;
    return this;
  }

  /**
   * Set the luma strength. The option value must be a float number
   * in the range [-1.0,1.0] that configures the blurring. A value included
   * in [0.0,1.0] will blur the image whereas a value included in
   * [-1.0,0.0] will sharpen the image. Default value is 1.0.
   * 
   * 
   * @param val
   */
  luma_strength(val) {
    this._luma_strength = val;
    return this;
  }

  /**
   * Set the luma threshold used as a coefficient to determine
   * whether a pixel should be blurred or not. The option value must be an
   * integer in the range [-30,30]. A value of 0 will filter all the image,
   * a value included in [0,30] will filter flat areas and a value included
   * in [-30,0] will filter edges. Default value is 0.
   * 
   * 
   * @param val
   */
  luma_threshold(val) {
    this._luma_threshold = val;
    return this;
  }

  /**
   * Set the chroma radius. The option value must be a float number in
   * the range [0.1,5.0] that specifies the variance of the gaussian filter
   * used to blur the image (slower if larger). Default value is luma_radius.
   * 
   * 
   * @param val
   */
  chroma_radius(val) {
    this._chroma_radius = val;
    return this;
  }

  /**
   * Set the chroma strength. The option value must be a float number
   * in the range [-1.0,1.0] that configures the blurring. A value included
   * in [0.0,1.0] will blur the image whereas a value included in
   * [-1.0,0.0] will sharpen the image. Default value is luma_strength.
   * 
   * 
   * @param val
   */
  chroma_strength(val) {
    this._chroma_strength = val;
    return this;
  }

  /**
   * Set the chroma threshold used as a coefficient to determine
   * whether a pixel should be blurred or not. The option value must be an
   * integer in the range [-30,30]. A value of 0 will filter all the image,
   * a value included in [0,30] will filter flat areas and a value included
   * in [-30,0] will filter edges. Default value is luma_threshold.
   * 
   * @param val
   */
  chroma_threshold(val) {
    this._chroma_threshold = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._luma_radius) {
      opt['luma_radius'] = this._luma_radius;
    }
    if (this._luma_strength) {
      opt['luma_strength'] = this._luma_strength;
    }
    if (this._luma_threshold) {
      opt['luma_threshold'] = this._luma_threshold;
    }
    if (this._chroma_radius) {
      opt['chroma_radius'] = this._chroma_radius;
    }
    if (this._chroma_strength) {
      opt['chroma_strength'] = this._chroma_strength;
    }
    if (this._chroma_threshold) {
      opt['chroma_threshold'] = this._chroma_threshold;
    }

    addFilter(this.ffmpeg, {
      filter: 'smartblur',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.smartblur = smartblur;
