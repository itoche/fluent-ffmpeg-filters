const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the nlmeans function.
 *
 *
 * @example
 *  ffmpeg().nlmeans()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the nlmeans function.
 */
function nlmeans(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'nlmeans', function() {
    return new NlmeansFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class NlmeansFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Nlmeans.prototype.withS = s;
    Nlmeans.prototype.withP = p;
    Nlmeans.prototype.withPc = pc;
    Nlmeans.prototype.withR = r;
    Nlmeans.prototype.withRc = rc;
  }

  /**
   * Set denoising strength.
   * 
   * 
   * @param val
   */
  s(val) {
    this.s = val;
    return this;
  }

  /**
   * Set patch size.
   * 
   * 
   * @param val
   */
  p(val) {
    this.p = val;
    return this;
  }

  /**
   * Same as p but for chroma planes.
   * 
   * The default value is 0 and means automatic.
   * 
   * 
   * @param val
   */
  pc(val) {
    this.pc = val;
    return this;
  }

  /**
   * Set research size.
   * 
   * 
   * @param val
   */
  r(val) {
    this.r = val;
    return this;
  }

  /**
   * Same as r but for chroma planes.
   * 
   * The default value is 0 and means automatic.
   * 
   * @param val
   */
  rc(val) {
    this.rc = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.s) {
      opt.s = this.s;
    }
    if (this.p) {
      opt.p = this.p;
    }
    if (this.pc) {
      opt.pc = this.pc;
    }
    if (this.r) {
      opt.r = this.r;
    }
    if (this.rc) {
      opt.rc = this.rc;
    }

    addFilter(this.ffmpeg, {
      filter: 'nlmeans',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.nlmeans = nlmeans;
