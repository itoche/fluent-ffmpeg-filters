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
    CurvesFilter.prototype.withPreset = this.preset;
    CurvesFilter.prototype.withMaster = this.master;
    CurvesFilter.prototype.withRed = this.red;
    CurvesFilter.prototype.withGreen = this.green;
    CurvesFilter.prototype.withBlue = this.blue;
    CurvesFilter.prototype.withAll = this.all;
    CurvesFilter.prototype.withPsfile = this.psfile;
    CurvesFilter.prototype.withPlot = this.plot;
  }

  /**
   * 
   * @param val
   */
  preset(val) {
    this._preset = val;
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
    this._master = val;
    return this;
  }

  /**
   * Set the key points for the red component.
   * 
   * @param val
   */
  red(val) {
    this._red = val;
    return this;
  }

  /**
   * Set the key points for the green component.
   * 
   * @param val
   */
  green(val) {
    this._green = val;
    return this;
  }

  /**
   * Set the key points for the blue component.
   * 
   * @param val
   */
  blue(val) {
    this._blue = val;
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
    this._all = val;
    return this;
  }

  /**
   * Specify a Photoshop curves file (.acv) to import the settings from.
   * 
   * @param val
   */
  psfile(val) {
    this._psfile = val;
    return this;
  }

  /**
   * Save Gnuplot script of the curves in specified file.
   * 
   * @param val
   */
  plot(val) {
    this._plot = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._preset) {
      opt['preset'] = this._preset;
    }
    if (this._master) {
      opt['master'] = this._master;
    }
    if (this._red) {
      opt['red'] = this._red;
    }
    if (this._green) {
      opt['green'] = this._green;
    }
    if (this._blue) {
      opt['blue'] = this._blue;
    }
    if (this._all) {
      opt['all'] = this._all;
    }
    if (this._psfile) {
      opt['psfile'] = this._psfile;
    }
    if (this._plot) {
      opt['plot'] = this._plot;
    }

    addFilter(this.ffmpeg, {
      filter: 'curves',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.curves = curves;
