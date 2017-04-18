const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the drawtext function.
 *
 *
 * @example
 *  ffmpeg().drawtext()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the drawtext function.
 */
function drawtext(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'drawtext', function() {
    return new DrawtextFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class DrawtextFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    DrawtextFilter.prototype.withBox = this.box;
    DrawtextFilter.prototype.withBoxborderw = this.boxborderw;
    DrawtextFilter.prototype.withBoxcolor = this.boxcolor;
    DrawtextFilter.prototype.withLine_spacing = this.line_spacing;
    DrawtextFilter.prototype.withBorderw = this.borderw;
    DrawtextFilter.prototype.withBordercolor = this.bordercolor;
    DrawtextFilter.prototype.withExpansion = this.expansion;
    DrawtextFilter.prototype.withBasetime = this.basetime;
    DrawtextFilter.prototype.withFix_bounds = this.fix_bounds;
    DrawtextFilter.prototype.withFontcolor = this.fontcolor;
    DrawtextFilter.prototype.withFontcolor_expr = this.fontcolor_expr;
    DrawtextFilter.prototype.withFont = this.font;
    DrawtextFilter.prototype.withFontfile = this.fontfile;
    DrawtextFilter.prototype.withAlpha = this.alpha;
    DrawtextFilter.prototype.withFontsize = this.fontsize;
    DrawtextFilter.prototype.withText_shaping = this.text_shaping;
    DrawtextFilter.prototype.withFt_load_flags = this.ft_load_flags;
    DrawtextFilter.prototype.withShadowcolor = this.shadowcolor;
    DrawtextFilter.prototype.withShadowx = this.shadowx;
    DrawtextFilter.prototype.withShadowy = this.shadowy;
    DrawtextFilter.prototype.withStart_number = this.start_number;
    DrawtextFilter.prototype.withTabsize = this.tabsize;
    DrawtextFilter.prototype.withTimecode = this.timecode;
    DrawtextFilter.prototype.withTimecode_rate = this.timecode_rate;
    DrawtextFilter.prototype.withTc24hmax = this.tc24hmax;
    DrawtextFilter.prototype.withText = this.text;
    DrawtextFilter.prototype.withTextfile = this.textfile;
    DrawtextFilter.prototype.withReload = this.reload;
    DrawtextFilter.prototype.withX = this.x;
    DrawtextFilter.prototype.withY = this.y;
  }

  /**
   * Used to draw a box around text using the background color.
   * The value must be either 1 (enable) or 0 (disable).
   * The default value of box is 0.
   * 
   * 
   * @param val
   */
  box(val) {
    this._box = val;
    return this;
  }

  /**
   * Set the width of the border to be drawn around the box using boxcolor.
   * The default value of boxborderw is 0.
   * 
   * 
   * @param val
   */
  boxborderw(val) {
    this._boxborderw = val;
    return this;
  }

  /**
   * The color to be used for drawing box around text. For the syntax of this
   * option, check the &quot;Color&quot; section in the ffmpeg-utils manual.
   * 
   * The default value of boxcolor is &quot;white&quot;.
   * 
   * 
   * @param val
   */
  boxcolor(val) {
    this._boxcolor = val;
    return this;
  }

  /**
   * Set the line spacing in pixels of the border to be drawn around the box using box.
   * The default value of line_spacing is 0.
   * 
   * 
   * @param val
   */
  line_spacing(val) {
    this._line_spacing = val;
    return this;
  }

  /**
   * Set the width of the border to be drawn around the text using bordercolor.
   * The default value of borderw is 0.
   * 
   * 
   * @param val
   */
  borderw(val) {
    this._borderw = val;
    return this;
  }

  /**
   * Set the color to be used for drawing border around text. For the syntax of this
   * option, check the &quot;Color&quot; section in the ffmpeg-utils manual.
   * 
   * The default value of bordercolor is &quot;black&quot;.
   * 
   * 
   * @param val
   */
  bordercolor(val) {
    this._bordercolor = val;
    return this;
  }

  /**
   * Select how the text is expanded. Can be either none,
   * strftime (deprecated) or
   * normal (default). See the Text expansion section
   * below for details.
   * 
   * 
   * @param val
   */
  expansion(val) {
    this._expansion = val;
    return this;
  }

  /**
   * Set a start time for the count. Value is in microseconds. Only applied
   * in the deprecated strftime expansion mode. To emulate in normal expansion
   * mode use the pts function, supplying the start time (in seconds)
   * as the second argument.
   * 
   * 
   * @param val
   */
  basetime(val) {
    this._basetime = val;
    return this;
  }

  /**
   * If true, check and fix text coords to avoid clipping.
   * 
   * 
   * @param val
   */
  fix_bounds(val) {
    this._fix_bounds = val;
    return this;
  }

  /**
   * The color to be used for drawing fonts. For the syntax of this option, check
   * the &quot;Color&quot; section in the ffmpeg-utils manual.
   * 
   * The default value of fontcolor is &quot;black&quot;.
   * 
   * 
   * @param val
   */
  fontcolor(val) {
    this._fontcolor = val;
    return this;
  }

  /**
   * String which is expanded the same way as text to obtain dynamic
   * fontcolor value. By default this option has empty value and is not
   * processed. When this option is set, it overrides fontcolor option.
   * 
   * 
   * @param val
   */
  fontcolor_expr(val) {
    this._fontcolor_expr = val;
    return this;
  }

  /**
   * The font family to be used for drawing text. By default Sans.
   * 
   * 
   * @param val
   */
  font(val) {
    this._font = val;
    return this;
  }

  /**
   * The font file to be used for drawing text. The path must be included.
   * This parameter is mandatory if the fontconfig support is disabled.
   * 
   * 
   * @param val
   */
  fontfile(val) {
    this._fontfile = val;
    return this;
  }

  /**
   * Draw the text applying alpha blending. The value can
   * be a number between 0.0 and 1.0.
   * The expression accepts the same variables x, y as well.
   * The default value is 1.
   * Please see fontcolor_expr.
   * 
   * 
   * @param val
   */
  alpha(val) {
    this._alpha = val;
    return this;
  }

  /**
   * The font size to be used for drawing text.
   * The default value of fontsize is 16.
   * 
   * 
   * @param val
   */
  fontsize(val) {
    this._fontsize = val;
    return this;
  }

  /**
   * If set to 1, attempt to shape the text (for example, reverse the order of
   * right-to-left text and join Arabic characters) before drawing it.
   * Otherwise, just draw the text exactly as given.
   * By default 1 (if supported).
   * 
   * 
   * @param val
   */
  text_shaping(val) {
    this._text_shaping = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  ft_load_flags(val) {
    this._ft_load_flags = val;
    return this;
  }

  /**
   * The color to be used for drawing a shadow behind the drawn text. For the
   * syntax of this option, check the &quot;Color&quot; section in the ffmpeg-utils manual.
   * 
   * The default value of shadowcolor is &quot;black&quot;.
   * 
   * 
   * @param val
   */
  shadowcolor(val) {
    this._shadowcolor = val;
    return this;
  }

  /**
   * The x and y offsets for the text shadow position with respect to the
   * position of the text. They can be either positive or negative
   * values. The default value for both is &quot;0&quot;.
   * 
   * 
   * @param val
   */
  shadowx(val) {
    this._shadowx = val;
    return this;
  }

  /**
   * The x and y offsets for the text shadow position with respect to the
   * position of the text. They can be either positive or negative
   * values. The default value for both is &quot;0&quot;.
   * 
   * 
   * @param val
   */
  shadowy(val) {
    this._shadowy = val;
    return this;
  }

  /**
   * The starting frame number for the n/frame_num variable. The default value
   * is &quot;0&quot;.
   * 
   * 
   * @param val
   */
  start_number(val) {
    this._start_number = val;
    return this;
  }

  /**
   * The size in number of spaces to use for rendering the tab.
   * Default value is 4.
   * 
   * 
   * @param val
   */
  tabsize(val) {
    this._tabsize = val;
    return this;
  }

  /**
   * Set the initial timecode representation in &quot;hh:mm:ss[:;.]ff&quot;
   * format. It can be used with or without text parameter. timecode_rate
   * option must be specified.
   * 
   * 
   * @param val
   */
  timecode(val) {
    this._timecode = val;
    return this;
  }

  /**
   * Set the timecode frame rate (timecode only).
   * 
   * 
   * @param val
   */
  timecode_rate(val) {
    this._timecode_rate = val;
    return this;
  }

  /**
   * If set to 1, the output of the timecode option will wrap around at 24 hours.
   * Default is 0 (disabled).
   * 
   * 
   * @param val
   */
  tc24hmax(val) {
    this._tc24hmax = val;
    return this;
  }

  /**
   * The text string to be drawn. The text must be a sequence of UTF-8
   * encoded characters.
   * This parameter is mandatory if no file is specified with the parameter
   * textfile.
   * 
   * 
   * @param val
   */
  text(val) {
    this._text = val;
    return this;
  }

  /**
   * A text file containing text to be drawn. The text must be a sequence
   * of UTF-8 encoded characters.
   * 
   * This parameter is mandatory if no text string is specified with the
   * parameter text.
   * 
   * If both text and textfile are specified, an error is thrown.
   * 
   * 
   * @param val
   */
  textfile(val) {
    this._textfile = val;
    return this;
  }

  /**
   * If set to 1, the textfile will be reloaded before each frame.
   * Be sure to update it atomically, or it may be read partially, or even fail.
   * 
   * 
   * @param val
   */
  reload(val) {
    this._reload = val;
    return this;
  }

  /**
   * The expressions which specify the offsets where text will be drawn
   * within the video frame. They are relative to the top/left border of the
   * output image.
   * 
   * The default value of x and y is &quot;0&quot;.
   * 
   * See below for the list of accepted constants and functions.
   * 
   * @param val
   */
  x(val) {
    this._x = val;
    return this;
  }

  /**
   * The expressions which specify the offsets where text will be drawn
   * within the video frame. They are relative to the top/left border of the
   * output image.
   * 
   * The default value of x and y is &quot;0&quot;.
   * 
   * See below for the list of accepted constants and functions.
   * 
   * @param val
   */
  y(val) {
    this._y = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._box) {
      opt['box'] = this._box;
    }
    if (this._boxborderw) {
      opt['boxborderw'] = this._boxborderw;
    }
    if (this._boxcolor) {
      opt['boxcolor'] = this._boxcolor;
    }
    if (this._line_spacing) {
      opt['line_spacing'] = this._line_spacing;
    }
    if (this._borderw) {
      opt['borderw'] = this._borderw;
    }
    if (this._bordercolor) {
      opt['bordercolor'] = this._bordercolor;
    }
    if (this._expansion) {
      opt['expansion'] = this._expansion;
    }
    if (this._basetime) {
      opt['basetime'] = this._basetime;
    }
    if (this._fix_bounds) {
      opt['fix_bounds'] = this._fix_bounds;
    }
    if (this._fontcolor) {
      opt['fontcolor'] = this._fontcolor;
    }
    if (this._fontcolor_expr) {
      opt['fontcolor_expr'] = this._fontcolor_expr;
    }
    if (this._font) {
      opt['font'] = this._font;
    }
    if (this._fontfile) {
      opt['fontfile'] = this._fontfile;
    }
    if (this._alpha) {
      opt['alpha'] = this._alpha;
    }
    if (this._fontsize) {
      opt['fontsize'] = this._fontsize;
    }
    if (this._text_shaping) {
      opt['text_shaping'] = this._text_shaping;
    }
    if (this._ft_load_flags) {
      opt['ft_load_flags'] = this._ft_load_flags;
    }
    if (this._shadowcolor) {
      opt['shadowcolor'] = this._shadowcolor;
    }
    if (this._shadowx) {
      opt['shadowx'] = this._shadowx;
    }
    if (this._shadowy) {
      opt['shadowy'] = this._shadowy;
    }
    if (this._start_number) {
      opt['start_number'] = this._start_number;
    }
    if (this._tabsize) {
      opt['tabsize'] = this._tabsize;
    }
    if (this._timecode) {
      opt['timecode'] = this._timecode;
    }
    if (this._timecode_rate) {
      opt['timecode_rate'] = this._timecode_rate;
    }
    if (this._tc24hmax) {
      opt['tc24hmax'] = this._tc24hmax;
    }
    if (this._text) {
      opt['text'] = this._text;
    }
    if (this._textfile) {
      opt['textfile'] = this._textfile;
    }
    if (this._reload) {
      opt['reload'] = this._reload;
    }
    if (this._x) {
      opt['x'] = this._x;
    }
    if (this._y) {
      opt['y'] = this._y;
    }

    addFilter(this.ffmpeg, {
      filter: 'drawtext',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.drawtext = drawtext;
