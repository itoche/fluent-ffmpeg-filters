const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the lutyuv function.
 *
 *
 * @example
 *  ffmpeg().lutyuv()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the lutyuv function.
 */
function lutyuv(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'lutyuv', function() {
    return new LutyuvFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class LutyuvFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Lutyuv.prototype.withC0 = c0;
    Lutyuv.prototype.withC1 = c1;
    Lutyuv.prototype.withC2 = c2;
    Lutyuv.prototype.withC3 = c3;
    Lutyuv.prototype.withR = r;
    Lutyuv.prototype.withG = g;
    Lutyuv.prototype.withB = b;
    Lutyuv.prototype.withA = a;
    Lutyuv.prototype.withY = y;
    Lutyuv.prototype.withU = u;
    Lutyuv.prototype.withV = v;
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
   * 
   * @param val
   */
  c3(val) {
    this.c3 = val;
    return this;
  }

  /**
   * set red component expression
   * 
   * @param val
   */
  r(val) {
    this.r = val;
    return this;
  }

  /**
   * set green component expression
   * 
   * @param val
   */
  g(val) {
    this.g = val;
    return this;
  }

  /**
   * set blue component expression
   * 
   * @param val
   */
  b(val) {
    this.b = val;
    return this;
  }

  /**
   * alpha component expression
   * 
   * 
   * @param val
   */
  a(val) {
    this.a = val;
    return this;
  }

  /**
   * set Y/luminance component expression
   * 
   * @param val
   */
  y(val) {
    this.y = val;
    return this;
  }

  /**
   * set U/Cb component expression
   * 
   * @param val
   */
  u(val) {
    this.u = val;
    return this;
  }

  /**
   * set V/Cr component expression
   * 
   * @param val
   */
  v(val) {
    this.v = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.c0) {
      opt.c0 = this.c0;
    }
    if (this.c1) {
      opt.c1 = this.c1;
    }
    if (this.c2) {
      opt.c2 = this.c2;
    }
    if (this.c3) {
      opt.c3 = this.c3;
    }
    if (this.r) {
      opt.r = this.r;
    }
    if (this.g) {
      opt.g = this.g;
    }
    if (this.b) {
      opt.b = this.b;
    }
    if (this.a) {
      opt.a = this.a;
    }
    if (this.y) {
      opt.y = this.y;
    }
    if (this.u) {
      opt.u = this.u;
    }
    if (this.v) {
      opt.v = this.v;
    }

    addFilter(this.ffmpeg, {
      filter: 'lutyuv',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.lutyuv = lutyuv;
