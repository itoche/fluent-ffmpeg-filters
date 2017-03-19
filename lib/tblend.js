const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the tblend function.
 *
 *
 * @example
 *  ffmpeg().tblend()
      ...             // call filter configuration functions
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
    Tblend.prototype.withAll_mode = all_mode;
    Tblend.prototype.withAll_opacity = all_opacity;
    Tblend.prototype.withAll_expr = all_expr;
    Tblend.prototype.withShortest = shortest;
    Tblend.prototype.withRepeatlast = repeatlast;
  }

  /**
   * 
   * @param val
   */
  all_mode(val) {
    this.all_mode = val;
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
    this.all_opacity = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  all_expr(val) {
    this.all_expr = val;
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
    this.shortest = val;
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
    this.repeatlast = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.all_mode) {
      opt.all_mode = this.all_mode;
    }
    if (this.all_opacity) {
      opt.all_opacity = this.all_opacity;
    }
    if (this.all_expr) {
      opt.all_expr = this.all_expr;
    }
    if (this.shortest) {
      opt.shortest = this.shortest;
    }
    if (this.repeatlast) {
      opt.repeatlast = this.repeatlast;
    }

    addFilter(this.ffmpeg, {
      filter: 'tblend',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.tblend = tblend;
