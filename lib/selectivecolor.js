const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the selectivecolor function.
 *
 *
 * @example
 *  ffmpeg().selectivecolor()
 *    ...             // call filter configuration functions
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
    SelectivecolorFilter.prototype.withCorrection_method = this.correction_method;
    SelectivecolorFilter.prototype.withReds = this.reds;
    SelectivecolorFilter.prototype.withYellows = this.yellows;
    SelectivecolorFilter.prototype.withGreens = this.greens;
    SelectivecolorFilter.prototype.withCyans = this.cyans;
    SelectivecolorFilter.prototype.withBlues = this.blues;
    SelectivecolorFilter.prototype.withMagentas = this.magentas;
    SelectivecolorFilter.prototype.withWhites = this.whites;
    SelectivecolorFilter.prototype.withNeutrals = this.neutrals;
    SelectivecolorFilter.prototype.withBlacks = this.blacks;
    SelectivecolorFilter.prototype.withPsfile = this.psfile;
  }

  /**
   * 
   * @param val
   */
  correction_method(val) {
    this._correction_method = val;
    return this;
  }

  /**
   * Adjustments for red pixels (pixels where the red component is the maximum)
   * 
   * @param val
   */
  reds(val) {
    this._reds = val;
    return this;
  }

  /**
   * Adjustments for yellow pixels (pixels where the blue component is the minimum)
   * 
   * @param val
   */
  yellows(val) {
    this._yellows = val;
    return this;
  }

  /**
   * Adjustments for green pixels (pixels where the green component is the maximum)
   * 
   * @param val
   */
  greens(val) {
    this._greens = val;
    return this;
  }

  /**
   * Adjustments for cyan pixels (pixels where the red component is the minimum)
   * 
   * @param val
   */
  cyans(val) {
    this._cyans = val;
    return this;
  }

  /**
   * Adjustments for blue pixels (pixels where the blue component is the maximum)
   * 
   * @param val
   */
  blues(val) {
    this._blues = val;
    return this;
  }

  /**
   * Adjustments for magenta pixels (pixels where the green component is the minimum)
   * 
   * @param val
   */
  magentas(val) {
    this._magentas = val;
    return this;
  }

  /**
   * Adjustments for white pixels (pixels where all components are greater than 128)
   * 
   * @param val
   */
  whites(val) {
    this._whites = val;
    return this;
  }

  /**
   * Adjustments for all pixels except pure black and pure white
   * 
   * @param val
   */
  neutrals(val) {
    this._neutrals = val;
    return this;
  }

  /**
   * Adjustments for black pixels (pixels where all components are lesser than 128)
   * 
   * @param val
   */
  blacks(val) {
    this._blacks = val;
    return this;
  }

  /**
   * Specify a Photoshop selective color file (.asv) to import the settings from.
   * 
   * @param val
   */
  psfile(val) {
    this._psfile = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._correction_method) {
      opt['correction_method'] = this._correction_method;
    }
    if (this._reds) {
      opt['reds'] = this._reds;
    }
    if (this._yellows) {
      opt['yellows'] = this._yellows;
    }
    if (this._greens) {
      opt['greens'] = this._greens;
    }
    if (this._cyans) {
      opt['cyans'] = this._cyans;
    }
    if (this._blues) {
      opt['blues'] = this._blues;
    }
    if (this._magentas) {
      opt['magentas'] = this._magentas;
    }
    if (this._whites) {
      opt['whites'] = this._whites;
    }
    if (this._neutrals) {
      opt['neutrals'] = this._neutrals;
    }
    if (this._blacks) {
      opt['blacks'] = this._blacks;
    }
    if (this._psfile) {
      opt['psfile'] = this._psfile;
    }

    addFilter(this.ffmpeg, {
      filter: 'selectivecolor',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.selectivecolor = selectivecolor;
