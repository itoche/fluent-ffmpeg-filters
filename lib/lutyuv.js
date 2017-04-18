const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the lutyuv function.
 *
 *
 * @example
 *  ffmpeg().lutyuv()
 *    ...             // call filter configuration functions
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
    LutyuvFilter.prototype.withC0 = this.c0;
    LutyuvFilter.prototype.withC1 = this.c1;
    LutyuvFilter.prototype.withC2 = this.c2;
    LutyuvFilter.prototype.withC3 = this.c3;
    LutyuvFilter.prototype.withR = this.r;
    LutyuvFilter.prototype.withG = this.g;
    LutyuvFilter.prototype.withB = this.b;
    LutyuvFilter.prototype.withA = this.a;
    LutyuvFilter.prototype.withY = this.y;
    LutyuvFilter.prototype.withU = this.u;
    LutyuvFilter.prototype.withV = this.v;
  }

  /**
   * set first pixel component expression
   * 
   * @param val
   */
  c0(val) {
    this._c0 = val;
    return this;
  }

  /**
   * set second pixel component expression
   * 
   * @param val
   */
  c1(val) {
    this._c1 = val;
    return this;
  }

  /**
   * set third pixel component expression
   * 
   * @param val
   */
  c2(val) {
    this._c2 = val;
    return this;
  }

  /**
   * set fourth pixel component expression, corresponds to the alpha component
   * 
   * 
   * @param val
   */
  c3(val) {
    this._c3 = val;
    return this;
  }

  /**
   * set red component expression
   * 
   * @param val
   */
  r(val) {
    this._r = val;
    return this;
  }

  /**
   * set green component expression
   * 
   * @param val
   */
  g(val) {
    this._g = val;
    return this;
  }

  /**
   * set blue component expression
   * 
   * @param val
   */
  b(val) {
    this._b = val;
    return this;
  }

  /**
   * alpha component expression
   * 
   * 
   * @param val
   */
  a(val) {
    this._a = val;
    return this;
  }

  /**
   * set Y/luminance component expression
   * 
   * @param val
   */
  y(val) {
    this._y = val;
    return this;
  }

  /**
   * set U/Cb component expression
   * 
   * @param val
   */
  u(val) {
    this._u = val;
    return this;
  }

  /**
   * set V/Cr component expression
   * 
   * @param val
   */
  v(val) {
    this._v = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._c0) {
      opt['c0'] = this._c0;
    }
    if (this._c1) {
      opt['c1'] = this._c1;
    }
    if (this._c2) {
      opt['c2'] = this._c2;
    }
    if (this._c3) {
      opt['c3'] = this._c3;
    }
    if (this._r) {
      opt['r'] = this._r;
    }
    if (this._g) {
      opt['g'] = this._g;
    }
    if (this._b) {
      opt['b'] = this._b;
    }
    if (this._a) {
      opt['a'] = this._a;
    }
    if (this._y) {
      opt['y'] = this._y;
    }
    if (this._u) {
      opt['u'] = this._u;
    }
    if (this._v) {
      opt['v'] = this._v;
    }

    addFilter(this.ffmpeg, {
      filter: 'lutyuv',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.lutyuv = lutyuv;
