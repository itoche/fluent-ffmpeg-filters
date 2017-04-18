const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the nlmeans function.
 *
 *
 * @example
 *  ffmpeg().nlmeans()
 *    ...             // call filter configuration functions
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
    NlmeansFilter.prototype.withS = this.s;
    NlmeansFilter.prototype.withP = this.p;
    NlmeansFilter.prototype.withPc = this.pc;
    NlmeansFilter.prototype.withR = this.r;
    NlmeansFilter.prototype.withRc = this.rc;
  }

  /**
   * Set denoising strength.
   * 
   * 
   * @param val
   */
  s(val) {
    this._s = val;
    return this;
  }

  /**
   * Set patch size.
   * 
   * 
   * @param val
   */
  p(val) {
    this._p = val;
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
    this._pc = val;
    return this;
  }

  /**
   * Set research size.
   * 
   * 
   * @param val
   */
  r(val) {
    this._r = val;
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
    this._rc = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._s) {
      opt['s'] = this._s;
    }
    if (this._p) {
      opt['p'] = this._p;
    }
    if (this._pc) {
      opt['pc'] = this._pc;
    }
    if (this._r) {
      opt['r'] = this._r;
    }
    if (this._rc) {
      opt['rc'] = this._rc;
    }

    addFilter(this.ffmpeg, {
      filter: 'nlmeans',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.nlmeans = nlmeans;
