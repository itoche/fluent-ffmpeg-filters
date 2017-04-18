const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the colorchannelmixer function.
 *
 *
 * @example
 *  ffmpeg().colorchannelmixer()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the colorchannelmixer function.
 */
function colorchannelmixer(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'colorchannelmixer', function() {
    return new ColorchannelmixerFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ColorchannelmixerFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    ColorchannelmixerFilter.prototype.withRr = this.rr;
    ColorchannelmixerFilter.prototype.withRg = this.rg;
    ColorchannelmixerFilter.prototype.withRb = this.rb;
    ColorchannelmixerFilter.prototype.withRa = this.ra;
    ColorchannelmixerFilter.prototype.withGr = this.gr;
    ColorchannelmixerFilter.prototype.withGg = this.gg;
    ColorchannelmixerFilter.prototype.withGb = this.gb;
    ColorchannelmixerFilter.prototype.withGa = this.ga;
    ColorchannelmixerFilter.prototype.withBr = this.br;
    ColorchannelmixerFilter.prototype.withBg = this.bg;
    ColorchannelmixerFilter.prototype.withBb = this.bb;
    ColorchannelmixerFilter.prototype.withBa = this.ba;
    ColorchannelmixerFilter.prototype.withAr = this.ar;
    ColorchannelmixerFilter.prototype.withAg = this.ag;
    ColorchannelmixerFilter.prototype.withAb = this.ab;
    ColorchannelmixerFilter.prototype.withAa = this.aa;
  }

  /**
   * Adjust contribution of input red, green, blue and alpha channels for output red channel.
   * Default is 1 for rr, and 0 for rg, rb and ra.
   * 
   * 
   * @param val
   */
  rr(val) {
    this._rr = val;
    return this;
  }

  /**
   * Adjust contribution of input red, green, blue and alpha channels for output red channel.
   * Default is 1 for rr, and 0 for rg, rb and ra.
   * 
   * 
   * @param val
   */
  rg(val) {
    this._rg = val;
    return this;
  }

  /**
   * Adjust contribution of input red, green, blue and alpha channels for output red channel.
   * Default is 1 for rr, and 0 for rg, rb and ra.
   * 
   * 
   * @param val
   */
  rb(val) {
    this._rb = val;
    return this;
  }

  /**
   * Adjust contribution of input red, green, blue and alpha channels for output red channel.
   * Default is 1 for rr, and 0 for rg, rb and ra.
   * 
   * 
   * @param val
   */
  ra(val) {
    this._ra = val;
    return this;
  }

  /**
   * Adjust contribution of input red, green, blue and alpha channels for output green channel.
   * Default is 1 for gg, and 0 for gr, gb and ga.
   * 
   * 
   * @param val
   */
  gr(val) {
    this._gr = val;
    return this;
  }

  /**
   * Adjust contribution of input red, green, blue and alpha channels for output green channel.
   * Default is 1 for gg, and 0 for gr, gb and ga.
   * 
   * 
   * @param val
   */
  gg(val) {
    this._gg = val;
    return this;
  }

  /**
   * Adjust contribution of input red, green, blue and alpha channels for output green channel.
   * Default is 1 for gg, and 0 for gr, gb and ga.
   * 
   * 
   * @param val
   */
  gb(val) {
    this._gb = val;
    return this;
  }

  /**
   * Adjust contribution of input red, green, blue and alpha channels for output green channel.
   * Default is 1 for gg, and 0 for gr, gb and ga.
   * 
   * 
   * @param val
   */
  ga(val) {
    this._ga = val;
    return this;
  }

  /**
   * Adjust contribution of input red, green, blue and alpha channels for output blue channel.
   * Default is 1 for bb, and 0 for br, bg and ba.
   * 
   * 
   * @param val
   */
  br(val) {
    this._br = val;
    return this;
  }

  /**
   * Adjust contribution of input red, green, blue and alpha channels for output blue channel.
   * Default is 1 for bb, and 0 for br, bg and ba.
   * 
   * 
   * @param val
   */
  bg(val) {
    this._bg = val;
    return this;
  }

  /**
   * Adjust contribution of input red, green, blue and alpha channels for output blue channel.
   * Default is 1 for bb, and 0 for br, bg and ba.
   * 
   * 
   * @param val
   */
  bb(val) {
    this._bb = val;
    return this;
  }

  /**
   * Adjust contribution of input red, green, blue and alpha channels for output blue channel.
   * Default is 1 for bb, and 0 for br, bg and ba.
   * 
   * 
   * @param val
   */
  ba(val) {
    this._ba = val;
    return this;
  }

  /**
   * Adjust contribution of input red, green, blue and alpha channels for output alpha channel.
   * Default is 1 for aa, and 0 for ar, ag and ab.
   * 
   * Allowed ranges for options are [-2.0, 2.0].
   * 
   * @param val
   */
  ar(val) {
    this._ar = val;
    return this;
  }

  /**
   * Adjust contribution of input red, green, blue and alpha channels for output alpha channel.
   * Default is 1 for aa, and 0 for ar, ag and ab.
   * 
   * Allowed ranges for options are [-2.0, 2.0].
   * 
   * @param val
   */
  ag(val) {
    this._ag = val;
    return this;
  }

  /**
   * Adjust contribution of input red, green, blue and alpha channels for output alpha channel.
   * Default is 1 for aa, and 0 for ar, ag and ab.
   * 
   * Allowed ranges for options are [-2.0, 2.0].
   * 
   * @param val
   */
  ab(val) {
    this._ab = val;
    return this;
  }

  /**
   * Adjust contribution of input red, green, blue and alpha channels for output alpha channel.
   * Default is 1 for aa, and 0 for ar, ag and ab.
   * 
   * Allowed ranges for options are [-2.0, 2.0].
   * 
   * @param val
   */
  aa(val) {
    this._aa = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._rr) {
      opt['rr'] = this._rr;
    }
    if (this._rg) {
      opt['rg'] = this._rg;
    }
    if (this._rb) {
      opt['rb'] = this._rb;
    }
    if (this._ra) {
      opt['ra'] = this._ra;
    }
    if (this._gr) {
      opt['gr'] = this._gr;
    }
    if (this._gg) {
      opt['gg'] = this._gg;
    }
    if (this._gb) {
      opt['gb'] = this._gb;
    }
    if (this._ga) {
      opt['ga'] = this._ga;
    }
    if (this._br) {
      opt['br'] = this._br;
    }
    if (this._bg) {
      opt['bg'] = this._bg;
    }
    if (this._bb) {
      opt['bb'] = this._bb;
    }
    if (this._ba) {
      opt['ba'] = this._ba;
    }
    if (this._ar) {
      opt['ar'] = this._ar;
    }
    if (this._ag) {
      opt['ag'] = this._ag;
    }
    if (this._ab) {
      opt['ab'] = this._ab;
    }
    if (this._aa) {
      opt['aa'] = this._aa;
    }

    addFilter(this.ffmpeg, {
      filter: 'colorchannelmixer',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.colorchannelmixer = colorchannelmixer;
