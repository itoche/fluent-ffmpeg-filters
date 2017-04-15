const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the lut2 function.
 *
 *
 * @example
 *  ffmpeg().lut2()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the lut2 function.
 */
function lut2(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'lut2', function() {
    return new Lut2Filter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class Lut2Filter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Lut2.prototype.withC0 = c0;
    Lut2.prototype.withC1 = c1;
    Lut2.prototype.withC2 = c2;
    Lut2.prototype.withC3 = c3;
  }

  /**
   * set first pixel component expression
   * 
   * @param val
   */
  c0(val) {
    this.c0 = val;
    return this;
  }

  /**
   * set second pixel component expression
   * 
   * @param val
   */
  c1(val) {
    this.c1 = val;
    return this;
  }

  /**
   * set third pixel component expression
   * 
   * @param val
   */
  c2(val) {
    this.c2 = val;
    return this;
  }

  /**
   * set fourth pixel component expression, corresponds to the alpha component
   * 
   * @param val
   */
  c3(val) {
    this.c3 = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.c0) {
      opt['c0'] = this.c0;
    }
    if (this.c1) {
      opt['c1'] = this.c1;
    }
    if (this.c2) {
      opt['c2'] = this.c2;
    }
    if (this.c3) {
      opt['c3'] = this.c3;
    }

    addFilter(this.ffmpeg, {
      filter: 'lut2',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.lut2 = lut2;
