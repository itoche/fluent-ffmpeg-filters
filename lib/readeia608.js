const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the readeia608 function.
 *
 *
 * @example
 *  ffmpeg().readeia608()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the readeia608 function.
 */
function readeia608(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'readeia608', function() {
    return new Readeia608Filter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class Readeia608Filter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Readeia608Filter.prototype.withLavfi_readeia608_X_cc = lavfi_readeia608_X_cc;
    Readeia608Filter.prototype.withLavfi_readeia608_X_line = lavfi_readeia608_X_line;
  }

  /**
   * The two bytes stored as EIA-608 data (printed in hexadecimal).
   * 
   * 
   * @param val
   */
  lavfi_readeia608_X_cc(val) {
    this.lavfi_readeia608_X_cc = val;
    return this;
  }

  /**
   * The number of the line on which the EIA-608 data was identified and read.
   * 
   * @param val
   */
  lavfi_readeia608_X_line(val) {
    this.lavfi_readeia608_X_line = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.lavfi_readeia608_X_cc) {
      opt['lavfi.readeia608.X.cc'] = this.lavfi_readeia608_X_cc;
    }
    if (this.lavfi_readeia608_X_line) {
      opt['lavfi.readeia608.X.line'] = this.lavfi_readeia608_X_line;
    }

    addFilter(this.ffmpeg, {
      filter: 'readeia608',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.readeia608 = readeia608;
