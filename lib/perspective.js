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
  x0(val) {
    this._x0 = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  y0(val) {
    this._y0 = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  x1(val) {
    this._x1 = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  y1(val) {
    this._y1 = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  x2(val) {
    this._x2 = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  y2(val) {
    this._y2 = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  x3(val) {
    this._x3 = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  y3(val) {
    this._y3 = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  interpolation(val) {
    this._interpolation = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  sense(val) {
    this._sense = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  eval(val) {
    this._eval = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._x0) {
      opt['x0'] = this._x0;
    }
    if (this._y0) {
      opt['y0'] = this._y0;
    }
    if (this._x1) {
      opt['x1'] = this._x1;
    }
    if (this._y1) {
      opt['y1'] = this._y1;
    }
    if (this._x2) {
      opt['x2'] = this._x2;
    }
    if (this._y2) {
      opt['y2'] = this._y2;
    }
    if (this._x3) {
      opt['x3'] = this._x3;
    }
    if (this._y3) {
      opt['y3'] = this._y3;
    }
    if (this._interpolation) {
      opt['interpolation'] = this._interpolation;
    }
    if (this._sense) {
      opt['sense'] = this._sense;
    }
    if (this._eval) {
      opt['eval'] = this._eval;
    }

    addFilter(this.ffmpeg, {
      filter: 'perspective',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.perspective = perspective;
