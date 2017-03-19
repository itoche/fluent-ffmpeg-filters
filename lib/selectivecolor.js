const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the selectivecolor function.
 *
 *
 * @example
 *  ffmpeg().selectivecolor()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the selectivecolor function.
 */
function selectivecolor(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'selectivecolor', function() {
    return new SelectivecolorFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class SelectivecolorFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Selectivecolor.prototype.withCorrection_method = correction_method;
    Selectivecolor.prototype.withReds = reds;
    Selectivecolor.prototype.withYellows = yellows;
    Selectivecolor.prototype.withGreens = greens;
    Selectivecolor.prototype.withCyans = cyans;
    Selectivecolor.prototype.withBlues = blues;
    Selectivecolor.prototype.withMagentas = magentas;
    Selectivecolor.prototype.withWhites = whites;
    Selectivecolor.prototype.withNeutrals = neutrals;
    Selectivecolor.prototype.withBlacks = blacks;
    Selectivecolor.prototype.withPsfile = psfile;
  }

  /**
   * 
   * @param val
   */
  correction_method(val) {
    this.correction_method = val;
    return this;
  }

  /**
   * Adjustments for red pixels (pixels where the red component is the maximum)
   * 
   * @param val
   */
  reds(val) {
    this.reds = val;
    return this;
  }

  /**
   * Adjustments for yellow pixels (pixels where the blue component is the minimum)
   * 
   * @param val
   */
  yellows(val) {
    this.yellows = val;
    return this;
  }

  /**
   * Adjustments for green pixels (pixels where the green component is the maximum)
   * 
   * @param val
   */
  greens(val) {
    this.greens = val;
    return this;
  }

  /**
   * Adjustments for cyan pixels (pixels where the red component is the minimum)
   * 
   * @param val
   */
  cyans(val) {
    this.cyans = val;
    return this;
  }

  /**
   * Adjustments for blue pixels (pixels where the blue component is the maximum)
   * 
   * @param val
   */
  blues(val) {
    this.blues = val;
    return this;
  }

  /**
   * Adjustments for magenta pixels (pixels where the green component is the minimum)
   * 
   * @param val
   */
  magentas(val) {
    this.magentas = val;
    return this;
  }

  /**
   * Adjustments for white pixels (pixels where all components are greater than 128)
   * 
   * @param val
   */
  whites(val) {
    this.whites = val;
    return this;
  }

  /**
   * Adjustments for all pixels except pure black and pure white
   * 
   * @param val
   */
  neutrals(val) {
    this.neutrals = val;
    return this;
  }

  /**
   * Adjustments for black pixels (pixels where all components are lesser than 128)
   * 
   * @param val
   */
  blacks(val) {
    this.blacks = val;
    return this;
  }

  /**
   * Specify a Photoshop selective color file (.asv) to import the settings from.
   * 
   * @param val
   */
  psfile(val) {
    this.psfile = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.correction_method) {
      opt.correction_method = this.correction_method;
    }
    if (this.reds) {
      opt.reds = this.reds;
    }
    if (this.yellows) {
      opt.yellows = this.yellows;
    }
    if (this.greens) {
      opt.greens = this.greens;
    }
    if (this.cyans) {
      opt.cyans = this.cyans;
    }
    if (this.blues) {
      opt.blues = this.blues;
    }
    if (this.magentas) {
      opt.magentas = this.magentas;
    }
    if (this.whites) {
      opt.whites = this.whites;
    }
    if (this.neutrals) {
      opt.neutrals = this.neutrals;
    }
    if (this.blacks) {
      opt.blacks = this.blacks;
    }
    if (this.psfile) {
      opt.psfile = this.psfile;
    }

    addFilter(this.ffmpeg, {
      filter: 'selectivecolor',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.selectivecolor = selectivecolor;
