const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the showvolume function.
 *
 *
 * @example
 *  ffmpeg().showvolume()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the showvolume function.
 */
function showvolume(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'showvolume', function() {
    return new ShowvolumeFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ShowvolumeFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    ShowvolumeFilter.prototype.withRate = this.rate;
    ShowvolumeFilter.prototype.withB = this.b;
    ShowvolumeFilter.prototype.withW = this.w;
    ShowvolumeFilter.prototype.withH = this.h;
    ShowvolumeFilter.prototype.withF = this.f;
    ShowvolumeFilter.prototype.withC = this.c;
    ShowvolumeFilter.prototype.withT = this.t;
    ShowvolumeFilter.prototype.withV = this.v;
    ShowvolumeFilter.prototype.withO = this.o;
    ShowvolumeFilter.prototype.withS = this.s;
  }

  /**
   * Set video rate.
   * 
   * 
   * @param val
   */
  rate(val) {
    this._rate = val;
    return this;
  }

  /**
   * Set border width, allowed range is [0, 5]. Default is 1.
   * 
   * 
   * @param val
   */
  b(val) {
    this._b = val;
    return this;
  }

  /**
   * Set channel width, allowed range is [80, 8192]. Default is 400.
   * 
   * 
   * @param val
   */
  w(val) {
    this._w = val;
    return this;
  }

  /**
   * Set channel height, allowed range is [1, 900]. Default is 20.
   * 
   * 
   * @param val
   */
  h(val) {
    this._h = val;
    return this;
  }

  /**
   * Set fade, allowed range is [0.001, 1]. Default is 0.95.
   * 
   * 
   * @param val
   */
  f(val) {
    this._f = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  c(val) {
    this._c = val;
    return this;
  }

  /**
   * If set, displays channel names. Default is enabled.
   * 
   * 
   * @param val
   */
  t(val) {
    this._t = val;
    return this;
  }

  /**
   * If set, displays volume values. Default is enabled.
   * 
   * 
   * @param val
   */
  v(val) {
    this._v = val;
    return this;
  }

  /**
   * Set orientation, can be horizontal or vertical,
   * default is horizontal.
   * 
   * 
   * @param val
   */
  o(val) {
    this._o = val;
    return this;
  }

  /**
   * Set step size, allowed range s [0, 5]. Default is 0, which means
   * step is disabled.
   * 
   * @param val
   */
  s(val) {
    this._s = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._rate) {
      opt['rate'] = this._rate;
    }
    if (this._b) {
      opt['b'] = this._b;
    }
    if (this._w) {
      opt['w'] = this._w;
    }
    if (this._h) {
      opt['h'] = this._h;
    }
    if (this._f) {
      opt['f'] = this._f;
    }
    if (this._c) {
      opt['c'] = this._c;
    }
    if (this._t) {
      opt['t'] = this._t;
    }
    if (this._v) {
      opt['v'] = this._v;
    }
    if (this._o) {
      opt['o'] = this._o;
    }
    if (this._s) {
      opt['s'] = this._s;
    }

    addFilter(this.ffmpeg, {
      filter: 'showvolume',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.showvolume = showvolume;
