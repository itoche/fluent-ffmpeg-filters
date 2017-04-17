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
    this.rr = val;
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
    this.rg = val;
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
    this.rb = val;
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
    this.ra = val;
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
    this.gr = val;
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
    this.gg = val;
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
    this.gb = val;
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
    this.ga = val;
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
    this.br = val;
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
    this.bg = val;
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
    this.bb = val;
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
    this.ba = val;
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
    this.ar = val;
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
    this.ag = val;
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
    this.ab = val;
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
    this.aa = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.rr) {
      opt['rr'] = this.rr;
    }
    if (this.rg) {
      opt['rg'] = this.rg;
    }
    if (this.rb) {
      opt['rb'] = this.rb;
    }
    if (this.ra) {
      opt['ra'] = this.ra;
    }
    if (this.gr) {
      opt['gr'] = this.gr;
    }
    if (this.gg) {
      opt['gg'] = this.gg;
    }
    if (this.gb) {
      opt['gb'] = this.gb;
    }
    if (this.ga) {
      opt['ga'] = this.ga;
    }
    if (this.br) {
      opt['br'] = this.br;
    }
    if (this.bg) {
      opt['bg'] = this.bg;
    }
    if (this.bb) {
      opt['bb'] = this.bb;
    }
    if (this.ba) {
      opt['ba'] = this.ba;
    }
    if (this.ar) {
      opt['ar'] = this.ar;
    }
    if (this.ag) {
      opt['ag'] = this.ag;
    }
    if (this.ab) {
      opt['ab'] = this.ab;
    }
    if (this.aa) {
      opt['aa'] = this.aa;
    }

    addFilter(this.ffmpeg, {
      filter: 'colorchannelmixer',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.colorchannelmixer = colorchannelmixer;
