const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the tblend function.
 *
 *
 * @example
 *  ffmpeg().tblend()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the tblend function.
 */
function tblend(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'tblend', function() {
    return new TblendFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class TblendFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    TblendFilter.prototype.withC0_mode = this.c0_mode;
    TblendFilter.prototype.withC1_mode = this.c1_mode;
    TblendFilter.prototype.withC2_mode = this.c2_mode;
    TblendFilter.prototype.withC3_mode = this.c3_mode;
    TblendFilter.prototype.withAll_mode = this.all_mode;
    TblendFilter.prototype.withC0_opacity = this.c0_opacity;
    TblendFilter.prototype.withC1_opacity = this.c1_opacity;
    TblendFilter.prototype.withC2_opacity = this.c2_opacity;
    TblendFilter.prototype.withC3_opacity = this.c3_opacity;
    TblendFilter.prototype.withAll_opacity = this.all_opacity;
    TblendFilter.prototype.withC0_expr = this.c0_expr;
    TblendFilter.prototype.withC1_expr = this.c1_expr;
    TblendFilter.prototype.withC2_expr = this.c2_expr;
    TblendFilter.prototype.withC3_expr = this.c3_expr;
    TblendFilter.prototype.withAll_expr = this.all_expr;
    TblendFilter.prototype.withShortest = this.shortest;
    TblendFilter.prototype.withRepeatlast = this.repeatlast;
  }

  /**
   * 
   * @param val
   */
  c0_mode(val) {
    this._c0_mode = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  c1_mode(val) {
    this._c1_mode = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  c2_mode(val) {
    this._c2_mode = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  c3_mode(val) {
    this._c3_mode = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  all_mode(val) {
    this._all_mode = val;
    return this;
  }

  /**
   * Set blend opacity for specific pixel component or all pixel components in case
   * of all_opacity. Only used in combination with pixel component blend modes.
   * 
   * 
   * @param val
   */
  c0_opacity(val) {
    this._c0_opacity = val;
    return this;
  }

  /**
   * Set blend opacity for specific pixel component or all pixel components in case
   * of all_opacity. Only used in combination with pixel component blend modes.
   * 
   * 
   * @param val
   */
  c1_opacity(val) {
    this._c1_opacity = val;
    return this;
  }

  /**
   * Set blend opacity for specific pixel component or all pixel components in case
   * of all_opacity. Only used in combination with pixel component blend modes.
   * 
   * 
   * @param val
   */
  c2_opacity(val) {
    this._c2_opacity = val;
    return this;
  }

  /**
   * Set blend opacity for specific pixel component or all pixel components in case
   * of all_opacity. Only used in combination with pixel component blend modes.
   * 
   * 
   * @param val
   */
  c3_opacity(val) {
    this._c3_opacity = val;
    return this;
  }

  /**
   * Set blend opacity for specific pixel component or all pixel components in case
   * of all_opacity. Only used in combination with pixel component blend modes.
   * 
   * 
   * @param val
   */
  all_opacity(val) {
    this._all_opacity = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  c0_expr(val) {
    this._c0_expr = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  c1_expr(val) {
    this._c1_expr = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  c2_expr(val) {
    this._c2_expr = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  c3_expr(val) {
    this._c3_expr = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  all_expr(val) {
    this._all_expr = val;
    return this;
  }

  /**
   * Force termination when the shortest input terminates. Default is
   * 0. This option is only defined for the blend filter.
   * 
   * 
   * @param val
   */
  shortest(val) {
    this._shortest = val;
    return this;
  }

  /**
   * Continue applying the last bottom frame after the end of the stream. A value of
   * 0 disable the filter after the last frame of the bottom layer is reached.
   * Default is 1. This option is only defined for the blend filter.
   * 
   * @param val
   */
  repeatlast(val) {
    this._repeatlast = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._c0_mode) {
      opt['c0_mode'] = this._c0_mode;
    }
    if (this._c1_mode) {
      opt['c1_mode'] = this._c1_mode;
    }
    if (this._c2_mode) {
      opt['c2_mode'] = this._c2_mode;
    }
    if (this._c3_mode) {
      opt['c3_mode'] = this._c3_mode;
    }
    if (this._all_mode) {
      opt['all_mode'] = this._all_mode;
    }
    if (this._c0_opacity) {
      opt['c0_opacity'] = this._c0_opacity;
    }
    if (this._c1_opacity) {
      opt['c1_opacity'] = this._c1_opacity;
    }
    if (this._c2_opacity) {
      opt['c2_opacity'] = this._c2_opacity;
    }
    if (this._c3_opacity) {
      opt['c3_opacity'] = this._c3_opacity;
    }
    if (this._all_opacity) {
      opt['all_opacity'] = this._all_opacity;
    }
    if (this._c0_expr) {
      opt['c0_expr'] = this._c0_expr;
    }
    if (this._c1_expr) {
      opt['c1_expr'] = this._c1_expr;
    }
    if (this._c2_expr) {
      opt['c2_expr'] = this._c2_expr;
    }
    if (this._c3_expr) {
      opt['c3_expr'] = this._c3_expr;
    }
    if (this._all_expr) {
      opt['all_expr'] = this._all_expr;
    }
    if (this._shortest) {
      opt['shortest'] = this._shortest;
    }
    if (this._repeatlast) {
      opt['repeatlast'] = this._repeatlast;
    }

    addFilter(this.ffmpeg, {
      filter: 'tblend',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.tblend = tblend;
