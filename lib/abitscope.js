const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the abitscope function.
 *
 *
 * @example
 *  ffmpeg().abitscope()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the abitscope function.
 */
function abitscope(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'abitscope', function() {
    return new AbitscopeFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AbitscopeFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Abitscope.prototype.withRate = rate;
    Abitscope.prototype.withSize = size;
    Abitscope.prototype.withColors = colors;
  }

  /**
   * Set frame rate, expressed as number of frames per second. Default
   * value is &quot;25&quot;.
   * 
   * 
   * @param val
   */
  rate(val) {
    this.rate = val;
    return this;
  }

  /**
   * Specify the video size for the output. For the syntax of this option, check the
   * (ffmpeg-utils)&quot;Video size&quot; section in the ffmpeg-utils manual.
   * Default value is 1024x256.
   * 
   * 
   * @param val
   */
  size(val) {
    this.size = val;
    return this;
  }

  /**
   * Specify list of colors separated by space or by ’|’ which will be used to
   * draw channels. Unrecognized or missing colors will be replaced
   * by white color.
   * 
   * @param val
   */
  colors(val) {
    this.colors = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.rate) {
      opt['rate'] = this.rate;
    }
    if (this.size) {
      opt['size'] = this.size;
    }
    if (this.colors) {
      opt['colors'] = this.colors;
    }

    addFilter(this.ffmpeg, {
      filter: 'abitscope',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.abitscope = abitscope;
