const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the curves function.
 *
 *
 * @example
 *  ffmpeg().curves()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the curves function.
 */
function curves(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'curves', function() {
    return new CurvesFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class CurvesFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Curves.prototype.withPreset = preset;
    Curves.prototype.withMaster = master;
    Curves.prototype.withRed = red;
    Curves.prototype.withGreen = green;
    Curves.prototype.withBlue = blue;
    Curves.prototype.withAll = all;
    Curves.prototype.withPsfile = psfile;
    Curves.prototype.withPlot = plot;
  }

  /**
   * 
   * @param val
   */
  preset(val) {
    this.preset = val;
    return this;
  }

  /**
   * Set the master key points. These points will define a second pass mapping. It
   * is sometimes called a &quot;luminance&quot; or &quot;value&quot; mapping. It can be used with
   * r, g, b or all since it acts like a
   * post-processing LUT.
   * 
   * @param val
   */
  master(val) {
    this.master = val;
    return this;
  }

  /**
   * Set the key points for the red component.
   * 
   * @param val
   */
  red(val) {
    this.red = val;
    return this;
  }

  /**
   * Set the key points for the green component.
   * 
   * @param val
   */
  green(val) {
    this.green = val;
    return this;
  }

  /**
   * Set the key points for the blue component.
   * 
   * @param val
   */
  blue(val) {
    this.blue = val;
    return this;
  }

  /**
   * Set the key points for all components (not including master).
   * Can be used in addition to the other key points component
   * options. In this case, the unset component(s) will fallback on this
   * all setting.
   * 
   * @param val
   */
  all(val) {
    this.all = val;
    return this;
  }

  /**
   * Specify a Photoshop curves file (.acv) to import the settings from.
   * 
   * @param val
   */
  psfile(val) {
    this.psfile = val;
    return this;
  }

  /**
   * Save Gnuplot script of the curves in specified file.
   * 
   * @param val
   */
  plot(val) {
    this.plot = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.preset) {
      opt['preset'] = this.preset;
    }
    if (this.master) {
      opt['master'] = this.master;
    }
    if (this.red) {
      opt['red'] = this.red;
    }
    if (this.green) {
      opt['green'] = this.green;
    }
    if (this.blue) {
      opt['blue'] = this.blue;
    }
    if (this.all) {
      opt['all'] = this.all;
    }
    if (this.psfile) {
      opt['psfile'] = this.psfile;
    }
    if (this.plot) {
      opt['plot'] = this.plot;
    }

    addFilter(this.ffmpeg, {
      filter: 'curves',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.curves = curves;
