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
    ShowvolumeFilter.prototype.withRate = rate;
    ShowvolumeFilter.prototype.withB = b;
    ShowvolumeFilter.prototype.withW = w;
    ShowvolumeFilter.prototype.withH = h;
    ShowvolumeFilter.prototype.withF = f;
    ShowvolumeFilter.prototype.withC = c;
    ShowvolumeFilter.prototype.withT = t;
    ShowvolumeFilter.prototype.withV = v;
    ShowvolumeFilter.prototype.withO = o;
    ShowvolumeFilter.prototype.withS = s;
  }

  /**
   * Set video rate.
   * 
   * 
   * @param val
   */
  rate(val) {
    this.rate = val;
    return this;
  }

  /**
   * Set border width, allowed range is [0, 5]. Default is 1.
   * 
   * 
   * @param val
   */
  b(val) {
    this.b = val;
    return this;
  }

  /**
   * Set channel width, allowed range is [80, 8192]. Default is 400.
   * 
   * 
   * @param val
   */
  w(val) {
    this.w = val;
    return this;
  }

  /**
   * Set channel height, allowed range is [1, 900]. Default is 20.
   * 
   * 
   * @param val
   */
  h(val) {
    this.h = val;
    return this;
  }

  /**
   * Set fade, allowed range is [0.001, 1]. Default is 0.95.
   * 
   * 
   * @param val
   */
  f(val) {
    this.f = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  c(val) {
    this.c = val;
    return this;
  }

  /**
   * If set, displays channel names. Default is enabled.
   * 
   * 
   * @param val
   */
  t(val) {
    this.t = val;
    return this;
  }

  /**
   * If set, displays volume values. Default is enabled.
   * 
   * 
   * @param val
   */
  v(val) {
    this.v = val;
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
    this.o = val;
    return this;
  }

  /**
   * Set step size, allowed range s [0, 5]. Default is 0, which means
   * step is disabled.
   * 
   * @param val
   */
  s(val) {
    this.s = val;
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
    if (this.b) {
      opt['b'] = this.b;
    }
    if (this.w) {
      opt['w'] = this.w;
    }
    if (this.h) {
      opt['h'] = this.h;
    }
    if (this.f) {
      opt['f'] = this.f;
    }
    if (this.c) {
      opt['c'] = this.c;
    }
    if (this.t) {
      opt['t'] = this.t;
    }
    if (this.v) {
      opt['v'] = this.v;
    }
    if (this.o) {
      opt['o'] = this.o;
    }
    if (this.s) {
      opt['s'] = this.s;
    }

    addFilter(this.ffmpeg, {
      filter: 'showvolume',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.showvolume = showvolume;
