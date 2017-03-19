const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the showcqt function.
 *
 *
 * @example
 *  ffmpeg().showcqt()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the showcqt function.
 */
function showcqt(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'showcqt', function() {
    return new ShowcqtFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ShowcqtFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Showcqt.prototype.withSize = size;
    Showcqt.prototype.withFps = fps;
    Showcqt.prototype.withBar_h = bar_h;
    Showcqt.prototype.withAxis_h = axis_h;
    Showcqt.prototype.withSono_h = sono_h;
    Showcqt.prototype.withFullhd = fullhd;
    Showcqt.prototype.withSono_v = sono_v;
    Showcqt.prototype.withBar_v = bar_v;
    Showcqt.prototype.withSono_g = sono_g;
    Showcqt.prototype.withBar_g = bar_g;
    Showcqt.prototype.withBar_t = bar_t;
    Showcqt.prototype.withTimeclamp = timeclamp;
    Showcqt.prototype.withBasefreq = basefreq;
    Showcqt.prototype.withEndfreq = endfreq;
    Showcqt.prototype.withCoeffclamp = coeffclamp;
    Showcqt.prototype.withTlength = tlength;
    Showcqt.prototype.withCount = count;
    Showcqt.prototype.withFcount = fcount;
    Showcqt.prototype.withFontfile = fontfile;
    Showcqt.prototype.withFont = font;
    Showcqt.prototype.withFontcolor = fontcolor;
    Showcqt.prototype.withAxisfile = axisfile;
    Showcqt.prototype.withAxis = axis;
    Showcqt.prototype.withCsp = csp;
    Showcqt.prototype.withCscheme = cscheme;
  }

  /**
   * Specify the video size for the output. It must be even. For the syntax of this option,
   * check the (ffmpeg-utils)&quot;Video size&quot; section in the ffmpeg-utils manual.
   * Default value is 1920x1080.
   * 
   * 
   * @param val
   */
  size(val) {
    this.size = val;
    return this;
  }

  /**
   * Set the output frame rate. Default value is 25.
   * 
   * 
   * @param val
   */
  fps(val) {
    this.fps = val;
    return this;
  }

  /**
   * Set the bargraph height. It must be even. Default value is -1 which
   * computes the bargraph height automatically.
   * 
   * 
   * @param val
   */
  bar_h(val) {
    this.bar_h = val;
    return this;
  }

  /**
   * Set the axis height. It must be even. Default value is -1 which computes
   * the axis height automatically.
   * 
   * 
   * @param val
   */
  axis_h(val) {
    this.axis_h = val;
    return this;
  }

  /**
   * Set the sonogram height. It must be even. Default value is -1 which
   * computes the sonogram height automatically.
   * 
   * 
   * @param val
   */
  sono_h(val) {
    this.sono_h = val;
    return this;
  }

  /**
   * Set the fullhd resolution. This option is deprecated, use size, s
   * instead. Default value is 1.
   * 
   * 
   * @param val
   */
  fullhd(val) {
    this.fullhd = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  sono_v(val) {
    this.sono_v = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  bar_v(val) {
    this.bar_v = val;
    return this;
  }

  /**
   * Specify the sonogram gamma. Lower gamma makes the spectrum more contrast,
   * higher gamma makes the spectrum having more range. Default value is 3.
   * Acceptable range is [1, 7].
   * 
   * 
   * @param val
   */
  sono_g(val) {
    this.sono_g = val;
    return this;
  }

  /**
   * Specify the bargraph gamma. Default value is 1. Acceptable range is
   * [1, 7].
   * 
   * 
   * @param val
   */
  bar_g(val) {
    this.bar_g = val;
    return this;
  }

  /**
   * Specify the bargraph transparency level. Lower value makes the bargraph sharper.
   * Default value is 1. Acceptable range is [0, 1].
   * 
   * 
   * @param val
   */
  bar_t(val) {
    this.bar_t = val;
    return this;
  }

  /**
   * Specify the transform timeclamp. At low frequency, there is trade-off between
   * accuracy in time domain and frequency domain. If timeclamp is lower,
   * event in time domain is represented more accurately (such as fast bass drum),
   * otherwise event in frequency domain is represented more accurately
   * (such as bass guitar). Acceptable range is [0.002, 1]. Default value is 0.17.
   * 
   * 
   * @param val
   */
  timeclamp(val) {
    this.timeclamp = val;
    return this;
  }

  /**
   * Specify the transform base frequency. Default value is 20.01523126408007475,
   * which is frequency 50 cents below E0. Acceptable range is [10, 100000].
   * 
   * 
   * @param val
   */
  basefreq(val) {
    this.basefreq = val;
    return this;
  }

  /**
   * Specify the transform end frequency. Default value is 20495.59681441799654,
   * which is frequency 50 cents above D#10. Acceptable range is [10, 100000].
   * 
   * 
   * @param val
   */
  endfreq(val) {
    this.endfreq = val;
    return this;
  }

  /**
   * This option is deprecated and ignored.
   * 
   * 
   * @param val
   */
  coeffclamp(val) {
    this.coeffclamp = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  tlength(val) {
    this.tlength = val;
    return this;
  }

  /**
   * Specify the transform count for every video frame. Default value is 6.
   * Acceptable range is [1, 30].
   * 
   * 
   * @param val
   */
  count(val) {
    this.count = val;
    return this;
  }

  /**
   * Specify the transform count for every single pixel. Default value is 0,
   * which makes it computed automatically. Acceptable range is [0, 10].
   * 
   * 
   * @param val
   */
  fcount(val) {
    this.fcount = val;
    return this;
  }

  /**
   * Specify font file for use with freetype to draw the axis. If not specified,
   * use embedded font. Note that drawing with font file or embedded font is not
   * implemented with custom basefreq and endfreq, use axisfile
   * option instead.
   * 
   * 
   * @param val
   */
  fontfile(val) {
    this.fontfile = val;
    return this;
  }

  /**
   * Specify fontconfig pattern. This has lower priority than fontfile.
   * The : in the pattern may be replaced by | to avoid unnecessary escaping.
   * 
   * 
   * @param val
   */
  font(val) {
    this.font = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  fontcolor(val) {
    this.fontcolor = val;
    return this;
  }

  /**
   * Specify image file to draw the axis. This option override fontfile and
   * fontcolor option.
   * 
   * 
   * @param val
   */
  axisfile(val) {
    this.axisfile = val;
    return this;
  }

  /**
   * Enable/disable drawing text to the axis. If it is set to 0, drawing to
   * the axis is disabled, ignoring fontfile and axisfile option.
   * Default value is 1.
   * 
   * 
   * @param val
   */
  axis(val) {
    this.axis = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  csp(val) {
    this.csp = val;
    return this;
  }

  /**
   * Set spectrogram color scheme. This is list of floating point values with format
   * left_r|left_g|left_b|right_r|right_g|right_b.
   * The default is 1|0.5|0|0|0.5|1.
   * 
   * 
   * @param val
   */
  cscheme(val) {
    this.cscheme = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.size) {
      opt.size = this.size;
    }
    if (this.fps) {
      opt.fps = this.fps;
    }
    if (this.bar_h) {
      opt.bar_h = this.bar_h;
    }
    if (this.axis_h) {
      opt.axis_h = this.axis_h;
    }
    if (this.sono_h) {
      opt.sono_h = this.sono_h;
    }
    if (this.fullhd) {
      opt.fullhd = this.fullhd;
    }
    if (this.sono_v) {
      opt.sono_v = this.sono_v;
    }
    if (this.bar_v) {
      opt.bar_v = this.bar_v;
    }
    if (this.sono_g) {
      opt.sono_g = this.sono_g;
    }
    if (this.bar_g) {
      opt.bar_g = this.bar_g;
    }
    if (this.bar_t) {
      opt.bar_t = this.bar_t;
    }
    if (this.timeclamp) {
      opt.timeclamp = this.timeclamp;
    }
    if (this.basefreq) {
      opt.basefreq = this.basefreq;
    }
    if (this.endfreq) {
      opt.endfreq = this.endfreq;
    }
    if (this.coeffclamp) {
      opt.coeffclamp = this.coeffclamp;
    }
    if (this.tlength) {
      opt.tlength = this.tlength;
    }
    if (this.count) {
      opt.count = this.count;
    }
    if (this.fcount) {
      opt.fcount = this.fcount;
    }
    if (this.fontfile) {
      opt.fontfile = this.fontfile;
    }
    if (this.font) {
      opt.font = this.font;
    }
    if (this.fontcolor) {
      opt.fontcolor = this.fontcolor;
    }
    if (this.axisfile) {
      opt.axisfile = this.axisfile;
    }
    if (this.axis) {
      opt.axis = this.axis;
    }
    if (this.csp) {
      opt.csp = this.csp;
    }
    if (this.cscheme) {
      opt.cscheme = this.cscheme;
    }

    addFilter(this.ffmpeg, {
      filter: 'showcqt',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.showcqt = showcqt;
