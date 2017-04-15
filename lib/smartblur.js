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
    Smartblur.prototype.withLuma_radius = luma_radius;
    Smartblur.prototype.withLuma_strength = luma_strength;
    Smartblur.prototype.withLuma_threshold = luma_threshold;
    Smartblur.prototype.withChroma_radius = chroma_radius;
    Smartblur.prototype.withChroma_strength = chroma_strength;
    Smartblur.prototype.withChroma_threshold = chroma_threshold;
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
    this.luma_radius = val;
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
    this.luma_strength = val;
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
    this.luma_threshold = val;
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
    this.chroma_radius = val;
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
    this.chroma_strength = val;
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
    this.chroma_threshold = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.luma_radius) {
      opt['luma_radius'] = this.luma_radius;
    }
    if (this.luma_strength) {
      opt['luma_strength'] = this.luma_strength;
    }
    if (this.luma_threshold) {
      opt['luma_threshold'] = this.luma_threshold;
    }
    if (this.chroma_radius) {
      opt['chroma_radius'] = this.chroma_radius;
    }
    if (this.chroma_strength) {
      opt['chroma_strength'] = this.chroma_strength;
    }
    if (this.chroma_threshold) {
      opt['chroma_threshold'] = this.chroma_threshold;
    }

    addFilter(this.ffmpeg, {
      filter: 'smartblur',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.smartblur = smartblur;
