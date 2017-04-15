const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the owdenoise function.
 *
 *
 * @example
 *  ffmpeg().owdenoise()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the owdenoise function.
 */
function owdenoise(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'owdenoise', function() {
    return new OwdenoiseFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class OwdenoiseFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    OwdenoiseFilter.prototype.withDepth = this.depth;
    OwdenoiseFilter.prototype.withLuma_strength = this.luma_strength;
    OwdenoiseFilter.prototype.withChroma_strength = this.chroma_strength;
  }

  /**
   * Set depth.
   * 
   * Larger depth values will denoise lower frequency components more, but
   * slow down filtering.
   * 
   * Must be an int in the range 8-16, default is 8.
   * 
   * 
   * @param val
   */
  depth(val) {
    this.depth = val;
    return this;
  }

  /**
   * Set luma strength.
   * 
   * Must be a double value in the range 0-1000, default is 1.0.
   * 
   * 
   * @param val
   */
  luma_strength(val) {
    this.luma_strength = val;
    return this;
  }

  /**
   * Set chroma strength.
   * 
   * Must be a double value in the range 0-1000, default is 1.0.
   * 
   * @param val
   */
  chroma_strength(val) {
    this.chroma_strength = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.depth) {
      opt['depth'] = this.depth;
    }
    if (this.luma_strength) {
      opt['luma_strength'] = this.luma_strength;
    }
    if (this.chroma_strength) {
      opt['chroma_strength'] = this.chroma_strength;
    }

    addFilter(this.ffmpeg, {
      filter: 'owdenoise',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.owdenoise = owdenoise;
