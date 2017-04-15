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
    Chromakey.prototype.withColor = color;
    Chromakey.prototype.withSimilarity = similarity;
    Chromakey.prototype.withBlend = blend;
    Chromakey.prototype.withYuv = yuv;
  }

  /**
   * The color which will be replaced with transparency.
   * 
   * 
   * @param val
   */
  color(val) {
    this.color = val;
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
    this.similarity = val;
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
    this.blend = val;
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
    this.yuv = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.color) {
      opt['color'] = this.color;
    }
    if (this.similarity) {
      opt['similarity'] = this.similarity;
    }
    if (this.blend) {
      opt['blend'] = this.blend;
    }
    if (this.yuv) {
      opt['yuv'] = this.yuv;
    }

    addFilter(this.ffmpeg, {
      filter: 'chromakey',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.chromakey = chromakey;
