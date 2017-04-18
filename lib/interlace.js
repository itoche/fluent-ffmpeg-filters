const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the interlace function.
 *
 *
 * @example
 *  ffmpeg().interlace()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the interlace function.
 */
function interlace(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'interlace', function() {
    return new InterlaceFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class InterlaceFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    InterlaceFilter.prototype.withScan = this.scan;
    InterlaceFilter.prototype.withLowpass = this.lowpass;
  }

  /**
   * This determines whether the interlaced frame is taken from the even
   * (tff - default) or odd (bff) lines of the progressive frame.
   * 
   * 
   * @param val
   */
  scan(val) {
    this._scan = val;
    return this;
  }

  /**
   * Enable (default) or disable the vertical lowpass filter to avoid twitter
   * interlacing and reduce moire patterns.
   * 
   * @param val
   */
  lowpass(val) {
    this._lowpass = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._scan) {
      opt['scan'] = this._scan;
    }
    if (this._lowpass) {
      opt['lowpass'] = this._lowpass;
    }

    addFilter(this.ffmpeg, {
      filter: 'interlace',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.interlace = interlace;
