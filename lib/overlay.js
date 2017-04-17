const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the overlay function.
 *
 *
 * @example
 *  ffmpeg().overlay()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the overlay function.
 */
function overlay(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'overlay', function() {
    return new OverlayFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class OverlayFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    OverlayFilter.prototype.withX = this.x;
    OverlayFilter.prototype.withY = this.y;
    OverlayFilter.prototype.withEof_action = this.eof_action;
    OverlayFilter.prototype.withEval = this.eval;
    OverlayFilter.prototype.withShortest = this.shortest;
    OverlayFilter.prototype.withFormat = this.format;
    OverlayFilter.prototype.withRgb_deprecated_ = this.rgb_deprecated_;
    OverlayFilter.prototype.withRepeatlast = this.repeatlast;
  }

  /**
   * Set the expression for the x and y coordinates of the overlaid video
   * on the main video. Default value is &quot;0&quot; for both expressions. In case
   * the expression is invalid, it is set to a huge value (meaning that the
   * overlay will not be displayed within the output visible area).
   * 
   * 
   * @param val
   */
  y(val) {
    this.y = val;
    return this;
  }

  /**
   * Set the expression for the x and y coordinates of the overlaid video
   * on the main video. Default value is &quot;0&quot; for both expressions. In case
   * the expression is invalid, it is set to a huge value (meaning that the
   * overlay will not be displayed within the output visible area).
   * 
   * 
   * @param val
   */
  y(val) {
    this.y = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  eof_action(val) {
    this.eof_action = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  eval(val) {
    this.eval = val;
    return this;
  }

  /**
   * If set to 1, force the output to terminate when the shortest input
   * terminates. Default value is 0.
   * 
   * 
   * @param val
   */
  shortest(val) {
    this.shortest = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  format(val) {
    this.format = val;
    return this;
  }

  /**
   * If set to 1, force the filter to accept inputs in the RGB
   * color space. Default value is 0. This option is deprecated, use
   * format instead.
   * 
   * 
   * @param val
   */
  rgb_deprecated_(val) {
    this.rgb_deprecated_ = val;
    return this;
  }

  /**
   * If set to 1, force the filter to draw the last overlay frame over the
   * main input until the end of the stream. A value of 0 disables this
   * behavior. Default value is 1.
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
    if (this.x) {
      opt['x'] = this.x;
    }
    if (this.y) {
      opt['y'] = this.y;
    }
    if (this.eof_action) {
      opt['eof_action'] = this.eof_action;
    }
    if (this.eval) {
      opt['eval'] = this.eval;
    }
    if (this.shortest) {
      opt['shortest'] = this.shortest;
    }
    if (this.format) {
      opt['format'] = this.format;
    }
    if (this.rgb_deprecated_) {
      opt['rgb (deprecated)'] = this.rgb_deprecated_;
    }
    if (this.repeatlast) {
      opt['repeatlast'] = this.repeatlast;
    }

    addFilter(this.ffmpeg, {
      filter: 'overlay',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.overlay = overlay;
