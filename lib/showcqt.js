const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the showcqt function.
 *
 *
 * @example
 *  ffmpeg().showcqt()
 *    ...             // call filter configuration functions
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
    ShowcqtFilter.prototype.withSize = this.size;
    ShowcqtFilter.prototype.withFps = this.fps;
    ShowcqtFilter.prototype.withBar_h = this.bar_h;
    ShowcqtFilter.prototype.withAxis_h = this.axis_h;
    ShowcqtFilter.prototype.withSono_h = this.sono_h;
    ShowcqtFilter.prototype.withFullhd = this.fullhd;
    ShowcqtFilter.prototype.withSono_v = this.sono_v;
    ShowcqtFilter.prototype.withBar_v = this.bar_v;
    ShowcqtFilter.prototype.withSono_g = this.sono_g;
    ShowcqtFilter.prototype.withBar_g = this.bar_g;
    ShowcqtFilter.prototype.withBar_t = this.bar_t;
    ShowcqtFilter.prototype.withTimeclamp = this.timeclamp;
    ShowcqtFilter.prototype.withAttack = this.attack;
    ShowcqtFilter.prototype.withBasefreq = this.basefreq;
    ShowcqtFilter.prototype.withEndfreq = this.endfreq;
    ShowcqtFilter.prototype.withCoeffclamp = this.coeffclamp;
    ShowcqtFilter.prototype.withTlength = this.tlength;
    ShowcqtFilter.prototype.withCount = this.count;
    ShowcqtFilter.prototype.withFcount = this.fcount;
    ShowcqtFilter.prototype.withFontfile = this.fontfile;
    ShowcqtFilter.prototype.withFont = this.font;
    ShowcqtFilter.prototype.withFontcolor = this.fontcolor;
    ShowcqtFilter.prototype.withAxisfile = this.axisfile;
    ShowcqtFilter.prototype.withAxis = this.axis;
    ShowcqtFilter.prototype.withCsp = this.csp;
    ShowcqtFilter.prototype.withCscheme = this.cscheme;
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
    this._size = val;
    return this;
  }

  /**
   * Set the output frame rate. Default value is 25.
   * 
   * 
   * @param val
   */
  fps(val) {
    this._fps = val;
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
    this._bar_h = val;
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
    this._axis_h = val;
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
    this._sono_h = val;
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
    this._fullhd = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  sono_v(val) {
    this._sono_v = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  bar_v(val) {
    this._bar_v = val;
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
    this._sono_g = val;
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
    this._bar_g = val;
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
    this._bar_t = val;
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
    this._timeclamp = val;
    return this;
  }

  /**
   * Set attack time in seconds. The default is 0 (disabled). Otherwise, it
   * limits future samples by applying asymmetric windowing in time domain, useful
   * when low latency is required. Accepted range is [0, 1].
   * 
   * 
   * @param val
   */
  attack(val) {
    this._attack = val;
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
    this._basefreq = val;
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
    this._endfreq = val;
    return this;
  }

  /**
   * This option is deprecated and ignored.
   * 
   * 
   * @param val
   */
  coeffclamp(val) {
    this._coeffclamp = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  tlength(val) {
    this._tlength = val;
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
    this._count = val;
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
    this._fcount = val;
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
    this._fontfile = val;
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
    this._font = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  fontcolor(val) {
    this._fontcolor = val;
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
    this._axisfile = val;
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
    this._axis = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  csp(val) {
    this._csp = val;
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
    this._cscheme = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._size) {
      opt['size'] = this._size;
    }
    if (this._fps) {
      opt['fps'] = this._fps;
    }
    if (this._bar_h) {
      opt['bar_h'] = this._bar_h;
    }
    if (this._axis_h) {
      opt['axis_h'] = this._axis_h;
    }
    if (this._sono_h) {
      opt['sono_h'] = this._sono_h;
    }
    if (this._fullhd) {
      opt['fullhd'] = this._fullhd;
    }
    if (this._sono_v) {
      opt['sono_v'] = this._sono_v;
    }
    if (this._bar_v) {
      opt['bar_v'] = this._bar_v;
    }
    if (this._sono_g) {
      opt['sono_g'] = this._sono_g;
    }
    if (this._bar_g) {
      opt['bar_g'] = this._bar_g;
    }
    if (this._bar_t) {
      opt['bar_t'] = this._bar_t;
    }
    if (this._timeclamp) {
      opt['timeclamp'] = this._timeclamp;
    }
    if (this._attack) {
      opt['attack'] = this._attack;
    }
    if (this._basefreq) {
      opt['basefreq'] = this._basefreq;
    }
    if (this._endfreq) {
      opt['endfreq'] = this._endfreq;
    }
    if (this._coeffclamp) {
      opt['coeffclamp'] = this._coeffclamp;
    }
    if (this._tlength) {
      opt['tlength'] = this._tlength;
    }
    if (this._count) {
      opt['count'] = this._count;
    }
    if (this._fcount) {
      opt['fcount'] = this._fcount;
    }
    if (this._fontfile) {
      opt['fontfile'] = this._fontfile;
    }
    if (this._font) {
      opt['font'] = this._font;
    }
    if (this._fontcolor) {
      opt['fontcolor'] = this._fontcolor;
    }
    if (this._axisfile) {
      opt['axisfile'] = this._axisfile;
    }
    if (this._axis) {
      opt['axis'] = this._axis;
    }
    if (this._csp) {
      opt['csp'] = this._csp;
    }
    if (this._cscheme) {
      opt['cscheme'] = this._cscheme;
    }

    addFilter(this.ffmpeg, {
      filter: 'showcqt',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.showcqt = showcqt;
