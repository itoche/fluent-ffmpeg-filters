const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the chromakey function.
 *
 *
 * @example
 *  ffmpeg().chromakey()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the chromakey function.
 */
function chromakey(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'chromakey', function() {
    return new ChromakeyFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ChromakeyFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    ChromakeyFilter.prototype.withColor = this.color;
    ChromakeyFilter.prototype.withSimilarity = this.similarity;
    ChromakeyFilter.prototype.withBlend = this.blend;
    ChromakeyFilter.prototype.withYuv = this.yuv;
  }

  /**
   * The color which will be replaced with transparency.
   * 
   * 
   * @param val
   */
  color(val) {
    this._color = val;
    return this;
  }

  /**
   * Similarity percentage with the key color.
   * 
   * 0.01 matches only the exact key color, while 1.0 matches everything.
   * 
   * 
   * @param val
   */
  similarity(val) {
    this._similarity = val;
    return this;
  }

  /**
   * Blend percentage.
   * 
   * 0.0 makes pixels either fully transparent, or not transparent at all.
   * 
   * Higher values result in semi-transparent pixels, with a higher transparency
   * the more similar the pixels color is to the key color.
   * 
   * 
   * @param val
   */
  blend(val) {
    this._blend = val;
    return this;
  }

  /**
   * Signals that the color passed is already in YUV instead of RGB.
   * 
   * Litteral colors like &quot;green&quot; or &quot;red&quot; don’t make sense with this enabled anymore.
   * This can be used to pass exact YUV values as hexadecimal numbers.
   * 
   * @param val
   */
  yuv(val) {
    this._yuv = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._color) {
      opt['color'] = this._color;
    }
    if (this._similarity) {
      opt['similarity'] = this._similarity;
    }
    if (this._blend) {
      opt['blend'] = this._blend;
    }
    if (this._yuv) {
      opt['yuv'] = this._yuv;
    }

    addFilter(this.ffmpeg, {
      filter: 'chromakey',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.chromakey = chromakey;
