const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the perspective function.
 *
 *
 * @example
 *  ffmpeg().perspective()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the perspective function.
 */
function perspective(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'perspective', function() {
    return new PerspectiveFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class PerspectiveFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    PerspectiveFilter.prototype.withX0 = this.x0;
    PerspectiveFilter.prototype.withY0 = this.y0;
    PerspectiveFilter.prototype.withX1 = this.x1;
    PerspectiveFilter.prototype.withY1 = this.y1;
    PerspectiveFilter.prototype.withX2 = this.x2;
    PerspectiveFilter.prototype.withY2 = this.y2;
    PerspectiveFilter.prototype.withX3 = this.x3;
    PerspectiveFilter.prototype.withY3 = this.y3;
    PerspectiveFilter.prototype.withInterpolation = this.interpolation;
    PerspectiveFilter.prototype.withSense = this.sense;
    PerspectiveFilter.prototype.withEval = this.eval;
  }

  /**
   * 
   * @param val
   */
  y3(val) {
    this.y3 = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  y3(val) {
    this.y3 = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  y3(val) {
    this.y3 = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  y3(val) {
    this.y3 = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  y3(val) {
    this.y3 = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  y3(val) {
    this.y3 = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  y3(val) {
    this.y3 = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  y3(val) {
    this.y3 = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  interpolation(val) {
    this.interpolation = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  sense(val) {
    this.sense = val;
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
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.x0) {
      opt['x0'] = this.x0;
    }
    if (this.y0) {
      opt['y0'] = this.y0;
    }
    if (this.x1) {
      opt['x1'] = this.x1;
    }
    if (this.y1) {
      opt['y1'] = this.y1;
    }
    if (this.x2) {
      opt['x2'] = this.x2;
    }
    if (this.y2) {
      opt['y2'] = this.y2;
    }
    if (this.x3) {
      opt['x3'] = this.x3;
    }
    if (this.y3) {
      opt['y3'] = this.y3;
    }
    if (this.interpolation) {
      opt['interpolation'] = this.interpolation;
    }
    if (this.sense) {
      opt['sense'] = this.sense;
    }
    if (this.eval) {
      opt['eval'] = this.eval;
    }

    addFilter(this.ffmpeg, {
      filter: 'perspective',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.perspective = perspective;
